import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Fieldset } from 'primereact/fieldset';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';

import '../../../index.css'

import * as moment from 'moment-timezone';

import Endereco from '../../../dto/endereco';
import Cliente from '../../../dto/cliente';
import Atendimento from '../../../dto/atendimento';
import CanalAntendimentoService from '../../../service/canalAtendimentoService';
import TipoOcorrenciaService from '../../../service/tipoOcorrenciaService';
import OcorrenciaService from '../../../service/ocorrenciaService';
import AtendimentoService from '../../../service/atendimentoService';

let numeroEtapaAtual = 1;
let etapaAtual = false;

const AcompanhamentoAtendimento = () => {
    document.title = 'Acompanhamento de atendimento';

    const { codigo } = useParams();
    const navegacao = useNavigate();
    const [cliente, setCliente] = useState(Cliente);
    const [endereco, setEndereco] = useState(Endereco);
    const [atendimento, setAtendimento] = useState(Atendimento);
    const [canaisAtendimento, setCanaisAntendimento] = useState([]);
    const [tiposOcorrencia, setTiposOcorrencia] = useState([]);
    const [ocorrencias, setOcorrencias] = useState([]);
    const [etapas, setEtapas] = useState([]);
    const [indexTab, setIndexTab] = useState(0);

    function podeIniciarEtapa(etapa) {
        let executarEtapa = true;

        if ((etapa.inicio != null && etapa.posicao == 1 || etapa.status !== 'PENDENTE') || (etapa.inicio == null && etapa.posicao > 1 && etapa.status !== 'PENDENTE' && etapaAtual)) {
            executarEtapa = false;
        }

        if (etapa.status == 'FINALIZADO') {
            etapaAtual = true;
        } else if (etapa.status == 'PENDENTE' && etapaAtual || (etapa.posicao == numeroEtapaAtual)) {
            etapaAtual = false;
            numeroEtapaAtual = etapa.posicao;
        }
        else {
            executarEtapa = false
        }

        return executarEtapa;
    }

    function iniciarEtapa(codigoEtapa) {
        AtendimentoService.iniciarEtapa(codigo, codigoEtapa)
            .then(() => {
                AtendimentoService.buscarEtapasAtendimento(codigo)
                    .then(response => {
                        let etapasBanco = response.data;

                        etapasBanco.forEach(etapa => {
                            if (etapa.inicio) {
                                etapa.inicio = moment(etapa.inicio).format("DD/MM/YYYY HH:mm:ss");
                            }

                            if (etapa.fim) {
                                etapa.fim = moment(etapa.fim).format("DD/MM/YYYY HH:mm:ss");
                            }
                        });

                        setEtapas(etapasBanco);
                    })
                    .catch(response => console.log(response));
            })
            .catch(response => console.log(response));
    }

    function finalizarEtapa(codigoEtapa) {
        AtendimentoService.finalizarEtapa(codigo, codigoEtapa)
            .then(() => {
                AtendimentoService.buscarEtapasAtendimento(codigo)
                    .then(response => {
                        let etapasBanco = response.data;

                        etapasBanco.forEach(etapa => {
                            if (etapa.inicio) {
                                etapa.inicio = moment(etapa.inicio).format("DD/MM/YYYY HH:mm:ss");
                            }

                            if (etapa.fim) {
                                etapa.fim = moment(etapa.fim).format("DD/MM/YYYY HH:mm:ss");
                            }
                        });

                        setEtapas(etapasBanco);
                    })
                    .catch(response => console.log(response));
            })
            .catch(response => console.log(response));
    }

    function botoes(etapa) {
        return (
            <>
                {podeIniciarEtapa(etapa) && (
                    <div>
                        <Button icon="pi pi-play" onClick={() => iniciarEtapa(etapa.codigo)} />
                    </div>
                )}

                {(etapa.inicio && !etapa.fim) && (
                    <div>
                        <Button icon="pi pi-power-off" onClick={() => finalizarEtapa(etapa.codigo)} />
                    </div>
                )}
            </>
        )
    }

    function alterarAba(index) {
        setIndexTab(index);

        if (index === 2) {
            AtendimentoService.buscarConversaChat(codigo)
                .then(response => {
                    let mensagens = response.data;
                    const chatMessage = document.getElementById('chatId');

                    mensagens.forEach(item => {
                        const divMensagem = document.createElement("div");

                        divMensagem.textContent = item.mensagem;
                        chatMessage.appendChild(divMensagem);

                    });
                })
                .catch(response => console.log(response));
        }
    }

    useEffect(() => {
        AtendimentoService.buscarClienteAtendimento(codigo)
            .then(response => {
                response.data.dataNascimento = moment(response.data.dataNascimento).add(1, "days").toDate();
                setCliente(response.data);
                setEndereco(response.data.endereco);
            })
            .catch(response => console.log(response));

        CanalAntendimentoService.listaTodosCanais()
            .then(response => setCanaisAntendimento(response.data))
            .catch(response => console.log(response));

        TipoOcorrenciaService.listaTodosTiposOcorrencias()
            .then(response => setTiposOcorrencia(response.data))
            .catch(response => console.log(response));

        AtendimentoService.buscar(codigo)
            .then(response => {
                let atendimentoBanco = response.data;

                atendimentoBanco.abertura = moment(atendimentoBanco.abertura).format("DD/MM/YYYY HH:mm:ss");

                if (atendimentoBanco.fechamento) {
                    atendimentoBanco.fechamento = moment(atendimentoBanco.fechamento).format("DD/MM/YYYY HH:mm:ss");
                }

                setAtendimento(atendimentoBanco);

                OcorrenciaService.listar(response.data.tipoOcorrencia.codigo)
                    .then(response => setOcorrencias(response.data))
                    .catch(response => console.log(response));
            })
            .catch(response => console.log(response));

        AtendimentoService.buscarEtapasAtendimento(codigo)
            .then(response => {
                let etapasBanco = response.data;

                etapasBanco.forEach(etapa => {
                    if (etapa.inicio) {
                        etapa.inicio = moment(etapa.inicio).format("DD/MM/YYYY HH:mm:ss");
                    }

                    if (etapa.fim) {
                        etapa.fim = moment(etapa.fim).format("DD/MM/YYYY HH:mm:ss");
                    }
                });

                setEtapas(etapasBanco);
            })
            .catch(response => console.log(response));

    }, [codigo]);

    return (
        <>
            <div className='acomp-atendimento-header'>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <a onClick={() => navegacao("/atendimentos")} className="p-button p-button-warning font-bold">Voltar</a>
                </div>
                <TabView activeIndex={indexTab} onTabChange={(e) => alterarAba(e.index)} className='tab-view-container' >

                    <TabPanel header="Dados do cliente" >
                        <div className='tabela-editar-um-dois'>
                            <div className='tab-um'>
                                <div className="form-field">
                                    <label htmlFor="nome" className="form-label">Nome:</label>
                                    <InputText name="nome" value={cliente.nome} disabled="true" />
                                </div>

                                <div className="form-field">
                                    <label htmlFor="cpf" className="form-label">CPF:</label>
                                    <InputMask name="cpf" value={cliente.cpf} mask="999.999.999-99" unmask={true} disabled="true" />
                                </div>

                                <div className="form-field">
                                    <label htmlFor="email" className="form-label">E-mail:</label>
                                    <InputText name="email" value={cliente?.email} disabled="true" />
                                </div>

                                <div className="form-field">
                                    <label htmlFor="telefone" className="form-label">Telefone:</label>
                                    <InputMask name="telefone" value={cliente.telefone} mask="(99) 99999-9999" unmask={true} disabled="true" />
                                </div>

                                <div className="form-field">
                                    <label htmlFor="celular" className="form-label">Celular:</label>
                                    <InputMask name="celular" value={cliente.celular} mask="(99) 99999-9999" unmask={true} disabled="true" />
                                </div>

                                <div className="form-field">
                                    <label htmlFor="datanascimento" className="form-label">Data de nascimento:</label>
                                    <Calendar style={{ width: '100%', height: '2.5em' }} name="dataNascimento" value={cliente.dataNascimento} dateFormat="dd/mm/yy" disabled="true" showIcon />
                                </div>
                            </div>
                            <div className='tab-dois'>
                                <div className="form-field">
                                    <label htmlFor="logradouro" className="form-label">Logradouro:</label>
                                    <InputText name="logradouro" value={endereco.logradouro} disabled="true" />
                                </div>

                                <div className="form-field">
                                    <label htmlFor="numero" className="form-label">Número:</label>
                                    <InputText name="numero" value={endereco.numero} disabled="true" />
                                </div>

                                <div className="form-field">
                                    <label htmlFor="bairro" className="form-label">Bairro:</label>
                                    <InputText name="bairro" value={endereco.bairro} disabled="true" className="form-input"  />
                                </div>

                                <div className="form-field">
                                    <label htmlFor="cep" className="form-label" >CEP:</label>
                                    <InputMask name="cep" value={endereco.cep} mask="99.999-999" unmask={true} disabled="true" />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="observacao" lassName="form-field">Observação:</label>
                                    <InputTextarea name="observacao" rows={5} cols={30} value={cliente.observacao} disabled="true" className="form-textarea" />
                                </div>
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel header="Dados do atendimento">
                        <div className='tab-view-container'>

                            <div>
                                <div className='span-atendimento'>
                                    <span><label>Data de abertura: {atendimento.abertura}</label></span> | <span><label>Data de finalização: {atendimento.fechamento}</label></span> | <span><label>Status: {atendimento.status}</label></span>
                                </div>
                            </div>

                            <div className='dados-atendimento-container'>
                                <div>
                                    <div className="form-field">
                                        <label htmlFor="canalAtendimento" className="form-label">Canal de atendimento: </label>
                                        <Dropdown name="canalAtendimento" placeholder="Selecione" options={canaisAtendimento} optionLabel="nome"
                                            value={atendimento.canalAtendimento} disabled />
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label htmlFor="tipoOcorrencia" className="form-label">Tipo de ocorrência:</label>
                                    <Dropdown name="tipoOcorrencia" placeholder="Selecione" options={tiposOcorrencia} optionLabel="nome"
                                        value={atendimento.tipoOcorrencia} disabled />
                                </div>
                            </div>

                            <div className="form-field">
                                <label htmlFor="ocorrencia" className="form-label">Ocorrência:</label>
                                <Dropdown name="ocorrencia" placeholder="Selecione" options={ocorrencias} optionLabel="nome"
                                    value={atendimento.ocorrencia} disabled />
                            </div>

                            <div>
                                <div className="form-field">
                                    <label htmlFor="descricao" className="form-label">Descrição:</label>
                                    <InputTextarea name="descricao" rows={5} cols={30} value={atendimento.descricao} disabled className="form-textarea"/>
                                </div>

                                <div>
                                    <Fieldset legend="Etapas do atendimento">
                                        <div className="card">
                                            <DataTable value={etapas}>
                                                <Column field="nome"></Column>
                                                <Column field="status"></Column>
                                                <Column field="inicio"></Column>
                                                <Column field="fim"></Column>
                                                <Column body={botoes}></Column>
                                            </DataTable>
                                        </div>
                                    </Fieldset>
                                </div>
                            </div>
                        </div>
                    </TabPanel >
                    <TabPanel header="Mensagens Chat"  >
                        <div className='tab-view-container'>
                            <ScrollPanel >
                                <div id="chatId"></div>
                            </ScrollPanel>
                        </div>
                    </TabPanel>
                </TabView >
            </div >
        </>
    )
}

export default AcompanhamentoAtendimento