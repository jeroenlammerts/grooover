
var kitInstruments = [
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
    /*{
        'name':'Crash',
        'values' : ['x', 'X', 'S', 'C'],
        'valueNames' : ['Crash', 'Accented Crash', 'Splash', 'China']
    },*/
    {
        'name':'Hihat',
        'values' : ['x', 'X', 'o', 'O'],
        'valueNames' : ['Normal closed hihat', 'Accented closed hihat', 'Open hihat', 'Accented open hihat']
    },
    {
        'name':'Snare',
        'values' : ['o', 'O', 'x', 'X', '@', 'g', 'f', 'd', 'b'],
        'valueNames' : ['Normal note', 'Accented note', 'Cross stick', 'Accented Cross stick', 'Rimshot', 'Ghost note', 'Flam', 'Drag', 'Roll']
    },

    {
        'name':'Bassdrum',
        'values' : ['o', 'O'],
        'valueNames' : ['Note', 'Accented note']
    }
];
/*
var beats = [
    {
        'name':'Crash',
        'values' : ['x', 'X', 'S', 'C']
    }
];*/

var measures = 2;
var counts = 4;
var countTime = 4;
var totalNotes = measures*counts*countTime;

$(document).ready(function(){
    
    if($('#editor').length){
    
        var html;
        
        $.each(kitInstruments, function(i, values) {
            html = '<tr><td>'+kitInstruments[i]['name']+'</td></tr>';
            
            var contentValues = '<table class="table table-condensed">';
            $.each(kitInstruments[i]['values'], function(j, item){
                contentValues += '<tr><td>' + item + '</td><td class="description">' + kitInstruments[i]['valueNames'][j] + '</tr>';
            });
            contentValues += '</table>';
            
            $(html).insertBefore('#editor_instruments table tr:last').popover({
                html : true,
                trigger : 'hover',
                placement: 'right',
                title: 'Legenda',
                content: contentValues
            });
        });
        
        /*html = '';

        for(i=1; i<=measures; i++){

            html += '<table class="table">';
            html += '   <tr class="first">';
            html += '       <td>';
            html += '           ' + i + '.';
            html += '       </td>';
            html += '       <td colspan="3">';
            html += '           <div class="btn-group pull-right">';
            html += '               <a href="#" class="btn"><i class="icon-edit"></i></a>';
            html += '               <a href="#" class="btn"><i class="icon-trash"></i></a>';
            html += '               <a href="#" class="btn"><i class="icon-plus"></i></a>';
            html += '           </div>';
            html += '       </td>';                         
            html += '   </tr>';
            for(ki=1; ki<=kitInstruments.length; ki++){
            html += '   <tr>';
                for(j=1; j<=count; j++){
                    html += '       <td>';
                    html += '           <table>';
                    html += '               <tr>';
                    for(k=1; k<=4; k++){
                        //html += '                   <td><input type="text" name="note_' + ki + '_' + i + '_' + j + '_' + k + '" id="note_' + ki + '_' + i + '_' + j + '_' + k + '" placeholder="-" /></td>';
                        html += '                   <td><img src="/img/editor/button_off.png" id="note_' + ki + '_' + i + '_' + j + '_' + k + '" /></td>';
                    }
                    html += '               </tr>';
                    html += '           </table>';
                    html += '       </td>';
                }
                html += '   </tr>';
            }
            html += '   <tr>';
            for(j=1; j<=count; j++){
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
            html += '</table>';

        }

        $('#editor').html(html);*/

        $('#editor').bind("contextmenu", function () {
            return false;
        });
        
        /*$('#editor img').mousedown(function(){
            event.preventDefault();
            switch (event.which) {
                // left mouse button
                case 1:
                    var index = $(this).parents('tr:eq(1)').index() - 1;
                    if(!$(this).val()){
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
                    break;
                // right mouse button
                case 3:
                    $(this).val('');
                    break;
            }
        });*/
        
    }
    
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

kickPitch = snarePitch = hihatPitch = tom1Pitch = tom2Pitch = tom3Pitch = 0;

var mouseCapture = null;
var mouseCaptureOffset = 0;

//var loopLength = 16;
var loopLength = measures * counts;

var rhythmIndex = 0;
var kMinTempo = 50;
var kMaxTempo = 180;
var noteTime = 0.0;

var instruments = ['Kick', 'Snare', 'HiHat', 'Tom1', 'Tom2', 'Tom3'];

var volumes = [0, 0.3, 1];

var kitCount = 0;

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
    "4OP-FM",
    "The Cheebacabra 1",
    "The Cheebacabra 2"
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
    
    this.demoIndex = -1;
}

Kit.prototype.setDemoIndex = function(index) {
    this.demoIndex = index;
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

    this.loadSample(0, kickPath, false);
    this.loadSample(1, snarePath, false);
    this.loadSample(2, hihatPath, true);  // we're panning only the hihat
    this.loadSample(3, tom1Path, false);
    this.loadSample(4, tom2Path, false);
    this.loadSample(5, tom3Path, false);
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
        }

        kit.instrumentLoadCount++;
        if (kit.instrumentLoadCount == kit.instrumentCount) {
            kit.isLoaded = true;

            if (kit.demoIndex != -1) {
                beatDemo[kit.demoIndex].setKitLoaded();
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
    
    this.demoIndex = -1; // no demo
}

ImpulseResponse.prototype.setDemoIndex = function(index) {
    this.demoIndex = index;
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
        
        if (asset.demoIndex != -1) {
            beatDemo[asset.demoIndex].setEffectLoaded();
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
    
    // Start loading the assets used by the presets first, in order of the presets.
    for (var demoIndex = 0; demoIndex < 5; ++demoIndex) {
        var effect = impulseResponseList[beatDemo[demoIndex].effectIndex];
        var kit = kits[beatDemo[demoIndex].kitIndex];
        
        // These effects and kits will keep track of a particular demo, so we can change
        // the loading status in the UI.
        effect.setDemoIndex(demoIndex);
        kit.setDemoIndex(demoIndex);
        
        effect.load();
        kit.load();
    }
    
    // Then load the remaining assets.
    // Note that any assets which have previously started loading will be skipped over.
    for (var i  = 0; i < numKits; i++) {
        kits[i].load();
    }  

    // Start at 1 to skip "No Effect"
    for (i = 1; i < impulseResponseInfoList.length; i++) {
        impulseResponseList[i].load();
    }
    
    // Setup initial drumkit
    currentKit = kits[kInitialKitIndex];
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

function init() {
    // Let the beat demos know when all of their assets have been loaded.
    // Add some new methods to support this.
    for (var i = 0; i < beatDemo.length; ++i) {
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
    }
        
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
    document.getElementById('effect_thumb').addEventListener('mousedown', handleSliderMouseDown, true);
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
    document.getElementById('swing_thumb').addEventListener('dblclick', handleSliderDoubleClick, true);

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

    var elBody = document.getElementById('body');
    elBody.addEventListener('mousemove', handleMouseMove, true);
    elBody.addEventListener('mouseup', handleMouseUp, true);

    document.getElementById('tempoinc').addEventListener('mousedown', tempoIncrease, true);
    document.getElementById('tempodec').addEventListener('mousedown', tempoDecrease, true);
}

function initButtons() {        
    var elButton;

    html = '';

    var led = 0;

    for(i=0; i<measures; i++){

        html += '<table class="table">';
        html += '   <tr class="first">';
        html += '       <td>';
        html += '           ' + (i+1) + '.';
        html += '       </td>';
        html += '       <td colspan="3">';
        html += '           <div class="btn-group pull-right">';
        html += '               <a href="#" class="btn"><i class="icon-edit"></i></a>';
        html += '               <a href="#" class="btn"><i class="icon-trash"></i></a>';
        html += '               <a href="#" class="btn"><i class="icon-plus"></i></a>';
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
                    html += '                   <td><img src="/img/editor/button_off.png" id="note_' + i + '_' + ki + '_' + j + '_' + k + '" class="note" /></td>';

                    //elButton = document.getElementById('note_' + ki + '_' + i + '_' + j + '_' + k);
                    //elButton.addEventListener("mousedown", handleButtonMouseDown, true);

                }
                html += '               </tr>';
                html += '           </table>';
                html += '       </td>';
            }
            html += '   </tr>';
        }      

        html += '   <tr>';
        for(j=0; j<counts; j++){
            html += '       <td>';
            html += '           <table>';
            html += '               <tr>';
            for(k=0; k<4; k++){
                //html += '                   <td><img id="LED_' + i + '_' + j + '_' + k + '" src="/img/editor/LED_off.png"></td>';
                html += '                   <td><img id="led_' + led + '" src="/img/editor/LED_off.png"></td>';
                led++;
            }
            html += '               </tr>';
            html += '           </table>';                                  
            html += '       </td>'; 
        }                       
        html += '   </tr>';

        /*html += '   <tr>';
        for(j=1; j<=count; j++){
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
        html += '   </tr>'; */

        html += '</table>';

    }

    $('#editor').html(html);
    $('#editor img.note').click(function(e){
        handleButtonMouseDown(e);
    });

    /*for (i = 0; i < loopLength; ++i) {
        for (j = 0; j < kNumInstruments; j++) {
                elButton = document.getElementById(instruments[j] + '_' + i);
                elButton.addEventListener("mousedown", handleButtonMouseDown, true);
        }
    }*/
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
        html += '<li id="kit_' + i + '"'; 
        if(i == theBeat.kitIndex){
            html += 'class="disabled"';
        }
        html += '><a href="javascript: void(0);">' + kitNamePretty[i] + '</a></li>';
    }

    $('#kits_list').html(html);
    $('#kits_list a').click(function(e){
        handleKitMouseDown($(this));
    });
    $('#active_kit').html(kitNamePretty[theBeat.kitIndex]);

}

