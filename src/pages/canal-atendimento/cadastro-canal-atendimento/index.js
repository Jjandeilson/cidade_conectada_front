import { useNavigate } from 'react-router-dom';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';

const CadastroCanalAtendimento = () => {
    const navegacao = useNavigate();

    return (
        <>
            <div>
                <Button label="Salvar" severity="success" />
                <a onClick={() => navegacao("/canais-atendimento")} className="p-button p-button-warning font-bold">Cancelar</a>
            </div>

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
                    <label htmlFor="nome">Ícone</label>
                </div>
                <div>
                    <Dropdown options={[]} placeholder="Selecione" className="w-full md:w-14rem" />
                </div>
            </div>

            <div>
                <div>
                    <label htmlFor="nome">Descrição</label>
                </div>
                <div>
                <InputTextarea rows={5} cols={30} />
                </div>
            </div>
        </>
    )
}

export default CadastroCanalAtendimento