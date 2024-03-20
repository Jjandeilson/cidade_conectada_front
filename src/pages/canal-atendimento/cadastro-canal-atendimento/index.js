import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';

import CanalAntendimentoService from '../../../service/canalAtendimentoService';
import CanalAtendimento from '../../../dto/canal-atendimento';

const icones = ["Whatsapp", "Chat", "Presencial"]

const CadastroCanalAtendimento = (visible) => {
    const navegacao = useNavigate();
    const toast = useRef(null);
    const { codigo } = useParams();
    const [canal, setCanal] = useState(CanalAtendimento);
    const canalAtendimentoService = CanalAntendimentoService;

    useEffect(() => {
        if (codigo !== undefined) {
            document.title = "Editar canal de atendimento";
            canalAtendimentoService.buscar(codigo)
                .then(response => setCanal(response.data))
                .catch(response => console.log(response));
        } else {
            document.title = 'Novo canal de atendimento';
        }

    }, [codigo])

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
                .then(response => {
                    show('Operação realizada com sucesso', 'success', 'Success');
                    navegacao(`/canais-atendimento/${response.data.codigo}/editar`);
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')));
        }  else {
            canalAtendimentoService.atualizar(canal.codigo, canal)
                .then(response => {
                    show('Operação realizada com sucesso', 'success', 'Success');
                    navegacao(`/canais-atendimento/${response.data.codigo}/editar`);
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')));
        }
    }

    return (
        <>
            <Dialog visible={visible} onHide={() => navegacao("/canais-atendimento")} >
                <div className="cadastro-form">
                    <h1>Cadastrar Canal</h1>
                    <div className="form-field">
                        <label htmlFor="nome" className="form-label">Nome:</label>
                        <InputText name="nome" value={canal.nome} onChange={atualizarValores} className="form-input" />
                    </div>

                    <div className="form-field">
                        <label htmlFor="nome" className="form-label">Ícone: </label>
                        <Dropdown options={icones} name="icone" value={canal?.icone} onChange={atualizarValores} placeholder="Selecione" />
                    </div>

                    <div className="form-field">
                        <label htmlFor="descricao" className="form-label">Descrição:</label>
                        <InputTextarea name="descricao" value={canal?.descricao} onChange={atualizarValores} rows={5} cols={30} className="form-textarea" autoResize />
                    </div>


                    <div className="form-actions">
                        <Button label="Cancelar" className="cancel-button" onClick={() => navegacao("/canais-atendimento")} />
                        <Button label="Salvar" className="submit-button" onClick={salvar} />
                    </div>
                </div>
                <Toast ref={toast} />
            </Dialog >
        </>
    )
}

export default CadastroCanalAtendimento