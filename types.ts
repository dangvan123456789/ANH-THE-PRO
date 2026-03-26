/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// General types
export type Theme = 'light' | 'dark';

export interface ImageItem {
    id: number;
    file: File;
    original: string;
    generated: string | null;
    status: 'pending' | 'processing' | 'done' | 'error';
}

// Settings for ID Photo feature
export interface IdPhotoSettings {
    background: string;
    clothingSelection: string;
    customClothingPrompt: string;
    isCustomClothing: boolean;
    preserveFace: boolean;
    smoothSkin: boolean;
    hairStyle: string;
}

// Props for common components
export interface CommonSettingsPanelProps {
    onGenerate: () => void;
    generating: boolean;
    hasImage: boolean;
    buttonText?: string;
}
