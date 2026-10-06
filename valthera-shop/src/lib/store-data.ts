/* ============================================================
   SEMUA DATA WEBSITE VALTHERA STORE ADA DI FILE INI SAJA.
   Setiap bagian dipisah jelas — edit sesuai seksinya.
   ============================================================ */

/* ==================== 1. PENGATURAN SERVER ==================== */

export const CONFIG = {
  serverName: "Valthera City",
  ip: "play.valthera.id", // ← ubah IP server
  port: "25565", // ← ubah port server
  version: "Java 1.20+ / Bedrock",
  headApi: "https://mc-heads.net/avatar/", // API foto kepala skin (+nick)
  // Foto QRIS / barcode pembayaran kamu (foto asli sudah diunggah)
  qrisImage: "/__l5e/assets-v1/84f9020a-9f95-4e49-ac31-e29284511492/valthera-qris.png",
};

/* ==================== 2. TAUTAN CS (KLIK LANGSUNG BUKA CHAT) ==================== */

export const CS_DISCORD_URL = "https://discord.gg/pm3ak5rmNa";

export const CS_WHATSAPP_URL =
  "https://wa.me/6285135274992?text=Oi%20kacung%20gw%20mau%20pesan%2Ftanya%F0%9F%98%A0%F0%9F%98%A1";

/* ==================== 3. TIPE DATA (JANGAN DIUBAH) ==================== */

export type Cat = "coin" | "vehicle" | "property" | "particle" | "rank" | "bundle" | "limited";
export type Product = {
  id: string; name: string; category: Cat; group?: string; price: number; description: string;
  image: string; badge: string; limited: boolean; stock: number | null; featured: boolean; popular?: boolean;
  perks?: string[]; contents?: string[]; originalPrice?: number; discount?: number; endsAt?: string;
};
export type Cs = { name: string; img: string; via: string; contact: string; link: string };
export type Admin = { name: string; role: string; nick: string; img: string };

const dot = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const fmt = (n: number) => "Rp" + dot(n);

export const CATS: Record<Cat, { label: string; icon: string; desc: string; hue: number }> = {
  coin: { label: "Coin", icon: "🪙", desc: "Mata uang server untuk belanja di dalam kota.", hue: 45 },
  vehicle: { label: "Kendaraan", icon: "🚗", desc: "Dari motor harian sampai super car.", hue: 210 },
  property: { label: "Property", icon: "🏠", desc: "Kunci Rumah untuk membuka slot kepemilikan rumah.", hue: 150 },
  particle: { label: "Particle", icon: "✨", desc: "Efek visual karakter, murni cosmetic.", hue: 290 },
  rank: { label: "Rank", icon: "👑", desc: "Status warga dengan antrean prioritas dan lounge.", hue: 190 },
  bundle: { label: "Bundle", icon: "🎁", desc: "Paket hemat Coin, rank, dan item.", hue: 320 },
  limited: { label: "Limited Item", icon: "⏳", desc: "Edisi terbatas dengan stok dan waktu terbatas.", hue: 350 },
};
export const ITEM_SUBS: Cat[] = ["vehicle", "property", "particle"];

/* ==================== 4. PRODUK (SEMUA HARGA DALAM RIBUAN RUPIAH: 7.5 = Rp7.500) ==================== */

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const mk = (category: Cat, name: string, price: number, description: string, x: Partial<Product> = {}): Product => ({
  id: `${category}-${slug(name)}`, name, category, price, description, image: "", badge: "", limited: false, stock: null, featured: false, ...x,
});
const list = (cat: Cat, s: string, desc: (n: string) => string, x: Partial<Product> = {}, group?: string) =>
  s.split(",").map((t) => { const [n, p] = t.split(":"); return mk(cat, n.trim(), +p * 1000, desc(n.trim()), { group, ...x }); });

const VEHICLES = list("vehicle", "Compact Car:40,Motorcycle:45,Sedan:55,Coupe:65,SUV:75,Classic Car:85,Off-Road:85,Sports Car:100,Emergency Vehicle:110,Luxury Car:135,Super Car:175", (n) => `${n} untuk menjelajah Valthera City.`);

const PROPERTY = [[1, 10], [2, 18], [3, 25], [5, 40], [10, 70]].map(([n, p]) =>
  mk("property", `${n}x Kunci Rumah`, p * 1000, "Kunci Rumah digunakan untuk membuka slot kepemilikan rumah dalam server."));

const PARTICLES = list("particle", "Smoke Particle:10,Fire Particle:15,Spark Particle:15,Snow Particle:12.5,Bubble Particle:12.5,Heart Particle:15,Star Particle:15,Lightning Particle:20,Energy Particle:20,Dark Smoke Particle:20,Golden Spark Particle:25,Neon Particle:25,Flame Aura Particle:30,Electric Aura Particle:30,Cosmic Particle:35,Diamond Particle:35,Royal Spark Particle:40,Galaxy Particle:45",
  (n) => `${n}: efek visual untuk karakter. Hanya cosmetic, tanpa keuntungan gameplay.`, { badge: "COSMETIC" });

const COINS = [[500, 10], [1000, 18], [2500, 40], [5000, 70], [10000, 125], [25000, 275]].map(([n, p]) =>
  mk("coin", `${dot(n)} Coin`, p * 1000, `${dot(n)} Coin untuk belanja di server.${n >= 10000 ? " Paket besar memberi bonus Coin." : ""}`, n >= 10000 ? { badge: "BONUS" } : {}));

