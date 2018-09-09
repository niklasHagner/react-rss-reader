import $ from 'jquery';
import config from '../config.js';

function setUrl(rssUrl) {
  rssUrl = encodeURIComponent(rssUrl);
  return `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}&_=1488646585321`;
}
function getListOfUrls() {
  var urls = [
    { url: 'http://feeds.feedburner.com/alistapart/main', color: 'tan' },
    { url: 'https://www.smashingmagazine.com/feed/', color: '#e95c33' },
    { url: 'http://feeds.feedburner.com/CssTricks', color: 'rgb(255, 152, 0)' },
    { url: 'http://rss.slashdot.org/Slashdot/slashdotMain', color: 'lightblue' },
    { url: 'http://feeds.feedburner.com/Devlounge', color: 'dodgerblue' },
    { url: 'http://dn.se/rss', color: 'rgb(244, 0, 14)' },
    { url: 'http://javascriptweekly.com/rss/14j0bm2k', color: 'mediumseagreen' },
    { url: 'https://hacks.mozilla.org/feed/', color: 'orangered' },
    { url: 'http://blog.chromium.org/feeds/posts/default', color: 'lightgreen' },
    { url: 'http://feeds.feedburner.com/456bereastreet', color: 'violet' },
    { url: 'http://www.quirksmode.org/blog/index.xml', color: 'darkgray' },
    { url: 'http://feeds.feedburner.com/FunctioningForm', color: 'pink' },
    { url: 'https://javascriptweblog.wordpress.com/feed/', color: 'peachpuff' },
    { url: 'https://code-cartoons.com/feed', color: 'blue' },
    { url: 'https://toddmotto.com/feed.xml', color: 'purple' },
    { url: 'https://feeds.feedburner.com/codinghorror', color: '#555' },
  ];

  urls = urls.map((item) => {
    item.url = setUrl(item.url);
    return item;
  });
  return urls;
}
var getFeedsAsync = function (reactRoot) {

  return new Promise((resolve, reject) => {
    const cachedData = getCachedData();
    if (cachedData) {
      console.log("resolving with cached data", cachedData);
      return resolve(cachedData);
    }

    var urls = getListOfUrls();
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

export { getFeedsAsync, getFakeApiData, getTestArticles, getListOfUrls };
