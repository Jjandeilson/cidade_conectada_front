import Cliente from "../dto/cliente";
import CanalAtendimento from "../dto/canal-atendimento";
import TipoOcorrencia from "../dto/tipo-ocorrencia";
import Ocorrencia from "../dto/ocorrencia"; 

const Atendimento = {
    protocolo: '',
    descricao: '',
    status: '',
    abertura: Date,
    fechamento: Date,
    cliente: Cliente,
    canalAtendimento: CanalAtendimento,
    tipoOcorrencia: TipoOcorrencia,
    ocorrencia: Ocorrencia
}

export default Atendimento