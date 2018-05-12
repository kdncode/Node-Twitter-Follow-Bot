const Twit = require('twit');

var T = new Twit({
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: ''
})

T.get('account/verify_credentials', {
    include_entities: false,
    skip_status: true,
    include_email: false
}, onAuthenticated)

function onAuthenticated(err, res) {
    if (err) { throw err }
    console.log('Authentication successful. Running bot...\r\n')

    // Twitter filter what we don't want
    // in this case, we want only follow
    var stream = T.stream('user')

    // Listen to follow event
    stream.on('follow', onFollowed)
    stream.on('error', onError)
}

function onFollowed(){
    var name = event.source.name;
    var screenName = event.source.screen_name;
    var response = '@' + screenName + ' Thank you for following, ' + name + '!';

    // Tweet response to user here
    console.log('I was followed by: ' + name + ' @' + screenName);
}

function onError() {
    throw error
}