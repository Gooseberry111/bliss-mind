# Setting up the booking system

This guide takes you from nothing to a working booking page. It assumes you
have never opened Apps Script before. Follow it top to bottom — every step
says exactly what to click.

**Time needed:** about 30 minutes.

**Do all of this signed in as `blissmindss@gmail.com`.** If you are signed
into several Google accounts, sign out of the others first, or use a private
window. Getting this wrong is the single most common mistake — everything ends
up owned by the wrong account and the emails come from the wrong address.

---

## Two things, one deployment

The same Apps Script powers **two** features, and you do not have to set up
both at once:

|                    | What it needs                                   | Time    |
| ------------------ | ----------------------------------------------- | ------- |
| **Callback form**  | Steps 1–4, then 9–10. **No spreadsheet setup.** | ~10 min |
| **Online booking** | All of it, including the sheet tabs             | ~30 min |

If you only want the contact form emailing you right now, do steps 1, 2, 3, 4,
9 and 10, and skip 5 to 8. Come back for the rest whenever you are ready to
turn booking on — you will not have to redo anything.

Once booking is configured, set `booking.enabled = true` in
`src/data/site.js` to switch it on.

## How it fits together

```
   Website  ──── "what's free on Sept 9?" ───▶  Apps Script  ───▶  Google Sheet
   (booking widget)                                  │
            ◀──── list of times, some taken ─────────┘

   Patient submits  ────────────────────────▶  Apps Script
                                                    ├── writes a row to the Sheet
                                                    ├── emails the patient
                                                    └── emails Dr. Ukata
```

The **Sheet** is the database. The **Apps Script** is the middleman. The
website never touches the Sheet directly.

---

## Step 1 — Create the spreadsheet

1. Go to **sheets.google.com**.
2. Click **Blank spreadsheet**.
3. Rename it: click "Untitled spreadsheet" top-left and type
   **`Bliss Mind — Bookings`**.

Leave it open. You need this tab.

---

## Step 2 — Open Apps Script

1. In that spreadsheet, click **Extensions** in the menu bar.
2. Click **Apps Script**.

A new tab opens with a code editor. It will contain a nearly empty file
called `Code.gs` with a few lines like `function myFunction() {}`.

3. Rename the project: click **Untitled project** at the top and type
   **`Bliss Mind Booking`**.

---

## Step 3 — Paste in the code

1. In the Apps Script editor, click into the code area.
2. **Select everything and delete it** (`Ctrl+A`, then `Delete`).
3. Open `apps-script/Code.gs` from the website repository, copy the whole
   file, and paste it in.
4. Click the **save icon** (💾) or press `Ctrl+S`.

---

## Step 4 — Set the timezone (do not skip this)

This is the step that decides whether patients see the right times.

1. In the Apps Script editor, click the **gear icon** (⚙️ Project Settings) in
   the left sidebar.
2. Find **Time zone**.
3. Set it to **`(GMT-06:00) Central Time – Chicago`**.
4. Go back to the spreadsheet tab → **File → Settings** → set **Time zone** to
   the same thing → **Save settings**.

Both must say Central Time. The whole system assumes it.

---

## Step 5 — Build the tabs

1. Back in the Apps Script editor, find the dropdown near the top that says
   **`doGet`** (it is next to the ▶ Run button).
2. Change it to **`setupSheets`**.
3. Click **▶ Run**.

**The first time you run anything, Google asks for permission:**

- A window appears: **Authorization required** → click **Review permissions**.
- Choose the **blissmindss@gmail.com** account.
- You will see **"Google hasn't verified this app"**. This is normal — you
  wrote the app, and Google has not reviewed it because it is private to you.
  Click **Advanced** (small link, bottom-left) → **Go to Bliss Mind Booking
  (unsafe)**.
- Click **Allow**.

Now switch back to your spreadsheet tab. You should see four new tabs at the
bottom: **Bookings**, **Availability**, **Blackouts**, **Settings**.

---

## Step 6 — Check it

1. In Apps Script, change the dropdown to **`checkSetup`** and click **▶ Run**.
2. Click **Execution log** at the bottom if it does not open by itself.

You want to see **"No problems found."** If it lists problems, fix them and
run it again. It tells you exactly what is wrong.

---

## Step 7 — Fill in your settings

Go to the **Settings** tab of the spreadsheet and edit the **Value** column:

| Setting               | What to put                                      |
| --------------------- | ------------------------------------------------ |
| Practice Name         | `Bliss Mind`                                     |
| Doctor Name           | `Dr. Jemimah Ukata, PMHNP`                       |
| Doctor Email          | Where new-booking emails should go               |
| Reply To              | The address patients reply to                    |
| Meet Link             | Your video room link, or leave blank (see below) |
| Days Ahead            | How far ahead people can book (default 60)       |
| Minimum Notice Hours  | Stops last-minute bookings (default 12)          |
| Max Per Day           | Safety cap (default 10)                          |
| Max Per Email Per Day | Stops one person block-booking (default 2)       |
| Consult Minutes       | Length of the consultation (default 15)          |

**About Meet Link:** if you leave it blank, the confirmation email says the
video link will be sent before the appointment — you then send it manually. If
you want it automatic, create one reusable Google Meet room
(meet.google.com → **New meeting** → **Create a meeting for later**) and paste
that link here. Be aware a reusable room is the same link for everyone, so
admit people from the waiting screen rather than leaving it open.

---

