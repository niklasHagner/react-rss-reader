import React from 'react';
import ReactDOM from 'react-dom';

//resources
import './app.css';

//components
import Menu from './Components/Menu/Menu.js';
import Footer from './Components/Footer/Footer.js';
import FeedSource from './Components/Article/Sources';
import Article from './Components/Article/Article';
import { getFeeds, getTestData, getListOfUrls } from './Helpers/feeder.js';
import { chunkify } from './Helpers/arrayhelper.js';

var App = React.createClass({
  getInitialState: function () {
    return getTestData(this);
  },
  componentDidMount: function () {
    getFeeds(this);
  },
  sort: function (sortMethod) {
    var sorted = this.state.articles;
    if (sortMethod === 'date')
      sorted = sorted.sort(function (a, b) {
        return b.pubDate - a.pubDate;
      });
    else if (sortMethod === 'title')
      sorted = sorted.sort(function (a, b) {
        return b.title - a.title;
      });
    this.setState({ articles: sorted });
  },
  renderArticle: function (item, key) {
    if (key === 1)
      console.log(item);
    return (
      <Article key={`row_${key}`} details={item} />
    )
  },
  renderColumnWithArticles: function (articles) {
    return articles.map((item, index) =>
      <section className="column">
        <Article key={`row_${index}`} details={item} />
      </section>
    )
  },
  renderBody: function(articleChunks) {
    if (articleChunks.length < 3) {
      return (
        <div>
          { articleChunks[0].map((item, index) =>  this.renderArticle(item, index))}
        </div>
      );
    } else {
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
      );
    }

  },
  render: function () {
    var sources = getListOfUrls();
    var widthPercentage = Math.round(100 / sources.length);
    var articleChunks = chunkify(this.state.articles, 3, true);
    return (
      <div className="app">
        <header className="app-header">
          <menu id="menu">
          </menu>

          <div className="sources">
            {sources.map((item, index) =>
              <FeedSource key={`source-${index}`} source={item} widthPercentage={widthPercentage} />
            )}
          </div>

          <img src={'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/rss-icon.png'} className="app-logo" alt="logo" />
          <h2>RSS <span>Reader</span></h2>
        </header>

        { this.renderBody(articleChunks) }

        <section id="footer"></section>

      </div>
    )
  }
});

ReactDOM.render(<App />, document.querySelector('#root'));
ReactDOM.render(<Menu />, document.querySelector('#menu'));
ReactDOM.render(<Footer name="Footer" />, document.querySelector('#footer'));


export default App;