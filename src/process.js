module.exports.step1 = async (event, context) => {
    if (event['metavar'] == undefined) {
        event['metavar'] = 'foo';
    }
    
    return event;
}