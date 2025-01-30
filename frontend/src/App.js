import React, { useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import Peer from 'simple-peer';

function App() {
  const [peer, setPeer] = useState(null);
  const [myStream, setMyStream] = useState(null);

  useEffect(() => {
    // Set up PixiJS
    const app = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
    });
    document.getElementById('pixi-container').appendChild(app.view);

    // Create a circle (representing the user)
    const circle = new PIXI.Graphics();
    circle.beginFill(0x9966ff);
    circle.drawCircle(400, 300, 50);
    circle.endFill();
    app.stage.addChild(circle);

    // Access user's media (audio/video)
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setMyStream(stream);
      })
      .catch((err) => {
        console.error('Error accessing media devices', err);
      });
  }, []);

  const createPeer = () => {
    const newPeer = new Peer({ initiator: true, trickle: false, stream: myStream });
    newPeer.on('signal', (data) => {
      console.log('Signal Data: ', data);
      // Send the signal data to the remote peer through Socket.io
    });
    newPeer.on('stream', (stream) => {
      // Handle the remote stream (audio/video)
    });
    setPeer(newPeer);
  };

  return (
    <div>
      <h1>2D Metaverse</h1>
      <button onClick={createPeer}>Start Video Chat</button>
      <div id="pixi-container"></div>
    </div>
  );
}

export default App;
