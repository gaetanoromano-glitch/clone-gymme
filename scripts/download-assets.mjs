import { createWriteStream, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');
const CDN = 'https://d1b020qu0wpobn.cloudfront.net';

const ASSETS = [
  // Logos
  '/themes/gymme/assets2/images/white-logo.svg',
  '/themes/gymme/assets2/images/logo-sticky.svg',
  '/themes/gymme/assets2/images/logo.svg',
  '/themes/gymme/assets2/images/logo-all-black.svg',
  // Feature section item images
  '/uploads/2025/08/coach-item.webp',
  '/uploads/2025/08/engage-item.webp',
  '/uploads/2025/08/manage-item.webp',
  '/uploads/2025/08/scale-item-1.webp',
  // AI badges
  '/themes/gymme/assets2/images/icons/ai-badge-sm.png',
  '/themes/gymme/assets2/images/icons/ai-badge-lg.svg',
  // Resource menu icons
  '/uploads/2025/08/academy-icon-1.png',
  '/uploads/2025/09/icon-case-study.png',
  '/uploads/2025/08/webinars-icon.svg',
  '/uploads/2025/08/blog-icon.svg',
  '/uploads/2025/08/help-icon.svg',
  // Hero animation images
  '/themes/gymme/assets2/images/homepage/hero-animation/fitness-coaches-xl.webp',
  '/themes/gymme/assets2/images/homepage/hero-animation/fitness-coaches-blur.webp',
  '/themes/gymme/assets2/images/homepage/hero-animation/gym-studio-xl.webp',
  '/themes/gymme/assets2/images/homepage/hero-animation/gym-studio-blur.webp',
  '/themes/gymme/assets2/images/homepage/hero-animation/nutrition-coaches-xl.webp',
  '/themes/gymme/assets2/images/homepage/hero-animation/nutrition-coaches-blur.webp',
  '/themes/gymme/assets2/images/homepage/hero-animation/sport-coaches-xl.webp',
  '/themes/gymme/assets2/images/homepage/hero-animation/sport-coaches-blur.webp',
  // Trusted brand logos
  '/themes/gymme/assets2/images/homepage/logo/bsf.webp',
  '/themes/gymme/assets2/images/homepage/logo/squashskills.webp',
  '/themes/gymme/assets2/images/homepage/logo/lyss.webp',
  '/themes/gymme/assets2/images/homepage/logo/physiorx.webp',
  '/themes/gymme/assets2/images/homepage/logo/drop-gym.webp',
  '/themes/gymme/assets2/images/homepage/logo/henley-fitness.webp',
  '/themes/gymme/assets2/images/homepage/logo/winning-memtality.webp',
  '/themes/gymme/assets2/images/homepage/logo/strength-base.webp',
  '/themes/gymme/assets2/images/homepage/logo/boulayfit.webp',
  '/themes/gymme/assets2/images/homepage/logo/intevgrit.webp',
  // Industry section icons
  '/themes/gymme/assets2/images/homepage/industry/AI.svg',
  '/themes/gymme/assets2/images/homepage/industry/nutrition.svg',
  '/themes/gymme/assets2/images/homepage/industry/habit.svg',
  '/themes/gymme/assets2/images/homepage/industry/sport.svg',
  // Service tier
  '/themes/gymme/assets2/images/homepage/revolutionary/1-1-2xl.webp',
  '/themes/gymme/assets2/images/homepage/revolutionary/1-many-2xl.webp',
  '/themes/gymme/assets2/images/homepage/icons/checkmark-icon.svg',
  '/themes/gymme/assets2/images/homepage/icons/checkmark-icon-1.svg',
  // Five years section
  '/themes/gymme/assets2/images/homepage/five-years/bg.webp',
  '/themes/gymme/assets2/images/homepage/five-years/banner-1.webp',
  '/themes/gymme/assets2/images/homepage/five-years/banner-2.webp',
  // Blueprint / ForEveryone
  '/themes/gymme/assets2/images/homepage/blueprint/blueprint-overlay.webp',
  // Plan & Coach icons
  '/themes/gymme/assets2/images/homepage/plan-coach.svg',
  '/themes/gymme/assets2/images/homepage/periodization.svg',
  '/themes/gymme/assets2/images/homepage/meal-plans.svg',
  '/themes/gymme/assets2/images/homepage/habit.svg',
  '/themes/gymme/assets2/images/homepage/running.svg',
  // Motivate & Measure icons + screenshots
  '/themes/gymme/assets2/images/homepage/icons/motivate-measure.svg',
  '/themes/gymme/assets2/images/homepage/icons/data-analytics-icon.svg',
  '/themes/gymme/assets2/images/homepage/motivate/data-analytics-mobile.webp',
  '/themes/gymme/assets2/images/homepage/motivate/data-analytics.webp',
  '/themes/gymme/assets2/images/homepage/icons/goal-settings-icon.svg',
  '/themes/gymme/assets2/images/homepage/motivate/goal-setting.webp',
  '/themes/gymme/assets2/images/homepage/icons/adherence-icon.svg',
  '/themes/gymme/assets2/images/homepage/icons/check-ins-icon.svg',
  '/themes/gymme/assets2/images/homepage/motivate/check-ins.webp',
  '/themes/gymme/assets2/images/homepage/icons/integrations-trackers-icon.svg',
  '/themes/gymme/assets2/images/homepage/motivate/integrations.webp',
  // Engage icons + screenshots
  '/themes/gymme/assets2/images/homepage/icons/engage.svg',
  '/themes/gymme/assets2/images/homepage/icons/1-1-messages-icon.svg',
  '/themes/gymme/assets2/images/homepage/icons/scheduled-icon.svg',
  '/themes/gymme/assets2/images/homepage/engage/scheduled.webp',
  '/themes/gymme/assets2/images/homepage/icons/community-forum-icon.svg',
  '/themes/gymme/assets2/images/homepage/icons/broadcast-icon.svg',
  '/themes/gymme/assets2/images/homepage/engage/broadcast.webp',
  '/themes/gymme/assets2/images/homepage/icons/announcements-icon.svg',
  '/themes/gymme/assets2/images/homepage/engage/announcements.webp',
  // Scale icons + screenshots
  '/themes/gymme/assets2/images/homepage/icons/scale.svg',
  '/themes/gymme/assets2/images/homepage/icons/automated.svg',
  '/themes/gymme/assets2/images/homepage/scale/automated-mobile.webp',
  '/themes/gymme/assets2/images/homepage/scale/automated.webp',
  '/themes/gymme/assets2/images/homepage/icons/autoflow-icon.svg',
  '/themes/gymme/assets2/images/homepage/scale/autoflow.webp',
  '/themes/gymme/assets2/images/homepage/icons/integrated-payments-icon.svg',
  '/themes/gymme/assets2/images/homepage/scale/payment.webp',
  '/themes/gymme/assets2/images/homepage/icons/business-analytics-icon.svg',
  '/themes/gymme/assets2/images/homepage/scale/hsa-fsa.webp',
  '/themes/gymme/assets2/images/homepage/icons/marketplace-for-acquisition-icon.svg',
  '/themes/gymme/assets2/images/homepage/icons/marketplace-link-icon.svg',
  '/themes/gymme/assets2/images/homepage/scale/marketplace-mobile.webp',
  '/themes/gymme/assets2/images/homepage/scale/marketplace.webp',
  // Branding
  '/themes/gymme/assets2/images/homepage/branding.svg',
  '/themes/gymme/assets2/images/homepage/branding/branding-1-2xl.webp',
  '/themes/gymme/assets2/images/homepage/branding/branding-2-2xl.webp',
  // Results / ratings
  '/themes/gymme/assets2/images/homepage/result/logo-1.webp',
  '/themes/gymme/assets2/images/homepage/result/logo-2.webp',
  '/themes/gymme/assets2/images/homepage/result/logo-3.webp',
  '/themes/gymme/assets2/images/homepage/result/logo-4.webp',
  // Testimonial photos
  '/themes/gymme/assets2/images/homepage/testimonial/testimonial-1-1.webp',
  '/themes/gymme/assets2/images/homepage/testimonial/testimonial-1-2.webp',
  '/themes/gymme/assets2/images/homepage/testimonial/testimonial-1-3.webp',
  '/themes/gymme/assets2/images/homepage/testimonial/testimonial-1-4.webp',
  '/themes/gymme/assets2/images/homepage/testimonial/testimonial-1-5.webp',
  // AI section
  '/themes/gymme/assets2/images/homepage/AI.webp',
  // Join / CTA
  '/themes/gymme/assets2/images/homepage/join-feature/join-feature.webp',
  // Footer social icons
  '/themes/gymme/assets2/images/homepage/footer/fb-icon.svg',
  '/themes/gymme/assets2/images/homepage/footer/ig-icon.svg',
  '/themes/gymme/assets2/images/homepage/footer/ytb-icon.svg',
  '/themes/gymme/assets2/images/homepage/footer/linkedin-icon.svg',
  // Favicon
  '/uploads/2025/01/cropped-favicon.png',
];

// Font files
const FONTS = [
  '/themes/gymme/assets2/fonts/TWK-Med/TWKEverett-Medium.woff',
  '/themes/gymme/assets2/fonts/TWK-Bold/TWKEverett-Bold.woff',
];

async function download(path, destRoot) {
  const url = CDN + path;
  const dest = join(destRoot, path);
  mkdirSync(dirname(dest), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAIL ${res.status}: ${url}`);
    return;
  }
  await pipeline(res.body, createWriteStream(dest));
  console.log(`OK: ${path}`);
}

async function downloadBatch(items, destRoot, batchSize = 4) {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await Promise.all(batch.map(p => download(p, destRoot).catch(e => console.error(`ERR ${p}: ${e.message}`))));
  }
}

console.log('Downloading images...');
await downloadBatch(ASSETS, PUBLIC_DIR);

console.log('Downloading fonts...');
await downloadBatch(FONTS, PUBLIC_DIR);

console.log('Done!');
