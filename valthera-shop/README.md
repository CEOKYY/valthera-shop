# Valthera Grand Bazaar

<!DOCTYPE html>

<html lang="id">

<head>

<meta charset="utf-8">

<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">

<title>Valthera Store</title>

<link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Press+Start+2P&display=swap" rel="stylesheet">

<style>

:root{--bg1:#0b1033;--bg2:#1a1458;--ink:#f1f4ff;--mute:#a9b2e6;--glass:rgba(255,255,255,.09);--edge:rgba(255,255,255,.22);--a:#5ee7ff;--b:#b388ff;--c:#ff8ad8;--shadow:rgba(5,8,40,.5);

box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}

@media (prefers-color-scheme:light){:root:not([data-theme="dark"]){--bg1:#e8f3ff;--bg2:#efe4ff;--ink:#1d1f4a;--mute:#5a5f99;--glass:rgba(255,255,255,.55);--edge:rgba(255,255,255,.9);--shadow:rgba(90,80,170,.25)}}

:root[data-theme="light"]{--bg1:#e8f3ff;--bg2:#efe4ff;--ink:#1d1f4a;--mute:#5a5f99;--glass:rgba(255,255,255,.55);--edge:rgba(255,255,255,.9);--shadow:rgba(90,80,170,.25)}

*{box-sizing:border-box}

html{scroll-padding-top:env(safe-area-inset-top,0px)}

body{margin:0;min-height:100vh;font-family:'Quicksand',system-ui,sans-serif;font-weight:600;color:var(--ink);background:linear-gradient(160deg,var(--bg1),var(--bg2));background-attachment:fixed;overflow-x:hidden}

#bubbles{position:fixed;inset:0;pointer-events:none;z-index:0}

#bubbles i{position:absolute;bottom:-160px;border-radius:50%;background:radial-gradient(circle at 30% 28%,rgba(255,255,255,.55),rgba(94,231,255,.14) 45%,rgba(179,136,255,.1));border:1px solid var(--edge);animation:rise linear infinite}

@keyframes rise{to{transform:translateY(-120vh) translateX(30px)}}

.glass{background:var(--glass);border:1px solid var(--edge);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 10px 30px var(--shadow),inset 0 1px 0 rgba(255,255,255,.3)}

.wrap{position:relative;z-index:1;max-width:760px;margin:0 auto;padding:84px 18px 60px}

.brand{position:fixed;z-index:5;top:calc(env(safe-area-inset-top,0px) + 14px);left:16px;padding:10px 18px;border-radius:999px;font-weight:700;font-size:17px;display:flex;gap:8px;align-items:center}

.brand b{width:14px;height:14px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#fff,var(--a) 50%,var(--b))}

.dock{position:fixed;z-index:6;top:calc(env(safe-area-inset-top,0px) + 14px);right:16px;display:none;flex-direction:column;align-items:flex-end;gap:10px}

.dock.on{display:flex}

.bar{display:flex;align-items:center;gap:8px}

.who{display:flex;align-items:center;gap:8px;padding:5px 14px 5px 5px;border-radius:999px;max-width:0;opacity:0;overflow:hidden;white-space:nowrap;transform:scale(.6);transform-origin:right center;transition:max-width .45s cubic-bezier(.34,1.56,.64,1),opacity .3s,transform .45s cubic-bezier(.34,1.56,.64,1);padding-left:0;padding-right:0}

.dock.open .who{max-width:260px;opacity:1;transform:scale(1);padding:5px 14px 5px 5px}

.who img,.head{width:32px;height:32px;border-radius:50%;image-rendering:pixelated;background:var(--glass)}

.dots{width:46px;height:46px;border-radius:50%;border:1px solid var(--edge);color:var(--ink);font:700 18px 'Quicksand',sans-serif;cursor:pointer;letter-spacing:1px;transition:transform .3s cubic-bezier(.34,1.56,.64,1)}

.dots:hover{transform:scale(1.1)}.dots:active{transform:scale(.9)}

.opts{display:flex;flex-direction:column;align-items:flex-end;gap:9px;pointer-events:none}

.dock.open .opts{pointer-events:auto}

.opt{border:1px solid var(--edge);color:var(--ink);font:700 14px 'Quicksand',sans-serif;padding:11px 20px;border-radius:999px;cursor:pointer;opacity:0;transform:translateY(-14px) scale(.4);transform-origin:top right;transition:transform .5s cubic-bezier(.34,1.56,.64,1),opacity .25s,background .2s}

.dock.open .opt{opacity:1;transform:none;transition-delay:calc(var(--i)*55ms)}

.opt:hover,.opt.act{background:linear-gradient(135deg,var(--a),var(--b));color:#10123a}

.opt.out{color:var(--c)}

button:focus-visible,input:focus-visible{outline:3px solid var(--a);outline-offset:2px}

h1{font-size:clamp(32px,8vw,52px);line-height:1.08;margin:0 0 12px}

h2{font-size:26px;margin:0 0 6px}

p{line-height:1.65;color:var(--mute);margin:0 0 12px}

.hero{padding:30px 24px;border-radius:40px}

.grad{background:linear-gradient(120deg,var(--a),var(--b),var(--c));-webkit-background-clip:text;background-clip:text;color:transparent}

.ipbox{margin-top:18px;display:flex;flex-wrap:wrap;gap:10px}

.pill{padding:12px 20px;border-radius:999px}

.pill small{display:block;color:var(--mute);font-size:12px}

.btn{border:0;cursor:pointer;font:700 15px 'Quicksand',sans-serif;color:#10123a;padding:14px 26px;border-radius:999px;background:linear-gradient(135deg,var(--a),var(--b));box-shadow:0 8px 24px rgba(94,231,255,.35);transition:transform .3s cubic-bezier(.34,1.56,.64,1)}

.btn:hover{transform:scale(1.06)}.btn:active{transform:scale(.94)}

.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:16px;margin-top:16px}

.card{border-radius:32px;padding:14px;transition:transform .35s cubic-bezier(.34,1.56,.64,1)}

.card:hover{transform:translateY(-6px) scale(1.02)}

.card .ph{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:22px;display:block;margin-bottom:10px;background:var(--glass)}

.card h3{margin:0 0 4px;font-size:18px}

.card .pr{color:var(--a);font-weight:700}

.card ul{margin:8px 0 0;padding-left:18px;color:var(--mute);font-size:14px;line-height:1.6}

.tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}

.tags span{padding:8px 16px;border-radius:999px;font-size:13px}

.login{min-height:78vh;display:grid;place-items:center}

.login .box{width:100%;max-width:420px;padding:34px 26px;border-radius:44px;text-align:center}

.login input{width:100%;padding:15px 20px;border-radius:999px;border:1px solid var(--edge);background:var(--glass);color:var(--ink);font:700 16px 'Quicksand',sans-serif;text-align:center;margin:8px 0 16px}

.err{color:var(--c);min-height:20px;font-size:14px;margin:-6px 0 10px}

.view{animation:pop .5s cubic-bezier(.34,1.56,.64,1)}

@keyframes pop{from{opacity:0;transform:scale(.94)}}

.empty{padding:26px;border-radius:30px;text-align:center}

@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}

/* ===== Glassmorphism + animasi tambahan ===== */

.glass{background:linear-gradient(135deg,rgba(255,255,255,.2),rgba(255,255,255,.05) 55%,rgba(255,255,255,.12));backdrop-filter:blur(22px) saturate(180%);-webkit-backdrop-filter:blur(22px) saturate(180%);border:1px solid rgba(255,255,255,.28);box-shadow:0 14px 40px var(--shadow),inset 0 1px 1px rgba(255,255,255,.55),inset 0 -1px 1px rgba(255,255,255,.08)}

.card.glass,.hero.glass,.pill.glass,.box.glass,.empty.glass,.tags span.glass,.opt.glass,.dots.glass,.who.glass,.btn{position:relative;overflow:hidden}

.card.glass::before,.hero.glass::before,.box.glass::before,.pill.glass::before,.opt.glass::before,.dots.glass::before{content:"";position:absolute;inset:0;border-radius:inherit;background:radial-gradient(120% 70% at 15% 0%,rgba(255,255,255,.35),transparent 55%);pointer-events:none}

.card.glass::after,.hero.glass::after,.opt.glass::after{content:"";position:absolute;top:0;left:-70%;width:45%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.35),transparent);transform:skewX(-20deg);pointer-events:none}

.card.glass:hover::after,.hero.glass:hover::after,.opt.glass:hover::after{animation:shine .9s ease}

@keyframes shine{to{left:130%}}

body::before{content:"";position:fixed;inset:-20%;z-index:0;pointer-events:none;filter:blur(60px);opacity:.75;background:radial-gradient(circle at 20% 25%,rgba(94,231,255,.45),transparent 38%),radial-gradient(circle at 80% 30%,rgba(179,136,255,.5),transparent 40%),radial-gradient(circle at 55% 85%,rgba(255,138,216,.4),transparent 42%);animation:aurora 22s ease-in-out infinite alternate}

@keyframes aurora{to{transform:translate(6%,-5%) rotate(8deg) scale(1.15)}}

.grad{background-size:250% 100%;animation:gshift 6s ease-in-out infinite alternate}

@keyframes gshift{to{background-position:100% 0}}

.brand b{animation:pulse 2.4s ease-in-out infinite}

@keyframes pulse{50%{transform:scale(1.35);box-shadow:0 0 14px var(--a)}}

.dots{animation:breathe 3s ease-in-out infinite}

@keyframes breathe{50%{box-shadow:0 0 0 8px rgba(94,231,255,.12),0 14px 40px var(--shadow)}}

.login .box{animation:float 6s ease-in-out infinite}

@keyframes float{50%{transform:translateY(-10px)}}

.hero.glass:first-child{animation:float 7s ease-in-out infinite}

.card.glass,.hero.glass{animation:enter .7s cubic-bezier(.34,1.56,.64,1) backwards;animation-delay:calc(var(--n,0)*90ms)}

@keyframes enter{from{opacity:0;transform:translateY(34px) scale(.85)}}

.card{transform:perspective(800px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))}

