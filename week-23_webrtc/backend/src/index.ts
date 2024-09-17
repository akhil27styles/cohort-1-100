import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let senderSocket: any | WebSocket = null;
let receiverSocket: any | WebSocket = null;

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data:any) {
    const message = JSON.parse(data);
    console.log('Received message:', message);
    
    if (message.type === 'sender') {
      senderSocket = ws;
      console.log('Sender connected');
    } else if (message.type === 'receiver') {
      receiverSocket = ws;
      console.log('Receiver connected');
    } else if (message.type === 'createOffer') {
      if (ws !== senderSocket) {
        return;
      }
      console.log('Creating offer...');
      receiverSocket?.send(JSON.stringify({ type: 'createOffer', sdp: message.sdp }));
    } else if (message.type === 'createAnswer') {
      if (ws !== receiverSocket) {
        return;
      }
      console.log('Creating answer...');
      senderSocket?.send(JSON.stringify({ type: 'createAnswer', sdp: message.sdp }));
    } else if (message.type === 'iceCandidate') {
      if (ws === senderSocket) {
        console.log('Sending ice candidate to receiver...');
        receiverSocket?.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }));
      } else if (ws === receiverSocket) {
        console.log('Sending ice candidate to sender...');
        senderSocket?.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }));
      }
    }
  });

  ws.send('something');
});
