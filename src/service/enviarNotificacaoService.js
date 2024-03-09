import http from '../utils/http'

const urlEnviarNotificacao = "/enviar-notificacoes";

const EnviarNotificacaoService = {

    enviar: async function(mensagemNotificacao) {
        const response = await http.post(`${urlEnviarNotificacao}/protocolo`, mensagemNotificacao);
        return response;
    }

}

export default EnviarNotificacaoService