var feeds = [
  { url: 'http://rss.slashdot.org/Slashdot/slashdotMain', color: 'lightblue' },
  { url: 'http://javascriptweekly.com/rss/14j0bm2k', color: 'mediumseagreen' },
  { url: 'http://www.quirksmode.org/blog/index.xml', color: 'darkgray' },
  { url: 'http://blog.chromium.org/feeds/posts/default', color: 'darkgreen' },
  { url: 'http://feeds.feedburner.com/alistapart/main', color: 'tan' },
  { url: 'https://www.smashingmagazine.com/feed/', color: '#e95c33' },
  { url: 'http://feeds.feedburner.com/CssTricks', color: 'rgb(255, 152, 0)' },
  { url: 'http://feeds.feedburner.com/Devlounge', color: 'dodgerblue' },
  { url: 'http://dn.se/rss', color: 'rgb(244, 0, 14)' },
  { url: 'https://feeds.expressen.se/nyheter/', color: 'darkblue' },
  { url: 'https://hacks.mozilla.org/feed/', color: 'orangered' },
  { url: 'http://feeds.feedburner.com/456bereastreet', color: 'violet' },
  { url: 'http://feeds.feedburner.com/FunctioningForm', color: 'pink' },
  { url: 'https://javascriptweblog.wordpress.com/feed/', color: '#900C3F' },
  { url: 'https://code-cartoons.com/feed', color: 'blue' },
  { url: 'https://toddmotto.com/feed.xml', color: 'purple' },
  { url: 'https://www.joelonsoftware.com/feed/', color: 'gold' },
  { url: 'https://feeds.feedburner.com/codinghorror', color: 'magenta' },
  { url: 'https://feeds.feedburner.com/codinghorror', color: '#ccc' },
  { url: 'http://feeds.feedburner.com/37signals/beMH', color: '#999' },
  { url: 'http://steve-yegge.blogspot.com/feeds/posts/default', color: '#568be1' },
  { url: 'https://www.feedspot.com/infiniterss.php?q=site:http%3A%2F%2Fwww.thecrazyprogrammer.com%2Ffeed', color: 'cyan' },
  { url: 'https://www.feedspot.com/infiniterss.php?q=site:https%3A%2F%2Fwww.reddit.com%2Fr%2Fprogramming%2F.rss', color: '#a7e156' },
];

function setUrl(rssUrl) {
  rssUrl = encodeURIComponent(rssUrl);
  return `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}&_=1488646585321`;
}

export default function getFeedUrls() {
  let urls = feeds.map((item) => {
    item.url = setUrl(item.url);
    return item;
  });
  return urls;
}