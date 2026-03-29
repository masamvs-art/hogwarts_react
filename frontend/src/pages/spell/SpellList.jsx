import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getSpells, removeSpell } from '@/api/spell'
import DeleteModal from '@/components/DeleteModal'

function SpellList() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    document.title = 'Hogwarts CRUD - Заклинания'
  }, [])

  useEffect(() => {
    const loadSpells = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await getSpells()
        setItems(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadSpells()
  }, [])

  const confirmDelete = async () => {
    if (!selected) {
      return
    }

    setDeleting(true)
    try {
      await removeSpell(selected.id)
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
          <h1 className="title">Заклинания</h1>
          <p className="subtitle">Управление справочником магических заклинаний.</p>
        </div>
        <button type="button" className="btn btn--add" onClick={() => navigate('/spell/add')}>
          Добавить заклинание
        </button>
      </div>

      {error && <div className="alert alert--error">{error}</div>}

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Название</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {items.map((spell, index) => (
                <tr key={spell.id}>
                  <td>{index + 1}</td>
                  <td>{spell.name}</td>
                  <td className="actions-cell">
                    <Link className="btn btn--edit" to={`/spell/edit/${spell.id}`}>
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn--delete"
                      onClick={() => setSelected(spell)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={3} className="table-empty">
                    Список пуст.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <DeleteModal
          title="Удалить заклинание?"
          text={`"${selected.name}" будет удалено без возможности восстановления.`}
          onCancel={() => setSelected(null)}
          onConfirm={confirmDelete}
          loading={deleting}
        />
      )}
    </section>
  )
}

export default SpellList