.card:hover{transform:perspective(800px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateY(-8px) scale(1.03)}

.card .ph{transition:transform .5s cubic-bezier(.34,1.56,.64,1)}

.card:hover .ph{transform:scale(1.06)}

.tags span{animation:float 4s ease-in-out infinite;animation-delay:calc(var(--n,0)*.4s)}

.rip{position:absolute;border-radius:50%;background:rgba(255,255,255,.55);transform:scale(0);animation:rip .65s ease-out forwards;pointer-events:none}

@keyframes rip{to{transform:scale(1);opacity:0}}

.pop{position:fixed;z-index:9;border-radius:50%;pointer-events:none;border:1px solid rgba(255,255,255,.6);background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.7),rgba(94,231,255,.2));animation:popb 1.1s ease-out forwards}

@keyframes popb{to{transform:translate(var(--dx),-120px) scale(1.6);opacity:0}}

/* ===== TEMA: FiveM GTA5 x Minecraft ===== */

:root:not([data-theme="zz"]):not([data-theme="yy"]){--bg1:#14091f;--bg2:#3b1236;--ink:#fff4e8;--mute:#e2c3b0;--a:#ff8a1f;--b:#ff2d78;--c:#ffd23f;--shadow:rgba(0,0,0,.55)}

body{font-family:'Rajdhani',system-ui,sans-serif;font-size:17px;background:linear-gradient(180deg,#14091f 0%,#3b1236 42%,#b3402f 78%,#ff8a1f 100%) fixed}

body::before{background:radial-gradient(circle at 18% 20%,rgba(255,45,120,.5),transparent 38%),radial-gradient(circle at 85% 35%,rgba(255,138,31,.5),transparent 40%),radial-gradient(circle at 50% 90%,rgba(255,210,63,.35),transparent 42%)}

body::after{content:"";position:fixed;left:0;right:0;bottom:0;height:30vh;z-index:0;pointer-events:none;background:url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 140' preserveAspectRatio='none'%3E%3Cg fill='%230a0512'%3E%3Crect x='0' y='70' width='40' height='70'/%3E%3Crect x='45' y='30' width='34' height='110'/%3E%3Crect x='84' y='85' width='50' height='55'/%3E%3Crect x='140' y='50' width='30' height='90'/%3E%3Crect x='176' y='15' width='38' height='125'/%3E%3Crect x='220' y='75' width='55' height='65'/%3E%3Crect x='282' y='40' width='32' height='100'/%3E%3Crect x='320' y='90' width='48' height='50'/%3E%3Crect x='374' y='25' width='36' height='115'/%3E%3Crect x='416' y='65' width='46' height='75'/%3E%3Crect x='468' y='45' width='30' height='95'/%3E%3Crect x='504' y='80' width='45' height='60'/%3E%3Crect x='555' y='35' width='45' height='105'/%3E%3C/g%3E%3C/svg%3E") repeat-x bottom/700px 100%;opacity:.9}

/* blok Minecraft melayang */

#bubbles i{border-radius:3px;border:2px solid rgba(0,0,0,.4);background:linear-gradient(#5fae4a 0 32%,#7b5333 32%);opacity:.55;animation-name:riseb}

#bubbles i:nth-child(3n){background:linear-gradient(135deg,#9a9a9a,#6d6d6d)}

#bubbles i:nth-child(4n){background:linear-gradient(135deg,#64d8e8,#2aa0b8)}

@keyframes riseb{to{transform:translateY(-120vh) rotate(180deg)}}

/* kaca gelap ala HUD FiveM */

.glass{background:linear-gradient(135deg,rgba(255,255,255,.16),rgba(22,8,32,.55) 60%,rgba(255,138,31,.1));border:1px solid rgba(255,160,60,.35);box-shadow:0 14px 40px var(--shadow),inset 0 1px 1px rgba(255,255,255,.4)}

h1,h2,.brand{font-family:'Press Start 2P',monospace;line-height:1.5;letter-spacing:0}

h1{font-size:clamp(17px,5vw,28px)}h2{font-size:16px}

.brand{font-size:11px;padding:12px 16px}.brand .rp{color:var(--a)}

.opt,.btn,.dots,.login input{font-family:'Rajdhani',sans-serif;text-transform:uppercase;letter-spacing:1.2px;font-size:15px}

.btn{color:#1a0a05;background:linear-gradient(135deg,var(--c),var(--a) 55%,var(--b));box-shadow:0 8px 24px rgba(255,138,31,.45)}

.opt:hover,.opt.act{color:#1a0a05;background:linear-gradient(135deg,var(--c),var(--a))}

.dots{font-family:sans-serif}

.card.glass{border-radius:18px}.card .ph{border-radius:10px;image-rendering:pixelated}

.hero.glass{border-radius:24px}.login .box{border-radius:28px}

.card h3{text-transform:uppercase;letter-spacing:.8px;font-size:19px}

.card .pr{color:#7dff8a;font-size:20px;text-shadow:0 0 12px rgba(125,255,138,.45)}

.tags span{border-radius:8px;text-transform:uppercase;letter-spacing:1px}

.stars{color:var(--c);font-size:20px;letter-spacing:4px;margin-bottom:8px;animation:wanted 1.1s steps(2) infinite}

@keyframes wanted{50%{color:#ff2d4a;text-shadow:0 0 12px #2f6bff}}

.siren{position:fixed;top:0;left:0;right:0;height:4px;z-index:20}

.siren::before,.siren::after{content:"";position:absolute;top:0;height:100%;width:50%;animation:flash 1s steps(1) infinite}

.siren::before{left:0;background:#ff2040}.siren::after{right:0;background:#2f6bff;animation-delay:-.5s}

@keyframes flash{0%{opacity:1}50%{opacity:.1}}

.toast{position:fixed;z-index:30;left:50%;top:26%;transform:translateX(-50%);font:11px 'Press Start 2P',monospace;line-height:1.7;text-align:center;color:var(--c);text-shadow:2px 2px 0 #000,0 0 18px var(--a);padding:0 12px;animation:toast 2.6s ease forwards;pointer-events:none;width:90%}

@keyframes toast{0%{opacity:0;transform:translate(-50%,20px) scale(.7)}12%{opacity:1;transform:translate(-50%,0) scale(1.08)}20%{transform:translate(-50%,0) scale(1)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-14px)}}

</style>

</head>

<body>

<div id="bubbles" aria-hidden="true"></div>

<div class="siren"></div>

<div class="brand glass"><b></b>VALTHERA <span class="rp">STORE</span></div>



<div class="dock" id="dock">

  <div class="bar">

    <div class="who glass"><img id="head" alt="" src=""><span id="nm"></span></div>

    <button class="dots glass" id="dots" aria-label="Menu" aria-expanded="false">•••</button>

  </div>

  <div class="opts" id="opts"></div>

</div>



<main class="wrap" id="app"></main>



<script>

/* ==================== PENGATURAN — EDIT DI SINI ==================== */

const CONFIG = {

  serverName: "Valthera City",

  ip: "play.valthera.id",     // ← ubah IP server

  port: "25565",              // ← ubah port server

  version: "Java 1.20+ / Bedrock",

  headApi: "https://mc-heads.net/avatar/" // API foto kepala skin (+nick)

};



/* Tambah item baru = tambah satu baris {…}. "img" boleh link gambar

   atau nama file lokal (mis. "img/vip.png"). Kosongkan "" untuk gambar bawaan. */

const DATA = {

  rank: [

    {name:"VIP",     price:"Rp 25.000",  img:"", perks:["Kit harian","Warna nama hijau","Slot rumah +1"]},

    {name:"VIP+",    price:"Rp 50.000",  img:"", perks:["Kit mingguan","Prefix khusus","Slot rumah +2"]},

    {name:"Sultan",  price:"Rp 100.000", img:"", perks:["Kendaraan eksklusif","Prefix emas","Slot rumah +4"]}

  ],

  item: [

    {name:"Mobil Sport",  price:"Rp 15.000", img:"", desc:"Kendaraan cepat untuk balapan kota."},

    {name:"Pistol Dasar", price:"Rp 10.000", img:"", desc:"Senjata untuk roleplay aksi."},

    {name:"Kunci Rumah",  price:"Rp 8.000",  img:"", desc:"Tambahan properti di Valthera City."}

  ],

  barqode: [

    {name:"QRIS Valthera Store", img:"", note:"Scan lalu kirim bukti bayar ke Customer Service."}

  ],

  cs: [

    {name:"CS Valthera", img:"", via:"Discord", contact:"discord.gg/valthera"},

    {name:"CS WhatsApp", img:"", via:"WhatsApp", contact:"+62 800-0000-0000"}

  ],

  admin: [

    {name:"OwnerValthera", role:"Owner",      nick:"OwnerValthera", img:""},

    {name:"AdminSatu",     role:"Admin",      nick:"AdminSatu",     img:""},

    {name:"ModDua",        role:"Moderator",  nick:"ModDua",        img:""}

  ]

};



const MENU = [["home","HOME"],["rank","RANK"],["item","ITEM"],["barqode","BARQODE"],["cs","COSTUMER SERVICE"],["admin","LIST ADMIN"]];

/* =================================================================== */



const $ = id => document.getElementById(id);

const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

let player = null, page = "home";



/* gelembung latar */

(function(){const b=$("bubbles");for(let i=0;i<14;i++){const e=document.createElement("i"),s=30+Math.random()*110;

e.style.cssText=`width:${s}px;height:${s}px;left:${Math.random()*100}%;animation-duration:${14+Math.random()*18}s;animation-delay:${-Math.random()*25}s`;b.appendChild(e)}})();



/* gambar bawaan (SVG gelembung) bila foto kosong / gagal dimuat */

function fallback(label){

  const l = esc((label||"?").charAt(0).toUpperCase());

  return "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><radialGradient id='g' cx='30%' cy='25%'><stop offset='0' stop-color='#5ee7ff'/><stop offset='.6' stop-color='#7b6cff'/><stop offset='1' stop-color='#ff8ad8'/></radialGradient></defs><rect width='400' height='300' fill='url(#g)'/><circle cx='320' cy='60' r='40' fill='#fff' opacity='.2'/><circle cx='70' cy='240' r='55' fill='#fff' opacity='.15'/><text x='200' y='188' font-size='120' text-anchor='middle' fill='#fff' font-family='sans-serif' font-weight='700'>${l}</text></svg>`);

}

function img(src, label, cls="ph"){

  const fb = fallback(label);

  return `<img class="${cls}" alt="${esc(label)}" src="${esc(src||fb)}" onerror="this.onerror=null;this.src='${fb.replace(/'/g,"%27")}'">`;

}

const headUrl = n => CONFIG.headApi + encodeURIComponent(n) + "/64";

function headImg(n){ const fb = fallback(n); return `<img class="head" alt="" src="${headUrl(n)}" onerror="this.onerror=null;this.src='${fb.replace(/'/g,"%27")}'">`; }



/* ---------- Login ---------- */

function showLogin(){

  $("dock").classList.remove("on","open");

  $("app").innerHTML = `<section class="login"><div class="box glass view">

    <h1 class="grad" style="font-size:20px">VALTHERA CITY</h1>

    <p>Masukkan nick Minecraft untuk memulai karaktermu di Valthera Store.</p>

    <input id="nick" maxlength="16" placeholder="Nick Minecraft" autocomplete="off" autocapitalize="off" aria-label="Nick Minecraft">

    <div class="err" id="err"></div>

    <button class="btn" id="go">Masuk</button></div></section>`;

  const go = () => {

    const n = $("nick").value.trim();

    if(!/^[A-Za-z0-9_]{3,16}$/.test(n)){ $("err").textContent = "Nick harus 3–16 karakter: huruf, angka, atau _"; return; }

    player = n; try{localStorage.setItem("valthera_nick", n)}catch(e){}

    start();

  };

  $("go").onclick = go;

  $("nick").onkeydown = e => { if(e.key==="Enter") go(); };

}



/* ---------- Menu titik tiga ---------- */

function buildMenu(){

  $("opts").innerHTML = MENU.map(([k,l],i)=>`<button class="opt glass" style="--i:${i}" data-k="${k}">${l}</button>`).join("")

    + `<button class="opt glass out" style="--i:${MENU.length}" data-k="out">KELUAR</button>`;

  $("opts").onclick = e => {

    const k = e.target.dataset.k; if(!k) return;

    if(k==="out"){ try{localStorage.removeItem("valthera_nick")}catch(x){} player=null; showLogin(); return; }

    go(k); toggle(false);

  };

}

function toggle(force){

  const d = $("dock"), open = force===undefined ? !d.classList.contains("open") : force;

  d.classList.toggle("open", open); $("dots").setAttribute("aria-expanded", open);

}

$("dots").onclick = () => toggle();

document.addEventListener("click", e => { if(!$("dock").contains(e.target)) toggle(false); });



/* ---------- Halaman ---------- */

function go(k){

  page = k;

  document.querySelectorAll(".opt").forEach(b => b.classList.toggle("act", b.dataset.k===k));

  const R = {home, rank:()=>cards("Rank","Pilih rank untuk keuntungan lebih di kota.",DATA.rank,r=>`<h3>${esc(r.name)}</h3><div class="pr">${esc(r.price)}</div><ul>${r.perks.map(p=>`<li>${esc(p)}</li>`).join("")}</ul>`),

    item:()=>cards("Item","Barang eksklusif untuk roleplay kamu.",DATA.item,r=>`<h3>${esc(r.name)}</h3><div class="pr">${esc(r.price)}</div><p>${esc(r.desc)}</p>`),

    barqode:()=>cards("Barqode","Scan untuk membayar, lalu kirim bukti ke Customer Service.",DATA.barqode,r=>`<h3>${esc(r.name)}</h3><p>${esc(r.note)}</p>`),

    cs:()=>cards("Costumer Service","Butuh bantuan? Hubungi tim kami.",DATA.cs,r=>`<h3>${esc(r.name)}</h3><div class="pr">${esc(r.via)}</div><p>${esc(r.contact)}</p>`),

    admin:()=>cards("List Admin","Tim yang menjaga Valthera City.",DATA.admin,r=>`<h3>${esc(r.name)}</h3><div class="pr">${esc(r.role)}</div>`, true)};

  $("app").innerHTML = `<div class="view">${R[k]()}</div>`;

  if(k==="home") $("copy").onclick = copyIp;

  window.scrollTo({top:0,behavior:"smooth"});

}

function cards(title, sub, list, body, isAdmin){

  const items = list.map(r => `<article class="card glass">${img(r.img || (isAdmin ? headUrl(r.nick||r.name) : ""), r.name)}${body(r)}</article>`).join("");

  return `<h1 class="grad">${title}</h1><p>${sub}</p>` + (list.length ? `<div class="grid">${items}</div>` : `<div class="empty glass">Belum ada data. Tambahkan di bagian DATA pada file HTML.</div>`);

}

function home(){

  return `<section class="hero glass">

    <h1>Selamat datang, <span class="grad">${esc(player)}</span></h1>

    <p>Belanja rank dan item resmi untuk <b>${esc(CONFIG.serverName)}</b>.</p>

    <div class="ipbox">

      <div class="pill glass"><small>IP Server</small>${esc(CONFIG.ip)}</div>

      <div class="pill glass"><small>Port</small>${esc(CONFIG.port)}</div>

      <button class="btn" id="copy">Salin IP</button>

    </div></section>

    <section class="hero glass" style="margin-top:18px">

      <h2>Tentang ${esc(CONFIG.serverName)}</h2>

      <p>${esc(CONFIG.serverName)} adalah server Minecraft roleplay bergaya FiveM GTA 5. Kamu bisa menjalani hidup sebagai warga kota: bekerja, punya rumah dan kendaraan, berbisnis, bahkan terlibat dunia kriminal atau penegak hukum.</p>

      <p>Setiap pemain bebas membangun cerita karakternya sendiri bersama komunitas yang aktif dan staf yang siap membantu.</p>

      <div class="tags"><span class="glass">Roleplay</span><span class="glass">Ekonomi</span><span class="glass">Pekerjaan</span><span class="glass">Kendaraan</span><span class="glass">Properti</span><span class="glass">${esc(CONFIG.version)}</span></div>

    </section>`;

}

function copyIp(){

  const t = CONFIG.ip + ":" + CONFIG.port, b = $("copy");

  const done = () => { b.textContent = "Tersalin!"; setTimeout(()=>b.textContent="Salin IP",1500); };

  try{ navigator.clipboard.writeText(t).then(done,done); }catch(e){ done(); }

}



function start(){

  $("nm").textContent = player;

  $("head").src = headUrl(player);

  $("head").onerror = function(){ this.onerror=null; this.src = fallback(player); };

  $("dock").classList.add("on"); buildMenu(); go("home");

}

(function(){ let n=null; try{n=localStorage.getItem("valthera_nick")}catch(e){} if(n){player=n;start()}else showLogin(); })();

/* ===== efek tambahan ===== */

const _go = go;

go = function(k){ _go(k); document.querySelectorAll(".card,.hero").forEach((c,i)=>c.style.setProperty("--n",i)); document.querySelectorAll(".tags span").forEach((c,i)=>c.style.setProperty("--n",i)); };

document.addEventListener("pointerdown", e => {

  const t = e.target.closest(".btn,.opt,.dots");

  if(t){ const r=t.getBoundingClientRect(), s=Math.max(r.width,r.height)*2, p=document.createElement("span");

    p.className="rip"; p.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-r.left-s/2}px;top:${e.clientY-r.top-s/2}px`; t.appendChild(p); setTimeout(()=>p.remove(),700); }

  for(let i=0;i<4;i++){ const b=document.createElement("i"), s=8+Math.random()*16; b.className="pop";

    b.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-s/2}px;top:${e.clientY-s/2}px;--dx:${(Math.random()-.5)*90}px`; document.body.appendChild(b); setTimeout(()=>b.remove(),1100); }

});

document.addEventListener("pointermove", e => {

  const c = e.target.closest && e.target.closest(".card"); if(!c || e.pointerType==="touch") return;

  const r=c.getBoundingClientRect(); c.style.setProperty("--ry",((e.clientX-r.left)/r.width-.5)*10+"deg"); c.style.setProperty("--rx",(.5-(e.clientY-r.top)/r.height)*10+"deg");

});

document.addEventListener("pointerout", e => { const c=e.target.closest&&e.target.closest(".card"); if(c){c.style.setProperty("--rx","0deg");c.style.setProperty("--ry","0deg");} });

</script>

</body>

</html>

note : Add a BUY feature that clicks directly to a barcode that I can post a photo of and add a list of RANK and ITEMS in the MENU section.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://valthera-shop.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0bf993e1-662f-49a8-aa3a-9d2170154fb3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
