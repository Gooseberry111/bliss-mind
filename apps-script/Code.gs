/**
 * Bliss Mind — booking backend
 * ============================
 *
 * A Google Apps Script web app that backs the booking widget on the website.
 * It reads availability from this spreadsheet, writes bookings to it, and
 * emails both the patient and Dr. Ukata.
 *
 * Setup instructions live in docs/BOOKING-SETUP.md in the website repo.
 * The short version:
 *   1. Run setupSheets()  — creates the four tabs and fills in defaults
 *   2. Run checkSetup()   — tells you if anything is misconfigured
 *   3. Deploy > New deployment > Web app  (Execute as: Me, Access: Anyone)
 *   4. Paste the /exec URL into booking.apiUrl in src/data/site.js
 *
 * IMPORTANT: the script timezone and the spreadsheet timezone must both be
 * America/Chicago. checkSetup() verifies this. Every time in this system is
 * Central Time — there is no timezone conversion anywhere, by design, because
 * patients must be physically located in Kansas.
 */

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

var SHEET_BOOKINGS = "Bookings";
var SHEET_AVAILABILITY = "Availability";
var SHEET_BLACKOUTS = "Blackouts";
var SHEET_SETTINGS = "Settings";
var SHEET_ENQUIRIES = "Enquiries";

// Fallback notification address, used when the Settings tab does not exist
// yet. This lets the callback form work from a bare paste-and-deploy, with no
// spreadsheet setup at all.
var FALLBACK_EMAIL = "blissmindss@gmail.com";

var TIMEZONE = "America/Chicago";

var BOOKING_HEADERS = [
  "Booking ID",
  "Created At",
  "Date",
  "Start",
  "End",
  "Status",
  "First Name",
  "Last Name",
  "Email",
  "Phone",
  "In Kansas",
  "Is Adult",
  "Reason",
  "Heard Via",
  "Cancel Token",
  "Emails Sent",
];

// Column indexes (1-based) so the code reads clearly below.
var COL = {
  id: 1,
  createdAt: 2,
  date: 3,
  start: 4,
  end: 5,
  status: 6,
  firstName: 7,
  lastName: 8,
  email: 9,
  phone: 10,
  inKansas: 11,
  isAdult: 12,
  reason: 13,
  heardVia: 14,
  cancelToken: 15,
  emailsSent: 16,
};

var DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

var DEFAULT_SETTINGS = [
  ["Setting", "Value", "Notes"],
  [
    "Practice Name",
    "Bliss Mind",
    "Shown in confirmation emails.",
  ],
  [
    "Doctor Name",
    "Dr. Jemimah Ukata, PMHNP",
    "Shown in confirmation emails.",
  ],
  [
    "Doctor Email",
    "blissmindss@gmail.com",
    "Where new booking notifications are sent.",
  ],
  [
    "Reply To",
    "blissmindss@gmail.com",
    "Address patients see when they reply to a confirmation.",
  ],
  [
    "Meet Link",
    "",
    "Optional. A video room link included in confirmations. Leave blank and the email says the link will be sent before the appointment.",
  ],
  [
    "Days Ahead",
    "60",
    "How far into the future people may book.",
  ],
  [
    "Minimum Notice Hours",
    "12",
    "No bookings closer than this many hours from now.",
  ],
  [
    "Max Per Day",
    "10",
    "Safety cap on total bookings for a single day.",
  ],
  [
    "Max Per Email Per Day",
    "2",
    "Stops one person filling the calendar.",
  ],
  [
    "Consult Minutes",
    "15",
    "Length of the consultation itself (slots may be spaced wider).",
  ],
];

var DEFAULT_AVAILABILITY = [
  ["Day", "Open", "Start", "End", "Slot Mins"],
  ["Monday", "YES", "11:00", "16:00", 30],
  ["Tuesday", "YES", "11:00", "16:00", 30],
  ["Wednesday", "YES", "11:00", "16:00", 30],
  ["Thursday", "YES", "11:00", "16:00", 30],
  ["Friday", "YES", "11:00", "16:00", 30],
  ["Saturday", "NO", "", "", 30],
  ["Sunday", "NO", "", "", 30],
];

// ---------------------------------------------------------------------------
// One-time setup helpers (run these from the Apps Script editor)
// ---------------------------------------------------------------------------

/**
 * Creates the four tabs with headers, formatting and sensible defaults.
 * Safe to run more than once: existing tabs are left alone.
 */
