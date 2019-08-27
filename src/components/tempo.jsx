import React, { Component } from "react";
import soundfile from "assets/beat.wav";
import Sound from "react-sound";

class Tempo extends Component {
  constructor(props) {
    super(props);
    this.audio = new Audio(soundfile);
    this.state = {
      on: false
    };
  }
  state = {
    on: false
  };
  render() {
    return (
      <>
        <div onClick={this.beginTempo()}>Play</div>
        <audio ref={ref => (this.player = ref)} />
      </>
    );
  }

  beginTempo() {
    this.setState({ on: true });
    var intrvl = setInterval("sound()", 1000); // play beat every second
  }

  sound() {
    this.audio.play();
  }
}

export default Tempo;
