import api from './axios'

export const getStudents = (params = {}) =>
  api.get('/student/index.php', { params }).then((r) => r.data)

export const getStudent = (id) =>
  api.get('/student/show.php', { params: { id } }).then((r) => r.data)

export const createStudent = (data) =>
  api.post('/student/store.php', data).then((r) => r.data)

export const updateStudent = (data) =>
  api.post('/student/update.php', data).then((r) => r.data)

export const deleteStudent = (id) =>
  api.post('/student/delete.php', { id }).then((r) => r.data)
