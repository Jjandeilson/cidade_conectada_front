import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import moment from 'moment-timezone';

import AtendimentoService from '../../../service/atendimentoService';

const TabelaAtendimento = () => {
    document.title = 'Listagem de atendimentos';

    const toast = useRef(null);
    const [atendimentos, setAtendimentos] = useState([]);
    const [numeroPagina, setNumeroPagina] = useState(0);
    const [quantidadePorPagina, setQuantidadePorPagina] = useState(0);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const navegacao = useNavigate();

    const atualizarPagina = (e) => {
        AtendimentoService.listar(e.page)
            .then(response => {
                let atendimentoBanco = response.data.content;

                atendimentoBanco.forEach(atendimento => {
                    atendimento.abertura = moment(atendimento.abertura).format("DD/MM/YYYY HH:mm:ss");

                    if (atendimento.fechamento) {
                        atendimento.fechamento = moment(atendimento.fechamento).format("DD/MM/YYYY HH:mm:ss");
                    }
                });

                setAtendimentos(atendimentoBanco);
                setNumeroPagina(e.first);
                setQuantidadePorPagina(response.data.size);
                setTotalRegistros(response.data.totalElements);
            })
            .catch(response => console.log(response));
    }

    const botoesEditar = (atendimento) => {
        return (
            <>
                <div className='btn-table'>
                    <Button label="Visualizar" onClick={() => navegacao(`/atendimentos/${atendimento.codigo}/editar`)} />
                </div>
            </>

        )
    }

    useEffect(() => {
        AtendimentoService.listar()
            .then(response => {
                let atendimentoBanco = response.data.content;
                atendimentoBanco.forEach(atendimento => {
                    atendimento.abertura = moment(atendimento.abertura).format("DD/MM/YYYY HH:mm:ss");

                    if (atendimento.fechamento) {
                        atendimento.fechamento = moment(atendimento.fechamento).format("DD/MM/YYYY HH:mm:ss");
                    }
                });

                setAtendimentos(atendimentoBanco);
                setNumeroPagina(response.data.number);
                setQuantidadePorPagina(response.data.size);
                setTotalRegistros(response.data.totalElements);
            })
            .catch(response => console.log(response));
    }, [])

    return (
        <>
            <Toast ref={toast} />
            <div className="data-table-container container-max">
                <div className='header'>
                    <h1>ATENDIMENTOS</h1>
                    <Link to="/atendimentos/novo" className="p-button">Novo Atendimento</Link>
                </div>
                <DataTable value={atendimentos}>
                    <Column field="protocolo" header="Protocolo"></Column>
                    <Column field="status" header="Status"></Column>
                    <Column field="abertura" header="Data de abertura"></Column>
                    <Column field="finalizamento" header="Data de finalização"></Column>
                    <Column field="clienteNome" header="Cliente"></Column>
                    <Column field="acoes" header="Ações" body={botoesEditar}></Column>
                </DataTable>
                <Paginator first={numeroPagina} rows={quantidadePorPagina} totalRecords={totalRegistros} onPageChange={atualizarPagina} />
            </div>
        </>
    )
}

export default TabelaAtendimento