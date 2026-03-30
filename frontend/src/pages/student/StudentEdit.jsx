import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getStudent, updateStudent } from '@/api/student'
import AnimatedPage from '@/components/AnimatedPage'

const HOUSES = ['Гриффиндор', 'Слизерин', 'Когтевран', 'Пуффендуй']

function StudentEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    surname: '',
    house: HOUSES[0],
    course: '',
    is_deleted: '0',
    spell_count: '0',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    document.title = 'Hogwarts CRUD - Редактировать студента'
  }, [])

  useEffect(() => {
    const loadStudent = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await getStudent(id)
        setForm({
          name: data.name ?? '',
          surname: data.surname ?? '',
          house: data.house ?? HOUSES[0],
          course: data.course ?? '',
          is_deleted: String(data.is_deleted ?? 0),
          spell_count: String(data.spell_count ?? 0),
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadStudent()
  }, [id])

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
      await updateStudent({
        id: Number(id),
        name: form.name.trim(),
        surname: form.surname.trim(),
        house: form.house,
        course: form.course === '' ? null : Number(form.course),
        is_deleted: Number(form.is_deleted),
        spell_count: Number(form.spell_count),
      })
      setSuccess('Изменения сохранены. Переходим к списку...')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <AnimatedPage className="form-page">
      <h1 className="title">Редактировать студента</h1>
      <p className="subtitle">Обновите данные студента и сохраните изменения.</p>

      {error && <div className="alert alert--error">{error}</div>}
      {success && <div className="alert alert--success">{success}</div>}

      {loading ? (
        <p>Загрузка...</p>
      ) : (
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

          <label className="form__field">
            <span>Заклинаний</span>
            <input
              name="spell_count"
              value={form.spell_count}
              onChange={onChange}
              type="number"
              min="0"
            />
          </label>

          <div className="form__actions">
            <Link className="btn btn--ghost" to="/student">
              ← Назад к списку
            </Link>
            <button type="submit" className="btn btn--edit" disabled={saving || !!success}>
              {saving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      )}
    </AnimatedPage>
  )
}

export default StudentEdit