import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import CanalAntendimentoService from '../../../service/canalAtendimentoService';

const TabelaCanalAtendimento = () => {
    document.title = 'Listagem de canais de atendimento';

    const toast = useRef(null);
    const [canais, setCanais] = useState([]);
    const [numeroPagina, setNumeroPagina] = useState(0);
    const [quantidadePorPagina, setQuantidadePorPagina] = useState(0);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const navegacao = useNavigate();

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    const excluir = (codigo) => {
        CanalAntendimentoService.excluir(codigo)
            .then(() => {
                show('Operação realizada com sucesso', 'success', 'Success')
                CanalAntendimentoService.listar()
                    .then(response => {
                        setCanais(response.data.content);
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
        CanalAntendimentoService.listar(e.page)
            .then(response => {
                setCanais(response.data.content);
                setNumeroPagina(e.first);
                setQuantidadePorPagina(response.data.size);
                setTotalRegistros(response.data.totalElements);
            })
    }

    const botoesEditarExcluir = (canal) => {
        return (
            <>
                <Button label="Editar" onClick={() => navegacao(`/canais-atendimento/${canal.codigo}/editar`)} />
                <Button label="Excluir" onClick={() => excluir(canal.codigo)} severity="warning" />
            </>
        )
    }

    useEffect(() => {
        CanalAntendimentoService.listar()
            .then(response => {
                setCanais(response.data.content);
                setNumeroPagina(response.data.number);
                setQuantidadePorPagina(response.data.size);
                setTotalRegistros(response.data.totalElements);
            });
    }, [])

    return (
        <>
            <div>
                <div>
                    <a onClick={() => navegacao("/canais-atendimento/novo")} className="p-button font-bold">Novo canal de atendimento</a>
                </div>

                <DataTable value={canais} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="nome" header="Nome"></Column>
                    <Column field="descricao" header="Descrição"></Column>
                    <Column field="acoes" header="Ações" body={botoesEditarExcluir}></Column>
                </DataTable>
                <Paginator first={numeroPagina} rows={quantidadePorPagina} totalRecords={totalRegistros} onPageChange={atualizarPagina} />

                <Toast ref={toast} />
            </div >
        </>
    )
}

export default TabelaCanalAtendimento