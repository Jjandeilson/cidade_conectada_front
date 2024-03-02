import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';

const TabelaAtendimento = () => {
    return (
        <>
            <div>
                <a href="/atendimentos/novo" className="p-button font-bold">Novo Atendimento</a>
            </div>

            <DataTable  tableStyle={{ minWidth: '50rem' }}>
                <Column field="protocolo" header="Protocolo"></Column>
                <Column field="status" header="Status"></Column>
                <Column field="abertura" header="Data de abertura"></Column>
                <Column field="finalizamento" header="Data de finalização"></Column>
                <Column field="cliente" header="Cliente"></Column>
                <Column field="acoes" header="Ações">
                    <Button label="Editar" />
                    <Button label="Excluir" severity="warning"/>
                </Column>
            </DataTable>
        </>
    )
}

export default TabelaAtendimento