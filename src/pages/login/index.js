import { useContext, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import CodigoUsuarioContext from '../../context/CodigoUsuarioContext';

import UsuarioService from '../../service/usuarioService';
import UsuarioLogin from '../../dto/usuario-login';

const Login = () => {
    const toast = useRef(null);
    const navegacao = useNavigate();
    const [usuarioLogin, setUsuarioLogin] = useState(UsuarioLogin);
    const {codigoUsuario, setCodigoUsuario} = useContext(CodigoUsuarioContext);
    
    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

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
        .catch(response => {
            show('Login ou senha inválida. Verificar se as informações estão corretas', 'error', 'Error');
        });
    }

    return  (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
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

                <Toast ref={toast} />
            </div>
    
            <Outlet />
        </>
    )
}

export default Login