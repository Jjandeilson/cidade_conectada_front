import { Route, Routes } from 'react-router-dom';
import './App.css';

import Main from './pages/main';
import TabelaSetor from './pages/setor/tabela-setor';
import CadastroSetor from './pages/setor/cadastro-setor';
import TabelaFila from './pages/fila/tabela-fila';
import CadastroFila from './pages/fila/cadastro-fila';
import TabelaUsuario from './pages/usuario/tabela-usuario';
import CadastroUsuario from './pages/usuario/cadastro-usuario';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} >
          <Route path="setores">
            <Route path="" element={<TabelaSetor />} />
            <Route path="novo" element={<CadastroSetor />} />
          </Route>
          <Route path="filas">
            <Route path="" element={<TabelaFila />} />
            <Route path="novo" element={<CadastroFila />} />
          </Route>
          <Route path="usuarios">
            <Route path="" element={<TabelaUsuario />} />
            <Route path="novo" element={<CadastroUsuario />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
