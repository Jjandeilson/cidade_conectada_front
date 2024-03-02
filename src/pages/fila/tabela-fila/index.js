import { useNavigate } from 'react-router-dom';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';

const TabelaFila = () => {
    const navegacao = useNavigate();

    return (
        <>
            <div>
                <a onClick={() => navegacao("/filas/novo")} className="p-button font-bold">Nova fila</a>
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

export default  TabelaFila