import { useState } from 'react'
import { FiHeart, FiHome, FiSearch, FiUser } from 'react-icons/fi'
import Header from './components/Header'
import Post from './components/Post'
import Profile from './components/Profile'
import Stories from './components/Stories'
import initialPosts from './data/posts.json'
import './App.css'

const CURRENT_USER = {
  user: 'voce.sonhador',
  fullName: 'Explorador de Horizontes',
  avatar: '/images/avatars/lyra.jpg',
  bio: 'Colecionando visões de mundos possíveis ✨ | Espelho, espelho meu.',
  followers: '512',
  following: 4,
}

function App() {
  const [posts, setPosts] = useState(() =>
    initialPosts.map((post) => ({
      ...post,
      liked: Boolean(post.liked),
      saved: Boolean(post.saved),
      comments: post.comments || [],
    }))
  )
  const [activeTab, setActiveTab] = useState('feed')
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handleToggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post
        const nextLiked = !post.liked
        return {
          ...post,
          liked: nextLiked,
          likes: nextLiked ? post.likes + 1 : post.likes - 1,
        }
      })
    )
  }

  const handleToggleSave = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, saved: !post.saved } : post
      )
    )
  }

  const handleAddComment = (postId, text) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now(),
              user: CURRENT_USER.user,
              text,
            },
          ],
        }
      })
    )
  }

  const handleDeleteComment = (postId, commentId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post
        return {
          ...post,
          comments: post.comments.filter((c) => c.id !== commentId),
        }
      })
    )
  }

  const handleNavigate = (tab, username = null) => {
    setActiveTab(tab)
    setSelectedUser(username)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const filteredPosts = posts.filter((post) => {
    const q = searchQuery.toLowerCase()
    return (
      post.user.toLowerCase().includes(q) ||
      post.caption.toLowerCase().includes(q) ||
      post.location.toLowerCase().includes(q)
    )
  })

  const likedCount = posts.filter((p) => p.liked).length

  const getProfileProps = () => {
    if (!selectedUser || selectedUser === CURRENT_USER.user) {
      return {
        profileUser: CURRENT_USER,
        isOwnProfile: true,
        userPosts: posts.filter((p) => p.user === CURRENT_USER.user),
        savedPosts: posts.filter((p) => p.saved),
      }
    }

    const foundPost = posts.find((p) => p.user === selectedUser)
    return {
      profileUser: {
        user: selectedUser,
        fullName: foundPost?.fullName || selectedUser,
        avatar: foundPost?.avatar || '',
        bio:
          foundPost?.bio ||
          'Compartilhando aquilo que mais deseja ver no mundo.',
        followers: '2.480',
        following: 98,
      },
      isOwnProfile: false,
      userPosts: posts.filter((p) => p.user === selectedUser),
      savedPosts: [],
    }
  }

  return (
    <div className="app">
      <Header
        activeTab={activeTab}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        likedCount={likedCount}
      />

      {activeTab === 'profile' ? (
        <main className="profile-wrapper">
          <Profile
            {...getProfileProps()}
            onBack={() => handleNavigate('feed', null)}
          />
        </main>
      ) : (
        <main className="feed" aria-label="Feed de publicações">
          <Stories
            posts={posts}
            onSelectUser={(username) => handleNavigate('profile', username)}
          />

          {filteredPosts.length === 0 ? (
            <div className="feed__empty">
              <p>Nenhuma publicação encontrada para "{searchQuery}".</p>
              <button type="button" onClick={() => setSearchQuery('')}>
                Limpar filtro
              </button>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <Post
                key={post.id}
                post={post}
                currentUser={CURRENT_USER}
                onToggleLike={handleToggleLike}
                onToggleSave={handleToggleSave}
                onAddComment={handleAddComment}
                onDeleteComment={handleDeleteComment}
                onSelectUser={(username) => handleNavigate('profile', username)}
              />
            ))
          )}
        </main>
      )}

      <nav className="mobile-nav" aria-label="Navegação móvel">
        <button
          type="button"
          aria-label="Início"
          onClick={() => handleNavigate('feed', null)}
        >
          <FiHome />
        </button>
        <button
          type="button"
          aria-label="Pesquisar"
          onClick={() => {
            setSearchQuery('')
            handleNavigate('feed', null)
          }}
        >
          <FiSearch />
        </button>
        <button type="button" aria-label="Atividades">
          <FiHeart />
        </button>
        <button
          type="button"
          aria-label="Perfil"
          onClick={() => handleNavigate('profile', null)}
        >
          <FiUser />
        </button>
      </nav>
    </div>
  )
}

export default App