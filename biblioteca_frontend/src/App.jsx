import { useState } from "react";
import CadastroLivros from "./Components/CadastroLivros";
import CadastroAlunos from "./Components/CadastroAlunos";
import CadastroEmprestimo from "./Components/CadastroEmprestimo";
import "./Components/CadastroLivros.css";

export default function App() {
  const [pagina, setPagina] = useState("inicio");

  return (
    <div>
      {/* Navbar com Estilo de Madeira e Ouro */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">📜 Acervo da Biblioteca</div>
          <ul className="nav-links">
            <li>
              <button
                className={`nav-link ${pagina === "inicio" ? "active" : ""}`}
                onClick={() => setPagina("inicio")}
              >
                Início
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${pagina === "livros" ? "active" : ""}`}
                onClick={() => setPagina("livros")}
              >
                Livros
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${pagina === "alunos" ? "active" : ""}`}
                onClick={() => setPagina("alunos")}
              >
                Alunos
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${pagina === "emprestimos" ? "active" : ""}`}
                onClick={() => setPagina("emprestimos")}
              >
                Empréstimos
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Conteúdo da Página */}
      <main>
        {pagina === "inicio" && (
          <div className="container">
            <div className="home-card">
              <h1>Sistema de Gestão de Acervo</h1>
              <p style={{ color: "#735943", marginTop: "10px", fontStyle: "italic" }}>
                Selecione uma das opções no menu superior para realizar os cadastros e controle de empréstimos.
              </p>
            </div>
          </div>
        )}

        {pagina === "livros" && <CadastroLivros />}
        {pagina === "alunos" && <CadastroAlunos />}
        {pagina === "emprestimos" && <CadastroEmprestimo />}
      </main>
    </div>
  );
}