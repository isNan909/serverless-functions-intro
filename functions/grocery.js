exports.handler = async function (event, _context) {
  return {
    statusCode: 200,
    body: `${event.queryStringParameters.input}`,
  };
};
