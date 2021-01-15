
var fs = require('fs');
var path = require('path');
const { dirname } = require('path');
var tracks = [];
var base = process.env.PWD
var data = [];
var count = [];
var spotifyApi = new SpotifyWebApi();
var dates = [];
var token = localStorage.getItem('access_token')
spotifyApi.setAccessToken(token);
var read  = undefined;
var myChart;
var chartData = new Object();
var filecheck;
var noDisplay;
//getting controls from web page
//CHART canvas


//LOGIN BUTTON 
var log = document.getElementById("login");
   
//removing initally stored variables. 
 
//displaychart var

//slider left to right
var leftslide = document.getElementById("leftslide");
document.getElementById('login-button').addEventListener('click',function(){
    //localStorage.init = true;
    //console.log(localStorage.init)
})

//call function to initalize app 
//getRecentlyPlayed_old();
StartUp();

async function StartUp(){
    if(localStorage.access_token != 'undefined'){
        
        document.getElementById('login-button').style.display = 'none';
        document.getElementById('login-dir').style.display = 'none';
        document.getElementById('desc').style.display = 'none';
    }
    let legend = document.getElementById('legend')
    //console.log(legend)    
    tracks = await getRecentlyPlayed()
    filecheck = fs.existsSync(base + '/dist/data/trackdata.txt')
    
    for(let i = 0; i < tracks.length; i++){
        let track = tracks[i]
        
        //console.log(label)
        let button = addPlayButton(track.url, i)
        button.style.width = '20rem'
        //label.style.width = button.width
        //label.style.height = button.height
        //console.log(button.outerHTML)
        let accord = new Accordion(track.name + ' by ' + track.artists, button.outerHTML)
        
       // accord.SetButtonWH(parseInt(button.width), parseInt(button.height/2))
        accord.SetContentWH(parseInt(button.width), parseInt(button.height))
        accord.SetContentInnerMargin(10)
        accord.SetButtonClassName('acc-bttn')
        accord.SetContentClassName('acc-cont')
        accord.SetTransitions(true, 3)
        //legend.style.width = button.width + 'px'
        legend.appendChild(accord)
       // document.body.appendChild(legend)

        ReadTrackFiles(track) //track.name + ' by ' + track.artists
   

        //console.log(accord.getBoundingClientRect())
        //accord.setAttribute('width', button.width)
        //accord.setAttribute('height', button.height) 
        //accord.SetButtonClassName('acc-bttn')
       // accord.SetContentClassName('acc-cont')
       // console.log(accord)
    }
    //localStorage.clear()
    

}

function ReadTrackFiles(_song){
   // console.log(ReadData())
    //console.log(base + '/dist/data/trackdata.txt')
    
   // console.log(filecheck)

    switch(filecheck){
        case false:
                fs.writeFile(base + '/dist/data/trackdata.txt', JSON.stringify(_song), function (err) {
            
                });
            break;
        case true:
                WriteData(_song)
            break;

    }

}



function ReadData(){
    try {
        return fs.readFileSync(base + '/dist/data/trackdata.txt', 'utf8')
      } catch (err) {
        console.error(err)
        return false
      }
}

function WriteData(_data){
   // console.log(data.name)
    //let parser = JSON.stringify
    if(ReadData().length == 0){
        console.log('writing')
        fs.writeFileSync(base + '/dist/data/trackdata.txt', JSON.stringify(_data))
        return
    }
    else{
        try {
            let data = ReadData()
            let splitted = data.split("\n"); 
            let parsed = []
           // let obj = JSON.parse(splitted)
            for(let i = 0; i < splitted.length; i++){
                let split = splitted[i]
                //console.log(split.name)
                //let obj = JSON.parse(split)
                //console.log(obj)
                parsed.push(JSON.parse(split))
                parsed[i].idx = i
                //console.log(parsed.name) 
            }
           
            let par = parsed.filter(item => item.name === _data.name)
            if(par.length > 0){
               
                //console.log(par)
            }
            else{
                //fs.writeFileSync(base + '/dist/data/trackdata.txt', data + '\n' + JSON.stringify(_data))
            }

            //console.log(parsed.includes(_data))
            //console.log(JSON.stringify(_data))
           // console.log(splitted.includes(data.name))
           
           //fs.writeFileSync(base + '/dist/data/trackdata.txt', data + '\n' + JSON.stringify(_data))
          
        } catch (err) {
          console.error(err)
        }
    
    }
    
    
}

