/*

Copyright 2013, Jeroen Lammerts / Patrick Birza
This product is developed for learning pupose. 
We are IT students from Hanzehogeschool Groningen, The Netherlands
This product is base on the WebAudio Drum Machine 1.0 by Google.

Copyright 2011, Google Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

    * Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above
copyright notice, this list of conditions and the following disclaimer
in the documentation and/or other materials provided with the
distribution.
    * Neither the name of Google Inc. nor the names of its
contributors may be used to endorse or promote products derived from
this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/


var kitInstruments = [
    {
        'name':'Crash',
        'values' : ['x', 'X'],
        /*'values' : ['x', 'X', 'S', 'C'],*/
        'valueNames' : ['Crash', 'Accented Crash']
        /*'valueNames' : ['Crash', 'Accented Crash', 'Splash', 'China']*/
    },
    {
        'name':'Tom 1',
        'values' : ['o', 'O'],
        'valueNames' : ['Note', 'Accented note']
    },
    {
        'name':'Tom 2',
        'values' : ['o', 'O'],
        'valueNames' : ['Note', 'Accented note']
    },
    {
        'name':'Tom 3',
        'values' : ['o', 'O'],
        'valueNames' : ['Note', 'Accented note']
    },
    {
        'name':'Hihat',
        'values' : ['x', 'X', 'o', 'O'],
        'valueNames' : ['Normal closed hihat', 'Accented closed hihat', 'Open hihat', 'Accented open hihat']
    },
    {
        'name':'Snare',
        //'values' : ['o', 'O', 'x', 'X', '@', 'g', 'f', 'd', 'b'],
        'values' : ['o', 'O'],
        'valueNames' : ['Normal note', 'Accented note']
        /*'valueNames' : ['Normal note', 'Accented note', 'Cross stick', 'Accented Cross stick', 'Rimshot', 'Ghost note', 'Flam', 'Drag', 'Roll']*/
    },

    {
        'name':'Bassdrum',
        'values' : ['o', 'O'],
        'valueNames' : ['Note', 'Accented note']
    }
];

var measures = 4;
var counts = 4;
var countTime = 4;
var totalNotes;

$(document).ready(function(){
    
    if($('#editor').length){
        $('#editor').bind("contextmenu", function () {
            return false;
        });       
    }

    var youtubeVideo = '';

    $('#youtube').bind('keyup change', function(){

        var videoUrl = $(this).val();

        if(videoUrl != youtubeVideo){

            if(videoUrl == ''){
                $('#video_container').fadeOut();
            } else {

                var video_id = videoUrl.split('v=')[1];

                var ampersandPosition = video_id.indexOf('&');
                if(ampersandPosition != -1) {
                    video_id = video_id.substring(0, ampersandPosition);
                }

                $('#video_frame').attr('src', 'http://www.youtube.com/embed/'+video_id);

                if(video_id != ''){
                    $.getJSON('http://gdata.youtube.com/feeds/api/videos/'+video_id+'?v=2&alt=jsonc',function(data,status,xhr){
                        $('#title').val(data.data.title);
                    });
                }

                $('#youtube').val(video_id);
                $('#video_container').fadeIn();

            }
            
            youtubeVideo = video_id;

        } 

    });

});

// Events
// init() once the page has finished loading.

if($('#editor_wrap_container').length){
    window.onload = init;
    window.ondragstart = function() { return false; } 
}

var context;
var convolver;
var compressor;
var masterGainNode;
var effectLevelNode;

// Each effect impulse response has a specific overall desired dry and wet volume.
// For example in the telephone filter, it's necessary to make the dry volume 0 to correctly hear the effect.
var effectDryMix = 1.0;
var effectWetMix = 1.0;

var timeoutId;

var startTime;
var lastDrawTime = -1;

var kits;

var kNumInstruments = 6;
var kInitialKitIndex = 10;
var kMaxSwing = .08;

var currentKit;

var loop = false;

var beatReset = {"kitIndex":0,"effectIndex":0,"tempo":100,"swingFactor":0,"effectMix":0.25,"kickPitchVal":0.5,"snarePitchVal":0.5,"hihatPitchVal":0.5,"tom1PitchVal":0.5,"tom2PitchVal":0.5,"tom3PitchVal":0.5,"rhythm1":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"rhythm2":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"rhythm3":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"rhythm4":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"rhythm5":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"rhythm6":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
var beatDemo = [
    {"kitIndex":13,"effectIndex":18,"tempo":120,"swingFactor":0,"effectMix":0.19718309859154926,"kickPitchVal":0.5,"snarePitchVal":0.5,"hihatPitchVal":0.5,"tom1PitchVal":0.5,"tom2PitchVal":0.5,"tom3PitchVal":0.5,"rhythm1":[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"rhythm2":[0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0],"rhythm3":[0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0],"rhythm4":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0],"rhythm5":[0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0],"rhythm6":[0,0,0,0,0,0,0,2,0,2,2,0,0,0,0,0]},
    {"kitIndex":4,"effectIndex":3,"tempo":100,"swingFactor":0,"effectMix":0.2,"kickPitchVal":0.46478873239436624,"snarePitchVal":0.45070422535211263,"hihatPitchVal":0.15492957746478875,"tom1PitchVal":0.7183098591549295,"tom2PitchVal":0.704225352112676,"tom3PitchVal":0.8028169014084507,"rhythm1":[2,1,0,0,0,0,0,0,2,1,2,1,0,0,0,0],"rhythm2":[0,0,0,0,2,0,0,0,0,1,1,0,2,0,0,0],"rhythm3":[0,1,2,1,0,1,2,1,0,1,2,1,0,1,2,1],"rhythm4":[0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0],"rhythm5":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0],"rhythm6":[0,0,0,0,0,0,0,2,1,2,1,0,0,0,0,0]},
    {"kitIndex":2,"effectIndex":5,"tempo":100,"swingFactor":0,"effectMix":0.25,"kickPitchVal":0.5,"snarePitchVal":0.5,"hihatPitchVal":0.5211267605633803,"tom1PitchVal":0.23943661971830987,"tom2PitchVal":0.21126760563380287,"tom3PitchVal":0.2535211267605634,"rhythm1":[2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0],"rhythm2":[0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0],"rhythm3":[0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],"rhythm4":[1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],"rhythm5":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0],"rhythm6":[0,0,1,0,1,0,0,2,0,2,0,0,1,0,0,0]},
    {"kitIndex":1,"effectIndex":4,"tempo":120,"swingFactor":0,"effectMix":0.25,"kickPitchVal":0.7887323943661972,"snarePitchVal":0.49295774647887325,"hihatPitchVal":0.5,"tom1PitchVal":0.323943661971831,"tom2PitchVal":0.3943661971830986,"tom3PitchVal":0.323943661971831,"rhythm1":[2,0,0,0,0,0,0,2,2,0,0,0,0,0,0,1],"rhythm2":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"rhythm3":[0,0,1,0,2,0,1,0,1,0,1,0,2,0,2,0],"rhythm4":[2,0,2,0,0,0,0,0,2,0,0,0,0,2,0,0],"rhythm5":[0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0],"rhythm6":[0,2,0,0,0,2,0,0,0,2,0,0,0,0,0,0]},
    {"kitIndex":0,"effectIndex":1,"tempo":60,"swingFactor":0.5419847328244275,"effectMix":0.25,"kickPitchVal":0.5,"snarePitchVal":0.5,"hihatPitchVal":0.5,"tom1PitchVal":0.5,"tom2PitchVal":0.5,"tom3PitchVal":0.5,"rhythm1":[2,2,0,1,2,2,0,1,2,2,0,1,2,2,0,1],"rhythm2":[0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0],"rhythm3":[2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1],"rhythm4":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"rhythm5":[0,0,1,0,0,1,0,1,0,0,1,0,0,0,1,0],"rhythm6":[1,0,0,1,0,1,0,1,1,0,0,1,1,1,1,0]},
];

var playing = false;

