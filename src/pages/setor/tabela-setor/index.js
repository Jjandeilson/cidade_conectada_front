import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import '../../../index.css'

import SetorService from '../../../service/sertorService';

const TabelaSetor = () => {

    const toast = useRef(null);
    const navegacao = useNavigate();
    const [setores, setSetores] = useState([]);
    const [numeroPagina, setNumeroPagina] = useState(0);
    const [quantidadePorPagina, setQuantidadePorPagina] = useState(0);
    const [totalRegistros, setTotalRegistros] = useState(0);

    useEffect(() => {
        carregarSetores();
        document.title = 'Setores';
    }, []);

    const carregarSetores = async (pagina = 0) => {
        try {
            const response = await SetorService.listar(pagina);
            const { content, number, size, totalElements } = response.data;
            setSetores(content);
            setNumeroPagina(number);
            setQuantidadePorPagina(size);
            setTotalRegistros(totalElements);
        } catch (error) {
            show(error.response?.data?.detail || 'Erro ao carregar setor', 'error', 'Erro');
        }
    };

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    const excluir = async (codigo) => {
        try {
            await SetorService.excluir(codigo);
            show('Operação realizada com sucesso', 'success', 'Success');
            await carregarSetores();
        } catch (error) {
            show(error.response?.data?.detail || 'Erro ao excluir setor', 'error', 'Erro');
        }
    };

    const botoesEditarExcluir = (setor) => {
        return (
            <div className="btn-table">
                <Button label="Editar" onClick={() => navegacao(`/setores/${setor.codigo}/editar`)} />
                <Button label="Excluir" onClick={() => excluir(setor.codigo)} severity="warning" />
            </div>
        )
    }

    return (
        <>
            <Toast ref={toast} />
            <div className="data-table-container">
                <div className='header'>
                    <h1>SETORES</h1>
                    <Link to="/setores/novo" className="p-button">Novo Setor</Link>
                </div>
                <DataTable value={setores}>
                    <Column field="nome" header="Nome" />
                    <Column field="descricao" header="Descrição" />
                    <Column field="acao" header="Ações" body={botoesEditarExcluir} />
                </DataTable>
                <Paginator first={numeroPagina} rows={quantidadePorPagina} totalRecords={totalRegistros} onPageChange={carregarSetores} />
            </div>
        </>
    );
};

export default TabelaSetor