function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setSpreadsheetTimeZone(TIMEZONE);

  // --- Bookings ---
  var bookings = ss.getSheetByName(SHEET_BOOKINGS);
  if (!bookings) {
    bookings = ss.insertSheet(SHEET_BOOKINGS);
    bookings
      .getRange(1, 1, 1, BOOKING_HEADERS.length)
      .setValues([BOOKING_HEADERS])
      .setFontWeight("bold")
      .setBackground("#1c3327")
      .setFontColor("#ffffff");
    bookings.setFrozenRows(1);
    bookings.getRange("C:C").setNumberFormat("yyyy-mm-dd");
    bookings.autoResizeColumns(1, BOOKING_HEADERS.length);
  }

  // --- Availability ---
  var availability = ss.getSheetByName(SHEET_AVAILABILITY);
  if (!availability) {
    availability = ss.insertSheet(SHEET_AVAILABILITY);
    availability
      .getRange(1, 1, DEFAULT_AVAILABILITY.length, 5)
      .setValues(DEFAULT_AVAILABILITY);
    availability
      .getRange(1, 1, 1, 5)
      .setFontWeight("bold")
      .setBackground("#1c3327")
      .setFontColor("#ffffff");
    availability.setFrozenRows(1);
    // Times are stored as plain text so "11:00" never becomes a date value.
    availability.getRange("C2:D8").setNumberFormat("@");
    availability
      .getRange("B2:B8")
      .setDataValidation(
        SpreadsheetApp.newDataValidation()
          .requireValueInList(["YES", "NO"], true)
          .build(),
      );
    availability.autoResizeColumns(1, 5);
  }

  // --- Blackouts ---
  var blackouts = ss.getSheetByName(SHEET_BLACKOUTS);
  if (!blackouts) {
    blackouts = ss.insertSheet(SHEET_BLACKOUTS);
    blackouts
      .getRange(1, 1, 1, 5)
      .setValues([["Date", "All Day", "Start", "End", "Reason"]])
      .setFontWeight("bold")
      .setBackground("#1c3327")
      .setFontColor("#ffffff");
    blackouts.setFrozenRows(1);
    blackouts.getRange("A:A").setNumberFormat("yyyy-mm-dd");
    blackouts.getRange("C:D").setNumberFormat("@");
    blackouts
      .getRange("B2:B200")
      .setDataValidation(
        SpreadsheetApp.newDataValidation()
          .requireValueInList(["YES", "NO"], true)
          .build(),
      );
    blackouts.autoResizeColumns(1, 5);
  }

  // --- Settings ---
  var settings = ss.getSheetByName(SHEET_SETTINGS);
  if (!settings) {
    settings = ss.insertSheet(SHEET_SETTINGS);
    settings
      .getRange(1, 1, DEFAULT_SETTINGS.length, 3)
      .setValues(DEFAULT_SETTINGS);
    settings
      .getRange(1, 1, 1, 3)
      .setFontWeight("bold")
      .setBackground("#1c3327")
      .setFontColor("#ffffff");
    settings.setFrozenRows(1);
    settings.setColumnWidth(1, 190);
    settings.setColumnWidth(2, 260);
    settings.setColumnWidth(3, 420);
  }

  // Remove the default empty "Sheet1" if it is still there and unused.
  var first = ss.getSheetByName("Sheet1");
  if (first && first.getLastRow() === 0 && ss.getSheets().length > 1) {
    ss.deleteSheet(first);
  }

  SpreadsheetApp.getUi
    ? null
    : null; /* no UI when run headless; ignore */
  Logger.log("setupSheets: done. Now run checkSetup().");
}

/**
 * Diagnostic. Run this after setup and read the log — it reports anything
 * that would stop bookings working.
 */
