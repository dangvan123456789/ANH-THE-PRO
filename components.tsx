/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { h, FunctionalComponent } from 'preact';
import htm from 'htm';
import type { TargetedEvent } from 'preact/compat';
import { Theme } from './types';

const html = htm.bind(h);

// --- Navigation Icons ---
export const IdPhotoIcon: FunctionalComponent = () => html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;
export const RestorationIcon: FunctionalComponent = () => html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.68 5.58C13.82 5.25 14.16 5 14.53 5h2.38l-2.64 4.55-3.8-3.46c-.23-.21-.57-.25-.85-.1L2 12.01V19h20V5h-7.05l-1.27.58zM4 17l6-5.5 4 3.51 6-8.51V17H4z"/></svg>`;
export const SymmetryIcon: FunctionalComponent = () => html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.5 2C6.81 2 3 6.81 3 11.5S6.81 21 11.5 21 20 16.19 20 11.5 16.19 2 11.5 2zm0 17c-3.03 0-5.5-2.47-5.5-5.5S8.47 6 11.5 6 17 8.47 17 11.5 14.53 19 11.5 19zM8 10h7v1.5H8zm2.25 4h2.5V11h-2.5v3z"/></svg>`;
export const LightingIcon: FunctionalComponent = () => html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9 0 3.92 2.55 7.26 6 8.47V22h6v-1.53c3.45-1.21 6-4.55 6-8.47 0-4.97-4.03-9-9-9zm2 13h-4v-1h4v1zm0-2h-4v-1h4v1zm0-2h-4v-1h4v1z"/></svg>`;
export const BackgroundIcon: FunctionalComponent = () => html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/></svg>`;
export const MockupIcon: FunctionalComponent = () => html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5z"/></svg>`;
export const NavToggleIcon: FunctionalComponent = () => html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>`;
export const SunIcon: FunctionalComponent = () => html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.64 5.64c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l1.06 1.06c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41L5.64 5.64zm12.73 12.73c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l1.06 1.06c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-1.06-1.06zM5.64 18.36c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-1.06-1.06c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l1.06 1.06zm12.73-12.73c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-1.06-1.06c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l1.06 1.06z"/></svg>`;
export const MoonIcon: FunctionalComponent = () => html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>`;
export const MicIcon: FunctionalComponent<{ recording: boolean }> = ({ recording }) => html`<svg class=${recording ? 'recording' : ''} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14q.825 0 1.413-.587T14 12V6q0-.825-.587-1.413T12 4q-.825 0-1.413.587T10 6v6q0 .825.587 1.413T12 14Zm-1 7v-3.075q-2.6-.35-4.3-2.325T5 12H7q0 2.075 1.463 3.538T12 17q2.075 0 3.538-1.463T17 12h2q0 2.25-1.7 4.225T13 20.925V21Zm1-6q1.65 0 2.825-1.175T16 12V6q0-1.65-1.175-2.825T12 2q-1.65 0-2.825 1.175T8 6v6q0 1.65 1.175 2.825T12 15Z"/></svg>`;
export const UploadIcon: FunctionalComponent = () => html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 16V7.85l-2.6 2.6L7 9l5-5 5 5-1.4 1.45-2.6-2.6V16h-2Zm-5 4q-.825 0-1.413-.587T4 18V6q0-.825.587-1.413T6 4h4V2H6q-1.65 0-2.825 1.175T2 6v12q0 1.65 1.175 2.825T6 22h12q1.65 0 2.825-1.175T22 18V9h-2v9q0 .825-.587 1.413T18 20H6Z"/></svg>`;
export const DownloadIcon: FunctionalComponent = () => html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 16.5l-4-4h2.5v-6h3v6H15l-3 4.5M6 20h12v-2H6v2Z"/></svg>`;
export const RegenerateIcon: FunctionalComponent = () => html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>`;
export const DeleteIcon: FunctionalComponent = () => html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`;
export const CloseIcon: FunctionalComponent = () => html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"/></svg>`;
export const LockIcon: FunctionalComponent = () => html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`;

// --- Reusable Components ---
export const Loader: FunctionalComponent<{ text: string }> = ({ text }) => html`
    <div class="loader-overlay">
        <div class="spinner"></div>
        <div class="loader-text">${text}</div>
    </div>
`;

interface ImageUploaderProps {
    onImageUpload: (dataUrl: string) => void;
    id?: string;
}
export const ImageUploader: FunctionalComponent<ImageUploaderProps> = ({ onImageUpload, id = 'file-input' }) => {
    const handleFileChange = (e: TargetedEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                if (loadEvent.target?.result) {
                    onImageUpload(loadEvent.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const handleClick = () => document.getElementById(id)?.click();

    return html`
        <div class="upload-placeholder" onClick=${handleClick}>
            <input type="file" id=${id} accept="image/*" style=${{display: 'none'}} onChange=${handleFileChange} />
            <${UploadIcon} />
            <strong>Nhấn để tải ảnh lên</strong>
            <p>hoặc kéo và thả ảnh vào đây</p>
        </div>
    `;
};

interface ImageComparatorProps {
    original: string | null;
    generated: string | null;
}
export const ImageComparator: FunctionalComponent<ImageComparatorProps> = ({ original, generated }) => html`
    <div class="image-comparator">
        <div class="image-container">
            <img src=${original} alt="Original" />
            <span class="image-label">Gốc</span>
        </div>
        <div class="image-container">
            ${generated ? html`<img src=${generated} alt="Generated" />` : html`<div style=${{aspectRatio: '3/4', background: '#2a2a2a'}} />`}
            <span class="image-label">Kết quả</span>
        </div>
    </div>
`;


interface ThemeToggleProps {
    theme: Theme;
    onToggle: () => void;
}
export const ThemeToggle: FunctionalComponent<ThemeToggleProps> = ({ theme, onToggle }) => {
    const Icon = theme === 'light' ? MoonIcon : SunIcon;
    const label = theme === 'light' ? 'Giao diện Tối' : 'Giao diện Sáng';
    return html`
        <button class="theme-toggle" onClick=${onToggle} title="Toggle theme">
            <span class="tab-icon"><${Icon} /></span>
            <span class="tab-label">${label}</span>
        </button>
    `;
};

interface LightboxProps {
    originalUrl: string;
    generatedUrl: string;
    caption: string;
    onClose: () => void;
}
export const Lightbox: FunctionalComponent<LightboxProps> = ({ originalUrl, generatedUrl, caption, onClose }) => {
    return html`
        <div class="lightbox-overlay" onClick=${onClose}>
            <div class="lightbox-content" onClick=${(e: MouseEvent) => e.stopPropagation()}>
                <div class="lightbox-header">
                    <h3>${caption}</h3>
                    <button class="lightbox-close-btn" onClick=${onClose} title="Close">
                        <${CloseIcon} />
                    </button>
                </div>
                <div class="lightbox-image-comparison">
                    <div class="lightbox-image-wrapper">
                        <img src=${originalUrl} alt="Original Image" />
                        <p>Ảnh gốc</p>
                    </div>
                    <div class="lightbox-image-wrapper">
                        <img src=${generatedUrl} alt="Generated Image" />
                        <p>Ảnh Trend</p>
                    </div>
                </div>
            </div>
        </div>
    `;
};