import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import CadastroEtapa from '../../etapa/cadastro-etapa';

import React, { useState } from "react";

const TabelaOcorrencia = () => {
    const [visible, setVisible] = useState(false);

    const produtos = [
        {nome: "teste"}
    ]
    
    const botoes = () => {
        return  (
            <>
                <Button label="+" onClick={() => setVisible(true)}/>
            </>
        )
    }
    
    return (
        <>
            <DataTable value={produtos}  tableStyle={{ minWidth: '50rem' }}>
                <Column field="nome" header="Nome"></Column>    
                <Column field="acoes" header="Ações" body={botoes}></Column>
            </DataTable>
            <Dialog visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} >
                <CadastroEtapa />
            </Dialog>
        </>
    )
}

export default TabelaOcorrencia