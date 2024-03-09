import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import FilaService from '../../../service/filaService';

const TabelaFila = () => {
    document.title = "Listagem de filas";

    const toast = useRef(null);
    const [filas, setFilas] = useState([]);
    const [numeroPagina, setNumeroPagina] = useState(0);
    const [quantidadePorPagina, setQuantidadePorPagina] = useState(0);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const navegacao = useNavigate();

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    const excluir = (codigo) => {
        FilaService.excluir(codigo)
            .then(() => {
                show('Operação realizada com sucesso', 'success', 'Success')
                FilaService.listar()
                    .then(response => {
                        setFilas(response.data.content);
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
        FilaService.listar(e.page)
            .then(response => {
                setFilas(response.data.content);
                setNumeroPagina(e.first);
                setQuantidadePorPagina(response.data.size);
                setTotalRegistros(response.data.totalElements);
            })
    }

    const botoesEditarExcluir = (fila) => {
<<<<<<< HEAD
        return  (
            <>
               <Button label="Editar" onClick={() => navegacao(`/filas/${fila.codigo}/editar`)}/>
               <Button label="Excluir" onClick={() => excluir(fila.codigo)} severity="warning"/>
=======
        return (
            <>
                <Button label="Editar" onClick={() => navegacao(`/filas/${fila.codigo}/editar`)} />
                <Button label="Excluir" onClick={() => excluir(fila.codigo)} severity="warning" />
>>>>>>> 9c2db3f87547a638fd0d3a736e38eb0d8bdb5726
            </>
        )
    }

    useEffect(() => {
        FilaService.listar()
<<<<<<< HEAD
            .then(response =>  {
=======
            .then(response => {
>>>>>>> 9c2db3f87547a638fd0d3a736e38eb0d8bdb5726
                setFilas(response.data.content);
                setNumeroPagina(response.data.number);
                setQuantidadePorPagina(response.data.size);
                setTotalRegistros(response.data.totalElements);
            });
    }, [])

    return (
        <>
<<<<<<< HEAD
            <div>
                <a onClick={() => navegacao("/filas/novo")} className="p-button font-bold">Nova fila</a>
            </div>

            <DataTable value={filas}  tableStyle={{ minWidth: '50rem' }}>
                <Column field="nome" header="Nome"></Column>
                <Column field="descricao" header="Descrição"></Column>
                <Column field="acoes" header="Ações" body={botoesEditarExcluir}></Column>
            </DataTable>
            <Paginator first={numeroPagina} rows={quantidadePorPagina} totalRecords={totalRegistros} onPageChange={atualizarPagina}/>

            <Toast ref={toast} />
=======
            <div className="fila-container">
                <div>
                    <a onClick={() => navegacao("/filas/novo")} className="p-button font-bold">Nova fila</a>
                </div>

                <DataTable value={filas} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="nome" header="Nome"></Column>
                    <Column field="descricao" header="Descrição"></Column>
                    <Column field="acoes" header="Ações" body={botoesEditarExcluir}></Column>
                </DataTable>
                <Paginator first={numeroPagina} rows={quantidadePorPagina} totalRecords={totalRegistros} onPageChange={atualizarPagina} />

                <Toast ref={toast} />
            </div>
>>>>>>> 9c2db3f87547a638fd0d3a736e38eb0d8bdb5726
        </>
    )
}

<<<<<<< HEAD
export default  TabelaFila
=======
export default TabelaFila
>>>>>>> 9c2db3f87547a638fd0d3a736e38eb0d8bdb5726
