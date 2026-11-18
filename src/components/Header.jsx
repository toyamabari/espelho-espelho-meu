import { FiCompass, FiHeart, FiHome, FiSearch, FiUser } from 'react-icons/fi'

function Header({ activeTab, onNavigate, searchQuery, onSearchChange, likedCount }) {
  return (
    <header className="header">
      <button
        type="button"
        className="header__logo"
        onClick={() => onNavigate('feed', null)}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          fontFamily: "'Grand Hotel', cursive, sans-serif",
          fontSize: '32px',
          fontWeight: '700',
          backgroundImage: 'linear-gradient(135deg, #7c3aed, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block'
        }}
      >
        AuraGram
      </button>

      <div className="header__search">
        <FiSearch className="header__search-icon" />
        <input
          type="text"
          placeholder="Buscar sonhos ou perfis..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Buscar publicações"
        />
        {searchQuery && (
          <button
            type="button"
            className="header__search-clear"
            onClick={() => onSearchChange('')}
            aria-label="Limpar busca"
          >
            ×
          </button>
        )}
      </div>

      <nav className="header__actions" aria-label="Navegação principal">
        <button
          className={`icon-button ${activeTab === 'feed' ? 'is-active' : ''}`}
          type="button"
          aria-label="Início"
          onClick={() => onNavigate('feed', null)}
        >
          <FiHome />
        </button>

        <button
          className="icon-button"
          type="button"
          aria-label="Explorar todos"
          onClick={() => {
            onSearchChange('')
            onNavigate('feed', null)
          }}
        >
          <FiCompass />
        </button>

        <button
          className="icon-button header__activity"
          type="button"
          aria-label="Curtidas dadas"
          title={`Você curtiu ${likedCount} publicação(ões)`}
        >
          <FiHeart />
          {likedCount > 0 && (
            <span className="header__badge">{likedCount}</span>
          )}
        </button>

        <button
          className={`icon-button ${activeTab === 'profile' ? 'is-active' : ''}`}
          type="button"
          aria-label="Meu Perfil"
          onClick={() => onNavigate('profile', null)}
        >
          <FiUser />
        </button>
      </nav>
    </header>
  )
}

export default Header