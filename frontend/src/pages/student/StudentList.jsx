import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { deleteStudent, getStudents } from '@/api/student'
import DeleteModal from '@/components/DeleteModal'

const HOUSE_OPTIONS = ['', 'Гриффиндор', 'Слизерин', 'Когтевран', 'Пуффендуй']
const DELETED_OPTIONS = [
  { value: '', label: 'Все' },
  { value: '0', label: 'Нет' },
  { value: '1', label: 'Да' },
]

function StudentList() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [filters, setFilters] = useState({
    name: '',
    surname: '',
    house: '',
    course: '',
    is_deleted: '',
  })

  useEffect(() => {
    document.title = 'Hogwarts CRUD - Студенты'
  }, [])

  const query = useMemo(() => {
    const result = {}
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '') {
        result[key] = value
      }
    })
    return result
  }, [filters])

  useEffect(() => {
    const loadStudents = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await getStudents(query)
        setItems(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadStudents()
  }, [query])

  const onFilterChange = (event) => {
    const { name, value } = event.target
    setFilters((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const onDelete = async () => {
    if (!selected) {
      return
    }

    setDeleting(true)
    try {
      await deleteStudent(selected.id)
      setItems((current) => current.filter((item) => item.id !== selected.id))
      setSelected(null)
    } catch (err) {
      setError(err.message)
      setSelected(null)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <section>
      <div className="page-header">
        <div>
          <h1 className="title">Студенты</h1>
          <p className="subtitle">Фильтрация и управление карточками студентов.</p>
        </div>
        <button type="button" className="btn btn--add" onClick={() => navigate('/student/add')}>
          Добавить студента
        </button>
      </div>

      {error && <div className="alert alert--error">{error}</div>}

      <div className="filter-grid">
        <label className="form__field">
          <span>Имя</span>
          <input name="name" value={filters.name} onChange={onFilterChange} />
        </label>
        <label className="form__field">
          <span>Фамилия</span>
          <input name="surname" value={filters.surname} onChange={onFilterChange} />
        </label>
        <label className="form__field">
          <span>Факультет</span>
          <select name="house" value={filters.house} onChange={onFilterChange}>
            {HOUSE_OPTIONS.map((house) => (
              <option key={house || 'all'} value={house}>
                {house || 'Все'}
              </option>
            ))}
          </select>
        </label>
        <label className="form__field">
          <span>Курс</span>
          <input name="course" value={filters.course} onChange={onFilterChange} type="number" min="1" max="7" />
        </label>
        <label className="form__field">
          <span>Удалён</span>
          <select name="is_deleted" value={filters.is_deleted} onChange={onFilterChange}>
            {DELETED_OPTIONS.map((option) => (
              <option key={option.value || 'all'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Факультет</th>
                <th>Курс</th>
                <th>Удалён</th>
                <th>Заклинаний</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {items.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.surname}</td>
                  <td>{student.house}</td>
                  <td>{student.course ?? '—'}</td>
                  <td>{Number(student.is_deleted) === 1 ? 'Да' : 'Нет'}</td>
                  <td>{student.spell_count}</td>
                  <td className="actions-cell">
                    <Link className="btn btn--edit" to={`/student/edit/${student.id}`}>
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn--delete"
                      onClick={() => setSelected(student)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={8} className="table-empty">
                    Нет записей по выбранным фильтрам.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <DeleteModal
          title="Удалить студента?"
          text={`${selected.name} ${selected.surname} будет удалён без возможности восстановления.`}
          onCancel={() => setSelected(null)}
          onConfirm={onDelete}
          loading={deleting}
        />
      )}
    </section>
  )
}

export default StudentList
