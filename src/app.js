const config = require('./config');
const express = require('express');
const app = express();
const morgan = require('morgan');
const logger = require ('./utils/logger');
const PORT = config.env.PORT || 5000;
const cors = require('cors');
const { globalLimiter, skipLimiter } = require('./middleware/rateLimiter');
const path = require ('path');




const morganStream = {
  write:(message) => logger.info(message.trim()),
}

app.use(cors());  
app.use(express.json()); 

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(( req, res, next ) => {
  if (skipLimiter(req)) return next()
    globalLimiter(req, res, next);
});

app.use(morgan('combined', {stream:morganStream}));



const userRoutes = require ('./modules/user/user.routes');
app.use('/api/users', userRoutes)



app.get ('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running .....'
  })
})


const errorHandler = require ('./middleware/errorHandler');
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${config.port} in ${config.env} mode`);
});