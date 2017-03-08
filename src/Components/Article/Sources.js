import React from 'react';
// import { getFeeds, getTestData } from '../../Helpers/feeder.js';
// import $ from 'jquery';
// import { toArr, toKeys } from '../../Helpers/keymap.js';

var FeedSource = React.createClass({
    getInitialState() {
        return { sources: null };
    },
    componentDidMount: function () {
    },
    sort: function (e) {
        console.log(this.state.expanded);
        //this.setState({ expanded: !this.state.expanded });
    },
    render: function (item, key) {
        var source = this.props.source;
        var styles = {
            backgroundColor: source.color
        };
        return (
            <div className={'feed-source'} onClick={this.sort} style={styles}>
                {/*<span>{source.url}</span>*/}
            </div>
        )
    }
});

export default FeedSource;