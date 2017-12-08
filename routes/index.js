var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
/* To check if everything in the DB went right. Normally used for testing */
var assert = require('assert');
/* URL which points to the DB. */
var url = 'mongodb://Metropolia:metropolia2017@sharedflatroommateinformation-shard-00-00-dyngb.mongodb.net:27017,sharedflatroommateinformation-shard-00-01-dyngb.mongodb.net:27017,sharedflatroommateinformation-shard-00-02-dyngb.mongodb.net:27017/test?ssl=true&replicaSet=SharedFlatRoommateInformation-shard-0&authSource=admin';
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Startseite' });
});

/* POST temperature activity. */
router.post('/temperature', function (req, res, next) {
    /* TODO connect to database and add the value */
    res.sendStatus(200);
});

/* POST motion activity. */
router.post('/motion', function (req, res, next) {
    res.sendStatus(200);
});

/* ---------------------------------------------------- */

router.get('/get-data', function (req, res, next) {
    var resultArray = [];
    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        var cursor = db.collection('motion-data').find();
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            console.log(resultArray);
            /* res.render('index', {items: resultArray}); */
        });
    });
});

router.post('/insert', function (req, res, next) {
    var deviceId = req.body.deviceId;
    var motionValue =  req.body.motionValue;
    var temperature = req.body.temperature;
    var timestamp =  req.body.timestamp;

    // Persist data in a MySQL Database hosted on bigdaddy (Turhan)
    var con = mysql.createConnection({
        host: "160.153.16.12",
        user: "turhan2",
        password: "turhan12345",
        database: "iot_test"
    });

    con.connect(function(err) {
        if (err) throw err;
        var sql = 'UPDATE Roommate SET peopleInside = ' + motionValue + ', temperature = ' + temperature + ', lastUpdate = ' + timestamp + ' WHERE deviceID = ' + deviceId;
        console.log(sql);
        con.query(sql, function (err, result) {
        if (err) throw err;
          console.log(result.affectedRows + " record(s) updated");
        });
     });

    res.redirect('/');
});

router.post('/update', function (req, res, next) {
    res.sendStatus(200);
});

router.post('/delete', function (req, res, next) {
    res.sendStatus(200);
});

router.get('/controlpanel', function (req, res, next) {
    res.render('controlpanel', { title: 'Startseite' });
});

router.post('/test', function (req, res, next) {
    console.log(req.body);
    res.sendStatus(200);
});

module.exports = router;