function checkSetup() {
  var problems = [];
  var notes = [];
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var scriptTz = Session.getScriptTimeZone();
  var sheetTz = ss.getSpreadsheetTimeZone();
  if (scriptTz !== TIMEZONE) {
    problems.push(
      "Script timezone is " +
        scriptTz +
        " — set it to " +
        TIMEZONE +
        " in Project Settings.",
    );
  }
  if (sheetTz !== TIMEZONE) {
    problems.push(
      "Spreadsheet timezone is " +
        sheetTz +
        " — File > Settings > Time zone.",
    );
  }

  [
    SHEET_BOOKINGS,
    SHEET_AVAILABILITY,
    SHEET_BLACKOUTS,
    SHEET_SETTINGS,
  ].forEach(function (name) {
    if (!ss.getSheetByName(name)) {
      problems.push('Missing tab "' + name + '" — run setupSheets().');
    }
  });

  if (!problems.length) {
    var settings = readSettings();
    if (!settings["Doctor Email"]) {
      problems.push("Settings: Doctor Email is empty.");
    }
    if (!settings["Meet Link"]) {
      notes.push(
        "Settings: Meet Link is empty — confirmation emails will say the link is sent separately.",
      );
    }

    var open = readAvailability().filter(function (d) {
      return d.open;
    });
    if (!open.length) {
      problems.push("Availability: no days are marked YES.");
    } else {
      notes.push(
        "Open days: " +
          open
            .map(function (d) {
              return d.day + " " + d.start + "-" + d.end + " (" + d.slotMins + "m)";
            })
            .join(", "),
      );
    }

    notes.push(
      "Email quota remaining today: " + MailApp.getRemainingDailyQuota(),
    );
  }

  var report =
    (problems.length
      ? "PROBLEMS:\n - " + problems.join("\n - ")
      : "No problems found.") +
    (notes.length ? "\n\nNotes:\n - " + notes.join("\n - ") : "");
  Logger.log(report);
  return report;
}

/** Sends a test booking confirmation to the doctor address. */
function sendTestEmail() {
  var settings = readSettings();
  var fake = {
    id: "BM-TEST-0000",
    date: formatDate_(new Date()),
    start: "11:00",
    end: "11:15",
    firstName: "Test",
    lastName: "Patient",
    email: settings["Doctor Email"],
    phone: "+1 (555) 000-0000",
    reason: "New patient consultation",
    heardVia: "Test",
    cancelToken: "testtoken",
  };
  sendPatientEmail_(fake, settings);
  sendDoctorEmail_(fake, settings);
  Logger.log("Test emails sent to " + settings["Doctor Email"]);
}

// ---------------------------------------------------------------------------
// Web endpoints
// ---------------------------------------------------------------------------

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || "ping";

  try {
    if (action === "availability") {
      return json_(getAvailability_(e.parameter.from, e.parameter.to));
    }
    if (action === "cancel") {
      return html_(cancelBooking_(e.parameter.id, e.parameter.token));
    }
    return json_({ ok: true, service: "bliss-mind-booking", timezone: TIMEZONE });
  } catch (err) {
    return json_({ ok: false, error: "SERVER_ERROR", message: String(err) });
  }
}

function doPost(e) {
  // The site posts as text/plain to avoid a CORS preflight that Apps Script
  // cannot answer. The body is still JSON.
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (body.action === "book") return json_(createBooking_(body));
    if (body.action === "contact") return json_(createEnquiry_(body));
    return json_({ ok: false, error: "UNKNOWN_ACTION" });
  } catch (err) {
    return json_({ ok: false, error: "SERVER_ERROR", message: String(err) });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(
    JSON.stringify(obj),
  ).setMimeType(ContentService.MimeType.JSON);
}

function html_(body) {
  return HtmlService.createHtmlOutput(body).setTitle("Bliss Mind");
}

// ---------------------------------------------------------------------------
// Reading configuration
// ---------------------------------------------------------------------------

function sheet_(name) {
  var s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!s) throw new Error('Missing sheet tab: "' + name + '". Run setupSheets().');
  return s;
}

function readSettings() {
  var rows = sheet_(SHEET_SETTINGS).getDataRange().getValues();
  var out = {};
  for (var i = 1; i < rows.length; i++) {
    var key = String(rows[i][0] || "").trim();
    if (key) out[key] = String(rows[i][1] === null ? "" : rows[i][1]).trim();
  }
  return out;
}

function readAvailability() {
  var rows = sheet_(SHEET_AVAILABILITY).getDataRange().getValues();
  var out = [];
  for (var i = 1; i < rows.length; i++) {
    var day = String(rows[i][0] || "").trim();
    if (!day) continue;
    out.push({
      day: day,
      open: String(rows[i][1] || "").trim().toUpperCase() === "YES",
      start: timeString_(rows[i][2]),
      end: timeString_(rows[i][3]),
      slotMins: Number(rows[i][4]) || 30,
    });
  }
  return out;
}

function readBlackouts() {
  var rows = sheet_(SHEET_BLACKOUTS).getDataRange().getValues();
  var out = [];
  for (var i = 1; i < rows.length; i++) {
    if (!rows[i][0]) continue;
    out.push({
      date: formatDate_(rows[i][0]),
      allDay: String(rows[i][1] || "").trim().toUpperCase() !== "NO",
      start: timeString_(rows[i][2]),
      end: timeString_(rows[i][3]),
    });
  }
  return out;
}

