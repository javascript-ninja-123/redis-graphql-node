if(process.env.NODE_ENV !== 'production'){
  const dev = require('./secret_dev');
  module.exports = dev;
}

if(process.env.NODE_ENV == 'production'){
  const prod = require('./secret_prod');
  module.exports = prod;
}
