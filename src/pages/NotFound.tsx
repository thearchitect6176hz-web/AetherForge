export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#050810', color: '#e4e6f0', gap: 16 }}>
      <div style={{ fontSize: 64 }}>🔱</div>
      <h1 style={{ fontSize: 24, fontWeight: 700, fontFamily: 'Cinzel, serif', background: 'linear-gradient(135deg,#00e1ff,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Portal Not Found
      </h1>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>This realm does not exist.</p>
      <a href="/" style={{ marginTop: 8, padding: '10px 24px', borderRadius: 12, background: 'rgba(0,225,255,0.15)', color: '#00e1ff', border: '1px solid rgba(0,225,255,0.3)', fontWeight: 600, textDecoration: 'none', fontSize: 13 }}>
        Return to Sanctuary
      </a>
    </div>
  );
}
