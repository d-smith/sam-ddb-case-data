const middy = require('middy');
const ddbdata = require('./middleware/ddbdata');
const activityevents = require('./middleware/activityevents');

const step1Core = async (event, context) => {
    console.log(`step 1 event: ${JSON.stringify(event)}`);

    //Add step output to case data.
    let caseData = event.caseData || {};
    caseData['step1'] = 'Step 1 output';

    //Return case data and state machine data
    let stateMachineData = {
        processData: event['processData'],
        processName: event['processName'],
        processVersion: event['processVersion'],
        metavar: caseData.processInput.metavar
    };

    console.log(`returning stateMachineData ${JSON.stringify(stateMachineData)}`);

    return { caseData, stateMachineData };
}

const makeNamedStep = (name) => {
    return async (event, context) => {
        //Case data via middleware
        console.log(name);

        //Add step output to case data.
        let caseData = event.caseData || {};
        caseData[name] = name + ' output'; //step output

        //Return case data and state machine data
        let stateMachineData = {
            processData: event['processData'],
            processName: event['processName'],
            processVersion: event['processVersion']
        };
        return { caseData, stateMachineData };
    };
}

module.exports.step1
    = middy(step1Core)
        .use(activityevents(process.env.EVENT_TOPIC_ARN))
        .use(ddbdata());

module.exports.fooStep
    = middy(makeNamedStep('foo'))
        .use(activityevents(process.env.EVENT_TOPIC_ARN))
        .use(ddbdata());

module.exports.barStep
    = middy(makeNamedStep('bar'))
        .use(activityevents(process.env.EVENT_TOPIC_ARN))
        .use(ddbdata());

module.exports.bazStep
    = middy(makeNamedStep('baz'))
        .use(activityevents(process.env.EVENT_TOPIC_ARN))
        .use(ddbdata());

module.exports.quuxStep
    = middy(makeNamedStep('quux'))
        .use(activityevents(process.env.EVENT_TOPIC_ARN))
        .use(ddbdata());