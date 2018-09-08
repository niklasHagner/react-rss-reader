import React, { Component } from 'react';

export default class extends Component {
  render() {
    return (
      <div className="error-container">
        <h1>Error</h1>
        <p>{this.props.message}</p>
      </div>
    )
  }
}