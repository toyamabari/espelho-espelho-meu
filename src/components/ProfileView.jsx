import { useState } from 'react'
import { FaArrowLeft, FaBookmark, FaHeart, FaTh } from 'react-icons/fa'

export function ProfileView({
    profileUser,
    isCurrentUser,
    userPosts,
    savedPosts,
    onBackToFeed,
}) {
    const [activeTab, setActiveTab] = useState('posts')
    const [isFollowing, setIsFollowing] = useState(true)

    const displayedPosts = activeTab === 'saved' ? savedPosts : userPosts

    return (
        <section className="profile-view">
            <button type="button" className="back-feed-btn" onClick={onBackToFeed}>
                <FaArrowLeft /> Voltar para o Feed
            </button>

            <div className="profile-header">
                <img
                    className="profile-avatar-lg"
                    src={profileUser.avatar}
                    alt={profileUser.username}
                    onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${profileUser.username}&size=150&background=6d28d9&color=fff`
                    }}
                />

                <div className="profile-details">
                    <div className="profile-top-row">
                        <h2>{profileUser.username}</h2>
                        {!isCurrentUser ? (
                            <button
                                type="button"
                                className={`follow-btn ${isFollowing ? 'following' : ''}`}
                                onClick={() => setIsFollowing(!isFollowing)}
                            >
                                {isFollowing ? 'Admirando ✓' : 'Admirar'}
                            </button>
                        ) : (
                            <span className="profile-tag">Seu Espelho</span>
                        )}
                    </div>

                    <ul className="profile-stats">
                        <li>
                            <strong>{userPosts.length}</strong> sonhos publicados
                        </li>
                        <li>
                            <strong>{profileUser.followers}</strong> admiradores
                        </li>
                        <li>
                            <strong>{profileUser.following}</strong> inspirando
                        </li>
                    </ul>

                    <div className="profile-bio">
                        <strong>{profileUser.fullName}</strong>
                        <p>{profileUser.bio}</p>
                    </div>
                </div>
            </div>

            <div className="profile-tabs">
                <button
                    type="button"
                    className={`profile-tab ${activeTab === 'posts' ? 'active' : ''}`}
                    onClick={() => setActiveTab('posts')}
                >
                    <FaTh /> PUBLICAÇÕES
                </button>

                {isCurrentUser && (
                    <button
                        type="button"
                        className={`profile-tab ${activeTab === 'saved' ? 'active' : ''}`}
                        onClick={() => setActiveTab('saved')}
                    >
                        <FaBookmark /> SALVOS ({savedPosts.length})
                    </button>
                )}
            </div>

            {displayedPosts.length === 0 ? (
                <div className="empty-profile-grid">
                    <p>
                        {activeTab === 'saved'
                            ? 'Você ainda não salvou nenhum sonho do feed.'
                            : 'Nenhuma publicação encontrada neste perfil.'}
                    </p>
                </div>
            ) : (
                <div className="profile-grid">
                    {displayedPosts.map((post) => (
                        <div key={post.id} className="profile-grid-item">
                            <img
                                src={post.image}
                                alt={post.caption}
                                onError={(e) => {
                                    e.currentTarget.src = `https://picsum.photos/seed/auragram-${post.id}/500/500`
                                }}
                            />
                            <div className="profile-grid-overlay">
                                <span>
                                    <FaHeart /> {post.likes}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}