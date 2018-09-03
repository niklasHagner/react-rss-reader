import React from 'react';
import './menu.css';

var Menu = React.createClass({
    render: function () {
        // var details = this.props.details;

        return (
            <div className="menu">
                <nav className="menu__item menu__item--toggle-style"> 🖉 Edit</nav>
                <nav className="menu__item menu__item--log"> ↕ Sort</nav>
            </div>
        )
    }
});

export default Menu;