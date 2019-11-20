import React, { Component } from "react";
import Measure from "./measure";
import PlayButton from "./playButton";
import ResetButton from "./resetButton";
import Points from "./points";
import Timer from "./timer";
import Instructions from "./instructions";
import soundfile from "../assets/beat.wav";
import Streak from "./streak";

class Measures extends Component {
  constructor(props) {
    super(props);
    this.audio = new Audio(soundfile);
    this.acceptedDifference = 0.3; // in sec
    this.elapsedTime = 0; // used to keep track of time since game started taking into account pauses
    this.points = 0;
    this.lineNumber = 1; // used to rotate measures, mod 1 corresponds to top measures, mod 0 corresponds to bottom measures
    this.timeOuts = [];
    this.timerAnimation = "";
    this.streak = 0;

    //bind functions
    this.rotateMeasures = this.rotateMeasures.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.getNotes = this.getNotes.bind(this);
    this.handleSpace = this.handleSpace.bind(this);
    this.beat = this.beat.bind(this);
    this.endGame = this.endGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.state = {
      measures: this.getNotes(4),
      on: false,
      finished: false,
      started: false
    };
  }

  componentDidMount() {
    this.noteMarker = {
      // used to keep track of the measure, note index, and elapsed beats seen
      measureIndex: 0,
      noteIndex: 0,
      currentBeat: 0
    };
    document.addEventListener("keydown", this.handleKeyDown, false);
  }

  render() {
    return (
      <div className="app" onClick={this.handleSpace}>
        <Points points={this.points} />
        <Measure id="measure1" notes={this.state.measures[0]} />
        <Measure id="measure2" notes={this.state.measures[1]} />
        <Measure id="measure3" notes={this.state.measures[2]} />
        <Measure id="measure4" notes={this.state.measures[3]} />
        <Instructions active={this.state.started} />
        <PlayButton beginTempo={this.handlePlayClick} active={this.state.on} />
        <ResetButton resetGame={this.resetGame} />
        <Timer active={this.state.on} animation={this.timerAnimation} />
        <Streak streak={this.streak} />
      </div>
    );
  }

  resetIntervals() {
    if (this.elapsedTime) {
      this.timeOuts.push(
        setTimeout(this.beat, 1000 - (this.elapsedTime % 1000))
      );
      this.timeOuts.push(
        setTimeout(this.rotateMeasures, 4000 - (this.elapsedTime % 4000))
      );

      this.timeOuts.push(
        setTimeout(() => {
          this.interval = setInterval(this.beat, 1000);
        }, 1000 - (this.elapsedTime % 1000))
      ); // play beat every second
      this.timeOuts.push(
        setTimeout(() => {
          this.rotateInterval = setInterval(this.rotateMeasures, 4000);
        }, 4000 - (this.elapsedTime % 4000))
      );
      //rotate measures
    } else {
      this.interval = setInterval(this.beat, 1000);

      this.rotateInterval = setInterval(this.rotateMeasures, 4000);
    }
  }

  clearTimeouts() {
    this.timeOuts.forEach(x => {
      clearTimeout(x);
    });
  }

  handlePlayClick() {
    if (!this.state.finished) {
      this.setState({ on: !this.state.on, started: true }, () => {
        if (this.state.on) {
          this.resetIntervals();
          this.timeOuts.push(
            setTimeout(this.endGame, 60000 - this.elapsedTime)
          );
          this.startTime = new Date();
        } else {
          this.elapsedTime += new Date() - this.startTime; // in milliseconds
          clearInterval(this.interval);
          this.clearTimeouts();
          clearInterval(this.rotateInterval);
        }
      });
    } /*
     else if (!this.state.finished) {
        
      }*/
  }

  rotateMeasures() {
    this.rotateMeasuresTimeout = setTimeout(() => {
      var newMeasures = this.getNotes(1);
      const replacementMeasures = this.state.measures.slice();
      var modNum = this.lineNumber % 4;
      if (modNum === 1) {
        // the first line of measures
        replacementMeasures[0] = newMeasures[0];
      } else if (modNum === 2) {
        // the second line of measures
        replacementMeasures[1] = newMeasures[0];
      } else if (modNum === 3) {
        // the third line of measures
        replacementMeasures[2] = newMeasures[0];
      } else if (modNum === 0) {
        // the fourth line of measures
        replacementMeasures[3] = newMeasures[0];
      }
      // move the marker before update
      this.updateMarker();
      this.setState({ measures: replacementMeasures });
      // State doesn't update unless setState is called twice
      this.setState({});
      this.lineNumber++;
    }, 2000);
  }

