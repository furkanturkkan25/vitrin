const OFFICES = [
  {
    id: "bolge-emlak",
    name: "Bölge Emlak",
    city: "İstanbul",
    district: "Pendik",
    address: "Kaynarca, Aydınlı Yolu Caddesi No:179/A, Pendik",
    phone: "0216 390 20 23",
    tel: "+902163902023",
    blurb: "Pendik Kaynarca’da satılık ve kiralık konut aracılığı yapıyoruz. Daireyi bu sayfadan, kendi adımızla yayınlıyoruz."
  },
  {
    id: "turnam",
    name: "Turnam Gayrimenkul ve İnşaat",
    city: "İstanbul",
    district: "Pendik",
    address: "Necmettin Erbakan Caddesi No:74/B, Pendik",
    phone: "0532 478 83 63",
    tel: "+905324788363",
    blurb: "Pendik’te konut ve inşaat tarafında çalışıyoruz. Portföyümüz yalnızca bu ofis sayfasında durur."
  },
  {
    id: "utku",
    name: "Utku Gayrimenkul Danışmanlık",
    city: "İstanbul",
    district: "Pendik",
    address: "Doğu Mahallesi, Ece Sokak No:9, Pendik",
    phone: "0536 598 55 75",
    tel: "+905365985575",
    blurb: "Pendik Doğu Mahallesi’ndeki ofisimizden alım, satım ve kiralama danışmanlığı veriyoruz."
  },
  {
    id: "vizyon",
    name: "Vizyon Gayrimenkul",
    city: "Kocaeli",
    district: "Gebze",
    address: "Hacıhalil Mahallesi, Atatürk Caddesi No:22, Gebze",
    phone: "0533 327 61 45",
    tel: "+905333276145",
    blurb: "Gebze Hacıhalil’de, Atatürk Caddesi üzerindeki ofisimizden konut danışmanlığı yapıyoruz."
  },
  {
    id: "ayisigi",
    name: "Ayışığı Gayrimenkul",
    city: "Kocaeli",
    district: "Gebze",
    address: "902/1. Sokak No:6F, Gebze",
    phone: "0545 393 44 92",
    tel: "+905453934492",
    blurb: "Gebze’de satılık ve kiralık daire ile işyeri portföyümüzü buradan paylaşıyoruz."
  },
  {
    id: "sener",
    name: "Şener Gayrimenkul",
    city: "Kocaeli",
    district: "Gebze",
    address: "Gençlik Caddesi No:45 D:6, Gebze",
    phone: "0536 587 00 34",
    tel: "+905365870034",
    blurb: "Gebze ve çevresinde konut ile arsa danışmanlığı veriyoruz. İlanlar bu sayfaya, ofis adına girilir."
  },
  {
    id: "enbir",
    name: "Enbir Gayrimenkul",
    city: "Kocaeli",
    district: "Gebze",
    address: "Tatlıkuyu Mahallesi, Güney Yanyol Caddesi No:236/6, Gebze",
    phone: "0262 644 16 61",
    tel: "+902626441661",
    blurb: "Tatlıkuyu’nda konut ve ticari taşınmaz alım, satım ve kiralaması yapıyoruz."
  },
  {
    id: "asaf-yapi",
    name: "Gebze Emlak Asaf Yapı",
    city: "Kocaeli",
    district: "Gebze",
    address: "6. Sokak No:3, Gebze",
    phone: "0532 650 08 36",
    tel: "+905326500836",
    blurb: "Gebze’deki ofisimizden daire ve işyeri portföyü tutuyoruz."
  },
  {
    id: "vefahane",
    name: "Vefahane Gayrimenkul",
    city: "Kocaeli",
    district: "İzmit",
    address: "Alemdar Caddesi No:39 Kat:2, İzmit",
    phone: "0538 288 32 05",
    tel: "+905382883205",
    blurb: "İzmit merkezde satılık ve kiralık konut danışmanlığı yapıyoruz."
  },
  {
    id: "hasan-saricicek",
    name: "Hasan Sarıçiçek Gayrimenkul",
    city: "Kocaeli",
    district: "İzmit",
    address: "Sanayi Mahallesi, Koray Sokak No:16, İzmit",
    phone: "0530 558 53 78",
    tel: "+905305585378",
    blurb: "İzmit Sanayi Mahallesi’ndeki ofisimizden alım ve satım sürecini biz yürütüyoruz."
  },
  {
    id: "anilis",
    name: "Anılış Gayrimenkul",
    city: "Kocaeli",
    district: "İzmit",
    address: "Banu Sokak No:52 D:1A, İzmit",
    phone: "0532 203 50 99",
    tel: "+905322035099",
    blurb: "İzmit’te konut danışmanlığı veriyoruz. Daireler yalnızca Anılış sayfasında yayınlanır."
  }
];

