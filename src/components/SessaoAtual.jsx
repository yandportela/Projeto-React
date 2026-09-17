function SessaoAtual() {
  const textoAcesso = sessionStorage.getItem('acessoAtual')
  const acesso = textoAcesso ? JSON.parse(textoAcesso) : null

  if (!acesso) {
    return (
      <div className="p-4">
        <div className="alert alert-warning">
          Nenhuma sessão ativa encontrada. Faça login para visualizar os detalhes.
        </div>
      </div>
    )
  }

  const temLocalizacao = acesso.latitude !== null && acesso.longitude !== null

  return (
    <section className="p-4">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: '550px' }}>
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="h5 mb-0">Status da Sessão Ativa</h3>
          <span className="badge bg-light text-primary">sessionStorage</span>
        </div>
        <div className="card-body">
          <div className="d-flex align-items-center mb-4 gap-3">
            {acesso.foto ? (
              <img
                src={acesso.foto}
                alt={acesso.nome}
                className="img-thumbnail rounded-circle"
                style={{ width: '70px', height: '70px', objectFit: 'cover' }}
              />
            ) : (
              <div className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                👤
              </div>
            )}
            <div>
              <h4 className="h5 mb-1">{acesso.nome}</h4>
              <p className="text-muted mb-0">{acesso.email}</p>
            </div>
          </div>

          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <strong>Data / Hora do Login:</strong>
              <span>{new Date(acesso.dataHora).toLocaleString('pt-BR')}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <strong>Status da Geolocalização:</strong>
              {temLocalizacao ? (
                <span className="badge bg-success">Capturada</span>
              ) : (
                <span className="badge bg-secondary">Não Informada / Recusada</span>
              )}
            </li>
            {temLocalizacao && (
              <>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>Latitude:</strong>
                  <code>{acesso.latitude}</code>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>Longitude:</strong>
                  <code>{acesso.longitude}</code>
                </li>
              </>
            )}
          </ul>

          {temLocalizacao && (
            <div className="text-end">
              <a
                href={`https://www.google.com/maps?q=${acesso.latitude},${acesso.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-primary btn-sm"
              >
                Abrir Localização no Google Maps 🗺️
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default SessaoAtual