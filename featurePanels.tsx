/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { h, FunctionalComponent } from 'preact';
import htm from 'htm';
import type { TargetedEvent } from 'preact/compat';
import { 
    IdPhotoSettings,
    CommonSettingsPanelProps,
} from './types';
import { CLOTHING_OPTIONS } from './constants';

const html = htm.bind(h);

interface IdPhotoSettingsPanelProps extends CommonSettingsPanelProps {
    settings: IdPhotoSettings;
    setSettings: (updater: (s: IdPhotoSettings) => IdPhotoSettings) => void;
}

export const IdPhotoSettingsPanel: FunctionalComponent<IdPhotoSettingsPanelProps> = ({ settings, setSettings, onGenerate, generating, hasImage, buttonText }) => {
    const handleClothingChange = (e: TargetedEvent<HTMLSelectElement>) => {
        setSettings(s => ({ ...s, clothingSelection: e.currentTarget.value }));
    };

    const hairStyleOptions = {
        'auto': 'Tự động',
        'front': 'Thả trước',
        'back': 'Vuốt sau',
        'original': 'Giữ nguyên'
    };
    
    return html`
        <div class="settings-panel">
            <div class="form-group">
                <label>Nền</label>
                <div class="radio-group-bg">
                    <label>
                        <input type="radio" name="bg" value="white" checked=${settings.background === 'white'} onChange=${(e: TargetedEvent<HTMLInputElement>) => setSettings(s => ({...s, background: e.currentTarget.value}))} />
                        Trắng
                    </label>
                    <label>
                        <input type="radio" name="bg" value="blue" checked=${settings.background === 'blue'} onChange=${(e: TargetedEvent<HTMLInputElement>) => setSettings(s => ({...s, background: e.currentTarget.value}))} />
                        Xanh
                    </label>
                    <label class="custom-color-label">
                        <input type="radio" name="bg" value="custom" checked=${!['white', 'blue'].includes(settings.background)} onChange=${() => setSettings(s => ({...s, background: '#cccccc'}))} />
                        Tùy chỉnh
                        <input 
                            type="color" 
                            class="color-picker"
                            value=${!['white', 'blue'].includes(settings.background) ? settings.background : '#cccccc'}
                            onInput=${(e: TargetedEvent<HTMLInputElement>) => setSettings(s => ({...s, background: e.currentTarget.value}))}
                        />
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label>Trang phục</label>
                <div class="radio-group">
                    <label>
                        <input type="radio" name="clothing-mode" checked=${!settings.isCustomClothing} onChange=${() => setSettings(s => ({...s, isCustomClothing: false}))} />
                        Có sẵn
                    </label>
                    <label>
                        <input type="radio" name="clothing-mode" checked=${settings.isCustomClothing} onChange=${() => setSettings(s => ({...s, isCustomClothing: true}))} />
                        Tùy chỉnh
                    </label>
                </div>
            </div>

            ${!settings.isCustomClothing ? html`
                <div class="form-group">
                    <select id="clothing" value=${settings.clothingSelection} onChange=${handleClothingChange}>
                        ${Object.entries(CLOTHING_OPTIONS).map(([group, options]) => html`
                            <optgroup label=${group}>
                                ${options.map(opt => html`
                                    <option value=${opt.prompt}>${opt.name}</option>
                                `)}
                            </optgroup>
                        `)}
                    </select>
                </div>
            ` : html`
                <div class="form-group">
                     <textarea 
                        id="custom-clothing-prompt" 
                        placeholder="VD: một chiếc áo len cổ lọ màu be..."
                        value=${settings.customClothingPrompt}
                        onInput=${(e: TargetedEvent<HTMLTextAreaElement>) => setSettings(s => ({ ...s, customClothingPrompt: e.currentTarget.value }))}
                    ></textarea>
                </div>
            `}

            <div class="form-group">
                <label>Kiểu tóc</label>
                <div class="radio-group">
                   ${Object.entries(hairStyleOptions).map(([style, label]) => html`
                    <label>
                        <input type="radio" name="hairstyle" value=${style} checked=${settings.hairStyle === style} onChange=${() => setSettings(s => ({...s, hairStyle: style}))} />
                        ${label}
                    </label>
                   `)}
                </div>
            </div>
            <div class="form-group checkbox-group">
                <label><input type="checkbox" checked=${settings.preserveFace} onChange=${(e: TargetedEvent<HTMLInputElement>) => setSettings(s => ({...s, preserveFace: e.currentTarget.checked}))}/> Giữ nét mặt gốc</label>
                <label><input type="checkbox" checked=${settings.smoothSkin} onChange=${(e: TargetedEvent<HTMLInputElement>) => setSettings(s => ({...s, smoothSkin: e.currentTarget.checked}))}/> Làm mịn da</label>
            </div>
            <button class="btn btn-primary" onClick=${onGenerate} disabled=${generating || !hasImage} style=${{width: '100%'}}>
                ${generating ? 'Đang xử lý...' : (buttonText || 'Thực hiện')}
            </button>
        </div>
    `;
};
