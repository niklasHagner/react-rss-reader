import React from 'react';

class FeedSource extends React.Component{
    constructor() {
        super();
        this.state = { expanded: false }
    }

    sort(e) {
        if (this && this.state) {
            console.log(this.state.expanded);
        }
    }

    render(item, key) {
        var source = this.props.source;
        var styles = {
            backgroundColor: source.color,
            width: '20px'
        };
        return (
            <div className={'feed-source'} onClick={this.sort} style={styles}>
                {/*<span>{source.url}</span>*/}
            </div>
        )
    }
}

export default FeedSource;