import React from 'react';
import Error from '../Components/Error.jsx';
import Article from '../Components/Article/Article.jsx';
import { chunkify } from '../Helpers/arrayhelper.js';
import { getFeedsAsync } from '../Helpers/fetchFeeds.js';
import { events, triggerEvent } from '../Helpers/events.js';


class ArticleList extends React.Component {
  constructor () {
    super();
    this.state = {
        articles: [],
        articleChunks: [],
        layoutName: null
    }
    this.articleChunks = null
  }

  componentDidMount() {
    // console.log("Article List mount", this.props);
    const layoutName = this.props.layout;

    getFeedsAsync()
    .then((response) => {
      const articles = response.articles;
      this.setState({ articles: articles });
      console.log("ArticleList fetched feeds", this.state);

        if (articles.length > 0) {
          let articleChunks;
          if ( layoutName === "grid") {
            articleChunks = chunkify(articles, 3, true);
          } else {
            triggerEvent(events.selectArticle.name, articles[0]);
            articleChunks = chunkify(articles, 1, true);
          }

          this.articleChunks = articleChunks;
        }
    })
    .catch((error) => {
      console.error(error);
    })

  }

  componentDidUpdate() {
    // console.log("Article List update", this.props);
    const layoutName = this.props.layout;

    let articleChunks;
    if ( layoutName === "grid") {
          articleChunks = chunkify(this.state.articles, 3, true);
        } else {
          articleChunks = chunkify(this.state.articles, 1, true);
        }

    this.articleChunks = articleChunks;
  }

  render() {
    // const articleChunks = this.state.articleChunks;
         let articleChunks =  this.articleChunks;

    if (!articleChunks || articleChunks.length === 0) {
      return (<Error message="no articles" />);
    }
    else if ( this.props.layout === "list") {
      return (<div> { this.renderSingleColumn(this.state.articles) }</div>)
    }
    else {
      return this.renderThreeColumns(articleChunks);
    }
  }

  renderSingleColumn(articles) {
    return (
      <section className="reading-list">
        {
          articles.map((item, index) => <Article key={index} article={item} />)
        }
      </section>
    )
  }

  renderThreeColumns(articleChunks) {
    return (
      <div className="container">
      <section className="column col-1">
        {articleChunks[0].map((item, index) =>
          this.renderArticle(item, '1_'+index)
        )}
      </section>
      <section className="column col-2">
        {articleChunks[1].map((item, index) =>
          this.renderArticle(item, '2_'+index)
        )}
      </section>
      <section className="column col-3">
        {articleChunks[2].map((item, index) =>
          this.renderArticle(item, '3_'+index)
        )}
      </section>
    </div>
    )
  }


  renderArticle(item, key) {
    return (
      <Article key={`row_${key}`} article={item} />
    )
  }
}

export default ArticleList;
