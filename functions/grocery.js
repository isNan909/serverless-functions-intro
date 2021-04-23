exports.handler = async function (event, _context) {
  funLines = [
    ' this is a decilious item!',
    ' must be eaten fresh!',
    ' healthy choice!',
    ' fresh green veggies huh!',
  ];

  Array.prototype.randomize = function () {
    return this[Math.floor(Math.random() * this.length)];
  };

  return {
    statusCode: 200,
    body: `${event.queryStringParameters.input}` + funLines.randomize(),
  };
};