function cloneBeat(source) {

    var beat = new Object();
    
    beat.kitIndex = source.kitIndex;
    beat.effectIndex = source.effectIndex;
    beat.tempo = source.tempo;
    beat.swingFactor = source.swingFactor;
    beat.effectMix = source.effectMix;
    beat.kickPitchVal = source.kickPitchVal;
    beat.snarePitchVal = source.snarePitchVal;
    beat.hihatPitchVal = source.hihatPitchVal;
    beat.tom1PitchVal = source.tom1PitchVal;
    beat.tom2PitchVal = source.tom2PitchVal;
    beat.tom3PitchVal = source.tom3PitchVal;
    beat.crashPitchVal = source.crashPitchVal;
    beat.rhythm1 = source.rhythm1.slice(0);        // slice(0) is an easy way to copy the full array
    beat.rhythm2 = source.rhythm2.slice(0);
    beat.rhythm3 = source.rhythm3.slice(0);
    beat.rhythm4 = source.rhythm4.slice(0);
    beat.rhythm5 = source.rhythm5.slice(0);
    beat.rhythm6 = source.rhythm6.slice(0);

    if(source.rhythms){
        beat.rhythms = source.rhythms;
    }
    
    return beat;
}

// theBeat is the object representing the current beat/groove
// ... it is saved/loaded via JSON
var theBeat = cloneBeat(beatReset);

kickPitch = snarePitch = hihatPitch = tom1Pitch = tom2Pitch = tom3Pitch = crashPitch = 0;

var mouseCapture = null;
var mouseCaptureOffset = 0;

//var loopLength = 16;
//var loopLength = measures * counts;

var rhythmIndex = 0;
var kMinTempo = 50;
var kMaxTempo = 180;
var noteTime = 0.0;

var instruments = ['Kick', 'Snare', 'HiHat', 'Tom1', 'Tom2', 'Tom3'];

var volumes = [0, 0.3, 1, 2];

var kitCount = 0;
/*
var kitName = [
    "R8",
    "CR78",
    "KPR77",
    "LINN",
    "Kit3",
    "Kit8",
    "Techno",
    "Stark",
    "breakbeat8",
    "breakbeat9",
    "breakbeat13",
    "acoustic-kit",
    "acoustic-kit2",
    "4OP-FM",
    "TheCheebacabra1",
    "TheCheebacabra2"
    ];

var kitNamePretty = [
    "Roland R-8",
    "Roland CR-78",
    "Korg KPR-77",
    "LinnDrum",
    "Kit 3",
    "Kit 8",
    "Techno",
    "Stark",
    "Breakbeat 8",
    "Breakbeat 9",
    "Breakbeat 13",
    "Acoustic Kit",
    "Acoustic Kit 2",
    "4OP-FM",
    "The Cheebacabra 1",
    "The Cheebacabra 2"
    ];
*/
var kitName = [
    "acoustic-kit2"
    ];

var kitNamePretty = [
    "Acoustic Kit"
    ];

function Kit(name) {
    this.name = name;

    this.pathName = function() {
        var pathName = "/sounds/drum-samples/" + this.name + "/";
        return pathName;
    };

    this.kickBuffer = 0;
    this.snareBuffer = 0;
    this.hihatBuffer = 0;

    this.instrumentCount = kNumInstruments;
    this.instrumentLoadCount = 0;
    
    this.startedLoading = false;
    this.isLoaded = false;
    
    this.firstLoad = false;

    this.callback = null;
}

Kit.prototype.setCallback = function(callback) {
    this.callback = callback;
}

Kit.prototype.setFirstLoad = function() {
    this.firstLoad = true;
}

Kit.prototype.load = function() {
    if (this.startedLoading)
        return;
        
    this.startedLoading = true;
        
    var pathName = this.pathName();

    var kickPath = pathName + "kick.wav";
    var snarePath = pathName + "snare.wav";
    var hihatPath = pathName + "hihat.wav";
    var tom1Path = pathName + "tom1.wav";
    var tom2Path = pathName + "tom2.wav";
    var tom3Path = pathName + "tom3.wav";
    var openHihatPath = pathName + "open_hihat.wav";
    var crashPath = pathName + "crash.wav";

    this.loadSample(0, kickPath, false);
    this.loadSample(1, snarePath, false);
    this.loadSample(2, hihatPath, true);  // we're panning only the hihat
    this.loadSample(3, tom1Path, false);
    this.loadSample(4, tom2Path, false);
    this.loadSample(5, tom3Path, false);
    this.loadSample(6, openHihatPath, true);
    this.loadSample(7, crashPath, false);
}

Kit.prototype.loadSample = function(sampleID, url, mixToMono) {
    // Load asynchronously

    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var kit = this;

    request.onload = function() {
        var buffer = context.createBuffer(request.response, mixToMono);
        switch (sampleID) {
            case 0: kit.kickBuffer = buffer; break;
            case 1: kit.snareBuffer = buffer; break;
            case 2: kit.hihatBuffer = buffer; break;
            case 3: kit.tom1 = buffer; break;
            case 4: kit.tom2 = buffer; break;
            case 5: kit.tom3 = buffer; break;
            case 6: kit.openHihat = buffer; break;
            case 7: kit.crash = buffer; break;
        }

        kit.instrumentLoadCount++;
        if (kit.instrumentLoadCount == kit.instrumentCount) {
            kit.isLoaded = true;

            if (kit.firstLoad) {
                theBeat.setKitLoaded();
            }
            if(kit.callback != null){
                kit.callback();
            }
        }
    }

    request.send();
}

var impulseResponseInfoList = [
    // Impulse responses - each one represents a unique linear effect.
    {"name":"No Effect", "url":"undefined", "dryMix":1, "wetMix":0},
    {"name":"Spreader 1", "url":"/impulse-responses/spreader50-65ms.wav",        "dryMix":0.8, "wetMix":1.4},
    {"name":"Spreader 2", "url":"/impulse-responses/noise-spreader1.wav",        "dryMix":1, "wetMix":1},
    {"name":"Spring Reverb", "url":"/impulse-responses/feedback-spring.wav",     "dryMix":1, "wetMix":1},
    {"name":"Space Oddity", "url":"/impulse-responses/filter-rhythm3.wav",       "dryMix":1, "wetMix":0.7},
    {"name":"Reverse", "url":"/impulse-responses/spatialized5.wav",              "dryMix":1, "wetMix":1},
    {"name":"Huge Reverse", "url":"/impulse-responses/matrix6-backwards.wav",    "dryMix":0, "wetMix":0.7},
    {"name":"Telephone Filter", "url":"/impulse-responses/filter-telephone.wav", "dryMix":0, "wetMix":1.2},
    {"name":"Lopass Filter", "url":"/impulse-responses/filter-lopass160.wav",    "dryMix":0, "wetMix":0.5},
    {"name":"Hipass Filter", "url":"/impulse-responses/filter-hipass5000.wav",   "dryMix":0, "wetMix":4.0},
    {"name":"Comb 1", "url":"/impulse-responses/comb-saw1.wav",                  "dryMix":0, "wetMix":0.7},
    {"name":"Comb 2", "url":"/impulse-responses/comb-saw2.wav",                  "dryMix":0, "wetMix":1.0},
    {"name":"Cosmic Ping", "url":"/impulse-responses/cosmic-ping-long.wav",      "dryMix":0, "wetMix":0.9},
    {"name":"Kitchen", "url":"/impulse-responses/house-impulses/kitchen-true-stereo.wav", "dryMix":1, "wetMix":1},
    {"name":"Living Room", "url":"/impulse-responses/house-impulses/dining-living-true-stereo.wav", "dryMix":1, "wetMix":1},
    {"name":"Living-Bedroom", "url":"/impulse-responses/house-impulses/living-bedroom-leveled.wav", "dryMix":1, "wetMix":1},
    {"name":"Dining-Far-Kitchen", "url":"/impulse-responses/house-impulses/dining-far-kitchen.wav", "dryMix":1, "wetMix":1},
    {"name":"Medium Hall 1", "url":"/impulse-responses/matrix-reverb2.wav",      "dryMix":1, "wetMix":1},
    {"name":"Medium Hall 2", "url":"/impulse-responses/matrix-reverb3.wav",      "dryMix":1, "wetMix":1},
    {"name":"Large Hall", "url":"/impulse-responses/spatialized4.wav",           "dryMix":1, "wetMix":0.5},
    {"name":"Peculiar", "url":"/impulse-responses/peculiar-backwards.wav",       "dryMix":1, "wetMix":1},
    {"name":"Backslap", "url":"/impulse-responses/backslap1.wav",                "dryMix":1, "wetMix":1},
    {"name":"Warehouse", "url":"/impulse-responses/tim-warehouse/cardiod-rear-35-10/cardiod-rear-levelled.wav", "dryMix":1, "wetMix":1},
    {"name":"Diffusor", "url":"/impulse-responses/diffusor3.wav",                "dryMix":1, "wetMix":1},
    {"name":"Binaural Hall", "url":"/impulse-responses/bin_dfeq/s2_r4_bd.wav",   "dryMix":1, "wetMix":0.5},
    {"name":"Huge", "url":"/impulse-responses/matrix-reverb6.wav",               "dryMix":1, "wetMix":0.7},
]

