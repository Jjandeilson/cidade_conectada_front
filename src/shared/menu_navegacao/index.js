import { useNavigate } from 'react-router-dom';

import { PanelMenu } from 'primereact/panelmenu';

const MenuNavegacao = () => {
    const navegacao = useNavigate();

    const menu = [
        {label: "Home", command: () => {navegacao("/")}},
        {
         label: "Administração", items: [
                {label: "Setores", command: () => {navegacao("/setores")}},
                {label: "Filas", command: () => {navegacao("/filas")}},
                {label: "Usuários", command: () => {navegacao("/usuarios")}},
                {label: "Canais de atendimento", command: () => {navegacao("/canais-atendimento")}},
                {label: "Tipo de ocorrências", command: () => {navegacao("/tipos-ocorrencia")}}
            ]
        },
        {label: "Atendimentos", command: () => {navegacao("/atendimentos")}},
        {label: "Clientes", command: () => {navegacao("/clientes")}}
    ]

    return (
        <>
            <PanelMenu model={menu} className="w-full md:w-20rem" /> 
        </>
    );
}

export default MenuNavegacao