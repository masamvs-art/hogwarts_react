import { motion } from 'framer-motion'

function DeleteModal({ title, text, onCancel, onConfirm, loading = false }) {
  return (
    <motion.div
      className="modal-overlay"
      role="presentation"
      onClick={onCancel}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 id="delete-title" className="modal__title">
          {title ?? 'Подтверждение удаления'}
        </h2>
        <p>{text ?? 'Вы уверены, что хотите удалить запись?'}</p>
        <div className="modal__actions">
          <button type="button" className="btn btn--ghost" onClick={onCancel} disabled={loading}>
            Отмена
          </button>
          <button type="button" className="btn btn--delete" onClick={onConfirm} disabled={loading}>
            {loading ? 'Удаление...' : 'Удалить'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default DeleteModal
