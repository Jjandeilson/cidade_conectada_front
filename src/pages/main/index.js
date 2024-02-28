import { Outlet } from "react-router-dom"

import MenuNavegacao from "../../shared/menu_navegacao"

const Main = () => {
    return (
        <>
            <MenuNavegacao />
            <Outlet />
        </>
    )
}

export default Main