var impulseResponseList = 0;

function ImpulseResponse(url, index) {
    this.url = url;
    this.index = index;
    this.startedLoading = false;
    this.isLoaded_ = false;
    this.buffer = 0;
    
    this.firstLoad = false;

    this.callback = null;
}

ImpulseResponse.prototype.setCallback = function(callback) {
    this.callback = callback;
}

ImpulseResponse.prototype.setFirstLoad = function() {
    this.firstLoad = true;
}

ImpulseResponse.prototype.isLoaded = function() {
    return this.isLoaded_;
}

ImpulseResponse.prototype.load = function() {
    if (this.startedLoading) {
        return;
    }
    
    this.startedLoading = true;

    // Load asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", this.url, true);
    request.responseType = "arraybuffer";
    this.request = request;
    
    var asset = this;

    request.onload = function() {
        asset.buffer = context.createBuffer(request.response, false);
        asset.isLoaded_ = true;
        
        if (asset.firstLoad) {
            theBeat.setEffectLoaded();
        }
        if(asset.callback != null){
            asset.callback();
        }        
    }

    request.send();
}

function startLoadingAssets() {
    impulseResponseList = new Array();

    for (i = 0; i < impulseResponseInfoList.length; i++) {
        impulseResponseList[i] = new ImpulseResponse(impulseResponseInfoList[i].url, i);
    }
    
    // Initialize drum kits
    var numKits = kitName.length;
    kits = new Array(numKits);
    for (var i  = 0; i < numKits; i++) {
        kits[i] = new Kit(kitName[i]);
    }

    //console.log('startLoadingAssets');
    //console.log(theBeat);

    if(theBeat.effectIndex > 0){
        var effect = impulseResponseList[theBeat.effectIndex];
        effect.setFirstLoad();
        effect.load();
    } else {
        theBeat.setEffectLoaded();
    }

    var kit = kits[theBeat.kitIndex];
    kit.setFirstLoad();
    kit.load();

    // These effects and kits will keep track of a particular demo, so we can change
    // the loading status in the UI.
    /***effect.setDemoIndex(demoIndex);
    kit.setDemoIndex(demoIndex);*/
    
    
        
    
    // Start loading the assets used by the presets first, in order of the presets.
    /*for (var demoIndex = 0; demoIndex < 5; ++demoIndex) {
        var effect = impulseResponseList[beatDemo[demoIndex].effectIndex];
        var kit = kits[beatDemo[demoIndex].kitIndex];
        
        // These effects and kits will keep track of a particular demo, so we can change
        // the loading status in the UI.
        effect.setDemoIndex(demoIndex);
        kit.setDemoIndex(demoIndex);
        
        effect.load();
        kit.load();
    }*/

    // Setup initial drumkit
    currentKit = kits[theBeat.kitIndex];    
    
    // Then load the remaining assets.
    // Note that any assets which have previously started loading will be skipped over.
   /* 
    var numKits = kitName.length;
    for (var i  = 0; i < numKits; i++) {
        kits[i].load();
    } 

    // Start at 1 to skip "No Effect"
    for (i = 1; i < impulseResponseInfoList.length; i++) {
        impulseResponseList[i].load();
    }
    */

}

function demoButtonURL(demoIndex) {
    var n = demoIndex + 1;
    var demoName = "demo" + n;
    var url = "/img/editor/btn_" + demoName + ".png";
    return url;
}

// This gets rid of the loading spinner in each of the demo buttons.
function showDemoAvailable(demoIndex /* zero-based */) {
    var url = demoButtonURL(demoIndex);
    var n = demoIndex + 1;
    var demoName = "demo" + n;
    var demo = document.getElementById(demoName);
    demo.src = url;
    
    // Enable play button and assign it to demo 2.
    if (demoIndex == 1) {
        showPlayAvailable();
        //loadBeat(beatDemo[1]);


        var elTextarea = document.getElementById('save_textarea');
        theBeat = JSON.parse(elTextarea.value);

        //console.log(theBeat);

        // Set drumkit
        currentKit = kits[theBeat.kitIndex];
        document.getElementById('kitname').innerHTML = kitNamePretty[theBeat.kitIndex];

        // Set effect
        setEffect(theBeat.effectIndex);

        // Change the volume of the convolution effect.
        setEffectLevel(theBeat);

        // Apply values from sliders
        sliderSetValue('effect_thumb', theBeat.effectMix);
        sliderSetValue('kick_thumb', theBeat.kickPitchVal);
        sliderSetValue('snare_thumb', theBeat.snarePitchVal);
        sliderSetValue('hihat_thumb', theBeat.hihatPitchVal);
        sliderSetValue('tom1_thumb', theBeat.tom1PitchVal);
        sliderSetValue('tom2_thumb', theBeat.tom2PitchVal);
        sliderSetValue('tom3_thumb', theBeat.tom3PitchVal);
        sliderSetValue('swing_thumb', theBeat.swingFactor);

        // Clear out the text area post-processing
        //elTextarea.value = '';

        updateControls();

    // Uncomment to allow autoplay
    //     handlePlay();
    }
}

// This gets rid of the loading spinner on the play button.
function showPlayAvailable() {

    /*var play = document.getElementById("play");
    play.src = "/img/editor/btn_play.png";*/

}

function loadSavedBeat(){
    var elTextarea = document.getElementById('save_textarea');
    theBeat = JSON.parse(elTextarea.value);

    totalNotes = theBeat.rhythms.length*counts*countTime;

    theBeat.isKitLoaded = false;
    theBeat.isEffectLoaded = false;

    theBeat.setKitLoaded = function() {
        this.isKitLoaded = true;
        this.checkIsLoaded();
    };

    theBeat.setEffectLoaded = function() {
        this.isEffectLoaded = true;
        this.checkIsLoaded();
    };

    theBeat.checkIsLoaded = function() {
        if (this.isLoaded()) {

            setEffect(theBeat.effectIndex);
            setEffectLevel(theBeat);

            sliderSetValue('effect_thumb', theBeat.effectMix);
            sliderSetValue('kick_thumb', theBeat.kickPitchVal);
            sliderSetValue('snare_thumb', theBeat.snarePitchVal);
            sliderSetValue('hihat_thumb', theBeat.hihatPitchVal);
            sliderSetValue('tom1_thumb', theBeat.tom1PitchVal);
            sliderSetValue('tom2_thumb', theBeat.tom2PitchVal);
            sliderSetValue('tom3_thumb', theBeat.tom3PitchVal);
            sliderSetValue('swing_thumb', theBeat.swingFactor);

            updateControls();

        }
    };

    theBeat.isLoaded = function() {
        return this.isKitLoaded && this.isEffectLoaded;
    };

}



