import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

import ClienteService from '../../../service/clienteService';

const Endereco = {
    logradouro: '',
    numero: '',
    bairro: '',
    cep: ''
}

const Cliente = {
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    celular: '',
    observacao: '',
    dataNascimento: new Date(),
    endereco: Endereco
}

const CadastroCliente = () => {
    const navegacao = useNavigate();
    const toast = useRef(null);
    const {codigo} = useParams();
    const [cliente, setCliente] = useState(Cliente);

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    function atualizarValores(envet) {
        const {name, value} = envet.target
        setCliente({...cliente,[name]: value});
    }

    function salvar() {
        if (cliente.codigo === '') {
            ClienteService.salvar(cliente)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success')
                    navegacao("/clientes")
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')))
            } else {
                ClienteService.atualizar(cliente.codigo, cliente)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success')
                    navegacao("/clientes")
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')))
        }
        
    }

    useEffect(() => {
        if (codigo !== undefined) {
            document.title = "Editar cliente";
            ClienteService.buscar(codigo)
                .then(response => setCliente(response.data))
        } else {
            document.title = 'Novo cliente';
        }
        console.log(cliente)
    }, [codigo])

    return (
        <>
            <div>
                <Button label="Salvar" severity="success" onClick={salvar} />
                <a onClick={() => navegacao("/clientes")} className="p-button p-button-warning font-bold">Cancelar</a>
            </div>

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
                        <InputMask name="cpf" value={cliente.cpf} onChange={atualizarValores} mask="999.999.999-99" />
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
                        <InputMask name="telefone" value={cliente.telefone} onChange={atualizarValores} mask="(99) 99999-9999" />
                    </div>
                </div>
            
                <div>
                    <div>
                        <label htmlFor="celular">Celular</label>
                    </div>
                    <div>
                        <InputMask name="celular" value={cliente.celular} onChange={atualizarValores} mask="(99) 99999-9999" />
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="datanascimento">Data de nascimento</label>
                    </div>
                    <div>
                        <InputMask name="dataNascimento" value={cliente.dataNascimento} onChange={atualizarValores} mask="99/99/9999" />
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div>
                        <label htmlFor="logradouro">Logradouro</label>
                    </div>
                    <div>
                        <InputText name="logradouro" value={cliente.endereco.logradouro} onChange={atualizarValores}/>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="numero">Número</label>
                    </div>
                    <div>
                        <InputText name="numero" value={cliente.endereco.numero} onChange={atualizarValores}/>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="bairro">Bairro</label>
                    </div>
                    <div>
                        <InputText name="bairro" value={cliente.endereco.bairro} onChange={atualizarValores}/>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="cep">CEP</label>
                    </div>
                    <div>
                        <InputMask name="cep" value={cliente.endereco.cep} onChange={atualizarValores} mask="99.999-999" />
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <label htmlFor="descricao">Descrição</label>
                </div>
                <div>
                    <InputTextarea name="descricao" rows={5} cols={30} />
                </div>
            </div>

            <Toast ref={toast} />
        </>
    )
}

export default CadastroCliente