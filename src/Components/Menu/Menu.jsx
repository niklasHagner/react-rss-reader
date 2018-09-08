import React from 'react';
import './menu.css';
const classNames = require('classnames');

class Menu extends React.Component {
    constructor () {
        super();
        this.state = {
            layout: "list"
        }
    }
    render() {
        const gridBtnClassNames = classNames({
            'menu__item': true,
            'menu__item--radio': true,
            'men__item--active': this.state.activeLayout === "grid"
        });
        const listBtnClassNames = classNames({
            'menu__item': true,
            'menu__item--radio': true,
            'men__item--active': this.state.activeLayout === "list"
        });

        return (
            <div className="menu">
                <nav className="menu__item">
                    <span role="img" aria-label="edit feeds">✍️</span>
                    Edit
                </nav>
                <nav className="menu__item"> ↕ Sort</nav>
                <div className="menu-item-group">
                    <nav className={listBtnClassNames} onClick={this.changeCssFile}> 
                        <span role="img" aria-label="layout: list">📋</span> 
                        List
                    </nav>
                    <nav className={gridBtnClassNames} onClick={this.changeCssFile}> 
                        <span role="img" aria-label="layout: grid">📦</span> 
                        Grid
                    </nav>
                </div>
            </div>
        )
    }
    changeLayout() {
        if (this.state.layout === "grid") {
            this.setState({ layout: "list" });
        } else {
            this.setState({ layout: "grid" });
        }
    }
};

export default Menu;