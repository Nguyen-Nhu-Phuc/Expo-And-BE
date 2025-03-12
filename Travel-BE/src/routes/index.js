const route = (app) => {
  app.use('/api/v1/auth', require('./Auth'))
  app.use('/api/v1/destination', require('./Destination'))
  app.use('/api/v1/hotel', require('./Hotel'))
  app.use('/api/v1/restaurant', require('./Restaurant'))
  app.use('/api/v1/place', require('./Place'))
  app.use('/api/v1/schedule', require('./Schedule'))
}

module.exports = route