function init() {
    // Let the beat demos know when all of their assets have been loaded.
    // Add some new methods to support this.
    /*for (var i = 0; i < beatDemo.length; ++i) {
        beatDemo[i].index = i;
        beatDemo[i].isKitLoaded = false;
        beatDemo[i].isEffectLoaded = false;

        beatDemo[i].setKitLoaded = function() {
            this.isKitLoaded = true;
            this.checkIsLoaded();
        };

        beatDemo[i].setEffectLoaded = function() {
            this.isEffectLoaded = true;
            this.checkIsLoaded();
        };

        beatDemo[i].checkIsLoaded = function() {
            if (this.isLoaded()) {
                showDemoAvailable(this.index); 
            }
        };

        beatDemo[i].isLoaded = function() {
            return this.isKitLoaded && this.isEffectLoaded;
        };
    }*/

    loadSavedBeat();
        
    startLoadingAssets();

    context = new webkitAudioContext();

    var finalMixNode;
    if (context.createDynamicsCompressor) {
        // Create a dynamics compressor to sweeten the overall mix.
        compressor = context.createDynamicsCompressor();
        compressor.connect(context.destination);
        finalMixNode = compressor;
    } else {
        // No compressor available in this implementation.
        finalMixNode = context.destination;
    }

    // Create master volume.
    masterGainNode = context.createGainNode();
    masterGainNode.gain.value = 0.7; // reduce overall volume to avoid clipping
    masterGainNode.connect(finalMixNode);

    // Create effect volume.
    effectLevelNode = context.createGainNode();
    effectLevelNode.gain.value = 1.0; // effect level slider controls this
    effectLevelNode.connect(masterGainNode);

    // Create convolver for effect
    convolver = context.createConvolver();
    convolver.connect(effectLevelNode);


    //var elKitCombo = document.getElementById('kitcombo');
    //elKitCombo.addEventListener("mousedown", handleKitComboMouseDown, true);

    /*var elEffectCombo = document.getElementById('effectcombo');
    elEffectCombo.addEventListener("mousedown", handleEffectComboMouseDown, true);*/

    document.body.addEventListener("mousedown", handleBodyMouseDown, true);

    initControls();
    //updateControls();
}

function initControls() {
    // Initialize note buttons
    initButtons();
    makeKitList();
    makeEffectList();

    // sliders
    /*document.getElementById('effect_thumb').addEventListener('mousedown', handleSliderMouseDown, true);
    document.getElementById('tom1_thumb').addEventListener('mousedown', handleSliderMouseDown, true);
    document.getElementById('tom2_thumb').addEventListener('mousedown', handleSliderMouseDown, true);
    document.getElementById('tom3_thumb').addEventListener('mousedown', handleSliderMouseDown, true);
    document.getElementById('hihat_thumb').addEventListener('mousedown', handleSliderMouseDown, true);
    document.getElementById('snare_thumb').addEventListener('mousedown', handleSliderMouseDown, true);
    document.getElementById('kick_thumb').addEventListener('mousedown', handleSliderMouseDown, true);
    document.getElementById('swing_thumb').addEventListener('mousedown', handleSliderMouseDown, true);

    document.getElementById('effect_thumb').addEventListener('dblclick', handleSliderDoubleClick, true);
    document.getElementById('tom1_thumb').addEventListener('dblclick', handleSliderDoubleClick, true);
    document.getElementById('tom2_thumb').addEventListener('dblclick', handleSliderDoubleClick, true);
    document.getElementById('tom3_thumb').addEventListener('dblclick', handleSliderDoubleClick, true);
    document.getElementById('hihat_thumb').addEventListener('dblclick', handleSliderDoubleClick, true);
    document.getElementById('snare_thumb').addEventListener('dblclick', handleSliderDoubleClick, true);
    document.getElementById('kick_thumb').addEventListener('dblclick', handleSliderDoubleClick, true);
    document.getElementById('swing_thumb').addEventListener('dblclick', handleSliderDoubleClick, true);*/

    // tool buttons
    /*document.getElementById('play').addEventListener('mousedown', handlePlay, true);
    document.getElementById('stop').addEventListener('mousedown', handleStop, true);*/

    $('#btn_play').click(function(e){
        if($(this).find('i').hasClass('icon-play')){
            handlePlay(e);
        } else {
            handleStop(e);
        }        
    });

    $('#btn_loop').click(function(){
        $(this).toggleClass('active');
        if(loop){
            loop = false;
        } else {
            loop = true;
        }
    });

    $('#save_btn').click(function(e){
        e.preventDefault();
        handleSave();
    });

    //document.getElementById('save_btn').addEventListener('mousedown', handleSave, true);

    //document.getElementById('save_ok').addEventListener('mousedown', handleSaveOk, true);
    document.getElementById('load').addEventListener('mousedown', handleLoad, true);
    //document.getElementById('load_ok').addEventListener('mousedown', handleLoadOk, true);
    //document.getElementById('load_cancel').addEventListener('mousedown', handleLoadCancel, true);
    document.getElementById('reset').addEventListener('mousedown', handleReset, true);
    document.getElementById('demo1').addEventListener('mousedown', handleDemoMouseDown, true);
    document.getElementById('demo2').addEventListener('mousedown', handleDemoMouseDown, true);
    document.getElementById('demo3').addEventListener('mousedown', handleDemoMouseDown, true);
    document.getElementById('demo4').addEventListener('mousedown', handleDemoMouseDown, true);
    document.getElementById('demo5').addEventListener('mousedown', handleDemoMouseDown, true);

    /*var elBody = document.getElementById('body');
    elBody.addEventListener('mousemove', handleMouseMove, true);
    elBody.addEventListener('mouseup', handleMouseUp, true);*/

    $('#bpm_up').click(function(){
        tempoIncrease();
    });

    $('#bpm_down').click(function(){
        tempoDecrease();
    });

    $('#swing_slider').slider({
        min: 0,
        max: 1,
        step: 0.1,
        tooltip: 'hide'
    }).on('slideStop', function(e){
        sliderSetValue('swing_thumb', e.value);
    });

}

function initButtons() {        

    $('#editor').html('Loading beat...');

    html = '';
    var led = 0;

    for(i=0; i<theBeat.rhythms.length; i++){

        if(i==0 || (i % 2 == 0)){

            html += '<table class="instruments" id="instruments_' + i + '">';
            var ie = i;
            $.each(kitInstruments, function(i, values) {
                html += '<tr><td>'+kitInstruments[i]['name']+'</td></tr>';
                
                var contentValues = '<table class="table table-condensed">';
                $.each(kitInstruments[i]['values'], function(j, item){
                    contentValues += '<tr><td>' + item + '</td><td class="description">' + kitInstruments[i]['valueNames'][j] + '</tr>';
                });
                contentValues += '</table>';
                
                /*$(html).insertBefore('#instruments_' + ie + ' tr:last').popover({
                    html : true,
                    trigger : 'hover',
                    placement: 'right',
                    title: 'Legenda',
                    content: contentValues
                });*/
            });
            html += '</table>';

        }    

        html += '<table class="table" id="measure_' + i + '">';
        html += '   <tr class="first">';
        html += '       <td>';
        html += '           ' + (i+1) + '.';
        html += '       </td>';
        html += '       <td colspan="3">';
        html += '           <div class="btn-group pull-right">';
        html += '               <a href="#" class="btn"><i class="icon-edit"></i></a>';
        html += '               <a href="#" class="btn deleteMeasure"><i class="icon-trash"></i></a>';
        html += '               <a href="javascript: void(0);" class="btn addMeasure"><i class="icon-plus"></i></a>';
        html += '           </div>';
        html += '       </td>';                         
        html += '   </tr>';
        for(ki=0; ki<kitInstruments.length; ki++){
        /*html += '   <tr>';*/
            for(j=0; j<counts; j++){
                html += '       <td>';
                html += '           <table>';
                html += '               <tr>';
                for(k=0; k<4; k++){
                    //html += '                   <td><input type="text" name="note_' + ki + '_' + i + '_' + j + '_' + k + '" id="note_' + ki + '_' + i + '_' + j + '_' + k + '" placeholder="-" /></td>';
                    //html += '                   <td><img src="/img/editor/button_off.png" id="note_' + i + '_' + ki + '_' + j + '_' + k + '" class="note" /></td>';
                    html += '                   <td id="note_' + i + '_' + ki + '_' + j + '_' + k + '" class="note inactive">-</td>';
                }
                html += '               </tr>';
                html += '           </table>';
                html += '       </td>';
            }
            html += '   </tr>';
        }      

        html += '   <tr>';
        for(j=1; j<=counts; j++){
            html += '       <td>';
            html += '           <table class="count">';
            html += '               <tr>';
            html += '                   <td>' + j + '</td>';
            html += '                   <td>e</td>';
            html += '                   <td>+</td>';
            html += '                   <td>a</td>';
            html += '               </tr>';
            html += '           </table>';                                  
            html += '       </td>'; 
        }                       
        html += '   </tr>'; 

        html += '   <tr>';
        for(j=0; j<counts; j++){
            html += '       <td>';
            html += '           <table>';
            html += '               <tr>';
            for(k=0; k<4; k++){
                //html += '                   <td><img id="LED_' + i + '_' + j + '_' + k + '" src="/img/editor/LED_off.png"></td>';
                html += '                   <td><img id="led_' + led + '" src="/img/editor/LED_off.png" class="led"></td>';
                led++;
            }
            html += '               </tr>';
            html += '           </table>';                                  
            html += '       </td>'; 
        }                       
        html += '   </tr>';

        html += '</table>';    

    }

    $('#editor').html(html);
    $('#editor .note').mousedown(function(e){
        switch(e.which){
            case 1:
                noteLeftClick(e);
                break;
            case 3:
                noteRightClick(e);
                break
        }
        
    });    
    $('#editor .addMeasure').click(function(e){
        var measureId = $(this).closest('.table').attr('id').replace('measure_', '');
        insertMeasure(measureId);
    });    

    /*$('#deleteWindow').bind('show', function() {

    }).modal({ backdrop: true });*/

    $('#editor .deleteMeasure').click(function(e){

        var measureId = $(this).closest('.table').attr('id').replace('measure_', '');

        $('#deleteWindow').bind('show', function() {
            $('#deleteReal').click(function(){
                deleteMeasure(measureId);
                $('#deleteWindow').modal('hide');
            });
        }) .modal({
            backdrop: true
        });

    });

}

