import React from 'react';
import { events, triggerEvent } from '../../Helpers/events.js';
import './article-list.css';


class Article extends React.Component {
  constructor () {
    super();
    this.state = {
        article: null,
        expanded: false,
        selected: false
    }
  }

  componentDidMount() {
    this.setState({ article: this.props.article });
  }

  componentDidUpdate() {
    if (this.props
      && typeof(this.props.isSelected) === "boolean"
      && this.props.isSelected !== this.state.selected) {
      this.setState({ selected: this.props.isSelected });
    }
  }

  clickArticle() {
    if (this.props.layout === "list") {
      this.setState({ expanded: !this.state.expanded });
    } else {
      this.setState({ selected: !this.state.selected });
      triggerEvent(events.selectArticle.name, this.props.article);
    }
  }

  render() {
    var article = this.props.article;

    if (this.state.selected)
      console.log("selected article", article.title);

    if (!article) return null;

    var styles = {
      backgroundColor: article.color
    };
    var classArray = [
      'article',
      this.state.expanded ? 'article--expanded' : '',
      this.state.selected ? 'article--selected' : ''
    ];

    return (
      <article className={classArray.join(' ')} onClick={this.clickArticle.bind(this)}>
        <section className="article__header">
          <h3 className="article__category"><icon style={styles}></icon>{article.category}</h3>
          <h2 className="article__title">{article.title}</h2>
        </section>

        <section className="article__description">
          <p dangerouslySetInnerHTML={{ __html: article.description }}></p>
        </section>
      </article>
    )
  }
};

export default Article;
