import React, { Component } from "react";
import Measure from "./measure";
import Tempo from "./tempo";

class Measures extends Component {
  constructor(props) {
    super(props);
    this.startTime = new Date();
    this.acceptedDifference = 0.4; // in ms
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSpace = this.handleSpace.bind(this);
    this.state = {
      measures: this.getNotes(4)
    };
  }

  componentDidMount() {
    this.noteMarker = {
      // used to keep track of the measure, note index, and elapsed beats seen
      measureIndex: 0,
      noteIndex: 0,
      currentBeat: parseFloat(this.state.measures[0][0].value)
    };
    document.addEventListener("keydown", this.handleKeyDown, false);
  }

  render() {
    return (
      <div>
        <Measure id="measure1" notes={this.state.measures[0]} />
        <Measure id="measure2" notes={this.state.measures[1]} />
        <Measure id="measure3" notes={this.state.measures[2]} />
        <Measure id="measure4" notes={this.state.measures[3]} />
        <Tempo />
      </div>
    );
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
    var spaceTime = new Date();
    var elapsedTime = (spaceTime - this.startTime) / 1000; // in milliseconds
    // updating the marker
    while (
      elapsedTime >
      this.noteMarker.currentBeat + this.acceptedDifference
    ) {
      console.log(elapsedTime);
      console.log(this.noteMarker.currentBeat);
      if (
        this.state.measures[this.noteMarker.measureIndex].length >
        this.noteMarker.noteIndex + 1
      ) {
        this.noteMarker.noteIndex++;
      } else {
        this.noteMarker.measureIndex++;
        this.noteMarker.noteIndex = 0;
      }
      this.noteMarker.currentBeat +=
        parseFloat(
          this.state.measures[this.noteMarker.measureIndex][
            this.noteMarker.noteIndex
          ].value
        ) * 4;
    }
    console.log(this.noteMarker.currentBeat);
    console.log(elapsedTime);
    var diff = Math.abs(this.noteMarker.currentBeat - elapsedTime);

    console.log(diff);
    // Change state using index of measure & note then set that note's hit to false!!!
    if (diff < this.acceptedDifference) {
      const measures = [...this.state.measures];
      //measure[this.noteMarker.noteIndex] = { ...note };
      measures[this.noteMarker.measureIndex][this.noteMarker.noteIndex].hit =
        "true";
      this.setState({ measures });
    }
  }

  // Returns randomized notes that fit in 4 beats
  getNotes(numberOfMeasures) {
    var listOfMeasures = [];
    while (numberOfMeasures > 0) {
      let i = 4;
      let notes = [];
      let index = 1;
      while (i > 0) {
        if (Math.random() > 0.5 || i === 0.5) {
          notes.push({
            id: "note" + index,
            value: ".25",
            hit: "false",
            src:
              "http://exchangedownloads.smarttech.com/public/content/b4/b4611811-841d-4d6d-8093-2e38a0bc1f60/previews/medium/0001.png"
          });
          i -= 0.5;
        } else {
          notes.push({
            id: "note" + index,
            value: ".5",
            hit: "false",
            src:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Quarter_note_with_upwards_stem.svg/614px-Quarter_note_with_upwards_stem.svg.png"
          });
          i -= 1;
        }
        index++;
      }
      numberOfMeasures--;
      listOfMeasures.push(notes);
    }
    return listOfMeasures;
  }
}

export default Measures;
