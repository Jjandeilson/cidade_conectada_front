import { useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

import CodigoUsuarioContext from '../../context/CodigoUsuarioContext';

import UsuarioService from '../../service/usuarioService';
import UsuarioLogin from '../../dto/usuario-login';

const Login = () => {
    const navegacao = useNavigate();
    const [usuarioLogin, setUsuarioLogin] = useState(UsuarioLogin);
    const {codigoUsuario, setCodigoUsuario} = useContext(CodigoUsuarioContext); 

    function atualizarValores(envet) {
        const {name, value} = envet.target
        setUsuarioLogin({...usuarioLogin,[name]: value});
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

    return  (
        <>
            <Card>
                <div>

                    <div>
                        <label> Login</label>
                        
                        <div>
                            <InputText name="login" value={usuarioLogin.login} onChange={atualizarValores}/>
                        </div>
                    </div>

                    <div>
                        <label>Senha</label>

                        <div>
                            <Password name="senha" feedback={false} value={usuarioLogin.senha} onChange={atualizarValores} />
                        </div>
                    </div>

                    <div>
                        <Button label="Entar" onClick={logar} />
                    </div>
                </div>
            </Card>

            <Outlet />
        </>
    )
}

export default Login