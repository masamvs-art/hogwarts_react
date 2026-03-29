import api from './axios'

export const getMasteries = (params = {}) =>
  api.get('/mastery/index.php', { params }).then((r) => r.data)

export const getMastery = (id) =>
  api.get('/mastery/show.php', { params: { id } }).then((r) => r.data)

export const createMastery = (data) =>
  api.post('/mastery/store.php', data).then((r) => r.data)

export const updateMastery = (data) =>
  api.post('/mastery/update.php', data).then((r) => r.data)

export const deleteMastery = (id) =>
  api.post('/mastery/delete.php', { id }).then((r) => r.data)
