var createError = require('http-errors');
var express = require('express');
const http=require('http');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose=require('mongoose');
const path = require('path');
var authRoutes = require('./routes/authRoutes');
const { requireAuth } = require('./middlewares/authMiddleware');
require ('dotenv').config();
const locations = require('./public/data/locations.json');
const cors = require('cors');
var messageRoute=require('./routes/messageRoute');
var chatRouter=require('./routes/chatRouter')
var patientRouter=require('./routes/patientRouter');
var doctorRouter=require('./routes/doctorRouter');
var StatistiqueRoutes=require('./routes/StatistiqueRoutes');
var indexRouter=require('./routes/index');
const signUpRouter=require('./routes/signUp');

var indexRouter=require('./routes/index');

const session = require('express-session');


var app = express();
 
const cron = require('node-cron');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req, res, next) => {
  //res.setHeader('Access-Control-Allow-Origin', `${process.env.REACT_APP_SUPER_URL}`);
  //res.setHeader('Access-Control-Allow-Origin', `${process.env.REACT_APP_CLIENT_URL}`);
  //res.setHeader('Access-Control-Allow-Origin', `${process.env.REACT_APP_SUPER_URL}, ${process.env.REACT_APP_CLIENT_URL}`);

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(cors());
app.get('/locations', (req, res) => {
    res.json(locations);
  });

  app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
  }));

//connection to db
mongoose.set('strictQuery',true);
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true})
.then(()=>{console.log('connected to DB')})
.catch((err)=>{console.log(err.message)});

console.log()
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static('uploads'));

app.set('view engine', 'ejs');


// app.get('/', (req, res) => res.send('Home Page'));

app.get('/doctor', requireAuth, (req, res) => {
  if (req.userRole !== 'doctor') {
    res.send('Home Page');
  } else {
    res.send('Doctor Space');
  }
});
app.get('/patient', requireAuth, (req, res) => {
  if (req.userRole !== 'patient') {
    res.send('Home Page');
  } else {
    res.send('Patient Space');
  }
});
app.get('/admin', requireAuth, (req, res) => {
  if (req.userRole !== 'admin') {
    res.send('Home Page');
  } else {
    res.send('admin Space');
  }
});



/////les paths des routes 
app.use('/',indexRouter)
app.use(authRoutes);  //pour appellé les methode dans authRoutes
app.use('/signup',signUpRouter);

app.use('/patient', patientRouter);
app.use('/doctor', doctorRouter);
app.use('/statistique', StatistiqueRoutes);
const medicalRouter = require('./routes/MedicalRoutes');
const medicalPatientRouter = require('./routes/MedicalRecordPatientRoutes');
const MachineMaintenanceRouter = require('./routes/MachineMaintenanceRoutes');

app.use('/medical', medicalRouter) 
app.use('/medical-patient', medicalPatientRouter)
app.use('/machine', MachineMaintenanceRouter)
const Crud = require('./routes/crud');
app.use("/", Crud);
app.use('/chat',chatRouter)
app.use('/message',messageRoute)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err.message);
});

//creation du serveur
const server=http.createServer(app);
server.listen(5000,()=>{
  console.log("app is running on port 5000");
})

//socket io 
const io=require("socket.io")(server,{ 
  pingTimeout:60000,
  cors:{ 
    origin:`${process.env.REACT_APP_CLIENT_URL}`,
  }
})

io.on("connection", (socket)=>{ 
console.log("connected to socket.io");
socket.on("setup",(userData)=>{ 
  socket.join(userData._id);
  console.log(userData._id)
  socket.emit("connected");
})
socket.on('join chat',(room)=>{ 
  socket.join(room); 
  console.log("user joined room "+ room );
})
socket.on("new message",(newMessageReceived)=>{  

  var  Chat=newMessageReceived.chat ; 
  Chat.users.forEach(user=>{
    if (user._id!==newMessageReceived.sender._id) { 
      console.log("after ")
      socket.in(user._id).emit("message received",newMessageReceived)
    }
  })
})
})
module.exports= app;