/** Bookings that still hold a slot (i.e. not cancelled). */
function readActiveBookings_() {
  var sh = sheet_(SHEET_BOOKINGS);
  if (sh.getLastRow() < 2) return [];
  var rows = sh
    .getRange(2, 1, sh.getLastRow() - 1, BOOKING_HEADERS.length)
    .getValues();
  var out = [];
  for (var i = 0; i < rows.length; i++) {
    var status = String(rows[i][COL.status - 1] || "").trim().toLowerCase();
    if (status === "cancelled") continue;
    out.push({
      row: i + 2,
      date: formatDate_(rows[i][COL.date - 1]),
      start: timeString_(rows[i][COL.start - 1]),
      email: String(rows[i][COL.email - 1] || "").trim().toLowerCase(),
      createdAt: rows[i][COL.createdAt - 1],
    });
  }
  return out;
}

// ---------------------------------------------------------------------------
// Date / time helpers — everything is Central Time, as plain strings
// ---------------------------------------------------------------------------

/** Date object (or yyyy-mm-dd string) -> "yyyy-MM-dd" */
function formatDate_(value) {
  if (value instanceof Date) {
    return Utilities.formatDate(value, TIMEZONE, "yyyy-MM-dd");
  }
  return String(value || "").trim().slice(0, 10);
}

/** Sheet cell -> "HH:mm". Handles text ("11:00") and real time values. */
function timeString_(value) {
  if (value === null || value === undefined || value === "") return "";
  if (value instanceof Date) {
    return Utilities.formatDate(value, TIMEZONE, "HH:mm");
  }
  var s = String(value).trim();
  var m = s.match(/^(\d{1,2}):(\d{2})/);
  if (!m) return "";
  return pad2_(Number(m[1])) + ":" + m[2];
}

function pad2_(n) {
  return (n < 10 ? "0" : "") + n;
}

function minutesOf_(hhmm) {
  var m = String(hhmm).match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  return Number(m[1]) * 60 + Number(m[2]);
}

function hhmmOf_(minutes) {
  return pad2_(Math.floor(minutes / 60)) + ":" + pad2_(minutes % 60);
}

/** "14:30" -> "2:30 PM" */
function label12_(hhmm) {
  var mins = minutesOf_(hhmm);
  var h = Math.floor(mins / 60);
  var m = mins % 60;
  var suffix = h >= 12 ? "PM" : "AM";
  var h12 = h % 12;
  if (h12 === 0) h12 = 12;
  return h12 + ":" + pad2_(m) + " " + suffix;
}

/** Builds a Date in the script timezone from "yyyy-MM-dd" + "HH:mm". */
function toDate_(dateStr, hhmm) {
  var d = dateStr.split("-");
  var t = hhmm.split(":");
  return new Date(
    Number(d[0]),
    Number(d[1]) - 1,
    Number(d[2]),
    Number(t[0]),
    Number(t[1]),
    0,
  );
}

function addDays_(date, n) {
  var d = new Date(date.getTime());
  d.setDate(d.getDate() + n);
  return d;
}

// ---------------------------------------------------------------------------
// Availability
// ---------------------------------------------------------------------------

/**
 * Returns every slot in the range with an `available` flag, so the website can
 * show taken times greyed out rather than hiding them.
 */
