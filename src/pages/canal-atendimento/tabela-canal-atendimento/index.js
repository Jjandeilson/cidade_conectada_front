import { useNavigate } from 'react-router-dom';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';

const TabelaCanalAtendimento = () => {
    const navegacao = useNavigate();
    return (
        <>
            <div>
                <a onClick={() => navegacao("/canais-atendimento/novo")} className="p-button font-bold">Novo canal de atendimento</a>
            </div>

            <DataTable  tableStyle={{ minWidth: '50rem' }}>
                <Column field="nome" header="Nome"></Column>
                <Column field="descricao" header="Descrição"></Column>
                <Column field="acoes" header="Ações">
                    <Button label="Editar" />
                    <Button label="Excluir" severity="warning"/>
                </Column>
            </DataTable>
        </>
    )
}

export default TabelaCanalAtendimento