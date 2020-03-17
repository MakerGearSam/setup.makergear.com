  var numPrinters = 0;

  var ipChecklist = [0, 1, 1];
  var printerDisplayed = [0, 1, 1];
  



function checkScan()
{
  scanDone = 1; //asume done
  console.log("start scan");

  for ( i = 0; i < 256; i ++)
  {
    if(ipChecklist[i] == -1)
    {
      scanDone = 0;
    }
  }


console.log(scanDone);
  if (scanDone == 1)
  {


  scanDiv = document.getElementById("scan");
  scanDiv.style.display =  "none"    ;

  }

  console.log("endscan");


}

/**
 * Get the user IP throught the webkitRTCPeerConnection
 * @param onNewIP {Function} listener function to expose the IP locally
 * @return undefined
 */
function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome

  //alert("IPstart");
  
        var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    



          var pc = new myPeerConnection({
              iceServers: []
          }),
          noop = function() {},
          localIPs = {},
          ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
          key;

          function iterateIP(ip) {
              if (!localIPs[ip]) onNewIP(ip);
              localIPs[ip] = true;
          }

           //create a bogus data channel
          pc.createDataChannel("");

          // create offer and set local description
          pc.createOffer().then(function(sdp) {
              sdp.sdp.split('\n').forEach(function(line) {
                  if (line.indexOf('candidate') < 0) return;
                  line.match(ipRegex).forEach(iterateIP);
              });
              
              pc.setLocalDescription(sdp, noop, noop);
          }).catch(function(reason) {
              // An error occurred, so handle the failure to connect
          });

          //listen for candidate events
          pc.onicecandidate = function(ice) {
              if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
              ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
          };



 //   }
    //catch(err)
    //{
      // alert ("safari");
      // onNewIP = "10.1.1.1";
      // ip = "10.1.1.1";
      // console.log("testss");

    //}

    //console.log("END IP");


}

// Usage





// function scanBonjour()
// {


//   var imgHard = new Image();
//   var imgHardUrl = "http://octodemom3.local/static/img/tentacle-20x20@2x.png";

  

//   hardCodeDiv = document.getElementById("hardCode");


//   imgHard.onload = function () 
//   {

//     newOctoUrl = this.src.split("/static");
//     hardCodeDiv.innerHTML = hardCodeDiv.innerHTML + '<br /> ' + ' <a target="_blank" href=" ' + newOctoUrl[0] + ' "> ' + ' <img src="images/demeter.png" style="width:50px;">' + '</a> <a  target="_blank"  href=" ' + newOctoUrl[0] + ' "> Printer found at ' + newOctoUrl[0] + '</a>'  + '<!-- <a href=" ' + newOctoUrl[0] + ' "><img src=" ' + this.src + '" /> </a>-->' ;
//     //numPrinters = numPrinters + 1;
//     hardCodeDiv.innerHTML =  "Bonjour Detected! 1 local printer found <br />"  +  hardCodeDiv.innerHTML  ;
//     //alert("printer found" + i + this.src);


//   }


//   imgHard.src = imgHardUrl;

  
//          //  loadJS("http://octodemom31.local/plugin/mgsetup/static/js/hostname.js");





// }




function httpRequest(address, reqType, asyncProc, ip, octoUrl) {


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 )
    {
      if(this.status == 200) 
      {

        console.log(ip + "true");
        ipChecklist[ip] = 1;


        parser = new DOMParser();
        xmlDoc = parser.parseFromString(this.response,"text/xml");
        ipDiv = document.getElementById("div"+ip);
        ipSpan = document.getElementById("ip"+ip);


        ipDiv.style.display =  "block"    ;

        //alert(ip);
       ipSpan.innerHTML = xmlDoc.getElementsByTagName("friendlyName")[0].innerHTML + "<br /> <a target=\"_blank\" href=\"" + xmlDoc.getElementsByTagName("presentationURL")[0].innerHTML + "\">" + ip +"</a>";

      }

      else

      {

      console.log(ip + "false:" + this.status + ": " + this.statusText + ": " + this.response + ": " + this.responseText + ":"+this.readyState );
      ipChecklist[ip] = 0;
      
      if(document.getElementById("extendedSearch").checked)
      {


            var imgt ;
            console.log(octoUrl);
            var imageUrl = octoUrl + '/static/img/tentacle-20x20.png';
            imageDiv = document.getElementById("images");
            imageDiv.innerHTML =    imageDiv.innerHTML + '<img src="' + imageUrl  + '" />';

              imgt = new Image();
              imgt.onload = function () 
              {

                 console.log('image sucess' + ip + ":ip"+ip);
                // alert("worked" + ip);
                  ipDiv = document.getElementById("div"+ip);
                  ipSpan = document.getElementById("ip"+ip);

                 ipSpan.innerHTML ="<br />Unknown printer at" +  ip + "<a target=\"_blank\" href=\"" + imageUrl + "\">" + ip +"</a>";

                  ipDiv.style.display =  "block"    ;
              }


              imgt.onerror = function () 
              {
                console.log('image error:' + ip);
                 //alert("failes" + ip);


              }


             

              imgt.src = imageUrl;



      }








      }



      checkScan();
    }





};

