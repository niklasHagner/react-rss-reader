function loadStyleSheet(url){
    var sheet = document.createElement('link');
    sheet.rel = 'stylesheet';
    sheet.href = url;
    sheet.type = 'text/css';
    document.head.appendChild(sheet);
    var _timer;

    return new Promise(function(resolve){
      sheet.onload = resolve;
      sheet.addEventListener('load', resolve);
      sheet.onreadystatechange = function(){
        if (sheet.readyState === 'loaded' || sheet.readyState === 'complete') {
          resolve();
        }
      };

      _timer = setInterval(function(){
        try {
          for (var i=0; i<document.styleSheets.length; i++) {
            if (document.styleSheets[i].href === sheet.href) resolve();
          }
        }
        catch(e) { console.log("can't load stylesheet"); /* the stylesheet wasn't loaded */ }
      }, 250);
    })
    .then(function(){
      clearInterval(_timer);
      return null; //return link
    });
  }

  export default loadStyleSheet;
