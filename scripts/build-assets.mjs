/**
 * Derives every web asset from src/assets/brand/logo-source.png.
 *
 * The source logo is artwork on a solid white field. Websites need it on
 * linen/sage/ink backgrounds, so the white is converted to transparency here
 * rather than being baked into the page design.
 *
 * Run with: npm run assets
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

const SRC = "src/assets/brand/logo-source.png";
const BRAND = "src/assets/brand";
const PUBLIC = "public";

// Ink used as the flat background for social cards.
const LINEN = { r: 250, g: 247, b: 242, alpha: 1 };

/**
 * Replace the white field with transparency.
 *
 * Alpha is driven by distance from white (255 - min(r,g,b)) so mid-tone sage
 * leaves stay fully opaque while anti-aliased edges keep a soft ramp — a plain
 * luminance key would make the leaves semi-transparent.
 */
async function dewhite(input) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const LOW = 6; // at/below this distance from white -> fully transparent
  const HIGH = 26; // at/above -> fully opaque

  for (let i = 0; i < data.length; i += 4) {
    const distance = 255 - Math.min(data[i], data[i + 1], data[i + 2]);
    let alpha;
    if (distance <= LOW) alpha = 0;
    else if (distance >= HIGH) alpha = 255;
    else alpha = Math.round(((distance - LOW) / (HIGH - LOW)) * 255);
    data[i + 3] = Math.min(data[i + 3], alpha);
  }

  return sharp(data, { raw: info }).png().toBuffer();
}

const report = (label, path, info) =>
  console.log(
    `  ${label.padEnd(22)} ${String(info.width).padStart(4)}x${String(info.height).padEnd(4)}  ${(info.size / 1024).toFixed(1)} KB  ${path}`,
  );

async function main() {
  await mkdir(BRAND, { recursive: true });

  const meta = await sharp(SRC).metadata();
  console.log(`source ${meta.width}x${meta.height}\n`);

  const transparent = await dewhite(SRC);

  // --- Full lockup: mark + wordmark + tagline, trimmed of its white margin ---
  const lockup = await sharp(transparent).trim({ threshold: 1 }).toBuffer();

  report(
    "lockup (webp)",
    `${BRAND}/logo.webp`,
    await sharp(lockup)
      .resize({ width: 900 })
      .webp({ quality: 92 })
      .toFile(`${BRAND}/logo.webp`),
  );
  report(
    "lockup (png)",
    `${BRAND}/logo.png`,
    await sharp(lockup)
      .resize({ width: 900 })
      .png({ compressionLevel: 9 })
      .toFile(`${BRAND}/logo.png`),
  );

  // --- Emblem only: the circle/face/leaf mark, for the navbar and favicon ---
  // Proportional crop of the source, then trimmed to its own bounds.
  // NB: sharp applies trim earlier than extract within a single pipeline, so
  // the crop and the trim have to be separate passes.
  const { width: w, height: h } = meta;
  const cropped = await sharp(transparent)
    .extract({
      left: Math.round(w * 0.22),
      top: Math.round(h * 0.1),
      width: Math.round(w * 0.58),
      height: Math.round(h * 0.485),
    })
    .png()
    .toBuffer();
  const mark = await sharp(cropped).trim({ threshold: 1 }).toBuffer();

  report(
    "mark (webp)",
    `${BRAND}/logo-mark.webp`,
    await sharp(mark)
      .resize({ width: 320 })
      .webp({ quality: 92 })
      .toFile(`${BRAND}/logo-mark.webp`),
  );
  report(
    "mark (png)",
    `${BRAND}/logo-mark.png`,
    await sharp(mark)
      .resize({ width: 320 })
      .png({ compressionLevel: 9 })
      .toFile(`${BRAND}/logo-mark.png`),
  );

  // --- Favicon + apple touch icon: mark padded onto a square ---
  const squareMark = await sharp(mark)
    .resize({
      width: 400,
      height: 400,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  report(
    "favicon",
    `${PUBLIC}/favicon.png`,
    await sharp(squareMark)
      .resize(64, 64)
      .png()
      .toFile(`${PUBLIC}/favicon.png`),
  );
  report(
    "apple touch icon",
    `${PUBLIC}/apple-touch-icon.png`,
    await sharp(squareMark)
      .resize(180, 180)
      .flatten({ background: LINEN })
      .png()
      .toFile(`${PUBLIC}/apple-touch-icon.png`),
  );

  // --- Social card: the full lockup centered on linen at 1200x630 ---
  const cardLogo = await sharp(lockup)
    .resize({ width: 640, height: 460, fit: "inside" })
    .toBuffer();

  report(
    "og image",
    `${PUBLIC}/og-image.png`,
    await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 4,
        background: LINEN,
      },
    })
      .composite([{ input: cardLogo, gravity: "centre" }])
      .png()
      .toFile(`${PUBLIC}/og-image.png`),
  );

  // --- Provider portrait -------------------------------------------------
  // Two crops from one source: a square centred on the face for circular
  // avatars, and a 4:5 portrait for the card on the home page.
  const portraitSrc = `${BRAND}/provider-source.jpg`;
  if (existsSync(portraitSrc)) {
    const pm = await sharp(portraitSrc).metadata();

    const side = Math.round(pm.width * 0.8);
    report(
      "provider avatar",
      `${BRAND}/provider-avatar.webp`,
      await sharp(portraitSrc)
        .extract({
          left: Math.round(pm.width * 0.1),
          top: Math.min(Math.round(pm.height * 0.33), pm.height - side),
          width: side,
          height: side,
        })
        .resize({ width: 640 })
        .webp({ quality: 86 })
        .toFile(`${BRAND}/provider-avatar.webp`),
    );

    // Narrow in a little and anchor to the bottom, otherwise the 4:5 crop is
    // mostly empty wall above her head.
    const portraitWidth = Math.round(pm.width * 0.82);
    const portraitHeight = Math.min(Math.round(portraitWidth / 0.8), pm.height);
    report(
      "provider portrait",
      `${BRAND}/provider-portrait.webp`,
      await sharp(portraitSrc)
        .extract({
          left: Math.max(0, Math.round(pm.width * 0.464 - portraitWidth / 2)),
          top: pm.height - portraitHeight,
          width: portraitWidth,
          height: portraitHeight,
        })
        .resize({ width: 800 })
        .webp({ quality: 86 })
        .toFile(`${BRAND}/provider-portrait.webp`),
    );
  }

  console.log("\ndone");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
