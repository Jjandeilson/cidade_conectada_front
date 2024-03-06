import http from '../utils/http'

const urlTiposOcorrencias = "/tipos-ocorrencia/"
const urlOcorrencias = "/ocorrencias";

const OcorrenciaService = {

    listar : async function(codigoTipoOcorrencia) {
        const response = await http.get(`${urlTiposOcorrencias}${codigoTipoOcorrencia}${urlOcorrencias}`);
        return response;
    },

    buscar: async function(codigoTipoOcorrencia, codigoOcorrenncia) {
        const response = await http.get(`${urlTiposOcorrencias}${codigoTipoOcorrencia}${urlOcorrencias}/${codigoOcorrenncia}`)
        return response; 
    },

    salvar: async function(codigoTipoOcorrencia, ocorrencia) {
        const response = await http.post(`${urlTiposOcorrencias}${codigoTipoOcorrencia}${urlOcorrencias}`, ocorrencia);
        return response;
    },

    atualizar: async function(codigoTipoOcorrencia, codigoOcorrencia, ocorrencia) {
        const response = await http.put(`${urlTiposOcorrencias}${codigoTipoOcorrencia}${urlOcorrencias}/${codigoOcorrencia}`, ocorrencia);
        return response;
    },

    excluir: async function(codigoTipoOcorrencia, codigoOcorrencia) {
        const response = await http.delete(`${urlTiposOcorrencias}${codigoTipoOcorrencia}${urlOcorrencias}/${codigoOcorrencia}`)
        return response; 
    }
}

export default OcorrenciaService