import { useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

import '../../index.css'

import CodigoUsuarioContext from '../../context/CodigoUsuarioContext';
import Image from '../../cidade-conectada.png';
import UsuarioService from '../../service/usuarioService';
import UsuarioLogin from '../../dto/usuario-login';

const Login = () => {
    const navegacao = useNavigate();
    const [usuarioLogin, setUsuarioLogin] = useState(UsuarioLogin);
    const { codigoUsuario, setCodigoUsuario } = useContext(CodigoUsuarioContext);

    function atualizarValores(envet) {
        const { name, value } = envet.target
        setUsuarioLogin({ ...usuarioLogin, [name]: value });
    }

    function logar() {
        UsuarioService.login(usuarioLogin)
            .then(response => {
                let atendente = response.data.atendente;
                let codigoUsuario = response.data.codigo;

                if (atendente) {
                    setCodigoUsuario(codigoUsuario);
                    navegacao("/atendentes");
                } else {
                    setCodigoUsuario(codigoUsuario);
                    navegacao("/", codigoUsuario);
                }

            })
            .catch(response => console.log(response));
    }

    return (
        <>
            <div className="login-container">
                <div >
                    <img className="logo-img" src={Image} alt="logo cidade conectada" />
                </div>

                <div className='form-login'>
                    <h1>LOGIN</h1>
                    <div className="form-field">
                        <label className="form-label"> Login:</label>
                        <InputText name="login" value={usuarioLogin.login} onChange={atualizarValores} className="form-input" />
                    </div>

                    <div className="form-field">
                        <label className="form-label">Senha:</label>
                        <Password style={{ width: '299px',}} name="senha" feedback={false} value={usuarioLogin.senha} onChange={atualizarValores}/>
                    </div>

                    <div className="button-container">
                        <Button label="Entar" onClick={logar} />
                    </div>
                </div>
                <Outlet />
            </div>

        </>
    )
}

export default Login