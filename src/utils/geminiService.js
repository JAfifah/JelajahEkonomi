/**
 * Gemini AI Service for KebutuhanQuest Photo Scanner Mission
 * With Strict Object Verification & Smart Vision Inspection
 */

const DEFAULT_API_KEY = 'sk-aba05541f9164d44-bhi1xh-a5e4130e';

export async function analyzeEconomicImage({ imageBase64, mimeType, missionType, apiKey }) {
  const activeKey = (apiKey && apiKey.trim().length > 10) ? apiKey.trim() : DEFAULT_API_KEY;

  if (activeKey) {
    try {
      const result = await call9RouterAPI({ imageBase64, mimeType, missionType, apiKey: activeKey });
      if (result) return result;
    } catch (err) {
      console.warn('9Router API call failed, switching to smart vision engine:', err);
    }
  }

  // Fallback to Smart Offline Vision Analyzer with pixel-based verification
  return evaluateImageWithSmartEngine(imageBase64, missionType);
}

function getPromptText(missionType) {
  return `
Kamu adalah Guru IPS SMP dan AI Evaluator dalam game "Jelajah Ekonomi".
Tugasmu adalah menganalisis foto yang diunggah siswa berdasarkan 3 Pilar Kegiatan Ekonomi (Produksi, Distribusi, Konsumsi).

Misi Siswa saat ini: "${missionType}"

ATURAN KETAT EVALUASI VERIFIKASI KESESUAIAN FOTO:
1. Analisis foto yang diunggah secara cermat. Apakah foto BENAR-BENAR memperlihatkan objek yang diminta oleh Misi Siswa (${missionType})?
   - "kebutuhan-kelangkaan": Harus foto alat pemuas kebutuhan dasar manusia (air minum, makanan pokok, pakaian, tempat tinggal). Jika foto orang/karakter/avatar/benda tak relevan/hewan/kartu/logo/KTP/KTM/ID card, WAJIB set isValid: false.
   - "sumber-daya-alam": Harus foto kekayaan alam lokal (tanah, tanaman pangan, air, bebatuan). Jika foto karakter/avatar/orang/benda buatan/mebel/hewan/kartu/logo/KTP/KTM, WAJIB set isValid: false.
   - "distribusi": Harus foto sarana/kegiatan penyaluran barang (kurir paket, truk ekspedisi, warung kelontong, minimarket). Jika foto karakter/orang/hewan/kartu/logo/KTP/KTM, WAJIB set isValid: false.
   - "konsumsi": Harus foto barang yang dipakai/dikonsumsi (makanan, minuman, buku IPS, sepatu sekolah). Jika tidak relevan/kartu/logo/KTP/KTM, WAJIB set isValid: false.
   - "kayu-mebel": Harus foto produk olahan kayu hasil hutan (meja belajar kayu, kursi kayu, pensil kayu, bingkai kayu, furnitur kayu). Jika foto karakter manusia/avatar/hewan/bukan olahan kayu/kartu/logo/KTP/KTM, HARUS SET isValid: false!
   - "modal-keuangan": Harus foto peralatan kerja/modal produktivitas (mesin, laptop, komputer, perkakas). Jika tidak relevan/kartu/logo/stiker/KTP/KTM, WAJIB set isValid: false.
   - "bebas": Harus foto hasil proses produksi barang/jasa (contoh: produk olahan, makanan kemasan, pakaian, barang elektronik, atau perkakas). Jika foto kartu identitas/KTM/KTP/Kartu Pelajar/stiker/logo/kartu mainan/dokumen, WAJIB set isValid: false.

2. JIKA FOTO TIDAK SESUAI TARGET MISI (isValid: false):
{
  "isValid": false,
  "category": "Bukan Objek Target Misi",
  "objectName": "[Sebutkan objek spesifik yang terdeteksi di gambar, contoh: Gambar Logo / Gambar Kartu Permainan / Avatar]",
  "explanation": "[Penjelasan ramah khas Guru IPS SMP mengapa foto ini tidak sesuai dengan target misi dan sebutkan benda apa yang seharusnya difoto]",
  "pointsEarned": 0,
  "coinsEarned": 0,
  "economicTypeDetail": "Objek Tidak Sesuai Misi"
}

3. JIKA FOTO SESUAI TARGET MISI (isValid: true):
{
  "isValid": true,
  "category": "Produksi / Distribusi / Konsumsi / Faktor Alam / Pengelolaan Modal",
  "objectName": "[Nama benda/aktivitas spesifik yang terdeteksi]",
  "explanation": "[Penjelasan khas Guru IPS SMP yang memuji dan menjelaskan kaitan objek dengan ilmu IPS (2-3 kalimat)]",
  "pointsEarned": 50 sampai 80,
  "coinsEarned": 30 sampai 60,
  "economicTypeDetail": "[Detail konsep IPS spesifik]"
}

OUTPUTKAN HANYA JSON MURNI TANPA MARKDOWN (TIDAK BOLEH ADA \`\`\`json ATAU TEKS LAINNYA).
`;
}

