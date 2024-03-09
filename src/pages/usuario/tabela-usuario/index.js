import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import UsuarioService from '../../../service/usuarioService';

const TabelaUsuario = () => {
    document.title = 'Listagem de usuários';

    const toast = useRef(null);
    const [usuarios, setUsuarios] = useState([]);
    const [numeroPagina, setNumeroPagina] = useState(0);
    const [quantidadePorPagina, setQuantidadePorPagina] = useState(0);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const navegacao = useNavigate();

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
            })
            .catch(response => (
                show(response.response.data.detail, 'error', 'Error')
            ))
    }

    const atualizarPagina = (e) => {
        UsuarioService.listar(e.page)
            .then(response => {
                setUsuarios(response.data.content);
                setNumeroPagina(e.first);
                setQuantidadePorPagina(response.data.size);
                setTotalRegistros(response.data.totalElements);
            })
    }

    const botoesEditarExcluir = (usuario) => {
        return (
            <>
                <Button label="Editar" onClick={() => navegacao(`/usuarios/${usuario.codigo}/editar`)} />
                <Button label="Excluir" onClick={() => excluir(usuario.codigo)} severity="warning" />
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
            <div>
                <div>
                    <a onClick={() => navegacao("/usuarios/novo")} className="p-button font-bold">Novo usuário</a>
                </div>

                <DataTable value={usuarios} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="nome" header="Nome"></Column>
                    <Column field="email" header="E-amil"></Column>
                    <Column field="telefone" header="Telefone"></Column>
                    <Column field="celular" header="Celular"></Column>
                    <Column field="atendente" header="Atendente"></Column>
                    <Column field="acoes" header="Ações" body={botoesEditarExcluir}></Column>
                </DataTable>
                <Paginator first={numeroPagina} rows={quantidadePorPagina} totalRecords={totalRegistros} onPageChange={atualizarPagina} />

                <Toast ref={toast} />
            </div>
        </>
    )
}

export default TabelaUsuario