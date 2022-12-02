const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {

    var service = require('./service.js');
    const reqUrl = url.parse(req.url, true);

    // GET USERS Endpoint
    // GET localhost:3000/getusers?uID=1
    if (reqUrl.pathname == '/getusers' && req.method === 'GET') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getusersRequest(req, res);
    }
    else if (reqUrl.pathname == '/getusersor' && req.method === 'GET') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getusersOrRequest(req, res);
    } 
    // GET TRIPS Endpoint
    // GET localhost:3000/gettrips?tID=1
    else if (reqUrl.pathname == '/gettrips' && req.method === 'GET') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.gettripsRequest(req, res);
    }
    else if (reqUrl.pathname == '/gettripsor' && req.method === 'GET') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.gettripsOrRequest(req, res);
    }
    // GET TAKE Endpoint
    // GET localhost:3000/gettake
    else if (reqUrl.pathname == '/gettake' && req.method === 'GET') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.gettakeRequest(req, res);
    }
    else if (reqUrl.pathname == '/gettakeor' && req.method === 'GET') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.gettakeOrRequest(req, res);
    }
    // GET RATE Endpoint
    // GET localhost:3000/getrate
    else if (reqUrl.pathname == '/getrate' && req.method === 'GET') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getrateRequest(req, res);
    }
    else if (reqUrl.pathname == '/getrateor' && req.method === 'GET') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getrateOrRequest(req, res);
    }
    // GET MESSAGE Endpoint
    // GET localhost:3000/getmessage
    else if (reqUrl.pathname == '/getmessage' && req.method === 'GET') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getmessageRequest(req, res);
    }
    else if (reqUrl.pathname == '/getmessageor' && req.method === 'GET') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getmessageOrRequest(req, res);
    }
    // GET REPORT Endpoint
    // GET localhost:3000/getreport
    else if (reqUrl.pathname == '/getreport' && req.method === 'GET') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getmessageRequest(req, res);
    }
    else if (reqUrl.pathname == '/getreportor' && req.method === 'GET') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getmessageOrRequest(req, res);
    }
    // GET FAVORITE Endpoint
    // GET localhost:3000/getfavorite
    else if (reqUrl.pathname == '/getfavorite' && req.method === 'GET') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getfavoriteRequest(req, res);
    }
    else if (reqUrl.pathname == '/getfavoriteor' && req.method === 'GET') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getfavoriteOrRequest(req, res);
    }
    // GET TRIPS OPEN
    // GET localhost:3000/getopentrips
    else if (reqUrl.pathname == '/getopentrips' && req.method === 'GET') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getopenTripsRequest(req, res);
    }
    // GET USER TRIPS
    // GET localhost:3000/getusertrips
    else if (reqUrl.pathname == '/getusertrips' && req.method === 'GET') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getuserTripsRequest(req, res);
    }
    // GET USERS TO MESSAGE
    // Get localhost:3000/getuserstomessage
    else if (reqUrl.pathname == '/getuserstomessage' && req.method === 'GET') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getusersToMessageRequest(req, res);
    }
    // GET MESSAGES BETWEEN USERS
    // GET localhost:3000/getmessagesbetweenusers
    else if (reqUrl.pathname == '/getmessagesbetweenusers' && req.method === 'GET') {
        console.log('Request Type: ' + req.method + 'Endpoint: ' + reqUrl.pathname);
        service.getmessagesBetweenUsers(req, res);
    }
    // GET TRIPS MIN TO MAX Endpoint
    // GET localhost:3000/gettripsrange
    else if (reqUrl.pathname == '/gettripsrange' && req.method === 'GET') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.gettripsRangeRequest(req, res);
    }
    // PUT TRIPS isCompleted or isCancelled
    // PUT localhost:3000/updatetrips
    else if (reqUrl.pathname == '/updatetrips' && req.method === 'PUT') {
        console.log('Request Type: ' + req.method + 'Endpoint: ' + reqUrl.pathname);
        service.updatetripsRequest(req, res);
    }
    // POST USERS Endpoint
    // POST localhost:3000/postusers
    else if (reqUrl.pathname == '/postusers' && req.method === 'POST') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.postusersRequest(req, res);
    }
    // POST TRIPS Endpoint
    // POST localhost:3000/posttrips
    else if (reqUrl.pathname == '/posttrips' && req.method === 'POST') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.posttripsRequest(req, res);
    }
    // POST localhost:3000/jointrips
    else if (reqUrl.pathname == '/jointrips' && req.method === 'POST') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.jointripsRequest(req, res);
    }
    // POST MESSAGE Endpoint
    // POST localhost:3000/postmessage
    else if (reqUrl.pathname == '/postmessage' && req.method === 'POST') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.postmessageRequest(req, res);
    }
    // POST FAVORITE Endpoint
    // POST localhost:3000/postfavorite
    else if (reqUrl.pathname == '/postfavorite' && req.method === 'POST') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.postfavoriteRequest(req, res);
    }
    // Invalid Endpoint
    else {
        console.log('Request Type:' + req.method + ' Invalid Endpoint: ' + reqUrl.pathname);
        service.invalidRequest(req, res);
    }
});