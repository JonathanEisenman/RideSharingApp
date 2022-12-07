const mysql=require('mysql');
const url = require('url');

var pool = mysql.createPool({
    host: "127.0.0.1",
    user: "foxliftapp",
    password: "FoxLiftApp2022!",
    database: "foxlift",
    port: 3306
});
var rootConnection = mysql.createConnection({
    host: "127.0.0.1",
    user: "foxliftapp",
    password: "FoxLiftApp2022!",
    database: "foxlift",
    port: 3306
})

exports.getusersRequest = function(req, res) {
    getRequest(req, res, "users", "AND");
};

exports.getusersOrRequest = function(req, res) {
    getRequest(req, res, "users", "OR");
};

exports.gettripsRequest = function(req, res) {
    getRequest(req, res, "trips", "AND");
}

exports.gettripsOrRequest = function(req, res) {
    getRequest(req, res, "trips", "OR");
}

exports.gettakeRequest = function(req, res) {
    getRequest(req, res, "take", "AND");
}

exports.gettakeOrRequest = function(req, res) {
    getRequest(req, res, "take", "OR");
}

exports.getrateRequest = function(req, res) {
    getRequest(req, res, "rate", "AND");
}

exports.getrateOrRequest = function(req, res) {
    getRequest(req, res, "rate", "OR");
}

exports.getmessageRequest = function(req, res) {
    getRequest(req, res, "message", "AND");
}

exports.getmessageOrRequest = function(req, res) {
    getRequest(req, res, "message", "OR");
}

exports.getreportRequest = function(req, res) {
    getRequest(req, res, "report", "AND");
}

exports.getreportOrRequest = function(req, res) {
    getRequest(req, res, "report", "OR");
}

exports.getfavoriteRequest = function(req, res) {
    getRequest(req, res, "favorite", "AND");
}

exports.getfavoriteOrRequest = function(req, res) {
    getRequest(req, res, "favorite", "OR");
}

exports.getopenTripsRequest = function(req, res) {
    const reqUrl = url.parse(req.url, true);
    var query = 'SELECT * FROM trips WHERE isCompleted = 0 AND isCancelled = 0 AND SeatsAvailable > 0 ' +
                    'AND tID NOT IN (SELECT tID FROM take WHERE uID=\"' + reqUrl.query["uID"] + '\")';
    // Execute the query
    console.log(query);
    executeQuery(res, query);
}

exports.getuserTripsRequest = function(req, res) {
    const reqUrl = url.parse(req.url, true);
    var query = 'SELECT * FROM trips WHERE tID IN (SELECT tID FROM take WHERE uID=\"' + reqUrl.query["uID"] + '\")' +
                ' AND isCompleted=\"' + reqUrl.query["isCompleted"] + '\" AND isCancelled=\"' + reqUrl.query["isCancelled"] + '\"';
    // Execute the query
    console.log(query);
    executeQuery(res, query);
}

exports.getusersToMessageRequest = function(req, res) {
    const reqUrl = url.parse(req.url, true);
    var query = 'SELECT * FROM users WHERE uID IN (SELECT uID FROM take WHERE tID IN (SELECT tID FROM take WHERE uID=\"' + reqUrl.query["uID"] + '\")) AND uID!=\"' + reqUrl.query["uID"] + '\"';
    // Execute the query
    console.log(query);
    executeQuery(res, query);
}

exports.getmessagesBetweenUsers = function(req, res) {
    const reqUrl = url.parse(req.url, true);
    var uID1 = reqUrl.query["uID1"];
    var uID2 = reqUrl.query["uID2"];
    var query = 'SELECT * FROM message WHERE (senderID=\"' + uID1 + '\" AND receiverID=\"' + uID2 + '\")' + 
                ' OR (senderID=\"' + uID2 + '\" AND receiverID=\"' + uID1 + '\") ORDER BY time ASC';
    // Execute the query
    console.log(query);
    executeQuery(res, query);
}

exports.gettripsRangeRequest = function(req, res) {
    const reqUrl = url.parse(req.url, true);
    var query = 'SELECT * FROM trips';
    query += ' WHERE time>=\"' + reqUrl.query["min"] + '\"';
    query += ' AND time<=\"' + reqUrl.query["max"] + '\"';
    query += ' AND isCompleted=0 AND isCancelled=0';
    query += ' ORDER BY time ASC';
    console.log(query);
    executeQuery(res, query);
}

exports.updatetripsRequest = function(req, res) {
    putRequest(req, res, "trips", "tID");
}

exports.updateusersRequest = function(req, res) {
    putRequest(req, res, "users", "uID");
}

exports.postusersRequest = function(req, res) {
    var body = '';
    var postBody;
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', async function() {
        postBody = JSON.parse(body);

        var results1 = await midQuery('SELECT * FROM users WHERE email=\"' + postBody.email + '\"');
        // console.log(results1[0]);
        if (results1[0] == undefined) {
            var query = 'INSERT INTO users (name, accountName, isDriver, email) VALUES ' + 
            '(' + 
            '\"' + postBody.name + '\", \"' + postBody.accountName + '\", ' + 
            '\"' + "0" + '\", \"' + postBody.email + '\"' + 
            ')';

            // Execute the query
            console.log(query);
            executeQuery(res, query);
        }
        else {
            console.log("User Already Exists");
            res.end("User Already Exists");
        }
    });
}

