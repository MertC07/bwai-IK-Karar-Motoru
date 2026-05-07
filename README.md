# İK Karar Motoru (Build With AI Türkiye - Google Developer Communities Turkey)

**İK Karar Motoru**, işe alım süreçlerini hızlandırmak ve optimize etmek amacıyla geliştirilmiş yapay zeka destekli bir web uygulamasıdır. Kullanıcıların girdiği iş tanımlarını ve dinamik olarak eklenen aday profillerini **Google Gemini API** kullanarak analiz eder; ardından tamamen nesnel, verilere dayalı bir değerlendirme ve artı-eksi tablosu sunarak İnsan Kaynakları profesyonellerine en doğru adayı seçmelerinde yardımcı olur.

---

## 🎯 Projenin Amacı

İşe alım süreçlerinde onlarca özgeçmişi manuel olarak okumak ve adayları adil bir şekilde karşılaştırmak oldukça zaman alan bir süreçtir. Bu projenin amacı:
- **Zaman Tasarrufu:** Saniyeler içerisinde birden fazla adayın yetkinliklerini pozisyonun gereksinimlerine göre eşleştirmek.
- **Objektif Karar Alma:** İnsani önyargıları ortadan kaldırarak adayları tamamen tecrübe ve yetkinlik puanlamasına göre değerlendirmek.
- **Detaylı Karşılaştırma:** Adayların pozisyon için "artı" ve "eksi" yönlerini net bir şekilde listeleyerek İK uzmanının karar vermesini kolaylaştırmak.
- **Kullanıcı Deneyimi:** Karışık tablolar yerine modern, cam efekti (glassmorphism) ve koyu tema (dark mode) barındıran "premium" bir arayüz ile kolay kullanım sunmak.

---

## 🛠️ Kullanılan Teknolojiler

Proje, modern web geliştirme standartlarına uygun olarak en güncel teknolojilerle inşa edilmiştir:

- **Frontend Çatısı:** [React.js](https://react.dev/) + [Vite](https://vitejs.dev/) (Hızlı derleme ve sıcak modül değişimi için)
- **Yapay Zeka (AI):** [Google Generative AI SDK (@google/generative-ai)](https://ai.google.dev/) (Gemini Flash modelleri ile metin analizi ve JSON üretimi)
- **Stil & Tasarım:** Vanilla CSS (CSS Variables, Flexbox, Grid) kullanılarak özel Glassmorphism ve Dark Mode tasarımı. TailwindCSS gibi kütüphaneler yerine tamamen özelleştirilmiş premium stiller kullanıldı.
- **İkonlar:** [Lucide React](https://lucide.dev/) (Modern ve hafif SVG ikon kütüphanesi)
- **Tipografi:** Google Fonts (`Inter` ve `Outfit` fontları)

---

## 🚀 Geliştirme Aşamaları

Projenin geliştirme süreci aşağıdaki adımlarla sistematik olarak ilerlemiştir:

### 1. Planlama ve Altyapı Kurulumu
- Uygulamanın amacı ve veri akışı belirlendi.
- `Vite` ile boş bir React projesi oluşturuldu.
- Gemini API SDK'sı ve ikon paketleri (`lucide-react`) projeye dahil edildi.
- Çevresel değişkenler için (API anahtarı güvenliği) `.env` altyapısı kuruldu.

### 2. Premium Arayüz (UI/UX) Tasarımı
- Projeye `index.css` dosyası üzerinden küresel tasarım token'ları (CSS değişkenleri) eklendi.
- Koyu arka planlar, transparan kartlar (glassmorphism), renkli gradient yazılar ve mikro animasyonlar tasarlanarak modern bir görünüm elde edildi.

### 3. Bileşenlerin (Components) Geliştirilmesi
Uygulama modüler bir yapıda, farklı bileşenlere ayrılarak kodlandı:
- **`Header.jsx`:** Uygulama başlığı ve amblemi.
- **`JobForm.jsx`:** Kullanıcının pozisyonun iş tanımını ve beklenen yetkinliklerini girebileceği bölüm.
- **`CandidateList.jsx`:** İstenildiği kadar adayın (Ad ve Özgeçmiş) dinamik olarak eklenebilmesini ve silinebilmesini sağlayan form alanı.
- **`ResultsDashboard.jsx`:** Gemini API'den dönen JSON verilerini görselleştiren pano. En uygun adayı hero alanında öne çıkarıp, diğer adayları 100 üzerinden tecrübe/yetkinlik puanları ve artı/eksi listeleriyle tablo olarak sunar.

### 4. Yapay Zeka Entegrasyonu (`geminiService.js`)
- Gemini API'ye gönderilecek olan özel **Sistem İstemini (System Prompt)** hazırlandı. Prompt'a adayın analizi sonucunda sadece geçerli bir `JSON` objesi döndürmesi kuralı koyuldu.
- Hata yönetimi (API limitlerinin aşılması, internet kopması) ve yüklenme (loading) durumları ayarlandı.

---

## ⚙️ Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1. **Bağımlılıkları Yükleyin:**
   Terminali açın ve proje dizinindeyken paketleri kurun:
   ```bash
   npm install
   ```

2. **API Anahtarını Ekleyin:**
   Proje ana dizininde (package.json ile aynı yerde) bir `.env` dosyası oluşturun (eğer yoksa) ve içerisine Google AI Studio'dan aldığınız Gemini API anahtarını ekleyin:
   ```env
   VITE_GEMINI_API_KEY=sizin_api_anahtariniz_buraya
   ```

3. **Projeyi Başlatın:**
   Geliştirme sunucusunu başlatmak için şu komutu çalıştırın:
   ```bash
   npm run dev
   ```

4. **Tarayıcıda Görüntüleyin:**
   Terminalde beliren adresi (genellikle `http://localhost:5173`) tarayıcınızda açarak İK Karar Motoru'nu kullanmaya başlayabilirsiniz.