function insertMeasure(afterMeasure){
    afterMeasure++;
    handleStop();
    theBeat.rhythms.splice(afterMeasure, 0, new Array());
    totalNotes = theBeat.rhythms.length*counts*countTime;
    initButtons();
    drawAllNotes();
}
function deleteMeasure(afterMeasure){
    handleStop();
    theBeat.rhythms.splice(afterMeasure, 1);
    totalNotes = theBeat.rhythms.length*counts*countTime;
    initButtons();
    drawAllNotes();
}

function makeEffectList() {
    
    var numEffects = impulseResponseInfoList.length;

    html = '';
    for (var i = 0; i < numEffects; i++) {
        html += '<li id="effect_' + i + '"'; 
        if(i == theBeat.kitIndex){
            html += 'class="disabled"';
        }
        html += '><a href="javascript: void(0);">' + impulseResponseInfoList[i].name + '</a></li>';
    }

    $('#effects_list').html(html);
    $('#effects_list a').click(function(e){
        handleEffectMouseDown($(this));
    });
    //$('#active_effect').html(impulseResponseInfoList[i].name);    

    /*var elList = document.getElementById('effectlist');
    var numEffects = impulseResponseInfoList.length;

    
    var elItem = document.createElement('li');
    elItem.innerHTML = 'None';
    elItem.addEventListener("mousedown", handleEffectMouseDown, true);
    
    for (var i = 0; i < numEffects; i++) {
        var elItem = document.createElement('li');
        elItem.innerHTML = impulseResponseInfoList[i].name;
        elList.appendChild(elItem);
        elItem.addEventListener("mousedown", handleEffectMouseDown, true);
    }*/
}

function makeKitList() {
    var elList = document.getElementById('kitlist');
    var numKits = kitName.length;

    html = '';
    for (var i = 0; i < numKits; i++) {
        html += '<li id="kit_' + i + '"><a href="javascript: void(0);">' + kitNamePretty[i] + '</a></li>';
    }

    $('#kits_list').html(html);
    $('#kits_list a').click(function(e){
        handleKitMouseDown($(this));
    });
    //$('#active_kit').html(kitNamePretty[theBeat.kitIndex]);

}

function advanceNote() {

    var stop = false;

    // Advance time by a 16th note...
    var secondsPerBeat = 60.0 / theBeat.tempo;

    playingNote++;

    if(playingNote == countTime){
        playingNote = 0;
        playingCount++;
    }
    if(playingCount == counts){
        playingCount = 0;
        playingMeasure++;
    }
    if(playingMeasure == theBeat.rhythms.length){
        playingMeasure = 0;
        if(!loop){
            handleStop();
            stop = true;
        }
    }

    //console.log(playingNote + ' ' + playingCount + ' ' + playingMeasure);

    rhythmIndex++;
    if (rhythmIndex == totalNotes) {
        rhythmIndex = 0;
    }

        // apply swing    
    if (rhythmIndex % 2) {
        noteTime += (0.25 + kMaxSwing * theBeat.swingFactor) * secondsPerBeat;
    } else {
        noteTime += (0.25 - kMaxSwing * theBeat.swingFactor) * secondsPerBeat;
    }

    return stop;

}

function playNote(buffer, pan, x, y, z, sendGain, mainGain, playbackRate, noteTime) {
    // Create the note
    var voice = context.createBufferSource();
    voice.buffer = buffer;
    voice.playbackRate.value = playbackRate;

    // Optionally, connect to a panner
    var finalNode;
    if (pan) {
        var panner = context.createPanner();
        panner.panningModel = webkitAudioPannerNode.HRTF;
        panner.setPosition(x, y, z);
        voice.connect(panner);
        finalNode = panner;
    } else {
        finalNode = voice;
    }

    // Connect to dry mix
    var dryGainNode = context.createGainNode();
    dryGainNode.gain.value = mainGain * effectDryMix;
    finalNode.connect(dryGainNode);
    dryGainNode.connect(masterGainNode);

    // Connect to wet mix
    var wetGainNode = context.createGainNode();
    wetGainNode.gain.value = sendGain;
    finalNode.connect(wetGainNode);
    wetGainNode.connect(convolver);

    voice.noteOn(noteTime);
}

