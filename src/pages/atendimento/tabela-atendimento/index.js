import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';

import moment from 'moment-timezone';

import AtendimentoService from '../../../service/atendimentoService';

const TabelaAtendimento = () => {
    document.title = 'Listagem de atendimentos';

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
        return  (
            <>
               <Button label="Visualizar" onClick={() => navegacao(`/atendimentos/${atendimento.codigo}/editar`)}/>
            </>
        )
    }

    useEffect(() => {
        AtendimentoService.listar()
            .then(response =>  {
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
        <div className="container" style={{marginTop: '20px', marginLeft: '20px'}}>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <a onClick={() => navegacao('/atendimentos/novo')} className="p-button font-bold">
                    Novo Atendimento
                </a>
            </div>
    
            <div className="table-container" style={{ marginTop: '20px' }}>
                <DataTable value={atendimentos} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="protocolo" header="Protocolo"></Column>
                    <Column field="status" header="Status"></Column>
                    <Column field="abertura" header="Data de abertura"></Column>
                    <Column field="finalizamento" header="Data de finalização"></Column>
                    <Column field="clienteNome" header="Cliente"></Column>
                    <Column field="acoes" header="Ações" body={botoesEditar}></Column>
                </DataTable>
                <Paginator first={numeroPagina} rows={quantidadePorPagina} totalRecords={totalRegistros} onPageChange={atualizarPagina}/>
            </div>
        </div>
    )
    
}

export default TabelaAtendimento