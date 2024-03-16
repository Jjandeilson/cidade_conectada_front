import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import '../../../index.css'

import CanalAntendimentoService from '../../../service/canalAtendimentoService';

const TabelaCanalAtendimento = () => {

    const toast = useRef(null);
    const navegacao = useNavigate();
    const [canais, setCanais] = useState([]);
    const [numeroPagina, setNumeroPagina] = useState(0);
    const [quantidadePorPagina, setQuantidadePorPagina] = useState(0);
    const [totalRegistros, setTotalRegistros] = useState(0);

    useEffect(() => {
        carregarCanais();
        document.title = 'Canais de atendimento';
    }, []);

    const carregarCanais = async (pagina = 0) => {
        try {
            const response = await CanalAntendimentoService.listar(pagina);
            const { content, number, size, totalElements } = response.data;
            setCanais(content);
            setNumeroPagina(number);
            setQuantidadePorPagina(size);
            setTotalRegistros(totalElements);
        } catch (error) {
            console.error(error);
        }
    };

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    const excluir = async (codigo) => {
        try {
            await CanalAntendimentoService.excluir(codigo);
            show('Operação realizada com sucesso', 'success', 'Success');
            await carregarCanais();
        } catch (error) {
            show(error.response.data.detail, 'error', 'Error');
        }
    };

    const botoesEditarExcluir = (canal) => {
        return (
            <>
                <div className="btn-table">
                    <Button label="Editar" onClick={() => navegacao(`/canais-atendimento/${canal.codigo}/editar`)} />
                    <Button label="Excluir" onClick={() => excluir(canal.codigo)} severity="warning" />
                </div>
            </>
        )
    }

    return (
        <>
            <Toast ref={toast} />
            <div className="data-table-container">
                <div className='header'>
                    <h1>CANAIS DE ATENDIMENTO</h1>
                    <Link to="/canais-atendimento/novo" className="p-button">Novo canal de atendimento</Link>
                </div>
                <DataTable value={canais}>
                    <Column field="nome" header="Nome"></Column>
                    <Column field="descricao" header="Descrição"></Column>
                    <Column field="acoes" header="Ações" body={botoesEditarExcluir}></Column>
                </DataTable>
                <Paginator first={numeroPagina} rows={quantidadePorPagina} totalRecords={totalRegistros} onPageChange={carregarCanais} />
            </div >
        </>
    )
}

export default TabelaCanalAtendimento