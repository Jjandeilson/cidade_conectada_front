import http from '../utils/http'

const urlAtendimentos = "/atendimentos";

const AtendimentoService = {

    listar : async function(numeroPagina = 0) {
        const response = await http.get(`${urlAtendimentos}?page=${numeroPagina}`);
        return response;
    },

    buscar: async function(codigoAtendimento) {
        const response = await http.get(`${urlAtendimentos}/${codigoAtendimento}`)
        return response; 
    },

    salvar: async function(atendimento) {
        const response = await http.post(urlAtendimentos, atendimento);
        return response;
    },

    atualizar: async function(codigoAtendimento, atendimento) {
        const response = await http.put(`${urlAtendimentos}/${codigoAtendimento}`, atendimento);
        return response;
    },

    excluir: async function(codigoAtendimento) {
        const response = await http.delete(`${urlAtendimentos}/${codigoAtendimento}`);
        return response; 
    },

    buscarClienteAtendimento: async function(codigoAtendimento) {
        const response = await http.get(`${urlAtendimentos}/buscar-cliente-atendimento/${codigoAtendimento}`);
        return response;
    },

    buscarEtapasAtendimento: async function(codigoAtendimento) {
        const response = await http.get(`${urlAtendimentos}/${codigoAtendimento}/etapas`);
        return response;
    },

    iniciarEtapa: async function(codigoAtendimento, codigoEtapa) {
        const response = await http.put(`${urlAtendimentos}/${codigoAtendimento}/etapas/${codigoEtapa}/iniciar`);
        return response;
    },
    
    finalizarEtapa: async function(codigoAtendimento, codigoEtapa) {
        const response = await http.put(`${urlAtendimentos}/${codigoAtendimento}/etapas/${codigoEtapa}/finalizar`);
        return response;
    }
}

export default AtendimentoService