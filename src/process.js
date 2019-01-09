module.exports.step1 = async (event, context) => {
    if (event['metavar'] == undefined) {
        event['metavar'] = 'foo';
    }
    
    return event;
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
            processData: event['processData']
        };
        return { caseData, stateMachineData };
    };
}

module.exports.fooStep
    = makeNamedStep('foo');

module.exports.barStep
    = makeNamedStep('bar');

module.exports.bazStep
    = makeNamedStep('baz');

module.exports.quuxStep
    = makeNamedStep('quux');