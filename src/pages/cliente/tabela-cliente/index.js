import { useNavigate } from 'react-router-dom';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';

const TabelaCliente = () => {
    const navegacao = useNavigate();

    return (
        <>
             <div>
                <a onClick={() => navegacao("/clientes/novo")} className="p-button font-bold">Novo usuário</a>
            </div>

            <DataTable  tableStyle={{ minWidth: '50rem' }}>
                <Column field="nome" header="Nome"></Column>
                <Column field="email" header="E-amil"></Column>
                <Column field="telefone" header="Telefone"></Column>
                <Column field="celular" header="Celular"></Column>
                <Column field="datanascimento" header="Data de nascimento"></Column>
                <Column field="acoes" header="Ações">
                    <Button label="Editar" />
                    <Button label="Excluir" severity="warning"/>
                </Column>
            </DataTable>
        </>
    )
}

export default TabelaCliente