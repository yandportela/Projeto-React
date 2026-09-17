import { useState, useEffect } from 'react'
import Header from './components/Header'
import MenuLateral from './components/MenuLateral'
import Conteudo from './components/Conteudo'
import Safra from './components/cadastros/Safra'
import Unidade from './components/cadastros/Unidade'
import Equipamento from './components/cadastros/Equipameto'
import Medicao from './components/cadastros/Medicao'
import UnidadeMedida from './components/cadastros/UnidadeMedida'
import TipoInformacao from './components/cadastros/TipoInformacao'
import Indicadores from './components/cadastros/Indicadores'
import Funcionarios from './components/cadastros/Funcionarios'
import Usuarios from './components/cadastros/Usuarios'
import Login from './components/Login'
import SessaoAtual from './components/SessaoAtual'
import './App.css'

function App() {
  const [menuAberto, setMenuAberto] = useState(true)
  const [tela, setTela] = useState('inicio')
  const [usuarioLogado, setUsuarioLogado] = useState(null)

  // Carrega usuário da sessão ao iniciar ou mudar de estado
  function carregarUsuarioLogado() {
    const textoAcesso = sessionStorage.getItem('acessoAtual')
    if (textoAcesso) {
      setUsuarioLogado(JSON.parse(textoAcesso))
    } else {
      setUsuarioLogado(null)
    }
  }

  useEffect(() => {
    carregarUsuarioLogado()
  }, [])

  function alterarMenu() {
    setMenuAberto(!menuAberto)
  }

  // 4. Desafio: Verificar se é uma tela protegida (cadastros)
  const telasCadastros = [
    'safra', 'unidade', 'equipamento', 'medicao', 
    'unidademedida', 'tipoinformacao', 'indicadores', 'funcionarios'
  ]

  const estaTentandoAcessarCadastro = telasCadastros.includes(tela)
  const estaAutenticado = !!usuarioLogado

  return (
    <>
      <Header 
        usuarioLogado={usuarioLogado} 
        setUsuarioLogado={setUsuarioLogado} 
        setTela={setTela} 
      />
      
      <div className="layout">
        <MenuLateral aberto={menuAberto} setTela={setTela} />
        <main className="area-conteudo">
          <div className="p-3 border-bottom bg-white d-flex justify-content-between align-items-center">
            <button className="btn btn-primary" onClick={alterarMenu}>
              ☰ Menu
            </button>

            {/* Atalho para visualizar os detalhes da sessão atual */}
            {usuarioLogado && (
              <button className="btn btn-sm btn-outline-secondary" onClick={() => setTela('sessao')}>
                📍 Ver Dados da Sessão / Geolocalização
              </button>
            )}
          </div>

          {/* Telas Abertas */}
          {tela === 'inicio' && <Conteudo />}
          {tela === 'usuarios' && <Usuarios />}
          {tela === 'login' && (
            <Login 
              setTela={setTela} 
              atualizarUsuarioLogado={carregarUsuarioLogado} 
            />
          )}
          {tela === 'sessao' && <SessaoAtual />}

          {/* 4. Desafio: Bloqueio de cadastros caso NÃO esteja logado */}
          {estaTentandoAcessarCadastro && !estaAutenticado && (
            <div className="p-4">
              <div className="alert alert-danger text-center">
                <h4>Acesso Restrito 🔒</h4>
                <p>Você precisa estar logado para acessar as telas de cadastro.</p>
                <button className="btn btn-primary mt-2" onClick={() => setTela('login')}>
                  Ir para o Login
                </button>
              </div>
            </div>
          )}

          {/* Telas Protegidas (Só renderizam se estiver autenticado) */}
          {estaAutenticado && (
            <>
              {tela === 'safra' && <Safra />}
              {tela === 'unidade' && <Unidade />}
              {tela === 'equipamento' && <Equipamento />}
              {tela === 'medicao' && <Medicao />}
              {tela === 'unidademedida' && <UnidadeMedida />}
              {tela === 'tipoinformacao' && <TipoInformacao />}
              {tela === 'indicadores' && <Indicadores />}
              {tela === 'funcionarios' && <Funcionarios />}
            </>
          )}
        </main>
      </div>
    </>
  )
}

export default App