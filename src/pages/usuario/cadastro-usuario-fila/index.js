import { Fieldset } from 'primereact/fieldset';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const CadastroUsuarioFila = () => {
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
                                <Dropdown placeholder="Selecione" options={[]} className="w-full md:w-14rem" />
                                <Button label="Adicionar" />
                            </div>
                        </div>

                        <div>
                            <DataTable tableStyle={{ minWidth: '50rem' }}>
                                <Column field="nome" header="Nome"></Column>
                                <Column field="acoes" header="Ações">
                                    <Button label="Editar" />
                                </Column>
                            </DataTable>
                        </div>
                   </div>
                </Fieldset>
            </div>
        </>
    )
}

export default CadastroUsuarioFila