const KEY = "vitrin-ofisler-v1";
const main = document.getElementById("icerik");

function load() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY));
    if (!data || typeof data !== "object") return { intros: {}, listings: [] };
    return {
      intros: data.intros || {},
      listings: Array.isArray(data.listings) ? data.listings : []
    };
  } catch {
    return { intros: {}, listings: [] };
  }
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[ch]));
}

function money(amount) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return "";
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0
  }).format(n);
}

function officeById(id) {
  return OFFICES.find((office) => office.id === id);
}

function introOf(data, office) {
  const custom = data.intros[office.id];
  return typeof custom === "string" && custom.trim() ? custom.trim() : office.blurb;
}

function parseRoute() {
  const raw = (location.hash || "#/").replace(/^#/, "");
  const parts = raw.split("/").filter(Boolean);
  if (parts[0] === "ilanlar") return { name: "ilanlar" };
  if (parts[0] === "ofis" && parts[1]) return { name: "ofis", id: decodeURIComponent(parts[1]) };
  return { name: "home" };
}

function facade() {
  const cols = 14;
  const rows = 8;
  let windows = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = 70 + c * 80;
      const y = 70 + r * 68;
      const lit = (r * 3 + c * 5) % 11 === 0 || (r === 2 && c === 9) || (r === 5 && c === 3);
      windows += `<rect x="${x}" y="${y}" width="42" height="34" fill="${lit ? "#f2d7a2" : "#1a2824"}"/>`;
    }
  }
  return `<svg class="facade" viewBox="0 0 1200 640" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Apartman cephesi">
    <rect width="1200" height="640" fill="#24312c"/>
    <rect x="28" y="28" width="1144" height="584" fill="#d7d2c8"/>
    <rect x="28" y="28" width="18" height="584" fill="#b7b2a8"/>
    <rect x="1154" y="28" width="18" height="584" fill="#b7b2a8"/>
    ${windows}
    <rect x="28" y="560" width="1144" height="52" fill="#1b4636"/>
  </svg>`;
}

function listingItem(item, data, showOffice) {
  const office = officeById(item.officeId);
  const officeLine = showOffice && office
    ? `<p class="meta"><a class="office-link" href="#/ofis/${esc(office.id)}">${esc(office.name)}</a> · ${esc(office.district)}</p>`
    : "";
  return `<li class="${item.fresh ? "just-added" : ""}" data-id="${esc(item.id)}">
    <span class="deal">${esc(item.deal)}</span>
    <div>
      <h3>${esc(item.title)}</h3>
      <p class="meta">${esc(item.rooms)} · ${esc(item.m2)} m² · ${esc(item.place)}</p>
      ${officeLine}
      ${item.note ? `<p class="meta">${esc(item.note)}</p>` : ""}
    </div>
    <div>
      <p class="price">${esc(money(item.price))}</p>
      ${showOffice ? "" : `<button class="text-btn" type="button" data-remove="${esc(item.id)}">İlanı kaldır</button>`}
    </div>
  </li>`;
}

function home() {
  const groups = ["İstanbul", "Kocaeli"].map((city) => {
    const rows = OFFICES.filter((office) => office.city === city).map((office) => `
      <li>
        <a href="#/ofis/${esc(office.id)}">
          <span class="nm">${esc(office.name)}</span>
          <span class="pl">${esc(office.district)}, ${esc(office.city)}</span>
          <span class="ph">${esc(office.phone)}</span>
        </a>
      </li>`).join("");
    return `<p class="city-label">${esc(city)}</p><ul class="directory">${rows}</ul>`;
  }).join("");

  return `<section class="hero">
      ${facade()}
      <div class="hero-copy">
        <p class="brand">Vitrin</p>
        <h1>Her ofisin kendi eşiği.</h1>
        <p>Sitesiz ofisler dairelerini kendi sayfalarından girer. Tanıtım da, ilan da o ofise aittir.</p>
        <a class="cta" href="#ofisler">Ofisleri aç</a>
      </div>
    </section>
    <section class="section" id="ofisler">
      <h2>Ofisler</h2>
      <p class="lede">İstanbul ve Kocaeli’nde kendi sitesi olmayan ofisler. Birine girin; daire ve tanıtım yalnızca o sayfaya yazılır.</p>
      ${groups}
    </section>
    <p class="foot">İlan ve tanıtım bu tarayıcıda saklanır. Başka bir bilgisayarda görünmesi için sayfanın orada da açılması gerekir.</p>`;
}

