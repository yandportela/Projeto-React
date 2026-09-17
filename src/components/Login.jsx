import { useState } from 'react'

function Login({ setTela, atualizarUsuarioLogado }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [carregandoLocalizacao, setCarregandoLocalizacao] = useState(false)

  function registrarAcesso(usuario, localizacao = null) {
    const acesso = {
      nome: usuario.nome,
      email: usuario.email,
      foto: usuario.foto,
      dataHora: new Date().toISOString(),
      latitude: localizacao?.latitude ?? null,
      longitude: localizacao?.longitude ?? null
    }
    sessionStorage.setItem('acessoAtual', JSON.stringify(acesso))
    
    // Atualiza o estado global no App e redireciona
    atualizarUsuarioLogado()
    setTela('sessao')
  }

  function solicitarLocalizacao(usuario) {
    if (!navigator.geolocation) {
      registrarAcesso(usuario)
      return
    }

    setCarregandoLocalizacao(true)
    navigator.geolocation.getCurrentPosition(
      (posicao) => {
        registrarAcesso(usuario, {
          latitude: posicao.coords.latitude,
          longitude: posicao.coords.longitude
        })
        setCarregandoLocalizacao(false)
      },
      (erro) => {
        registrarAcesso(usuario)
        setCarregandoLocalizacao(false)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }

  function entrar(event) {
    event.preventDefault()
    const textoUsuario = localStorage.getItem('usuario')
    if (!textoUsuario) {
      setMensagem('Nenhum usuário cadastrado.')
      return
    }

    const usuario = JSON.parse(textoUsuario)
    if (usuario.email !== email || usuario.senha !== senha) {
      setMensagem('E-mail ou senha inválidos.')
      return
    }

    solicitarLocalizacao(usuario)
  }

  return (
    <section className="p-4">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: '450px' }}>
        <div className="card-body">
          <h2 className="h4 mb-4">Login</h2>
          {mensagem && <div className="alert alert-danger">{mensagem}</div>}

          <form onSubmit={entrar}>
            <div className="mb-3">
              <label className="form-label">E-mail</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Senha</label>
              <input
                type="password"
                className="form-control"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={carregandoLocalizacao}
            >
              {carregandoLocalizacao ? 'Obtendo localização...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login