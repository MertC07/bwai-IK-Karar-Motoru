import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API with the key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const evaluateCandidates = async (jobDescription, requiredSkills, candidates) => {
  try {
    if (!apiKey) {
      throw new Error("Gemini API anahtarı (.env dosyasında VITE_GEMINI_API_KEY) eksik!");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
    Sen bir İK (İnsan Kaynakları) karar motorusun.
    Amacın: Aşağıda verilen iş tanımına, aranan yetkinliklere ve dinamik aday bilgilerine bakarak analiz yapmak, bir artı/eksi tablosu oluşturmak ve en uygun adayı önermek.
    
    Kurallar:
    1. SADECE GEÇERLİ BİR JSON nesnesi döndür. Başka hiçbir açıklama, markdown veya text yazma.
    2. Adayları tecrübe ve yetkinlik bazında 100 üzerinden puanla.
    3. Kararını mantıklı gerekçelerle destekle.

    İş Tanımı:
    ${jobDescription}

    Aranan Yetkinlikler:
    ${requiredSkills}

    Adaylar (JSON Formatında):
    ${JSON.stringify(candidates, null, 2)}

    Beklenen JSON Çıktı Formatı:
    {
      "recommendedCandidate": "Önerilen adayın tam adı",
      "justification": "Neden bu adayı seçtiğine dair detaylı, mantıklı ve ikna edici İK gerekçesi.",
      "candidates": [
        {
          "id": "Adayın benzersiz ID'si (gönderilen listedeki ile aynı olmalı)",
          "name": "Adayın adı",
          "experienceScore": 85,
          "skillScore": 90,
          "pros": ["Artı özellik 1", "Artı özellik 2"],
          "cons": ["Eksi özellik 1", "Eksi özellik 2"],
          "summary": "Adayın kısa özeti"
        }
      ]
    }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Clean markdown blocks if Gemini returns them despite the prompt
    const cleanedText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
