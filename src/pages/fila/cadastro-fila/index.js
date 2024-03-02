import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

import FilaService from '../../../service/filaService'

const Fila = {
    codigo: '',
    nome: '',
    descricao: ''
}

const CadastroFila = () => {
    const navegacao = useNavigate();
    const toast = useRef(null);
    const {codigo} = useParams();
    const [fila, setFila] = useState(Fila);
    const filaService = FilaService;

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    function atualizarValores(envet) {
        const {name, value} = envet.target
        setFila({...fila,[name]: value});
    }

    function salvar() {
        if (fila.codigo == '') {
            filaService.salvar(fila)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success')
                    navegacao("/filas")
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')))
            } else {
                filaService.atualizar(fila.codigo, fila)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success')
                    navegacao("/filas")
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')))
        }
        
    }

    useEffect(() => {
        if (codigo != undefined) {
            document.title = "Editar fila";
            filaService.buscar(codigo)
                .then(response => setFila(response.data))
        } else {
            document.title = 'Novo setor';
        }

    }, [])

    return (
        <>
            <div>
                <Button label="Salvar" severity="success" onClick={salvar}/>
                <a onClick={() => navegacao("/filas")} className="p-button p-button-warning font-bold">Cancelar</a>
            </div>

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

            <Toast ref={toast} />
        </>
    )
}

export default CadastroFila