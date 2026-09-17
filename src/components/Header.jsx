import React from 'react'

function Header({ usuarioLogado, setUsuarioLogado, setTela }) {
  function sair() {
    // 1. Desafio: Remover acessoAtual do sessionStorage
    sessionStorage.removeItem('acessoAtual')
    setUsuarioLogado(null)
    setTela('login')
  }

  return (
    <header className="navbar navbar-dark bg-dark px-4 d-flex justify-content-between align-items-center">
      <span className="navbar-brand mb-0 h1">Sistema Agrícola</span>

      <div className="d-flex align-items-center gap-3">
        {/* 2. Desafio: Exibir no cabeçalho o nome do usuário logado */}
        {usuarioLogado ? (
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-2 text-white">
              {usuarioLogado.foto && (
                <img
                  src={usuarioLogado.foto}
                  alt={usuarioLogado.nome}
                  className="rounded-circle"
                  style={{ width: '35px', height: '35px', objectFit: 'cover' }}
                />
              )}
              <span>Olá, <strong>{usuarioLogado.nome}</strong></span>
            </div>
            <button className="btn btn-outline-danger btn-sm" onClick={sair}>
              Sair
            </button>
          </div>
        ) : (
          <span className="text-white-50 small">Não autenticado</span>
        )}
      </div>
    </header>
  )
}

export default Header