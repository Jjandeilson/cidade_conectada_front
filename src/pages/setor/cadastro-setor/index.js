import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

const CadastroSetor = () => {
    return (
        <>
            <div>
                <Button label="Salvar" severity="success" />
                <a href="/setores" className="p-button p-button-warning font-bold">Cancelar</a>
            </div>

            <div>
                <div>
                    <label htmlFor="nome">Nome</label>
                </div>
                <div>
                    <InputText />
                </div>
            </div>

            <div>
                <div>
                    <label htmlFor="nome">Descrição</label>
                </div>
                <div>
                <InputTextarea rows={5} cols={30} />
                </div>
            </div>
        </>
    )
}

export default CadastroSetor