import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Fieldset } from 'primereact/fieldset';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

import CadastroEtapa from '../../etapa/cadastro-etapa';
import OcorrenciaService from '../../../service/ocorrenciaService';
import Ocorrencia from '../../../dto/ocorrencia';
import TipoOcorrencia from '../../../dto/tipo-ocorrencia';

const CadastroOcorrencia = () => {
    const toast = useRef(null);
    const { codigo } = useParams();
    const [codigoOcorrencia, setCodigoOcorrencia] = useState('');
    const [visible, setVisible] = useState(false);
    const [ocorrencia, setOcorrencia] = useState(Ocorrencia);
    const [ocorrencias, setOcorrencias] = useState([]);

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    function atualizarValores(envet) {
        const { name, value } = envet.target
        setOcorrencia({ ...ocorrencia, [name]: value });
    }

    function salvar() {
        ocorrencia.codigo = '';

        OcorrenciaService.salvar(codigo, ocorrencia)
            .then(() => {
                show('Operação realizada com sucesso', 'success', 'Success');
                setOcorrencia(Ocorrencia);
                OcorrenciaService.listar(codigo)
                    .then(response => setOcorrencias(response.data))
                    .catch(response => console.log(response));
            })
            .catch(response => {
                show(response.response.data.fields[0].message, 'error', 'Error');
            });
    }

    const excluirOcorrencia = (codigoOcorrencia) => {
        OcorrenciaService.excluir(codigo, codigoOcorrencia)
            .then(() => {
                show('Operação realizada com sucesso', 'success', 'Success');
                OcorrenciaService.listar(codigo)
                    .then(response => setOcorrencias(response.data))
                    .catch(response => console.log(response));
            })
            .catch(response => console.log(response));
    }

    const exibirModalEtapa = (codigoOcorrencia) => {
        setVisible(true);
        setCodigoOcorrencia(codigoOcorrencia);
    }

    const botoesTabelaOcorrencia = (ocorrencia) => {
        return (
            <>
                <Button label="+" onClick={() => exibirModalEtapa(ocorrencia.codigo)} />
                <Button label="-" onClick={() => excluirOcorrencia(ocorrencia.codigo)} severity="warning" />
            </>
        )
    }

    useEffect(() => {
        TipoOcorrencia.codigo = codigo;
        ocorrencia.tipoOcorrencia = TipoOcorrencia;
        OcorrenciaService.listar(codigo)
            .then(response => setOcorrencias(response.data))
            .catch(response => console.log(response))
    }, [codigo])

    return (
        <>
            <div>
                <Fieldset legend="Cadastro de ocorrência">
                    <div className="form-field">
                        <label htmlFor="nome" className="form-label">Nome:</label>
                        <InputText name="nome" value={ocorrencia.nome} onChange={atualizarValores} className="form-input"/>
                    </div>

                    <div>
                        <label className="form-label" htmlFor="descricao">Descrição:</label>
                        <InputTextarea  name="descricao" rows={5} cols={30} value={ocorrencia.descricao} onChange={atualizarValores} className="form-textarea" autoResize />
                    </div>

                    <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button label="Salvar" severity="success" onClick={salvar} />
                    </div>

                    <div>
                        <DataTable value={ocorrencias}>
                            <Column field="nome" header="Nome"></Column>
                            <Column field="acoes" header="Ações" body={botoesTabelaOcorrencia}></Column>
                        </DataTable>
                        <Dialog visible={visible} onHide={() => setVisible(false)} >
                            <CadastroEtapa codigoOcorrencia={codigoOcorrencia} />
                        </Dialog>
                    </div>
                </Fieldset>

                <Toast ref={toast} />
            </div>
        </>
    )
}

export default CadastroOcorrencia