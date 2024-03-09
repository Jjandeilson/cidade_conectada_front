import { useState } from 'react';

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

import UsuarioLogin from '../../dto/usuario-login';

const Login = () => {
    const  [usuarioLogin, setUsuarioLogin] = useState(UsuarioLogin);

    function atualizarValores(envet) {
        const {name, value} = envet.target
        setUsuarioLogin({...usuarioLogin,[name]: value});
    }

    function logar() {
        console.log(usuarioLogin)
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
        </>
    )
}

export default Login