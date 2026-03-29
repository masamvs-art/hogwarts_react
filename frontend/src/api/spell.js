import api from './axios'

export const getSpells = () => api.get('/spell/index.php').then((r) => r.data)

export const getSpell = (id) =>
  api.get('/spell/show.php', { params: { id } }).then((r) => r.data)

export const createSpell = (payload) =>
  api.post('/spell/store.php', payload).then((r) => r.data)

export const updateSpell = (payload) =>
  api.post('/spell/update.php', payload).then((r) => r.data)

export const removeSpell = (id) =>
  api.post('/spell/delete.php', { id }).then((r) => r.data)
