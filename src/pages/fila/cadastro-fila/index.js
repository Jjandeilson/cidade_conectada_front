import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';

import FilaService from '../../../service/filaService';
import Fila from '../../../dto/fila';

const CadastroFila = (visible) => {
    const navegacao = useNavigate();
    const toast = useRef(null);
    const { codigo } = useParams();
    const [fila, setFila] = useState(Fila);

    useEffect(() => {
        if (codigo !== undefined) {
            document.title = "Editar fila";
            FilaService.buscar(codigo)
                .then(response => setFila(response.data))
                .catch(response => console.log(response));
        } else {
            document.title = 'Novo fila';
        }

    }, [codigo])

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    function atualizarValores(envet) {
        const { name, value } = envet.target
        setFila({ ...fila, [name]: value });
    }

    function salvar() {
        if (fila.codigo === '') {
            FilaService.salvar(fila)
                .then(() => {
                    show('Cadastro realizado com sucesso', 'success', 'Success');
                    navegacao("/filas");
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')));
        } else {
            FilaService.atualizar(fila.codigo, fila)
                .then(() => {
                    show('Atualização realizada com sucesso', 'success', 'Success');
                    navegacao("/filas");
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')));
        }
    }

    return (
        <>

            <Dialog visible={visible} onHide={() => navegacao("/filas")} >
                <div className="cadastro-form">
                    <h1>Cadastrar Fila</h1>
                    <div className="form-field">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <InputText name="nome" value={fila.nome} onChange={atualizarValores} className="form-input" />
                    </div>

                    <div className="form-field">
                        <label htmlFor="descricao" className="form-label">Descrição</label>
                        <InputTextarea name="descricao" value={fila?.descricao} onChange={atualizarValores} rows={5} className="form-textarea" autoResize />
                    </div>

                    <div className="form-actions">
                        <Button label="Cancelar" className="cancel-button" onClick={() => navegacao("/filas")} />
                        <Button label="Salvar" className="submit-button" onClick={salvar} />
                    </div>
                </div>
                <Toast ref={toast} />
            </Dialog>
        </>
    )
}

export default CadastroFila