import { useNavigate } from 'react-router-dom';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Panel } from 'primereact/panel';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';

const CadastroAtendimento = () => {
    const navegacao = useNavigate();

    return (
        <>
             <div>
                <Button label="Salvar" severity="success" />
                <a onClick={() => navegacao("/atendimentos")} className="p-button p-button-warning font-bold">Cancelar</a>
            </div>

            <div>
                <Panel header="Informações do cliente">
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
                </Panel>
                <Panel header="Informações do atendimento">
                    <div>
                        <div>
                            <div>
                                <label htmlFor="canal">Canal de atendimento</label>
                            </div>
                            <div>
                                <Dropdown placeholder="Selecione" options={[]} className="w-full md:w-14rem" />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="tipo">Tipo de ocorrência</label>
                            </div>
                            <div>
                                <Dropdown placeholder="Selecione" options={[]} className="w-full md:w-14rem" />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="ocorrencia">Ocorrência</label>
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
                    </div>
                </Panel>
            </div>
        </>
    )
}

export default CadastroAtendimento