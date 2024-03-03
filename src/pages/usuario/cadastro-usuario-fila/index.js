import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Fieldset } from 'primereact/fieldset';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import UsuarioService from '../../../service/usuarioService';

const CadastroUsuarioFila = ({filas}) => {

    const {codigo} = useParams();
    const [codigoFila, setCodigoFila] = useState('');
    const [filasUsuario, setFilasUsuario] = useState([]);

    function salvarFila() {
        if (codigoFila != '') {
            UsuarioService.salvarFila(codigo, codigoFila)
                .then(() => {
                    console.log('ok');
                    UsuarioService.listarFilasUsuario(codigo)
                        .then(response => setFilasUsuario(response.data))
                        .catch(response => console.log(response));
                    setCodigoFila('');
                })
                .catch(response => console.log(response))
            
        }
    }

    const excluir = (codigoFila) => {
        UsuarioService.removerFila(codigo, codigoFila)
            .then(() => {
                // show('Operação realizada com sucesso', 'success', 'Success')
                UsuarioService.listar()
                    .then(() => {
                        UsuarioService.listarFilasUsuario(codigo)
                        .then(response => setFilasUsuario(response.data))
                        .catch(response => console.log(response));
                    })
                    .catch(response => console.log(response))
            })
            .catch(response => (
                console.log(response)
                // show(response.response.data.detail, 'error', 'Error')
            ))
    }

    const botoesExcluir = (fila) => {
        return  (
            <>
               <Button label="Excluir" onClick={() => excluir(fila.codigo)} severity="warning"/>
            </>
        )
    }

    useEffect(() => {
        UsuarioService.listarFilasUsuario(codigo)
            .then(response => setFilasUsuario(response.data))
            .catch(response => console.log(response))

    }, [])

    return (
        <>
            <div>
                <Fieldset legend="Associação de fila">
                   <div>
                        <div>
                            <div>
                                <label htmlFor="fila">Fila</label>
                            </div>
                            <div>
                                <Dropdown placeholder="Selecione" value={codigoFila} options={filas} optionLabel="nome" optionValue="codigo" onChange={(event) => setCodigoFila(event.value)} />
                                <Button label="Adicionar" onClick={salvarFila}/>
                            </div>
                        </div>

                        <div>
                            <DataTable value={filasUsuario} >
                                <Column field="nome" header="Nome"></Column>
                                <Column field="acoes" header="Ações" body={botoesExcluir}></Column>
                            </DataTable>
                        </div>
                   </div>
                </Fieldset>
            </div>
        </>
    )
}

export default CadastroUsuarioFila