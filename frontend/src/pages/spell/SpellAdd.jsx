import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { createSpell } from '@/api/spell'

function SpellAdd() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Введите название заклинания')
      return
    }

    setSaving(true)
    try {
      await createSpell({ name: name.trim() })
      navigate('/spell')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <section>
      <h1 className="title">Добавить заклинание</h1>
      <p className="subtitle">Создайте новую запись в справочнике.</p>

      {error && <div className="alert alert--error">{error}</div>}

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
            Назад
          </Link>
          <button type="submit" className="btn btn--add" disabled={saving}>
            {saving ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default SpellAdd
