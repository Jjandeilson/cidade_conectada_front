import { useNavigate } from 'react-router-dom';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';

const TabelaTipoOcorrencia = () => {
    const navegacao = useNavigate();

    return (
        <>
            <div>
                <a onClick={() => navegacao("/tipos-ocorrencia/novo")} className="p-button font-bold">Novo tipo de ocorrência</a>
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