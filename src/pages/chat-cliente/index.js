import { useEffect, useState } from 'react';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { InputText } from 'primereact/inputtext';

import AtendimentoService from '../../service/atendimentoService';
import WebSocket from '../../service/websocket';
import MensagemChat from '../../dto/mensagem-chat';

const ChatCliente = () => {

    const [mensagemChat, setMensagemChat] = useState(MensagemChat);
    const [protocoloCliente, setProtocoloCliente] = useState('');
    const [textoChat, setTextoChat] = useState('');
    const [exibirChat, setExibirChat] = useState(false);
    const [client, setClient] = useState({});
    
    function atualizarValores(event) {
        const {value} = event.target;
        setTextoChat(value);
    }

    function enviarMensagem() {
        mensagemChat.fluxo = 'ENTRADA';
        mensagemChat.midia = 'CHAT';
        mensagemChat.envioMensagem = "CLIENTE";
        mensagemChat.protocolo = protocoloCliente;
        mensagemChat.mensagem = 'Cliente: ' + textoChat;

        client.send("/app/chat", {}, JSON.stringify({
            ...mensagemChat
        }));

        setTextoChat('');
        setMensagemChat(MensagemChat);
    }

    function escreverFila() {
        client.subscribe("/chat/cliente", function(result) {
            let mensagemCliente = JSON.parse(result.body);
            const chatMessage = document.getElementById('chatId');
            const divMensagem = document.createElement("div");

            divMensagem.textContent = mensagemCliente.mensagem;
            chatMessage.appendChild(divMensagem);

            if (mensagemCliente.finalizado) {
                document.getElementById('chatId').innerText = "";
                setExibirChat(false);
            }
        })
    }

    function logarChat() {
        setExibirChat(true);
        escreverFila();
    }

    useEffect(() => {
        WebSocket.login()
            .then(response => {
                setClient(response);
            })
            .catch(response => console.log(response));

        AtendimentoService.gerarProtocolo()
            .then(response => setProtocoloCliente(response.data))
            .catch(response => console.log(response));
    }, [])

    return (
        <>
            {!exibirChat && (
                <Card>
                    <div>
                        <label>Chat</label>
                    </div>

                    <div>
                        <Button label="Entrar" onClick={logarChat} />
                    </div>
                </Card>
            )}

            {exibirChat && (
                <>
                    <div className="card">
                        <ScrollPanel style={{ width: '100%', height: '200px' }}>
                            <div id="chatId"></div>
                        </ScrollPanel>

                        <div className="p-inputgroup">
                            <InputText name="textoChat" value={textoChat} onChange={atualizarValores} />
                            <Button label="Enviar" className="p-button-success" onClick={enviarMensagem} />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ChatCliente