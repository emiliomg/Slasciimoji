var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8000));

app.get('/', function(req, res) {
  res.send('Hello World!');
})

app.post('/request', function (req, res) {
  console.log('request body', req.query);
  res.send('Hello Slack!');
});

app.listen(app.get('port'), function () {
  console.log('Example app listening on port ', app.get('port'));
});



/**
sir         | ( ಠ ͜ʖರೃ)
zoidberg    | (\\/)(°,,,°)(\\/)
eyes        | ಠ_ಠ
sunglasses  | (⌐■_■)
do it       | (☞ﾟヮﾟ)☞
flip        | (╯°□°）╯︵ ┻━┻
unflip      | ┬──┬◡ﾉ(° -°ﾉ)
y u no      | ლ(ಠ益ಠლ)
*/