import { useState } from 'react';
import {
  CogIcon,
  SunIcon,
  SwitchHorizontalIcon,
} from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';

enum Brand {
  brand1 = 'brand1',
  brand2 = 'brand2',
}

enum Mode {
  light = 'light',
  dark = 'dark',
}

export function Header() {
  const navigate = useNavigate();
  const [brand, setBrand] = useState(Brand.brand1);
  const [mode, setMode] = useState(Mode.light);

  const setTheme = (brand: Brand, mode: Mode) => {
    document.documentElement.className = `semantic ${brand}-${mode}`;
  };

  const toggleBrand = () => {
    const newBrand = brand === Brand.brand1 ? Brand.brand2 : Brand.brand1;
    setBrand(newBrand);
    setTheme(newBrand, mode);
  };

  const toggleMode = () => {
    const newMode = mode === Mode.light ? Mode.dark : Mode.light;
    setMode(newMode);
    setTheme(brand, newMode);
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToDesignSystem = () => {
    navigate('/design-system');
  };

  return (
    <header className="appbar">
      <span
        className="flex-1 h6sm line-height-none cursor-pointer"
        onClick={navigateToHome}
      >
        Advisor Desktop
      </span>
      <div className="flex flex-row">
        <button
          type="button"
          className="bg-primary-main border-none cursor-pointer"
          onClick={toggleBrand}
        >
          <SwitchHorizontalIcon
            className={`h-24 w-24 ${
              brand === Brand.brand1
                ? 'primary-icon-muted'
                : 'primary-icon-bright'
            }`}
          />
        </button>
        <button
          type="button"
          className="bg-primary-main border-none cursor-pointer ml-1"
          onClick={toggleMode}
        >
          <SunIcon
            className={`h-24 w-24 ${
              mode === Mode.light ? 'primary-icon-bright' : 'primary-icon-muted'
            }`}
          />
        </button>
        <button
          type="button"
          className="bg-primary-main border-none cursor-pointer ml-1"
          onClick={navigateToDesignSystem}
        >
          <CogIcon className="h-24 w-24 primary-icon-muted" />
        </button>
      </div>
    </header>
  );
}
