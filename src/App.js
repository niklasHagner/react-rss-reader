import React from 'react';
import ReactDOM from 'react-dom';

//resources
import './app.css';

//components
import Menu from './Components/Menu/Menu.jsx';
import Footer from './Components/Footer/Footer.jsx';
import FeedSource from './Components/Article/Sources.jsx';
import ArticleList from './Components/ArticleList.jsx';

import { getFeeds, getListOfUrls } from './Helpers/feeder.js';
import loadStyleSheet from './Helpers/loadStyleSheet.js';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      articles: [],
      layouts: [ {name:"list", active: true}, {name:"grid", active: false} ]
    };
    console.log("App", this.state);
  }

  componentDidMount() {
    this.setLayout();
    getFeeds(this);
  }

  sort(sortMethod) {
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
  }

  setLayout() {
    if(this.state.layout === "list") {
      loadStyleSheet("./articles-list");
    }
    else {
      loadStyleSheet("./articles-grid");
    }
  }

  render() {
    var sources = getListOfUrls();
    var widthPercentage = Math.round(100 / sources.length);
    return (
      <div className="app">
        <header className="app-header">
          <Menu />

          <div className="sources">
            {sources.map((item, index) =>
              <FeedSource key={`source-${index}`} source={item} widthPercentage={widthPercentage} />
            )}
          </div>

          <img src={'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/emojione/151/newspaper_1f4f0.png'} className="app-logo" alt="logo" />
          <h2>RSS <span>Reader</span></h2>
        </header>

        <ArticleList />

        <Footer name="Footer" />

      </div>
    )
  }
};

ReactDOM.render(<App />, document.querySelector('#root'));


export default App;
