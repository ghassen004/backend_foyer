// ══ Foyers.js ══════════════════════════════════════════════════
import React from 'react';
import CrudPage from '../components/CrudPage';
import { foyerAPI } from '../services/api';

export function Foyers() {
  return <CrudPage
    title="Foyers" subtitle="Bâtiments d'hébergement universitaire"
    emoji="🏢" color="#00c9a7" pale="#e0faf5"
    columns={[
      { header:'ID', accessor:'idFoyer' },
      { header:'Nom', accessor:'nomFoyer' },
      { header:'Capacité', render:r=><span className="badge b-double">👥 {r.capaciteFoyer}</span> },
      { header:'Blocs', render:r=><span className="badge b-simple">{r.blocs?.length||0} bloc(s)</span> },
    ]}
    fields={[
      { name:'nomFoyer',      label:'Nom du foyer', required:true, placeholder:'Ex: Foyer des filles' },
      { name:'capaciteFoyer', label:'Capacité totale', type:'number', required:true, placeholder:'Ex: 400' },
    ]}
    apiService={foyerAPI}
    initialValues={{ nomFoyer:'', capaciteFoyer:'' }}
    renderCard={(item, edit, del) => (
      <div style={{ background:'var(--bg-white)', border:'1px solid var(--border)',
        borderRadius:'var(--radius-lg)', padding:'18px 20px', boxShadow:'var(--shadow-sm)' }}>
        <div style={{ fontSize:'2.5rem', marginBottom:8 }}>🏢</div>
        <h4 style={{ fontFamily:'var(--font-h)', color:'var(--text-h)', fontWeight:700, marginBottom:4 }}>{item.nomFoyer}</h4>
        <p className="text-sm text-muted" style={{ marginBottom:10 }}>👥 Capacité: {item.capaciteFoyer}</p>
        <span className="badge b-simple">🧱 {item.blocs?.length||0} blocs</span>
        <div className="flex gap-8 mt-16">
          <button className="btn btn-ghost btn-sm w-full" onClick={()=>edit(item)}>✏️ Modifier</button>
          <button className="btn btn-danger btn-sm btn-ico" onClick={()=>del(item)}>🗑️</button>
        </div>
      </div>
    )}
  />;
}

// ══ Blocs.js ═══════════════════════════════════════════════════
export function Blocs() {
  const { blocAPI } = require('../services/api');
  return <CrudPage
    title="Blocs" subtitle="Sous-divisions architecturales des foyers"
    emoji="🧱" color="#ff9f43" pale="#fff4e8"
    columns={[
      { header:'ID', accessor:'idBloc' },
      { header:'Nom', accessor:'nomBloc' },
      { header:'Capacité', render:r=><span className="badge b-triple">👥 {r.capaciteBloc}</span> },
      { header:'Foyer', render:r=>r.foyer?<span className="badge b-double">🏢 {r.foyer.nomFoyer}</span>:<span className="badge b-neutral">—</span> },
      { header:'Chambres', render:r=><span className="badge b-simple">🚪 {r.chambres?.length||0}</span> },
    ]}
    fields={[
      { name:'nomBloc',      label:'Nom du bloc', required:true, placeholder:'Ex: Bloc A' },
      { name:'capaciteBloc', label:'Capacité', type:'number', required:true, placeholder:'Ex: 100' },
    ]}
    apiService={blocAPI}
    initialValues={{ nomBloc:'', capaciteBloc:'' }}
  />;
}

