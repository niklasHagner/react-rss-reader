# RSS-Reader
## A dumb little rss client

### Run the project
`npm start` in root to launch localhost:3000

### You must configure this!

Create this file: src/Helpers/getApiKey.js
```
//never commit this file!!! it must be in .gitignore
export default function getApiKey() { 
  return "some apikey from rss2json.com"; 
} 
``` 

### Optional configuration
set your RSS-feed urls in `feedList.js`
