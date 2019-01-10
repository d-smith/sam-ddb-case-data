module.exports.start = async (event, context) => {
    console.log(`create called with context ${JSON.stringify(context)}`);
    return {body: 'ok', statusCode: 200 };
}