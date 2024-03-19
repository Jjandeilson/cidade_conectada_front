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

    const atualizarPagina = (e) => {
        FilaService.listar(e.page)
            .then(response => {
                setFilas(response.data.content);
                setNumeroPagina(e.first);
                setQuantidadePorPagina(response.data.size);
                setTotalRegistros(response.data.totalElements);
            })
            .catch(response => console.log(response));
    }

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    const excluir = async (codigo) => {
        FilaService.excluir(codigo)
            .then(() => {
                show('Operação realizada com sucesso', 'success', 'Success');
                FilaService.listar()
                    .then(response => {
                        setFilas(response.data.content);
                        setNumeroPagina(response.data.number);
                        setQuantidadePorPagina(response.data.size);
                        setTotalRegistros(response.data.totalElements);
                    })
                    .catch(response => console.log(response));
            })
            .catch(response => {
                show(response.response.data.detail, 'error', 'Error');
            });
    };

    const botoesEditarExcluir = (fila) => {
        return (
            <div className="btn-table">
                <Button label="Editar" onClick={() => navegacao(`/filas/${fila.codigo}/editar`)} />
                <Button label="Excluir" onClick={() => excluir(fila.codigo)} severity="warning" />
            </div>
        )
    }

    useEffect(() => {
        FilaService.listar()
            .then(response => {
                setFilas(response.data.content);
                setNumeroPagina(response.data.number);
                setQuantidadePorPagina(response.data.size);
                setTotalRegistros(response.data.totalElements);
            })
            .catch(response => console.log(response));
    }, []);

    return (
        <>
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
                <Paginator first={numeroPagina} rows={quantidadePorPagina} totalRecords={totalRegistros} onPageChange={atualizarPagina} />
            </div>

            <Toast ref={toast} />
        </>
    )
}

export default TabelaFila