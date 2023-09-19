const app = require('./index.js');
app.post('/api/login', function (req, res) {
  if (req.body.password === process.env.ADMIN_PW && req.body.username === process.env.ADMIN_UN) {
    req.session.isAdmin = true;
    return res.redirect("/admin")
  } else {
    return res.status(401).json({
      error: {
        message: 'Wrong username or password!'
      }
    });
  }
});

app.get('/api/logout', function (req, res) {
  req.session.isAdmin = false;
  return res.redirect("/login");
})