function getAvailability_(fromStr, toStr) {
  var settings = readSettings();
  var availability = readAvailability();
  var blackouts = readBlackouts();
  var booked = readActiveBookings_();

  var daysAhead = Number(settings["Days Ahead"]) || 60;
  var noticeHours = Number(settings["Minimum Notice Hours"]) || 0;
  var maxPerDay = Number(settings["Max Per Day"]) || 999;
  var consultMins = Number(settings["Consult Minutes"]) || 15;

  var now = new Date();
  var earliest = new Date(now.getTime() + noticeHours * 3600 * 1000);
  var lastBookable = addDays_(now, daysAhead);

  var from = fromStr ? toDate_(fromStr, "00:00") : now;
  var to = toStr ? toDate_(toStr, "00:00") : addDays_(now, 27);
  if (to.getTime() > lastBookable.getTime()) to = lastBookable;

  // index bookings by date for quick lookup
  var takenByDate = {};
  var countByDate = {};
  booked.forEach(function (b) {
    takenByDate[b.date + " " + b.start] = true;
    countByDate[b.date] = (countByDate[b.date] || 0) + 1;
  });

  var days = [];
  var cursor = toDate_(formatDate_(from), "00:00");
  var guard = 0;

  while (cursor.getTime() <= to.getTime() && guard++ < 400) {
    var dateStr = formatDate_(cursor);
    var dayName = DAY_NAMES[cursor.getDay()];
    var rule = null;
    for (var i = 0; i < availability.length; i++) {
      if (availability[i].day.toLowerCase() === dayName.toLowerCase()) {
        rule = availability[i];
        break;
      }
    }

    var slots = [];
    if (rule && rule.open && rule.start && rule.end) {
      var startM = minutesOf_(rule.start);
      var endM = minutesOf_(rule.end);
      var step = rule.slotMins > 0 ? rule.slotMins : 30;
      var dayFull = (countByDate[dateStr] || 0) >= maxPerDay;

      for (var m = startM; m + consultMins <= endM; m += step) {
        var hhmm = hhmmOf_(m);
        var slotDate = toDate_(dateStr, hhmm);

        var reason = null;
        if (slotDate.getTime() < earliest.getTime()) reason = "past";
        else if (takenByDate[dateStr + " " + hhmm]) reason = "taken";
        else if (dayFull) reason = "full";
        else if (isBlackedOut_(blackouts, dateStr, m, m + consultMins))
          reason = "unavailable";

        slots.push({
          time: hhmm,
          label: label12_(hhmm),
          available: reason === null,
          reason: reason,
        });
      }
    }

    days.push({
      date: dateStr,
      weekday: dayName,
      slots: slots,
      openCount: slots.filter(function (s) {
        return s.available;
      }).length,
    });

    cursor = addDays_(cursor, 1);
  }

  return {
    ok: true,
    timezone: TIMEZONE,
    timezoneLabel: "Central Time",
    consultMinutes: consultMins,
    days: days,
  };
}

function isBlackedOut_(blackouts, dateStr, startM, endM) {
  for (var i = 0; i < blackouts.length; i++) {
    var b = blackouts[i];
    if (b.date !== dateStr) continue;
    if (b.allDay) return true;
    var bs = minutesOf_(b.start);
    var be = minutesOf_(b.end);
    if (bs === null || be === null) return true;
    if (startM < be && endM > bs) return true; // overlap
  }
  return false;
}

// ---------------------------------------------------------------------------
// Creating a booking
// ---------------------------------------------------------------------------

function createBooking_(body) {
  // Honeypot: a real person never fills this in.
  if (body.website) return { ok: true, bookingId: "IGNORED" };

  var settings = readSettings();
  var consultMins = Number(settings["Consult Minutes"]) || 15;

  var firstName = String(body.firstName || "").trim();
  var lastName = String(body.lastName || "").trim();
  var email = String(body.email || "").trim();
  var phone = String(body.phone || "").trim();
  var date = String(body.date || "").trim();
  var time = timeString_(body.time);

  if (!firstName || !lastName) return err_("MISSING_NAME", "Please enter your full name.");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return err_("BAD_EMAIL", "Please enter a valid email address.");
  if (!phone) return err_("MISSING_PHONE", "Please enter a phone number.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !time)
    return err_("BAD_SLOT", "Please choose an appointment time.");
  if (body.inKansas !== true)
    return err_(
      "NOT_IN_KANSAS",
      "Appointments are only available to people located in Kansas.",
    );
  if (body.isAdult !== true)
    return err_("NOT_ADULT", "This practice sees adults aged 18 and over.");
  if (body.consent !== true)
    return err_("NO_CONSENT", "Please confirm you have read the notice.");

  // Everything that touches slot availability happens under a lock, so two
  // people submitting at the same moment cannot both take the same time.
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
  } catch (e) {
    return err_("BUSY", "The booking system is busy. Please try again.");
  }

  try {
    var availability = getAvailability_(date, date);
    var day = availability.days[0];
    var slot = null;
    if (day) {
      for (var i = 0; i < day.slots.length; i++) {
        if (day.slots[i].time === time) slot = day.slots[i];
      }
    }
    if (!slot) return err_("BAD_SLOT", "That time is not offered.");
    if (!slot.available) {
      return err_(
        "SLOT_TAKEN",
        "Sorry — that time was just booked. Please choose another.",
      );
    }

    // Throttle: stop one address filling the calendar.
    var maxPerEmail = Number(settings["Max Per Email Per Day"]) || 2;
    var since = new Date().getTime() - 24 * 3600 * 1000;
    var recent = readActiveBookings_().filter(function (b) {
      var t = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
      return b.email === email.toLowerCase() && t >= since;
    });
    if (recent.length >= maxPerEmail) {
      return err_(
        "TOO_MANY",
        "You already have a booking. Please email us if you need another time.",
      );
    }

    var endTime = hhmmOf_(minutesOf_(time) + consultMins);
    var booking = {
      id: makeBookingId_(date),
      createdAt: new Date(),
      date: date,
      start: time,
      end: endTime,
      status: "Confirmed",
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      inKansas: "YES",
      isAdult: "YES",
      reason: String(body.reason || "").trim(),
      heardVia: String(body.heardVia || "").trim(),
      cancelToken: makeToken_(),
    };

    sheet_(SHEET_BOOKINGS).appendRow([
      booking.id,
      booking.createdAt,
      booking.date,
      booking.start,
      booking.end,
      booking.status,
      booking.firstName,
      booking.lastName,
      booking.email,
      booking.phone,
      booking.inKansas,
      booking.isAdult,
      booking.reason,
      booking.heardVia,
      booking.cancelToken,
      "",
    ]);

    // Emails are best-effort: a mail failure must not lose the booking.
    var mailStatus = "";
    try {
      sendPatientEmail_(booking, settings);
      sendDoctorEmail_(booking, settings);
      mailStatus = "sent " + formatDate_(new Date());
    } catch (mailErr) {
      mailStatus = "FAILED: " + String(mailErr);
    }
    markEmailStatus_(booking.id, mailStatus);

    return {
      ok: true,
      bookingId: booking.id,
      date: booking.date,
      start: booking.start,
      startLabel: label12_(booking.start),
      end: booking.end,
    };
  } finally {
    lock.releaseLock();
  }
}