function ContainsObj(obj, arr){
    let cont = false
    for(let i = 0; i < arr.length; i++){
        let item = arr[i]
        if(obj.name == item.name && obj.artists == item.artists){
            console.log('FOUND')
            cont = true
            return cont
        }
    }

    return cont
}

function getRecentlyPlayed(){ 
   
    let songs = []


    spotifyApi.getMyRecentlyPlayedTracks(function(err, _data){
        
        if (err);
        else{
            
            data = _data.items;
            //for each data item we have// max is 20
            for(let item of data){
                //console.log(item)
                //pushing tracks to track array
                songs.push(processTrack(item));
                
            }
          
        }
    })

    

    return new Promise((res, rej)=>{
        setTimeout(()=> res(songs), 2000)
    }).then((data)=>{
        //console.log(data)
        return data
    })
   
}

function processTrack(_item){
    //getting name, artists and album etc.
  let track = _item.track;
  let url = track.external_urls.spotify;
  
  let time = _item.played_at;
  let name = track.name;
  let album = track.album;
  let img = album.images[0];
  //creating a temp song obj
  var song = new Object();
  let artists = null;
  song.name = name;
  song.url = url;
  song.time = time
  //getting all featured artists
  for(let g = 0; g < track.artists.length; g++){
      if(artists != null){
          artists += ", " + track.artists[g].name
      }
      if(artists == null){
          artists = track.artists[g].name;
      }
      
  }
  //constructing song object
  song.artists = artists
  let song_date = time.slice(0, time.indexOf("T"));
  song.date = song_date;
  //title to cross reference in data base from text file 
  song.title = "["+song.name + " by " + song.artists + "_on " + song.date+"]";
  song.count = 1; //count would be atleast one if its from recently played
  //console.log(song.date)
  readFile(song);
  return song;
}

async function getRecentlyPlayed_old(){
    spotifyApi.getMyRecentlyPlayedTracks(function(err, _data) {
        
        //temp arrays for each data item from spotify 
        let bgc = [];
        let bdc = [];
        let names = [];
        let external_urls = [];
        if (err);
        else{
            data = _data.items;
            //for each data item we have// max is 20
            for(var item of data){
                console.log(item)
                //pushing tracks to track array
                tracks.push(processTrack(item));
                
            }
            for(let i = 0; i < tracks.length; i++){
                //reading the file and comparing from local storage 
            
                external_urls.push(tracks[i].url);
                console.log(tracks[i].title);
                //pushing count to array
                count.push(localStorage.getItem(tracks[i].name));
                //name labels for axis
                names.push("#"+ (i + 1));
                //getting random colors for background and chart 
                bgc.push('rgba('+rC(255)+', '+rC(255)+', '+rC(255)+', 0.75)');
                bdc.push('rgba('+rC(255)+', '+rC(255)+', '+rC(255)+', 0.75)');
                //how data should be displayed in text 
                let print = tracks[i].name + " by " + tracks[i].artists;
                //adding items to legnd 
                appendLegend(names[i], "legend", "leg-item", "accordion", print, "Count: "+count[i], "song");  
                //appenging buttons to each legend item
                let legs = document.getElementsByClassName('leg-item'); //getting legend items 
                let leg = legs[i];
                leg.style.backgroundColor = bgc[i]; //storing the same background color as seen on graph 
                if(leg.children[0] != null){
                        
                    leg.append(addPlayButton(tracks[i].url, "playbutton"));
                }
            }
            
            //constructing chart data into chartData obj
            chartData.count = count;
            chartData.names = names;
            chartData.bgc = bgc;
            chartData.bdc = bdc;
            chartData.urls = external_urls;
        
            //we can show the display 
            disp.style.opacity = "100%";
            //draws the chart
            //drawChart(chartData);
            //makes legend items expandable 
            //expandable();
        } 
        
       
        
    });
}




