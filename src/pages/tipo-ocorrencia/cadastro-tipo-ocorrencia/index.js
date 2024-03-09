import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';

import CadastroOcorrencia from '../../ocorrencia/cadastro-ocorrencia';
import TipoOcorrenciaService from '../../../service/tipoOcorrenciaService';
import SetorService from '../../../service/sertorService';

import TipoOcorrencia from '../../../dto/tipo-ocorrencia';

const CadastroTipoOcorencia = () => {
    const toast = useRef(null);
    const { codigo } = useParams();
    const [tipoOcorrencia, setTipoOcorrencia] = useState(TipoOcorrencia);
    const [setores, setSetores] = useState([]);
    const navegacao = useNavigate();

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

    return (
        <>
            <div className="formotipocorrencia" style={{ display: 'flex', flexDirection: 'column' }} >
                <div>
                    <div>
                        <label htmlFor="nome">Nome</label>
                    </div>
                    <div>
                        <InputText name="nome" value={tipoOcorrencia.nome} onChange={atualizarValores} />
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="setor">Setor</label>
                    </div>
                    <div>
                        <Dropdown options={setores} placeholder="Selecione" name="setor" value={tipoOcorrencia.setor} optionLabel="nome" onChange={atualizarValores} />
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="descricao">Descrição</label>
                    </div>
                    <div>
                        <InputTextarea name="descricao" value={tipoOcorrencia.descricao} onChange={atualizarValores} rows={5} cols={30} />
                    </div>
                </div>

                {tipoOcorrencia.codigo && (
                    <CadastroOcorrencia />
                )}
                <div>
                    <Button label="Salvar" severity="success" onClick={salvar} />
                    <a onClick={() => navegacao("/tipos-ocorrencia")} className="p-button p-button-warning font-bold">Cancelar</a>
                </div>

                <Toast ref={toast} />
            </div>
        </>
    )
}

export default CadastroTipoOcorencia
