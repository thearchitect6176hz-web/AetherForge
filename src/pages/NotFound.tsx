import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error("404: Non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center cosmic-bg">
      <div className="text-center glass rounded-2xl p-12">
        <div className="text-6xl mb-4">🪞</div>
        <h1 className="text-4xl font-bold mb-2 gradient-text" style={{ fontFamily: 'Cinzel, serif' }}>404</h1>
        <p className="text-lg mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>The Mirror reflects nothing here</p>
        <a href="/" className="inline-block px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 btn-shimmer">
          Return to the Sanctuary
        </a>
      </div>
    </div>
  );
}
