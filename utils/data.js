const {
  dataMovies = 'mongodb://0.0.0.0:27017/moviesdb',
  PORT = 3000,
  NODE_ENV,
  JWT_TOKEN,
} = process.env;

module.exports = {
  dataMovies,
  PORT,
  NODE_ENV,
  JWT_TOKEN,
};
