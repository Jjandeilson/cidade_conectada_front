import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { Toast } from 'primereact/toast';

import CadastroUsuarioFila from '../cadastro-usuario-fila';
import UsuarioService from '../../../service/usuarioService';
import SetorService from '../../../service/sertorService';
import FilaService from '../../../service/filaService';

import Usuario from '../../../dto/usuario';

const optionsSelectButton = [
    { nome: 'Ativo', valor: true },
    { nome: 'Desativado', valor: false }
]

const CadastroUsuario = () => {
    const toast = useRef(null);
    const { codigo } = useParams();
    const [usuario, setUsuario] = useState(Usuario);
    const [setores, setSetores] = useState([]);
    const [filas, setFilas] = useState([]);
    const navegacao = useNavigate();

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    function atualizarValores(envet) {
        const { name, value } = envet.target
        setUsuario({ ...usuario, [name]: value });
    }

    function exibirBotaoAtendente() {
        return !usuario.atendente
    }

    function ativarDesativarAtendente(event) {
        if (event.value) {
            UsuarioService.ativarAtendente(usuario.codigo)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success');

                    FilaService.listar()
                        .then(response => setFilas(response.data.content))

                    atualizarValores(event)
                })
                .catch(response => console.log(response))
        } else {
            UsuarioService.desativarAtendente(usuario.codigo)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success');
                    atualizarValores(event)
                })
                .catch(response => console.log(response))
        }
    }

    function salvar() {
        if (usuario.codigo === '') {
            UsuarioService.salvar(usuario)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success');
                    navegacao("/usuarios")
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')))
        } else {
            UsuarioService.atualizar(usuario.codigo, usuario)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success')
                    navegacao("/usuarios")
                })
                .catch(response => (show(response.response.data.detail, 'error', 'Error')))
        }
    }

    useEffect(() => {
        SetorService.listar()
            .then(response => setSetores(response.data.content));

        if (codigo !== undefined) {
            document.title = "Editar usuário";
            UsuarioService.buscar(codigo)
                .then(response => {
                    setUsuario(response.data);
                    exibirBotaoAtendente();
                })
                .catch(response => console.log(response));

            FilaService.listar()
                .then(response => setFilas(response.data.content))
                .catch(response => console.log(response));
        } else {
            document.title = 'Novo usuário';
        }

    }, [codigo])

    return (
        <>
            <div className="formusuario" style={{ display: 'flex', flexDirection: 'column' }} >
                <div>
                    <div>
                        <label htmlFor="nome">Nome</label>
                    </div>
                    <div>
                        <InputText name="nome" value={usuario.nome} onChange={atualizarValores} />
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="email">E-mail</label>
                    </div>
                    <div>
                        <InputText name="email" value={usuario.email} onChange={atualizarValores} />
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="telefone">Telefone</label>
                    </div>
                    <div>
                        <InputMask mask="(99) 99999-9999" name="telefone" value={usuario?.telefone} onChange={atualizarValores} unmask={true} />
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="celular">Celular</label>
                    </div>
                    <div>
                        <InputMask mask="(99) 99999-9999" name="celular" value={usuario?.celular} onChange={atualizarValores} unmask={true} />
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="login">Login</label>
                    </div>
                    <div>
                        <InputText name="login" value={usuario.login} onChange={atualizarValores} />
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="senha">Senha</label>
                    </div>
                    <div>
                        <Password feedback={false} name="senha" value={usuario.senha} onChange={atualizarValores} />
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="setor">Setor</label>
                    </div>
                    <div>
                        <Dropdown options={setores} placeholder="Selecione" name="setor" value={usuario.setor} optionLabel="nome" onChange={atualizarValores} />
                    </div>
                </div>

                {usuario.codigo && (
                    <div>
                        <div>
                            <label htmlFor="atendente">Atendente</label>
                        </div>
                        <div>
                            <SelectButton options={optionsSelectButton} optionLabel="nome" optionValue="valor" name="atendente" value={usuario?.atendente}
                                onChange={ativarDesativarAtendente} />
                        </div>
                    </div>
                )}

                {usuario.atendente && (
                    <div>
                        <CadastroUsuarioFila filas={filas} />
                    </div>
                )}
                <div>
                    <Button label="Salvar" severity="success" onClick={salvar} />
                    <a onClick={() => navegacao("/usuarios")} className="p-button p-button-warning font-bold">Cancelar</a>
                </div>

                <Toast ref={toast} />
            </div>
        </>
    )
}

export default CadastroUsuario