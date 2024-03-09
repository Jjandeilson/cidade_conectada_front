import { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import CodigoUsuarioContext from "../../context/CodigoUsuarioContext";

import MenuNavegacao from "../../shared/menu_navegacao/menu";

const Main = () => {
    const navegacao = useNavigate();
    const {codigoUsuario, setCodigoUsuario} = useContext(CodigoUsuarioContext); 

    useEffect(() => {
        if (codigoUsuario === '') {
            console.log(codigoUsuario)
            navegacao("/login");
        }
    }, [])

    return (
        <>
            <MenuNavegacao />
            <Outlet />
        </>
    )
}

export default Main