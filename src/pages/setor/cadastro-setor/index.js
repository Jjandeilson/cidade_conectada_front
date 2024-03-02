import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

import SetorService from '../../../service/setor/sertorService';

const Setor = {
    codigo: '',
    nome: '',
    descricao: ''
}

const CadastroSetor = () => {
    const navegacao = useNavigate();
    const toast = useRef(null);
    const {codigo} = useParams();
    const [setor, setSetor] = useState(Setor);
    const setorService = SetorService;

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    function atualizarValores(envet) {
        const {name, value} = envet.target
        setSetor({...setor,[name]: value});
    }

    function salvar() {
        if (setor.codigo == '') {
            setorService.salvar(setor)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success')
                    navegacao("/setores")
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')))
            } else {
                setorService.atualizar(setor.codigo, setor)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success')
                    navegacao("/setores")
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')))
        }
        
    }

    useEffect(() => {
        if (codigo != undefined) {
            document.title = "Editar setor";
            setorService.buscar(codigo)
                .then(response => setSetor(response.data))
        } else {
            document.title = 'Novo setor';
        }

    }, [])

    return (
        <>
            <div>
                <Button label="Salvar" severity="success" onClick={salvar} />
                <a onClick={() => navegacao("/setores")} className="p-button p-button-warning font-bold">Cancelar</a>
            </div>

            {/* <InputText name="codigo" value={setor.codigo} onChange={atualizarValores} hidden /> */}
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
        </>
    )
}

export default CadastroSetor