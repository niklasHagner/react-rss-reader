import getApiKey from './getApiKey.js'

var feeds = [
  { url: 'http://rss.slashdot.org/Slashdot/slashdotMain', color: 'lightblue' },
  { url: 'http://javascriptweekly.com/rss/14j0bm2k', color: 'mediumseagreen' },
  { url: 'http://www.quirksmode.org/blog/index.xml', color: 'darkgray' },
  { url: 'http://blog.chromium.org/feeds/posts/default', color: 'darkgreen' },
  { url: 'http://feeds.feedburner.com/alistapart/main', color: 'tan' },
  { url: 'https://www.smashingmagazine.com/feed/', color: '#e95c33' },
  { url: 'http://feeds.feedburner.com/CssTricks', color: 'rgb(255, 152, 0)' },
  { url: 'http://feeds.feedburner.com/Devlounge', color: 'dodgerblue' },
  { url: 'https://hacks.mozilla.org/feed/', color: 'orangered' },
  { url: 'http://feeds.feedburner.com/FunctioningForm', color: 'pink' },
  { url: 'https://javascriptweblog.wordpress.com/feed/', color: '#900C3F' },
  { url: 'https://code-cartoons.com/feed', color: 'blue' },
  { url: 'https://www.joelonsoftware.com/feed/', color: 'gold' },
  { url: 'https://blog.codinghorror.com/rss/', color: 'magenta' },
  { url: 'http://feeds.feedburner.com/37signals/beMH', color: '#999' },
  { url: 'http://steve-yegge.blogspot.com/feeds/posts/default', color: '#568be1' },
  { url: 'https://www.reddit.com/r/programming/.rss', color: '#a7e156' },
];

const apiKey = getApiKey();

function getUrlForRss2jsonApi(rssUrl) {
  rssUrl = encodeURIComponent(rssUrl);
  return `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}&api_key=${apiKey}`;
}

export default function getFeedUrls() {
  /* SolutionAttempt1 - with rss2json */
  let urls = feeds.map((item) => {
    item.url = getUrlForRss2jsonApi(item.url);
    return item;
  });
  return urls;

  /* SolutionAttempt2 - without rss2json */ 
  // return feeds;
}
