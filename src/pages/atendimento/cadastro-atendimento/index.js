import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Panel } from 'primereact/panel';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';

import * as moment from 'moment-timezone';

import '../cadastro-atendimento/index.css'

import CanalAtendimentoService from '../../../service/canalAtendimentoService';
import TipoOcorrenciaService from '../../../service/tipoOcorrenciaService';
import OcorrenciaService from '../../../service/ocorrenciaService';
import ClienteService from '../../../service/clienteService';
import AtendimentoService from '../../../service/atendimentoService';
import Endereco from '../../../dto/endereco';
import Cliente from '../../../dto/cliente';
import Atendimento from '../../../dto/atendimento';

const CadastroAtendimento = (visible) => {
    const toast = useRef(null);
    const navegacao = useNavigate();
    const [canaisAtendimento, setCanaisAntendimento] = useState([]);
    const [tiposOcorrencia, setTiposOcorrencia] = useState([]);
    const [ocorrencias, setOcorrencias] = useState([]);
    const [endereco, setEndereco] = useState(Endereco);
    const [cliente, setCliente] = useState(Cliente);
    const [atendimento, setAtendimento] = useState(Atendimento);

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
                setEndereco(response.data.endereco);
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
            })
            .catch(response => (show(response.response.data.detail, 'error', 'Error')));
    }

    useEffect(() => {
        CanalAtendimentoService.listaTodosCanais()
            .then(response =>  setCanaisAntendimento(response.data))
            .catch(response => console.log(response));
       
        TipoOcorrenciaService.listaTodosTiposOcorrencias()
            .then(response =>  setTiposOcorrencia(response.data))
            .catch(response => console.log(response));

    }, [])


    return (
        <>
            <Dialog visible={visible} onHide={() => navegacao("/atendimentos")} >
                <h1>Cadastrar Atendimento</h1>
                <div className="cadastro-form-atendimentos">
                    <Panel header="Informações do cliente" >
                        <div className="panel-cliente">
                            <div className="form-field">
                                <label htmlFor="nome" className="form-label">Nome:</label>
                                <InputText name="nome" value={cliente.nome} onChange={atualizarValoresCliente} className="form-input" />
                            </div>

                            <div className="form-field">
                                <label htmlFor="cpf" className="form-label">CPF:</label>
                                <div className="p-inputgroup">
                                    <InputMask name="cpf" mask="999.999.999-99" unmask={true} value={cliente.cpf} onChange={atualizarValoresCliente} />
                                    <Button icon="pi pi-search" className="p-button-warning" onClick={buscarClientePorCpf} />
                                </div>
                            </div>

                            <div className="form-field">
                                <label htmlFor="email" className="form-label">E-mail:</label>
                                <InputText name="email" value={cliente.email} onChange={atualizarValoresCliente} className="form-input" />
                            </div>

                            <div className="form-field">
                                <label htmlFor="telefone" className="form-label">Telefone:</label>
                                <InputMask name="telefone" mask="(99) 99999-9999" unmask={true} value={cliente.telefone} onChange={atualizarValoresCliente} className="form-input" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="celular" className="form-label">Celular:</label>
                                <InputMask name="celular" mask="(99) 99999-9999" unmask={true} value={cliente.celular} onChange={atualizarValoresCliente} className="form-input" />
                            </div>

                            <div className="form-field">
                                <label htmlFor="datanascimento" className="form-label">Data de nascimento:</label>
                                <Calendar name="dataNascimento" dateFormat="dd/mm/yy" showIcon value={cliente.dataNascimento} onChange={atualizarValoresCliente} />
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

                            <div className="form-field">
                                <label htmlFor="cep" className="form-label">CEP:</label>
                                <InputMask name="cep" mask="99.999-999" unmask={true} value={endereco.cep} onChange={atualizarValoresEndereco} className="form-input" />
                            </div>

                            <div className="form-field">
                                <label htmlFor="observacao" className="form-label">Observação:</label>
                                <InputTextarea name="observacao" rows={5} value={cliente.observacao} onChange={atualizarValoresCliente} className="form-textarea" autoResize />
                            </div>

                        </div>
                    </Panel>

                    <Panel header="Informações do atendimento" >
                        <div className="panel-atendimento">
                            <div className="form-field">
                                <label htmlFor="canalAtendimento">Canal de atendimento: </label>
                                <Dropdown name="canalAtendimento" placeholder="Selecione" options={canaisAtendimento} optionLabel="nome"
                                    value={atendimento.canalAtendimento} onChange={atualizarValoresAtendimento} />
                            </div>

                            <div className="form-field">
                                <label htmlFor="tipoOcorrencia">Tipo de ocorrência: </label>
                                <Dropdown name="tipoOcorrencia" placeholder="Selecione" options={tiposOcorrencia} optionLabel="nome"
                                    value={atendimento.tipoOcorrencia} onChange={atualizarSelectOcorrencia} />
                            </div>


                            <div className="form-field">
                                <label htmlFor="ocorrencia">Ocorrência: </label>
                                <Dropdown name="ocorrencia" placeholder="Selecione" options={ocorrencias} optionLabel="nome"
                                    value={atendimento.ocorrencia} onChange={atualizarValoresAtendimento} />
                            </div>

                            <div className="form-field">
                                <label htmlFor="descricao" className="form-label">Descrição</label>
                                <InputTextarea name="descricao" rows={5} cols={30} value={atendimento.descricao} onChange={atualizarValoresAtendimento} className="form-textarea" />
                            </div>
                            <div className="form-actions">
                                <Button label="Cancelar" className="cancel-button" onClick={() => navegacao("/atendimentos")} />
                                <Button label="Salvar" className="submit-button" onClick={salvar} />
                            </div>

                        </div>

                    </Panel>











                </div>
                <Toast ref={toast} />
            </Dialog>
        </>
    )
}

export default CadastroAtendimento