// xhttp.onerror = function() { console.log("Error occurred but I dunno what exactly.")
//   ipChecklist[ip] = 3;
//   }

//xhttp.withCredentials = true
xhttp.timeout = 30000;
xhttp.open("GET", address, asyncProc);


    xhttp.send();










// console.log(xmlDoc.documentElement.nodeName == "parsererror" ? "error while parsing" : xmlDoc.documentElement.nodeName);
// console.log("parsed");
// console.log( xmlDoc);
// console.log( "1");
// console.log( xmlDoc.getElementsByTagName("friendlyName"));

// console.log( "2");










}



function loadJS(file) {
    // DOM: Create the script element
    var jsElm = document.createElement("script");
    // set the type attribute
    jsElm.type = "application/javascript";
    // make the script element load file
    jsElm.src = file;
    // finally insert the element to the body element in order to load the script
    document.body.appendChild(jsElm);
}

function loadXML(file, ip){
//TODO: Make this more asyncronus - I guess figure out how to trigger parsing after http load

 // var req = httpRequest("http://example.com/aPageToTestForExistence.html", "HEAD");  // In this example you don't want to GET the full page contents
 // alert(req.status == 200 ? "found!" : "failed");  // We didn't provided an async proc so this will be executed after request completion only


  var xhr = new XMLHttpRequest();
  xhr.open('GET', file, false);

  // If specified, responseType must be empty string or "document"
  //xhr.responseType = 'document';

  // overrideMimeType() can be used to force the response to be parsed as XML
  xhr.overrideMimeType('text/xml');

  xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        console.log(xhr.response);
        //console.log(xhr.responseXML);
      }
    }
  };

xhr.send(null);

console.log("makeparse");

parser = new DOMParser();
xmlDoc = parser.parseFromString(xhr.response,"text/xml");

console.log(xmlDoc.documentElement.nodeName == "parsererror" ? "error while parsing" : xmlDoc.documentElement.nodeName);
console.log("parsed");
console.log( xmlDoc);
console.log( "1");
console.log( xmlDoc.getElementsByTagName("friendlyName"));

console.log( "2");
document.getElementById("ip"+ip).innerHTML = xmlDoc.getElementsByTagName("friendlyName")[0].innerHTML + "<a target=\"_blank\" href=\"" + xmlDoc.getElementsByTagName("presentationURL")[0].innerHTML + "\">*</a>";






}

function checkXML(file, ip){

  console.log(file);
  console.log(ip);
  console.log("check____");

  


  var xhr = new XMLHttpRequest();
  xhr.open('GET', "http://m3printer09p89.local/plugin/discovery/discovery.xml", true);
 // xhr.open('GET', file, false);


  xhr.overrideMimeType('text/xml'); 
  xhr.timeout = 10000;
  console.log(xhr.readyState);
  console.log(xhr.DONE);

  console.log("prelonload");
  xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {

        console.log(ip + " is good");
        console.log(xhr.responseXML);
        //return true;
      }
      else
      {
        console.log(ip + " is bad");
        //return false;
      }
    }
  };

console.log(ip + " is done");
//return false;




}


function printip()
{
  for ( i = 0; i < 256; i ++)
  {
    console.log(i + "-" +ipChecklist[i]);
  }
}

function dispPrinter()
{


}

