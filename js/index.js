var $bodyText = $('.body-text').html();


//Welcome box

//If no localstorage preset is found, remove hidden styles from welcome box & overlay

if (!localStorage.welcomeMessage) {
   $("#welcome-container, #welcome-overlay").show();
}

//Hide box & save in local storage


$("#welcome-box-cross, #click-to-close, #welcome-overlay").on("click",function(){
    localStorage.clear();
    $("#welcome-container, #welcome-overlay").hide();
    localStorage.setItem("welcomeMessage", "seen");
});


//show info box again
$("#info-button").on("click", function(){
    localStorage.clear();
    $("#welcome-container, #welcome-overlay").show();
})



//Way Point Class Adder

var triggerFunction = function(){
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
}


//Text Formatter

var searchWord = function(word) {
    $('.tone-trigger').removeClass('np-current');
    var reg = new RegExp(word.trim(), "gi");
    var $newBodyText = $bodyText.replace(reg, "<span class='tone-trigger'>$&</span>");
    $('.body-text').html($newBodyText);
    triggerFunction();
}


//np-current width/margin style editor

function editEmbeddedStyle(word){
    var length = word.length * 8;
    document.getElementsByTagName('style')[0].innerHTML=
        ".np-current:after {width: "+length+"px;height: "+length+"px;margin-left: -"+length+"px;}";
}


//Nav bar toggles

//toggling the bar

$(".fa-search, #search-button-cross").on("click", function(event){
    $(".search").toggleClass("open");
})



//using searching field

$("#search-button").on("click", function(){
    if ($("#search-field").val()) {
        var searchVal = new RegExp($("#search-field").val(), "g")
        if (searchVal.test($bodyText) && ($("#search-field").val()).length > 1 ) {
            searchWord($("#search-field").val());
            editEmbeddedStyle($("#search-field").val());
            $("#search-field").attr("placeholder", $("#search-field").val());
            $("#search-field").val("");
            $("#search-field").removeClass("red-background");
            $("#search-field").addClass("green-background");
        } else {
           $("#search-field").addClass("red-background");
        }
    }
})

// remove red/green background when user focusses to search

$("#search-field").on("focus", function(){
        $(this).val("");
        $(this).removeClass("red-background green-background");
})


// Edit button

//toggling the edit button

$(".fa-pencil").on("click", function(event){
    if ($(".edit").hasClass("open")) {
        $(".edit").removeClass("open");
        $(".body-text").html($("textarea").val());
        $("textarea").remove();
        $(".body-text").show();
        $bodyText = $('.body-text').html();
    } else {
        $(".edit").addClass("open");
        var inTextArea = $("<textarea>").text($bodyText);
        $(".body-text").hide();
        $(".container").append(inTextArea);
    }
})

$("#save-button").on("click", function(event){
        $(".edit").removeClass("open");
        $(".body-text").html($("textarea").val());
         $("textarea").remove();
        $(".body-text").show();
        $bodyText = $('.body-text').html();

})



// Volume button

$("#volume-button").on("click", function(){
    if( $(this).hasClass("fa-volume-up") ) {
        $(this).removeClass("fa-volume-up");
        $(this).addClass("fa-volume-down");

        // Mute master
        Tone.Master.mute = true;
    } else {
        $(this).removeClass("fa-volume-down");
        $(this).addClass("fa-volume-up");

        // UnMute master
        Tone.Master.mute = false;
    }
})


// Audio Preset Toggle Button

$("#audio-button, #audio-button-cross").on("click", function(){
    $(".audio-preset").toggleClass("open");
})


// Preset Buttons


$(".preset").on("click", function(){
    $(".preset").removeClass("preset-on");
    $(this).addClass("preset-on");
    // change presets here
    presetMaker($(this).attr("id").slice(7));
})



//Synth Generation (utilizes Tone.js)


//Global audio variables

var synthPitch = 4;
var synthType = 1;
var noteLength = "8n";

////////Synths //////

var squareSynthPresets = {
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
'attack':0.5,
'decay':0.2,
'sustain':0.3,
'release':1.5
},
'filterEnvelope':{
'attack':0.5,
'decay':0.9,
'sustain':0.1,
'release':1,
'baseFrequency':200,
'octaves':5,
'exponent':5
}
};

var sineSynthPresets = {
'frequency' : "C4",
'detune' : 0,
'oscillator' : {
    'type' : "sine"
},
'filter':{
    'Q':1,
    'type':"lowpass",
    'rolloff':-24
},
'envelope':{
'attack':0.01,
'decay':0.2,
'sustain':0.3,
'release':1.5
},
'filterEnvelope':{
'attack':0.01,
'decay':0.9,
'sustain':0.5,
'release':1,
'baseFrequency':200,
'octaves':5,
'exponent':5
},
'volume':3.5
}

var sawSynthPresets = {
'frequency' : "C4",
'detune' : 0,
'oscillator' : {
    'type' : "sawtooth"
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
'sustain':0.3,
'release':1,
'baseFrequency':220,
'octaves':5,
'exponent':5
},
'volume':1.5
};


var chordSynthPresets = {
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
'attack':0.4,
'decay':0.2,
'sustain':0.3,
'release':1.5
},
'filterEnvelope':{
'attack':0.4,
'decay':0.9,
'sustain':0.3,
'release':1,
'baseFrequency':320,
'octaves':5,
'exponent':5
},
'volume':0.5
};





//squareSynth

var theSynth = new Tone.MonoSynth(squareSynthPresets).toMaster();


