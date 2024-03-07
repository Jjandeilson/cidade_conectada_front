import { useEffect, useRef ,useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

import EtapaService from '../../../service/etapaService';
import Etapa from '../../../dto/etapa';
import Ocorrencia from '../../../dto/ocorrencia';

const CadastroEtapa = ({codigoOcorrencia}) => {
    const toast = useRef(null);
    const [codigo, setCodigo] = useState(codigoOcorrencia); 
    const [etapa, setEtapa] = useState(Etapa);
    const [etapas, setEtapas] = useState([]);

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    function atualizarValores(envet) {
        const {name, value} = envet.target;
        setEtapa({...etapa,[name]: value});
    }

    function salvar() {
        EtapaService.salvar(codigo, etapa)
            .then(() => {
                setEtapa(Etapa);
                
                EtapaService.listar(codigo)
                    .then(response => setEtapas(response.data))
                    .catch(response => console.log(response));
            })
            .catch(response => console.log(response));
    }

    function excluirEtapa(codigoEtapa) {
        EtapaService.excluir(codigo, codigoEtapa)
            .then(() => {
                EtapaService.listar(codigo)
                .then(response => setEtapas(response.data))
                .catch(response => console.log(response));
            })
            .catch(response => console.log(response));
    }

    const botoesTabelaEtapa = (etapa) => {
        return  (
            <>
                <Button label="-" onClick={() => excluirEtapa(etapa.codigo)} severity="warning" />
            </>
        )
    }

    useEffect(() => {
        setCodigo(codigoOcorrencia)
        Ocorrencia.codigo = codigo;
        etapa.ocorrencia = Ocorrencia;

        EtapaService.listar(codigoOcorrencia)
            .then(response => setEtapas(response.data))
            .catch(response => console.log(response))
     }, [codigo])

    return (
        <>
            <div>
                <div>
                    <label htmlFor="nome">Nome</label>
                </div>
                <div>
                    <InputText name="nome" value={etapa.nome} onChange={atualizarValores}/>
                </div>
            </div>

            <div>
                <div>
                    <label htmlFor="descricao">Descrição</label>
                </div>
                <div>
                    <InputTextarea name="descricao" rows={5} cols={30} value={etapa.descricao} onChange={atualizarValores} />
                </div>
            </div>

            <div>
                <Button label="Salvar" severity="success" onClick={salvar}/>
            </div>

            <div>
                <DataTable value={etapas} >
                    <Column field="nome" header="Nome"></Column>    
                    <Column field="acoes" header="Ações" body={botoesTabelaEtapa} ></Column>
                </DataTable>
            </div>

            <Toast ref={toast} />
        </>
    )
}

export default CadastroEtapa