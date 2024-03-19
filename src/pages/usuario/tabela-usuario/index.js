import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import '../../../index.css'
import UsuarioService from '../../../service/usuarioService';

const TabelaUsuario = () => {
    document.title = 'Listagem de usuários';

    const toast = useRef(null);
    const [usuarios, setUsuarios] = useState([]);
    const [numeroPagina, setNumeroPagina] = useState(0);
    const [quantidadePorPagina, setQuantidadePorPagina] = useState(0);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const navegacao = useNavigate();

    const atualizarPagina = (e) => {
        UsuarioService.listar(e.page)
            .then(response => {
                setUsuarios(response.data.content);
                setNumeroPagina(e.first);
                setQuantidadePorPagina(response.data.size);
                setTotalRegistros(response.data.totalElements);
            })
            .catch(response => console.log(response));
    }

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    const excluir = (codigo) => {
        UsuarioService.excluir(codigo)
            .then(() => {
                show('Operação realizada com sucesso', 'success', 'Success')
                UsuarioService.listar()
                    .then(response => {
                        setUsuarios(response.data.content);
                        setNumeroPagina(response.data.number);
                        setQuantidadePorPagina(response.data.size);
                        setTotalRegistros(response.data.totalElements);
                    })
                    .catch(response => console.log(response));
            })
            .catch(response => {
                show(response.response.data.detail, 'error', 'Error');
            });
    }

    const botoesEditarExcluir = (usuario) => {
        return (
            <>
                <div className="btn-table">
                    <Button label="Editar" onClick={() => navegacao(`/usuarios/${usuario.codigo}/editar`)} />
                    <Button label="Excluir" onClick={() => excluir(usuario.codigo)} severity="warning" />
                </div>
            </>
        )
    }

    useEffect(() => {
        UsuarioService.listar()
            .then(response => {
                setUsuarios(response.data.content);
                setNumeroPagina(response.data.number);
                setQuantidadePorPagina(response.data.size);
                setTotalRegistros(response.data.totalElements);
            });
    }, [])

    return (
        <>
            <Toast ref={toast} />
            <div className="data-table-container container-max">
                <div className='header'>
                    <h1>USUÁRIOS</h1>
                    <Link to="/usuarios/novo" className="p-button">Novo Usuário</Link>
                </div>
                <DataTable value={usuarios}>
                    <Column field="nome" header="Nome" />
                    <Column field="email" header="E-amail" />
                    <Column field="telefone" header="Telefone" />
                    <Column field="celular" header="Celular" />
                    <Column field="atendente" header="Atendente" />
                    <Column field="acoes" header="Ações" body={botoesEditarExcluir} />
                </DataTable>
                <Paginator first={numeroPagina} rows={quantidadePorPagina} totalRecords={totalRegistros} onPageChange={atualizarPagina} />
            </div>
        </>
    )
}

export default TabelaUsuario