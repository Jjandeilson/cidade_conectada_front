import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

import '../cadastro-fila/index.css'

import FilaService from '../../../service/filaService';
import Fila from '../../../dto/fila';

const CadastroFila = () => {
    const navegacao = useNavigate();
    const toast = useRef(null);
    const { codigo } = useParams();
    const [fila, setFila] = useState(Fila);

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
                    show('Operação realizada com sucesso', 'success', 'Success');
                    navegacao("/filas");
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')));
        } else {
            FilaService.atualizar(fila.codigo, fila)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success');
                    navegacao("/filas");
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')));
        }

    }

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

    return (
        <>
            <div className="formfila" style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                    <div>
                        <label htmlFor="nome">Nome</label>
                    </div>
                    <div>
                        <InputText name="nome" value={fila.nome} onChange={atualizarValores} />
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="nome">Descrição</label>
                    </div>
                    <div>
                        <InputTextarea name="descricao" value={fila?.descricao} onChange={atualizarValores} rows={5} cols={30} />
                    </div>
                </div>
                <div>
                    <Button label="Salvar" severity="success" onClick={salvar} />
                    <a onClick={() => navegacao("/filas")} className="p-button p-button-warning font-bold">Cancelar</a>
                </div>

                <Toast ref={toast} />
            </div>
        </>
    )
}

export default CadastroFila