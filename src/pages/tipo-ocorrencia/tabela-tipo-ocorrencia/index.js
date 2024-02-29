import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';

const TabelaTipoOcorrencia = () => {
    return (
        <>
            <div>
                <a href="/tipos-ocorrencia/novo" className="p-button font-bold">Novo tipo de ocorrência</a>
            </div>

            <DataTable  tableStyle={{ minWidth: '50rem' }}>
                <Column field="nome" header="Nome"></Column>
                <Column field="setor" header="Setor"></Column>
                <Column field="acoes" header="Ações">
                    <Button label="Editar" />
                    <Button label="Excluir" severity="warning"/>
                </Column>
            </DataTable>
        </>
    )
}

export default TabelaTipoOcorrencia