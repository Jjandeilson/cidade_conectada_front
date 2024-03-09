import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import moment from 'moment-timezone';

import ClienteService from '../../../service/clienteService';

const TabelaCliente = () => {
    document.title = 'Listagem de clientes';

    const toast = useRef(null);
    const [clientes, setClientes] = useState([]);
    const [numeroPagina, setNumeroPagina] = useState(0);
    const [quantidadePorPagina, setQuantidadePorPagina] = useState(0);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const navegacao = useNavigate();

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    const excluir = (codigo) => {
        ClienteService.excluir(codigo)
            .then(() => {
                show('Operação realizada com sucesso', 'success', 'Success')
                ClienteService.listar()
                    .then(response => {
                        setClientes(response.data.content);
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
        ClienteService.listar(e.page)
            .then(response => {
                let clientesBanco = response.data.content;

                clientesBanco.forEach(cliente => {
                    cliente.dataNascimento = moment(cliente.dataNascimento).add(1, "days").format("DD/MM/YYYY");
                });

                setClientes(clientesBanco);
                setNumeroPagina(e.first);
                setQuantidadePorPagina(response.data.size);
                setTotalRegistros(response.data.totalElements);
            })
            .catch(response => console.log(response))
    }

    const botoesEditarExcluir = (setor) => {
        return (
            <>
                <Button label="Editar" onClick={() => navegacao(`/clientes/${setor.codigo}/editar`)} />
                <Button label="Excluir" onClick={() => excluir(setor.codigo)} severity="warning" />
            </>
        )
    }

    useEffect(() => {
        ClienteService.listar()
            .then(response => {
                let clientesBanco = response.data.content;

                clientesBanco.forEach(cliente => {
                    cliente.dataNascimento = moment(cliente.dataNascimento).add(1, "days").format("DD/MM/YYYY");
                });

                setClientes(clientesBanco);
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
                    <a onClick={() => navegacao("/clientes/novo")} className="p-button font-bold">Novo cliente</a>
                </div>

                <DataTable value={clientes} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="nome" header="Nome"></Column>
                    <Column field="email" header="E-mail"></Column>
                    <Column field="telefone" header="Telefone"></Column>
                    <Column field="celular" header="Celular"></Column>
                    <Column field="dataNascimento" header="Data de nascimento"></Column>
                    <Column field="acoes" header="Ações" body={botoesEditarExcluir}></Column>
                </DataTable>
                <Paginator first={numeroPagina} rows={quantidadePorPagina} totalRecords={totalRegistros} onPageChange={atualizarPagina} />

                <Toast ref={toast} />
            </div>
        </>
    )
}

export default TabelaCliente