import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

<<<<<<< HEAD
=======
import '../cadastro-fila/index.css'

>>>>>>> 9c2db3f87547a638fd0d3a736e38eb0d8bdb5726
import FilaService from '../../../service/filaService';
import Fila from '../../../dto/fila';

const CadastroFila = () => {
    const navegacao = useNavigate();
    const toast = useRef(null);
<<<<<<< HEAD
    const {codigo} = useParams();
=======
    const { codigo } = useParams();
>>>>>>> 9c2db3f87547a638fd0d3a736e38eb0d8bdb5726
    const [fila, setFila] = useState(Fila);

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    function atualizarValores(envet) {
<<<<<<< HEAD
        const {name, value} = envet.target
        setFila({...fila,[name]: value});
=======
        const { name, value } = envet.target
        setFila({ ...fila, [name]: value });
>>>>>>> 9c2db3f87547a638fd0d3a736e38eb0d8bdb5726
    }

    function salvar() {
        if (fila.codigo === '') {
            FilaService.salvar(fila)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success');
                    navegacao("/filas");
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')));
<<<<<<< HEAD
            } else {
                FilaService.atualizar(fila.codigo, fila)
=======
        } else {
            FilaService.atualizar(fila.codigo, fila)
>>>>>>> 9c2db3f87547a638fd0d3a736e38eb0d8bdb5726
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success');
                    navegacao("/filas");
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')));
        }
<<<<<<< HEAD
        
=======

>>>>>>> 9c2db3f87547a638fd0d3a736e38eb0d8bdb5726
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 9c2db3f87547a638fd0d3a736e38eb0d8bdb5726
        </>
    )
}

export default CadastroFila