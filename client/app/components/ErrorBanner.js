import React from 'react';
import {hideElement} from '../util';

export default class ErrorBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      errors: ""
    };
    // ASSUMPTION: There is only one ErrorBanner component ever created.
    // By assigning to 'window', this is a global function. Global functions
    // are not typically a good idea, but they can be useful for adding basic
    // error handling to an application
    window.SoundRoomError = (errorText) => {
      this.setState({
        active: true,
        error: errorText
      })
    };
  }


  removeBanner(e) {
    this.setState({ active: false });
  }

  render() {
    return (
      <div className={"alert alert-warning " + hideElement(!this.state.active)} role="alert">
        SoundRoom was unable to complete a recent request: {this.state.error}
        <button type="button" className="btn btn-sm" id='close-banner' onClick={(e)=>this.removeBanner(e)}>
          <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
        </button>
      </div>
    );
  }
}