function err_(code, message) {
  return { ok: false, error: code, message: message };
}

function makeBookingId_(dateStr) {
  return "BM-" + dateStr.replace(/-/g, "") + "-" + makeToken_().slice(0, 4).toUpperCase();
}

function makeToken_() {
  return Utilities.getUuid().replace(/-/g, "").slice(0, 16);
}

function markEmailStatus_(bookingId, status) {
  var sh = sheet_(SHEET_BOOKINGS);
  var ids = sh.getRange(2, COL.id, Math.max(sh.getLastRow() - 1, 1), 1).getValues();
  for (var i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === bookingId) {
      sh.getRange(i + 2, COL.emailsSent).setValue(status);
      return;
    }
  }
}

// ---------------------------------------------------------------------------
// Cancelling
// ---------------------------------------------------------------------------

function cancelBooking_(id, token) {
  var page = function (title, message) {
    return (
      '<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;' +
      'max-width:520px;margin:64px auto;padding:32px;background:#faf7f2;' +
      'border-radius:20px;color:#1c3327;line-height:1.6">' +
      '<h1 style="font-size:26px;margin:0 0 12px">' +
      title +
      "</h1><p>" +
      message +
      "</p></div>"
    );
  };

  if (!id || !token) return page("Something is missing", "That cancellation link is incomplete.");

  var sh = sheet_(SHEET_BOOKINGS);
  if (sh.getLastRow() < 2) return page("Not found", "We could not find that booking.");

  var rows = sh
    .getRange(2, 1, sh.getLastRow() - 1, BOOKING_HEADERS.length)
    .getValues();

  for (var i = 0; i < rows.length; i++) {
    if (String(rows[i][COL.id - 1]) !== id) continue;
    if (String(rows[i][COL.cancelToken - 1]) !== token) {
      return page("Not found", "We could not verify that cancellation link.");
    }
    if (String(rows[i][COL.status - 1]).toLowerCase() === "cancelled") {
      return page("Already cancelled", "This appointment was already cancelled.");
    }

    sh.getRange(i + 2, COL.status).setValue("Cancelled");

    var settings = readSettings();
    try {
      MailApp.sendEmail({
        to: settings["Doctor Email"],
        subject:
          "Cancelled: " +
          rows[i][COL.firstName - 1] +
          " " +
          rows[i][COL.lastName - 1] +
          " — " +
          formatDate_(rows[i][COL.date - 1]),
        htmlBody:
          "<p>" +
          rows[i][COL.firstName - 1] +
          " " +
          rows[i][COL.lastName - 1] +
          " cancelled their consultation on " +
          formatDate_(rows[i][COL.date - 1]) +
          " at " +
          label12_(timeString_(rows[i][COL.start - 1])) +
          " CT.</p><p>The slot is open again.</p>",
      });
    } catch (e) {
      // A failed notification must not block the cancellation.
    }

    return page(
      "Appointment cancelled",
      "Your consultation on " +
        formatDate_(rows[i][COL.date - 1]) +
        " at " +
        label12_(timeString_(rows[i][COL.start - 1])) +
        " Central Time has been cancelled. You are welcome to book again any time.",
    );
  }

  return page("Not found", "We could not find that booking.");
}

