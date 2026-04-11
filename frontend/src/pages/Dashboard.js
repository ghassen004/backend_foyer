import React, { useEffect, useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { universiteAPI, foyerAPI, chambreAPI, etudiantAPI, reservationAPI } from '../services/api';

const PALETTE = ['#6c47ff','#00c9a7','#ff9f43','#ff6b9d','#38b6ff'];

const Tip = ({ active, payload, label }) => active && payload?.length ? (
  <div style={{ background:'#fff', border:'1px solid rgba(108,71,255,.12)',
    borderRadius:10, padding:'10px 14px', fontSize:'0.8rem',
    boxShadow:'0 8px 24px rgba(108,71,255,.1)' }}>
    {label && <p style={{ color:'#8e87b3', marginBottom:4 }}>{label}</p>}
    {payload.map((p,i) => <p key={i} style={{ color:p.color, fontWeight:700 }}>{p.name}: {p.value}</p>)}
  </div>
) : null;

const STAT_CARDS = [
  { key:'universites', label:'Universités', emoji:'🎓', color:'#6c47ff', pale:'#ede9ff' },
  { key:'foyers',      label:'Foyers',      emoji:'🏢', color:'#00c9a7', pale:'#e0faf5' },
  { key:'chambres',    label:'Chambres',    emoji:'🚪', color:'#ff9f43', pale:'#fff4e8' },
  { key:'etudiants',   label:'Étudiants',   emoji:'👨‍🎓', color:'#ff6b9d', pale:'#fff0f6' },
  { key:'reservations',label:'Réservations',emoji:'📅', color:'#38b6ff', pale:'#e8f6ff' },
];

const MONTHS = [
  {m:'Sep',r:12},{m:'Oct',r:28},{m:'Nov',r:19},{m:'Déc',r:8},
  {m:'Jan',r:31},{m:'Fév',r:24},{m:'Mar',r:17},
];

export default function Dashboard() {
  const [data, setData] = useState({ universites:0,foyers:0,chambres:0,etudiants:0,reservations:0 });
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      universiteAPI.getAll(), foyerAPI.getAll(),
      chambreAPI.getAll(), etudiantAPI.getAll(), reservationAPI.getAll(),
    ]).then(([u,f,c,e,r]) => {
      setData({ universites:u.data.length, foyers:f.data.length,
        chambres:c.data.length, etudiants:e.data.length, reservations:r.data.length });
      const t={SIMPLE:0,DOUBLE:0,TRIPLE:0};
      c.data.forEach(ch => { if(t[ch.typeC]!==undefined) t[ch.typeC]++; });
      setTypes(Object.entries(t).map(([name,value])=>({name,value})));
    }).catch(()=>{}).finally(()=>setLoading(false));
  },[]);

  if (loading) return (
    <div className="flex-center" style={{ height:'60vh', flexDirection:'column', gap:16 }}>
      <div style={{ width:44,height:44,border:'4px solid var(--violet-pale)',
        borderTop:'4px solid var(--violet)',borderRadius:'50%',
        animation:'spin .8s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <p className="text-muted text-sm">Chargement…</p>
    </div>
  );

  return (
    <div>
      {/* Hero */}
      <div className="hero-banner">
        <div className="hero-illus">🏠</div>
        <h2 className="hero-title">Bienvenue sur FoyerMS 👋<br/>Plateforme d'hébergement universitaire</h2>
        <p className="hero-sub">Gérez vos foyers, blocs, chambres et réservations en un seul endroit.</p>
        <div className="hero-chips">
          <span className="hero-chip">✅ {data.reservations} réservations actives</span>
          <span className="hero-chip">🏢 {data.foyers} foyers</span>
          <span className="hero-chip">👨‍🎓 {data.etudiants} étudiants</span>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {STAT_CARDS.map(({ key, label, emoji, color, pale }) => (
          <div className="stat-card" key={key} style={{ '--accent-color': color }}>
            <div className="stat-card-bg">{emoji}</div>
            <div className="stat-icon-wrap" style={{ background: pale }}>
              <span style={{ fontSize:'1.4rem' }}>{emoji}</span>
            </div>
            <div className="stat-val" style={{ color }}>{data[key]}</div>
            <div className="stat-lbl">{label}</div>
            <div className="stat-trend" style={{ color:'#23d160' }}>
              <span>↑</span> À jour
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="charts-grid">
        {/* Bar chart */}
        <div className="card">
          <div className="card-head">
            <h3 className="card-title">📊 Réservations par mois</h3>
            <span className="badge b-valid">+12% ce mois</span>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={MONTHS} barSize={32}>
                <XAxis dataKey="m" axisLine={false} tickLine={false}
                  tick={{ fill:'#8e87b3', fontSize:12, fontFamily:'Plus Jakarta Sans' }} />
                <YAxis axisLine={false} tickLine={false}
                  tick={{ fill:'#8e87b3', fontSize:12, fontFamily:'Plus Jakarta Sans' }} />
                <Tooltip content={<Tip />} cursor={{ fill:'rgba(108,71,255,0.06)', radius:6 }} />
                <Bar dataKey="r" name="Réservations" fill="#6c47ff" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie chart */}
        <div className="card">
          <div className="card-head">
            <h3 className="card-title">🚪 Types de chambres</h3>
          </div>
          <div className="card-body flex-center" style={{ flexDirection:'column', gap:16 }}>
            {types.length === 0 ? (
              <div className="empty">
                <div className="empty-illus">🚪</div>
                <p className="text-muted text-sm">Aucune chambre encore</p>
              </div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={170}>
                  <PieChart>
                    <Pie data={types} cx="50%" cy="50%" innerRadius={48} outerRadius={72}
                      paddingAngle={4} dataKey="value">
                      {types.map((_,i) => <Cell key={i} fill={PALETTE[i%PALETTE.length]} />)}
                    </Pie>
                    <Tooltip content={<Tip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex gap-12" style={{ justifyContent:'center', flexWrap:'wrap' }}>
                  {types.map((t,i) => (
                    <div key={t.name} className="flex items-center gap-6">
                      <div style={{ width:10,height:10,borderRadius:'50%', background:PALETTE[i%PALETTE.length] }} />
                      <span className="text-sm text-muted">{t.name} ({t.value})</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Occupancy */}
      <div className="card mt-24">
        <div className="card-head">
          <h3 className="card-title">📈 Taux d'occupation estimé</h3>
          <span className="text-sm text-muted">Année universitaire en cours</span>
        </div>
        <div className="card-body">
          {[
            { label:'Chambres simples', pct:78, color:'#6c47ff' },
            { label:'Chambres doubles', pct:61, color:'#00c9a7' },
            { label:'Chambres triples', pct:45, color:'#ff9f43' },
          ].map(({ label, pct, color }) => (
            <div key={label} style={{ marginBottom:18 }}>
              <div className="flex-between" style={{ marginBottom:7 }}>
                <span className="text-sm fw-600 text-h">{label}</span>
                <span className="text-sm fw-700" style={{ color }}>{pct}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width:`${pct}%`, background:color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick tips */}
      <div className="grid-3 mt-24">
        {[
          { emoji:'💡', title:'Astuce réservation', text:'Vérifiez la capacité d\'une chambre avant d\'affecter un étudiant. SIMPLE=1, DOUBLE=2, TRIPLE=3.', color:'violet' },
          { emoji:'⚡', title:'Workflow rapide',    text:'Créez l\'université → le foyer → les blocs → les chambres → inscrivez les étudiants → réservez.', color:'teal' },
          { emoji:'🤖', title:'Assistant IA',       text:'Utilisez le chatbot en bas à droite pour guider les étudiants vers la meilleure chambre.', color:'rose' },
        ].map(({ emoji, title, text, color }) => (
          <div className="card" key={title} style={{ padding:'20px 22px' }}>
            <div style={{ fontSize:'2rem', marginBottom:10 }}>{emoji}</div>
            <h4 style={{ fontFamily:'var(--font-h)', fontWeight:700, color:'var(--text-h)', marginBottom:6 }}>{title}</h4>
            <p className="text-sm text-muted" style={{ lineHeight:1.6 }}>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
