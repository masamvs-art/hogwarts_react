import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { getMasteries, deleteMastery } from '@/api/mastery'
import { getStudents } from '@/api/student'
import { getSpells } from '@/api/spell'
import DeleteModal from '@/components/DeleteModal'

function MasteryList() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [students, setStudents] = useState([])
  const [spells, setSpells] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [filters, setFilters] = useState({
    student_id: '',
    spell_id: '',
  })

  useEffect(() => {
    const loadFilterData = async () => {
      try {
        const [studentsData, spellsData] = await Promise.all([getStudents(), getSpells()])
        setStudents(Array.isArray(studentsData) ? studentsData : [])
        setSpells(Array.isArray(spellsData) ? spellsData : [])
      } catch (err) {
        setError(err.message)
      }
    }

    loadFilterData()
  }, [])

  const query = useMemo(() => {
    const result = {}
    if (filters.student_id !== '') {
      result.student_id = filters.student_id
    }
    if (filters.spell_id !== '') {
      result.spell_id = filters.spell_id
    }
    return result
  }, [filters])

  useEffect(() => {
    const loadMasteries = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await getMasteries(query)
        setItems(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadMasteries()
  }, [query])

  const onFilterChange = (event) => {
    const { name, value } = event.target
    setFilters((current) => ({ ...current, [name]: value }))
  }

  const onDelete = async () => {
    if (!selected) {
      return
    }

    setDeleting(true)
    try {
      await deleteMastery(selected.id)
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
          <h1 className="title">Освоение</h1>
          <p className="subtitle">Связи студентов и изученных заклинаний.</p>
        </div>
        <button type="button" className="btn btn--add" onClick={() => navigate('/mastery/add')}>
          Добавить связь
        </button>
      </div>

      {error && <div className="alert alert--error">{error}</div>}

      <div className="filter-grid">
        <label className="form__field">
          <span>Студент</span>
          <select name="student_id" value={filters.student_id} onChange={onFilterChange}>
            <option value="">Все</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} {student.surname}
              </option>
            ))}
          </select>
        </label>

        <label className="form__field">
          <span>Заклинание</span>
          <select name="spell_id" value={filters.spell_id} onChange={onFilterChange}>
            <option value="">Все</option>
            {spells.map((spell) => (
              <option key={spell.id} value={spell.id}>
                {spell.name}
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
                <th>Студент</th>
                <th>Заклинание</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.student_name}</td>
                  <td>{item.spell_name}</td>
                  <td className="actions-cell">
                    <Link className="btn btn--edit" to={`/mastery/edit/${item.id}`}>
                      Edit
                    </Link>
                    <button type="button" className="btn btn--delete" onClick={() => setSelected(item)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="table-empty">
                    Нет связей для выбранных фильтров.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <DeleteModal
          title="Удалить связь?"
          text="Связь студент-заклинание будет удалена без возможности восстановления."
          onCancel={() => setSelected(null)}
          onConfirm={onDelete}
          loading={deleting}
        />
      )}
    </section>
  )
}

export default MasteryList
