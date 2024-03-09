import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import TipoOcorrenciaService from '../../../service/tipoOcorrenciaService';

const TabelaTipoOcorrencia = () => {
    document.title = 'Listagem de tipos de ocorrências';

    const toast = useRef(null);
    const [tiposOCorrencia, setTiposOcorrencias] = useState([]);
    const [numeroPagina, setNumeroPagina] = useState(0);
    const [quantidadePorPagina, setQuantidadePorPagina] = useState(0);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const navegacao = useNavigate();

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    const excluir = (codigo) => {
        TipoOcorrenciaService.excluir(codigo)
            .then(() => {
                show('Operação realizada com sucesso', 'success', 'Success')
                TipoOcorrenciaService.listar()
                    .then(response => {
                        setTiposOcorrencias(response.data.content);
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
        TipoOcorrenciaService.listar(e.page)
            .then(response => {
                setTiposOcorrencias(response.data.content);
                setNumeroPagina(e.first);
                setQuantidadePorPagina(response.data.size);
                setTotalRegistros(response.data.totalElements);
            })
            .catch(response => console.log(response))
    }

    const botoesEditarExcluir = (tipo) => {
        return (
            <>
                <Button label="Editar" onClick={() => navegacao(`/tipos-ocorrencia/${tipo.codigo}/editar`)} />
                <Button label="Excluir" onClick={() => excluir(tipo.codigo)} severity="warning" />
            </>
        )
    }

    useEffect(() => {
        TipoOcorrenciaService.listar()
            .then(response => {
                setTiposOcorrencias(response.data.content);
                setNumeroPagina(response.data.number);
                setQuantidadePorPagina(response.data.size);
                setTotalRegistros(response.data.totalElements);
            })
            .catch(response => console.log(response));
    }, [])

    return (
        <>
            <div>
                <div>
                    <a onClick={() => navegacao("/tipos-ocorrencia/novo")} className="p-button font-bold">Novo tipo de ocorrência</a>
                </div>

                <DataTable value={tiposOCorrencia} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="nome" header="Nome"></Column>
                    <Column field="setorNome" header="Setor"></Column>
                    <Column field="acoes" header="Ações" body={botoesEditarExcluir}></Column>
                </DataTable>
                <Paginator first={numeroPagina} rows={quantidadePorPagina} totalRecords={totalRegistros} onPageChange={atualizarPagina} />

                <Toast ref={toast} />
            </div>
        </>
    )
}

export default TabelaTipoOcorrencia