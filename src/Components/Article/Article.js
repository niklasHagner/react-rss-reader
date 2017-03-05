import React from 'react';
import './cards.css';
//import classNames from 'classnames';
var classNames = require('classnames');


var Article = React.createClass({
  getInitialState() {
    return { expanded: false };
  },
  toggleExpand: function (e) {
    console.log(this.state.expanded);
    this.setState({ expanded: !this.state.expanded });
  },
  render: function () {
    var details = this.props.details,
      styles = {
        backgroundColor: details.color
      };
    var classes = [
      'article',

    ];

    var npmClassnames = classNames('btn', this.props.className, {
      'btn-pressed': this.state.isPressed,
      'btn-over': !this.state.isPressed && this.state.isHovered
    });

    var classesConcat = 'article';
    if (this.state.expanded)
      classesConcat += ' article--expanded';

    var classArray = [
      'article',
      this.state.expanded ? 'article--expanded' : '',
    ];

    return (
      <article className={classArray.join(' ')} onClick={this.toggleExpand}>

        <section className="article__header">
          <h3 className="article__category" style={styles}>{details.category}</h3>
          <h2 className="article__title">{details.title}</h2>
        </section>

        <section className="article__description">
          <p dangerouslySetInnerHTML={{ __html: details.description }}></p>
        </section>

      </article>
    )
  },
  componentDidMount: function () {
  },

});

export default Article;