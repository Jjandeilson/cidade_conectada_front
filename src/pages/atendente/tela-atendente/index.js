import { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Panel } from 'primereact/panel';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Toolbar } from 'primereact/toolbar';
import { SplitButton } from 'primereact/splitbutton';
import { Toast } from 'primereact/toast';

import CodigoUsuarioContext from '../../../context/CodigoUsuarioContext';

import CanalAtendimentoService from '../../../service/canalAtendimentoService';
import TipoOcorrenciaService from '../../../service/tipoOcorrenciaService';
import OcorrenciaService from '../../../service/ocorrenciaService';
import ClienteService from '../../../service/clienteService';
import AtendimentoService from '../../../service/atendimentoService';
import UsuarioService from '../../../service/usuarioService';
import EnviarNotificacaoService from '../../../service/enviarNotificacaoService';
import WebSocket from '../../../service/websocket';
import Endereco from '../../../dto/endereco';
import Cliente from '../../../dto/cliente';
import Fila from '../../../dto/fila';
import MensagemNotificacao from '../../../dto/mensagem-notificacao';
import Atendimento from '../../../dto/atendimento';
import MensagemChat from '../../../dto/mensagem-chat';

import * as moment from 'moment-timezone';

const TelaAtendente = () => {
    const toast = useRef(null);
    const navegacao = useNavigate();
    const [canaisAtendimento, setCanaisAntendimento] = useState([]);
    const [tiposOcorrencia, setTiposOcorrencia] = useState([]);
    const [ocorrencias, setOcorrencias] = useState([]);
    const [fila, setFila] = useState(Fila)
    const [filas, setFilas] = useState([]);
    const [endereco, setEndereco] = useState(Endereco);
    const [cliente, setCliente] = useState(Cliente);
    const [atendimento, setAtendimento] = useState(Atendimento);
    const [mensagemNotificacao, setMensagemNotificacao] = useState(MensagemNotificacao);
    const [desativarSelectFila, setDesativarSelectFila] = useState(false);
    const {codigoUsuario, setCodigoUsuario} = useContext(CodigoUsuarioContext);
    const [protocoloCliente, setProtocoloCliente] = useState('');
    const [mensagemChat, setMensagemChat] = useState(MensagemChat);
    const [textoChat, setTextoChat] = useState('');
    const [client, setClient] = useState({}); 

    const items = [
        {
            label: 'E-mail',
            icon: 'pi pi-file',
            command: () => {notificar('EMAIL')}
        },
        {
            label: 'Whatsapp',
            icon: 'pi pi-whatsapp',
            command: () => {notificar('WHATSAPP')}
        },
        {
            label: 'SMS',
            icon: 'pi pi-comment',
            command: () => {notificar('SMS')}
        }
    ];

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };
    
    function atualizarValores(event) {
        const {value} = event.target;
        setTextoChat(value);
    }

    function atualizarValoresAtendimento(event) {
        const {name, value} = event.target;
        setAtendimento({...atendimento,[name]: value});
    }
   
    function atualizarValoresCliente(event) {
        const {name, value} = event.target;
        setCliente({...cliente,[name]: value});
    }
    
    function atualizarValoresEndereco(event) {
        const {name, value} = event.target;
        setEndereco({...endereco,[name]: value});
    }

    function buscarClientePorCpf() {
        ClienteService.buscarPorCpf(cliente.cpf)
            .then(response => {
                response.data.dataNascimento = moment(response.data.dataNascimento).add(1, "days").toDate();
                setCliente(response.data);
                setEndereco(response.data.endereco)
            })
            .catch(response => console.log(response));
    }

    function atualizarSelectOcorrencia(tipoOcorrencia) {
        OcorrenciaService.listar(tipoOcorrencia.target.value.codigo)
            .then(response => {
                setOcorrencias(response.data);
                atualizarValoresAtendimento(tipoOcorrencia);
            })
            .catch(response => console.log(response));
    }

    function salvar() {
        cliente.endereco = endereco;
        atendimento.cliente = cliente;
        atendimento.protocolo = protocoloCliente;
            
        AtendimentoService.salvar(atendimento)
            .then(() => {
                show('Operação realizada com sucesso', 'success', 'Success');
                setEndereco(Endereco);
                setCliente(Cliente);
                setAtendimento(Atendimento);
                document.getElementById('chatId').innerText = "";
                enviarMensagemFinalizacao();
            })
            .catch(response => (show(response.response.data.detail, 'error', 'Error')));
    }

    function escreverFila() {
        client.subscribe("/chat/cliente", function(result) {
            let mensagemCliente = JSON.parse(result.body);

            if (!mensagemCliente.finalizado) {
                setProtocoloCliente(mensagemCliente.protocolo);
                const chatMessage = document.getElementById('chatId');
                const divMensagem = document.createElement("div");
    
                divMensagem.textContent = mensagemCliente.mensagem;
                chatMessage.appendChild(divMensagem);
            }
        })
    }

    function logarFila(fila) {
        UsuarioService.loginFila(codigoUsuario, fila.value.codigo)
            .then(() => {
                setDesativarSelectFila(true);
                setFila(fila.target.value);
                escreverFila();
            })
            .catch(response => console.log(response));
    }

    function logoutFila() {
        UsuarioService.logoutFila(codigoUsuario)
            .then(() => {
                setDesativarSelectFila(false);
                setFila(Fila);
            })
            .catch(response => console.log(response));
    }

    function notificar(midia) {
        if (midia === 'EMAIL') {
            mensagemNotificacao.to = cliente.email;
        } else {
            mensagemNotificacao.to = "55" + cliente.celular;
        }

        mensagemNotificacao.nome = cliente.nome;
        mensagemNotificacao.channel = midia;
        mensagemNotificacao.content.text = atendimento.protocolo;

        EnviarNotificacaoService.enviar(mensagemNotificacao)
            .then(() => {
                setMensagemNotificacao(MensagemNotificacao);
            })
            .catch(response => console.log(response));
    }

    function enviarMensagem() {
        mensagemChat.fluxo = 'SAIDA';
        mensagemChat.midia = 'CHAT';
        mensagemChat.envioMensagem = "ATENDENTE";
        mensagemChat.protocolo = protocoloCliente;
        mensagemChat.mensagem = 'Atendente: ' + textoChat;

        client.send("/app/chat", {}, JSON.stringify({
            ...mensagemChat
        }));

        setTextoChat('');
        setMensagemChat(MensagemChat);
    }

    function enviarMensagemFinalizacao() {
        mensagemChat.fluxo = 'SAIDA';
        mensagemChat.midia = 'CHAT';
        mensagemChat.envioMensagem = "ATENDENTE";
        mensagemChat.protocolo = protocoloCliente;
        mensagemChat.mensagem = 'Atendimento finalizado';
        mensagemChat.finalizado = true;

        client.send("/app/chat", {}, JSON.stringify({
            ...mensagemChat
        }));
    }

    const botaologout = (
        <>
            <a onClick={() => navegacao("/login")} className="p-button font-bold">Logout</a>
        </>
    )

    const botoesAtendimento = (
        <>
            <Button className="mr-2" label="Salvar" onClick={salvar} />
            <SplitButton className="mr-2" label="Enviar protocolo para o cliente" icon="pi pi-send" model={items}></SplitButton>
        </>
    )

    const botoesFila = (
        <>
            {filas.length > 0 && (
                <>
                    <Dropdown disabled={desativarSelectFila} name="fila" placeholder="Selecione a fila" value={fila} options={filas} optionLabel="nome" onChange={logarFila} />
                    <Button className="mr-2" label="Logout" disabled={!desativarSelectFila} onClick={logoutFila} />
                </>
            )}
        </>
    )

    useEffect(() => {
        CanalAtendimentoService.listaTodosCanais()
            .then(response =>  setCanaisAntendimento(response.data))
            .catch(response => console.log(response));
       
        TipoOcorrenciaService.listaTodosTiposOcorrencias()
            .then(response =>  setTiposOcorrencia(response.data))
            .catch(response => console.log(response));

        UsuarioService.listarFilasUsuario(codigoUsuario)
            .then(response => setFilas(response.data))
            .catch(response => console.log(response));

        WebSocket.login()
            .then(response => {
                setClient(response);
            })
            .catch(response => {
                console.log(response);
            });
    }, [])

    return (
        <>
            <div>
                <Toolbar start={botaologout} center={botoesAtendimento} end={botoesFila} />
            </div>    

            {/* chat do atendente */}
            <div className="card">
                <ScrollPanel style={{ width: '100%', height: '200px' }}>
                    <div id="chatId"></div>
                </ScrollPanel>

                <div className="p-inputgroup">
                    <InputText name="textoChat" value={textoChat} onChange={atualizarValores} />
                    <Button label="Enviar" className="p-button-success" onClick={enviarMensagem} />
                </div>
            </div>

            {/* cadastro de cliente e atendimento */}
            <div>
                <Panel header="Informações do cliente">
                    <div>
                        <div>
                            <div>
                                <label htmlFor="nome">Nome</label>
                            </div>
                            <div>
                                <InputText name="nome" value={cliente.nome} onChange={atualizarValoresCliente} />
                            </div>
                        </div>

                        <div>
                            <div>
                                <label htmlFor="cpf">CPF</label>
                            </div>
                            <div className="p-inputgroup">
                                <InputMask name="cpf" mask="999.999.999-99" unmask={true} value={cliente.cpf} onChange={atualizarValoresCliente} />
                                <Button icon="pi pi-search" className="p-button-warning" onClick={buscarClientePorCpf} />
                            </div>
                        </div>

                        <div>
                            <div>
                                <label htmlFor="email">E-mail</label>
                            </div>
                            <div>
                                <InputText name="email" value={cliente.email} onChange={atualizarValoresCliente} />
                            </div>
                        </div>

                        <div>
                            <div>
                                <label htmlFor="telefone">Telefone</label>
                            </div>
                            <div>
                                <InputMask name="telefone" mask="(99) 99999-9999" unmask={true} value={cliente.telefone} onChange={atualizarValoresCliente} />
                            </div>
                        </div>
                        
                        <div>
                            <div>
                                <label htmlFor="celular">Celular</label>
                            </div>
                            <div>
                                <InputMask name="celular" mask="(99) 99999-9999" unmask={true} value={cliente.celular} onChange={atualizarValoresCliente} />
                            </div>
                        </div>

                        <div>
                            <div>
                                <label htmlFor="datanascimento">Data de nascimento</label>
                            </div>
                            <div>
                                <Calendar name="dataNascimento" dateFormat="dd/mm/yy" showIcon value={cliente.dataNascimento} onChange={atualizarValoresCliente} />
                            </div>
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
                                <InputMask name="cep" mask="99.999-999" unmask={true} value={endereco.cep} onChange={atualizarValoresEndereco} />
                            </div>
                        </div>

                        <div>
                            <div>
                                <label htmlFor="observacao">Observação</label>
                            </div>
                            <div>
                                <InputTextarea name="observacao" rows={5} cols={30} value={cliente.observacao} onChange={atualizarValoresCliente} />
                            </div>
                        </div>
                    </div>
                </Panel>
                <Panel header="Informações do atendimento">
                    <div>
                        <div>
                            <div>
                                <label htmlFor="canalAtendimento">Canal de atendimento</label>
                            </div>
                            <div>
                                <Dropdown name="canalAtendimento" placeholder="Selecione" options={canaisAtendimento} optionLabel="nome"
                                   value={atendimento.canalAtendimento} onChange={atualizarValoresAtendimento} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="tipoOcorrencia">Tipo de ocorrência</label>
                            </div>
                            <div>
                                <Dropdown name="tipoOcorrencia" placeholder="Selecione" options={tiposOcorrencia}  optionLabel="nome" 
                                    value={atendimento.tipoOcorrencia} onChange={atualizarSelectOcorrencia} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="ocorrencia">Ocorrência</label>
                            </div>
                            <div>
                                <Dropdown name="ocorrencia" placeholder="Selecione" options={ocorrencias} optionLabel="nome"
                                    value={atendimento.ocorrencia} onChange={atualizarValoresAtendimento} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="descricao">Descrição</label>
                            </div>
                            <div>
                                <InputTextarea name="descricao" rows={5} cols={30} value={atendimento.descricao} onChange={atualizarValoresAtendimento} />
                            </div>
                        </div>
                    </div>
                </Panel>
            </div>

            <Toast ref={toast} />
        </>
    )
}

export default TelaAtendente