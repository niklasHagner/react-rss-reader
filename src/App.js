import React from 'react';
import ReactDOM from 'react-dom';

//resources
import './app.css';

//components
import Menu from './Components/Menu/Menu.jsx';
import Footer from './Components/Footer/Footer.jsx';
import FeedSource from './Components/FeedSource/Source.jsx';
import ArticleList from './Components/ArticleList.jsx';
import ReaderView from './Components/Reader/ReaderView.jsx';

//helpers
import { getListOfUrls } from './Helpers/fetchFeeds.js';
import loadStyleSheet from './Helpers/loadStyleSheet.js';
import { events } from './Helpers/events.js';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      sources: [],
      articles: [],
      selectedArticle: null,
      layouts: [ {name:"list", active: true}, {name:"grid", active: false} ],
      editMode: false,
    };
    console.log("App", this.state);
  }

  componentDidMount() {
    document.addEventListener(events.selectArticle.name, this.selectArticle.bind(this));
    document.addEventListener(events.editMode.name, this.enableSourcesEditMode.bind(this));

    this.setState({ sources: getListOfUrls() });
    this.setLayout();
  }

  render() {
    // const activeLayoutName = this.state.layouts.find(layout => layout.active).name;
    // console.log("active layout", activeLayoutName);
    const sources = this.state.sources;

    const widthPercentage = Math.round(100 / sources.length);

    const sourcesClassNames = [
      "sources-list",
      this.state.editMode ? "" : "hidden"
    ];

    console.log("APP RENDER:", sourcesClassNames, "editMode", this.state.editMode);

    return (
      <div className="app">
        <header className="app-header">
          <Menu editMode={this.state.editMode} />

          <div className="sources">
            {sources.map((item, index) =>
              <FeedSource key={`source-${index}`} source={item} widthPercentage={widthPercentage} />
            )}
          </div>

          <div className={sourcesClassNames.join(" ")}>
            {sources.map((item, index) =>
              <div key={index}>
                <span className="icon--delete-feed" onClick={ () => this.deleteFeed(item) } rel="icon" aria-label="remove feed">🗑️</span>
                <input type="text" onChange={ () => this.changeFeedSource(item) }
                value={ decodeURIComponent(item.url).replace("https://", "").replace("http://", "").replace("http").replace("www.", "").replace("api.rss2json.com/v1/api.json?rss_url=", "").replace(".xml", "").replace("undefineds://", "") }></input>
                <span className="source-color-icon" style={ { backgroundColor: item.color} }></span>
              </div>
            )}
          </div>

          <img src={'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/emojione/151/newspaper_1f4f0.png'} className="app-logo" alt="logo" />
          <h2>RSS <span>READER</span></h2>
        </header>

        <ArticleList layout={ "list" } />

        { 4 > 2 ? <ReaderView article={ this.state.selectedArticle } /> : null }

        <Footer name="Footer" />

      </div>
    )
  }
  changeFeedSource(source) {
    console.log("changing feed", source);
  }

  deleteFeed(sourceToRemove) {
    let sourcesArray = this.state.sources;
    // const sourceToRemove = sources.find(s => s.url.indexOf(url));
    sourcesArray.splice(sourcesArray.indexOf(sourceToRemove), 1);
    this.setState({sources: sourcesArray });
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
    if(this.state.layouts.some(layout => layout.active && layout.name === "list")) {
      loadStyleSheet("src/Components/Article/articles-list.css");
    }
    else {
      loadStyleSheet("src/Components/Article/articles-grid.css");
    }
  }

  selectArticle(event) {
    const article = event.detail;
    console.log("received a message", article);
    this.setState({selectedArticle: article});
  }

  enableSourcesEditMode(event) {
    const enabled = event.detail;
    console.log("received a message", enabled);
    this.setState({editMode: enabled});
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));


export default App;