// ---------------------------------------------------------------------------
// Callback enquiries (the contact form)
// ---------------------------------------------------------------------------

/**
 * Settings lookup that degrades gracefully. The callback form must work
 * before anyone has run setupSheets(), so a missing Settings tab is not an
 * error here.
 */
function settingsOrDefaults_() {
  try {
    var s = readSettings();
    if (!s["Doctor Email"]) s["Doctor Email"] = FALLBACK_EMAIL;
    return s;
  } catch (e) {
    return {
      "Practice Name": "Bliss Mind",
      "Doctor Email": FALLBACK_EMAIL,
      "Reply To": FALLBACK_EMAIL,
    };
  }
}

function createEnquiry_(body) {
  // Honeypot: a real person never fills this in.
  if (body.website) return { ok: true };

  var name = String(body.name || "").trim();
  var email = String(body.email || "").trim();
  var phone = String(body.phone || "").trim();
  var reason = String(body.reason || "").trim();
  var preferred = String(body.preferredContact || "").trim();
  var bestTime = String(body.bestTime || "").trim();

  if (!name) return err_("MISSING_NAME", "Please enter your name.");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return err_("BAD_EMAIL", "Please enter a valid email address.");

  var settings = settingsOrDefaults_();
  var practice = settings["Practice Name"] || "Bliss Mind";
  var notify = settings["Doctor Email"] || FALLBACK_EMAIL;

  // Log to a sheet when one is available. Best effort: a logging failure must
  // never cost us the email.
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_ENQUIRIES);
    if (!sh) {
      sh = ss.insertSheet(SHEET_ENQUIRIES);
      sh.getRange(1, 1, 1, 7)
        .setValues([
          [
            "Received",
            "Name",
            "Email",
            "Phone",
            "Reason",
            "Reach By",
            "Best Time",
          ],
        ])
        .setFontWeight("bold")
        .setBackground("#1c3327")
        .setFontColor("#ffffff");
      sh.setFrozenRows(1);
    }
    sh.appendRow([
      new Date(),
      name,
      email,
      phone,
      reason,
      preferred,
      bestTime,
    ]);
  } catch (logErr) {
    // no spreadsheet bound, or no permission - carry on and send the email
  }

  var rows = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "—"],
    ["About", reason || "—"],
    ["Reach by", preferred || "—"],
    ["Best time", bestTime || "—"],
  ]
    .map(function (r) {
      return (
        '<tr><td style="padding:5px 14px 5px 0;color:#4a5f52">' +
        r[0] +
        '</td><td style="padding:5px 0"><strong>' +
        r[1] +
        "</strong></td></tr>"
      );
    })
    .join("");

  // To the practice
  MailApp.sendEmail({
    to: notify,
    subject: "Callback request: " + name,
    htmlBody: emailShell_(
      '<h1 style="font-size:22px;margin:0 0 16px">New callback request</h1>' +
        '<table style="font-size:14px;border-collapse:collapse">' +
        rows +
        "</table>" +
        '<p style="font-size:13px;color:#4a5f52;margin-top:20px">Reply to this email to answer ' +
        name +
        " directly.</p>",
    ),
    name: practice,
    replyTo: email,
  });

  // Acknowledgement to the person who asked
  try {
    MailApp.sendEmail({
      to: email,
      subject: "We’ve got your message — " + practice,
      htmlBody: emailShell_(
        '<h1 style="font-size:22px;margin:0 0 12px">Thanks for getting in touch</h1>' +
          "<p>Hello " +
          name +
          ", we’ve received your request and will get back to you within one business day.</p>" +
          "<p>You don’t need to do anything else.</p>" +
          '<hr style="border:none;border-top:1px solid #e5ece1;margin:22px 0">' +
          '<p style="font-size:12px;color:#77877c;margin:0">If you are in crisis or this is a medical emergency, please don’t wait for our reply — call or text 988 for the Suicide &amp; Crisis Lifeline, or dial 911.</p>',
      ),
      name: practice,
      replyTo: settings["Reply To"] || notify,
    });
  } catch (ackErr) {
    // the practice notification already went out; an ack failure is not fatal
  }

  return { ok: true };
}

