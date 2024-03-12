

const WebSocket = {
    login: async function() {
        let client;
        const Stompt =  require('stompjs');
        var SockJs = require('sockjs-client');

        SockJs = new SockJs("http://localhost:8080/cidade-conectada/chat");

        client =  Stompt.over(SockJs);
        client.connect({}, this.onConnected, this.onError);

        return client
    }
}

export default  WebSocket