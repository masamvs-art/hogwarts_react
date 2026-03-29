import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getSpell, updateSpell } from '@/api/spell'

function SpellEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    document.title = 'Hogwarts CRUD - Редактировать заклинание'
  }, [])

  useEffect(() => {
    const loadSpell = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await getSpell(id)
        setName(data.name ?? '')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadSpell()
  }, [id])

  useEffect(() => {
    if (!success) {
      return undefined
    }

    const timer = setTimeout(() => {
      navigate('/spell')
    }, 2000)

    return () => clearTimeout(timer)
  }, [success, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!name.trim()) {
      setError('Введите название заклинания')
      return
    }

    setSaving(true)
    try {
      await updateSpell({ id: Number(id), name: name.trim() })
      setSuccess('Изменения сохранены. Переходим к списку...')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <section>
      <h1 className="title">Редактировать заклинание</h1>
      <p className="subtitle">Измените название и сохраните изменения.</p>

      {error && <div className="alert alert--error">{error}</div>}
      {success && <div className="alert alert--success">{success}</div>}

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <label className="form__field">
            <span>Название</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={120}
            />
          </label>

          <div className="form__actions">
            <Link className="btn btn--ghost" to="/spell">
              ← Назад к списку
            </Link>
            <button type="submit" className="btn btn--edit" disabled={saving || !!success}>
              {saving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      )}
    </section>
  )
}

export default SpellEdit
