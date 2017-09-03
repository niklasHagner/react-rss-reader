import React from 'react';
import './menu.css';

var Menu = React.createClass({
    render: function () {
        var details = this.props.details,
            menuItemCss = {
                // minWidth: '50px',
            };

        return (
            <div className="menu">
                <nav className="menu__item menu__item--toggle-style" style={menuItemCss}> 🖉 Edit</nav>
                <nav className="menu__item menu__item--log" style={menuItemCss}> ↕ Sort</nav>
            </div>
        )
    }
});

export default Menu;