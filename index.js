const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const PORT = process.env.PORT || 8080;
const app = express();
require("dotenv").config();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');



//DATABASE
const ADMIN = process.env.MONGO_ADMIN;
const PW = process.env.MONGO_PW;
const DBNAME = process.env.DBNAME;
const uri = `mongodb+srv://${ADMIN}:${PW}@cluster0-iykpd.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// Uncomment this to use locally and comment above
// mongoose.connect("mongodb://localhost:27017/userGameDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

const userSchema = mongoose.Schema({
	username: String,
	score: Number
});

const User = mongoose.model('User', userSchema);

app.route('/').get( (req, res) => {
	res.render('game');
}).post((req, res) => {
	const username = req.body.username;
	const score = req.body.score;
	const newUser = new User({
		username: username,
		score: score
	})
	newUser.save();
	res.redirect('/scoreboard');
})

app.route('/scoreboard').get((req, res) => {
	User.find({}, null, {sort: { score : -1 }}, (err, found) => { if (err) {
		console.log(err)
	} else {
		if(found) {
			res.render('scoreboard', {scores:found});
		}
	} });
})




app.listen(PORT, () => {
	console.log('server is running');
});

