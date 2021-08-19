import React, { Component } from 'react';
import './reader-view.css';

export default class extends Component {
  render() {
    const article = this.props.article;

    return (
      <div className="reader-view">
        { (article && article.title) ? this.renderArticle(article) : <h1>Reader View</h1>  }
      </div>
    )
  }

  renderArticle(article){
    return (
      <article>
        <h1>{article.title}</h1>
        <section className="article__header">
          <h3 className="article__category"><icon style={article.styles}></icon>{article.category}</h3>
        </section>

        <section className="article__description">
          <p dangerouslySetInnerHTML={{ __html: article.description }}></p>
        </section>

        <footer className="article__meta">
          <a target="_blank" href={article.link}>original article</a>
        </footer>

      </article>
    )
  }
}
