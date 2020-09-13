import React from 'react';
import './menu.css';
import { events, triggerEvent } from '../../Helpers/events.js';

const classNames = require('classnames');

class Menu extends React.Component {
    constructor () {
        super();
        this.state = {
            layout: "list"
        }
    }

    render() {
        // console.log("Menu render", this.state);

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
        const editBtnClassNames = classNames({
            'menu__item': true,
            'menu__item--active': this.props.editMode //this.state.editMode === true
        });


        return (
            <div className="menu">
                <nav className={editBtnClassNames} onClick={this.toggleEditSources.bind(this) }>
                    Edit feeds
                </nav>
                {/* <div className="menu-item-group">
                    <nav className={listBtnClassNames} onClick={this.changeLayout.bind(this) }>
                        <span role="img" aria-label="layout: list">📋</span>
                        List
                    </nav>
                    <nav className={gridBtnClassNames} onClick={this.changeLayout.bind(this) }>
                        <span role="img" aria-label="layout: grid">📦</span>
                        Grid
                    </nav>
                </div> */}
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

    toggleEditSources() {
        const newValue = !this.props.editMode;
        triggerEvent(events.editMode.name, newValue);
        console.log("toggle2", this.state);

    }
};

export default Menu;
