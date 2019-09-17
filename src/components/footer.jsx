import React, { Component } from "react";

class Footer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="footer interface">
        <a
          href="#"
          className={this.getFooterClasses()}
          onClick={this.props.beginTempo}
        ></a>
      </div>
    );
  }

  getFooterClasses() {
    let classes = "play";
    classes += this.props.active ? " active" : "";

    return classes;
  }
}

export default Footer;
