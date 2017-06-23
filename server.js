// server.js
// roldeguz
// 22-June-2017
// freecodecamp API projects: request header parser

// init project
var express = require('express');
var acceptlang = require('accept-language');
var useragent = require('useragent');
var app = express();

//import acceptLanguage from 'accept-language';
acceptlang.languages(['en-US', 'zh-CN']);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {  
  var agent = useragent.parse(request.headers['user-agent']);
  
  var result = {};
  result["ipaddress"] = request.headers['x-forwarded-for'].split(',')[0];
  result["language"] = acceptlang.get(request.headers["accept-language"]);
  result["software"] = agent.os.toString();
  
  response.end(JSON.stringify(result));
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
