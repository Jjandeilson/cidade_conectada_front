import http from '../utils/http'

const urlCliente = "/clientes";

const ClienteService = {

    listar : async function(numeroPagina = 0) {
        const response = await http.get(`${urlCliente}?page=${numeroPagina}`);
        return response;
    },

    buscar: async function(codigoCliente) {
        const response = await http.get(`${urlCliente}/${codigoCliente}`)
        return response; 
    },

    salvar: async function(cliente) {
        const response = await http.post(urlCliente, cliente);
        return response;
    },

    atualizar: async function(codigoCliente, cliente) {
        const response = await http.put(`${urlCliente}/${codigoCliente}`, cliente);
        return response;
    },

    excluir: async function(codigoCliente) {
        const response = await http.delete(`${urlCliente}/${codigoCliente}`)
        return response; 
    },

    buscarPorCpf: async function(cpf) {
        const response = await http.get(`${urlCliente}/buscar-por-cpf/${cpf}`)
        return response; 
    }

}

export default ClienteService