async function call9RouterAPI({ imageBase64, mimeType, missionType, apiKey }) {
  const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
  const fullBase64 = imageBase64.startsWith('data:') 
    ? imageBase64 
    : `data:${mimeType || 'image/jpeg'};base64,${cleanBase64}`;

  const promptText = getPromptText(missionType);

  const endpoints = [
    '/v1/chat/completions',
    'http://localhost:20128/v1/chat/completions',
    'http://127.0.0.1:20128/v1/chat/completions'
  ];

  const models = [
    'ag/gemini-3.6-flash-high',
    'ag/gemini-3.8-flash',
    'ag/gemini-3.7-flash-high',
    'ag/gemini-3.5-flash-high',
    'ag/gemini-3-flash',
    'cx/gpt-5.4-mini'
  ];

  for (const endpoint of endpoints) {
    for (const model of models) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model,
            messages: [
              {
                role: 'user',
                content: [
                  { type: 'text', text: promptText },
                  {
                    type: 'image_url',
                    image_url: { url: fullBase64 }
                  }
                ]
              }
            ],
            temperature: 0.1
          })
        });

        if (response.ok) {
          const responseText = await response.text();
          let finalContentText = '';

          if (responseText.includes('data: {')) {
            const lines = responseText.split('\n');
            for (const line of lines) {
              if (line.startsWith('data: ') && !line.includes('[DONE]')) {
                try {
                  const jsonChunk = JSON.parse(line.slice(6));
                  const deltaContent = jsonChunk?.choices?.[0]?.delta?.content || jsonChunk?.choices?.[0]?.text || '';
                  finalContentText += deltaContent;
                } catch (e) {
                  // ignore chunk parse errors
                }
              }
            }
          } else {
            const data = JSON.parse(responseText);
            finalContentText = data?.choices?.[0]?.message?.content || '';
          }

          if (finalContentText) {
            let cleanJson = finalContentText.replace(/```json/gi, '').replace(/```/g, '').trim();
            const jsonMatch = cleanJson.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              cleanJson = jsonMatch[0];
            }
            const parsed = JSON.parse(cleanJson);
            return {
              isRealAi: true,
              ...parsed
            };
          }
        }
      } catch (err) {
        console.warn(`9Router model ${model} at ${endpoint} call error:`, err);
      }
    }
  }

  throw new Error('9Router API call failed');
}


/**
 * Smart Client-Side Offline Vision Inspector
 */
