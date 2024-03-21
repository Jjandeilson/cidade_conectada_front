import { useState, useRef } from 'react';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';

import '../../../index.css'

import AtendimentoService from '../../../service/atendimentoService';

import * as moment from 'moment-timezone';

const AcompanharAtendimentoCliente = () => {
    document.title = "Consultar protocolo";

    const toast = useRef(null);
    const [visualizar, setVisualizar] = useState(false);
    const [protocolo, setProtocolo] = useState('');
    const [atendimento, setAtendimento] = useState({});
    const [etapas, setEtapas] = useState([]);

    const show = (mensagem, severity, summary) => {
        toast.current.show({ severity: severity, summary: summary, detail: mensagem });
    };

    const templateEtapas = (etapa) => {
        return (
            <Card>
                <div>
                    <label>Nome: {etapa.nome}</label>
                </div>
                <div>
                    <label>Status: {etapa.status}</label>
                </div>
                <div>
                    <label>Data ínicio: {etapa.inicio}</label>
                </div>
                <div>
                    <label>Data finalizado: {etapa.fim}</label>
                </div>
            </Card>
        );
    }

    const templateMarker = (etapa) => {
        return (
            <span className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1">
                {etapa.posicao}
            </span>
        );
    }

    function atualizarValores(event) {
        console.log(event.target.value)
        setProtocolo(event.target.value);
    }

    function consultar() {
        AtendimentoService.consultarProtocolo(protocolo)
            .then(response => {
                let atendimentoBanco = response.data;
                let etapasBanco = response.data.etapas;

                atendimentoBanco.abertura = moment(atendimentoBanco.abertura).format("DD/MM/YYYY HH:mm:ss");

                if (atendimentoBanco.fechamento) {
                    atendimentoBanco.fechamento = moment(atendimentoBanco.fechamento).format("DD/MM/YYYY HH:mm:ss");
                }

                etapasBanco.forEach(etapa => {
                    if (etapa.inicio) {
                        etapa.inicio = moment(etapa.inicio).format("DD/MM/YYYY HH:mm:ss");
                    }

                    if (etapa.fim) {
                        etapa.fim = moment(etapa.fim).format("DD/MM/YYYY HH:mm:ss");
                    }
                });

                setAtendimento(atendimentoBanco);
                setEtapas(etapasBanco);
                setVisualizar(true);
                setProtocolo('');
            })
            .catch(response => {
                show(response.response.data.detail, 'error', 'Error');
                setVisualizar(false);
            });
    }

    return (
        <>

            <div className='container-protocolo'> 
                <div className="protocolo-form" >
                    <h1>BUSCAR PROTOCOLO</h1>
                    <label className="form-label">Protocolo: </label>
                    <div className='input-container'>
                        <InputText className="form-label" name="protocolo" value={protocolo} onChange={atualizarValores} />
                        <Button icon="pi pi-search" className="p-button-warning" onClick={consultar} />
                    </div>
                </div>
            </div>


            {visualizar && (
                <div>
                    <div>
                        <label>Protocolo: {atendimento.protocolo}</label>
                    </div>
                    <div>
                        <label>Data de abertura: {atendimento.abertura}</label>
                    </div>
                    <div>
                        <label>Data de finalização: {atendimento.fechamento}</label>
                    </div>
                    <div>
                        <label>Status: {atendimento.status}</label>
                    </div>
                    <div className="card">
                        <Timeline align='alternate' value={etapas} marker={templateMarker} content={templateEtapas} />
                    </div>
                </div>
            )}
            <Toast ref={toast} />
        </>
    )
}

export default AcompanharAtendimentoCliente