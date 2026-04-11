import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard    from './pages/Dashboard';
import Universites  from './pages/Universites';
import Foyers       from './pages/Foyers';
import Blocs        from './pages/Blocs';
import Chambres     from './pages/Chambres';
import Etudiants    from './pages/Etudiants';
import Reservations from './pages/Reservations';
import SqlGuide     from './pages/SqlGuide';
import Chatbot      from './components/Chatbot';

const NAV = [
  { section: 'APERÇU',    items: [
    { to: '/',             emoji: '🏠', label: 'Dashboard' },
  ]},
  { section: 'GESTION',   items: [
    { to: '/universites',  emoji: '🎓', label: 'Universités' },
    { to: '/foyers',       emoji: '🏢', label: 'Foyers' },
    { to: '/blocs',        emoji: '🧱', label: 'Blocs' },
    { to: '/chambres',     emoji: '🚪', label: 'Chambres' },
  ]},
  { section: 'USAGERS',   items: [
    { to: '/etudiants',    emoji: '👨‍🎓', label: 'Étudiants' },
    { to: '/reservations', emoji: '📅', label: 'Réservations' },
  ]},
  { section: 'OUTILS',    items: [
    { to: '/sql',          emoji: '🗄️',  label: 'Guide MySQL' },
  ]},
];

function Sidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="logo">
          <div className="logo-mark">🏠</div>
          <div>
            <div className="logo-name">FoyerMS</div>
            <span className="logo-tag">Hébergement Universitaire</span>
          </div>
        </div>
      </div>

      {NAV.map(({ section, items }) => (
        <React.Fragment key={section}>
          <p className="nav-label">{section}</p>
          {items.map(({ to, emoji, label }) => {
            const active = to === '/' ? pathname === '/' : pathname.startsWith(to);
            return (
              <NavLink key={to} to={to} end={to === '/'}
                className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
                <span style={{ fontSize: '1.1rem', width: 22, textAlign: 'center' }}>{emoji}</span>
                {label}
              </NavLink>
            );
          })}
        </React.Fragment>
      ))}

      {/* Bottom user card */}
      <div style={{ marginTop: 'auto', padding: '16px 4px 0', borderTop: '1px solid var(--border-soft)' }}>
        <div className="flex items-center gap-8" style={{ padding: '10px 8px', borderRadius: 10, background: 'var(--bg)' }}>
          <div className="avatar" style={{ background: 'var(--violet-pale)', color: 'var(--violet)' }}>Ad</div>
          <div>
            <p className="fw-600 text-sm text-h">Administrateur</p>
            <p className="text-xs text-muted">admin@foyer.tn</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function App() {
  const [chat, setChat] = useState(false);
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />
        <main className="main">
          <Routes>
            <Route path="/"             element={<Dashboard />} />
            <Route path="/universites"  element={<Universites />} />
            <Route path="/foyers"       element={<Foyers />} />
            <Route path="/blocs"        element={<Blocs />} />
            <Route path="/chambres"     element={<Chambres />} />
            <Route path="/etudiants"    element={<Etudiants />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/sql"          element={<SqlGuide />} />
          </Routes>
        </main>

        <button className="fab" onClick={() => setChat(v => !v)} title="Assistant IA">
          {chat ? '✕' : '🤖'}
        </button>
        {chat && <Chatbot onClose={() => setChat(false)} />}

        <Toaster position="top-right" toastOptions={{
          style: {
            background: '#fff', color: '#1a1040',
            border: '1px solid rgba(108,71,255,0.15)',
            borderRadius: 12, fontSize: '0.875rem',
            boxShadow: '0 8px 24px rgba(108,71,255,0.12)',
          },
          success: { iconTheme: { primary: '#6c47ff', secondary: '#fff' } },
        }} />
      </div>
    </BrowserRouter>
  );
}
