import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { createStudent } from '@/api/student'
import AnimatedPage from '@/components/AnimatedPage'

const HOUSES = ['Гриффиндор', 'Слизерин', 'Когтевран', 'Пуффендуй']

function StudentAdd() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    surname: '',
    house: HOUSES[0],
    course: '',
    is_deleted: '0',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    document.title = 'Hogwarts CRUD - Добавить студента'
  }, [])

  useEffect(() => {
    if (!success) {
      return undefined
    }

    const timer = setTimeout(() => {
      navigate('/student')
    }, 2000)

    return () => clearTimeout(timer)
  }, [success, navigate])

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!form.name.trim() || !form.surname.trim()) {
      setError('Имя и фамилия обязательны')
      return
    }

    setSaving(true)
    try {
      await createStudent({
        name: form.name.trim(),
        surname: form.surname.trim(),
        house: form.house,
        course: form.course === '' ? null : Number(form.course),
        is_deleted: Number(form.is_deleted),
      })
      setSuccess('Студент успешно добавлен. Переходим к списку...')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <AnimatedPage className="form-page">
      <h1 className="title">Добавить студента</h1>
      <p className="subtitle">Создание новой записи студента.</p>

      {error && <div className="alert alert--error">{error}</div>}
      {success && <div className="alert alert--success">{success}</div>}

      <form className="form" onSubmit={onSubmit}>
        <label className="form__field">
          <span>Имя</span>
          <input name="name" value={form.name} onChange={onChange} maxLength={100} />
        </label>

        <label className="form__field">
          <span>Фамилия</span>
          <input name="surname" value={form.surname} onChange={onChange} maxLength={100} />
        </label>

        <label className="form__field">
          <span>Факультет</span>
          <select name="house" value={form.house} onChange={onChange}>
            {HOUSES.map((house) => (
              <option key={house} value={house}>
                {house}
              </option>
            ))}
          </select>
        </label>

        <label className="form__field">
          <span>Курс</span>
          <input name="course" value={form.course} onChange={onChange} type="number" min="1" max="7" />
        </label>

        <label className="form__field">
          <span>Удалён</span>
          <select name="is_deleted" value={form.is_deleted} onChange={onChange}>
            <option value="0">Нет</option>
            <option value="1">Да</option>
          </select>
        </label>

        <div className="form__actions">
          <Link className="btn btn--ghost" to="/student">
            ← Назад к списку
          </Link>
          <button type="submit" className="btn btn--add" disabled={saving || !!success}>
            {saving ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </form>
    </AnimatedPage>
  )
}

export default StudentAdd