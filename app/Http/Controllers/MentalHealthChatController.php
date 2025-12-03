<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MentalHealthChatController extends Controller
{
    /**
     * Handle the incoming request for mental health chat.
     */
    /**
     * Mendapatkan daftar model Gemini yang tersedia
     */
    private function getAvailableModels()
    {
        $apiKey = config('services.gemini.api_key', env('GEMINI_API_KEY'));
        $listModelsEndpoint = 'https://generativelanguage.googleapis.com/v1/models?key=' . $apiKey;
        
        try {
            $response = Http::get($listModelsEndpoint);
            
            if ($response->successful()) {
                $models = $response->json('models', []);
                $availableModels = [];
                
                // Filter model yang mendukung generateContent
                foreach ($models as $model) {
                    if (isset($model['name']) && 
                        isset($model['supportedGenerationMethods']) && 
                        in_array('generateContent', $model['supportedGenerationMethods'])) {
                        $availableModels[] = $model['name'];
                    }
                }
                
                return $availableModels;
            }
            
            Log::error('Gagal mendapatkan daftar model: ' . $response->body());
            return [];
        } catch (\Exception $e) {
            Log::error('Error saat mengambil daftar model: ' . $e->getMessage());
            return [];
        }
    }
    
    /**
     * Memilih model terbaik yang tersedia
     */
    private function selectBestModel($availableModels)
    {
        // Daftar model berdasarkan prioritas (dari yang paling stabil)
        $preferredModels = [
            'models/gemini-1.0-pro',
            'models/gemini-pro',
            'models/gemini-1.5-pro',
            'models/gemini-1.0-pro-vision',
            'models/gemini-pro-vision',
            'models/gemini-1.5-flash',
            'models/gemini-flash'
        ];
        
        // Pilih model berdasarkan prioritas
        foreach ($preferredModels as $model) {
            if (in_array($model, $availableModels)) {
                return $model;
            }
        }
        
        // Jika tidak ada model yang cocok dengan preferensi, gunakan model pertama yang tersedia
        return !empty($availableModels) ? $availableModels[0] : null;
    }

    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'history' => 'nullable|array',
        ]);

        $message = $request->input('message');
        $history = $request->input('history', []);

        try {
            // Personalisasi untuk model Gemini sebagai praktisi kesehatan mental
            $systemPrompt = "Kamu adalah teman yang baik dan pendengar yang empati. Berbicaralah dengan natural dan santai seperti percakapan sehari-hari antara dua teman. Hindari format formal seperti daftar tips atau saran yang terstruktur.

            Beberapa panduan untuk percakapan:
            - Gunakan bahasa yang hangat dan personal
            - Berikan respons singkat dan to the point (maksimal 3-4 kalimat)
            - Dengarkan dengan empati dan pahami perasaan lawan bicara
            - Tawarkan perspektif baru dengan lembut, bukan menggurui
            - Berbagi pengalaman atau pandangan yang menenangkan
            - Hindari jargon psikologi atau bahasa yang terlalu formal
            
            Ingat, kamu sedang mengobrol santai dengan teman yang butuh dukungan, bukan memberikan konsultasi formal.";

            // Menyiapkan pesan untuk API Gemini sesuai format yang benar
            $contents = [];
            
            // Menambahkan system prompt sebagai bagian dari pesan pertama
            $contents[] = [
                'role' => 'user',
                'parts' => [
                    ['text' => $systemPrompt]
                ]
            ];
            
            // Menambahkan riwayat percakapan dengan format yang benar
            foreach ($history as $msg) {
                $role = $msg['role'] === 'user' ? 'user' : 'model';
                $contents[] = [
                    'role' => $role,
                    'parts' => [
                        ['text' => $msg['content']]
                    ]
                ];
            }
            
            // Menambahkan pesan pengguna terbaru
            $contents[] = [
                'role' => 'user',
                'parts' => [
                    ['text' => $message]
                ]
            ];

            // Konfigurasi untuk API Gemini
            $apiKey = config('services.gemini.api_key', env('GEMINI_API_KEY'));
            
            // Dapatkan model yang tersedia dan pilih yang terbaik
            $availableModels = $this->getAvailableModels();
            $selectedModel = $this->selectBestModel($availableModels);
            
            if (!$selectedModel) {
                Log::error('Tidak ada model Gemini yang tersedia');
                return response()->json(['error' => 'Tidak ada model AI yang tersedia saat ini'], 500);
            }
            
            // Log model yang dipilih
            Log::info('Menggunakan model Gemini: ' . $selectedModel);
            
            // Buat endpoint berdasarkan model yang dipilih
            $endpoint = 'https://generativelanguage.googleapis.com/v1/' . $selectedModel . ':generateContent';
            
            // Kirim permintaan ke API Gemini dengan format yang benar
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post($endpoint . '?key=' . $apiKey, [
                'contents' => $contents,
                'generationConfig' => [
                    'temperature' => 0.7,
                    'topK' => 40,
                    'topP' => 0.95,
                    'maxOutputTokens' => 800,
                ],
                'safetySettings' => [
                    [
                        'category' => 'HARM_CATEGORY_HARASSMENT',
                        'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'
                    ],
                    [
                        'category' => 'HARM_CATEGORY_HATE_SPEECH',
                        'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'
                    ],
                    [
                        'category' => 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                        'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'
                    ],
                    [
                        'category' => 'HARM_CATEGORY_DANGEROUS_CONTENT',
                        'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'
                    ],
                ]
            ]);

            if ($response->successful()) {
                $responseData = $response->json();
                $aiResponse = $responseData['candidates'][0]['content']['parts'][0]['text'] ?? 'Maaf, saya tidak dapat memproses respons saat ini.';
                
                return response()->json([
                    'response' => $aiResponse
                ]);
            } else {
                Log::error('Gemini API Error: ' . $response->body());
                return response()->json([
                    'response' => 'Maaf, terjadi kesalahan saat berkomunikasi dengan asisten AI. Silakan coba lagi nanti.'
                ], 500);
            }
        } catch (\Exception $e) {
            Log::error('Mental Health Chat Error: ' . $e->getMessage());
            return response()->json([
                'response' => 'Maaf, terjadi kesalahan internal. Silakan coba lagi nanti.'
            ], 500);
        }
    }
}