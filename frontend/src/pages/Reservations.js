import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { reservationAPI } from '../services/api';

export default function Reservations() {
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [bookModal, setBook]    = useState(false);
  const [cancelModal, setCancel]= useState(false);
  const [form, setForm]         = useState({ numChambre:'', cin:'' });
  const [cancelCin, setCancelCin]=useState('');
  const [saving, setSaving]     = useState(false);

  const load = () => {
    setLoading(true);
    reservationAPI.getAll()
      .then(r => setItems(r.data))
      .catch(() => toast.error('Erreur'))
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const book = async e => {
    e.preventDefault(); setSaving(true);
    try {
      const r = await reservationAPI.ajouter(form.numChambre, form.cin);
      if (r.data) { toast.success('✅ Réservation créée !'); setBook(false); setForm({numChambre:'',cin:''}); load(); }
      else toast.error('⚠️ Capacité maximale atteinte !');
    } catch { toast.error('Erreur'); }
    setSaving(false);
  };

  const cancel = async e => {
    e.preventDefault(); setSaving(true);
    try {
      const r = await reservationAPI.annuler(cancelCin);
      toast.success(r.data || 'Annulée !'); setCancel(false); setCancelCin(''); load();
    } catch { toast.error('Erreur'); }
    setSaving(false);
  };

  const filtered = items.filter(r =>
    (r.idReservation||'').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex-between page-header">
        <div>
          <div className="flex items-center gap-12" style={{ marginBottom:5 }}>
            <div style={{ width:44,height:44,borderRadius:12,background:'#e8f6ff',
              display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem' }}>📅</div>
            <h1 className="page-title">Réservations</h1>
          </div>
          <p className="page-sub">Affectation chambres ↔ étudiants</p>
        </div>
        <div className="flex gap-8">
          <button className="btn btn-danger" onClick={() => setCancel(true)}>🚫 Annuler</button>
          <button className="btn btn-primary" onClick={() => setBook(true)}>＋ Nouvelle réservation</button>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex gap-16 mb-16">
        {[
          { label:'Total', val:items.length, color:'#6c47ff', pale:'#ede9ff', emoji:'📋' },
          { label:'Validées', val:items.filter(r=>r.estValide).length, color:'#23d160', pale:'#e8fff1', emoji:'✅' },
          { label:'Annulées', val:items.filter(r=>!r.estValide).length, color:'#ff6b9d', pale:'#fff0f6', emoji:'🚫' },
        ].map(({label,val,color,pale,emoji}) => (
          <div key={label} style={{ flex:1, background:'var(--bg-white)', border:'1px solid var(--border)',
            borderRadius:'var(--radius-lg)', padding:'16px 20px', boxShadow:'var(--shadow-sm)' }}>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
              <div>
                <p className="stat-lbl">{label}</p>
                <p className="stat-val" style={{ color, fontSize:'1.8rem' }}>{val}</p>
              </div>
              <div style={{ width:48,height:48,borderRadius:12,background:pale,
                display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.5rem' }}>{emoji}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head" style={{ paddingBottom:14, borderBottom:'1px solid var(--border-soft)' }}>
          <div className="search-wrap">
            <span className="search-icon" style={{ fontSize:14 }}>🔍</span>
            <input className="search-input" placeholder="Rechercher par ID de réservation…"
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <span className="badge b-neutral">{filtered.length} résultat(s)</span>
        </div>
        {loading ? (
          <div className="flex-center" style={{ padding:'60px 0' }}>
            <div style={{ fontSize:'2.5rem', animation:'spin .8s linear infinite' }}>⚙️</div>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-illus">📅</div>
            <h4>Aucune réservation</h4>
            <p className="text-sm text-muted" style={{ marginTop:6 }}>
              Cliquez sur "+ Nouvelle réservation" pour commencer.
            </p>
          </div>
        ) : (
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID Réservation</th>
                  <th>Année universitaire</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={i}>
                    <td>
                      <span style={{ fontFamily:'monospace', fontSize:'0.8rem', color:'var(--violet)',
                        background:'var(--violet-pale)', padding:'3px 8px', borderRadius:6 }}>
                        {r.idReservation}
                      </span>
                    </td>
                    <td className="text-muted text-sm">📆 {r.anneeUniversitaire}</td>
                    <td>{r.estValide
                      ? <span className="badge b-valid">✅ Validée</span>
                      : <span className="badge b-invalid">🚫 Annulée</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Booking modal */}
      {bookModal && (
        <div className="overlay" onClick={e=>e.target===e.currentTarget&&setBook(false)}>
          <div className="modal">
            <div className="modal-head">
              <div className="flex items-center gap-12">
                <div style={{ width:48,height:48,borderRadius:14,background:'#e8f6ff',
                  display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.5rem' }}>📅</div>
                <h3 className="modal-title">Nouvelle réservation</h3>
              </div>
              <button className="btn btn-ghost btn-ico" onClick={()=>setBook(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="info-box violet" style={{ marginBottom:18 }}>
                💡 L'ID sera généré automatiquement :<br/>
                <code style={{ fontSize:'0.78rem' }}>AnnéeUniv–NomBloc–NumChambre–CIN</code>
              </div>
              <form onSubmit={book}>
                <div className="form-group">
                  <label className="form-label">Numéro de chambre</label>
                  <input className="form-input" type="number" placeholder="Ex: 101" required
                    value={form.numChambre} onChange={e=>setForm(f=>({...f,numChambre:e.target.value}))} />
                  <p className="form-hint">La chambre doit exister et ne pas être au maximum.</p>
                </div>
                <div className="form-group">
                  <label className="form-label">CIN de l'étudiant</label>
                  <input className="form-input" type="number" placeholder="Ex: 12345678" required
                    value={form.cin} onChange={e=>setForm(f=>({...f,cin:e.target.value}))} />
                </div>
                <div className="flex gap-12" style={{ justifyContent:'flex-end' }}>
                  <button type="button" className="btn btn-ghost" onClick={()=>setBook(false)}>Annuler</button>
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? '⏳…' : '✅ Confirmer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Cancel modal */}
      {cancelModal && (
        <div className="overlay" onClick={e=>e.target===e.currentTarget&&setCancel(false)}>
          <div className="modal">
            <div className="modal-head">
              <div className="flex items-center gap-12">
                <div style={{ width:48,height:48,borderRadius:14,background:'var(--rose-pale)',
                  display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.5rem' }}>🚫</div>
                <h3 className="modal-title">Annuler une réservation</h3>
              </div>
              <button className="btn btn-ghost btn-ico" onClick={()=>setCancel(false)}>✕</button>
            </div>
            <div className="modal-body">
              <form onSubmit={cancel}>
                <div className="form-group">
                  <label className="form-label">CIN de l'étudiant</label>
                  <input className="form-input" type="number" placeholder="Ex: 12345678" required
                    value={cancelCin} onChange={e=>setCancelCin(e.target.value)} />
                </div>
                <div className="info-box rose" style={{ marginBottom:16 }}>
                  ⚠️ Cette action supprime définitivement la réservation active de cet étudiant.
                </div>
                <div className="flex gap-12" style={{ justifyContent:'flex-end' }}>
                  <button type="button" className="btn btn-ghost" onClick={()=>setCancel(false)}>Fermer</button>
                  <button type="submit" className="btn btn-danger" disabled={saving}>
                    {saving ? '⏳…' : '🚫 Confirmer l\'annulation'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
