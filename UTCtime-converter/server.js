
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200})); 


app.use(express.static('public'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


app.get('/api/:date?', (req, res) => {
  const { date } = req.params;


  if (!date) {
      const currentDate = new Date();
      return res.json({
          unix: currentDate.getTime(),
          utc: currentDate.toUTCString()
      });
  }


  const parsedDate = isNaN(date) ? new Date(date) : new Date(Number(date));


  if (parsedDate.toString() === 'Invalid Date') {
      return res.json({ error: 'Invalid Date' });
  }


  res.json({
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString()
  });
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
