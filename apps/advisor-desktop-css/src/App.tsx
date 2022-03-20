import { Routes, Route } from 'react-router-dom';
import { DesignSystemPage, HomePage } from './pages';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/design-system" element={<DesignSystemPage />} />
    </Routes>
  );
}
