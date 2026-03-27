/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { h, FunctionalComponent } from 'preact';
import { useState, useEffect, useMemo } from 'preact/hooks';
import htm from 'htm';
import { Theme } from './types';
import { TABS } from './constants';
import { ThemeToggle, NavToggleIcon, LockIcon } from './components';
import {
    IdPhotoApp,
} from './featureEditors';

const html = htm.bind(h);

export const App: FunctionalComponent = () => {
    const [mainTab, setMainTab] = useState('id-photo');
    const [isNavCollapsed, setIsNavCollapsed] = useState(window.innerWidth < 900);
    const [theme, setTheme] = useState<Theme>('dark');
    
    const [accessKey, setAccessKey] = useState(localStorage.getItem('app_access_key') || '');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [accessError, setAccessError] = useState('');

    const requiredKey = import.meta.env.VITE_APP_ACCESS_KEY;

      useEffect(() => {
    const checkLicense = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const keyFromUrl = urlParams.get('key');
      const idFromUrl = urlParams.get('id'); // Lấy Hardware ID từ link Panel gửi sang
      const savedKey = localStorage.getItem('app_access_key');

      // 1. Nếu có đủ Key và ID trên link, tiến hành xác thực với Server
      if (keyFromUrl && idFromUrl) {
        try {
          const response = await fetch("https://script.google.com/macros/s/AKfycbxSzjIgD9YSaYr26h3K426sTT2uZpC5TRC-pG5Ys-MSXejcgq9mibEKUaVEkQkkSSc/exec", {
            method: 'POST',
            body: JSON.stringify({ license_key: keyFromUrl, hardware_id: idFromUrl })
          });
          const result = await response.json();

          if (result.success === true) {
            // Khớp Hardware ID trên Sheets, cho phép vào
            setIsAuthorized(true);
            setAccessKey(keyFromUrl);
            localStorage.setItem('app_access_key', keyFromUrl);
              localStorage.setItem('app_device_id', idFromUrl);
          } else {
            // Không khớp ID máy hoặc Key hết hạn
            setAccessError(result.message || "Thiết bị không hợp lệ!");
            setIsAuthorized(false);
          }
        } catch (error) {
          setAccessError("Lỗi kết nối máy chủ xác thực!");
        }
      } 
     // 2. Nếu không có link mới, kiểm tra mã đã lưu (Bắt buộc đối soát lại với Server)
      else if (savedKey) {
        try {
          // Lấy ID máy đã lưu từ lần trước
          const savedId = localStorage.getItem('app_device_id'); 
          
          const response = await fetch("https://script.google.com/macros/s/AKfycbxSzjIgD9YSaYr26h3K426sTT2uZpC5TRC-pG5Ys-MSXejcgq9mibEKUaVEkQkkSSc/exec", {
            method: 'POST',
            body: JSON.stringify({ license_key: savedKey, hardware_id: savedId })
          });
          const result = await response.json();

          if (result.success === true) {
            setIsAuthorized(true);
            setAccessKey(savedKey);
          } else {
            // Nếu Server báo không khớp (do Key bị đổi ID trên Sheets), xóa sạch Cache
            localStorage.removeItem('app_access_key');
            localStorage.removeItem('app_device_id');
            setIsAuthorized(false);
          }
        } catch (error) {
          setIsAuthorized(false);
        }
      } else {
        setIsAuthorized(false);
      }
    checkLicense();
  }, []);


    const handleAccessSubmit = (e: Event) => {
        e.preventDefault();
        if (accessKey === requiredKey) {
            localStorage.setItem('app_access_key', accessKey);
            setIsAuthorized(true);
            setAccessError('');
        } else {
            setAccessError('Mã truy cập không chính xác. Vui lòng thử lại.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('app_access_key');
        setAccessKey('');
        setIsAuthorized(false);
    };

    const activeTabData = useMemo(() => TABS.find(t => t.id === mainTab) || TABS[0], [mainTab]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 900) {
                setIsNavCollapsed(true);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        setTheme(initialTheme);
    }, []);

    useEffect(() => {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleThemeToggle = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const renderContent = () => {
        switch (mainTab) {
            case 'id-photo':
                return html`<${IdPhotoApp} key="id-photo" />`;
            default:
                return null;
        }
    };

    if (!isAuthorized && requiredKey) {
        return html`
            <div class="access-gate-container ${theme === 'light' ? 'light-mode' : ''}">
                <div class="access-card">
                    <div class="access-icon"><${LockIcon} /></div>
                    <h2>Yêu cầu truy cập</h2>
                    <p>Vui lòng nhập mã truy cập do quản trị viên cung cấp để sử dụng ứng dụng.</p>
                    <form onSubmit=${handleAccessSubmit}>
                        <input 
                            type="password" 
                            placeholder="Nhập mã truy cập..." 
                            value=${accessKey} 
                            onInput=${(e: any) => setAccessKey(e.target.value)}
                            class="access-input"
                        />
                        ${accessError && html`<p class="access-error">${accessError}</p>`}
                        <button type="submit" class="btn btn-primary access-btn">Xác nhận</button>
                    </form>
                </div>
            </div>
        `;
    }

    return html`
        <div class="app-container ${isNavCollapsed ? 'nav-collapsed' : ''}">
            <nav class="sidebar-nav">
                <div class="sidebar-header">
                    <span class="logo-text">ẢNH THẺ AI PRO</span>
                    <button class="nav-toggle" onClick=${() => setIsNavCollapsed(prev => !prev)} title="Toggle Navigation">
                        <${NavToggleIcon} />
                    </button>
                </div>

                <div class="main-tabs">
                    ${TABS.map(tab => html`
                        <button 
                            class="main-tab ${mainTab === tab.id ? 'active' : ''}" 
                            onClick=${() => setMainTab(tab.id)}
                            title=${tab.label}
                        >
                            <span class="tab-icon"><${tab.icon} /></span>
                            <span class="tab-label">${tab.label}</span>
                        </button>
                    `)}
                </div>

                <div class="sidebar-footer">
                    <button class="theme-toggle" onClick=${handleLogout} title="Đăng xuất">
                        <span class="tab-icon"><${LockIcon} /></span>
                        <span class="tab-label">Đăng xuất</span>
                    </button>
                    <${ThemeToggle} theme=${theme} onToggle=${handleThemeToggle} />
                </div>
            </nav>

            <main class="main-content">
                <div class="page-header">
                    <h1>${activeTabData.label}</h1>
                    <p class="subtitle">${activeTabData.description}</p>
                </div>
                
                <div class="tab-content">
                    ${renderContent()}
                </div>
            </main>
        </div>
    `;
};
