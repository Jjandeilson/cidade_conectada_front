import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';

const TabelaUsuario = () => {
    return (
        <>
             <div>
                <a href="/usuarios/novo" className="p-button font-bold">Novo usuário</a>
            </div>

            <DataTable  tableStyle={{ minWidth: '50rem' }}>
                <Column field="nome" header="Nome"></Column>
                <Column field="email" header="E-amil"></Column>
                <Column field="telefone" header="Telefone"></Column>
                <Column field="celular" header="Celular"></Column>
                <Column field="atendente" header="Atendente"></Column>
                <Column field="acoes" header="Ações">
                    <Button label="Editar" />
                    <Button label="Excluir" severity="warning"/>
                </Column>
            </DataTable>
        </>
    )
}

export default TabelaUsuario