function synthSetting (setting) {
    switch(setting) {
        case ("square"):
            theSynth.dispose();
            theSynth = new Tone.MonoSynth(squareSynthPresets).toMaster();
        case ("sine"):
            theSynth.dispose();
            theSynth = new Tone.MonoSynth(sineSynthPresets).toMaster();
        case ("saw"):
            theSynth.dispose();
            theSynth = new Tone.MonoSynth(sawSynthPresets).toMaster();
        case ("chord"):
            theSynth.dispose();
            theSynth = new Tone.PolySynth(2, Tone.MonoSynth).toMaster();
            theSynth.set(chordSynthPresets);
    }
}



// Preset Alterer

function presetMaker(number) {
    switch(+number) {
        case 1:
            synthSetting("square");
            synthPitch = 4;
            synthType = 1;
            noteLength = "8n";
            pingPong.wet.rampTo(0.1, 0.5);
            feedbackDelay.wet.rampTo(0, 0.5);
            syncedDelay.wet.rampTo(0, 0.5);
            vibrato.wet.rampTo(0, 0.5);
            chorus.wet.rampTo(0, 0.5);
            freeverb.wet.rampTo(0.1, 0.5);
            break;
        case 2:
            synthSetting("sine");
            synthPitch = 5;
            synthType = 2;
            noteLength = "4n";
            pingPong.wet.rampTo(0.05, 0.5);
            feedbackDelay.wet.rampTo(0, 0.5);
            syncedDelay.wet.rampTo(0, 0.5);
            vibrato.wet.rampTo(0.9, 0.5);
            chorus.wet.rampTo(0, 0.5);
            freeverb.wet.rampTo(0.05, 0.5);
            break;
        case 3:
            synthSetting("saw");
            synthPitch = 3;
            synthType = 3;
            noteLength = "2n";
            pingPong.wet.rampTo(0, 0.5);
            feedbackDelay.wet.rampTo(0.01, 0.5);
            syncedDelay.wet.rampTo(0, 0.5);
            vibrato.wet.rampTo(0.9, 0.5);
            chorus.wet.rampTo(0.5, 0.5);
            freeverb.wet.rampTo(0.01, 0.5);
            break;
        case 4:
            synthSetting("chord");
            synthPitch = 3;
            synthType = 4;
            noteLength = "4n";
            pingPong.wet.rampTo(0, 0.5);
            feedbackDelay.wet.rampTo(0, 0.5);
            syncedDelay.wet.rampTo(0.1, 0.5);
            vibrato.wet.rampTo(0.3, 0.5);
            chorus.wet.rampTo(0.2, 0.5);
            freeverb.wet.rampTo(0.05, 0.5);
            break;
        default: ;
    }
}



// Play function

var playTone = function(){

var notes = ["A","B","C","D","E","F","G"];
var note = notes[Math.floor(Math.random() * 7)];
    switch(synthType) {
        case 1:
            theSynth.triggerAttackRelease(note + synthPitch, noteLength);
            break;
        case 2:
            theSynth.triggerAttackRelease(note + synthPitch, noteLength);
            break;
        case 3:
            theSynth.triggerAttackRelease(note + synthPitch, noteLength);
            break;
        case 4:
            theSynth.triggerAttackRelease(chordMapper(note,synthPitch), noteLength);
            break;
    }
};


var chordMapper = function(note,pitch) {
    switch(note) {
    	case "A" : return ["A" + pitch, "E" + pitch];
    	case "B" : return ["B" + pitch, "Fb" + pitch];
    	case "C" : return ["C" + pitch, "G" + pitch];
    	case "D" : return ["D" + pitch, "A" + (+pitch + 1).toString()];
    	case "E" : return ["E" + pitch, "B" + (+pitch + 1).toString()];
    	case "F" : return ["F" + pitch, "C" + (+pitch + 1).toString()];
    	case "G" : return ["G" + pitch, "D" + (+pitch + 1).toString()];
    	default : return undefined;
    }
};




//Master Effects

//vol
var vol1 = new Tone.Volume(-16);
var vol2 = new Tone.Volume(4);

//reverb
var freeverb = new Tone.Freeverb({
    "roomSize" : 0.9,
    "dampening" : 5000,
    "wet" : 0.1
});


//vibrato

var vibrato = new Tone.Vibrato({
    "frequency" : 0.8,
    "depth" : 0.6,
    "type" : "sine",
    "wet"   : 0
});


////Delays

// Pingpong
var pingPong = new Tone.PingPongDelay({
   "delayTime" : "6n",
   "feedback" : 0.2,
   "wet" : 0.1
});

// Feedback
var feedbackDelay = new Tone.FeedbackDelay({
   "delayTime" : "4n",
   "feedback" : 0.4,
   "wet" : 0
});


// Synec Delay
var syncedDelay = new Tone.PingPongDelay({
   "delayTime" : "8n",
   "feedback" : 0.5,
   "wet" : 0
})


////Chorus

var chorus = new Tone.Chorus({
    "frequency":1.2,
    "delayTime":3.5,
    "depth":0.4,
    "feedback":0.1,
    "type":"sine",
    "spread":180,
    "wet" : 0
})


//compressor
var comp = new Tone.Compressor(-30, 5);

//limiter
var limiter = new Tone.Limiter(-2);



//Master Chain Control for Mobile/Desktop

(function(){
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    Tone.Master.chain(comp,limiter);
} else {
      Tone.Master.chain(vol1, freeverb, pingPong, feedbackDelay, syncedDelay, vibrato, chorus, comp, vol2, limiter)
    }
})();
