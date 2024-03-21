import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';

import CadastroUsuarioFila from '../cadastro-usuario-fila';
import UsuarioService from '../../../service/usuarioService';
import SetorService from '../../../service/setorService';
import FilaService from '../../../service/filaService';

import '../cadastro-usuario/index.css'

import Usuario from '../../../dto/usuario';

const optionsSelectButton = [
    { nome: 'Ativo', valor: true },
    { nome: 'Desativado', valor: false }
]

const CadastroUsuario = (visible) => {
    const toast = useRef(null);
    const { codigo } = useParams();
    const [usuario, setUsuario] = useState(Usuario);
    const [setores, setSetores] = useState([]);
    const [filas, setFilas] = useState([]);
    const navegacao = useNavigate();

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

            UsuarioService.listarFilasNaoAssociadasUsuario(codigo)
                .then(response => setFilas(response.data))

            FilaService.listar()
                .then(response => setFilas(response.data.content))
                .catch(response => console.log(response));
        } else {
            document.title = 'Novo usuário';
        }

    }, [codigo])

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    function atualizarValores(envet) {
        const { name, value } = envet.target
        setUsuario({ ...usuario, [name]: value });

    }

    function exibirBotaoAtendente() {
        return !usuario.atendente;
    }

    function ativarDesativarAtendente(event) {
        if (event.value) {
            UsuarioService.ativarAtendente(usuario.codigo)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success');

                    FilaService.listar()
                        .then(response => setFilas(response.data.content))
                        .catch(response => console.log(response));

                    atualizarValores(event)
                })
                .catch(response => console.log(response))
        } else {
            UsuarioService.desativarAtendente(usuario.codigo)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success');
                    atualizarValores(event)
                })
                .catch(response => console.log(response));
        }
    }

    function salvar() {
        if (usuario.codigo === '') {
            UsuarioService.salvar(usuario)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success');
                    setTimeout(() => {
                        navegacao('/usuarios');
                    }, 500);
                })
                .catch(response => (show(response.response.data.fields[0].message, 'error', 'Error')))
        } else {
            UsuarioService.atualizar(usuario.codigo, usuario)
                .then(() => {
                    show('Operação realizada com sucesso', 'success', 'Success')
                    setTimeout(() => {
                        navegacao('/usuarios');
                    }, 500);
                })
                .catch(response => (show(response.response.data.fields[0].message, 'error', 'Error')))
        }
    }

    return (
        <>
            <Dialog visible={visible} onHide={() => navegacao("/usuarios")} >
                <div className='cadastro-form-user'>
                    <h1>Cadastrar Usuário</h1>
                    <div className="form-field">
                        <label htmlFor="nome" className='form-label'>Nome:</label>
                        <InputText name="nome" value={usuario.nome} onChange={atualizarValores} className="form-input" />
                    </div>

                    <div className="form-field">
                        <label htmlFor="email" className='form-label'>E-mail:</label>
                        <InputText name="email" value={usuario.email} onChange={atualizarValores} className="form-input" />
                    </div>

                    <div className="form-field">
                        <label htmlFor="telefone" className='form-label'>Telefone:</label>
                        <InputMask mask="(99) 99999-9999" name="telefone" value={usuario?.telefone} onChange={atualizarValores} unmask={true} className="form-input" />
                    </div>

                    <div className="form-field">
                        <label htmlFor="celular" className='form-label'>Celular:</label>
                        <InputMask mask="(99) 99999-9999" name="celular" value={usuario?.celular} onChange={atualizarValores} unmask={true} className="form-input" />
                    </div>

                    <div className="form-field">
                        <label htmlFor="login" className='form-label'>Login:</label>
                        <InputText name="login" value={usuario.login} onChange={atualizarValores} className="form-input" />
                    </div>

                    <div className="form-field">
                        <label htmlFor="senha" className='form-label'>Senha:</label>
                        <Password feedback={false} name="senha" value={usuario.senha} onChange={atualizarValores} toggleMask />
                    </div>

                    <div className="form-field">
                        <label htmlFor="setor" className='form-label'>Setor:</label>
                        <div>
                            <Dropdown options={setores} placeholder="Selecione" name="setor" value={usuario.setor} optionLabel="nome" onChange={atualizarValores} />
                        </div>
                    </div>

                    {usuario.codigo && (
                        <div className="form-field">
                            <label htmlFor="atendente" className='form-label'>Atendente:</label>
                            <SelectButton options={optionsSelectButton} optionLabel="nome" optionValue="valor" name="atendente" value={usuario?.atendente}
                                onChange={ativarDesativarAtendente} />
                        </div>
                    )}

                    {usuario.atendente && (
                        <div>
                            <CadastroUsuarioFila filas={filas} />
                        </div>
                    )}

                    <div className="form-actions">
                        <Button label="Cancelar" className="cancel-button" onClick={() => navegacao("/usuarios")} />
                        <Button label="Salvar" className="submit-button" onClick={salvar} />
                    </div>
                    <Toast ref={toast} />
                </div>
            </Dialog >

        </>
    )
}

export default CadastroUsuario