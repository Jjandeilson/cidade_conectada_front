import { PanelMenu } from 'primereact/panelmenu';

const menu = [
    {label: "Home", url: "/"},
    {
     label: "Administração", items: [
            {label: "Setor", url: "/setores"},
            {label: "Fila", url: "/filas"},
            {label: "Usuários", url: "/usuarios"}
        ]
    },
    {label: "Atendimentos"}
]

const MenuNavegacao = () => {
    return (
        <>
            <PanelMenu model={menu} className="w-full md:w-20rem" /> 
        </>
    );
}

export default MenuNavegacao