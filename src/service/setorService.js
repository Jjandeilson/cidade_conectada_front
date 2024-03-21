import http from '../utils/http'

const urlSetores = "/setores";

const SetorService = {

    listar : async function(numeroPagina = 0) {
        const response = await http.get(`${urlSetores}?page=${numeroPagina}`);
        return response;
    },

    buscar: async function(codigoSetor) {
        const response = await http.get(`${urlSetores}/${codigoSetor}`)
        return response; 
    },

    salvar: async function(setor) {
        const response = await http.post(urlSetores, setor);
        return response;
    },

    atualizar: async function(codigoSetor, setor) {
        const response = await http.put(`${urlSetores}/${codigoSetor}`, setor);
        return response;
    },

    excluir: async function(codigoSetor) {
        const response = await http.delete(`${urlSetores}/${codigoSetor}`)
        return response; 
    }
}

export default SetorService