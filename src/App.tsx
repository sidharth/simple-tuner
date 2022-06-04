import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  useEffect(() => {
    startListening()
  }, [])

  return (
    <div className="App">
      Hello world!
    </div>
  );
}

function startListening() {
  navigator.mediaDevices.getUserMedia({audio: true, video: false})
    .then(mediaStream => {
      // Setup audio source
      let audioContext = new AudioContext()
      let audioSource = audioContext.createMediaStreamSource(mediaStream)

      // Set up analyzer.
      let analyzerNode = audioContext.createAnalyser()
      analyzerNode.fftSize = 2048

      // Feed in audio data to analyzer.
      audioSource.connect(analyzerNode)

      processAudioBuffer(analyzerNode)
    })
}

function processAudioBuffer(analyzer: AnalyserNode) {
  let bufferLength = analyzer.frequencyBinCount
  let audioArray = new Uint8Array(bufferLength)

  analyzer.getByteTimeDomainData(audioArray)
  for (let i=0; i<bufferLength; i++) {
    let sample = audioArray[i]
  }
  // processAudioBuffer(analyzer)
}

export default App;
