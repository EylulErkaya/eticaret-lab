# eticaret-lab

Mobil Programlama laboratuvarı: React Native + Expo + Expo Router (JavaScript) ile API tabanlı, üç sayfalı e-ticaret uygulaması.

Ürünler [DummyJSON Products API](https://dummyjson.com/docs/products)'den çekilir. Sepet, Context API ile tüm ekranlarda ortak tutulur.

## Ekranlar

| Rota | Dosya | Açıklama |
|------|-------|----------|
| `/` | `app/index.js` | Ürün listesi, arama kutusu, `Sepetim (adet)` butonu |
| `/urun/[id]` | `app/urun/[id].js` | Ürün detayı, indirimli fiyat, "Sepete Ekle" |
| `/sepet` | `app/sepet.js` | Sepet: adet artır/azalt, sil, toplam tutar |

Diğer dosyalar:

- `app/_layout.js`: Stack navigasyonu ve `SepetProvider`
- `components/UrunKarti.js`: yeniden kullanılabilir ürün kartı (props: `urun`, `onPress`)
- `context/SepetContext.js`: sepet state'i, işlemler ve `useSepet` custom hook'u

## Tamamlanan öğrenci görevleri

1. Ürün kartında puan (`rating`) gösterimi
2. Ana sayfadaki sepet butonunda toplam ürün adedi: `Sepetim (3)`
3. Detay sayfasında `discountPercentage` ile indirimli fiyat:
   `indirimliFiyat = fiyat - (fiyat × indirimOranı / 100)`
4. Ek çalışma: `TextInput` ile ürün arama (`/products/search?q=...`)

## Çalıştırma

```bash
npm install
npx expo start --go --clear
```

Telefondaki Expo Go uygulamasıyla QR kodu okutun. Bilgisayar ve telefon aynı ağda olmalıdır. Aynı ağda değilseler `npx expo start --go --tunnel` kullanın.
