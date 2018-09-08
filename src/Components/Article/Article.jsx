import React from 'react';
import './article-list.css';


class Article extends React.Component {
  constructor () {
    super();
    this.state = {
        expanded: false
    }
  }

  toggleExpand(e) {
    console.log(this.state.expanded);
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    var details = this.props.details,
      styles = {
        backgroundColor: details.color
      };

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
  }
};

export default Article;
