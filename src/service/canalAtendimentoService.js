import http from '../utils/http'

const urlCanal = "/canais-atendimento";

const CanalAntendimentoService = {

    listar : async function(numeroPagina = 0) {
        const response = await http.get(`${urlCanal}?page=${numeroPagina}`);
        return response;
    },
   
    listaTodosCanais : async function() {
        const response = await http.get(`${urlCanal}/todos`);
        return response;
    },

    buscar: async function(codigoCanal) {
        const response = await http.get(`${urlCanal}/${codigoCanal}`)
        return response; 
    },

    salvar: async function(canal) {
        const response = await http.post(urlCanal, canal);
        return response;
    },

    atualizar: async function(codigoCanal, canal) {
        const response = await http.put(`${urlCanal}/${codigoCanal}`, canal);
        return response;
    },

    excluir: async function(codigoCanal) {
        const response = await http.delete(`${urlCanal}/${codigoCanal}`)
        return response; 
    }
    
}

export default CanalAntendimentoService