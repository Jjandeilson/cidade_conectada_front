import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';

import CadastroOcorrencia from '../../ocorrencia/cadastro-ocorrencia';
import TipoOcorrenciaService from '../../../service/tipoOcorrenciaService';
import SetorService from '../../../service/sertorService';

import TipoOcorrencia from '../../../dto/tipo-ocorrencia';

const CadastroTipoOcorencia = (visible) => {
    const navegacao = useNavigate();
    const toast = useRef(null);
    const { codigo } = useParams();
    const [tipoOcorrencia, setTipoOcorrencia] = useState(TipoOcorrencia);
    const [setores, setSetores] = useState([]);


    useEffect(() => {
        SetorService.listar()
            .then(response => setSetores(response.data.content))
            .catch(response => console.log(response));

        if (codigo !== undefined) {
            document.title = "Editar tipo de ocorrência";
            TipoOcorrenciaService.buscar(codigo)
                .then(response => {
                    setTipoOcorrencia(response.data);
                })
                .catch(response => console.log(response));

        } else {
            document.title = 'Novo tipo de ocorrência';
        }
    }, [codigo])


    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    function atualizarValores(envet) {
        const { name, value } = envet.target
        setTipoOcorrencia({ ...tipoOcorrencia, [name]: value });
    }

    function salvar() {
        if (tipoOcorrencia.codigo === '') {
            TipoOcorrenciaService.salvar(tipoOcorrencia)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success');
                    navegacao("/tipos-ocorrencia");
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')));
        } else {
            TipoOcorrenciaService.atualizar(tipoOcorrencia.codigo, tipoOcorrencia)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success');
                    navegacao("/tipos-ocorrencia");
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')));
        }
    }

    return (
        <>
            <Dialog visible={visible} onHide={() => navegacao("/tipos-ocorrencia")} >
                <div className="cadastro-form">
                    <h1>Cadastrar Tipos de ocorrência</h1>
                    <div className="form-field">
                        <label htmlFor="nome" className="form-label">Nome:</label>
                        <InputText name="nome" value={tipoOcorrencia.nome} onChange={atualizarValores} className="form-input" />
                    </div>

                    <div>

                        <label htmlFor="setor">Setor: </label>


                        <Dropdown options={setores} placeholder="Selecione" name="setor" value={tipoOcorrencia.setor} optionLabel="nome" onChange={atualizarValores} />

                    </div>

                    <div className="form-field">
                        <label htmlFor="descricao" className="form-label">Descrição:</label>
                        <InputTextarea name="descricao" value={tipoOcorrencia.descricao} onChange={atualizarValores} rows={5} className="form-textarea" autoResize />
                    </div>
                    {tipoOcorrencia.codigo && (
                        <CadastroOcorrencia />
                    )}
                    <div className="form-actions">
                        <Button label="Cancelar" className="cancel-button" onClick={() => navegacao("/tipos-ocorrencia")} />
                        <Button label="Salvar" className="submit-button" onClick={salvar} />
                    </div>
                    <Toast ref={toast} />
                </div>
            </Dialog>
        </>
    )
}

export default CadastroTipoOcorencia
