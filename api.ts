
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Part, Modality } from "@google/genai";
import { IdPhotoSettings } from "./types";

const getMimeType = (dataUrl: string): string => {
    const parts = dataUrl.split(',')[0].split(':')[1].split(';');
    return parts[0];
};

const getApiKey = (): string => {
    // Ưu tiên API_KEY từ hộp thoại chọn key, sau đó đến GEMINI_API_KEY mặc định
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (apiKey && apiKey.trim() !== '') {
        return apiKey;
    }
    throw new Error("Lỗi: API Key không được cấu hình. Vui lòng nhấn vào 'Cấu hình API Key' hoặc kiểm tra cài đặt môi trường.");
}

// Wrapper function to call Gemini API with retry logic using the SDK
export const callGeminiAPI = async (prompt: string, imageData?: string, additionalImages?: string[]): Promise<string> => {
    const apiKey = getApiKey();
    // Retry logic with exponential backoff
    const maxRetries = 3;
    let lastError: Error | null = null;
    
    const parts: Part[] = [];

    // Add main image first, if available
    if (imageData) {
        parts.push({
            inlineData: {
                data: imageData.split(',')[1],
                mimeType: getMimeType(imageData),
            }
        });
    }
    
    // Add the text prompt
    parts.push({ text: prompt });

    // Add any additional images
    if (additionalImages && additionalImages.length > 0) {
        additionalImages.forEach(img => {
            parts.push({
                inlineData: {
                    data: img.split(',')[1],
                    mimeType: getMimeType(img),
                }
            });
        });
    }

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            console.log(`[callGeminiAPI] Attempt ${attempt + 1}/${maxRetries}`);
            const ai = new GoogleGenAI({ apiKey });

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts },
                config: {
                    responseModalities: [Modality.IMAGE, Modality.TEXT],
                },
            });

            if (response.candidates && response.candidates.length > 0) {
                const candidate = response.candidates[0];
                if (candidate.content && Array.isArray(candidate.content.parts)) {
                    // Iterate through all parts to find the image part
                    for (const part of candidate.content.parts) {
                        if (part.inlineData) {
                            return `data:image/png;base64,${part.inlineData.data}`;
                        }
                    }
                    
                    // If no image part, check for text part to provide feedback
                    const textPart = candidate.content.parts.find(p => p.text);
                    if (textPart?.text) {
                        console.warn("AI Response Text:", textPart.text);
                        throw new Error(`AI không thực hiện được ảnh. Phản hồi: ${textPart.text}`);
                    }
                }
            }
            throw new Error('Không nhận được ảnh từ AI.');

        } catch (error) {
            lastError = error as Error;
            if (attempt < maxRetries - 1) {
                const waitTime = Math.pow(2, attempt) * 1000 + (Math.random() * 1000);
                const errorMsg = (error as Error).message || '';
                if (errorMsg.includes('429') || /rate limit/i.test(errorMsg) || /resource exhausted/i.test(errorMsg)) {
                    console.log(`Rate limit hit. Retrying in ${Math.ceil(waitTime/1000)}s... (${attempt + 1}/${maxRetries})`);
                } else {
                    console.log(`API call failed. Retrying in ${Math.ceil(waitTime/1000)}s... (${attempt + 1}/${maxRetries})`);
                }
                await new Promise(resolve => setTimeout(resolve, waitTime));
            }
        }
    }

    throw lastError || new Error('Tất cả các lượt thử API đều thất bại');
};

export const testApiKey = async (apiKey: string): Promise<{ success: boolean; message: string; type: 'success' | 'warning' | 'error' }> => {
    if (!apiKey.trim()) {
        return { success: false, message: 'API key không được để trống.', type: 'error' };
    }
    try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: 'Kiểm tra kết nối API',
        });
        
        if (response.text) {
             return { success: true, message: 'Kết nối API thành công!', type: 'success' };
        } else {
            throw new Error("Phản hồi API không hợp lệ.");
        }
    } catch (error) {
        const errorMessage = (error as Error).message;
        console.error("API Key Test Error:", errorMessage);

        if (errorMessage.includes("API key not valid")) {
            return { success: false, message: 'API key không hợp lệ.', type: 'error' };
        } else if (errorMessage.includes("quota") || errorMessage.includes("rate limit")) {
            return { success: true, message: 'Key hợp lệ, nhưng đã đạt đến giới hạn sử dụng.', type: 'warning' };
        } else {
            return { success: false, message: `Lỗi kết nối: ${errorMessage}`, type: 'error' };
        }
    }
};

// --- Feature-specific API Functions ---

export function generateIdPhoto(originalImage: string, settings: IdPhotoSettings): Promise<string> {
    const basePrompt = "Generate a high-resolution, professional ID photo suitable for official documents. The aspect ratio must be 3:4. The subject's head should be centered, facing forward. The lighting should be even and studio-quality. Critically, maintain the original framing of the subject from the source image. If the source image is a headshot, the result must also be a headshot. If it shows half the body, the result must also show half the body. Do not invent or add body parts that are not visible in the original photo.";
    
    let backgroundPrompt;
    if (settings.background === 'white') {
        backgroundPrompt = 'The background must be a solid, uniform pure white (#FFFFFF).';
    } else if (settings.background === 'blue') {
        backgroundPrompt = 'The background must be a solid, uniform light blue (#E0E8F0).';
    } else {
        backgroundPrompt = `The background must be a solid, uniform color with the hex code ${settings.background}.`;
    }

    const clothingDescription = settings.isCustomClothing ? settings.customClothingPrompt : settings.clothingSelection;
    const clothingPrompt = clothingDescription ? `The subject must be wearing: ${clothingDescription}.` : '';

    let facePrompt = "Crucially, preserve the subject's original facial features, structure, and identity. Do not alter their ethnicity, age, or key characteristics.";
    if (settings.smoothSkin) {
        facePrompt += " Apply subtle skin smoothing for a clean look, but keep it natural.";
    }
    if (settings.preserveFace) {
        facePrompt += " Maintain the original neutral facial expression.";
    }

    let hairPrompt = '';
    if (settings.hairStyle === 'front') {
        hairPrompt = 'Style the hair neatly, falling towards the front but off the face.';
    } else if (settings.hairStyle === 'back') {
        hairPrompt = 'Style the hair neatly, combed or swept back away from the face.';
    } else if (settings.hairStyle === 'original') {
        hairPrompt = "Keep the subject's original hairstyle from the source image.";
    }

    const finalPrompt = [basePrompt, backgroundPrompt, clothingPrompt, facePrompt, hairPrompt].filter(Boolean).join(' ');

    return callGeminiAPI(finalPrompt, originalImage);
}