function schedule() {
    var currentTime = context.currentTime;
    var stop;

    // The sequence starts at startTime, so normalize currentTime so that it's 0 at the start of the sequence.
    currentTime -= startTime;

    while (noteTime < currentTime + 0.200) {
        // Convert noteTime to context time.
        var contextPlayTime = noteTime + startTime;
        
        if($.isArray(theBeat.rhythms[playingMeasure])){

            // kick
            if ($.isArray(theBeat.rhythms[playingMeasure][6]) && $.isArray(theBeat.rhythms[playingMeasure][6][playingCount]) && theBeat.rhythms[playingMeasure][6][playingCount][playingNote]) {
                
                var noteKey = theBeat.rhythms[playingMeasure][6][playingCount][playingNote];
                switch(noteKey){
                    case 'o': playNote(currentKit.kickBuffer, false, 0,0,-2, 0.5, volumes[2] * 1.0, kickPitch, contextPlayTime); break;
                    case 'O': playNote(currentKit.kickBuffer, false, 0,0,-2, 0.5, volumes[3] * 1.0, kickPitch, contextPlayTime); break;
                }

            }

            // Snare
            if ($.isArray(theBeat.rhythms[playingMeasure][5]) && $.isArray(theBeat.rhythms[playingMeasure][5][playingCount]) && theBeat.rhythms[playingMeasure][5][playingCount][playingNote]) {
                
                var noteKey = theBeat.rhythms[playingMeasure][5][playingCount][playingNote];
                switch(noteKey){
                    case 'o': playNote(currentKit.snareBuffer, false, 0,0,-2, 1, volumes[2] * 0.6, snarePitch, contextPlayTime); break;
                    case 'O': playNote(currentKit.snareBuffer, false, 0,0,-2, 1, volumes[3] * 0.6, snarePitch, contextPlayTime); break;
                    case 'g': playNote(currentKit.snareBuffer, false, 0,0,-2, 1, volumes[1] * 0.6, snarePitch, contextPlayTime); break;
                }
                
            }

            // Hihat
            if ($.isArray(theBeat.rhythms[playingMeasure][4]) && $.isArray(theBeat.rhythms[playingMeasure][4][playingCount]) && theBeat.rhythms[playingMeasure][4][playingCount][playingNote]) {

                var noteKey = theBeat.rhythms[playingMeasure][4][playingCount][playingNote];
                switch(noteKey){
                    case 'x': playNote(currentKit.hihatBuffer, true, -0.2, 0, -1.0, 1, volumes[2] * 0.7, hihatPitch, contextPlayTime); break;
                    case 'X': playNote(currentKit.hihatBuffer, true, -0.2, 0, -1.0, 1, volumes[3] * 0.7, hihatPitch, contextPlayTime); break;
                    case 'o': playNote(currentKit.openHihat, true, -0.2, 0, -1.0, 1, volumes[2] * 0.7, hihatPitch, contextPlayTime); break;
                    case 'O': playNote(currentKit.openHihat, true, -0.2, 0, -1.0, 1, volumes[3] * 0.7, hihatPitch, contextPlayTime); break;
                }
                
            }

            // Toms    
            if ($.isArray(theBeat.rhythms[playingMeasure][3]) && $.isArray(theBeat.rhythms[playingMeasure][3][playingCount]) && theBeat.rhythms[playingMeasure][3][playingCount][playingNote]) {
                
                var noteKey = theBeat.rhythms[playingMeasure][3][playingCount][playingNote];
                switch(noteKey){                
                    case 'o': playNote(currentKit.tom1, false, 0,0,-2, 1, volumes[2] * 0.6, tom1Pitch, contextPlayTime); break;
                }
            
            }

            if ($.isArray(theBeat.rhythms[playingMeasure][2]) && $.isArray(theBeat.rhythms[playingMeasure][2][playingCount]) && theBeat.rhythms[playingMeasure][2][playingCount][playingNote]) {
                
                var noteKey = theBeat.rhythms[playingMeasure][2][playingCount][playingNote];
                switch(noteKey){                
                    case 'o': playNote(currentKit.tom2, false, 0,0,-2, 1, volumes[2] * 0.6, tom2Pitch, contextPlayTime); break;
                }

            }

            if ($.isArray(theBeat.rhythms[playingMeasure][1]) && $.isArray(theBeat.rhythms[playingMeasure][1][playingCount]) && theBeat.rhythms[playingMeasure][1][playingCount][playingNote]) {
                
                var noteKey = theBeat.rhythms[playingMeasure][1][playingCount][playingNote];
                switch(noteKey){                
                    case 'o': playNote(currentKit.tom3, false, 0,0,-2, 1, volumes[2] * 0.6, tom3Pitch, contextPlayTime); break;
                }
            }

            if ($.isArray(theBeat.rhythms[playingMeasure][0]) && $.isArray(theBeat.rhythms[playingMeasure][0][playingCount]) && theBeat.rhythms[playingMeasure][0][playingCount][playingNote]) {
                
                var noteKey = theBeat.rhythms[playingMeasure][0][playingCount][playingNote];
                switch(noteKey){                
                    case 'x': playNote(currentKit.crash, false, 0,0,-2, 1, volumes[2] * 0.6, crashPitch, contextPlayTime); break;
                    case 'X': playNote(currentKit.crash, false, 0,0,-2, 1, volumes[3] * 0.6, crashPitch, contextPlayTime); break;
                }

            }

        }
        
        // Attempt to synchronize drawing time with sound
        if (noteTime != lastDrawTime) {
            lastDrawTime = noteTime;
            drawPlayhead((rhythmIndex + (totalNotes-1)) % totalNotes);
        }

        stop = advanceNote();
    }

    if(!stop){
        timeoutId = setTimeout("schedule()", 0);
    }
}

function tempoIncrease() {
    theBeat.tempo = Math.min(kMaxTempo, theBeat.tempo+4);
    $('#bpm').html(theBeat.tempo);
}

function tempoDecrease() {
    theBeat.tempo = Math.max(kMinTempo, theBeat.tempo-4);
    $('#bpm').html(theBeat.tempo);
}

function handleSliderMouseDown(event) {
    mouseCapture = event.target.id;

    // calculate offset of mousedown on slider
    var el = event.target;
    if (mouseCapture == 'swing_thumb') {
        var thumbX = 0;    
        do {
            thumbX += el.offsetLeft;
        } while (el = el.offsetParent);

        mouseCaptureOffset = event.pageX - thumbX;
    } else {
        var thumbY = 0;    
        do {
            thumbY += el.offsetTop;
        } while (el = el.offsetParent);

        mouseCaptureOffset = event.pageY - thumbY;
    }
}

function handleSliderDoubleClick(event) {
    var id = event.target.id;
    if (id != 'swing_thumb' && id != 'effect_thumb') {
        mouseCapture = null;
        sliderSetValue(event.target.id, 0.5);
        updateControls();
    }
}

function handleMouseMove(event) {
    if (!mouseCapture) return;
    
    var elThumb = document.getElementById(mouseCapture);
    var elTrack = elThumb.parentNode;

    if (mouseCapture != 'swing_thumb') {
        var thumbH = elThumb.clientHeight;
        var trackH = elTrack.clientHeight;
        var travelH = trackH - thumbH;

        var trackY = 0;
        var el = elTrack;
        do {
            trackY += el.offsetTop;
        } while (el = el.offsetParent);

        var offsetY = Math.max(0, Math.min(travelH, event.pageY - mouseCaptureOffset - trackY));
        var value = 1.0 - offsetY / travelH;
        elThumb.style.top = travelH * (1.0 - value) + 'px';
    } else {
        var thumbW = elThumb.clientWidth;
        var trackW = elTrack.clientWidth;
        var travelW = trackW - thumbW;

        var trackX = 0;
        var el = elTrack;
        do {
            trackX += el.offsetLeft;
        } while (el = el.offsetParent);

        var offsetX = Math.max(0, Math.min(travelW, event.pageX - mouseCaptureOffset - trackX));
        var value = offsetX / travelW;
        elThumb.style.left = travelW * value + 'px';
    }

    sliderSetValue(mouseCapture, value);
}

function handleMouseUp() {
    mouseCapture = null;
}

function sliderSetValue(slider, value) {
    var pitchRate = Math.pow(2.0, 2.0 * (value - 0.5));
    
    switch(slider) {
    case 'effect_thumb':
        // Change the volume of the convolution effect.
        theBeat.effectMix = value;
        setEffectLevel(theBeat);            
        break;
    case 'kick_thumb':
        theBeat.kickPitchVal = value;
        kickPitch = pitchRate;
        break;
    case 'snare_thumb':
        theBeat.snarePitchVal = value;
        snarePitch = pitchRate;
        break;
    case 'hihat_thumb':
        theBeat.hihatPitchVal = value;
        hihatPitch = pitchRate;
        break;
    case 'tom1_thumb':
        theBeat.tom1PitchVal = value;
        tom1Pitch = pitchRate;
        break;
    case 'tom2_thumb':
        theBeat.tom2PitchVal = value;
        tom2Pitch = pitchRate;
        break;
    case 'tom3_thumb':
        theBeat.tom3PitchVal = value;
        tom3Pitch = pitchRate;
        break;
    case 'swing_thumb':
        theBeat.swingFactor = value;
        break; 
    }
}

function sliderSetPosition(slider, value) {
    var elThumb = document.getElementById(slider);
    var elTrack = elThumb.parentNode;

    if (slider == 'swing_thumb') {
        var thumbW = elThumb.clientWidth;
        var trackW = elTrack.clientWidth;
        var travelW = trackW - thumbW;

        elThumb.style.left = travelW * value + 'px';
    } else {
        var thumbH = elThumb.clientHeight;
        var trackH = elTrack.clientHeight;
        var travelH = trackH - thumbH;

        elThumb.style.top = travelH * (1.0 - value) + 'px';
    }
}

