// include and setup express
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


mongoose.connect("mongodb://localhost/epam");

//passport settings
// app.use(express.cookieParser());
// app.use(express.session({secret: 'blog.fens.me', cookie: { maxAge: 60000 }}));


//https://github.com/Automattic/mongoose

// include express handlebars (templating engine)
var exphbs  = require('express-handlebars');

// specify the layout for our handlebars template
var hbs = exphbs.create({defaultLayout: 'main'});

// crethe the express app
var app = express();

var api = require('./routes/api');

var Article = require('./data/partyDB');
// setup handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// express middleware that parser the key-value pairs sent in the request body in the format of our choosing (e.g. json)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// setup our public directory (which will serve any file stored in the 'public' directory)
app.use(express.static('public'));
//fiona add 0308
// app.use(require('express-users')({
//   store: 'memory',

//   // views: ['views/layouts', 'views/users']
// }));
// app.use(express_user({store: 'memory'}));

//add by fiona for adding jscode to page
app.use(function (req, res, next) {
 res.locals.scripts = [];
 next();
});


app.use(cookieParser());
app.use(session({ secret: 'keyboard cat' , resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



  // Load the 'User' model
  var User = mongoose.model('User');

  passport.use(new LocalStrategy(
//
    function (username, password, done) {
      console.log("user: " + username + " pwd: " + password);
      User.findOne({ email: username }, function (err, user) {
        if (err) {
          console.log("err");
          return done(err); }
        if (!user) {
          console.log("!user");

          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          console.log("!user.validPassword");

          return done(null, false, { message: 'Incorrect password.' });
        }
        console.log("user "+user);
        return done(null, user);
      });
    }
  ));

  // Use Passport's 'serializeUser' method to serialize the user
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  // Use Passport's 'deserializeUser' method to load the user document
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });







// respond to the get request with the home page
app.get('/', function (req, res) {
  res.locals.scripts.push('/js/home.js');
  res.render('home');
});

// app.get('/detail', function (req, res) {
//     res.locals.scripts.push('/js/showdtl.js');
//     res.render('detail');
// })

// respond to the get request with the about page
app.get('/about', function (req, res) {
  res.render('about');
});

// respond to the get request with the register page
app.get('/register', function (req, res) {
    // res.locals.scripts.push('/js/register.js');
    res.render('register');
  });

app.get('/login', function (req, res) {
    // res.locals.scripts.push('/js/register.js');
    res.render('login');
  });

// passport.use('local', new LocalStrategy(
//     function (username, password, done) {
//         var user = {
//             id: '1',
//             username: 'admin',
//             password: 'pass'
//         };

//         if (username !== user.username) {
//             return done(null, false, { message: 'Incorrect username.' });
//         }
//         if (password !== user.password) {
//             return done(null, false, { message: 'Incorrect password.' });
//         }

//         return done(null, user);
//     }
// ));

// app.post('/register',
//   passport.authenticate('local', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/'
//   }));

app.post('/register',function(req,res){
  // IMPORTANT - WE SHOULD NEVER SAVE OUR PASSWORD IN CLEAR TEXT

  var user = new User(req.body);
  user.save(function(err, user) {
    if (err) {
      console.log("error");
      res.redirect('/register?status=fail');
    }else{
      console.log("no error");
    }

    res.render('dashboard',{"username":user.username});
  });
});


    app.post('/login', passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/login'
    }));


// app.post('/login',passport.authenticate('local'),function(req,res){
//   // IMPORTANT - WE SHOULD NEVER SAVE OUR PASSWORD IN CLEAR TEXT

//   var user = new User(req.body);
//   user.save(function(err, user) {
//     if (err) {
//       res.redirect('/register?status=fail');
//     }

//     res.redirect('/login');
//   });
// });

//    function (req, res) {

//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     res.redirect('/dashboard' + req.user.username);

//   // get the data out of the request (req) object
//   // store the user in memory here

//   // res.redirect('/dashboard');
// });

// respond to the get request with dashboard page (and pass in some data into the template / note this will be rendered server-side)
app.get('/dashboard', function (req, res) {
  // console.log("req: "+JSON.stringify(req));
  res.render('dashboard', {
   stuff: [{
    greeting: "Hello",
    subject: "World!",
    }],
    // user: req.user
  });
});

// app.get('/dashboard', function (req, res) {
// // res.locals.scripts.push('/js/dashboard.js');
// res.render('dashboard', { username:req.user.name,
//   stuff: [{
//     greeting: "Hello",
//     subject: "World!"
//   }]
// });
// });

app.get('/article/add', function (req, res) {
  console.log("get");
  res.render('article-add');
});


app.post('/addbook', function(req,res){
  var Article = new Article(req.body);
  Article.save(function(err,article){
    if(err){
      console.log("save err");
    }
    else{
      console.log("not err");

      res.render('home');
    }




  })
});


// the api (note that typically you would likely organize things a little differently to this)
app.use('/api', api);

// create the server based on express
var server = require('http').createServer(app);

var port = process.env.port ||　1337;

// start the server
server.listen(port, function () {
  console.log('The Next XYZ is looking good! Open http://localhost:%d to begin.', 1337);
});