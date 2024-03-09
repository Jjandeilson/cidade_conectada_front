import http from '../utils/http'

const urlTipoOcorrencias = "/tipos-ocorrencia";

const TipoOcorrenciaService = {

    listar : async function(numeroPagina = 0) {
        const response = await http.get(`${urlTipoOcorrencias}?page=${numeroPagina}`);
        return response;
    },
   
    listaTodosTiposOcorrencias : async function() {
        const response = await http.get(`${urlTipoOcorrencias}/todas`);
        return response;
    },

    buscar: async function(codigoTipoOcorrencia) {
        const response = await http.get(`${urlTipoOcorrencias}/${codigoTipoOcorrencia}`)
        return response; 
    },

    salvar: async function(tipoOcorrencia) {
        const response = await http.post(urlTipoOcorrencias, tipoOcorrencia);
        return response;
    },

    atualizar: async function(codigoTipoOcorrencia, tipoOcorrencia) {
        const response = await http.put(`${urlTipoOcorrencias}/${codigoTipoOcorrencia}`, tipoOcorrencia);
        return response;
    },

    excluir: async function(codigoTipoOcorrencia) {
        const response = await http.delete(`${urlTipoOcorrencias}/${codigoTipoOcorrencia}`)
        return response; 
    }
}

export default TipoOcorrenciaService