import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';

import SetorService from '../../../service/setorService';
import Setor from '../../../dto/setor';

const CadastroSetor = (visible) => {
    const navegacao = useNavigate();
    const toast = useRef(null);
    const { codigo } = useParams();
    const [setor, setSetor] = useState(Setor);

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    function atualizarValores(envet) {
        const { name, value } = envet.target
        setSetor({ ...setor, [name]: value });
    }

    function salvar() {
        if (setor.codigo === '') {
            SetorService.salvar(setor)
                .then(response => {
                    show('Cadastro realizado com sucesso', 'success', 'Success');
                    setTimeout(() => {
                        navegacao('/setores');
                    }, 500);
                })
                .catch(response => (show(response.response.data.fields[0].message, 'error', 'Error')));
        } else {
            SetorService.atualizar(setor.codigo, setor)
                .then(response => {
                    show('Atualização realizada com sucesso', 'success', 'Success');
                    setTimeout(() => {
                        navegacao('/setores');
                    }, 500);
                })
                .catch(response => (show(response.response.data.fields[0].message, 'error', 'Error')));
        }
    }
    
    useEffect(() => {
        if (codigo !== undefined) {
            document.title = "Editar setor";
            SetorService.buscar(codigo)
                .then(response => setSetor(response.data))
                .catch(response => console.log(response));
        } else {
            document.title = 'Cadastrar setor';
        }

    }, [codigo])

    return (
        <>
            <Dialog visible={visible} onHide={() => navegacao("/setores")} >
                <div className="cadastro-form">
                    <h1>Cadastrar Setor</h1>
                    <div className="form-field">
                        <label htmlFor="nome" className="form-label">Nome:</label>
                        <InputText name="nome" value={setor.nome} onChange={atualizarValores} className="form-input" />
                    </div>

                    <div className="form-field">
                        <label htmlFor="descricao" className="form-label">Descrição:</label>
                        <InputTextarea name="descricao" value={setor?.descricao} onChange={atualizarValores} rows={5} className="form-textarea" autoResize />
                    </div>

                    <div className="form-actions">
                        <Button label="Cancelar" className="cancel-button" onClick={() => navegacao("/setores")} />
                        <Button label="Salvar" className="submit-button" onClick={salvar} />
                    </div>
                </div>
                <Toast ref={toast} />
            </Dialog>

        </>
    )
}

export default CadastroSetor