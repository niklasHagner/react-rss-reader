import React from 'react';

class FeedSource extends React.Component{
    constructor() {
        super();
        this.state = { expanded: false }
    }

    sort(e) {
        console.log(this.state.expanded);
    }

    render(item, key) {
        var source = this.props.source;
        var styles = {
            backgroundColor: source.color,
            width: this.props.widthPercentage + '%'
        };
        return (
            <div className={'feed-source'} onClick={this.sort} style={styles}>
                {/*<span>{source.url}</span>*/}
            </div>
        )
    }
}

export default FeedSource;