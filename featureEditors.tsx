import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import htm from 'htm';

import {
    IdPhotoSettings,
} from './types';
import { CLOTHING_OPTIONS } from './constants';
import {
    Loader,
    ImageUploader,
    ImageComparator,
    DownloadIcon,
} from './components';
import {
    IdPhotoSettingsPanel,
} from './featurePanels';
import {
    generateIdPhoto,
} from './api';

const html = htm.bind(h);

const IdPhotoEditor: FunctionalComponent = () => {
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState('');
    const [settings, setSettings] = useState<IdPhotoSettings>({
        background: 'white',
        clothingSelection: CLOTHING_OPTIONS["Sơ mi & Áo kiểu"][0].prompt,
        customClothingPrompt: '',
        isCustomClothing: false,
        preserveFace: true,
        smoothSkin: true,
        hairStyle: 'auto',
    });

    const handleGenerate = async () => {
        if (!originalImage) return;
        setGenerating(true);
        setError('');
        try {
            const result = await generateIdPhoto(originalImage, settings);
            setGeneratedImage(result);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err));
            }
        } finally {
            setGenerating(false);
        }
    };
    
    const downloadImage = (dataUrl: string | null, filename: string) => {
        if (!dataUrl) return;
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return html`
        <div class="editor-layout">
            <${IdPhotoSettingsPanel} settings=${settings} setSettings=${setSettings} onGenerate=${handleGenerate} generating=${generating} hasImage=${!!originalImage} buttonText="Thực hiện" />
            <div class="image-panel">
                ${generating && html`<${Loader} text="AI đang thực hiện ảnh thẻ của bạn..." />`}
                ${!originalImage ? html`
                    <${ImageUploader} onImageUpload=${setOriginalImage} />
                ` : html`
                    <${ImageComparator} original=${originalImage} generated=${generatedImage} />
                    ${error && html`<div class="error-message">${error}</div>`}
                    <div class="actions">
                        <button class="btn btn-secondary" onClick=${() => setOriginalImage(null)}>Chọn ảnh khác</button>
                        <button class="btn btn-primary" onClick=${() => downloadImage(generatedImage, 'id-photo.png')} disabled=${!generatedImage}>
                            <${DownloadIcon} /> Tải ảnh
                        </button>
                    </div>
                `}
            </div>
        </div>
    `;
};

export const IdPhotoApp: FunctionalComponent = () => {
    return html`
        <div class="feature-app">
            <${IdPhotoEditor} />
        </div>
    `;
};