exports.posttripsRequest = async function(req, res) {
    var body = '';
    var postBody;
    var results1 = await midQuery('SELECT MAX(tID) FROM trips');
    var tID = results1[0]["MAX(tID)"] + 1;
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', async function() {
        postBody = JSON.parse(body);

        var results2 = await midQuery('SELECT isDriver FROM users WHERE uID=\"' + postBody.uID + '\"');
        var isDriver = results2[0]["isDriver"];
        var UserRole, type;
        if (isDriver) {
            type = 'Ride Share';
            UserRole = 'Driver';
        }
        else {
            type = 'Taxi';
            UserRole = 'Shared Taxi';
        }

        var query = 'INSERT INTO trips (tID, type, destination, startLocation, time, seatsAvailable, isCompleted, isCancelled) VALUES ' +
            '(' +
            '\"' + tID + '\", ' +
            '\"' + type + '\", \"' + postBody.destination + '\", ' + 
            '\"' + postBody.startLocation + '\", \"' + postBody.time + '\", ' + 
            '\"' + '3' + '\", ' +
            '\"' + '0' + '\", \"' + '0' + '\"' + 
            ')';

        // Execute query
        console.log(query);
        await executeQuery(res, query);
        await midQuery('INSERT INTO take (uID, tID, UserRole) VALUES ' + 
            '(' +
            '\"' + postBody.uID + '\", \"' + tID + '\", ' +
            '\"' + UserRole + '\"' +
            ')'
        );
    });
}

exports.jointripsRequest = function(req, res) {
    var body = '';
    var postBody;
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', async function() {
        postBody = JSON.parse(body);
        
        var results1 = await midQuery('SELECT SeatsAvailable, type FROM trips WHERE tID=\"' + postBody.tID + '\"');
        var SeatsAvailable = results1[0]["SeatsAvailable"] - 1;
        await midQuery('UPDATE trips SET SeatsAvailable=\"' + SeatsAvailable + '\" WHERE tID=\"' + postBody.tID + '\"');
        var type = results1[0]["type"];
        var UserRole;
        if (type == 'Ride Share') {
            UserRole = 'Passenger';
        }
        else {
            UserRole = 'Shared Taxi';
        }

        var query = 'INSERT INTO take (uID, tID, UserRole) VALUES ' +
            '(' +
            '\"' + postBody.uID + '\", ' +
            '\"' + postBody.tID + '\", \"' + UserRole + '\"' +
            ')';

        // Execute query
        console.log(query);
        await executeQuery(res, query);
    });
}

exports.postmessageRequest = function(req, res) {
    var body = '';
    var postBody;
    req.on('data', function(chunk) {
        body += chunk;
    });
    req.on('end', function() {
        postBody = JSON.parse(body);

        var query = 'INSERT INTO message (message, time, senderID, receiverID) VALUES ' + 
            '(' + 
            '\"' + postBody.message + '\", \"' + postBody.time + '\", ' + 
            '\"' + postBody.senderID + '\", \"' + postBody.receiverID + '\"' + 
            ')';

            // Execute the query
            console.log(query);
            executeQuery(res, query);
    })
}

exports.postfavoriteRequest = function(req, res) {
    var body = '';
    var postBody;
    req.on('data', function(chunk) {
        body += chunk;
    });``
    req.on('end', function() {
        postBody = JSON.parse(body);

        var query = 'INSERT INTO favorite (uID, location) VALUES ' + 
            '(' + 
            '\"' + postBody.uID + '\", \"' + postBody.location + '\"' + 
            ')';

            // Execute the query
            console.log(query);
            executeQuery(res, query);
    })
}

exports.invalidRequest = function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};

function getRequest(req, res, table, joiner) {
    const reqUrl = url.parse(req.url, true);
    var query = 'SELECT * FROM ' + table;
    var passedDataKeys = Object.keys(reqUrl.query);
    if (passedDataKeys.length > 0) {
        query += ' WHERE ' + passedDataKeys[0] + '=\"' + reqUrl.query[passedDataKeys[0]] + '\"';
    }
    if (passedDataKeys.length > 1) {
        for (var i = 1; i < passedDataKeys.length; i++) {
            query += ' ' + joiner + ' ' + passedDataKeys[i] + '=\"' + reqUrl.query[passedDataKeys[i]] + '\"';
        }
    }
    // Execute the query
    console.log(query);
    executeQuery(res, query);
}

function putRequest(req, res, table, identifier) {
    const reqUrl = url.parse(req.url, true);
    var query = 'UPDATE ' + table;
    var passedDataKeys = Object.keys(reqUrl.query);
    if (passedDataKeys.length > 0) {
        query += ' SET ' + passedDataKeys[0] + '=\"' + reqUrl.query[passedDataKeys[0]] + '\"';
    }
    if (passedDataKeys.length > 1) {
        for (var i = 1; i < passedDataKeys.length; i++) {
            query += ' , ' + passedDataKeys[i] + '=\"' + reqUrl.query[passedDataKeys[i]] + '\"';
        }
    }
    query += ' WHERE ' + identifier + '=\"' + reqUrl.query[identifier] + '\"';
    // Execute the query
    console.log(query);
    executeQuery(res, query);
}

function midQuery(query) {
    return new Promise((resolve, reject) => {
        rootConnection.query(query, (error, results, fields) => {
            if (error) {
                return reject(console.error(error.message));
            }
            return resolve(results);
        });
    })
}

function executeQuery(res, query) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            connection.query(query, function (error, results, fields) {
                // If some error occurs, we throw an error.
                if (error) {res.end(String(error));
                    reject(console.error(error.message));
                }
                else {
                    // Getting the 'response' from the database
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                    resolve(results);
                }
                connection.release();
            });
        });
    })
}
