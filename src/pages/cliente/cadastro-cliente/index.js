import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';

import * as moment from 'moment-timezone';

import ClienteService from '../../../service/clienteService';
import Cliente from '../../../dto/cliente';
import Endereco from '../../../dto/endereco';

const CadastroCliente = (visible) => {
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

            <Dialog visible={visible} onHide={() => navegacao("/clientes")} >
                <div className='cadastro-form-user'>
                    <h1>Cadastrar Cliente</h1>
                    <div className="form-field">
                        <label htmlFor="nome" className="form-label">Nome:</label>
                        <InputText name="nome" value={cliente.nome} onChange={atualizarValores} className="form-input" />
                    </div>

                    <div className="form-field">
                        <label htmlFor="email" className="form-label">E-mail:</label>
                        <InputText name="email" value={cliente?.email} onChange={atualizarValores} className="form-input" />
                    </div>

                    <div className="form-field">
                        <label htmlFor="cpf" className="form-label">CPF:</label>
                        <div>
                            <InputMask name="cpf" value={cliente.cpf} onChange={atualizarValores} mask="999.999.999-99" unmask={true} />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="telefone" className="form-label">Telefone:</label>
                        <div>
                            <InputMask name="telefone" value={cliente.telefone} onChange={atualizarValores} mask="(99) 99999-9999" unmask={true} />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="celular" className="form-label">Celular:</label>
                        <div>
                            <InputMask name="celular" value={cliente.celular} onChange={atualizarValores} mask="(99) 99999-9999" unmask={true} />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="datanascimento" className="form-label">Data de nascimento:</label>
                        <div>
                            <Calendar name="dataNascimento" value={cliente.dataNascimento} onChange={atualizarValores} dateFormat="dd/mm/yy" showIcon />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="cep" className="form-label">CEP:</label>
                        <div>
                            <InputMask name="cep" value={endereco.cep} onChange={atualizarValoresEndereco} mask="99.999-999" unmask={true} />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="logradouro" className="form-label">Logradouro:</label>
                        <InputText name="logradouro" value={endereco.logradouro} onChange={atualizarValoresEndereco} className="form-input" />
                    </div>

                    <div className="form-field">
                        <label htmlFor="numero" className="form-label">Número:</label>
                        <InputText name="numero" value={endereco.numero} onChange={atualizarValoresEndereco} className="form-input" />
                    </div>

                    <div className="form-field">
                        <label htmlFor="bairro" className="form-label">Bairro:</label>
                        <InputText name="bairro" value={endereco.bairro} onChange={atualizarValoresEndereco} className="form-input" />
                    </div>

                    <div lassName="form-field">
                        <label htmlFor="observacao" className="form-label">Observação:</label>
                        <InputTextarea name="observacao" rows={5} cols={30} value={cliente.observacao} onChange={atualizarValores} className="form-textarea" />
                    </div>

                    <div className="form-actions">
                        <Button label="Cancelar" className="cancel-button" onClick={() => navegacao("/clientes")} />
                        <Button label="Salvar" className="submit-button" onClick={salvar} />
                    </div>

                    <Toast ref={toast} />
                </div >
            </Dialog >
        </>
    )
}

export default CadastroCliente