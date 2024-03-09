import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import '../tabela-setor/index.css';

import SetorService from '../../../service/sertorService';

const TabelaSetor = () => {
    document.title = 'Listagem de setor';

    const toast = useRef(null);
    const [setores, setSetores] = useState([]);
    const [numeroPagina, setNumeroPagina] = useState(0);
    const [quantidadePorPagina, setQuantidadePorPagina] = useState(0);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const navegacao = useNavigate();

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    const excluir = (codigo) => {
        SetorService.excluir(codigo)
            .then(() => {
                show('Operação realizada com sucesso', 'success', 'Success')
                SetorService.listar()
                    .then(response => {
                        setSetores(response.data.content);
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
        SetorService.listar(e.page)
            .then(response => {
                setSetores(response.data.content);
                setNumeroPagina(e.first);
                setQuantidadePorPagina(response.data.size);
                setTotalRegistros(response.data.totalElements);
            })
    }

    const botoesEditarExcluir = (setor) => {
        return (
            <>
                <Button label="Editar" onClick={() => navegacao(`/setores/${setor.codigo}/editar`)} />
                <Button label="Excluir" onClick={() => excluir(setor.codigo)} severity="warning" />
            </>
        )
    }

    useEffect(() => {
        SetorService.listar()
            .then(response => {
                setSetores(response.data.content);
                setNumeroPagina(response.data.number);
                setQuantidadePorPagina(response.data.size);
                setTotalRegistros(response.data.totalElements);
            });
    }, [])

    return (
        <>
            <div className="datatable-container">
                <div>
                    <a onClick={() => navegacao("/setores/novo")} className="p-button font-bold">Novo Setor</a>
                </div>

                <DataTable value={setores} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="nome" header="Nome"></Column>
                    <Column field="descricao" header="Descrição"></Column>
                    <Column filed="acao" header="Ações" body={botoesEditarExcluir}></Column>
                </DataTable>

                <Paginator first={numeroPagina} rows={quantidadePorPagina} totalRecords={totalRegistros} onPageChange={atualizarPagina} />

                <Toast ref={toast} />
            </div>
        </>
    )
}

export default TabelaSetor