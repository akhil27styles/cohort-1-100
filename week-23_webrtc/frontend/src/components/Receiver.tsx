// import { useEffect } from "react"


// export const Receiver = () => {
    
//     useEffect(() => {
//         const socket = new WebSocket('ws://localhost:8080');
//         socket.onopen = () => {
//             socket.send(JSON.stringify({
//                 type: 'receiver'
//             }));
//         }
//         startReceiving(socket);
//     }, []);

//     function startReceiving(socket: WebSocket) {
//        socket.onmessage=async(event)=>{
//         const message=JSON.parse(event.data);
//         if(message.type==='createOffer'){
//             const pc=new RTCPeerConnection();
//             pc.setRemoteDescription(message.sdp);
//             const answer=await pc.createAnswer();
//             await pc.setLocalDescription(answer);
//             socket.send(JSON.stringify({type:'createAnswer',sdp:pc.localDescription}));
//         }
//        }
//     }

//     return <div>
//         Receiver

//     </div>
// }

import { useEffect } from "react"


export const Receiver = () => {
    
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: 'receiver'
            }));
        }
        startReceiving(socket);
    }, []);

    function startReceiving(socket: WebSocket) {
        const video = document.createElement('video');
        document.body.appendChild(video);

        const pc = new RTCPeerConnection();
        pc.ontrack = (event) => {
            video.srcObject = new MediaStream([event.track]);
            video.play();
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'createOffer') {
                pc.setRemoteDescription(message.sdp).then(() => {
                    pc.createAnswer().then((answer) => {
                        pc.setLocalDescription(answer);
                        socket.send(JSON.stringify({
                            type: 'createAnswer',
                            sdp: answer
                        }));
                    });
                });
            } else if (message.type === 'iceCandidate') {
                pc.addIceCandidate(message.candidate);
            }
        }
    }

    return <div>
        Receiver
    </div>
}