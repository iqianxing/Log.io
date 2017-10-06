Log.io - Real-time log monitoring in your browser
=================================================

Powered by [node.js](http://nodejs.org) + [socket.io](http://socket.io)

## Fork from [Log.io](https://github.com/NarrativeScience/Log.io)

![log screen](./logio.gif)


## What has changed?

The purpose is to display the server / front log on the screen alone.

## Install Server & Harvester
! Apply default https

1) Install via npm

    npm install -g https://github.com/prugel/logio.git --user "ubuntu"

2) Run server

    log.io-server

3) Configure harvester

    nano ~/.log.io/harvester.conf

4) Run harvester

    log.io-harvester

5) Browse to https://localhost:28778

## Install Server & Harvester with Docker
https://github.com/prugel/logio

## Server TCP Interface

Send a log message, from web server to logio log_server
``` javascript
const options = {
  port: '0.0.0.0',
  host: 28777,
  rejectUnauthorized: false
};

(server.ssl ? tls : net).connect(options, function(socket) {
  const message = 'hello world';
  send('+log', 'server', 'AwesomeWeb', 'info', message);



  let message2 = 'another message';
  const data = [{
    hello: 'world',
    step: 1
  }, {
    name: 'james',
    step: 2
  }];
  data.forEach(function(meta) {
    message2 += '\n'+JSON.stringify(meta, null, 4);
  });
  send('+log', 'server', 'AwesomeWeb', 'debug', message2);


  function send() {
    socket.write([].slice.call(arguments).join('|') + '\r\n');
  }

});
```

``` javascript
const statusCode = Math.floor(data.statusCode/100)*100;
const responseTime = Math.min(Math.floor(data.responseTime/100)*100, 700);
const arr = [
  moment(data.timestamp).format('YYYY MM DD A hh:mm:ss'),
  `<span class="responseTime${responseTime}">(${data.responseTime}ms)</span>`,
  `${data.pid}:`,
  `<span class="status${statusCode}">${data.method}</span>`,
  data.path,
  JSON.stringify(data.query),
  `<span class="status${statusCode}">${data.statusCode}</span>`,
];
this.send('+log', this.logio.stream, this.logio.node, '', arr.join('&nbsp;&nbsp;&nbsp;'));
```

## Browser TCP Interface

Send a log message, from web page to logio log_server
- ws: work fine
- wss: wss can not be used with a self signed certificate
- wss: web page -> web server -> logio log_server
``` javascript
  var ws = new WebSocket("ws://0.0.0.0:28777");

  send('+log', 'front', 'AwesomeWeb', 'info', message);

  send('+log', 'front', 'AwesomeWeb', 'debug', message2);

  function send() {
    ws.send([].slice.call(arguments).join('|') + '\r\n');
  }
```

## Color table
! Allow html tags in messages.
! ansi to html apply
```
\x1b[30mblack\x1b[37mwhite

<span style="color:#000">black<span style="color:#AAA">white</span></span>
```
1. response time

  class | color
  ------------ | -------------
  responseTime0 | ![#48c9b0](https://placehold.it/15/48c9b0/000000?text=+) `#48c9b0`
  responseTime100 | ![#45b39d](https://placehold.it/15/45b39d/000000?text=+) `#45b39d`
  responseTime200 | ![#5dade2](https://placehold.it/15/5dade2/000000?text=+) `#5dade2`
  responseTime300 | ![#5499c7](https://placehold.it/15/5499c7/000000?text=+) `#5499c7`
  responseTime400 | ![#eb984e](https://placehold.it/15/eb984e/000000?text=+) `#eb984e`
  responseTime500 | ![#dc7633](https://placehold.it/15/dc7633/000000?text=+) `#dc7633`
  responseTime600 | ![#cd6155](https://placehold.it/15/cd6155/000000?text=+) `#cd6155`
  responseTime700 | ![#e74c3c](https://placehold.it/15/e74c3c/000000?text=+) `#e74c3c`

2. status code

  class | color
  ------- | ------
  status200 | ![#2ca02c](https://placehold.it/15/2ca02c/000000?text=+) `#2ca02c`
  status300 | ![#1f77b4](https://placehold.it/15/1f77b4/000000?text=+) `#1f77b4`
  status400 | ![#ff7f0e](https://placehold.it/15/ff7f0e/000000?text=+) `#ff7f0e`
  status500 | ![#d62728](https://placehold.it/15/d62728/000000?text=+) `#d62728`

3. log level message

  class | color
  ------- | ------
  debug | ![#aec7e8](https://placehold.it/15/aec7e8/000000?text=+) `#aec7e8`
  info | ![#86af49](https://placehold.it/15/86af49/000000?text=+) `#86af49`
  warn | ![#f2ae72](https://placehold.it/15/f2ae72/000000?text=+) `#f2ae72`
  error | ![#c94c4c](https://placehold.it/15/c94c4c/000000?text=+) `#c94c4c`

4. line

  class | color
  ------- | ------
  line | ![#2ca02c](https://placehold.it/15/2ca02c/000000?text=+) `#2ca02c`

5. time

  class | color
  ------- | ------
  time | ![#aaa](https://placehold.it/15/aaa/000000?text=+) `#aaa`

## Virtual scroll
clusterize.js Virtual scrolling applied.

## Credits

- Mike Smathers &lt;msmathers@narrativescience.com&gt; ([msmathers](http://github.com/msmathers))

- Narrative Science http://narrativescience.com ([NarrativeScience](http://github.com/NarrativeScience))

## Acknowledgements

- Jeremy Ashkenas ([jashkenas](https://github.com/jashkenas))

- Guillermo Rauch &lt;guillermo@learnboost.com&gt; ([Guille](http://github.com/guille))

- Ryan Dahl &lt;ry at tiny clouds dot org&gt; ([ry](https://github.com/ry)) + Joyent http://www.joyent.com/ ([joyent](https://github.com/joyent/))

- [turtlebender](http://github.com/turtlebender)

- [jdrake](http://github.com/jdrake)

## License

Copyright 2013 Narrative Science &lt;contrib@narrativescience.com&gt;

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
