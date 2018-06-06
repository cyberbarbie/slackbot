const Slackbot = require('slackbots');
const axios = require('axios');

//initialise Slackbot//
const bot = new Slackbot({
  token: 'xoxb-376128068036-377245438038-tXljyb71OxHAPeKl0CAYrdEA',
  name: 'nerdbot'
});

//create start handler- what will happen when we start the nerdbot
bot.on('start', () => {
  const params = {
    icon_emoji: ':smiley:'
  }
//create the message which takes 3 params- channel, message, params object which contains the emoji//
  bot.postMessageToChannel('general', 'Get Ready To Laugh With @nerdbot!', params);
});

//Error handler
bot.on('error', (err) => console.log(err));


//Message Handler
bot.on('message', (data) => {
  if(data.type !== 'message') {
    return;
  }

  handleMessage(data.text);
});

//Respond to data
function handleMessage(message){
  if(message.includes(' chucknorris')) {
    chuckJoke();
  } else if(message.includes(' yomama')) {
    yoMamaJoke();
  } else if (message.includes(' random')) {
    randomJoke();
  } else if(message.includes(' help')){
    helpMe();
  } else if(message.includes(' HELP')){
    helpMe();
  } else if(message.includes(' YOMAMMA')){
    yoMamaJoke();
  }
}

//Tell a Chuck Norris joke//

function chuckJoke() {
  axios.get('https://api.icndb.com/jokes/random').then(res => {
    const joke = res.data.value.joke;
    //send to channel
    const params = {
      icon_emoji: ':laughing:'
    };

    bot.postMessageToChannel(
      'general', `Chuck Norris: ${joke}`,
      params);
});
}

//Tell a Yo Mamma joke//

function yoMamaJoke() {
  axios.get('http://api.yomomma.info').then(res => {
    const joke = res.data.joke;

    const params = {
      icon_emoji: ':laughing:'
    };

    bot.postMessageToChannel('general', `Don't hurt me but, ${joke}`, params);
  });
}

//Tell a Random joke

function randomJoke() {
    const rand = Math.floor(Math.random() * 2) + 1;
    if(rand === 1){
      chuckJoke();
    } else if(rand === 2){
      yoMamaJoke();
    }
}

//Show Help text
function helpMe() {
  const params = {
    icon_emoji: ':question:'
  };

  bot.postMessageToChannel('general', `Type @jokebot with either 'chucknorris', 'yomama' or 'random' to get a joke. If you need serious help though, just my mom @taeluralexis`, params);
}
