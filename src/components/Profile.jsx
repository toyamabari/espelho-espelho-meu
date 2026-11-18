import { useState } from 'react'
import { FiArrowLeft, FiBookmark, FiGrid, FiHeart } from 'react-icons/fi'

function Profile({
    profileUser,
    isOwnProfile,
    userPosts,
    savedPosts,
    onBack,
}) {
    const [subTab, setSubTab] = useState('posts')
    const [following, setFollowing] = useState(true)

    const gridPosts = subTab === 'saved' ? savedPosts : userPosts

    return (
        <section className="profile" aria-label={`Perfil de ${profileUser.user}`}>
            <button type="button" className="profile__back" onClick={onBack}>
                <FiArrowLeft /> Voltar ao feed
            </button>

            <header className="profile__header">
                <img
                    className="profile__avatar"
                    src={profileUser.avatar}
                    alt={profileUser.user}
                    onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${profileUser.user}&size=150&background=7c3aed&color=fff`
                    }}
                />

                <div className="profile__info">
                    <div className="profile__title-row">
                        <h2>{profileUser.user}</h2>
                        {isOwnProfile ? (
                            <span className="profile__badge">Seu perfil</span>
                        ) : (
                            <button
                                type="button"
                                className={`profile__follow-btn ${following ? 'is-following' : ''
                                    }`}
                                onClick={() => setFollowing(!following)}
                            >
                                {following ? 'Admirando' : 'Admirar'}
                            </button>
                        )}
                    </div>

                    <ul className="profile__stats">
                        <li>
                            <strong>{userPosts.length}</strong> publicações
                        </li>
                        <li>
                            <strong>{profileUser.followers}</strong> admiradores
                        </li>
                        <li>
                            <strong>{profileUser.following}</strong> seguindo
                        </li>
                    </ul>

                    <div className="profile__bio">
                        <strong>{profileUser.fullName}</strong>
                        <p>{profileUser.bio}</p>
                    </div>
                </div>
            </header>

            <div className="profile__tabs">
                <button
                    type="button"
                    className={`profile__tab ${subTab === 'posts' ? 'is-active' : ''}`}
                    onClick={() => setSubTab('posts')}
                >
                    <FiGrid /> PUBLICAÇÕES
                </button>

                {isOwnProfile && (
                    <button
                        type="button"
                        className={`profile__tab ${subTab === 'saved' ? 'is-active' : ''}`}
                        onClick={() => setSubTab('saved')}
                    >
                        <FiBookmark /> SALVOS ({savedPosts.length})
                    </button>
                )}
            </div>

            {gridPosts.length === 0 ? (
                <p className="profile__empty">
                    {subTab === 'saved'
                        ? 'Você ainda não salvou nenhuma publicação.'
                        : 'Nenhuma publicação encontrada.'}
                </p>
            ) : (
                <div className="profile__grid">
                    {gridPosts.map((post) => (
                        <div key={post.id} className="profile__grid-item">
                            <img
                                src={post.image}
                                alt={post.alt}
                                onError={(e) => {
                                    e.currentTarget.src = `https://picsum.photos/seed/espelho-${post.id}/500/500`
                                }}
                            />
                            <div className="profile__grid-overlay">
                                <span>
                                    <FiHeart /> {post.likes}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

export default Profile