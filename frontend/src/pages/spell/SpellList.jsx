import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getSpells, removeSpell } from '@/api/spell'
import DeleteModal from '@/components/DeleteModal'
import AnimatedPage from '@/components/AnimatedPage'

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
    <AnimatedPage>
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
        <div className="table-wrap panel">
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
                <motion.tr
                  key={spell.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03, duration: 0.25 }}
                >
                  <td>{index + 1}</td>
                  <td>{spell.name}</td>
                  <td className="actions-cell">
                    <Link className="btn btn--edit" to={`/spell/edit/${spell.id}`}>
                      Изменить
                    </Link>
                    <button
                      type="button"
                      className="btn btn--delete"
                      onClick={() => setSelected(spell)}
                    >
                      Удалить
                    </button>
                  </td>
                </motion.tr>
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
          text={`\"${selected.name}\" будет удалено без возможности восстановления.`}
          onCancel={() => setSelected(null)}
          onConfirm={confirmDelete}
          loading={deleting}
        />
      )}
    </AnimatedPage>
  )
}

export default SpellList
