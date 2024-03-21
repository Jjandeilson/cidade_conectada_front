import { useEffect, useState } from 'react';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { InputText } from 'primereact/inputtext';

import '../chat-cliente/index.css'

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
        const { value } = event.target;
        setTextoChat(value);
    }

    function voltar() {
        setExibirChat(false);
    }


    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            enviarMensagem();
        }
    }

    function enviarMensagem() {

        if (textoChat.trim() === '') {

            console.error('A mensagem não pode ser vazia.');
            return;
        }
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
        client.subscribe("/chat/cliente", function (result) {
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
            <div className="chat-container">

                {!exibirChat && (
                    <div className='chat-card'>
                        <Card>
                            <div className='chat'>
                                <label>Chat</label>
                                <Button label="Entrar" onClick={logarChat} />
                            </div>
                        </Card>

                    </div>

                )}

                {exibirChat && (
                    <>
                        <div className='conteiner-card-chat'>

                            <div className="card-header">
                                <span>ATENDIMENTO</span>
                                <a onClick={voltar} className="p-button p-button-warning font-bold">Voltar</a>
                            </div>

                            <div>
                                <Card>
                                    <div className="card">
                                        <ScrollPanel >
                                            <div className="mensagem" id="chatId"></div>
                                        </ScrollPanel>
                                    </div>
                                    <div className="p-inputgroup input-chat-grup">
                                        <InputText name="textoChat" onKeyDown={handleKeyDown} value={textoChat} onChange={atualizarValores} />
                                        <Button label="Enviar" className="p-button-success" onClick={enviarMensagem} />
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </>

                )}

            </div >
        </>
    )
}

export default ChatCliente