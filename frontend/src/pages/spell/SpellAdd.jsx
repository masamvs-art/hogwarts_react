import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { createSpell } from '@/api/spell'
import AnimatedPage from '@/components/AnimatedPage'

function SpellAdd() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    document.title = 'Hogwarts CRUD - Добавить заклинание'
  }, [])

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
      await createSpell({ name: name.trim() })
      setSuccess('Заклинание успешно добавлено. Переходим к списку...')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <AnimatedPage className="form-page">
      <h1 className="title">Добавить заклинание</h1>
      <p className="subtitle">Создайте новую запись в справочнике.</p>

      {error && <div className="alert alert--error">{error}</div>}
      {success && <div className="alert alert--success">{success}</div>}

      <form className="form" onSubmit={handleSubmit}>
        <label className="form__field">
          <span>Название</span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Например: Экспеллиармус"
            maxLength={120}
          />
        </label>

        <div className="form__actions">
          <Link className="btn btn--ghost" to="/spell">
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

export default SpellAdd