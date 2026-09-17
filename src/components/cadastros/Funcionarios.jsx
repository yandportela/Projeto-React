import { useState, useEffect } from 'react'

function Funcionarios() {
  const [nome, setNome] = useState('')
  const [cargo, setCargo] = useState('')
  const [lista, setLista] = useState([])

  // Carrega a lista salva do localStorage ao iniciar
  useEffect(() => {
    const dadosSalvos = localStorage.getItem('funcionarios')
    if (dadosSalvos) {
      setLista(JSON.parse(dadosSalvos))
    }
  }, [])

  function salvar(e) {
    e.preventDefault()
    if (!nome || !cargo) return

    const novoFuncionario = { id: Date.now(), nome, cargo }
    const novaLista = [...lista, novoFuncionario]

    setLista(novaLista)
    // Grava o array como texto JSON no localStorage
    localStorage.setItem('funcionarios', JSON.stringify(novaLista))

    setNome('')
    setCargo('')
  }

  return (
    <section className="p-4">
      <h2>Cadastro de Funcionários (Múltiplos Registros)</h2>
      
      <form onSubmit={salvar} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Cargo</label>
          <input className="form-control" value={cargo} onChange={(e) => setCargo(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-success">Adicionar Funcionário</button>
      </form>

      <h4>Funcionários Cadastrados ({lista.length})</h4>
      <ul className="list-group">
        {lista.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between">
            <span><strong>{item.nome}</strong> - {item.cargo}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Funcionarios