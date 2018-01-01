//Help the keyboard/input controls find their assets:
AFRAME.ASSETS_PATH = "./assets";

//kick things off by connecting to our ES cluster and presenting it in 3D
var globalState={};

d3.json("/nodes", function(error, jsondata) {
    if (error){
        AFRAME.log(error,'eslog');
    }
    else{
        var escluster = d3.select('#escluster');
        //make small dev clusters feel larger
        var esnodes = Math.max(3,jsondata.clusternodes.length)
        for (var i = 0; i < esnodes ; i++) {
            AFRAME.log("building an es node",'eslog');
            escluster.append('a-box')
            .classed('esnode',true)
            .attr('height', '1')
            .attr('material', 'src: #estexture;')
            .attr('dynamic-body','mass:500;linearDamping:.9;angularDamping:.9;')
            .append('a-animation')
                .attr('attribute',"scale")
                .attr('direction',"alternate-reverse")
                .attr('dur',Math.max(4000,Math.floor(Math.random(1)*10000)))
                .attr('from',"1 1 1")
                .attr('to',"1.2 1.2 1.2")
                .attr('repeat',"indefinite");
        }
    }
});

d3.json("/indices", function(error,jsondata){
    jsondata.indices.forEach(function(d,i){
        AFRAME.log('discovered index: ' + d,'eslog');
    });
});

//setup the text to speech
var preferredVoice = undefined;
//choose some preferred voices (lots of junk on the mac)
var synth = window.speechSynthesis;
voices = synth.getVoices();

for(i = 0; i < voices.length ; i++) {
  if(! preferredVoice && voices[i].name === 'Kate') {
    preferredVoice = voices[i];
  } else
  if (! preferredVoice && voices[i].name === 'Samantha') {
    preferredVoice = voices[i];
  }
}

var say=function (speechText){
  var utterThis = new SpeechSynthesisUtterance(speechText);
  if (preferredVoice){
      utterThis.voice=preferredVoice;
  }
  synth.speak(utterThis);
}

say('simulation is ready');