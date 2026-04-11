import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function CrudPage({
  title, subtitle, emoji, color = '#6c47ff', pale = '#ede9ff',
  columns, fields, apiService, initialValues, extraToolbar, renderCard,
}) {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const [modal, setModal]     = useState(false);
  const [current, setCurrent] = useState(null);
  const [form, setForm]       = useState(initialValues);
  const [saving, setSaving]   = useState(false);
  const [view, setView]       = useState('table'); // 'table' | 'grid'

  const load = () => {
    setLoading(true);
    apiService.getAll()
      .then(r => setItems(r.data))
      .catch(() => toast.error('Erreur de chargement'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd  = () => { setForm(initialValues); setCurrent(null); setModal('add'); };
  const openEdit = item => { setForm({ ...initialValues, ...item }); setCurrent(item); setModal('edit'); };
  const close    = () => { setModal(false); setCurrent(null); setForm(initialValues); };

  const del = async item => {
    const idKey = Object.keys(item).find(k => k.startsWith('id'));
    if (!window.confirm('Confirmer la suppression ?')) return;
    try { await apiService.delete(item[idKey]); toast.success('Supprimé !'); load(); }
    catch { toast.error('Erreur de suppression'); }
  };

  const submit = async e => {
    e.preventDefault(); setSaving(true);
    try {
      await apiService.save(form);
      toast.success(modal === 'add' ? 'Ajouté ✓' : 'Modifié ✓');
      close(); load();
    } catch { toast.error('Erreur de sauvegarde'); }
    setSaving(false);
  };

  const filtered = items.filter(item =>
    columns.some(col => {
      const v = typeof col.accessor === 'function' ? col.accessor(item) : item[col.accessor];
      return String(v ?? '').toLowerCase().includes(search.toLowerCase());
    })
  );

  return (
    <div>
      {/* Header */}
      <div className="flex-between page-header">
        <div>
          <div className="flex items-center gap-12" style={{ marginBottom:5 }}>
            <div style={{ width:44,height:44,borderRadius:12,background:pale,
              display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem' }}>
              {emoji}
            </div>
            <h1 className="page-title">{title}</h1>
          </div>
          {subtitle && <p className="page-sub">{subtitle}</p>}
        </div>
        <div className="flex gap-8 items-center">
          {extraToolbar}
          <button className="btn btn-ghost btn-sm" onClick={() => setView(v => v==='table'?'grid':'table')}
            title="Changer la vue">
            {view === 'table' ? '⊞' : '≡'}
          </button>
          <button className="btn btn-primary" onClick={openAdd}>
            ＋ Ajouter
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="card">
        <div className="card-head" style={{ paddingBottom:14, borderBottom:'1px solid var(--border-soft)' }}>
          <div className="flex items-center gap-12">
            <div className="search-wrap">
              <span className="search-icon" style={{ fontSize:14 }}>🔍</span>
              <input className="search-input" placeholder="Rechercher…"
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <span className="badge b-neutral">{filtered.length} résultat(s)</span>
          </div>
          <div style={{ display:'flex',alignItems:'center',gap:8 }}>
            <div style={{ width:10,height:10,borderRadius:'50%',background:'var(--green)' }} />
            <span className="text-xs text-muted">Connecté à MySQL</span>
          </div>
        </div>

        {loading ? (
          <div className="flex-center" style={{ padding:'60px 0', flexDirection:'column', gap:12 }}>
            <div style={{ fontSize:'3rem', animation:'spin .8s linear infinite' }}>⚙️</div>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            <p className="text-muted text-sm">Chargement des données…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-illus">{emoji}</div>
            <h4>Aucun résultat</h4>
            <p className="text-sm text-muted" style={{ marginTop:6 }}>
              {search ? 'Essayez un autre terme.' : `Cliquez sur "+ Ajouter" pour créer le premier.`}
            </p>
          </div>
        ) : view === 'grid' && renderCard ? (
          <div className="card-body">
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:16 }}>
              {filtered.map((item, i) => renderCard(item, openEdit, del, i))}
            </div>
          </div>
        ) : (
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  {columns.map(col => <th key={col.header}>{col.header}</th>)}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, i) => (
                  <tr key={i}>
                    {columns.map(col => (
                      <td key={col.header}>
                        {col.render ? col.render(item) : (
                          typeof col.accessor === 'function' ? col.accessor(item) : item[col.accessor]
                        )}
                      </td>
                    ))}
                    <td>
                      <div className="flex gap-6">
                        <button className="btn btn-ghost btn-sm btn-ico" onClick={() => openEdit(item)} title="Modifier">✏️</button>
                        <button className="btn btn-danger btn-sm btn-ico" onClick={() => del(item)} title="Supprimer">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div className="overlay" onClick={e => e.target === e.currentTarget && close()}>
          <div className="modal">
            <div className="modal-head">
              <div className="flex items-center gap-12">
                <div className="modal-icon-wrap" style={{ background:pale, fontSize:'1.5rem' }}>{emoji}</div>
                <h3 className="modal-title">
                  {modal === 'add' ? `Ajouter` : 'Modifier'}
                </h3>
              </div>
              <button className="btn btn-ghost btn-ico" onClick={close}>✕</button>
            </div>
            <div className="modal-body">
              <form onSubmit={submit}>
                {fields.map(f => (
                  <div className="form-group" key={f.name}>
                    <label className="form-label">{f.label}</label>
                    {f.type === 'select' ? (
                      <select className="form-select" value={form[f.name] ?? ''}
                        onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                        required={f.required}>
                        <option value="">— Choisir —</option>
                        {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    ) : f.type === 'nested' ? (
                      <div className="info-box violet">
                        <p className="text-xs fw-600" style={{ marginBottom:10 }}>📦 {f.label}</p>
                        {f.subFields.map(sf => (
                          <div className="form-group" key={sf.name} style={{ marginBottom:10 }}>
                            <label className="form-label">{sf.label}</label>
                            <input className="form-input" type={sf.type||'text'}
                              placeholder={sf.placeholder}
                              value={(form[f.name]??{})[sf.name]??''}
                              onChange={e => setForm(p => ({ ...p,
                                [f.name]: { ...(p[f.name]??{}), [sf.name]: e.target.value } }))} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <input className="form-input" type={f.type||'text'}
                        placeholder={f.placeholder??''}
                        value={form[f.name]??''}
                        onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                        required={f.required} />
                    )}
                    {f.hint && <p className="form-hint">💡 {f.hint}</p>}
                  </div>
                ))}
                <div className="flex gap-12" style={{ justifyContent:'flex-end', marginTop:8 }}>
                  <button type="button" className="btn btn-ghost" onClick={close}>Annuler</button>
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? '⏳ En cours…' : '✅ Enregistrer'}
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
