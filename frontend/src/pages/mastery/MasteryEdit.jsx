import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getMastery, updateMastery } from '@/api/mastery'
import { getStudents } from '@/api/student'
import { getSpells } from '@/api/spell'

function MasteryEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [students, setStudents] = useState([])
  const [spells, setSpells] = useState([])
  const [form, setForm] = useState({
    student_id: '',
    spell_id: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError('')

      try {
        const [mastery, studentsData, spellsData] = await Promise.all([
          getMastery(id),
          getStudents(),
          getSpells(),
        ])

        const studentList = Array.isArray(studentsData) ? studentsData : []
        const spellList = Array.isArray(spellsData) ? spellsData : []

        setStudents(studentList)
        setSpells(spellList)
        setForm({
          student_id: String(mastery.student_id ?? studentList[0]?.id ?? ''),
          spell_id: String(mastery.spell_id ?? spellList[0]?.id ?? ''),
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [id])

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!form.student_id || !form.spell_id) {
      setError('Выберите студента и заклинание')
      return
    }

    setSaving(true)
    try {
      await updateMastery({
        id: Number(id),
        student_id: Number(form.student_id),
        spell_id: Number(form.spell_id),
      })
      navigate('/mastery')
    } catch (err) {
      if (err.message.includes('существует')) {
        setError('Такая связь уже существует')
      } else {
        setError(err.message)
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <section>
      <h1 className="title">Редактировать освоение</h1>
      <p className="subtitle">Измените связь между студентом и заклинанием.</p>

      {error && <div className="alert alert--error">{error}</div>}

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <form className="form" onSubmit={onSubmit}>
          <label className="form__field">
            <span>Студент</span>
            <select name="student_id" value={form.student_id} onChange={onChange}>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} {student.surname}
                </option>
              ))}
            </select>
          </label>

          <label className="form__field">
            <span>Заклинание</span>
            <select name="spell_id" value={form.spell_id} onChange={onChange}>
              {spells.map((spell) => (
                <option key={spell.id} value={spell.id}>
                  {spell.name}
                </option>
              ))}
            </select>
          </label>

          <div className="form__actions">
            <Link className="btn btn--ghost" to="/mastery">
              Назад
            </Link>
            <button type="submit" className="btn btn--edit" disabled={saving}>
              {saving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      )}
    </section>
  )
}

export default MasteryEdit