function advanceNote() {
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
    if(playingMeasure == measures){
        playingMeasure = 0;
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

    // The sequence starts at startTime, so normalize currentTime so that it's 0 at the start of the sequence.
    currentTime -= startTime;

    while (noteTime < currentTime + 0.200) {
        // Convert noteTime to context time.
        var contextPlayTime = noteTime + startTime;
        
        if($.isArray(theBeat.rhythms[playingMeasure])){

            // kick
            if ($.isArray(theBeat.rhythms[playingMeasure][5]) && $.isArray(theBeat.rhythms[playingMeasure][5][playingCount]) && theBeat.rhythms[playingMeasure][5][playingCount][playingNote]) {
                playNote(currentKit.kickBuffer, false, 0,0,-2, 0.5, volumes[2] * 1.0, kickPitch, contextPlayTime);
            }

            // Snare
            if ($.isArray(theBeat.rhythms[playingMeasure][4]) && $.isArray(theBeat.rhythms[playingMeasure][4][playingCount]) && theBeat.rhythms[playingMeasure][4][playingCount][playingNote]) {
                playNote(currentKit.snareBuffer, false, 0,0,-2, 1, volumes[2] * 0.6, snarePitch, contextPlayTime);
            }

            // Hihat
            if ($.isArray(theBeat.rhythms[playingMeasure][3]) && $.isArray(theBeat.rhythms[playingMeasure][3][playingCount]) && theBeat.rhythms[playingMeasure][3][playingCount][playingNote]) {
                // Pan the hihat according to sequence position.
                playNote(currentKit.hihatBuffer, true, -0.2, 0, -1.0, 1, volumes[2] * 0.7, hihatPitch, contextPlayTime);
            }

            // Toms    
            if ($.isArray(theBeat.rhythms[playingMeasure][2]) && $.isArray(theBeat.rhythms[playingMeasure][2][playingCount]) && theBeat.rhythms[playingMeasure][2][playingCount][playingNote]) {
                playNote(currentKit.tom1, false, 0,0,-2, 1, volumes[2] * 0.6, tom1Pitch, contextPlayTime);
            }

            if ($.isArray(theBeat.rhythms[playingMeasure][1]) && $.isArray(theBeat.rhythms[playingMeasure][1][playingCount]) && theBeat.rhythms[playingMeasure][1][playingCount][playingNote]) {
                playNote(currentKit.tom2, false, 0,0,-2, 1, volumes[2] * 0.6, tom2Pitch, contextPlayTime);
            }

            if ($.isArray(theBeat.rhythms[playingMeasure][0]) && $.isArray(theBeat.rhythms[playingMeasure][0][playingCount]) && theBeat.rhythms[playingMeasure][0][playingCount][playingNote]) {
                playNote(currentKit.tom3, false, 0,0,-2, 1, volumes[2] * 0.6, tom3Pitch, contextPlayTime);
            }

        }
        
        // Attempt to synchronize drawing time with sound
        if (noteTime != lastDrawTime) {
            lastDrawTime = noteTime;
            drawPlayhead((rhythmIndex + (totalNotes-1)) % totalNotes);
        }

        advanceNote();
    }

    timeoutId = setTimeout("schedule()", 0);
}

function tempoIncrease() {
    theBeat.tempo = Math.min(kMaxTempo, theBeat.tempo+4);
    document.getElementById('tempo').innerHTML = theBeat.tempo;
}

function tempoDecrease() {
    theBeat.tempo = Math.max(kMinTempo, theBeat.tempo-4);
    document.getElementById('tempo').innerHTML = theBeat.tempo;
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

function handleButtonMouseDown(event) {
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

    var noteKey = 2;
    if(theBeat.rhythms[measureIndex][instrumentIndex][countIndex][noteIndex] == 2){
        noteKey = 0
    }
    theBeat.rhythms[measureIndex][instrumentIndex][countIndex][noteIndex] = noteKey;

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

function handleKitComboMouseDown(event) {
    document.getElementById('kitcombo').classList.toggle('active');
}

function handleKitMouseDown(button) {

    var index = kitNamePretty.indexOf(button.html());
    theBeat.kitIndex = index;
    currentKit = kits[index];
    $('#active_kit').html(kitNamePretty[index]);
    $('#kits_list .disabled').removeClass('disabled');
    $('#kit_' + index).addClass('disabled');


    /*
    var index = kitNamePretty.indexOf(event.target.innerHTML);
    theBeat.kitIndex = index;
    currentKit = kits[index];
    document.getElementById('kitname').innerHTML = kitNamePretty[index];*/
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

    console.log('test');

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

    /*for (var i = 0; i < impulseResponseInfoList.length; ++i) {
        if (impulseResponseInfoList[i].name == event.target.innerHTML) {

            // Hack - if effect is turned all the way down - turn up effect slider.
            // ... since they just explicitly chose an effect from the list.
            if (theBeat.effectMix == 0)
                theBeat.effectMix = 0.5;

            setEffect(i);
            break;
        }
    }*/

}

function setEffect(index) {
    if (index > 0 && !impulseResponseList[index].isLoaded()) {
        alert('Sorry, this effect is still loading.  Try again in a few seconds :)');
        return;
    }

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

    $('#active_effect').html(impulseResponseInfoList[index].name);
    $('#effects_list .disabled').removeClass('disabled');
    $('#effect_' + index).addClass('disabled');

    //document.getElementById('effectname').innerHTML = impulseResponseInfoList[index].name;
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

    playing = false;
    clearTimeout(timeoutId);

    var elOld = document.getElementById('led_' + (rhythmIndex + (totalNotes-2)) % totalNotes);
    elOld.src = '/img/editor/LED_off.png';

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

function updateControls() {

    for(i=0; i<theBeat.rhythms.length; i++){

        if(theBeat.rhythms[i]){
            for(j=0; j<theBeat.rhythms[i].length; j++){
                if(theBeat.rhythms[i][j]){
                    for(k=0; k<theBeat.rhythms[i][j].length; k++){
                        if(theBeat.rhythms[i][j][k]){
                            for(l=0; l<theBeat.rhythms[i][j][k].length; l++){
                                if(theBeat.rhythms[i][j][k][l] > 0){
                                    drawNote(2, i, j, k, l);
                                }
                            }
                        }
                    }
                }
            }
        }

    }


    /*for (i = 0; i < loopLength; ++i) {
        for (j = 0; j < kNumInstruments; j++) {
            switch (j) {
                case 0: notes = theBeat.rhythm1; break;
                case 1: notes = theBeat.rhythm2; break;
                case 2: notes = theBeat.rhythm3; break;
                case 3: notes = theBeat.rhythm4; break;
                case 4: notes = theBeat.rhythm5; break;
                case 5: notes = theBeat.rhythm6; break;
            }

            drawNote(notes[i], i, j);
        }
    }*/

    document.getElementById('kitname').innerHTML = kitNamePretty[theBeat.kitIndex];
    document.getElementById('effectname').innerHTML = impulseResponseInfoList[theBeat.effectIndex].name;
    document.getElementById('tempo').innerHTML = theBeat.tempo;
    sliderSetPosition('swing_thumb', theBeat.swingFactor);
    sliderSetPosition('effect_thumb', theBeat.effectMix);
    sliderSetPosition('kick_thumb', theBeat.kickPitchVal);
    sliderSetPosition('snare_thumb', theBeat.snarePitchVal);
    sliderSetPosition('hihat_thumb', theBeat.hihatPitchVal);
    sliderSetPosition('tom1_thumb', theBeat.tom1PitchVal);        
    sliderSetPosition('tom2_thumb', theBeat.tom2PitchVal);
    sliderSetPosition('tom3_thumb', theBeat.tom3PitchVal);
}

function drawNote(draw, measureIndex, instrumentIndex, countIndex, noteIndex) {

    var elButton = document.getElementById('note_' + measureIndex + '_' + instrumentIndex + '_' + countIndex + '_' + noteIndex);
    //console.log('note_' + measureIndex + '_' + instrumentIndex + '_' + countIndex + '_' + noteIndex);
    switch (draw) {
        case 0: elButton.src = '/img/editor/button_off.png'; break;
        case 1: elButton.src = '/img/editor/button_half.png'; break;
        case 2: elButton.src = '/img/editor/button_on.png'; break;
    }
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