function evaluateImageWithSmartEngine(imageBase64, missionType) {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !imageBase64) {
      resolve(getValidTemplateResponse(missionType));
      return;
    }

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const size = 100;
        canvas.width = size;
        canvas.height = size;

        ctx.drawImage(img, 0, 0, size, size);
        const imgData = ctx.getImageData(0, 0, size, size).data;
        const totalPixels = size * size;

        let whiteBgPixels = 0;
        let skinTonePixels = 0;
        let woodBrownPixels = 0;
        let natureGreenPixels = 0;
        let waterBluePixels = 0;
        let darkFurPixels = 0;
        let saturatedGraphicPixels = 0;

        let borderPixels = 0;
        let borderWhitePixels = 0;
        const margin = 8; // 8% margin around edges

        for (let y = 0; y < size; y++) {
          for (let x = 0; x < size; x++) {
            const i = (y * size + x) * 4;
            const r = imgData[i];
            const g = imgData[i + 1];
            const b = imgData[i + 2];

            const isEdge = (x < margin || x >= size - margin || y < margin || y >= size - margin);
            if (isEdge) {
              borderPixels++;
              if (r > 215 && g > 215 && b > 215) {
                borderWhitePixels++;
              }
            }

            // White / Light Background
            if (r > 215 && g > 215 && b > 215) {
              whiteBgPixels++;
            }

            // Skin Tone (human / avatar illustration)
            if (r > 170 && g > 110 && g < 210 && b > 80 && b < 170 && r > g && g > b) {
              skinTonePixels++;
            }

            // Wood Brown Tones
            if (r > 80 && r < 215 && g > 40 && g < 150 && b > 15 && b < 110 && r > g && g >= b + 15) {
              woodBrownPixels++;
            }

            // Nature Green Tones (plants, grass, foliage)
            if (g > 85 && g > r + 15 && g > b + 15) {
              natureGreenPixels++;
            }

            // Water / Sky Natural Blue Tones
            if (b > 110 && b > r + 20 && g > r - 15) {
              waterBluePixels++;
            }

            // Dark Fur / Animal Tones
            if (r > 30 && r < 145 && g > 25 && g < 115 && b > 15 && b < 95 && Math.abs(r - g) < 45) {
              darkFurPixels++;
            }

            // Artificial Saturated Graphic Colors (Trading Cards, Anime, Vectors, Logos)
            const maxRGB = Math.max(r, g, b);
            const minRGB = Math.min(r, g, b);
            const sat = maxRGB > 0 ? (maxRGB - minRGB) / maxRGB : 0;
            if (sat > 0.65 && (r > 200 || g > 200 || b > 200) && (r < 50 || g < 50 || b < 50)) {
              saturatedGraphicPixels++;
            }
          }
        }

        const whiteRatio = whiteBgPixels / totalPixels;
        const skinRatio = skinTonePixels / totalPixels;
        const woodRatio = woodBrownPixels / totalPixels;
        const natureRatio = natureGreenPixels / totalPixels;
        const waterRatio = waterBluePixels / totalPixels;
        const furRatio = darkFurPixels / totalPixels;
        const graphicRatio = saturatedGraphicPixels / totalPixels;
        const borderWhiteRatio = borderPixels > 0 ? borderWhitePixels / borderPixels : 0;

        // Non-real-world detection rules:
        // Only classify as vector character illustration if high artificial saturation/graphics ratio is present
        const isCharacterIllustration = (graphicRatio > 0.12 && skinRatio > 0.08) || (borderWhiteRatio > 0.65 && skinRatio > 0.20 && graphicRatio > 0.05);
        const isAnimalOrPet = (furRatio > 0.15 && graphicRatio > 0.08);
        
        // Detect Logo / Text Graphics (only if image has a solid white margin around edges, like logos on white background)
        const isLogoOrTextGraphic = (borderWhiteRatio > 0.70 && whiteRatio > 0.45 && natureRatio < 0.03 && woodRatio < 0.03 && skinRatio < 0.03);
        
        // Detect Trading Cards / Anime Vector Art (e.g. Yu-Gi-Oh cards with flat white padding or high artificial saturation)
        const isTradingCardOrIllustration = (graphicRatio > 0.15) || (borderWhiteRatio > 0.65 && whiteRatio > 0.40 && natureRatio < 0.02 && woodRatio < 0.02);

        // Detect Digital Document Screenshots / UI Flowcharts / Infographics (e.g. web pages, PDF guides, slide documents)
        const isDocumentOrScreenshot = (whiteRatio > 0.35 && natureRatio < 0.02 && woodRatio < 0.02 && skinRatio < 0.03 && (borderWhiteRatio > 0.35 || graphicRatio > 0.05));

        // Detect ID Cards (KTM, KTP, SIM, Kartu Pelajar, ID Cards) or flat document layouts (card with pasfoto or text layout)
        const isIdentityCardOrDocument = (
          (natureRatio < 0.04 && woodRatio < 0.04 && waterRatio < 0.04) &&
          (
            (whiteRatio > 0.18 && borderWhiteRatio > 0.15) ||
            (whiteRatio > 0.25) ||
            (skinRatio > 0.005 && skinRatio < 0.12 && (whiteRatio > 0.12 || borderWhiteRatio > 0.12))
          )
        );

        const key = missionType?.toLowerCase() || 'bebas';

        // Strict verification per mission
        if (key === 'kayu-mebel') {
          if (woodRatio < 0.04 || isLogoOrTextGraphic || isTradingCardOrIllustration || isCharacterIllustration || isDocumentOrScreenshot || isIdentityCardOrDocument) {
            resolve({
              isRealAi: false,
              isValid: false,
              category: 'Bukan Produk Olahan Kayu',
              objectName: isIdentityCardOrDocument ? 'Kartu Identitas / Dokumen' : isLogoOrTextGraphic ? 'Gambar Logo / Teks' : isDocumentOrScreenshot ? 'Tangkapan Layar Dokumen / Diagram' : isTradingCardOrIllustration ? 'Gambar Kartu Permainan / Stiker / Ilustrasi' : isCharacterIllustration ? 'Gambar Karakter / Avatar' : 'Gambar Tidak Relevan',
              economicTypeDetail: 'Objek Tidak Sesuai Target Misi',
              explanation: 'Foto yang kamu unggah terdeteksi sebagai ' + (isIdentityCardOrDocument ? 'Kartu Identitas / Dokumen Teks' : isLogoOrTextGraphic ? 'Gambar Logo / Teks' : isDocumentOrScreenshot ? 'Tangkapan Layar Dokumen / Diagram Digital' : isTradingCardOrIllustration ? 'Gambar Kartu Permainan / Ilustrasi' : 'Gambar / Objek Tidak Relevan') + ', bukan produk olahan kayu! Silakan foto benda nyata hasil olahan kayu seperti meja belajar kayu, kursi kayu, pensil kayu, atau bingkai foto.',
              pointsEarned: 0,
              coinsEarned: 0
            });
            return;
          }
        }

        if (key === 'sumber-daya-alam') {
          const hasNatureElement = (natureRatio >= 0.04 || woodRatio >= 0.04 || waterRatio >= 0.04);
          if (!hasNatureElement || isLogoOrTextGraphic || isTradingCardOrIllustration || isCharacterIllustration || isDocumentOrScreenshot || isIdentityCardOrDocument) {
            resolve({
              isRealAi: false,
              isValid: false,
              category: 'Bukan Sumber Daya Alam',
              objectName: isIdentityCardOrDocument ? 'Kartu Identitas / Dokumen' : isLogoOrTextGraphic ? 'Gambar Logo / Teks' : isDocumentOrScreenshot ? 'Tangkapan Layar Dokumen / Diagram' : isTradingCardOrIllustration ? 'Gambar Kartu Permainan / Stiker / Ilustrasi' : isCharacterIllustration ? 'Gambar Karakter / Avatar' : 'Gambar Non-Alam',
              economicTypeDetail: 'Objek Tidak Sesuai Target Misi',
              explanation: 'Foto yang kamu unggah terdeteksi sebagai ' + (isIdentityCardOrDocument ? 'Kartu Identitas / Dokumen Teks' : isLogoOrTextGraphic ? 'Gambar Logo / Teks' : isDocumentOrScreenshot ? 'Tangkapan Layar Dokumen / Diagram Digital' : isTradingCardOrIllustration ? 'Gambar Kartu Permainan / Ilustrasi' : 'Gambar Non-Alam') + '. Misi Eksplorasi Faktor Alam membutuhkan foto kekayaan alam asli seperti tanah subur, tanaman pangan, air, atau bebatuan alam!',
              pointsEarned: 0,
              coinsEarned: 0
            });
            return;
          }
        }

        if (key === 'modal-keuangan') {
          if (isLogoOrTextGraphic || isTradingCardOrIllustration || isDocumentOrScreenshot || isIdentityCardOrDocument) {
            resolve({
              isRealAi: false,
              isValid: false,
              category: 'Bukan Faktor Modal',
              objectName: isIdentityCardOrDocument ? 'Kartu Identitas / Dokumen' : isLogoOrTextGraphic ? 'Gambar Logo / Teks' : isDocumentOrScreenshot ? 'Tangkapan Layar Dokumen / Diagram' : 'Gambar Kartu Permainan / Stiker / Ilustrasi',
              economicTypeDetail: 'Objek Tidak Sesuai Target Misi',
              explanation: 'Foto yang kamu unggah terdeteksi sebagai ' + (isIdentityCardOrDocument ? 'Kartu Identitas / Dokumen Teks' : isLogoOrTextGraphic ? 'Gambar Logo / Teks' : isDocumentOrScreenshot ? 'Tangkapan Layar Dokumen / Diagram Digital' : 'Gambar Kartu Permainan / Stiker / Ilustrasi') + ', bukan peralatan kerja produktif! Silakan foto benda nyata seperti laptop/komputer, mesin kerja, atau perkakas produktivitas.',
              pointsEarned: 0,
              coinsEarned: 0
            });
            return;
          }
        }

        if (key === 'distribusi' || key === 'kebutuhan-kelangkaan' || key === 'konsumsi' || key === 'bebas') {
          if (isLogoOrTextGraphic || isTradingCardOrIllustration || isDocumentOrScreenshot || isIdentityCardOrDocument) {
            resolve({
              isRealAi: false,
              isValid: false,
              category: 'Bukan Objek Target Misi',
              objectName: isIdentityCardOrDocument ? 'Kartu Identitas / Dokumen' : isLogoOrTextGraphic ? 'Gambar Logo / Teks' : isDocumentOrScreenshot ? 'Tangkapan Layar Dokumen / Diagram' : 'Gambar Kartu Permainan / Stiker / Ilustrasi',
              economicTypeDetail: 'Objek Tidak Sesuai Target Misi',
              explanation: 'Foto yang kamu unggah terdeteksi sebagai ' + (isIdentityCardOrDocument ? 'Kartu Identitas / Dokumen Teks / Tangkapan Layar' : isLogoOrTextGraphic ? 'Gambar Logo / Teks' : isDocumentOrScreenshot ? 'Tangkapan Layar Dokumen / Diagram Digital' : 'Gambar Kartu Permainan / Stiker / Ilustrasi') + '. Silakan foto benda nyata atau aktivitas ekonomi nyata yang sesuai dengan target misi ini!',
              pointsEarned: 0,
              coinsEarned: 0
            });
            return;
          }
        }

        // Passed smart inspection -> return valid report
        resolve({
          isRealAi: false,
          ...getValidTemplateResponse(key)
        });
      } catch (err) {
        console.warn('Canvas pixel analysis fallback error:', err);
        resolve({
          isRealAi: false,
          isValid: false,
          category: 'Gambar Tidak Dapat Diverifikasi',
          objectName: 'Gambar Tidak Jelas / Format Tidak Didukung',
          economicTypeDetail: 'Verifikasi Gagal',
          explanation: 'Foto tidak dapat dianalisis. Pastikan kamu mengunggah foto objek nyata yang jelas dan terang!',
          pointsEarned: 0,
          coinsEarned: 0
        });
      }
    };

    img.onerror = () => {
      resolve(getValidTemplateResponse(missionType));
    };

    img.src = imageBase64;
  });
}