function noteLeftClick(event) {
    var notes = theBeat.rhythm1;
    
    var instrumentIndex;
    var rhythmIndex = 2;

    var elId = event.target.id;

    var noteInfo = elId.split('_');
    var measureIndex = noteInfo[1];
    var instrumentIndex = noteInfo[2];
    var countIndex = noteInfo[3];
    var noteIndex = noteInfo[4];

    /*rhythmIndex = elId.substr(elId.indexOf('_') + 1, 2);
    instrumentIndex = instruments.indexOf(elId.substr(0, elId.indexOf('_')));
        
    switch (instrumentIndex) {
        case 0: notes = theBeat.rhythm1; break;
        case 1: notes = theBeat.rhythm2; break;
        case 2: notes = theBeat.rhythm3; break;
        case 3: notes = theBeat.rhythm4; break;
        case 4: notes = theBeat.rhythm5; break;
        case 5: notes = theBeat.rhythm6; break;
    }

    notes[rhythmIndex] = (notes[rhythmIndex] + 1) % 3;*/


    if(!$.isArray(theBeat.rhythms)){
        theBeat.rhythms = new Array();
    }    
    if(!$.isArray(theBeat.rhythms[measureIndex])){
        theBeat.rhythms[measureIndex] = new Array();
    }    
    if(!$.isArray(theBeat.rhythms[measureIndex][instrumentIndex])){
        theBeat.rhythms[measureIndex][instrumentIndex] = new Array();
    }    
    if(!$.isArray(theBeat.rhythms[measureIndex][instrumentIndex][countIndex])){
        theBeat.rhythms[measureIndex][instrumentIndex][countIndex] = new Array();
    }


    if(!theBeat.rhythms[measureIndex][instrumentIndex][countIndex][noteIndex] || theBeat.rhythms[measureIndex][instrumentIndex][countIndex][noteIndex] == '-'){
        var value = kitInstruments[instrumentIndex]['values'][0];
        theBeat.rhythms[measureIndex][instrumentIndex][countIndex][noteIndex] = value;
    } else {
        var newVal = '-';
        var value = theBeat.rhythms[measureIndex][instrumentIndex][countIndex][noteIndex];
        $.each(kitInstruments[instrumentIndex]['values'], function(i, item){
            if(item == value){
                if((kitInstruments[instrumentIndex]['values'].length-1) > i){
                    newVal = kitInstruments[instrumentIndex]['values'][i+1];
                }
            }
        });

        theBeat.rhythms[measureIndex][instrumentIndex][countIndex][noteIndex] = newVal;
    }

    noteKey = theBeat.rhythms[measureIndex][instrumentIndex][countIndex][noteIndex];


                    /*if(!$(this).val()){
                        $(this).val(kitInstruments[index]['values'][0]);
                    } else {
                        var newVal = '';
                        var value = $(this).val();
                        $.each(kitInstruments[index]['values'], function(i, item){
                            if(item == value){
                                if(kitInstruments[index]['values'].length > i){
                                    newVal = kitInstruments[index]['values'][i+1];
                                }
                            }
                        });
                        $(this).val(newVal);
                    }


    var noteKey = 2;
    if(theBeat.rhythms[measureIndex][instrumentIndex][countIndex][noteIndex] == 2){
        noteKey = 0
    }
    theBeat.rhythms[measureIndex][instrumentIndex][countIndex][noteIndex] = noteKey;*/

/*
    drawNote(notes[rhythmIndex], rhythmIndex, instrumentIndex);*/

    drawNote(noteKey, measureIndex, instrumentIndex, countIndex, noteIndex);

    /*var note = notes[rhythmIndex];
    
    if (note && !playing) {
        switch(instrumentIndex) {
        case 0:  // Kick
          playNote(currentKit.kickBuffer, false, 0,0,-2, 0.5 * theBeat.effectMix, volumes[note] * 1.0, kickPitch, 0);
          break;

        case 1:  // Snare
          playNote(currentKit.snareBuffer, false, 0,0,-2, theBeat.effectMix, volumes[note] * 0.6, snarePitch, 0);
          break;

        case 2:  // Hihat
          // Pan the hihat according to sequence position.
          playNote(currentKit.hihatBuffer, true, -0.2, 0, -1.0, theBeat.effectMix, volumes[note] * 0.7, hihatPitch, 0);
          break;

        case 3:  // Tom 1   
          playNote(currentKit.tom1, false, 0,0,-2, theBeat.effectMix, volumes[note] * 0.6, tom1Pitch, 0);
          break;

        case 4:  // Tom 2   
          playNote(currentKit.tom2, false, 0,0,-2, theBeat.effectMix, volumes[note] * 0.6, tom2Pitch, 0);
          break;

        case 5:  // Tom 3   
          playNote(currentKit.tom3, false, 0,0,-2, theBeat.effectMix, volumes[note] * 0.6, tom3Pitch, 0);
          break;
        }
    }*/
}

function noteRightClick(e){

    console.log('right click');

    var notes = theBeat.rhythm1;
    
    var instrumentIndex;
    var rhythmIndex = 2;

    var elId = event.target.id;

    var noteInfo = elId.split('_');
    var measureIndex = noteInfo[1];
    var instrumentIndex = noteInfo[2];
    var countIndex = noteInfo[3];
    var noteIndex = noteInfo[4];  

    if(!$.isArray(theBeat.rhythms)){
        theBeat.rhythms = new Array();
    }    
    if(!$.isArray(theBeat.rhythms[measureIndex])){
        theBeat.rhythms[measureIndex] = new Array();
    }    
    if(!$.isArray(theBeat.rhythms[measureIndex][instrumentIndex])){
        theBeat.rhythms[measureIndex][instrumentIndex] = new Array();
    }    
    if(!$.isArray(theBeat.rhythms[measureIndex][instrumentIndex][countIndex])){
        theBeat.rhythms[measureIndex][instrumentIndex][countIndex] = new Array();
    }

    noteKey = '-';

    theBeat.rhythms[measureIndex][instrumentIndex][countIndex][noteIndex] = noteKey;

    drawNote(noteKey, measureIndex, instrumentIndex, countIndex, noteIndex);

}

function handleKitComboMouseDown(event) {
    document.getElementById('kitcombo').classList.toggle('active');
}

function handleKitMouseDown(button) {

    var index = kitNamePretty.indexOf(button.html());
    $('#active_kit').html(kitNamePretty[index]);
    $('#kits_list .disabled').removeClass('disabled');
    $('#kit_' + index).addClass('disabled');

    newKit = kits[index];
    if(!newKit.isLoaded){
        newKit.setCallback(function(){
            theBeat.kitIndex = index
            currentKit = kits[index];
        });
        newKit.load();
    } else {
        theBeat.kitIndex = index
        currentKit = kits[index];
    }
    
}

function handleBodyMouseDown(event) {
    var elKitcombo = document.getElementById('kitcombo');
    var elEffectcombo = document.getElementById('effectcombo');

    if (elKitcombo.classList.contains('active') && !isDescendantOfId(event.target, 'kitcombo_container')) {
        elKitcombo.classList.remove('active');
        if (!isDescendantOfId(event.target, 'effectcombo_container')) {
            event.stopPropagation();
        }
    }
    
    if (elEffectcombo.classList.contains('active') && !isDescendantOfId(event.target, 'effectcombo')) {
        elEffectcombo.classList.remove('active');
        if (!isDescendantOfId(event.target, 'kitcombo_container')) {
            event.stopPropagation();
        }
    }    
}

function isDescendantOfId(el, id) {
    if (el.parentElement) {
        if (el.parentElement.id == id) {
            return true;
        } else {
            return isDescendantOfId(el.parentElement, id);
        }
    } else {
        return false;
    }
}

function handleEffectComboMouseDown(event) {
    if (event.target.id != 'effectlist') {
        document.getElementById('effectcombo').classList.toggle('active');
    }
}

function handleEffectMouseDown(button) {

    for (var i = 0; i < impulseResponseInfoList.length; ++i) {
        if (impulseResponseInfoList[i].name == button.html()) {

            // Hack - if effect is turned all the way down - turn up effect slider.
            // ... since they just explicitly chose an effect from the list.
            if (theBeat.effectMix == 0)
                theBeat.effectMix = 0.5;

            setEffect(i);
            break;
        }
    }

}

function setEffect(index) {

    $('#active_effect').html(impulseResponseInfoList[index].name);
    $('#effects_list .disabled').removeClass('disabled');
    $('#effect_' + index).addClass('disabled');

    newEffect = impulseResponseList[index];
    if(index > 0 && !newEffect.isLoaded()){

        newEffect.setCallback(function(){

            theBeat.effectIndex = index;
            effectDryMix = impulseResponseInfoList[index].dryMix;
            effectWetMix = impulseResponseInfoList[index].wetMix;            
            convolver.buffer = impulseResponseList[index].buffer;

          // Hack - if the effect is meant to be entirely wet (not unprocessed signal)
          // then put the effect level all the way up.
            if (effectDryMix == 0)
                theBeat.effectMix = 1;

            setEffectLevel(theBeat);
            sliderSetValue('effect_thumb', theBeat.effectMix);
            updateControls();

        });
        newEffect.load();
    } else {

            theBeat.effectIndex = index;
            effectDryMix = impulseResponseInfoList[index].dryMix;
            effectWetMix = impulseResponseInfoList[index].wetMix;            
            convolver.buffer = impulseResponseList[index].buffer;

          // Hack - if the effect is meant to be entirely wet (not unprocessed signal)
          // then put the effect level all the way up.
            if (effectDryMix == 0)
                theBeat.effectMix = 1;

            setEffectLevel(theBeat);
            sliderSetValue('effect_thumb', theBeat.effectMix);
            updateControls();

    }

}

