import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';

import CadastroUsuarioFila from '../cadastro-usuario-fila';

const optionsSelectButton = ['Ativo', 'Desativado']

const CadastroUsuario = () => {
    const navegacao = useNavigate();

    return (
        <>
            <div>
                <Button label="Salvar" severity="success" />
                <a onClick={() => navegacao("/usuarios")} className="p-button p-button-warning font-bold">Cancelar</a>
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
                    <label htmlFor="email">E-mail</label>
                </div>
                <div>
                    <InputText />
                </div>
            </div>
           
            <div>
                <div>
                    <label htmlFor="telefone">Telefone</label>
                </div>
                <div>
                    <InputMask mask="(99) 9999-999999" placeholder="(00) 00000-0000" />
                </div>
            </div>
           
            <div>
                <div>
                    <label htmlFor="celular">Celular</label>
                </div>
                <div>
                    <InputMask mask="(99) 9999-999999" placeholder="(00) 00000-0000" />
                </div>
            </div>

            <div>
                <div>
                    <label htmlFor="login">Login</label>
                </div>
                <div>
                    <InputText />
                </div>
            </div>

            <div>
                <div>
                    <label htmlFor="senha">Senha</label>
                </div>
                <div>
                <Password feedback={false}/>
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
            
            {/* só deve exibir quando cadastrar o uusuário */}
            <div>
                <div>
                    <label htmlFor="atendente">Atendente</label>
                </div>
                <div>
                    <SelectButton options={optionsSelectButton} />
                </div>
            </div>

            {/* quando for atendente deve exibir o cadastro de filas, caso tiver desativado não exibir */}
            <CadastroUsuarioFila />
        </>
    )
}

export default CadastroUsuario