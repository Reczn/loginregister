const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const app = express();
require('./config/passport')(passport);
  
mongoose.connect('MONGO:URI', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));
app.use("/public", express.static(`views/public`));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({secret: '#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());   
app.use(flash());  
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');  
  next();
}); 


app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = 3000;
  
app.listen(PORT, console.log(`Server running on ${PORT}`));
