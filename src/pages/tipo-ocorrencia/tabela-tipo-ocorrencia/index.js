import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import '../../../index.css'

import TipoOcorrenciaService from '../../../service/tipoOcorrenciaService';

const TabelaTipoOcorrencia = () => {

    const toast = useRef(null);
    const navegacao = useNavigate();
    const [tiposOCorrencia, setTiposOcorrencias] = useState([]);
    const [numeroPagina, setNumeroPagina] = useState(0);
    const [quantidadePorPagina, setQuantidadePorPagina] = useState(0);
    const [totalRegistros, setTotalRegistros] = useState(0);

    useEffect(() => {
        carregarTiposOcorrencia();
        document.title = 'Listagem de tipos de ocorrências';
    }, []);

    const carregarTiposOcorrencia = async (pagina = 0) => {
        try {
            const response = await TipoOcorrenciaService.listar(pagina);
            const { content, number, size, totalElements } = response.data;
            setTiposOcorrencias(content);
            setNumeroPagina(number);
            setQuantidadePorPagina(size);
            setTotalRegistros(totalElements);
        } catch (error) {
            console.error(error);
        }
    };

    const atualizarPagina = (e) => {
        carregarTiposOcorrencia(e.page);
    };

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

    const botoesEditarExcluir = (tipo) => {
        return (
            <>
                <div className="btn-table">
                    <Button label="Editar" onClick={() => navegacao(`/tipos-ocorrencia/${tipo.codigo}/editar`)} />
                    <Button label="Excluir" onClick={() => excluir(tipo.codigo)} severity="warning" />
                </div>
            </>
        )
    }

    return (
        <>
            <Toast ref={toast} />
            <div className="data-table-container">
                <div className='header'>
                    <h1>TIPOS DE OCORRÊNCIA</h1>
                    <Link to="/tipos-ocorrencia/novo" className="p-button">Novo tipo de ocorrência</Link>
                </div>
                <DataTable value={tiposOCorrencia}>
                    <Column field="nome" header="Nome"></Column>
                    <Column field="setorNome" header="Setor"></Column>
                    <Column field="acoes" header="Ações" body={botoesEditarExcluir}></Column>
                </DataTable>
                <Paginator first={numeroPagina} rows={quantidadePorPagina} totalRecords={totalRegistros} onPageChange={atualizarPagina} />
            </div>
        </>
    )
}

export default TabelaTipoOcorrencia