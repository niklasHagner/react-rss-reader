import $ from 'jquery';
import { toArr, toKeys } from './keymap.js';

var sources = [];

function setUrl(rssUrl) {
    rssUrl = encodeURIComponent(rssUrl);
    return `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}&_=1488646585321`;
}
function getListOfUrls() {
    var urls = [
        { url: 'http://feeds.feedburner.com/alistapart/main', color: 'tan' },
        { url: 'https://www.smashingmagazine.com/feed/', color: '#e95c33' },
        { url: 'http://feeds.feedburner.com/CssTricks', color: 'rgb(255, 152, 0)' },
        { url: 'http://feeds2.feedburner.com/onextrapixel', color: 'lightblue' },
        { url: 'http://feeds.feedburner.com/Devlounge', color: 'dodgerblue' },
        { url: 'http://dn.se/rss', color: 'rgb(244, 0, 14)' },
        { url: 'http://javascriptweekly.com/rss/14j0bm2k', color: 'mediumseagreen' },
        { url: 'https://hacks.mozilla.org/feed/', color: 'orangered' },
        { url: 'http://blog.chromium.org/feeds/posts/default', color: 'lightgreen' },
        { url: 'http://feeds.feedburner.com/456bereastreet', color: 'violet' },
        { url: 'http://www.quirksmode.org/blog/index.xml', color: 'darkgray' },
        { url: 'http://feeds.feedburner.com/FunctioningForm', color: 'pink' },
        { url: 'http://feeds.feedburner.com/FunctioningForm', color: 'peachpuff' },
        { url: 'https://code-cartoons.com/feed', color: 'blue' },
        { url: 'https://toddmotto.com/feed.xml', color: 'purple' },
        { url: 'https://feeds.feedburner.com/codinghorror', color: '#555' },

    ];
    urls.forEach((item) => {
        item.url = setUrl(item.url);
    });
    return urls;
}
var getFeeds = function (reactRoot) {
    var urls = getListOfUrls();
    var promiseArr = [];
    urls.forEach((x, index) => {
        var promise = getSingleFeed(x.url, x.color);
        promiseArr.push(promise);
    });
    Promise.all(promiseArr).then((values) => {
        var feeds = values.map((x) => {
            return x.articles;
        });
        var aggregate = [];
        feeds.forEach((item, ix) => {
            aggregate = aggregate.concat(item);
        });
        aggregate = aggregate.sort(function (a, b) {
            return b.pubDate - a.pubDate;
        });
        var reactResult = { articles: aggregate };
        reactRoot.setState(reactResult);
    }).catch(function (e) {
        console.error(e);
    });

};

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


var getTestData = function () {
    return {
        articles: [
            {
                "color": "FEC006",
                "title": "Snow in Turkey Brings Travel Woes",
                "thumbnail": "",
                "category": "News",
                "description": "Heavy snowstorm in Turkey creates havoc as hundreds of villages left without power, and hundreds of roads closed",
                "date": new Date()
            },
            {
                "color": "2196F3",
                "title": "Landslide Leaving Thousands Homeless",
                "thumbnail": "",
                "category": "News",
                "description": "An aburt landslide in the Silcon Valley has left thousands homeless and on the streets.",
                "date": new Date()
            },
            {
                "color": "FE5621",
                "title": "Hail the size of baseballs in New York",
                "thumbnail": "",
                "category": "News",
                "description": "A rare and unexpected event occurred today as hail the size of snowball hits New York citizens.",
                "date": new Date()
            },
            {
                "color": "673AB7",
                "title": "Earthquake destorying San Fransisco",
                "thumbnail": "",
                "category": "News",
                "description": "A massive earthquake just hit San Fransisco leaving behind a giant crater.",
                "date": new Date()
            }
        ]
    }
};

export { getFeeds, getTestData, getListOfUrls };