import React from 'react';
import ReactDOM from 'react-dom';

//resources
import logo1 from './logo.svg';
import './app.css';

//components
import Menu from './Components/Menu/Menu.js';
import Footer from './Components/Footer/Footer.js';
import Article from './Components/Article/Article';
import { getFeed, getTestData } from './Helpers/feeder.js';
import $ from 'jquery';
import { toArr, toKeys } from './Helpers/keymap.js';

var App = React.createClass({
  getInitialState: function () {
    return getTestData(this);
  },
  componentDidMount: function () {
    getFeed(this);
  },
  renderArticle: function (key) {
    var articles = toArr(this.state.articles);
    var len = Object.keys(articles).length;
    var chunkSize = Math.round(len / 3);
    var column1Articles = articles.slice(0, chunkSize);
    var column2Articles = articles.slice(chunkSize, chunkSize);
    var column3Articles = articles.slice(chunkSize * 2, len - 1);

    column1Articles = toKeys(column1Articles);
    console.log(column1Articles, this.state.articles);

    return (
      <div className="column">
        <Article key={key} index={key} details={this.state.articles[key]} />
      </div>
    )
  },
  render: function () {
    return (
      <div className="app">
        <div className="app-header">
          <menu id="menu"></menu>

          <img src={'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/rss-icon.png'} className="app-logo" alt="logo" />
          <h2>RSS <span>Reader</span></h2>
        </div>

        <section className="container">
          {Object.keys(this.state.articles).map(this.renderArticle)}
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