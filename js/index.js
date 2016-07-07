//text formatter







//Way Point class adder

  $('.tone-trigger').each(function() {
    new Waypoint({
      element: this,
      handler: function(direction) {

        if($(this.element).hasClass('np-current') == false) {

        $('.tone-trigger').removeClass('np-current')
        $(this.element).addClass('np-current')
        playTone();
        }

      },
      offset: '50%',
      group: '.tone-trigger'
    })
  })





//Tone Generation (utilizes tone)


//Synth

var synth = new Tone.MonoSynth({
'frequency' : "C4",
'detune' : 0,
'oscillator' : {
    'type' : "square"
},
'filter':{
    'Q':1,
    'type':"lowpass",
    'rolloff':-24
},
'envelope':{
'attack':0.005,
'decay':0.2,
'sustain':0.3,
'release':1.5
},
'filterEnvelope':{
'attack':0.03,
'decay':0.9,
'sustain':0.1,
'release':1,
'baseFrequency':200,
'octaves':5,
'exponent':5
}
}
).toMaster();




//Master

//vol
var vol1 = new Tone.Volume(-16);
var vol2 = new Tone.Volume(4);

//reverb
var freeverb = new Tone.Freeverb({
    "roomSize" : 0.9,
    "dampening" : 5000,
    "wet" : 0.2
});

//delay

var pingPong = new Tone.PingPongDelay({
   "delayTime" : "6n",
   "feedback" : 0.2,
   "wet" : 0.1
});

//compressor
var comp = new Tone.Compressor(-30, 5);

//limiter
var limiter = new Tone.Limiter(-2);



Tone.Master.chain(vol1, freeverb, pingPong, comp, vol2, limiter);




var playTone = function(){

var keys = ["A","B","C","D","E","F","G"];
var key = keys[Math.floor(Math.random() * 7)];
synth.triggerAttackRelease(key + "4", "4n");
console.log(key + "4 was played, as a quarter note");

}




//CSS Class Add

var addRed = function(element){
    $(this).addClass('red');
    console.log("added red class");
}
