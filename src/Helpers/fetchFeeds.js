import $ from 'jquery';
import config from '../config.js';
import getFeedUrls from './feedList.js';

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
    Promise.all(promiseArr).map(p => p.catch(e => {console.error(e);})).then((values) => {
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
    $.get(url, (result) => {
      if (result.error) {
        console.error("Feed error");
        return;
      }
      var meta = result.feed;
      meta.title = meta.title.split(" ").splice(0, 3).join(" ");
      var articles = result.items;
      articles = articles.map((x) => {
        x.color = color;
        x.category = meta.title;
        x.date = x.pubDate;
        x.thumbNail = 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png';
        return x;
      }).filter((x) => { return x.title.indexOf("sponsor") < 0; })
      var resultObject = {
        articles: articles
      };
      fulfill(resultObject);
    });
  });
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
