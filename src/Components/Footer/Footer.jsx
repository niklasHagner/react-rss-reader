import React from 'react';
import './footer.css';

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <h1>{this.props.name}</h1>
      </div>
    );
  }
}
export default Footer;