function DeleteModal({ title, text, onCancel, onConfirm, loading = false }) {
  return (
    <div className="modal-overlay" role="presentation" onClick={onCancel}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        onClick={(event) => event.stopPropagation()}
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
      </div>
    </div>
  )
}

export default DeleteModal