function setEffectLevel() {        
    // Factor in both the preset's effect level and the blending level (effectWetMix) stored in the effect itself.
    effectLevelNode.gain.value = theBeat.effectMix * effectWetMix;
}


function handleDemoMouseDown(event) {
    var loaded = false;
    
    switch(event.target.id) {
        case 'demo1':
            loaded = loadBeat(beatDemo[0]);    
            break;
        case 'demo2':
            loaded = loadBeat(beatDemo[1]);    
            break;
        case 'demo3':
            loaded = loadBeat(beatDemo[2]);    
            break;
        case 'demo4':
            loaded = loadBeat(beatDemo[3]);    
            break;
        case 'demo5':
            loaded = loadBeat(beatDemo[4]);    
            break;
    }
    
    if (loaded)
        handlePlay();
}

function handlePlay(event) {

    $('#btn_play i').removeClass('icon-play');
    $('#btn_play i').addClass('icon-stop');
    $('#btn_play').addClass('active');
    
    playing = true;
    noteTime = 0.0;
    startTime = context.currentTime + 0.005;

    playingMeasure  = 0;
    playingCount = 0;
    playingNote = 0;

    schedule();

    /*document.getElementById('play').classList.add('playing');
    document.getElementById('stop').classList.add('playing');*/

}

function handleStop(event) {

    $('#btn_play i').removeClass('icon-stop');
    $('#btn_play i').addClass('icon-play');
    $('#btn_play').removeClass('active');

    playing = false;
    clearTimeout(timeoutId);

    $('.led').attr('src', '/img/editor/LED_off.png');

    rhythmIndex = 0;

    /*document.getElementById('play').classList.remove('playing');
    document.getElementById('stop').classList.remove('playing');*/
}

function handleSave(event) {

    //toggleSaveContainer();
    var elTextarea = document.getElementById('save_textarea');
    elTextarea.value = JSON.stringify(theBeat);

    $('#editor_form').submit();

}

function handleSaveOk(event) {
    //toggleSaveContainer();
}

function handleLoad(event) {
    //toggleLoadContainer();
}

function handleLoadOk(event) {
    var elTextarea = document.getElementById('load_textarea');
    theBeat = JSON.parse(elTextarea.value);

    // Set drumkit
    currentKit = kits[theBeat.kitIndex];
    document.getElementById('kitname').innerHTML = kitNamePretty[theBeat.kitIndex];

    // Set effect
    setEffect(theBeat.effectIndex);

    // Change the volume of the convolution effect.
    setEffectLevel(theBeat);

    // Apply values from sliders
    sliderSetValue('effect_thumb', theBeat.effectMix);
    sliderSetValue('kick_thumb', theBeat.kickPitchVal);
    sliderSetValue('snare_thumb', theBeat.snarePitchVal);
    sliderSetValue('hihat_thumb', theBeat.hihatPitchVal);
    sliderSetValue('tom1_thumb', theBeat.tom1PitchVal);
    sliderSetValue('tom2_thumb', theBeat.tom2PitchVal);
    sliderSetValue('tom3_thumb', theBeat.tom3PitchVal);
    sliderSetValue('swing_thumb', theBeat.swingFactor);

    // Clear out the text area post-processing
    elTextarea.value = '';

    toggleLoadContainer();
    updateControls();
}

function handleLoadCancel(event) {
    toggleLoadContainer();
}

function toggleSaveContainer() {
    document.getElementById('pad').classList.toggle('active');
    document.getElementById('params').classList.toggle('active');
    document.getElementById('tools').classList.toggle('active');
    document.getElementById('save_container').classList.toggle('active');
}

function toggleLoadContainer() {
    document.getElementById('pad').classList.toggle('active');
    document.getElementById('params').classList.toggle('active');
    document.getElementById('tools').classList.toggle('active');
    document.getElementById('load_container').classList.toggle('active');
}

function handleReset(event) {
    handleStop();
    loadBeat(beatReset);    
}

function loadBeat(beat) {
    // Check that assets are loaded.
    if (beat != beatReset && !beat.isLoaded())
        return false;

    handleStop();

    theBeat = cloneBeat(beat);
    currentKit = kits[theBeat.kitIndex];
    setEffect(theBeat.effectIndex);

    // apply values from sliders
    sliderSetValue('effect_thumb', theBeat.effectMix);
    sliderSetValue('kick_thumb', theBeat.kickPitchVal);
    sliderSetValue('snare_thumb', theBeat.snarePitchVal);
    sliderSetValue('hihat_thumb', theBeat.hihatPitchVal);
    sliderSetValue('tom1_thumb', theBeat.tom1PitchVal);
    sliderSetValue('tom2_thumb', theBeat.tom2PitchVal);
    sliderSetValue('tom3_thumb', theBeat.tom3PitchVal);
    sliderSetValue('swing_thumb', theBeat.swingFactor);

    updateControls();

    return true;
}

function drawAllNotes(){
    for(i=0; i<theBeat.rhythms.length; i++){

        if(theBeat.rhythms[i]){
            for(j=0; j<theBeat.rhythms[i].length; j++){
                if(theBeat.rhythms[i][j]){
                    for(k=0; k<theBeat.rhythms[i][j].length; k++){
                        if(theBeat.rhythms[i][j][k]){
                            for(l=0; l<theBeat.rhythms[i][j][k].length; l++){
                                if(theBeat.rhythms[i][j][k][l]){
                                    drawNote(theBeat.rhythms[i][j][k][l], i, j, k, l);
                                }
                            }
                        }
                    }
                }
            }
        }

    } 
}

function updateControls() {

    drawAllNotes();

    $('#active_kit').html(kitNamePretty[theBeat.kitIndex]);
    $('#kit_' + theBeat.kitIndex).addClass('disabled');
    $('#bpm').html(theBeat.tempo);

    $('#swing_slider').slider('setValue', theBeat.swingFactor);

    $('#editor_controls').show();

    /*sliderSetPosition('swing_thumb', theBeat.swingFactor);
    sliderSetPosition('effect_thumb', theBeat.effectMix);
    sliderSetPosition('kick_thumb', theBeat.kickPitchVal);
    sliderSetPosition('snare_thumb', theBeat.snarePitchVal);
    sliderSetPosition('hihat_thumb', theBeat.hihatPitchVal);
    sliderSetPosition('tom1_thumb', theBeat.tom1PitchVal);        
    sliderSetPosition('tom2_thumb', theBeat.tom2PitchVal);
    sliderSetPosition('tom3_thumb', theBeat.tom3PitchVal);*/
}

function drawNote(draw, measureIndex, instrumentIndex, countIndex, noteIndex) {

    var elButton = $('#note_' + measureIndex + '_' + instrumentIndex + '_' + countIndex + '_' + noteIndex);
    
    elButton.html(draw);
    if(draw == '-'){
        elButton.addClass('inactive');
    } else {
        elButton.removeClass('inactive');
    }
     

    /*switch (draw) {
        case 0: elButton.html('-').addClass('inactive'); break;
        case 1: elButton.html('x').removeClass('inactive'); break;
        case 2: elButton.html('X').removeClass('inactive'); break;
    }*/
}

/*
function drawNote(draw, xindex, yindex) {    
    var elButton = document.getElementById(instruments[yindex] + '_' + xindex);
    switch (draw) {
        case 0: elButton.src = '/img/editor/button_off.png'; break;
        case 1: elButton.src = '/img/editor/button_half.png'; break;
        case 2: elButton.src = '/img/editor/button_on.png'; break;
    }
}*/

function drawPlayhead(xindex) {
    var lastIndex = (xindex + (totalNotes-1)) % totalNotes;

    var elNew = document.getElementById('led_' + xindex);
    var elOld = document.getElementById('led_' + lastIndex);
    
    elNew.src = '/img/editor/LED_on.png';
    elOld.src = '/img/editor/LED_off.png';
}