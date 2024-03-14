import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { Panel } from 'primereact/panel'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';


import SetorService from '../../../service/sertorService';

import Setor from '../../../dto/setor';

const CadastroSetor = () => {
    const navegacao = useNavigate();
    const toast = useRef(null);
    const {codigo} = useParams();
    const [setor, setSetor] = useState(Setor);

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    function atualizarValores(envet) {
        const {name, value} = envet.target
        setSetor({...setor,[name]: value});
    }

    function salvar() {
        if (setor.codigo === '') {
            SetorService.salvar(setor)
                .then(response => {
                    show('Operação realizada com sucesso', 'success', 'Success');
                    navegacao(`/setores/${response.data.codigo}/editar`);
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')));
            } else {
            SetorService.atualizar(setor.codigo, setor)
                .then(response => {
                    show('Operação realizada com sucesso', 'success', 'Success');
                    navegacao(`/setores/${response.data.codigo}/editar`);
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
            <div>
                

            
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', width: '80%', margin: '20px' }}>
                    
                    <Panel style={{ width: '100%' }}>
                        <h1 style={{ textAlign: 'center' }}>Cadastro Setor</h1>
                        <div style={{ marginBottom: '10px' }}>
                            <label htmlFor="nome">Nome</label>
                            <InputText name="nome" value={setor.nome} onChange={atualizarValores} style={{ width: '100%' }} />
                        </div>
        
                        <div style={{ marginBottom: '10px' }}>
                            <label htmlFor="descricao">Descrição</label>
                            <InputTextarea name="descricao" value={setor?.descricao} onChange={atualizarValores} rows={5} style={{ width: '100%' }} autoResize />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                            <Button label="Salvar"  onClick={salvar} severity="success"/>
                            <Button label="Cancelar" onClick={() => navegacao("/setores")} severity="danger"/>
                        </div>
                    </Panel>
        

        
                    <Toast ref={toast} />
                </div>
            </div>
        </>
    )
    
}

export default CadastroSetor