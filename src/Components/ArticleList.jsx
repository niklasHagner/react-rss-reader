import React from 'react';
import Error from '../Components/Error.jsx';
import Article from '../Components/Article/Article.jsx';
import { chunkify } from '../Helpers/arrayhelper.js';
import { getTestArticles } from '../Helpers/feeder.js';

class ArticleList extends React.Component {
  constructor () {
    super();
    this.state = {
        articles: [],
        articleChunks: []
    }
  }

  componentDidMount() {
    const articles = getTestArticles();
    this.setState({ articles: articles })
    if (articles.length > 0) {
      const articleChunks = chunkify(articles, 3, true);
      this.setState({articleChunks: articleChunks});
    }
    console.log("ArticleList mounted", this.state);
  }

  renderColumnWithArticles(articles) {
    return articles.map((item, index) =>
      <section className="column">
        <Article key={`row_${index}`} details={item} />
      </section>
    )
  }

  render3ColumnsWithArticles(articleChunks) {
      return (
          <div className="container">
          <section className="column col-1">
            {articleChunks[0].map((item, index) =>
              this.renderArticle(item, index)
            )}
          </section>
          <section className="column col-2">
            {articleChunks[1].map((item, index) =>
              this.renderArticle(item, index)
            )}
          </section>
          <section className="column col-3">
            {articleChunks[2].map((item, index) =>
              this.renderArticle(item, index)
            )}
          </section>
        </div>
    )
  }

  render() {
    const articleChunks = this.state.articleChunks;
    if (articleChunks.length === 0) {
      return (<Error message="no articles" />);
    }
    else if (articleChunks.length < 3) {
      return (
        <div>
          { articleChunks[0].map((item, index) =>  this.renderArticle(item, index))}
        </div>
      );
    } else {
      return this.render3ColumnsWithArticles(articleChunks);
    }
  }

  renderArticle(item, key) {
    if (key === 1)
      console.log(item);
    return (
      <Article key={`row_${key}`} details={item} />
    )
  }
}

export default ArticleList;
