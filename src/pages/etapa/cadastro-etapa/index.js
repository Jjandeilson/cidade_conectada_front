import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

import TabelaEtapa from '../tabela-etapa';

const CadastroEtapa = () => {
    return (
        <>
            <div>
                <div>
                    <label htmlFor="nome">Nome</label>
                </div>
                <div>
                    <InputText />
                </div>
            </div>

            <div>
                <div>
                    <label htmlFor="descricao">Descrição</label>
                </div>
                <div>
                    <InputTextarea rows={5} cols={30} />
                </div>
            </div>

            <div>
                <Button label="Salvar" severity="success" />
            </div>

            <div>
                <TabelaEtapa />
            </div>
        </>
    )
}

export default CadastroEtapa