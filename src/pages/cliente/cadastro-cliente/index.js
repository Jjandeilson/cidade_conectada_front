import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';

import * as moment from 'moment-timezone';

import ClienteService from '../../../service/clienteService';
import Cliente from '../../../dto/cliente';
import Endereco from '../../../dto/endereco';

const CadastroCliente = () => {
    const navegacao = useNavigate();
    const toast = useRef(null);
    const { codigo } = useParams();
    const [endereco, setEndereco] = useState(Endereco);
    const [cliente, setCliente] = useState(Cliente);

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    function atualizarValores(event) {
        const { name, value } = event.target;
        setCliente({ ...cliente, [name]: value });
    }

    function atualizarValoresEndereco(event) {
        const { name, value } = event.target;
        setEndereco({ ...endereco, [name]: value });
    }

    function salvar() {
        if (cliente.codigo === '') {
            cliente.endereco = endereco;
            ClienteService.salvar(cliente)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success');
                    navegacao("/clientes");
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')));
        } else {
            cliente.endereco = endereco;
            ClienteService.atualizar(cliente.codigo, cliente)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success');
                    navegacao("/clientes");
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')));
        }
    }

    useEffect(() => {
        if (codigo !== undefined) {
            document.title = "Editar cliente";
            ClienteService.buscar(codigo)
                .then(response => {
                    response.data.dataNascimento = moment(response.data.dataNascimento).add(1, "days").toDate();
                    setCliente(response.data);
                    setEndereco(response.data.endereco);
                })
                .catch(response => console.log(response))
        } else {
            document.title = 'Novo cliente';
        }
    }, [codigo])

    return (
        <>
            <div>
                <div>
                    <div>
                        <label htmlFor="nome">Nome</label>
                    </div>
                    <div>
                        <InputText name="nome" value={cliente.nome} onChange={atualizarValores} />
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="cpf">CPF</label>
                    </div>
                    <div>
                        <InputMask name="cpf" value={cliente.cpf} onChange={atualizarValores} mask="999.999.999-99" unmask={true} />
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="email">E-mail</label>
                    </div>
                    <div>
                        <InputText name="email" value={cliente?.email} onChange={atualizarValores} />
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="telefone">Telefone</label>
                    </div>
                    <div>
                        <InputMask name="telefone" value={cliente.telefone} onChange={atualizarValores} mask="(99) 99999-9999" unmask={true} />
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="celular">Celular</label>
                    </div>
                    <div>
                        <InputMask name="celular" value={cliente.celular} onChange={atualizarValores} mask="(99) 99999-9999" unmask={true} />
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="datanascimento">Data de nascimento</label>
                    </div>
                    <div>
                        <Calendar name="dataNascimento" value={cliente.dataNascimento} onChange={atualizarValores} dateFormat="dd/mm/yy" showIcon />
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            <label htmlFor="logradouro">Logradouro</label>
                        </div>
                        <div>
                            <InputText name="logradouro" value={endereco.logradouro} onChange={atualizarValoresEndereco} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="numero">Número</label>
                        </div>
                        <div>
                            <InputText name="numero" value={endereco.numero} onChange={atualizarValoresEndereco} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="bairro">Bairro</label>
                        </div>
                        <div>
                            <InputText name="bairro" value={endereco.bairro} onChange={atualizarValoresEndereco} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="cep">CEP</label>
                        </div>
                        <div>
                            <InputMask name="cep" value={endereco.cep} onChange={atualizarValoresEndereco} mask="99.999-999" unmask={true} />
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="observacao">Observação</label>
                    </div>
                    <div>
                        <InputTextarea name="observacao" rows={5} cols={30} value={cliente.observacao} onChange={atualizarValores} />
                    </div>
                </div>
                <div>
                    <Button label="Salvar" severity="success" onClick={salvar} />
                    <a onClick={() => navegacao("/clientes")} className="p-button p-button-warning font-bold">Cancelar</a>
                </div>
            </div>

            <Toast ref={toast} />

        </>
    )
}

export default CadastroCliente