import http from '../utils/http'

const urlOcorrencias = "/ocorrencias";
const urlEtapas = "etapas";

const EtapaService = {

    listar : async function(codigoOcorrencia) {
        const response = await http.get(`${urlOcorrencias}/${codigoOcorrencia}/${urlEtapas}`);
        return response;
    },

    buscar: async function(codigoOcorrencia, codigoEtapa) {
        const response = await http.get(`${urlOcorrencias}/${codigoOcorrencia}/${urlEtapas}/${codigoEtapa}`)
        return response; 
    },

    salvar: async function(codigoOcorrencia, etapa) {
        const response = await http.post(`${urlOcorrencias}/${codigoOcorrencia}/${urlEtapas}`, etapa);
        return response;
    },

    atualizar: async function(codigoOcorrencia, codigoEtapa, etapa) {
        const response = await http.put(`${urlOcorrencias}/${codigoOcorrencia}/${urlEtapas}/${codigoEtapa}`, etapa);
        return response;
    },

    excluir: async function(codigoOcorrencia, codigoEtapa) {
        const response = await http.delete(`${urlOcorrencias}/${codigoOcorrencia}/${urlEtapas}/${codigoEtapa}`)
        return response; 
    }

}

export default EtapaService