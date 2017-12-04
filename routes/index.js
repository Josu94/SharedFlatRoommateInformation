var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
/* To check if everything in the DB went right. Normally used for testing */
var assert = require('assert');

/* URL which points to the DB. */
var url = 'mongodb://Metropolia:metropolia2017@sharedflatroommateinformation-shard-00-00-dyngb.mongodb.net:27017,sharedflatroommateinformation-shard-00-01-dyngb.mongodb.net:27017,sharedflatroommateinformation-shard-00-02-dyngb.mongodb.net:27017/test?ssl=true&replicaSet=SharedFlatRoommateInformation-shard-0&authSource=admin';

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
    var item = {
        deviceId: req.body.deviceId,
        motionValue: req.body.motionValue,
        temperature: req.body.temperature,
        timestamp: req.body.timestamp
    };

    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('motion-data').insertOne(item, function (err, result) {
            assert.equal(null, err);
            console.log('Item inserted');
            db.close();
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