## Step 8 — Set your hours

Go to the **Availability** tab. It arrives pre-filled with Mon–Fri, 11:00–16:00,
30-minute slots.

| Day      | Open | Start | End   | Slot Mins |
| -------- | ---- | ----- | ----- | --------- |
| Monday   | YES  | 11:00 | 16:00 | 30        |
| …        |      |       |       |           |
| Saturday | NO   |       |       |           |

- **Open** — `YES` or `NO`.
- **Start / End** — 24-hour time. `11:00` is 11am, `16:00` is 4pm.
- **Slot Mins** — spacing between appointment times. 30 gives 11:00, 11:30,
  12:00 … 15:30 (ten slots). 15 would give twenty.

Edits take effect immediately. No code, no redeploying.

**To take specific days off**, use the **Blackouts** tab:

| Date       | All Day | Start | End   | Reason       |
| ---------- | ------- | ----- | ----- | ------------ |
| 2026-11-26 | YES     |       |       | Thanksgiving |
| 2026-10-14 | NO      | 11:00 | 13:00 | Training     |

Dates must be `YYYY-MM-DD`.

---

## Step 9 — Deploy it as a web app

This is what gives you the URL the website talks to.

1. In Apps Script, click **Deploy** (top-right, blue) → **New deployment**.
2. Click the **gear icon** next to "Select type" → choose **Web app**.
3. Fill in:
   - **Description:** `Booking API v1`
   - **Execute as:** **Me (blissmindss@gmail.com)** ← must be Me
   - **Who has access:** **Anyone** ← must be Anyone, _not_ "Anyone with
     Google account". Patients are not signed in.
4. Click **Deploy**.
5. Approve permissions again if asked.
6. Copy the **Web app URL**. It ends in **`/exec`** and looks like:

```
https://script.google.com/macros/s/AKfycb.................../exec
```

**Copy the `/exec` one, not `/dev`.** The `/dev` URL only works while you are
signed in and will fail for patients.

---

## Step 10 — Connect the website

1. Open `src/data/site.js` in the website repo.
2. Find the `booking` block near the top.
3. Paste your URL into `api.url`:

```js
export const api = {
  url: "https://script.google.com/macros/s/AKfycb..../exec",
};
```

This one URL powers both the callback form and booking.

4. Save, commit, and deploy the site.

The Contact page switches from "Online booking is coming soon" to the live
booking widget automatically.

---

## Step 11 — Test it properly

Do this before telling anyone the site is live.

1. Open the Contact page in a **private/incognito window** (so you are not
   signed in as the owner — this is how a patient sees it).
2. Check the times say **Central Time (CT)**.
3. Book a slot using a **different email address** you can actually check.
4. Confirm all four of these:
   - A new row appears in the **Bookings** tab.
   - The patient confirmation email arrives.
   - The new-booking email arrives at the Doctor Email address.
   - That slot is now **struck through and unclickable** on the booking page.
5. Click **Cancel this appointment** in the confirmation email. The row's
   Status should change to `Cancelled` and the slot should free up again.

If all five pass, you are live.

---

## Everyday use

**To see bookings** — the **Bookings** tab. Newest at the bottom.

**To change your hours** — the **Availability** tab. Takes effect at once.

**To take a day off** — add a row to **Blackouts**.

**To cancel for a patient** — set that row's **Status** to `Cancelled`
(spelled exactly). The slot reopens immediately.

⚠️ **Never delete or reorder the header row** in any tab, and never insert a
column in the middle of **Bookings**. The script finds data by column
position. Add new columns at the far right if you need them.

---

## When you change the code

Editing `Code.gs` is **not** enough — a deployment is a frozen snapshot.

**Deploy → Manage deployments → pencil icon → Version: New version → Deploy**

Do it this way and the URL stays the same. Creating a _new deployment_ instead
gives you a different URL and you would have to update the website.

---

## Troubleshooting

**Widget says "We couldn't load the calendar"**

- The `/dev` URL was used instead of `/exec`.
- "Who has access" is not set to **Anyone**.
- Paste the `/exec` URL straight into a browser: you should see
  `{"ok":true,"service":"bliss-mind-booking",...}`. If you get a sign-in page,
  the access setting is wrong.

**No time slots appear**

- Run `checkSetup` and read the log.
- Check **Availability** has `YES` days with Start and End filled in.
- **Minimum Notice Hours** may be hiding everything today — that is normal.

**Times are wrong / show the wrong timezone**

- Both timezones must be Central: Apps Script **Project Settings**, and
  spreadsheet **File → Settings**.

**Emails are not arriving**

- Check spam.
- Run `sendTestEmail` from the editor.
- Free Gmail allows about 100 emails a day; each booking sends 2. Run
  `checkSetup` to see the remaining quota.

**Someone booked a slot that was already taken**

- Should not happen — the script locks the slot while writing. If it does,
  send the two Booking IDs and the timestamps.

---

## Things to keep in mind

**The Sheet holds patient information** — names, emails, phone numbers, and
the fact that each person booked psychiatric care. Treat it like a medical
record: do not share the link, do not make it public, and turn on 2-step
verification on the Google account.

**Never put card numbers in the Sheet.** Payment belongs with a payment
processor, never a spreadsheet.

**A free Gmail account is not covered by a Google BAA.** This setup is
reasonable for a free introductory consultation collecting only contact
details. Before taking on real patient volume, plan to move to a
BAA-covered system.