function ilanlar(data) {
  const items = [...data.listings].sort((a, b) => b.created - a.created);
  const body = items.length
    ? `<ul class="listings">${items.map((item) => listingItem(item, data, true)).join("")}</ul>`
    : `<p class="empty">Henüz daire yok. Bir ofis sayfasından ilk ilanı girin.</p>`;
  return `<section class="section">
      <h2>İlanlar</h2>
      <p class="lede">Tüm ofislerin girdiği daireler. Her satır, ilanı yazan ofise gider.</p>
      <label class="filter">İl
        <select id="city-filter">
          <option value="">Hepsi</option>
          <option>İstanbul</option>
          <option>Kocaeli</option>
        </select>
      </label>
      <div id="ilan-list">${body}</div>
    </section>`;
}

function filteredListings(data, city) {
  return data.listings
    .filter((item) => {
      if (!city) return true;
      const office = officeById(item.officeId);
      return office && office.city === city;
    })
    .sort((a, b) => b.created - a.created);
}

function ofisPage(data, office) {
  const mine = data.listings
    .filter((item) => item.officeId === office.id)
    .sort((a, b) => b.created - a.created);
  const list = mine.length
    ? `<ul class="listings" id="mine">${mine.map((item) => listingItem(item, data, false)).join("")}</ul>`
    : `<p class="empty" id="mine-empty">Bu ofis henüz daire girmemiş.</p>`;

  return `<article>
    <header class="office-top">
      <p class="where">${esc(office.city)} · ${esc(office.district)}</p>
      <h1>${esc(office.name)}</h1>
      <p class="addr">${esc(office.address)}</p>
      <a class="phone" href="tel:${esc(office.tel)}">Ara ${esc(office.phone)}</a>
    </header>
    <section class="panel">
      <h2>Bu ofis</h2>
      <p class="intro-view" id="intro-view">${esc(introOf(data, office))}</p>
      <form class="stack" id="intro-form">
        <label>Kendinizden bahsedin
          <textarea name="intro" maxlength="500">${esc(introOf(data, office))}</textarea>
        </label>
        <button type="submit">Tanıtımı kaydet</button>
        <p class="note" id="intro-note" hidden>Tanıtım kaydedildi.</p>
      </form>
    </section>
    <section class="panel">
      <h2>Daireler</h2>
      <p class="hint">Yalnızca ${esc(office.name)} ilanları.</p>
      <div id="daire-list">${list}</div>
    </section>
    <section class="panel">
      <h2>Daire ekle</h2>
      <p class="hint">Bu form yalnızca ${esc(office.name)} sayfasına yazar. Başka ofisin vitrinine düşmez.</p>
      <form class="stack" id="listing-form">
        <label>İlan başlığı
          <input name="title" required maxlength="80" placeholder="Örn. Kaynarca’da ara kat 2+1">
        </label>
        <div class="row-2">
          <label>İşlem
            <select name="deal">
              <option>Satılık</option>
              <option>Kiralık</option>
            </select>
          </label>
          <label>Oda
            <select name="rooms">
              <option>1+1</option>
              <option selected>2+1</option>
              <option>3+1</option>
              <option>4+1</option>
              <option>5+1</option>
              <option>Dubleks</option>
            </select>
          </label>
        </div>
        <div class="row-2">
          <label>Metrekare
            <input name="m2" type="number" min="15" max="2000" required value="90">
          </label>
          <label>Fiyat (TL)
            <input name="price" type="number" min="1" required placeholder="4250000">
          </label>
        </div>
        <label>Mahalle
          <input name="place" required maxlength="80" value="${esc(office.district)}">
        </label>
        <label>Kısa not
          <textarea name="note" maxlength="280" placeholder="Kat, cephe, site, eşya durumu"></textarea>
        </label>
        <button type="submit">Daireyi yayınla</button>
        <p class="err" id="form-err" hidden></p>
      </form>
    </section>
  </article>`;
}