function scanPrinter()
{
 
  for ( i = 0; i < 256; i ++)
  {
    ipChecklist[i] = -1;

  }

  for ( i = 0; i < 256; i ++)
  {
    printerDisplayed[i] = 0;

  }

  

  var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  printerDiv = document.getElementById("printers");
  printersFoundDiv = document.getElementById("printersFound");
  scanDiv = document.getElementById("scan");

  printerDiv.innerHTML = "";
  printersFoundDiv.innerHTML = "";
  scanDiv.style.display =  "block"    ;

  numPrinters = 0;

  //alert("scan printer");
    
  
  if ((is_firefox != true) && (is_chrome != true)) 
  {
    ip = document.getElementById("ipa").value;   
    subnet = String(ip).split(".");
    newIp = subnet[0] + "." + subnet[1] + "." + subnet[2] + "." ; 
    var img = new Array();
    var topScan = 256;

    for ( i = 0; i < topScan + 1; i ++)
    {
      var imageUrl = 'http://' + newIp +  i + '/static/img/tentacle-20x20.png';
      imageDiv = document.getElementById("images");
      imageDiv.innerHTML =    imageDiv.innerHTML + '<img src="' + imageUrl  + '" />';
    }

    var scanCount = 0;
    for ( i = 0; i < topScan + 1; i ++)
    {
      var imageUrl = 'http://' + newIp +  i + '/static/img/tentacle-20x20.png';
      var octoUrl = 'http://' + newIp +  i + '';
      //console.log(imageUrl);

      img[i] = new Image();
      img[i].onload = function () 
      {
        newOctoUrl = this.src.split("/static");

        console.log("NEW");
        loadJS(newOctoUrl[0] + "/plugin/mgsetup/static/js/hostname.js");
        loadXML();
        nip = newOctoUrl[0].split(".");
        holderDiv = document.getElementById("div"+nip[3].toString());
        holderDiv.style.display = "block";
        holderDiv.innerHTML = holderDiv.innerHTML +  '<br /><br /><span id="ip'+'"></span>'  + ' <a  target="_blank"  href=" ' + newOctoUrl[0] + ' "> ' + ' <img src="images/demeter.png" style="width:50px;">' + '</a> <a  target="_blank"  href=" ' + newOctoUrl[0] + ' "> Printer found at ' + newOctoUrl[0] + '</a>'  + ' <!--<a href=" ' + newOctoUrl[0] + ' "><img src=" ' + this.src + '" /> </a>-->' ;
         
        numPrinters = numPrinters + 1;
        printersFoundDiv.innerHTML =numPrinters + " IP printers found <br />"   ;

        scanCount = scanCount + 1;

      }

      img[i].onerror = function () 
      {
        scanCount = scanCount + 1;
                //cheating
        if(scanCount > 200 )
        {
          scanDiv.style.display =  "none"    ;
          //alert("last errror");//printersFoundDiv.innerHTML = numPrinters + " printers found <br />"   ;
        }
      }
 
        img[i].src = imageUrl;
    }

  }

  else
  {
        getUserIP(function(ip)
        {
          console.log(ip);
          subnet = String(ip).split(".");
          newIp = subnet[0] + "." + subnet[1] + "." + subnet[2] + "." ; 


          var scanCount = 0;
          for ( i = 0; i < 256; i ++)
          {


            console.log(i);


             var imageUrl = 'http://' + newIp +  i + '/static/img/tentacle-20x20.png';
             var octoUrl = 'http://' + newIp +  i + '';
       
             //newOctoUrl = this.src.split("/static");


            var req = httpRequest(octoUrl + "/plugin/discovery/discovery.xml", "HEAD", true, i,  octoUrl);  // In this example you don't want to GET the full page contents
            //alert(req.status == 200 ? "found!"+i : "failed"+i);  // We didn't provided an async proc so this will be executed after request completion only

            //document.getElementById("ip"+ip).innerHTML = req.status == 200 ? "found!"+i : "failed"+i;

            //console.log(req.status == 200 ? "found!"+i : "failed"+i);


            //var req = httpRequest(octoUrl + "/plugin/discovery/discovery.xml", "HEAD");  // In this example you don't want to GET the full page contents
            //alert(req.status == 200 ? "found!" : "failed");  // We didn't provided an async proc so this will be executed after request completion only




              


              //checkXML(octoUrl + "/plugin/discovery/discovery.xml",i);
              



              //console.log(checkcheck);






          }


          
        });
  

  }




};