  updateMarker() {
    var currentDate = new Date();
    var elapsedTime = (currentDate - this.startTime + this.elapsedTime) / 1000;
    while (
      this.state.measures[this.noteMarker.measureIndex % 4][
        this.noteMarker.noteIndex
      ].hit === "true" ||
      elapsedTime > this.noteMarker.currentBeat + this.acceptedDifference
    ) {
      this.noteMarker.currentBeat +=
        parseFloat(
          this.state.measures[this.noteMarker.measureIndex % 4][
            this.noteMarker.noteIndex
          ].value
        ) * 4;

      if (
        this.state.measures[this.noteMarker.measureIndex % 4].length >
        this.noteMarker.noteIndex + 1
      ) {
        this.noteMarker.noteIndex++;
      } else {
        this.noteMarker.measureIndex++;
        this.noteMarker.noteIndex = 0;
      }
    }
  }

  endGame() {
    clearInterval(this.interval);
    clearInterval(this.rotateInterval);
    clearTimeout(this.rotateMeasuresTimeout);
    this.elapsedTime = 0;
    this.setState({ finished: true });
  }

  resetGame() {
    window.location.reload(false);
  }

  beat() {
    this.audio.play();
    console.log(this.elapsedTime);
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
      case 32:
        this.handleSpace();
        break;
      default:
        break;
    }
  }

  handleSpace() {
    if (this.state.on && !this.state.finished) {
      var currentDate = new Date();
      var elapsedTime =
        (currentDate - this.startTime + this.elapsedTime) / 1000;
      // elapsedTime -= 5; // 4 second delay

      const measures = [...this.state.measures];

      // update the marker
      this.updateMarker();

      var diff = Math.abs(this.noteMarker.currentBeat - elapsedTime);

      // Change state using index of measure & note then set that note's hit to false
      if (diff < this.acceptedDifference) {
        //measure[this.noteMarker.noteIndex] = { ...note };
        if (
          measures[this.noteMarker.measureIndex % 4][this.noteMarker.noteIndex]
            .type != "rest"
        ) {
          measures[this.noteMarker.measureIndex % 4][
            this.noteMarker.noteIndex
          ].hit = "true";
          this.points +=
            parseFloat(
              this.state.measures[this.noteMarker.measureIndex % 4][
                this.noteMarker.noteIndex
              ].value
            ) * 8;
          this.setState({ measures });
          this.streak++;
        } else {
          this.streak = 0;
        }
      } else {
        this.streak = 0;
      }
    }
  }

  // Returns randomized notes that fit in 4 beats
  getNotes(numberOfMeasures) {
    var listOfMeasures = [];
    let color = 0;
    while (numberOfMeasures > 0) {
      let i = 4;
      let notes = [];
      let index = 1;
      while (i > 0) {
        var rand = Math.random();
        var col;
        if (color % 3 == 0) {
          col = "b";
        } else if (color % 3 == 1) {
          col = "g";
        } else {
          col = "p";
        }
        if (rand > 0.8 || i % 1 === 0.5) {
          if (rand > 0.8) {
            notes.push({
              id: "note" + index,
              type: "note",
              value: ".125",
              hit: "false",
              src: col + "4.svg"
            });
          } else {
            notes.push({
              id: "rest" + index,
              type: "rest",
              value: ".125",
              hit: "false",
              src: "eighthRest.svg"
            });
          }
          i -= 0.5;
        } else if (rand > 0.275) {
          notes.push({
            id: "note" + index,
            type: "note",
            value: ".25",
            hit: "false",
            src: col + "1.svg"
          });
          i -= 1;
        } else {
          notes.push({
            id: "rest" + index,
            type: "rest",
            value: ".25",
            hit: "false",
            src: "quarterRest.svg"
          });
          i -= 1;
        }
        index++;
        color++;
      }
      numberOfMeasures--;
      listOfMeasures.push(notes);
    }
    return listOfMeasures;
  }
}

export default Measures;
