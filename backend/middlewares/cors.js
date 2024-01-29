const allowedCors = [
  'http://domainigor.students.nomoredomainsmonster.ru',
  'https://domainigor.students.nomoredomainsmonster.ru/',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const cors = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    const { method } = req;
    const requestHeaders = req.headers['access-control-request-headers'];

    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
      return res.end();
    }
  }
  return next();
};

module.exports = { allowedCors, DEFAULT_ALLOWED_METHODS, cors };
