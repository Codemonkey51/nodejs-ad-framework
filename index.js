var http = require('http'),
    fileSystem = require('fs'),
    url = require('url'),
    path = require('path'),
    ad_count = 0;
let ads = ['ad-here.png','another-ad.png]; // just file name and extention
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function weightedRand(spec) {
  var i, sum=0, r=Math.random();
  for (i in spec) {
    sum += spec[i];
    if (r <= sum) return i;
  }
}
function randomLoop(weight,num){
  var n=Math.floor(Math.random()*100),amt=0;
  for(var i=0;i<weight.length;i++){
    //amt+=weight[i]; *alternative method
    //if(n<amt){
    if(n<weight[i]){
      return num[i];
    }
  }
}

function getFullUrl(){
    const queryObject = url.parse(request.url,true).query;
    //console.log(queryObject);
    var params = request.url.substring(1);
    var hostname = request.headers.host; // hostname = 'localhost:8080'
    var pathname = url.parse(request.url).pathname; // pathname = '/MyApp'
    //var params = url.parse(req.url)
    console.log(params)
    var full_url = 'http://' + hostname + pathname + params;
    const page_url = new URL(full_url);
    return page_url
}

function getUrlParams(url){
    var url_params = url.searchParams;
    return url_params
}

http.createServer(function(request, response) {
    var full_url = getFullUrl();
    var url_params = getUrlParams(full_url);
    if(url_params.has('ad') && ads.includes(url_params.get('ad'))){
    var filePath = path.join('ad/', url_params.get('ad'))
    }else{
    var ad_num = getRandomInt(ads.length);
    var filePath = path.join('ad/', ads[ad_num]);
    }
    var stat = fileSystem.statSync(filePath);

    response.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': stat.size
    });
    

    var readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(response);
    ad_count += 1;
    /*
    fileSystem.appendFile('ads-data.txt', "\n" + ads[ad_num], function (err) {
      if (err) return console.log(err);
      //console.log('Hello World > helloworld.txt');
    });
    */
    //console.log('ad request #' + ad_count.toString() + '. The ad was ' + ads[ad_num]);
    //console.log(response)
})
.listen(2000);
