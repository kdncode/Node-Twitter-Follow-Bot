const Twit = require('twit');

var T = new Twit({

    // Replace with your key from: https://apps.twitter.com/
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

function onFollowed(event){
    var name = event.source.name;
    var screenName = event.source.screen_name;
    var response = '@' + screenName + ' Thank you for following, ' + name + '!';

    // statuses/update comes from Twitter docs: https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update
    T.post('statuses/update', {
        status: response
    }, onTweeted)

    // Tweet response to user here
    console.log('I was followed by: ' + name + ' @' + screenName);
}

function onError(error) {
    throw error
}

function onTweeted(err, reply) {
    if (err !== undefined) {
        console.log(err)
    } else {
        console.log('Tweeted: ' + reply.text)
    }
}
