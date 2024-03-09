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
import Endereco from '../../../dto/endereco';
import Cliente from '../../../dto/cliente';
import Fila from '../../../dto/fila';
import MensagemNotificacao from '../../../dto/mensagem-notificacao';
import Atendimento from '../../../dto/atendimento';

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
            
        AtendimentoService.salvar(atendimento)
            .then(() => {
                show('Operação realizada com sucesso', 'success', 'Success');
                setEndereco(Endereco);
                setCliente(Cliente);
                setAtendimento(Atendimento);
            })
            .catch(response => (show(response.response.data.detail, 'error', 'Error')));
    }

    function logarFila(fila) {
        UsuarioService.loginFila(codigoUsuario, fila.value.codigo)
            .then(() => {
                setDesativarSelectFila(true);
                setFila(fila.target.value);
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
        if (midia == 'EMAIL') {
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
        console.log(codigoUsuario);
        
        CanalAtendimentoService.listaTodosCanais()
            .then(response =>  setCanaisAntendimento(response.data))
            .catch(response => console.log(response));
       
        TipoOcorrenciaService.listaTodosTiposOcorrencias()
            .then(response =>  setTiposOcorrencia(response.data))
            .catch(response => console.log(response));

        UsuarioService.listarFilasUsuario(codigoUsuario)
            .then(response => setFilas(response.data))
            .catch(response => console.log(response));

        atendimento.protocolo = '202401141';
    }, [])

    return (
        <>
            <div>
                <Toolbar start={botaologout} center={botoesAtendimento} end={botoesFila} />
            </div>    

            {/* chat do atendente */}
            <div className="card">
                <ScrollPanel style={{ width: '100%', height: '200px' }}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                        enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui 
                        ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                    </p>
                    <p className="m-0">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti 
                        quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                        culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. 
                        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                </ScrollPanel>

                <div className="p-inputgroup">
                    <InputText name="mensagemAgente" />
                    <Button label="Enviar" className="p-button-success" />
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