import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

import TabelaOcorrencia from '../tabela-ocorrencia';

const CadastroOcorrencia = () => {
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

            {/* só deve aparecer quando quadastrar  */}
            <TabelaOcorrencia />
        </>
    )
}

export default CadastroOcorrencia