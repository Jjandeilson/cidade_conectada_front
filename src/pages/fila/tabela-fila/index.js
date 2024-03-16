import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import '../../../index.css'

import FilaService from '../../../service/filaService';

const TabelaFila = () => {

    const toast = useRef(null);
    const navegacao = useNavigate();
    const [filas, setFilas] = useState([]);
    const [numeroPagina, setNumeroPagina] = useState(0);
    const [quantidadePorPagina, setQuantidadePorPagina] = useState(0);
    const [totalRegistros, setTotalRegistros] = useState(0);

    useEffect(() => {
        carregarFilas();
        document.title = "Filas";
    }, []);

    const carregarFilas = async (pagina = 0) => {
        try {
            const response = await FilaService.listar(pagina);
            const { content, number, size, totalElements } = response.data;
            setFilas(content);
            setNumeroPagina(number);
            setQuantidadePorPagina(size);
            setTotalRegistros(totalElements);
        } catch (error) {
            show(error.response?.data?.detail || 'Erro ao carregar fila', 'error', 'Erro');
        }
    };

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    const excluir = async (codigo) => {
        try {
            await FilaService.excluir(codigo);
            show('Operação realizada com sucesso', 'success', 'Success');
            await carregarFilas();
        } catch (error) {
            show(error.response?.data?.detail || 'Erro ao excluir fila', 'error', 'Erro');
        }
    };

    const botoesEditarExcluir = (fila) => {
        return (
            <div className="btn-table">
                <Button label="Editar" onClick={() => navegacao(`/filas/${fila.codigo}/editar`)} />
                <Button label="Excluir" onClick={() => excluir(fila.codigo)} severity="warning" />
            </div>
        )
    }

    return (
        <>
            <Toast ref={toast} />
            <div className="data-table-container">
                <div className="header">
                    <h1>FILAS</h1>
                    <Link to="/filas/novo" className="p-button">Nova Fila</Link>
                </div>
                <DataTable value={filas}>
                    <Column field="nome" header="Nome" />
                    <Column field="descricao" header="Descrição" />
                    <Column field="acoes" header="Ações" body={botoesEditarExcluir} />
                </DataTable>
                <Paginator first={numeroPagina} rows={quantidadePorPagina} totalRecords={totalRegistros} onPageChange={carregarFilas} />
            </div>
        </>
    )
}

export default TabelaFila