//draws chart from the chart data we constructed
function drawChart(_chartData){
    //defining chart properties
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: _chartData.names,
            datasets: [{
                label: '# Toggle Bar Graph(Click Me)',
                data: _chartData.count,
                backgroundColor: //first generated random colors 
                _chartData.bgc
                ,
                borderColor: 
                _chartData.bdc //second generated random colors
                ,
                borderWidth: 1,
                
            }, {

                label: '# Toggle Line Graph(Click Me)',
                data: _chartData.count,
                backgroundColor: 'rgba('+rC(255)+', '+rC(255)+', '+rC(255)+', 0.75)',
                type: 'line'
            }], 
            labels: _chartData.names
        },
        options: {
           
            scales: {
                yAxes: [{
                    scaleLabel:{
                        display: true,
                        labelString: 'Number of Times Played'
                    },
                    ticks: {
                        beginAtZero: true,
                        fontColor: '#3B3561',
                        fontSize: 16
                        
                    }
                }],
                xAxes: [{
                    scaleLabel:{
                        display: true,
                        labelString: 'Songs (#)'
                    },
                    ticks: {
                        beginAtZero: true,
                        fontColor: '#3B3561',
                        fontSize: 16
                    }
                }]
            },
            
        }
    });
    myChart.ctx.canvas.style.backgroundColor= "white";
    log.style.display = "none";
    //reload the page if the local storage data was not properly added
    if((myChart.data.datasets[0].data[19] == null && myChart.data.datasets[1].data[19] == null)||
    (myChart.data.datasets[0].data[0] == null && myChart.data.datasets[1].data[0] == null)){
        console.log("NOTHING");
        window.location.reload();
        
    }
  
}


    //getting the proper information from each element from spotify


//according effect with expandable labels for graph 
function expandable(){
   
    var acc = document.getElementsByClassName("accordion");
    var i;
    //for each item in the accordian 
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            //switching between styles 
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
            panel.style.display = "none";
            } else {
            panel.style.display = "block";
           
            }
        });
    }
}

//adding a play button to the dive of our choosing 
function addPlayButton(_url, _newID){
    //creating a small iframe
    let frame = document.createElement("iframe");
    //embedding spotify song link
    let n = _url.indexOf(".com/");
    let com = _url.split(".com/")
    //new url
    _url = com[0] + ".com/" + "embed/"+com[1];
    //dimensions and properties 
    frame.src = _url;
    frame.width = 500;
    frame.height = 80;
    frame.id = _newID;
    frame.class = "playbutton";
    frame.frameBorder = 0;
    frame.allowtransparency="true";
    frame.allow="encrypted-media";
    return frame;
}

//populate item with text 
function addTextItem(_value, _id, _newID){
    var p = document.createElement("p");
    var parent = document.getElementById(_id);
    p.setAttribute('id',_newID);
    p.setAttribute('class',_newID);
    p.appendChild(document.createTextNode(_value));

    parent.appendChild(p);
}

//appending labels to our own chart legend 
function appendLegend(_value, _parentID, _elementID, _className, _expVal, _count, _pID){
    let button = document.createElement("button");
    let div = document.createElement("div");
    let parent = document.getElementById(_parentID);
   // parent.style.opacity = "100%";
    parent.style.overflowY = "scroll";
    let p = document.createElement("p");
    let count = document.createElement("p");
    count.textContent = _count;
    //count class needed for page refresh 
    count.setAttribute("class", "count");
    p.setAttribute("id", _pID);
    p.textContent = _expVal;
    
    div.setAttribute("id", _elementID);
    button.setAttribute("class",_className);
    button.textContent = _value;
    div.setAttribute("class", _elementID);
    p.appendChild(count);
    div.appendChild(p);
    parent.appendChild(button);
    parent.appendChild(div);
    
}



//reading in file and checking to see if we've listened to it in the past month 
function readFile(_track){
    var local = 'dist/data/data.txt';
    var banjo = "https://people.rit.edu/tkg3369/235/project2/data/data.txt";
    var song = _track;
   
    let num = 1;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //document.getElementById('placeholder').innerHTML = xhr.responseText;
            read = xhr.responseText;
            var db_t = read.split("\n");
            //console.log(db_t[1]);
            var m = _track.title.indexOf("_on");
            var nm = _track.title.slice(0, m);
                //console.log(nm);
                for(let g = 0; g < db_t.length; g++){
                    let db = db_t[g];
                    var n = db.indexOf("_on");
                    db = db.slice(0, n);
                    //console.log(db);
                    if(nm == db){
                        num++;
                        song.count = num;
                   
                    }
                }
                //writing each song to memory that we found with the correct count 
               // writeToMemory(song.name, song.count);
                
        }
        
    }
    xhr.open('GET', local, true); //https://people.rit.edu/tkg3369/235/project2/data/data.txt
    xhr.send();
    
    
    
}





//creates a random number based off of our upper bound used for RGB colors 
function rC(max){
    return Math.floor(Math.random() * Math.floor(max));
}

//helper for writing to memory 
async function writeToMemory(_key, _value){
    localStorage.setItem(_key, _value);
    
}