// ══ Chambres.js ════════════════════════════════════════════════
export function Chambres() {
  const { chambreAPI } = require('../services/api');
  const typeBadge = t => ({
    SIMPLE:  <span className="badge b-simple">🛏 SIMPLE</span>,
    DOUBLE:  <span className="badge b-double">🛏🛏 DOUBLE</span>,
    TRIPLE:  <span className="badge b-triple">🛏🛏🛏 TRIPLE</span>,
  }[t] || <span className="badge b-neutral">{t}</span>);

  return <CrudPage
    title="Chambres" subtitle="Unités physiques de résidence"
    emoji="🚪" color="#38b6ff" pale="#e8f6ff"
    columns={[
      { header:'ID', accessor:'idChambre' },
      { header:'N° Chambre', accessor:'numeroChambre' },
      { header:'Type', render:r=>typeBadge(r.typeC) },
      { header:'Bloc', render:r=>r.bloc?<span className="badge b-simple">🧱 {r.bloc.nomBloc}</span>:<span className="badge b-neutral">—</span> },
      { header:'Réservations', render:r=><span className="badge b-neutral">📅 {r.reservations?.length||0}</span> },
    ]}
    fields={[
      { name:'numeroChambre', label:'Numéro', type:'number', required:true, placeholder:'Ex: 101',
        hint:'Le numéro doit être unique dans toute la base.' },
      { name:'typeC', label:'Type', type:'select', required:true, options:[
        { value:'SIMPLE', label:'🛏 Simple — 1 personne' },
        { value:'DOUBLE', label:'🛏🛏 Double — 2 personnes' },
        { value:'TRIPLE', label:'🛏🛏🛏 Triple — 3 personnes' },
      ]},
    ]}
    apiService={chambreAPI}
    initialValues={{ numeroChambre:'', typeC:'' }}
    renderCard={(item, edit, del) => (
      <div style={{ background:'var(--bg-white)', border:'1px solid var(--border)',
        borderRadius:'var(--radius-lg)', padding:'18px 20px', boxShadow:'var(--shadow-sm)' }}>
        <div style={{ fontSize:'2.5rem', marginBottom:8 }}>🚪</div>
        <h4 style={{ fontFamily:'var(--font-h)', color:'var(--text-h)', fontWeight:700, marginBottom:4 }}>
          Chambre #{item.numeroChambre}
        </h4>
        <div style={{ marginBottom:10 }}>{typeBadge(item.typeC)}</div>
        {item.bloc && <p className="text-sm text-muted">🧱 Bloc: {item.bloc.nomBloc}</p>}
        <div className="flex gap-8 mt-16">
          <button className="btn btn-ghost btn-sm w-full" onClick={()=>edit(item)}>✏️ Modifier</button>
          <button className="btn btn-danger btn-sm btn-ico" onClick={()=>del(item)}>🗑️</button>
        </div>
      </div>
    )}
  />;
}

// ══ Etudiants.js ═══════════════════════════════════════════════
export function Etudiants() {
  const { etudiantAPI } = require('../services/api');
  const initials = e => `${(e.prenomEt||'')[0]||''}${(e.nomEt||'')[0]||''}`.toUpperCase();
  const COLORS = ['#6c47ff','#00c9a7','#ff9f43','#ff6b9d','#38b6ff'];

  return <CrudPage
    title="Étudiants" subtitle="Gestion des résidents de la plateforme"
    emoji="👨‍🎓" color="#ff6b9d" pale="#fff0f6"
    columns={[
      { header:'ID', accessor:'idEtudiant' },
      { header:'Étudiant', render:(r,i)=>(
        <div className="flex items-center gap-12">
          <div className="avatar" style={{ background:COLORS[r.idEtudiant%COLORS.length]+'22',
            color:COLORS[r.idEtudiant%COLORS.length] }}>{initials(r)}</div>
          <span>{r.prenomEt} {r.nomEt}</span>
        </div>
      )},
      { header:'CIN', render:r=><span className="mono">{r.cin}</span> },
      { header:'École', accessor:'ecole' },
      { header:'Naissance', accessor:'dateNaissance' },
    ]}
    fields={[
      { name:'nomEt',         label:'Nom',    required:true, placeholder:'Ben Ali' },
      { name:'prenomEt',      label:'Prénom', required:true, placeholder:'Mohamed' },
      { name:'cin',           label:'CIN',  type:'number', required:true, placeholder:'12345678' },
      { name:'ecole',         label:'École', required:true, placeholder:'ESPRIT' },
      { name:'dateNaissance', label:'Date de naissance', type:'date', required:true },
    ]}
    apiService={etudiantAPI}
    initialValues={{ nomEt:'', prenomEt:'', cin:'', ecole:'', dateNaissance:'' }}
    renderCard={(item, edit, del) => {
      const c = COLORS[item.idEtudiant%COLORS.length];
      return (
        <div style={{ background:'var(--bg-white)', border:'1px solid var(--border)',
          borderRadius:'var(--radius-lg)', padding:'20px', boxShadow:'var(--shadow-sm)' }}>
          <div className="flex items-center gap-12" style={{ marginBottom:12 }}>
            <div className="avatar" style={{ width:48,height:48,fontSize:'1.1rem',
              background:c+'22', color:c }}>{initials(item)}</div>
            <div>
              <h4 style={{ fontFamily:'var(--font-h)', color:'var(--text-h)', fontWeight:700 }}>
                {item.prenomEt} {item.nomEt}
              </h4>
              <p className="text-sm text-muted">{item.ecole}</p>
            </div>
          </div>
          <p className="text-sm text-muted">🪪 CIN: <span className="mono">{item.cin}</span></p>
          <p className="text-sm text-muted">🎂 Né(e) le: {item.dateNaissance}</p>
          <div className="flex gap-8 mt-16">
            <button className="btn btn-ghost btn-sm w-full" onClick={()=>edit(item)}>✏️ Modifier</button>
            <button className="btn btn-danger btn-sm btn-ico" onClick={()=>del(item)}>🗑️</button>
          </div>
        </div>
      );
    }}
  />;
}
