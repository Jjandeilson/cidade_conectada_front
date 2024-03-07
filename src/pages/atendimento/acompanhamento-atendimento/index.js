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
import { Toast } from 'primereact/toast';

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

    const {codigo} = useParams();
    const navegacao = useNavigate();
    const [cliente, setCliente] = useState(Cliente);
    const [endereco, setEndereco] = useState(Endereco);
    const [atendimento, setAtendimento] = useState(Atendimento);
    const [canaisAtendimento, setCanaisAntendimento] = useState([]);
    const [tiposOcorrencia, setTiposOcorrencia] = useState([]);
    const [ocorrencias, setOcorrencias] = useState([]);
    const [etapas, setEtapas] = useState([]);

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
                    .then(response => setEtapas(response.data))
                    .catch(response => console.log(response));
            })
            .catch(response => console.log(response));
    }

    function finalizarEtapa(codigoEtapa) {
        AtendimentoService.finalizarEtapa(codigo, codigoEtapa)
            .then(() => {
                AtendimentoService.buscarEtapasAtendimento(codigo)
                .then(response => setEtapas(response.data))
                .catch(response => console.log(response));
            })
            .catch(response => console.log(response));
    }
 
    function botoes(etapa) {
        return (
            <>
                {podeIniciarEtapa(etapa) && (
                    <div>
                        <Button icon="pi pi-play" onClick={() => iniciarEtapa(etapa.codigo)}/>
                    </div>
                )}

                {(etapa.inicio && !etapa.fim) && (
                     <div>
                        <Button icon="pi pi-power-off" onClick={() => finalizarEtapa(etapa.codigo)}/>
                    </div>
                )}
            </>
        )
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
                setAtendimento(response.data);
                OcorrenciaService.listar(response.data.tipoOcorrencia.codigo)
                    .then(response => setOcorrencias(response.data))
                    .catch(response => console.log(response));
            })
            .catch(response => console.log(response));

        AtendimentoService.buscarEtapasAtendimento(codigo)
            .then(response => setEtapas(response.data))
            .catch(response => console.log(response));    
        
}, [codigo]);

    return (
        <>
             <div>
                <a onClick={() => navegacao("/atendimentos")} className="p-button p-button-warning font-bold">Voltar</a>
            </div>

             <TabView>
                <TabPanel header="Dados do cliente">
                    <div>
                        <div>
                            <div>
                                <label htmlFor="nome">Nome</label>
                            </div>
                            <div>
                                <InputText name="nome" value={cliente.nome} disabled="true" />
                            </div>
                        </div>

                        <div>
                            <div>
                                <label htmlFor="cpf">CPF</label>
                            </div>
                            <div>
                                <InputMask name="cpf" value={cliente.cpf} mask="999.999.999-99" unmask={true} disabled="true" />
                            </div>
                        </div>

                        <div>
                            <div>
                                <label htmlFor="email">E-mail</label>
                            </div>
                            <div>
                                <InputText name="email" value={cliente?.email} disabled="true" />
                            </div>
                        </div>

                        <div>
                            <div>
                                <label htmlFor="telefone">Telefone</label>
                            </div>
                            <div>
                                <InputMask name="telefone" value={cliente.telefone} mask="(99) 99999-9999" unmask={true} disabled="true" />
                            </div>
                        </div>
                    
                        <div>
                            <div>
                                <label htmlFor="celular">Celular</label>
                            </div>
                            <div>
                                <InputMask name="celular" value={cliente.celular} mask="(99) 99999-9999" unmask={true} disabled="true" />
                            </div>
                        </div>

                        <div>
                            <div>
                                <label htmlFor="datanascimento">Data de nascimento</label>
                            </div>
                            <div>
                                <Calendar name="dataNascimento" value={cliente.dataNascimento} dateFormat="dd/mm/yy" disabled="true" showIcon />
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <label htmlFor="logradouro">Logradouro</label>
                                </div>
                                <div>
                                    <InputText name="logradouro" value={endereco.logradouro} disabled="true" />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="numero">Número</label>
                                </div>
                                <div>
                                    <InputText name="numero" value={endereco.numero} disabled="true" />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="bairro">Bairro</label>
                                </div>
                                <div>
                                    <InputText name="bairro" value={endereco.bairro} disabled="true" />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="cep">CEP</label>
                                </div>
                                <div>
                                    <InputMask name="cep" value={endereco.cep} mask="99.999-999" unmask={true} disabled="true" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>
                                <label htmlFor="observacao">Observação</label>
                            </div>
                            <div>
                                <InputTextarea name="observacao" rows={5} cols={30} value={cliente.observacao} disabled="true" />
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="Dados do atendimento">
                <div>
                        <div>
                            <div>
                                <label htmlFor="canalAtendimento">Canal de atendimento</label>
                            </div>
                            <div>
                                <Dropdown name="canalAtendimento" placeholder="Selecione" options={canaisAtendimento} optionLabel="nome"
                                   value={atendimento.canalAtendimento} disabled  />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="tipoOcorrencia">Tipo de ocorrência</label>
                            </div>
                            <div>
                                <Dropdown name="tipoOcorrencia" placeholder="Selecione" options={tiposOcorrencia}  optionLabel="nome" 
                                    value={atendimento.tipoOcorrencia} disabled />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="ocorrencia">Ocorrência</label>
                            </div>
                            <div>
                                <Dropdown name="ocorrencia" placeholder="Selecione" options={ocorrencias} optionLabel="nome"
                                    value={atendimento.ocorrencia} disabled />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="descricao">Descrição</label>
                            </div>
                            <div>
                                <InputTextarea name="descricao" rows={5} cols={30} value={atendimento.descricao} disabled />
                            </div>
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
                </TabPanel>
             </TabView>
        </>
    )
}

export default AcompanhamentoAtendimento