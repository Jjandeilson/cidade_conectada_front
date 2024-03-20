

const WebSocket = {
    login: async function() {
        let client;
        const Stompt =  require('stompjs');
        var SockJs = require('sockjs-client');

        SockJs = new SockJs("https://cidadeconectadateste-production.up.railway.app/cidade-conectada/chat");

        client =  Stompt.over(SockJs);
        client.connect({}, this.onConnected, this.onError);

        return client
    }
}

export default  WebSocket