function renderList(data, city) {
  const items = filteredListings(data, city);
  const box = document.getElementById("ilan-list");
  if (!box) return;
  box.innerHTML = items.length
    ? `<ul class="listings">${items.map((item) => listingItem(item, data, true)).join("")}</ul>`
    : `<p class="empty">Bu ilde henüz daire yok.</p>`;
}

function bind(route) {
  const data = load();
  if (route.name === "ilanlar") {
    const filter = document.getElementById("city-filter");
    filter?.addEventListener("change", () => renderList(load(), filter.value));
    return;
  }
  if (route.name !== "ofis") return;
  const office = officeById(route.id);
  if (!office) return;

  document.getElementById("intro-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const next = load();
    const text = new FormData(event.currentTarget).get("intro");
    next.intros[office.id] = String(text || "").trim();
    save(next);
    const view = document.getElementById("intro-view");
    if (view) view.textContent = introOf(next, office);
    const note = document.getElementById("intro-note");
    if (note) note.hidden = false;
  });

  document.getElementById("listing-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const title = String(fields.get("title") || "").trim();
    const place = String(fields.get("place") || "").trim();
    const price = Number(fields.get("price"));
    const m2 = Number(fields.get("m2"));
    const err = document.getElementById("form-err");
    if (!title || !place || !Number.isFinite(price) || price <= 0) {
      if (err) {
        err.hidden = false;
        err.textContent = "Başlık, mahalle ve fiyat gerekli.";
      }
      return;
    }
    const next = load();
    const item = {
      id: typeof crypto.randomUUID === "function" ? crypto.randomUUID() : String(Date.now()),
      officeId: office.id,
      title,
      deal: String(fields.get("deal")),
      rooms: String(fields.get("rooms")),
      m2,
      price,
      place,
      note: String(fields.get("note") || "").trim(),
      created: Date.now(),
      fresh: true
    };
    next.listings.push(item);
    save(next);
    form.reset();
    const rooms = form.querySelector('[name="rooms"]');
    const m2Input = form.querySelector('[name="m2"]');
    const placeInput = form.querySelector('[name="place"]');
    if (rooms) rooms.value = "2+1";
    if (m2Input) m2Input.value = "90";
    if (placeInput) placeInput.value = office.district;
    if (err) err.hidden = true;
    const empty = document.getElementById("mine-empty");
    if (empty) empty.remove();
    let list = document.getElementById("mine");
    if (!list) {
      list = document.createElement("ul");
      list.className = "listings";
      list.id = "mine";
      document.getElementById("daire-list")?.append(list);
    }
    list.insertAdjacentHTML("afterbegin", listingItem(item, next, false));
    list.querySelector("li")?.scrollIntoView({ block: "center" });
  });

  main.addEventListener("click", onRemove);
}

function onRemove(event) {
  const button = event.target.closest("[data-remove]");
  if (!button || !main.contains(button)) return;
  const id = button.getAttribute("data-remove");
  const next = load();
  next.listings = next.listings.filter((item) => item.id !== id);
  save(next);
  const row = button.closest("li");
  const list = row?.parentElement;
  row?.remove();
  if (list && !list.children.length) {
    const p = document.createElement("p");
    p.className = "empty";
    p.id = "mine-empty";
    p.textContent = "Bu ofis henüz daire girmemiş.";
    list.replaceWith(p);
  }
}

function render() {
  main.removeEventListener("click", onRemove);
  const route = parseRoute();
  const data = load();
  if (route.name === "ilanlar") {
    document.title = "İlanlar — Vitrin";
    main.innerHTML = ilanlar(data);
  } else if (route.name === "ofis") {
    const office = officeById(route.id);
    if (!office) {
      document.title = "Ofis yok — Vitrin";
      main.innerHTML = `<section class="section"><h2>Bu ofis yok.</h2><p class="lede"><a href="#/">Ofis listesine dön</a></p></section>`;
    } else {
      document.title = `${office.name} — Vitrin`;
      main.innerHTML = ofisPage(data, office);
    }
  } else {
    document.title = "Vitrin — Ofislerin kendi daire sayfası";
    main.innerHTML = home();
  }
  bind(route);
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);
render();
