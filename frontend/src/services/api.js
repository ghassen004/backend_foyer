import axios from 'axios';
const api = axios.create({ baseURL:'http://localhost:8089', headers:{'Content-Type':'application/json'} });
export const universiteAPI = {
  getAll:()=>api.get('/universite/retrieve-all-universites'),
  getById:(id)=>api.get(`/universite/retrieve-universite/${id}`),
  save:(d)=>api.post('/universite/addOrUpdate',d),
  delete:(id)=>api.delete(`/universite/remove-universite/${id}`),
};
export const foyerAPI = {
  getAll:()=>api.get('/foyer/retrieve-all-foyers'),
  getById:(id)=>api.get(`/foyer/retrieve-foyer/${id}`),
  save:(d)=>api.post('/foyer/addOrUpdate',d),
  delete:(id)=>api.delete(`/foyer/remove-foyer/${id}`),
};
export const blocAPI = {
  getAll:()=>api.get('/bloc/retrieve-all-blocs'),
  getById:(id)=>api.get(`/bloc/retrieve-bloc/${id}`),
  save:(d)=>api.post('/bloc/addOrUpdate',d),
  delete:(id)=>api.delete(`/bloc/remove-bloc/${id}`),
};
export const chambreAPI = {
  getAll:()=>api.get('/chambre/retrieve-all-chambres'),
  getById:(id)=>api.get(`/chambre/retrieve-chambre/${id}`),
  save:(d)=>api.post('/chambre/addOrUpdate',d),
  delete:(id)=>api.delete(`/chambre/remove-chambre/${id}`),
};
export const etudiantAPI = {
  getAll:()=>api.get('/etudiant/retrieve-all-etudiants'),
  getById:(id)=>api.get(`/etudiant/retrieve-etudiant/${id}`),
  save:(d)=>api.post('/etudiant/addOrUpdate',d),
  delete:(id)=>api.delete(`/etudiant/remove-etudiant/${id}`),
};
export const reservationAPI = {
  getAll:()=>api.get('/reservation/retrieve-all-reservations'),
  save:(d)=>api.post('/reservation/addOrUpdate',d),
  delete:(id)=>api.delete(`/reservation/remove-reservation/${id}`),
  ajouter:(numChambre,cin)=>api.post('/reservation/ajouterReservationEtAssignerAChambreEtAEtudiant',null,{params:{numChambre,cin}}),
  annuler:(cinEtudiant)=>api.delete('/reservation/annulerReservation',{params:{cinEtudiant}}),
};
