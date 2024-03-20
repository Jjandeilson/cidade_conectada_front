import { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import CodigoUsuarioContext from "../../context/CodigoUsuarioContext";
import './../main/index.css';
import MenuNavegacao from "../../shared/menu_navegacao/menu";

const Main = () => {
    const navegacao = useNavigate();
    const { codigoUsuario, setCodigoUsuario } = useContext(CodigoUsuarioContext);

    // useEffect(() => {
    //     if (codigoUsuario === '') {
    //         navegacao("/login");
    //     }
    // }, [])

    return (
        <>

            <div className="main-container">
                <MenuNavegacao />
                <div className="outlet-container">
                    <Outlet />
                </div>
            </div>

        </>
    )
}

export default Main