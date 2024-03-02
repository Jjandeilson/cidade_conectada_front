import { PanelMenu } from 'primereact/panelmenu';

const menu = [
    {label: "Home", url: "/"},
    {
     label: "Administração", items: [
            {label: "Setores", url: "/setores"},
            {label: "Filas", url: "/filas"},
            {label: "Usuários", url: "/usuarios"},
            {label: "Canais de atendimento", url: "/canais-atendimento"},
            {label: "Tipo de ocorrências", url: "/tipos-ocorrencia"}
        ]
    },
    {label: "Atendimentos", url: "/atendimentos"},
    {label: "Clientes", url: "/clientes"}
]

const MenuNavegacao = () => {
    return (
        <>
            <PanelMenu model={menu} className="w-full md:w-20rem" /> 
        </>
    );
}

export default MenuNavegacao