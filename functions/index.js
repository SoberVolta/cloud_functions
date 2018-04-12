const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sendQueueUpdateNotification = functions.database.ref( '/events/{eventID}/queue' )
    .onCreate((change, context) => {
        
        const updatedEventID = context.params.eventID;
            
        console.log( "Event " + updatedEventID + " queue updated." );

        const payload = {
            data: {
                notificationType: "queueUpdatedNotification",
                eventID: updatedEventID
            },
            notification: {
                title: 'New Rider In Queue',
                body: `There is a new rider in the queue.`
            }
        }
    
        return admin.messaging().sendToTopic(updatedEventID, payload);
    });