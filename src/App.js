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
import { toArr, toKeys } from './Helpers/keymap.js';

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
    return (
      <div className="column">
        <Article key={`row_${key}`} details={item} />
      </div>
    )
  },
  render: function () {
    var sources = getListOfUrls();
    return (
      <div className="app">
        <div className="app-header">
          <menu id="menu">
          </menu>

          <div className="sources">
            {sources.map((item, index) =>
              <FeedSource key={`source-${index}`} source={item} />
            )}
          </div>

          <img src={'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/rss-icon.png'} className="app-logo" alt="logo" />
          <h2>RSS <span>Reader</span></h2>
        </div>

        <section className="container">
          {this.state.articles.map((item, index) =>
            this.renderArticle(item, index)
          )}
        </section>

        <section id="footer"></section>

      </div>
    )
  }
});

ReactDOM.render(<App />, document.querySelector('#root'));
ReactDOM.render(<Menu />, document.querySelector('#menu'));
ReactDOM.render(<Footer name="Footer" />, document.querySelector('#footer'));


export default App;