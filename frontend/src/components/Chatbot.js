import React, { useState, useRef, useEffect } from 'react';

// ✅ Le chatbot appelle le backend Spring Boot (proxy)
// qui lui-même appelle l'API Anthropic — évite l'erreur CORS navigateur

const SUGGESTIONS = [
  '🏠 Quelle chambre pour étudier tranquillement ?',
  '📅 Comment réserver une chambre ?',
  '🧱 Quels blocs sont les plus calmes ?',
  '👨‍🎓 Je suis nouveau, par où commencer ?',
];

export default function Chatbot({ onClose }) {
  const [msgs, setMsgs]     = useState([{ role:'bot', text:'Bonjour ! 👋 Je suis votre assistant FoyerMS. Comment puis-je vous aider ?' }]);
  const [input, setInput]   = useState('');
  const [busy, setBusy]     = useState(false);
  const bottomRef           = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }); }, [msgs]);

  const send = async (txt) => {
    const t = (txt || input).trim();
    if (!t) return;
    setInput('');
    const updated = [...msgs, { role:'user', text:t }];
    setMsgs(updated);
    setBusy(true);
    try {
      // ✅ Appel vers le backend Spring Boot (proxy Anthropic) — pas de CORS
      const res = await fetch('http://localhost:8089/chatbot/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated
            .filter((m, idx) => !(m.role === 'bot' && idx === 0))
            .map(m => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.text })),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMsgs(p => [...p, { role:'bot', text: data.reply || 'Désolé, réessayez.' }]);
    } catch {
      setMsgs(p => [...p, { role:'bot', text:'⚠️ Vérifiez que Spring Boot tourne sur le port 8089.' }]);
    }
    setBusy(false);
  };

  return (
    <div className="chat-win">
      <div className="chat-head">
        <div className="chat-av">🤖</div>
        <div style={{ flex:1 }}>
          <p style={{ fontWeight:700, fontSize:'0.9rem', color:'white' }}>Assistant FoyerMS</p>
          <p style={{ fontSize:'0.7rem', color:'rgba(255,255,255,0.75)', marginTop:1 }}>
            ● En ligne · IA Générative
          </p>
        </div>
        <button onClick={onClose} style={{ background:'rgba(255,255,255,0.15)', border:'none',
          borderRadius:8, color:'white', cursor:'pointer', padding:'6px 10px', fontSize:'0.8rem' }}>
          ✕
        </button>
      </div>

      <div className="chat-msgs">
        {msgs.length === 1 && (
          <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:4 }}>
            {SUGGESTIONS.map((s,i) => (
              <button key={i} onClick={() => send(s.replace(/^[^\s]+\s/,''))} style={{
                background:'var(--bg-white)', border:'1px solid var(--border)',
                borderRadius:12, padding:'8px 12px', color:'var(--violet)',
                fontSize:'0.78rem', cursor:'pointer', textAlign:'left',
                transition:'var(--t)', boxShadow:'var(--shadow-sm)',
              }}
                onMouseEnter={e=>e.currentTarget.style.background='var(--violet-pale)'}
                onMouseLeave={e=>e.currentTarget.style.background='var(--bg-white)'}
              >{s}</button>
            ))}
          </div>
        )}
        {msgs.map((m,i) => (
          <div key={i} className={`msg ${m.role}`}>{m.text}</div>
        ))}
        {busy && (
          <div className="msg bot typing">
            <div className="dot"/><div className="dot"/><div className="dot"/>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-foot">
        <input className="chat-inp" placeholder="Écrivez votre question…"
          value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&!e.shiftKey&&(e.preventDefault(),send())}
          disabled={busy} />
        <button className="chat-send" onClick={()=>send()} disabled={busy||!input.trim()}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
