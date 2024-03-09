import http from '../utils/http'

const urlFilas = "/filas";

const FilaService = {

    listar : async function(numeroPagina = 0) {
        const response = await http.get(`${urlFilas}?page=${numeroPagina}`);
        return response;
    },

    buscar: async function(codigoFila) {
        const response = await http.get(`${urlFilas}/${codigoFila}`)
        return response; 
    },

    salvar: async function(fila) {
        const response = await http.post(urlFilas, fila);
        return response;
    },

    atualizar: async function(codigoFila, fila) {
        const response = await http.put(`${urlFilas}/${codigoFila}`, fila);
        return response;
    },

    excluir: async function(codigoFila) {
        const response = await http.delete(`${urlFilas}/${codigoFila}`)
        return response; 
    }
}

export default FilaService