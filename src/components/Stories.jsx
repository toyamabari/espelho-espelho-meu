import { useState } from 'react'
import { FiX } from 'react-icons/fi'

function Stories({ posts, onSelectUser }) {
    const [activeStory, setActiveStory] = useState(null)
    const [viewedIds, setViewedIds] = useState([])

    const handleOpenStory = (post) => {
        setActiveStory(post)
        if (!viewedIds.includes(post.id)) {
            setViewedIds([...viewedIds, post.id])
        }
    }

    return (
        <>
            <section className="stories" aria-label="Stories">
                {posts.map((post) => {
                    const isViewed = viewedIds.includes(post.id)
                    return (
                        <button
                            key={post.id}
                            type="button"
                            className="stories__item"
                            onClick={() => handleOpenStory(post)}
                        >
                            <span
                                className={`stories__ring ${isViewed ? 'is-viewed' : ''}`}
                            >
                                <img
                                    className="stories__avatar"
                                    src={post.avatar}
                                    alt={`Story de ${post.user}`}
                                    onError={(e) => {
                                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${post.user}&background=7c3aed&color=fff`
                                    }}
                                />
                            </span>
                            <span className="stories__user">{post.user}</span>
                        </button>
                    )
                })}
            </section>

            {activeStory && (
                <div
                    className="story-modal"
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setActiveStory(null)}
                >
                    <div
                        className="story-modal__card"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="story-modal__header">
                            <button
                                type="button"
                                className="story-modal__author"
                                onClick={() => {
                                    const user = activeStory.user
                                    setActiveStory(null)
                                    onSelectUser(user)
                                }}
                            >
                                <img
                                    src={activeStory.avatar}
                                    alt={activeStory.user}
                                    onError={(e) => {
                                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${activeStory.user}&background=7c3aed&color=fff`
                                    }}
                                />
                                <strong>{activeStory.user}</strong>
                            </button>

                            <button
                                type="button"
                                className="story-modal__close"
                                aria-label="Fechar story"
                                onClick={() => setActiveStory(null)}
                            >
                                <FiX />
                            </button>
                        </div>

                        <img
                            className="story-modal__image"
                            src={activeStory.storyImage || activeStory.image}
                            alt={activeStory.alt}
                            onError={(e) => {
                                e.currentTarget.src = `https://picsum.photos/seed/story-${activeStory.id}/600/900`
                            }}
                        />

                        <p className="story-modal__caption">{activeStory.caption}</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Stories
