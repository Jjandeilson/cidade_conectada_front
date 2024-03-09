import { Route, Routes } from 'react-router-dom';

import Main from './pages/main';
import TabelaSetor from './pages/setor/tabela-setor';
import CadastroSetor from './pages/setor/cadastro-setor';
import TabelaFila from './pages/fila/tabela-fila';
import CadastroFila from './pages/fila/cadastro-fila';
import TabelaUsuario from './pages/usuario/tabela-usuario';
import CadastroUsuario from './pages/usuario/cadastro-usuario';
import TabelaCanalAtendimento from './pages/canal-atendimento/tabela-canal-atendimento';
import CadastroCanalAtendimento from './pages/canal-atendimento/cadastro-canal-atendimento';
import TabelaCliente from './pages/cliente/tabela-cliente';
import CadastroCliente from './pages/cliente/cadastro-cliente';
import TabelaTipoOcorrencia from './pages/tipo-ocorrencia/tabela-tipo-ocorrencia';
import CadastroTipoOcorencia from './pages/tipo-ocorrencia/cadastro-tipo-ocorrencia';
import TabelaAtendimento from './pages/atendimento/tabela-atendimento';
import CadastroAtendimento from './pages/atendimento/cadastro-atendimento';
import AcompanhamentoAtendimento from './pages/atendimento/acompanhamento-atendimento';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} >
          <Route path="setores">
            <Route path="" element={<TabelaSetor />} />
            <Route path="novo" element={<CadastroSetor />} />
            <Route path=":codigo/editar" element={<CadastroSetor />} />
          </Route>
          <Route path="filas">
            <Route path="" element={<TabelaFila />} />
            <Route path="novo" element={<CadastroFila />} />
            <Route path=":codigo/editar" element={<CadastroFila />} />
          </Route>
          <Route path="usuarios">
            <Route path="" element={<TabelaUsuario />} />
            <Route path="novo" element={<CadastroUsuario />} />
            <Route path=":codigo/editar" element={<CadastroUsuario />} />
          </Route>
          <Route path="canais-atendimento">
            <Route path="" element={<TabelaCanalAtendimento />} />
            <Route path="novo" element={<CadastroCanalAtendimento />} />
            <Route path=":codigo/editar" element={<CadastroCanalAtendimento />} />
          </Route>
          <Route path="clientes">
            <Route path="" element={<TabelaCliente />} />
            <Route path="novo" element={<CadastroCliente />} />
            <Route path=":codigo/editar" element={<CadastroCliente />} />
          </Route>
          <Route path="tipos-ocorrencia">
            <Route path="" element={<TabelaTipoOcorrencia />} />
            <Route path="novo" element={<CadastroTipoOcorencia />} />
            <Route path=":codigo/editar" element={<CadastroTipoOcorencia />} />
          </Route>
          <Route path="atendimentos">
            <Route path="" element={<TabelaAtendimento />} />
            <Route path="novo" element={<CadastroAtendimento />} />
            <Route path=":codigo/editar" element={<AcompanhamentoAtendimento />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
