import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';

import CadastroOcorrencia from '../../ocorrencia/cadastro-ocorrencia';

const CadastroTipoOcorencia = () => {
    return (
        <>
            <div>
                <Button label="Salvar" severity="success" />
                <a href="/tipos-ocorrencia" className="p-button p-button-warning font-bold">Cancelar</a>
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
                    <label htmlFor="setor">Setor</label>
                </div>
                <div>
                    <Dropdown placeholder="Selecione" options={[]} className="w-full md:w-14rem" />
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

            {/* só deve aparecer quando cadastrar o tipo de ocorrêrncia */}
            <CadastroOcorrencia />
        </>
    )
}

export default CadastroTipoOcorencia
