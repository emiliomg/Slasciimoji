'use strict';

const dotenv = require('dotenv');
dotenv.load();

const bodyParser = require('body-parser');
const Slack = require('slack-node');
const express = require('express');
const app = express();
const slack = new Slack(process.env.SLACK_TOKEN_OAUTH);
const emojis = require('./emojis');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.raw({
    type: function () {
        return true;
    }, limit: '5mb'
}));

app.set('port', (process.env.PORT || 8000));

// Helpers

const helpResponse = Object.keys(emojis.all).map(name => `${name}: ${emojis.all[name]}`).join("\n");

// Route handling

app.get('/', function(req, res) {
  res.json({"status": "ok"});
})

// Security token check
app.use('/', function(req, res, next) {
  // console.log('request body', req.body);
  if (req.body.token !== process.env.SLACK_SLASH_COMMAND_TOKEN) {
    return res.status(500).send('Invalid token');
  }

  next();
});

// Help text
app.post('/', function (req, res, next) {

  if ('' == req.body.text || 'help' == req.body.text) {
    res.json({
      "text": "Use one of these names to post an asciimoji",
      "attachments": [{
        "text": helpResponse
      }]
    });

    return;
  }

  next()
});

// post an asciimoji
app.post('/', function (req, res, next) {
  const userId = req.body.user_id;
  const userName = req.body.user_name;
  const channelId = req.body.channel_id;
  const emojiName = req.body.text;

  // console.log('userId', userId);
  // console.log('userName', userName);
  // console.log('channelId', channelId);
  // console.log('emojiName', emojiName);

  const emojiPromise = getEmoji(emojiName);
  const userInfoPromise = getUserInfo(userId);

  Promise.all([emojiPromise, userInfoPromise]).then((result) => {
    const [emoji, userInfo] = result;
    
    // console.log('emoji', emoji);
    // console.log('userInfo', userInfo);

    postEmoji(emoji, userName, channelId, userInfo.user.profile.image_48); 
  }).catch((err) => {
    console.error(err);
    res.status(500).end();

    return;
  });

  res.status(200).end();

  next();
});

app.listen(app.get('port'), function () {
  console.log('Example app listening on port ', app.get('port'));
});

function getEmoji(name) {
  const p = new Promise((resolve, reject) => {
    let emoji = emojis.getEmoji(name);
    if (!emoji) {
      emoji = `Emoji "${name}" not found!`;
    }

    resolve(emoji);
  });

  return p;
}

function getUserInfo(userId) {
  const p = new Promise((resolve, reject) => {
    slack.api("users.info", {
      user: userId
    }, function(err, response) {
      if (err) {
        reject('getUserInfo Error: ' + err);
        return;
      }

      if(false === response.ok) {
        reject('getUserInfo Error: ' + response.error);
        return;
      } 

      resolve(response);
    });
  });

  return p;
}

function postEmoji(emoji, userName, channelId, iconUrl) {
  const p = new Promise((resolve, reject) => {
    slack.api('chat.postMessage', {
      as_user: false,
      text: emoji,
      username: userName,
      channel: channelId,
      icon_url: iconUrl
    }, function(err, response){
      if (err) {
        reject(err);
        return;
      }

      resolve(response);
    });
  });

  return p;
}