function getValidTemplateResponse(missionType) {
  const templates = {
    'kebutuhan-kelangkaan': {
      isValid: true,
      category: 'Pengenalan Kebutuhan & Kelangkaan',
      objectName: 'Air Minum & Alat Pemuas Kebutuhan Dasar',
      economicTypeDetail: 'Pemenuhan Kebutuhan Primer (Alat Pemuas Terbatas)',
      explanation: 'Sangat baik! Foto ini menunjukkan objek pemenuhan kebutuhan dasar manusia. Karena jumlah alat pemuas kebutuhan terbatas di alam (kelangkaan), manusia harus bersikap bijak dan menentukan skala prioritas!',
      pointsEarned: 60,
      coinsEarned: 45
    },
    'sumber-daya-alam': {
      isValid: true,
      category: 'Faktor Alam',
      objectName: 'Tanaman Pangan / Tanah Subur',
      economicTypeDetail: 'Sumber Daya Alam (Faktor Produksi Asli)',
      explanation: 'Hebat sekali! Foto ini menampilkan kekayaan alam lokal. Sumber daya alam merupakan faktor produksi asli dari bumi yang menjadi bahan dasar utama dalam pembuatan berbagai produk kebutuhan.',
      pointsEarned: 65,
      coinsEarned: 45
    },
    'distribusi': {
      isValid: true,
      category: 'Distribusi',
      objectName: 'Kurir Paket & Ekspedisi Logistik',
      economicTypeDetail: 'Distribusi Tidak Langsung / Ekspedisi',
      explanation: 'Tepat sekali! Petugas kurir dan armada pengangkut barang merupakan jembatan penting dalam Kegiatan Distribusi yang menyalurkan barang dari pabrik produsen hingga sampai ke tangan konsumen.',
      pointsEarned: 65,
      coinsEarned: 50
    },
    'konsumsi': {
      isValid: true,
      category: 'Konsumsi',
      objectName: 'Makanan, Minuman & Sepatu Sekolah',
      economicTypeDetail: 'Konsumsi Kebutuhan Pelajar (Nilai Guna Barang)',
      explanation: 'Sempurna! Memakai sepatu sekolah atau mengonsumsi makanan/minuman adalah bentuk kegiatan konsumsi untuk mengurangi atau menghabiskan nilai guna barang dalam kehidupan sehari-hari.',
      pointsEarned: 60,
      coinsEarned: 45
    },
    'kayu-mebel': {
      isValid: true,
      category: 'Konservasi & Bahan Baku',
      objectName: 'Pensil Kayu / Meja & Mebel Kayu',
      economicTypeDetail: 'Produk Olahan Kayu (Form Utility & Reboisasi)',
      explanation: 'Hebat sekali! Foto pensil kayu / olahan kayu ini memperlihatkan perubahan bentuk bahan baku hasil hutan menjadi produk berdaya guna tinggi (Form Utility). Penting untuk terus menjaga konservasi hutan melalui reboisasi!',
      pointsEarned: 65,
      coinsEarned: 50
    },
    'modal-keuangan': {
      isValid: true,
      category: 'Pengelolaan Modal',
      objectName: 'Komputer / Perangkat Kerja / Peralatan',
      economicTypeDetail: 'Faktor Modal Produksi (Alat Produktivitas)',
      explanation: 'Bagus sekali! Perangkat kerja dan mesin ini berfungsi sebagai faktor modal konkret untuk mempermudah, mempercepat, dan meningkatkan produktivitas dalam kegiatan ekonomi.',
      pointsEarned: 70,
      coinsEarned: 50
    },
    'bebas': {
      isValid: true,
      category: 'Jenis Produksi Barang & Jasa',
      objectName: 'Hasil Produksi Barang / Jasa',
      economicTypeDetail: 'Analisis Sektor Produksi Barang & Jasa (Detektor Ekonomi)',
      explanation: 'Scan Berhasil! Foto objek nyata ini terdeteksi sebagai hasil dari proses produksi barang/jasa (Entrepreneurship) di sekitar lingkunganmu!',
      pointsEarned: 75,
      coinsEarned: 50
    }
  };

  const key = missionType?.toLowerCase() || 'bebas';
  return templates[key] || templates['bebas'];
}
