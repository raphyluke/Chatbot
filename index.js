// create chatbot AI with natural
const natural = require('natural');
const classifier = new natural.BayesClassifier();
const fs = require('fs');

// check if classifier.json file exists
// if not, create it and save the classifier
if (!fs.existsSync('./classifier.json')) {
    // train the chatbot AI with few data samples for saying hello, goodbye, and asking for name

    classifier.addDocument('Hello', 'greeting');
    classifier.addDocument('Hi', 'greeting');
    classifier.addDocument('Hey', 'greeting');
    classifier.addDocument('Goodbye', 'goodbye');
    classifier.addDocument('Bye', 'goodbye');
    classifier.addDocument('Exit', 'goodbye');
    classifier.addDocument('What is your name?', 'name');

    classifier.train();

    switch (classifier.classify('Hello')) {
        case 'greeting':
            console.log('Hi, how are you?');
            break;
        case 'goodbye':
            console.log('Goodbye to you too!');
            break;
        case 'name':
            console.log('My name is Chatbot');
            break;
        default:
            console.log('Sorry, I don\'t understand');
    }

    classifier.save('classifier.json', function(err, classifier) {
        // the classifier is saved to the classifier.json file!
    });
}
else {
    natural.BayesClassifier.load('classifier.json', null, function(err, classifier) {
        // the classifier is loaded from the classifier.json file!
        switch (classifier.classify('Hello')) {
            case 'greeting':
                console.log('Hi, how are you?');
                break;
            case 'goodbye':
                console.log('Goodbye to you too!');
                break;
            case 'name':
                console.log('My name is Chatbot');
                break;
            default:
                console.log('Sorry, I don\'t understand');
        }
    })
}
