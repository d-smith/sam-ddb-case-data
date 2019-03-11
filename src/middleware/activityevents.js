const AWS = require('aws-sdk');
const middy = require('middy');


const publishActivityEvent = async (topic, event) => {
    const snsClient = new AWS.SNS();
    console.log(`publish event ${JSON.stringify(event)}`);

    params = {
        TopicArn: topic,
        Message: JSON.stringify(event),
        MessageAttributes: {
            'ProcessName': {
                DataType: 'String',
                StringValue: event.processName
            },
            'Activity': {
                DataType: 'String',
                StringValue:event.activity
            }
        }
    }

    let response = await snsClient.publish(params).promise();
    console.log(response);
}

module.exports = (topicArn) => {
    
    

      return {
          before: async (handler, next) => {
              if(handler.context && handler.event) {
                  console.log(`context is ${JSON.stringify(handler.context)}`);
                  console.log(`event is ${JSON.stringify(handler.event)}`);

                  console.log(`activityevents - publish start event to ${topicArn}`);

                  let event = {
                      eventType: 'startActivity',
                      processInstanceId: handler.event.processData,
                      processName: handler.event.processName,
                      processVersion: handler.event.processVersion,
                      activity: handler.context.functionName,
                      invokeid: handler.context.invokeid
                  };

                  await publishActivityEvent(topicArn, event);
              } else {
                  console.log('No context and/or event');
              }

          },

          after: async (handler, next) => {
            if(handler.response) {
                console.log('activityevents - publish end event');
                console.log(`activityevents after - response: ${JSON.stringify(handler.response)}`);
                   
            };
          }

      };
}