import { useNavigate } from 'react-router-dom';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { InputTextarea } from 'primereact/inputtextarea';

const CadastroCliente = () => {
    const navegacao = useNavigate();

    return (
        <>
            <div>
                <Button label="Salvar" severity="success" />
                <a onClick={() => navegacao("/clientes")} className="p-button p-button-warning font-bold">Cancelar</a>
            </div>

            <div>
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
                        <label htmlFor="cpf">CPF</label>
                    </div>
                    <div>
                        <InputMask mask="999.999.999-99" placeholder="000.000.000-00" />
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
                        <label htmlFor="datanascimento">Data de nascimento</label>
                    </div>
                    <div>
                        <InputMask mask="99/99/9999" placeholder="29/02/2024" />
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div>
                        <label htmlFor="logradouro">Logradouro</label>
                    </div>
                    <div>
                        <InputText />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="numero">Número</label>
                    </div>
                    <div>
                        <InputText />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="bairro">Bairro</label>
                    </div>
                    <div>
                        <InputText />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="cep">CEP</label>
                    </div>
                    <div>
                        <InputMask mask="99.999-9999" placeholder="58.521-784" />
                    </div>
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
        </>
    )
}

export default CadastroCliente