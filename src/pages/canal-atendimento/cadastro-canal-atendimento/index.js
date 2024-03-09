import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';

import CanalAntendimentoService from '../../../service/canalAtendimentoService';
import CanalAtendimento from '../../../dto/canal-atendimento';

const icones = ["Whatsapp", "Chat", "Presencial"]

const CadastroCanalAtendimento = () => {
    const navegacao = useNavigate();
    const toast = useRef(null);
    const { codigo } = useParams();
    const [canal, setCanal] = useState(CanalAtendimento);
    const canalAtendimentoService = CanalAntendimentoService;

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    }

    function atualizarValores(envet) {
        const { name, value } = envet.target;
        setCanal({ ...canal, [name]: value });
    }

    function salvar() {
        if (canal.codigo === '') {
            canalAtendimentoService.salvar(canal)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success');
                    navegacao("/canais-atendimento");
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')));
        } else {
            canalAtendimentoService.atualizar(canal.codigo, canal)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success');
                    navegacao("/canais-atendimento");
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')));
        }

    }

    useEffect(() => {
        if (codigo !== undefined) {
            document.title = "Editar canal de atendimento";
            canalAtendimentoService.buscar(codigo)
                .then(response => setCanal(response.data))
                .catch(response => console.log(response));
        } else {
            document.title = 'Novo canal de atendimento';
        }

    }, [])

    return (
        <>
            <div className="formcanalatendimento" style={{ display: 'flex', flexDirection: 'column' }} >

                <div>
                    <div>
                        <label htmlFor="nome">Nome</label>
                    </div>
                    <div>
                        <InputText name="nome" value={canal.nome} onChange={atualizarValores} />
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="nome">Ícone</label>
                    </div>
                    <div>
                        <Dropdown options={icones} name="icone" value={canal?.icone} onChange={atualizarValores} placeholder="Selecione" className="w-full md:w-14rem" />
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="nome">Descrição</label>
                    </div>
                    <div>
                        <InputTextarea name="descricao" value={canal?.descricao} onChange={atualizarValores} rows={5} cols={30} />
                    </div>
                </div>
                <div>
                    <Button label="Salvar" severity="success" onClick={salvar} />
                    <a onClick={() => navegacao("/canais-atendimento")} className="p-button p-button-warning font-bold">Cancelar</a>
                </div>

                <Toast ref={toast} />
            </div>
        </>
    )
}

export default CadastroCanalAtendimento