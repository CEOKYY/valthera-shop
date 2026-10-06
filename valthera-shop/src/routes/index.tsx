import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CONFIG, DATA, MENU, CATS, ITEM_SUBS, PRODUCTS, fmt, CS_DISCORD_URL, CS_WHATSAPP_URL, type Cat, type Product,
} from "@/lib/store-data";
import logoAsset from "@/assets/valthera-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Valthera Shop — Upgrade Your Roleplay Experience" },
      {
        name: "description",
        content: "Toko resmi Valthera City: Coin, kendaraan, property, particle, rank, bundle, dan item limited untuk server roleplay bergaya FiveM GTA 5.",
      },
      { property: "og:title", content: "Valthera Shop — Valthera City" },
      { property: "og:description", content: "Upgrade Your Roleplay Experience di Valthera City." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ValtheraStore,
});

/* ---------- helpers ---------- */

function fallbackImg(label: string, hue = 190) {
  const l = (label || "?").charAt(0).toUpperCase();
  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='hsl(${hue},85%,55%)'/><stop offset='1' stop-color='hsl(${hue + 60},80%,30%)'/></linearGradient></defs><rect width='400' height='300' fill='url(#g)'/><circle cx='320' cy='60' r='40' fill='#fff' opacity='.2'/><circle cx='70' cy='240' r='55' fill='#fff' opacity='.15'/><text x='200' y='188' font-size='120' text-anchor='middle' fill='#fff' font-family='sans-serif' font-weight='700'>${l}</text></svg>`,
    )
  );
}

const headUrl = (n: string) => CONFIG.headApi + encodeURIComponent(n) + "/64";
const css = (o: Record<string, string | number>) => o as React.CSSProperties;
const status = (p: Product) => (p.stock == null ? "Tersedia" : p.stock > 0 ? `Stok ${p.stock}` : "Habis");

function Ph({ src, label, hue }: { src: string; label: string; hue?: number }) {
  return (
    <img
      className="ph"
      alt={label}
      src={src || fallbackImg(label, hue)}
      onError={(e) => {
        const t = e.currentTarget;
        t.onerror = null;
        t.src = fallbackImg(label, hue);
      }}
    />
  );
}

function useEsc(fn: () => void) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && fn();
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [fn]);
}

function Countdown({ to }: { to: string }) {
  const [t, setT] = useState("--");
  useEffect(() => {
    const end = new Date(to).getTime();
    const f = () => {
      const s = Math.max(0, Math.floor((end - Date.now()) / 1000));
      const z = (n: number) => String(n).padStart(2, "0");
      setT(`${Math.floor(s / 86400)}h ${z(Math.floor((s % 86400) / 3600))}j ${z(Math.floor((s % 3600) / 60))}m ${z(s % 60)}d`);
    };
    f();
    const id = window.setInterval(f, 1000);
    return () => window.clearInterval(id);
  }, [to]);
  return <>{t}</>;
}

type BuyTarget = { name: string; price: string } | null;

/* ---------- app ---------- */

function ValtheraStore() {
  const [player, setPlayer] = useState<string | null>(() => {
    try {
      return localStorage.getItem("valthera_nick");
    } catch {
      return null;
    }
  });
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const [shopCat, setShopCat] = useState<Cat | "all">("all");
  const [pop, setPop] = useState<{ cat: Cat; out: boolean } | null>(null);
  const [detail, setDetail] = useState<Product | null>(null);
  const [buy, setBuy] = useState<BuyTarget>(null);
  const [toast, setToast] = useState<string | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  }, []);

  /* card tilt */
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const c = (e.target as HTMLElement).closest?.(".card") as HTMLElement | null;
      if (!c || e.pointerType === "touch") return;
      const r = c.getBoundingClientRect();
      c.style.setProperty("--ry", ((e.clientX - r.left) / r.width - 0.5) * 10 + "deg");
      c.style.setProperty("--rx", (0.5 - (e.clientY - r.top) / r.height) * 10 + "deg");
    };
    const onOut = (e: PointerEvent) => {
      const c = (e.target as HTMLElement).closest?.(".card") as HTMLElement | null;
      if (c) {
        c.style.setProperty("--rx", "0deg");
        c.style.setProperty("--ry", "0deg");
      }
    };
    const onClick = (e: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const login = (nick: string) => {
    setPlayer(nick);
    try {
      localStorage.setItem("valthera_nick", nick);
    } catch {
      /* ignore */
    }
    setPage("home");
  };

  const logout = () => {
    try {
      localStorage.removeItem("valthera_nick");
    } catch {
      /* ignore */
    }
    setPlayer(null);
    setMenuOpen(false);
  };

  const top = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const go = (k: string) => {
    setPage(k);
    setMenuOpen(false);
    top();
  };
  const openCat = (c: Cat) => {
    setPop({ cat: c, out: false });
    setMenuOpen(false);
  };
  const closePop = (then?: () => void) => {
    setPop((p) => p && { ...p, out: true });
    window.setTimeout(() => {
      setPop(null);
      then?.();
    }, 260);
  };
  const viewItems = (c: Cat) =>
    closePop(() => {
      setShopCat(c);
      setPage("shop");
      top();
    });
  const shopAll = () => {
    setShopCat("all");
    go("shop");
  };
  const nav = (k: string) => {
    if (k === "item") {
      setPage("item");
      setItemOpen((o) => !o);
      top();
    } else if (k in CATS) openCat(k as Cat);
    else go(k);
  };

  const copyIp = () => {
    const t = `${CONFIG.ip}:${CONFIG.port}`;
    try {
      navigator.clipboard.writeText(t).catch(() => {});
    } catch {
      /* ignore */
    }
    showToast("IP SERVER TERSALIN!");
  };

  return (
    <>
      <div className="siren" />
      <div className="brand glass">
        <img className="brandlogo" src={logoAsset.url} alt="Logo Valthera Shop" />
        VALTHERA <span className="rp">SHOP</span>
      </div>

      {player && (
        <div className={`dock${menuOpen ? " open" : ""}`} ref={dockRef}>
          <div className="bar">
            <div className="who glass">
              <img
                alt=""
                src={headUrl(player)}
                onError={(e) => {
                  const t = e.currentTarget;
                  t.onerror = null;
                  t.src = fallbackImg(player);
                }}
              />
              <span>{player}</span>
            </div>
            <button className="dots glass" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
              •••
            </button>
          </div>
          <div className="opts">
            {MENU.flatMap(([k, l], i) => [
              <button
                key={k}
                className={`opt glass${page === k ? " act" : ""}`}
                style={css({ "--i": i })}
                onClick={() => nav(k)}
              >
                {l}
                {k === "item" ? (itemOpen ? " ▴" : " ▾") : ""}
              </button>,
              ...(k === "item" && itemOpen
                ? ITEM_SUBS.map((c) => (
                    <button key={c} className="opt glass sub" style={css({ "--i": 0 })} onClick={() => openCat(c)}>
                      {CATS[c].icon} {CATS[c].label}
                    </button>
                  ))
                : []),
            ])}
            <button className="opt glass out" style={css({ "--i": MENU.length })} onClick={logout}>
              KELUAR
            </button>
          </div>
        </div>
      )}

      <main className="wrap">
        {!player ? (
          <Login onLogin={login} />
        ) : (
          <div className="view" key={`${page}-${shopCat}`}>
            {page === "home" && (
              <Home player={player} onCopy={copyIp} onOpen={openCat} onShop={shopAll} onDetail={setDetail} onBuy={(p) => setBuy({ name: p.name, price: fmt(p.price) })} />
            )}
            {page === "item" && <ItemPage onOpen={openCat} />}
            {page === "shop" && <ShopPage cat0={shopCat} onDetail={setDetail} onBuy={(p) => setBuy({ name: p.name, price: fmt(p.price) })} />}
            {page === "cs" && <CsPage />}
            {page === "admin" && <AdminPage />}
          </div>
        )}
      </main>

      {pop && <CatModal cat={pop.cat} out={pop.out} onClose={() => closePop()} onView={() => viewItems(pop.cat)} />}
      {detail && (
        <DetailModal
          p={detail}
          onClose={() => setDetail(null)}
          onBuy={(p) => {
            setDetail(null);
            setBuy({ name: p.name, price: fmt(p.price) });
          }}
        />
      )}
      {buy && <BuyModal target={buy} player={player ?? ""} onClose={() => setBuy(null)} />}
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </>
  );
}

/* ---------- product UI ---------- */

function ProductCard({ p, i, onDetail, onBuy }: { p: Product; i: number; onDetail: (p: Product) => void; onBuy: (p: Product) => void }) {
  const c = CATS[p.category];
  return (
    <article className="card glass" style={css({ "--n": Math.min(i, 8) })}>
      <Ph src={p.image} label={p.name} hue={c.hue} />
      <div className="badges">
        <span className="bdg">{p.group ?? c.label}</span>
        {p.badge && <span className={`bdg${p.limited ? " lim" : p.badge === "COSMETIC" ? " cos" : ""}`}>{p.badge}</span>}
        {p.featured && <span className="bdg">FEATURED</span>}
      </div>
      <h3>{p.name}</h3>
      <div className="pr">
        {fmt(p.price)}
        {p.originalPrice && <span className="old">{fmt(p.originalPrice)}</span>}
      </div>
      {p.discount ? <div className="save">Hemat {fmt(p.discount)}</div> : null}
      <p>{p.description}</p>
      {p.category === "bundle" && p.contents && (
        <ul>
          {p.contents.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      )}
      {p.endsAt && (
        <div className="meta">
          <span>
            Berakhir: <b className="cd"><Countdown to={p.endsAt} /></b>
          </span>
        </div>
      )}
      <div className="meta">
        <span>{status(p)}</span>
      </div>
      <div className="acts">
        <button className="btn ghost" onClick={() => onDetail(p)}>
          Detail
        </button>
        <button className="btn" disabled={p.stock === 0} onClick={() => onBuy(p)}>
          Beli
        </button>
      </div>
    </article>
  );
}

function CatCard({ cat, i, onOpen }: { cat: Cat; i: number; onOpen: (c: Cat) => void }) {
  const c = CATS[cat];
  return (
    <button className="card glass catcard" style={css({ "--n": i })} onClick={() => onOpen(cat)}>
      <span className="ic" aria-hidden="true">{c.icon}</span>
      <h3>{c.label}</h3>
      <p>{c.desc}</p>
    </button>
  );
}

function CatModal({ cat, out, onClose, onView }: { cat: Cat; out: boolean; onClose: () => void; onView: () => void }) {
  useEsc(onClose);
  const c = CATS[cat];
  const f = PRODUCTS.find((p) => p.category === cat && p.featured) ?? PRODUCTS.find((p) => p.category === cat);
  return (
    <div className={`ov${out ? " out" : ""}`} onClick={onClose} role="dialog" aria-modal="true" aria-label={c.label}>
      <div className="pc glass" onClick={(e) => e.stopPropagation()}>
        <button className="x" aria-label="Tutup" onClick={onClose}>✕</button>
        <div className="big" aria-hidden="true">{c.icon}</div>
        <h2 className="grad">{c.label}</h2>
        <p>{c.desc}</p>
        {f && (
          <div className="feat">
            <span>
              <small>Featured</small>
              <br />
              <b>{f.name}</b>
            </span>
            <span className="pr">{fmt(f.price)}</span>
          </div>
        )}
        <button className="btn" onClick={onView}>
          View Items
        </button>
      </div>
    </div>
  );
}

function DetailModal({ p, onClose, onBuy }: { p: Product; onClose: () => void; onBuy: (p: Product) => void }) {
  useEsc(onClose);
  const c = CATS[p.category];
  return (
    <div className="ov sheet" onClick={onClose} role="dialog" aria-modal="true" aria-label={p.name}>
      <div className="pc glass dt" onClick={(e) => e.stopPropagation()}>
        <button className="x" aria-label="Tutup" onClick={onClose}>✕</button>
        <Ph src={p.image} label={p.name} hue={c.hue} />
        <div className="badges">
          <span className="bdg">{c.label}</span>
          {p.group && <span className="bdg">{p.group}</span>}
          {p.badge && <span className={`bdg${p.limited ? " lim" : p.badge === "COSMETIC" ? " cos" : ""}`}>{p.badge}</span>}
        </div>
        <h2 className="grad">{p.name}</h2>
        <div className="pr">
          {fmt(p.price)}
          {p.originalPrice && <span className="old">{fmt(p.originalPrice)}</span>}
        </div>
        {p.discount ? <div className="save">Total hemat {fmt(p.discount)}</div> : null}
        <p>{p.description}</p>
        {p.contents && (
          <>
            <h4>Isi</h4>
            <ul>{p.contents.map((x) => <li key={x}>{x}</li>)}</ul>
          </>
        )}
        {p.perks && (
          <>
            <h4>Perks</h4>
            <ul>{p.perks.map((x) => <li key={x}>{x}</li>)}</ul>
          </>
        )}
        <div className="meta">
          <span>Status: {status(p)}</span>
          {p.endsAt && <b className="cd"><Countdown to={p.endsAt} /></b>}
        </div>
        <div className="acts">
          <button className="btn ghost" onClick={onClose}>Tutup</button>
          <button className="btn" disabled={p.stock === 0} onClick={() => onBuy(p)}>Beli Sekarang</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- pages ---------- */

function Home({ player, onCopy, onOpen, onShop, onDetail, onBuy }: {
  player: string; onCopy: () => void; onOpen: (c: Cat) => void; onShop: () => void;
  onDetail: (p: Product) => void; onBuy: (p: Product) => void;
}) {
  const sections: [string, Product[], Cat?][] = [
    ["Featured Items", PRODUCTS.filter((p) => p.featured).slice(0, 4)],
    ["Popular Products", PRODUCTS.filter((p) => p.popular).slice(0, 4)],
    ...(["rank", "vehicle", "property", "particle", "bundle", "limited"] as Cat[]).map((c): [string, Product[], Cat] => {
      const all = PRODUCTS.filter((p) => p.category === c);
      return [
        { rank: "Citizen Ranks", vehicle: "Vehicles", property: "Property", particle: "Particle", bundle: "Bundles", limited: "Limited Items" }[c as string] ?? c,
        [...all.filter((p) => p.featured), ...all.filter((p) => !p.featured)].slice(0, 3),
        c,
      ];
    }),
  ];
  return (
    <>
      <section className="hero glass">
        <h1>
          VALTHERA <span className="grad">SHOP</span>
        </h1>
        <p>Upgrade Your Roleplay Experience</p>
        <p>
          Selamat datang, <b>{player}</b>. Belanja resmi untuk <b>{CONFIG.serverName}</b>.
        </p>
        <div className="ipbox">
          <button className="btn" onClick={onShop}>
            SHOP NOW
          </button>
          <div className="pill glass">
            <small>IP Server</small>
            {CONFIG.ip}
          </div>
          <div className="pill glass">
            <small>Port</small>
            {CONFIG.port}
          </div>
          <button className="btn ghost" onClick={onCopy}>
            Salin IP
          </button>
        </div>
      </section>

      <div className="catgrid">
        {(Object.keys(CATS) as Cat[]).map((c, i) => (
          <CatCard key={c} cat={c} i={i} onOpen={onOpen} />
        ))}
      </div>

      {sections.map(([title, items, cat]) => (
        <section key={title} className="hero glass" style={{ marginTop: 18 }}>
          <h2 className="grad">{title}</h2>
          <div className="grid">
            {items.map((p, i) => (
              <ProductCard key={p.id} p={p} i={i} onDetail={onDetail} onBuy={onBuy} />
            ))}
          </div>
          {cat && (
            <button className="btn ghost seeall" onClick={() => onOpen(cat)}>
              Lihat semua {CATS[cat].label}
            </button>
          )}
        </section>
      ))}

      <section className="hero glass" style={{ marginTop: 18 }}>
        <h2>Tentang {CONFIG.serverName}</h2>
        <p>
          {CONFIG.serverName} adalah server Minecraft roleplay bergaya FiveM GTA 5. Kamu bisa menjalani hidup sebagai warga kota: bekerja, punya rumah dan kendaraan, berbisnis, bahkan terlibat dunia kriminal atau penegak hukum.
        </p>
        <div className="tags">
          {["Roleplay", "Ekonomi", "Pekerjaan", "Kendaraan", "Properti", CONFIG.version].map((t, i) => (
            <span key={t} className="glass" style={css({ "--n": i })}>
              {t}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}

function ItemPage({ onOpen }: { onOpen: (c: Cat) => void }) {
  return (
    <>
      <h1 className="grad">Item</h1>
      <p>Pilih kategori item untuk roleplay kamu.</p>
      <div className="catgrid">
        {ITEM_SUBS.map((c, i) => (
          <CatCard key={c} cat={c} i={i} onOpen={onOpen} />
        ))}
      </div>
    </>
  );
}

function ShopPage({ cat0, onDetail, onBuy }: { cat0: Cat | "all"; onDetail: (p: Product) => void; onBuy: (p: Product) => void }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Cat | "all">(cat0);
  const [sort, setSort] = useState("def");
  const [price, setPrice] = useState("all");
  const [flag, setFlag] = useState("all");
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    const inRange = (n: number) => price === "all" || (price === "lt" ? n < 25000 : price === "mid" ? n >= 25000 && n <= 75000 : n > 75000);
    let r = PRODUCTS.filter((p) => {
      if (!s && cat !== "all" && p.category !== cat) return false;
      if (s && !`${p.name} ${CATS[p.category].label} ${p.group ?? ""} ${p.description}`.toLowerCase().includes(s)) return false;
      if (!inRange(p.price)) return false;
      return flag === "all" || (flag === "popular" ? p.popular : flag === "limited" ? p.limited : p.featured);
    });
    if (sort === "asc") r = [...r].sort((a, b) => a.price - b.price);
    else if (sort === "desc") r = [...r].sort((a, b) => b.price - a.price);
    else if (sort === "new") r = [...r].reverse();
    return r;
  }, [q, cat, sort, price, flag]);
  return (
    <>
      <h1 className="grad">{cat === "all" ? "Katalog" : CATS[cat].label}</h1>
      <div className="toolbar">
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari coin, kendaraan, rank, bundle..." aria-label="Cari produk" />
        <select value={cat} onChange={(e) => setCat(e.target.value as Cat | "all")} aria-label="Kategori">
          <option value="all">Semua kategori</option>
          {(Object.keys(CATS) as Cat[]).map((c) => (
            <option key={c} value={c}>{CATS[c].label}</option>
          ))}
        </select>
        <select value={price} onChange={(e) => setPrice(e.target.value)} aria-label="Filter harga">
          <option value="all">Semua harga</option>
          <option value="lt">Di bawah Rp25.000</option>
          <option value="mid">Rp25.000 – Rp75.000</option>
          <option value="gt">Di atas Rp75.000</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Urutkan">
          <option value="def">Urutan awal</option>
          <option value="asc">Harga termurah</option>
          <option value="desc">Harga termahal</option>
          <option value="new">Terbaru</option>
        </select>
      </div>
      <div className="chips">
        {[["all", "Semua"], ["popular", "Popular"], ["limited", "Limited"], ["featured", "Featured"]].map(([k, l]) => (
          <button key={k} className={`chip${flag === k ? " on" : ""}`} onClick={() => setFlag(k)}>
            {l}
          </button>
        ))}
      </div>
      {list.length ? (
        <div className="grid">
          {list.map((p, i) => (
            <ProductCard key={p.id} p={p} i={i} onDetail={onDetail} onBuy={onBuy} />
          ))}
        </div>
      ) : (
        <p className="empty glass">Tidak ada produk yang cocok. Ubah kata kunci atau filter.</p>
      )}
    </>
  );
}

function Login({ onLogin }: { onLogin: (nick: string) => void }) {
  const [nick, setNick] = useState("");
  const [err, setErr] = useState("");
  const submit = () => {
    const n = nick.trim();
    if (!/^[A-Za-z0-9_]{3,16}$/.test(n)) {
      setErr("Nick harus 3–16 karakter: huruf, angka, atau _");
      return;
    }
    onLogin(n);
  };
  return (
    <section className="login">
      <div className="box glass view">
        <div className="stars">★★★★★</div>
        <h1 className="grad" style={{ fontSize: 20 }}>
          VALTHERA CITY
        </h1>
        <p>Masukkan nick Minecraft untuk memulai karaktermu di Valthera Store.</p>
        <input
          value={nick}
          onChange={(e) => setNick(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          maxLength={16}
          placeholder="Nick Minecraft"
          autoComplete="off"
          autoCapitalize="off"
          aria-label="Nick Minecraft"
        />
        <div className="err">{err}</div>
        <button className="btn" onClick={submit}>
          Masuk
        </button>
      </div>
    </section>
  );
}

function CsPage() {
  return (
    <>
      <h1 className="grad">Costumer Service</h1>
      <p>Butuh bantuan? Klik kartu untuk langsung chat tim kami.</p>
      <div className="grid">
        {DATA.cs.map((r, i) => (
          <a
            key={r.name}
            href={r.link}
            target="_blank"
            rel="noopener noreferrer"
            className="card glass"
            style={{ "--n": i } as React.CSSProperties}
            aria-label={`Hubungi ${r.name} via ${r.via}`}
          >
            <Ph src={r.img} label={r.name} />
            <h3>{r.name}</h3>
            <div className="pr">{r.via}</div>
            <p>{r.contact}</p>
            <span className="btn csbtn">Chat Sekarang</span>
          </a>
        ))}
      </div>
    </>
  );
}

function AdminPage() {
  return (
    <>
      <h1 className="grad">List Admin</h1>
      <p>Tim yang menjaga Valthera City.</p>
      <div className="grid">
        {DATA.admin.map((r, i) => (
          <article key={r.name} className="card glass" style={{ "--n": i } as React.CSSProperties}>
            <Ph src={r.img || headUrl(r.nick || r.name)} label={r.name} />
            <h3>{r.name}</h3>
            <div className="pr">{r.role}</div>
          </article>
        ))}
      </div>
    </>
  );
}

/* ---------- buy modal (QRIS / barcode) ---------- */

function BuyModal({
  target,
  player,
  onClose,
}: {
  target: NonNullable<BuyTarget>;
  player: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={`Beli ${target.name}`}>
      <div className="qrbox glass" onClick={(e) => e.stopPropagation()}>
        <h2 className="grad">BELI {target.name}</h2>
        <div className="pr">{target.price}</div>
        <img
          className="qrimg"
          alt="QRIS Valthera Store"
          src={CONFIG.qrisImage}
          onError={(e) => {
            const t = e.currentTarget;
            t.onerror = null;
            t.src = fallbackImg("QRIS");
          }}
        />
        <ol className="steps">
          <li>Scan barcode / QRIS di atas dengan aplikasi pembayaran kamu.</li>
          <li>Bayar sesuai harga: {target.price}.</li>
          <li>
            Pilih CS di bawah, lalu kirim bukti bayar + nick <b>{player}</b> + nama pesanan ({target.name}).
          </li>
        </ol>
        <p className="cspick">PILIH CS — KLIK LANGSUNG BUKA CHAT:</p>
        <div className="row">
          <a className="btn" href={CS_DISCORD_URL} target="_blank" rel="noopener noreferrer">
            CS Valthera
          </a>
          <a className="btn wa" href={CS_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            CS WhatsApp
          </a>
        </div>
        <div className="row" style={{ marginTop: 10 }}>
          <button className="btn ghost" onClick={onClose}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
