import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Panel } from 'primereact/panel';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';

import * as moment from 'moment-timezone';

import CanalAtendimentoService from '../../../service/canalAtendimentoService';
import TipoOcorrenciaService from '../../../service/tipoOcorrenciaService';
import OcorrenciaService from '../../../service/ocorrenciaService';
import ClienteService from '../../../service/clienteService';
import AtendimentoService from '../../../service/atendimentoService';
import Endereco from '../../../dto/endereco';
import Cliente from '../../../dto/cliente';
import Atendimento from '../../../dto/atendimento';

const CadastroAtendimento = () => {
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
        const { name, value } = event.target;
        setAtendimento({ ...atendimento, [name]: value });
    }

    function atualizarValoresCliente(event) {
        const { name, value } = event.target;
        setCliente({ ...cliente, [name]: value });
    }

    function atualizarValoresEndereco(event) {
        const { name, value } = event.target;
        setEndereco({ ...endereco, [name]: value });
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
                navegacao("/atendimentos");
            })
            .catch(response => (show(response.response.data.detail, 'error', 'Error')));
    }

    useEffect(() => {
        CanalAtendimentoService.listaTodosCanais()
            .then(response => setCanaisAntendimento(response.data))
            .catch(response => console.log(response));

        TipoOcorrenciaService.listaTodosTiposOcorrencias()
            .then(response => setTiposOcorrencia(response.data))
            .catch(response => console.log(response));
    }, [])

    return (
        <>
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
                                <Dropdown name="tipoOcorrencia" placeholder="Selecione" options={tiposOcorrencia} optionLabel="nome"
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
                <div>
                    <Button label="Salvar" severity="success" onClick={salvar} />
                    <a onClick={() => navegacao("/atendimentos")} className="p-button p-button-warning font-bold">Cancelar</a>
                </div>
                <Toast ref={toast} />
            </div>
        </>
    )
}

export default CadastroAtendimento