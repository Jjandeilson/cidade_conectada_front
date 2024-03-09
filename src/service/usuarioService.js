import http from '../utils/http'

const urlUsuario = "/usuarios";

const UsuarioService = {

    listar : async function(numeroPagina = 0) {
        const response = await http.get(`${urlUsuario}?page=${numeroPagina}`);
        return response;
    },

    buscar: async function(codigoUsuario) {
        const response = await http.get(`${urlUsuario}/${codigoUsuario}`)
        return response; 
    },

    salvar: async function(usuario) {
        const response = await http.post(urlUsuario, usuario);
        return response;
    },

    atualizar: async function(codigoUsuario, usuario) {
        const response = await http.put(`${urlUsuario}/${codigoUsuario}`, usuario);
        return response;
    },

    excluir: async function(codigoUsuario) {
        const response = await http.delete(`${urlUsuario}/${codigoUsuario}`)
        return response; 
    },

    ativarAtendente: async function(codigoUsuario) {
        const response = await http.put(`${urlUsuario}/${codigoUsuario}/atendente/ativar`);
        return response;
    },
   
    desativarAtendente: async function(codigoUsuario) {
        const response = await http.delete(`${urlUsuario}/${codigoUsuario}/atendente/inativar`);
        return response;
    },

    listarFilasUsuario: async function(codigoUsuario) {
        const response = await http.get(`${urlUsuario}/${codigoUsuario}/filas`);
        return response;
    },

    salvarFila: async function(codigoUsuario, codigoFila) {
        const response = await http.put(`${urlUsuario}/${codigoUsuario}/filas/${codigoFila}`);
        return response;
    },
    
    removerFila: async function(codigoUsuario, codigoFila) {
        const response = await http.delete(`${urlUsuario}/${codigoUsuario}/filas/${codigoFila}`);
        return response;
    }
    
}

export default UsuarioService
