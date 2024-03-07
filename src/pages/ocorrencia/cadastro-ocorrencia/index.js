import { useEffect, useRef ,useState } from 'react';
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
    const {codigo} = useParams();
    const [codigoOcorrencia, setCodigoOcorrencia] = useState('');
    const [visible, setVisible] = useState(false);
    const [ocorrencia, setOcorrencia] = useState(Ocorrencia);
    const [ocorrencias, setOcorrencias] = useState([]);

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    function atualizarValores(envet) {
        const {name, value} = envet.target
        setOcorrencia({...ocorrencia,[name]: value});
    }

    function salvar() {
        if (ocorrencia.codigo === '') {
            OcorrenciaService.salvar(codigo, ocorrencia)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success');
                    setOcorrencia(Ocorrencia);
                    OcorrenciaService.listar(codigo)
                        .then(response => setOcorrencias(response.data))
                        .catch(response => console.log(response));
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')));
            } else {
                OcorrenciaService.atualizar(codigo, ocorrencia)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success');
                    setOcorrencia(Ocorrencia);
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')));
            }
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
        return  (
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
                    <div>
                        <div>
                            <label htmlFor="nome">Nome</label>
                        </div>
                        <div>
                            <InputText name="nome" value={ocorrencia.nome} onChange={atualizarValores}/>
                        </div>
                    </div>

                    <div>
                        <div>
                            <label htmlFor="descricao">Descrição</label>
                        </div>
                        <div>
                            <InputTextarea name="descricao" rows={5} cols={30} value={ocorrencia.descricao} onChange={atualizarValores} />
                        </div>
                    </div>

                    <div>
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