import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

<<<<<<< HEAD
=======
import '../cadastro-setor/index.css';

>>>>>>> 9c2db3f87547a638fd0d3a736e38eb0d8bdb5726
import SetorService from '../../../service/sertorService';

import Setor from '../../../dto/setor';

const CadastroSetor = () => {
    const navegacao = useNavigate();
    const toast = useRef(null);
<<<<<<< HEAD
    const {codigo} = useParams();
=======
    const { codigo } = useParams();
>>>>>>> 9c2db3f87547a638fd0d3a736e38eb0d8bdb5726
    const [setor, setSetor] = useState(Setor);

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    function atualizarValores(envet) {
<<<<<<< HEAD
        const {name, value} = envet.target
        setSetor({...setor,[name]: value});
=======
        const { name, value } = envet.target
        setSetor({ ...setor, [name]: value });
>>>>>>> 9c2db3f87547a638fd0d3a736e38eb0d8bdb5726
    }

    function salvar() {
        if (setor.codigo === '') {
            SetorService.salvar(setor)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success');
                    navegacao("/setores");
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')));
<<<<<<< HEAD
            } else {
                SetorService.atualizar(setor.codigo, setor)
=======
        } else {
            SetorService.atualizar(setor.codigo, setor)
>>>>>>> 9c2db3f87547a638fd0d3a736e38eb0d8bdb5726
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success');
                    navegacao("/setores");
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')));
        }
<<<<<<< HEAD
        
=======

>>>>>>> 9c2db3f87547a638fd0d3a736e38eb0d8bdb5726
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
<<<<<<< HEAD
            <div>
                <Button label="Salvar" severity="success" onClick={salvar} />
                <a onClick={() => navegacao("/setores")} className="p-button p-button-warning font-bold">Cancelar</a>
            </div>

            <div>
                <div>
                    <label htmlFor="nome">Nome</label>
                </div>
                <div>
                    <InputText name="nome" value={setor.nome} onChange={atualizarValores} />
                </div>
            </div>

            <div>
                <div>
                    <label htmlFor="descricao">Descrição</label>
                </div>
                <div>
                    <InputTextarea name="descricao" value={setor?.descricao} rows={5} cols={30} onChange={atualizarValores} />
                </div>
            </div>
            
            <Toast ref={toast} />
=======
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
>>>>>>> 9c2db3f87547a638fd0d3a736e38eb0d8bdb5726
        </>
    )
}

export default CadastroSetor