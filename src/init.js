var cli = require("../lib/client.js");
var is_https = window.location.href.indexOf("https") == 0;
client = new cli.WebClient({secure: is_https}, localStorage);
