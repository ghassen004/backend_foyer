// ══════════════════════════════════════════
//  Universites.js
// ══════════════════════════════════════════
import React from 'react';
import CrudPage from '../components/CrudPage';
import { universiteAPI } from '../services/api';

const COLS = [
  { header:'ID',         accessor:'idUniversite' },
  { header:'Nom',        accessor:'nomUniversite' },
  { header:'Adresse',    accessor:'adresse' },
  { header:'Foyer',      render: r => r.foyer
    ? <span className="badge b-double">🏢 {r.foyer.nomFoyer}</span>
    : <span className="badge b-neutral">Non affecté</span> },
];
const FIELDS = [
  { name:'nomUniversite', label:'Nom', required:true, placeholder:'Ex: Esprit' },
  { name:'adresse',       label:'Adresse', required:true, placeholder:'Ex: Ariana, Tunis' },
  { name:'foyer', label:'Foyer associé (optionnel)', type:'nested',
    subFields:[
      { name:'nomFoyer',      label:'Nom du foyer',  placeholder:'Ex: Foyer des garçons' },
      { name:'capaciteFoyer', label:'Capacité', type:'number', placeholder:'Ex: 400' },
    ]},
];

export default function Universites() {
  return <CrudPage
    title="Universités" subtitle="Gérer les universités et leurs foyers"
    emoji="🎓" color="#6c47ff" pale="#ede9ff"
    columns={COLS} fields={FIELDS} apiService={universiteAPI}
    initialValues={{ nomUniversite:'', adresse:'', foyer:null }}
    renderCard={(item, edit, del) => (
      <div key={item.idUniversite} style={{
        background:'var(--bg-white)', border:'1px solid var(--border)',
        borderRadius:'var(--radius-lg)', padding:'18px 20px',
        boxShadow:'var(--shadow-sm)', transition:'var(--t)',
      }}
        onMouseEnter={e=>e.currentTarget.style.boxShadow='var(--shadow-md)'}
        onMouseLeave={e=>e.currentTarget.style.boxShadow='var(--shadow-sm)'}
      >
        <div style={{ fontSize:'2.5rem', marginBottom:10 }}>🎓</div>
        <h4 style={{ fontFamily:'var(--font-h)', color:'var(--text-h)', fontWeight:700, marginBottom:4 }}>
          {item.nomUniversite}
        </h4>
        <p className="text-sm text-muted" style={{ marginBottom:10 }}>📍 {item.adresse}</p>
        {item.foyer
          ? <span className="badge b-double">🏢 {item.foyer.nomFoyer}</span>
          : <span className="badge b-neutral">Pas de foyer</span>}
        <div className="flex gap-8 mt-16">
          <button className="btn btn-ghost btn-sm w-full" onClick={() => edit(item)}>✏️ Modifier</button>
          <button className="btn btn-danger btn-sm btn-ico" onClick={() => del(item)}>🗑️</button>
        </div>
      </div>
    )}
  />;
}
