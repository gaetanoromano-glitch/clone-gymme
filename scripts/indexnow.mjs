#!/usr/bin/env node
// Notifies IndexNow (Bing, Yandex, Seznam, Naver…) of every URL in the live
// sitemap, so search and AI engines re-crawl changes without waiting.
//
//   npm run indexnow            → submit
//   npm run indexnow -- --dry-run → only print what would be sent
//
// SITE_URL overrides the target (default https://www.gymmeapp.it).

const SITE_URL = (process.env.SITE_URL ?? "https://www.gymmeapp.it").replace(/\/$/, "");
const KEY = "ccc472f6c255bc2ff7002c06b00a672b"; // public by design: served at /<key>.txt
const ENDPOINT = "https://api.indexnow.org/indexnow";
const dryRun = process.argv.includes("--dry-run");

const { host } = new URL(SITE_URL);
const keyLocation = `${SITE_URL}/${KEY}.txt`;

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": "gymme-indexnow" } });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.text();
}

// IndexNow fetches the key file to authenticate the request: make sure the
// deployment actually serves it before submitting.
const servedKey = (await fetchText(keyLocation)).trim();
if (servedKey !== KEY) {
  throw new Error(`Il file chiave ${keyLocation} non contiene la chiave attesa.`);
}

const sitemap = await fetchText(`${SITE_URL}/sitemap.xml`);
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1].trim())
  .filter((url) => new URL(url).host === host);

if (urlList.length === 0) throw new Error("Nessun URL trovato nella sitemap.");

console.log(`IndexNow: ${urlList.length} URL per ${host}`);
for (const url of urlList) console.log(`  ${url}`);

if (dryRun) {
  console.log("--dry-run: nessuna richiesta inviata.");
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: KEY, keyLocation, urlList }),
});

// 200 = accepted, 202 = accepted, key validation pending.
if (res.status === 200 || res.status === 202) {
  console.log(`IndexNow: inviati (HTTP ${res.status}).`);
} else {
  const reasons = { 400: "richiesta non valida", 403: "chiave non valida", 422: "URL non appartenenti all'host o chiave non corrispondente", 429: "troppe richieste" };
  throw new Error(`IndexNow ha risposto HTTP ${res.status}${reasons[res.status] ? ` (${reasons[res.status]})` : ""}: ${await res.text()}`);
}
