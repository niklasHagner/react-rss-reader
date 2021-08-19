import config from '../config.js';
import getFeedUrls from './feedList.js';
// var rssToJson = require('rss-to-json'); //Belongs to solutionAttempt2

var getFeedsAsync = function (reactRoot) {

  return new Promise((resolve, reject) => {
    const cachedData = getCachedData();
    if (cachedData) {
      console.log("resolving with cached data", cachedData);
      return resolve(cachedData);
    }

    var urls = getFeedUrls();
    var promiseArr = [];
    urls.forEach((x, index) => {
      var promise = getSingleFeed(x.url, x.color);
      promiseArr.push(promise);
    });
    Promise.all(promiseArr).then((values) => {
      var feeds = values.map((feed) => {
        return feed.articles;
      });
      var aggregate = [];
      feeds.forEach((item, ix) => {
        aggregate = aggregate.concat(item);
      });
      aggregate = aggregate.sort(function (a, b) {
        return b.pubDate - a.pubDate;
      });
      var reactResult = { articles: aggregate };
      reactResult.saveDate = new Date();
      cacheData(reactResult);
      return resolve(reactResult);
    }).catch(function (e) {
      console.error(e);
      return reject(e);
    });
  });

};

function cacheData(data) {
  localStorage.setItem('react-rss-feeds', JSON.stringify(data));
}

function getCachedData() {
  const storedFeeds = localStorage.getItem('react-rss-feeds');
  if (!storedFeeds) return null;

  const storedData = JSON.parse(storedFeeds);
  if (!storedData) return null;

  if (config.cache && config.cache.mode === "forever") {
    return storedData;
  }
  else if (storedData
    && config.cache
    && config.cache.time
    && new Date().getTime() - new Date(storedData.saveDate).getTime() < config.cache.time
  ) {
    return storedData;
  }
  return null;
}

function getSingleFeed(url, color) {
  return new Promise(function (fulfill, reject) {

    /* //Belongs to solutionAttempt2 */
    // rssToJson.load(url).then((rss) => {
    //   let resultObject = getProcessedResultObj(body);
    //   fulfill(resultObject);
    // });

    /* solution1 */
    fetch(url)
    .then((data) => data.json())
    .then((body) => {
      let resultObject = getProcessedResultObj(body);
      fulfill(resultObject);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    
  });

  function getProcessedResultObj(body) {
    let meta = body.feed;
    let niceTitle = meta.title.split(" ").splice(0, 3).join(" ");
    let articles = body.items.map((x) => {
      x.color = color;
      x.category = niceTitle;
      x.date = x.pubDate;
      x.thumbNail = 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png';
      return x;
    })
    .filter((x) => { return x.title.indexOf("sponsor") < 0; })
   
    var resultObject = {
      articles: articles
    };
    return resultObject;
  }
};

var getFakeApiData = function () {
  return {
    articles: getTestArticles()
  }
};

var getTestArticles = function () {
  return [
    {
      "color": "673AB7",
      "title": "Loading",
      "thumbnail": "",
      "category": "News",
      "description": "",
      "date": new Date()
    },
    {
      "color": "673AB7",
      "title": "Loading",
      "thumbnail": "",
      "category": "News",
      "description": "",
      "date": new Date()
    },
    {
      "color": "673AB7",
      "title": "Loading",
      "thumbnail": "",
      "category": "News",
      "description": "",
      "date": new Date()
    }
  ];
}

export { getFeedsAsync, getFakeApiData, getTestArticles };