const RP: Record<string, string[]> = {
  NEWCOMER: ["2 Homes", "Basic Priority Queue", "Citizen Badge", "Discord Role"],
  RESIDENT: ["3 Homes", "Priority Queue", "Custom Join Message", "Discord Role"],
  CITIZEN: ["5 Homes", "Higher Priority Queue", "Citizen Lounge", "Discord Role"],
  VETERAN: ["7 Homes", "High Priority Queue", "Veteran Lounge", "Discord Role"],
  ELITE: ["10 Homes", "Very High Priority Queue", "Elite Lounge", "Exclusive Discord Role"],
  ICON: ["15 Homes", "Highest Priority Queue", "Icon Lounge", "Exclusive Discord Role", "Icon Badge"],
};
const RANK_PRICE: [string, number][] = [["NEWCOMER", 25], ["RESIDENT", 45], ["CITIZEN", 75], ["VETERAN", 110], ["ELITE", 150], ["ICON", 200]];
const RANKS = RANK_PRICE.map(([n, p], i) =>
  mk("rank", n, p * 1000, `Status warga ${n} di Valthera City.`, { badge: `[${n}]`, perks: [...(i ? [`Semua perk ${RANK_PRICE[i - 1][0]}`] : []), ...RP[n]] }));

/* [nama, harga, harga normal (perkiraan), isi, rank untuk perks] */
const B: [string, number, number, string[], string?][] = [
  ["NEW CITIZEN BUNDLE", 35, 53, ["1.500 Coin", "NEWCOMER Rank"], "NEWCOMER"],
  ["RESIDENT BUNDLE", 60, 95, ["3.000 Coin", "RESIDENT Rank"], "RESIDENT"],
  ["CITIZEN BUNDLE", 95, 145, ["5.000 Coin", "CITIZEN Rank"], "CITIZEN"],
  ["VETERAN BUNDLE", 135, 200, ["7.500 Coin", "VETERAN Rank"], "VETERAN"],
  ["ELITE BUNDLE", 180, 350, ["12.000 Coin", "ELITE Rank", "1 Vehicle Voucher"], "ELITE"],
  ["ICON BUNDLE", 250, 520, ["20.000 Coin", "ICON Rank", "1 Vehicle Voucher", "1 Property Voucher"], "ICON"],
  ["VEHICLE BUNDLE", 125, 200, ["Motorcycle", "Sedan", "Sports Car"]],
  ["PROPERTY STARTER BUNDLE", 35, 65, ["3x Kunci Rumah", "2.500 Coin"]],
  ["BUSINESS BUNDLE", 200, 285, ["7.500 Coin", "CITIZEN Rank", "Business Property"]],
];
const BUNDLES = B.map(([n, p, o, c, r]) =>
  mk("bundle", n, p * 1000, `Paket hemat berisi ${c.length} item.`, {
    contents: c, originalPrice: o * 1000, discount: (o - p) * 1000, badge: "HEMAT", perks: r ? [`Prefix [${r}]`, ...RP[r]] : undefined,
  }));

const END = "2026-10-31T23:59:00+07:00";
const LIMITED = ([
  ["Limited Motorcycle", 75, 20], ["Limited Sedan", 85, 15], ["Limited Sports Car", 125, 10], ["Limited Super Car", 175, 5],
  ["Limited Property", 100, 10], ["Limited Business Property", 150, 5],
  ["Limited Citizen Bundle", 100, 12], ["Limited Vehicle Bundle", 150, 8], ["Limited Property Bundle", 175, 6],
] as [string, number, number][]).map(([n, p, s]) =>
  mk("limited", n, p * 1000, `${n}: edisi terbatas, tersedia selama stok dan waktu masih ada.`, { limited: true, badge: "LIMITED", stock: s, endsAt: END }));

const FEATURED = ["2.500 Coin", "Sports Car", "3x Kunci Rumah", "Galaxy Particle", "CITIZEN", "ICON", "VETERAN BUNDLE", "Limited Super Car"];
const POPULAR = ["1.000 Coin", "Sedan", "1x Kunci Rumah", "Neon Particle", "RESIDENT", "NEW CITIZEN BUNDLE", "Limited Sports Car"];

/* urutan array = urutan "Newest" (paling bawah = terbaru) */
export const PRODUCTS: Product[] = [...COINS, ...VEHICLES, ...PROPERTY, ...PARTICLES, ...RANKS, ...BUNDLES, ...LIMITED].map((p) => ({
  ...p, featured: FEATURED.includes(p.name), popular: POPULAR.includes(p.name),
}));

/* ==================== 6. DAFTAR COSTUMER SERVICE ==================== */

const CS_LIST: Cs[] = [
  { name: "CS Valthera", img: "", via: "Discord", contact: "discord.gg/pm3ak5rmNa", link: CS_DISCORD_URL },
  { name: "CS WhatsApp", img: "", via: "WhatsApp", contact: "085135274992", link: CS_WHATSAPP_URL },
];

/* ==================== 7. DAFTAR ADMIN ==================== */

const ADMINS: Admin[] = [
  { name: "OwnerValthera", role: "Owner", nick: "OwnerValthera", img: "" },
  { name: "AdminSatu", role: "Admin", nick: "AdminSatu", img: "" },
  { name: "ModDua", role: "Moderator", nick: "ModDua", img: "" },
];

/* ==================== 8. GABUNGAN DATA ==================== */

export const DATA: { cs: Cs[]; admin: Admin[] } = { cs: CS_LIST, admin: ADMINS };

/* ==================== 9. MENU NAVIGASI ==================== */

export const MENU: [string, string][] = [
  ["home", "HOME"],
  ["coin", "COIN"],
  ["item", "ITEM"],
  ["rank", "RANK"],
  ["bundle", "BUNDLE"],
  ["limited", "LIMITED ITEM"],
  ["cs", "COSTUMER SERVICE"],
  ["admin", "LIST ADMIN"],
];
