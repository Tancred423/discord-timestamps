import { useState, useEffect } from 'react';
import '../shared.css';
import './Header.css';

type Theme = 'auto' | 'light' | 'dark';

const Header = () => {
  const [theme, setTheme] = useState<Theme>('auto');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const metaThemeColor = document.querySelector('meta[name="color-scheme"]');

    const updateColorScheme = (actualTheme: 'dark' | 'light') => {
      root.setAttribute('data-theme', actualTheme);
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', actualTheme);
      }
    };

    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const applyTheme = (e: MediaQueryListEvent | MediaQueryList) => {
        updateColorScheme(e.matches ? 'dark' : 'light');
      };
      applyTheme(mediaQuery);
      mediaQuery.addEventListener('change', applyTheme);
      return () => mediaQuery.removeEventListener('change', applyTheme);
    } else {
      updateColorScheme(theme);
    }
  }, [theme]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const cycleTheme = () => {
    const nextTheme: Theme = theme === 'auto' ? 'light' : theme === 'light' ? 'dark' : 'auto';
    handleThemeChange(nextTheme);
  };

  const getThemeIcon = () => {
    if (theme === 'light') return '🌕';
    if (theme === 'dark') return '🌑';
    return '🌗';
  };

  return (
    <div className="header outer-field">
      <div className="header-top">
        <div className="title-section">
          <h1>
            <img src="/favicon.webp" alt="Logo" />
            <div className="title-text">
              Discord Timestamps
              <span className="credits">by Tancred</span>
            </div>
          </h1>
        </div>
        <button className="theme-toggle" onClick={cycleTheme} title={`Theme: ${theme}`}>
          {getThemeIcon()}
        </button>
      </div>
      <h2>
        Discord timestamps are automatically updating parts in your message. Every user will see these in their
        timezone. Choose whatever date and time you want, copy the code and paste it in your Discord message. Done!
      </h2>
    </div>
  );
};

export default Header;
