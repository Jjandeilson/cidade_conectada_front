import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

import '../cadastro-setor/index.css';

import SetorService from '../../../service/sertorService';

import Setor from '../../../dto/setor';

const CadastroSetor = () => {
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
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success');
                    navegacao("/setores");
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')));
        } else {
            SetorService.atualizar(setor.codigo, setor)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success');
                    navegacao("/setores");
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')));
        }

    }

    useEffect(() => {
        if (codigo !== undefined) {
            document.title = "Editar setor";
            SetorService.buscar(codigo)
                .then(response => setSetor(response.data))
                .catch(response => console.log(response));
        } else {
            document.title = 'Novo setor';
        }

    }, [codigo])

    return (
        <>
            <div className="cadastroForm">
                <h1>Cadastro Setor</h1>
                <div className="formField">
                    <label htmlFor="nome" className="formLabel">Nome</label>
                    <InputText name="nome" value={setor.nome} onChange={atualizarValores} className="formInput" />
                </div>

                <div className="formField">
                    <label htmlFor="descricao" className="formLabel">Descrição</label>
                    <InputTextarea name="descricao" value={setor?.descricao} onChange={atualizarValores} rows={5} className="formTextarea" autoResize />
                </div>

                <div className="formActions">
                    <Button label="Salvar" className="submitButton" onClick={salvar} />
                    <Button label="Cancelar" className="cancelButton" onClick={() => navegacao("/setores")} />
                </div>

                <Toast ref={toast} />
            </div>
        </>
    )
}

export default CadastroSetor