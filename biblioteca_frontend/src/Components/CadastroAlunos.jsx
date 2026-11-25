import { useEffect, useState } from "react";


const API = 'http://localhost:9090/alunos';

export default function CadastroAlunos() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

 
  const [alunos, setAlunos] = useState([]); 
  const [idAluno, setIdAluno] = useState(null);

  async function listar() {
    const resposta = await fetch(API);

    if (resposta.ok) {
      setAlunos(await resposta.json());
    }
  }

  async function adicionar(aluno) {
    const resposta = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno)
    });
    
    if (!resposta.ok) {
      alert('Não foi possível cadastrar o aluno.');
      return;
    }

    const novoAluno = await resposta.json();
    setAlunos(anteriores => [...anteriores, novoAluno]);
    limpar();
  }

  async function salvar(evento) {
    evento.preventDefault();

    const aluno = {
      nome: nome.trim(),
      email: email.trim(),
    };

    if (idAluno === null) {
      await adicionar(aluno);
    } else {
      const resposta = await fetch(`${API}/${idAluno}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aluno)
      });

      if (!resposta.ok) {
        alert('Não foi possível atualizar o aluno');
        return;
      }

      const alunoAtualizado = await resposta.json();

      setAlunos(anteriores =>
        anteriores.map(item => item.id === idAluno ? alunoAtualizado : item)
      );

      limpar();
    }
  }

  async function remover(id) {
    const resposta = await fetch(`${API}/${id}`, {
      method: 'DELETE'
    });

    if (!resposta.ok) {
      alert('Não foi possível remover o aluno');
      return;
    }

    setAlunos(anteriores => anteriores.filter(item => item.id !== id));

    if (idAluno === id) {
      limpar();
    }
  }

  useEffect(() => {
    listar();
  }, []);

  function editar(aluno) {
    setNome(aluno.nome);
    setEmail(aluno.email);
    setIdAluno(aluno.id);
  }


  function limpar() {
    setNome("");
    setEmail("");
    setIdAluno(null);
  }

  return (
    <main className="container">
      <header className="header">
        <h1>Controle de Alunos</h1>
        <span className="badge">
          {alunos.length} {alunos.length === 1 ? "aluno" : "alunos"}
        </span>
      </header>

      <form onSubmit={salvar}>
        <div className="form-grid">
          <input
            className="input-field"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do Aluno"
            required
          />
          <input
            className="input-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {idAluno === null ? "Adicionar Aluno" : "Salvar Alterações"}
          </button>

          {idAluno !== null && (
            <button
              type="button"
              onClick={limpar}
              className="btn btn-secondary"
            >
              Cancelar Edição
            </button>
          )}
        </div>
      </form>

      {alunos.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum aluno cadastrado ainda. Preencha os campos acima.</p>
        </div>
      ) : (
        <ul className="book-list">
          {alunos.map((item) => (
            <li
              key={item.id}
              className={`book-card ${idAluno === item.id ? "editing" : ""}`}
            >
              <div className="book-info">
                <h3>{item.nome}</h3>
                <p>{item.email}</p>
              </div>

              <div className="book-actions">
                <button
                  type="button"
                  onClick={() => editar(item)}
                  className="btn btn-sm btn-edit"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => remover(item.id)}
                  className="btn btn-sm btn-delete"
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}