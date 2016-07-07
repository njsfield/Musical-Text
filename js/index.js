
//Way Point class adder

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

var $bodyText = $('.body-text').html();


var searchWord = function(word) {
$('.tone-trigger').removeClass('np-current');
var reg = new RegExp(word, "gi");
var $newBodyText = $bodyText.replace(reg, "<span class='tone-trigger'>" + word + "</span>");
$('.body-text').html($newBodyText);
triggerFunction();
}





//Search Bar

//toggling the bar

$(".fa-search").on("click", function(event){
    console.log("clicked");
    if ($(".search").hasClass("search-open")) {
        $(".search").removeClass("search-open");
    } else {
        $(".search").addClass("search-open");
    }
})

$(".fa-times").on("click", function(event){
        $(".search").removeClass("search-open");
})


//using searching field

$("#search-button").on("click", function(){
    if ($("#search-field").val()) {
        var searchVal = new RegExp($("#search-field").val(), "g")
        if (searchVal.test($bodyText)) {
            searchWord($("#search-field").val());
            $("#search-field").attr("placeholder", $("#search-field").val());
            $("#search-field").val("");
            $("#search-field").removeClass("red-background");
            $("#search-field").addClass("green-background");
        } else {
           $("#search-field").addClass("red-background");
        }
    }
})

$("#search-field").on("focus", function(){
    if ($(this).hasClass("red-background")) {
        $(this).val("");
    }
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
}




//CSS Class Add

var addRed = function(element){
    $(this).addClass('red');
    console.log("added red class");
}
