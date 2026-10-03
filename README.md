# Vitrin

Ofislerin kendi daire sayfası. Liste on bir ofisi gösterir. Bir ofise girince tanıtım metni ve ilanları durur. İlanlar tarayıcıda saklanır.

A listing page that belongs to each office. The list shows eleven offices. Opening one shows its introduction and apartments. Listings are stored in the browser.

![Ofis vitrini / Office front](ekran/ana.png)

![Şener Gayrimenkul](ekran/ofis.png)

![İlanlar / Listings](ekran/ilanlar.png)

## Kurulum / Setup

```bash
cd vitrin
python3 -m http.server 8080
```

Aç / Open: http://127.0.0.1:8080

Adresler hash ile değişir. / Routes change with the hash.

- `#/` ofisler / offices
- `#/ilanlar` bütün daireler / all apartments
- `#/ofis/sener` bir ofis / one office

## Teknoloji / Stack

Tek `index.html`, `styles.css` ve `app.js`. Yönlendirme `location.hash` okunarak yapılır; sayfa yenilenmez. Yazı tipleri **Fraunces** ve **Familjen Grotesk**. Ofis kimlikleri betiğin başındaki dizidedir. İlan ve tanıtım metni `localStorage` içine yazılır, bu yüzden her tarayıcı kendi vitrinini görür.

One `index.html`, `styles.css`, and `app.js`. Routing reads `location.hash` and does not reload the page. Typefaces are **Fraunces** and **Familjen Grotesk**. Office identities are the array at the top of the script. Listings and introductions go into `localStorage`, so each browser keeps its own vitrin.