// ---------------------------------------------------------------------------
// Emails
// ---------------------------------------------------------------------------

function prettyDate_(dateStr) {
  return Utilities.formatDate(
    toDate_(dateStr, "12:00"),
    TIMEZONE,
    "EEEE, d MMMM yyyy",
  );
}

function emailShell_(innerHtml) {
  return (
    '<div style="font-family:system-ui,-apple-system,Segoe UI,Helvetica,sans-serif;' +
    'background:#faf7f2;padding:28px;color:#1c3327;line-height:1.6">' +
    '<div style="max-width:540px;margin:0 auto;background:#ffffff;border-radius:18px;padding:28px">' +
    innerHtml +
    "</div></div>"
  );
}

function sendPatientEmail_(b, settings) {
  var meetLink = settings["Meet Link"];
  var practice = settings["Practice Name"] || "Bliss Mind";
  var doctor = settings["Doctor Name"] || "your provider";

  var joinBlock = meetLink
    ? '<p><strong>Join here at your appointment time:</strong><br>' +
      '<a href="' + meetLink + '">' + meetLink + "</a></p>"
    : "<p>Your video link will be sent to this address before your appointment.</p>";

  var cancelUrl =
    ScriptApp.getService().getUrl() +
    "?action=cancel&id=" +
    encodeURIComponent(b.id) +
    "&token=" +
    encodeURIComponent(b.cancelToken);

  var html = emailShell_(
    '<h1 style="font-size:24px;margin:0 0 6px">Your consultation is booked</h1>' +
      '<p style="margin:0 0 20px;color:#4a5f52">' +
      practice +
      " — free 15-minute consultation</p>" +
      '<div style="background:#f3f6f1;border-radius:12px;padding:16px;margin-bottom:18px">' +
      "<p style=\"margin:0\"><strong>" +
      prettyDate_(b.date) +
      "</strong><br>" +
      label12_(b.start) +
      " &ndash; " +
      label12_(b.end) +
      " <strong>Central Time (CT)</strong></p></div>" +
      "<p>Hello " +
      b.firstName +
      ", your consultation with " +
      doctor +
      " is confirmed.</p>" +
      joinBlock +
      "<p><strong>Please note:</strong> you will need to be physically located in Kansas at the time of the call. This consultation is not a clinical evaluation or treatment.</p>" +
      '<p style="font-size:13px;color:#4a5f52">Need to cancel? <a href="' +
      cancelUrl +
      '">Cancel this appointment</a>.</p>' +
      '<hr style="border:none;border-top:1px solid #e5ece1;margin:22px 0">' +
      '<p style="font-size:12px;color:#77877c;margin:0">If you are in crisis or this is a medical emergency, do not wait for this appointment — call or text 988 for the Suicide &amp; Crisis Lifeline, or dial 911.</p>',
  );

  MailApp.sendEmail({
    to: b.email,
    subject:
      "Your consultation — " + prettyDate_(b.date) + ", " + label12_(b.start) + " CT",
    htmlBody: html,
    name: practice,
    replyTo: settings["Reply To"] || settings["Doctor Email"],
  });
}

function sendDoctorEmail_(b, settings) {
  var rowsHtml = [
    ["Name", b.firstName + " " + b.lastName],
    ["When", prettyDate_(b.date) + ", " + label12_(b.start) + " CT"],
    ["Email", b.email],
    ["Phone", b.phone],
    ["Reason", b.reason || "—"],
    ["Heard via", b.heardVia || "—"],
    ["Booking ID", b.id],
  ]
    .map(function (r) {
      return (
        '<tr><td style="padding:5px 14px 5px 0;color:#4a5f52">' +
        r[0] +
        '</td><td style="padding:5px 0"><strong>' +
        r[1] +
        "</strong></td></tr>"
      );
    })
    .join("");

  MailApp.sendEmail({
    to: settings["Doctor Email"],
    subject:
      "New booking: " +
      b.firstName +
      " " +
      b.lastName +
      " — " +
      prettyDate_(b.date) +
      ", " +
      label12_(b.start) +
      " CT",
    htmlBody: emailShell_(
      '<h1 style="font-size:22px;margin:0 0 16px">New consultation booked</h1>' +
        '<table style="font-size:14px;border-collapse:collapse">' +
        rowsHtml +
        "</table>" +
        '<p style="font-size:13px;color:#4a5f52;margin-top:20px">Full details are in the Bookings tab of your booking spreadsheet.</p>',
    ),
    name: settings["Practice Name"] || "Bliss Mind",
    replyTo: b.email,
  });
}
