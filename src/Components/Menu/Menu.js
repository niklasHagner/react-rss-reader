import React from 'react';
import './menu.css';

var Menu = React.createClass({
    render: function () {
        var details = this.props.details,
            menuCss = {
                // position: 'absolute',
                // top: '2px'
            },
            menuItemCss = {
                // backgroundColor: 'rgba(100,100,100,0.5)',
                // minWidth: '50px',
                // maxWidth: '100px',
                // margin: '10px 5px',
                // padding: '5px',
                // fontFamily: 'Helvetica, sans-serif',
                // display: 'inline-block',
            };

        return (
            <menu className="menu" style={menuCss}>
                <nav className="menu__item menu__item--toggle-style" style={menuItemCss}> 🖉 Edit</nav>
                <nav className="menu__item menu__item--log" style={menuItemCss}> ↕ Sort</nav>
            </menu>
        )
    }
});

export default Menu;