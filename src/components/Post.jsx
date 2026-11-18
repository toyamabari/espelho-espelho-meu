import { useRef, useState } from 'react'
import {
  FiBookmark,
  FiHeart,
  FiMessageCircle,
  FiMoreHorizontal,
  FiSend,
  FiTrash2,
} from 'react-icons/fi'

function Post({
  post,
  currentUser,
  onToggleLike,
  onToggleSave,
  onAddComment,
  onDeleteComment,
  onSelectUser,
}) {
  const [commentText, setCommentText] = useState('')
  const [showAllComments, setShowAllComments] = useState(false)
  const [showBigHeart, setShowBigHeart] = useState(false)
  const inputRef = useRef(null)

  const handleDoubleClick = () => {
    if (!post.liked) {
      onToggleLike(post.id)
    }
    setShowBigHeart(true)
    setTimeout(() => setShowBigHeart(false), 700)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = commentText.trim()
    if (!trimmed) return

    onAddComment(post.id, trimmed)
    setCommentText('')
    setShowAllComments(true)
  }

  const comments = post.comments || []
  const visibleComments = showAllComments ? comments : comments.slice(-2)

  return (
    <article className="post">
      <header className="post__header">
        <button
          type="button"
          className="post__author-trigger"
          onClick={() => onSelectUser(post.user)}
        >
          <img
            className="post__avatar"
            src={post.avatar}
            alt={`Foto de ${post.user}`}
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${post.user}&background=7c3aed&color=fff`
            }}
          />
          <div className="post__user">
            <strong>{post.user}</strong>
            <span>{post.location}</span>
          </div>
        </button>

        <button
          className="icon-button post__more"
          type="button"
          aria-label="Mais opções"
        >
          <FiMoreHorizontal />
        </button>
      </header>

      <div className="post__media" onDoubleClick={handleDoubleClick}>
        <img
          className="post__image"
          src={post.image}
          alt={post.alt}
          onError={(e) => {
            e.currentTarget.src = `https://picsum.photos/seed/espelho-${post.id}/700/700`
          }}
        />
        {showBigHeart && (
          <div className="post__heart-burst" aria-hidden="true">
            <FiHeart />
          </div>
        )}
      </div>

      <div className="post__content">
        <div className="post__actions">
          <button
            className={`icon-button post__like-btn ${
              post.liked ? 'is-liked' : ''
            }`}
            type="button"
            aria-label={post.liked ? 'Descurtir' : 'Curtir'}
            aria-pressed={post.liked}
            onClick={() => onToggleLike(post.id)}
          >
            <FiHeart />
          </button>

          <button
            className="icon-button"
            type="button"
            aria-label="Comentar"
            onClick={() => inputRef.current?.focus()}
          >
            <FiMessageCircle />
          </button>

          <button
            className="icon-button"
            type="button"
            aria-label="Enviar"
            onClick={() =>
              navigator.clipboard?.writeText(
                `Olha esse post de @${post.user} no EspelhoGram!`
              )
            }
            title="Copiar link do post"
          >
            <FiSend />
          </button>

          <button
            className={`icon-button post__save-btn ${
              post.saved ? 'is-saved' : ''
            }`}
            type="button"
            aria-label={post.saved ? 'Remover dos salvos' : 'Salvar'}
            aria-pressed={post.saved}
            onClick={() => onToggleSave(post.id)}
          >
            <FiBookmark />
          </button>
        </div>

        <p className="post__likes">
          <strong>{post.likes.toLocaleString('pt-BR')} curtidas</strong>
        </p>

        <p className="post__caption">
          <button
            type="button"
            className="post__inline-user"
            onClick={() => onSelectUser(post.user)}
          >
            {post.user}
          </button>
          {post.caption}
        </p>

        {comments.length > 2 && !showAllComments && (
          <button
            type="button"
            className="post__view-comments"
            onClick={() => setShowAllComments(true)}
          >
            Ver todos os {comments.length} comentários
          </button>
        )}

        {visibleComments.length > 0 && (
          <ul className="post__comments">
            {visibleComments.map((comment) => (
              <li key={comment.id} className="post__comment">
                <span>
                  <button
                    type="button"
                    className="post__inline-user"
                    onClick={() => onSelectUser(comment.user)}
                  >
                    {comment.user}
                  </button>
                  {comment.text}
                </span>

                {comment.user === currentUser.user && (
                  <button
                    type="button"
                    className="post__comment-delete"
                    aria-label="Remover comentário"
                    onClick={() => onDeleteComment(post.id, comment.id)}
                  >
                    <FiTrash2 />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <form className="post__comment-form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Adicione um comentário..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button type="submit" disabled={!commentText.trim()}>
          Publicar
        </button>
      </form>
    </article>
  )
}

export default Post