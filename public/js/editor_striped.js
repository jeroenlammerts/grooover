
// Events
// init() once the page has finished loading.
window.onload = init;

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
/***
var beatDemo = [
    {"kitIndex":13,"effectIndex":18,"tempo":120,"swingFactor":0,"effectMix":0.19718309859154926,"kickPitchVal":0.5,"snarePitchVal":0.5,"hihatPitchVal":0.5,"tom1PitchVal":0.5,"tom2PitchVal":0.5,"tom3PitchVal":0.5,"rhythm1":[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"rhythm2":[0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0],"rhythm3":[0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0],"rhythm4":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0],"rhythm5":[0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0],"rhythm6":[0,0,0,0,0,0,0,2,0,2,2,0,0,0,0,0]},
    {"kitIndex":4,"effectIndex":3,"tempo":100,"swingFactor":0,"effectMix":0.2,"kickPitchVal":0.46478873239436624,"snarePitchVal":0.45070422535211263,"hihatPitchVal":0.15492957746478875,"tom1PitchVal":0.7183098591549295,"tom2PitchVal":0.704225352112676,"tom3PitchVal":0.8028169014084507,"rhythm1":[2,1,0,0,0,0,0,0,2,1,2,1,0,0,0,0],"rhythm2":[0,0,0,0,2,0,0,0,0,1,1,0,2,0,0,0],"rhythm3":[0,1,2,1,0,1,2,1,0,1,2,1,0,1,2,1],"rhythm4":[0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0],"rhythm5":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0],"rhythm6":[0,0,0,0,0,0,0,2,1,2,1,0,0,0,0,0]},
    {"kitIndex":2,"effectIndex":5,"tempo":100,"swingFactor":0,"effectMix":0.25,"kickPitchVal":0.5,"snarePitchVal":0.5,"hihatPitchVal":0.5211267605633803,"tom1PitchVal":0.23943661971830987,"tom2PitchVal":0.21126760563380287,"tom3PitchVal":0.2535211267605634,"rhythm1":[2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0],"rhythm2":[0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0],"rhythm3":[0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],"rhythm4":[1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],"rhythm5":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0],"rhythm6":[0,0,1,0,1,0,0,2,0,2,0,0,1,0,0,0]},
    {"kitIndex":1,"effectIndex":4,"tempo":120,"swingFactor":0,"effectMix":0.25,"kickPitchVal":0.7887323943661972,"snarePitchVal":0.49295774647887325,"hihatPitchVal":0.5,"tom1PitchVal":0.323943661971831,"tom2PitchVal":0.3943661971830986,"tom3PitchVal":0.323943661971831,"rhythm1":[2,0,0,0,0,0,0,2,2,0,0,0,0,0,0,1],"rhythm2":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"rhythm3":[0,0,1,0,2,0,1,0,1,0,1,0,2,0,2,0],"rhythm4":[2,0,2,0,0,0,0,0,2,0,0,0,0,2,0,0],"rhythm5":[0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0],"rhythm6":[0,2,0,0,0,2,0,0,0,2,0,0,0,0,0,0]},
    {"kitIndex":0,"effectIndex":1,"tempo":60,"swingFactor":0.5419847328244275,"effectMix":0.25,"kickPitchVal":0.5,"snarePitchVal":0.5,"hihatPitchVal":0.5,"tom1PitchVal":0.5,"tom2PitchVal":0.5,"tom3PitchVal":0.5,"rhythm1":[2,2,0,1,2,2,0,1,2,2,0,1,2,2,0,1],"rhythm2":[0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0],"rhythm3":[2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1],"rhythm4":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"rhythm5":[0,0,1,0,0,1,0,1,0,0,1,0,0,0,1,0],"rhythm6":[1,0,0,1,0,1,0,1,1,0,0,1,1,1,1,0]},
];*/

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
    
    return beat;
}

// theBeat is the object representing the current beat/groove
// ... it is saved/loaded via JSON
var theBeat = cloneBeat(beatReset);

kickPitch = snarePitch = hihatPitch = tom1Pitch = tom2Pitch = tom3Pitch = 0;

var mouseCapture = null;
var mouseCaptureOffset = 0;

var loopLength = 16;
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
        var pathName = "sounds/drum-samples/" + this.name + "/";
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

function startLoadingAssets() {
    
    // Initialize drum kits
    var numKits = kitName.length;
    kits = new Array(numKits);
    for (var i  = 0; i < numKits; i++) {
        kits[i] = new Kit(kitName[i]);
    }  
    
    // Then load the remaining assets.
    // Note that any assets which have previously started loading will be skipped over.
    // numKits
    for (var i  = 0; i < 1; i++) {
        kits[i].load();
    }  
    
    // Setup initial drumkit
    currentKit = kits[0];

    //kInitialKitIndex
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
        loadBeat(beatDemo[1]);

    // Uncomment to allow autoplay
    //     handlePlay();
    }
}

// This gets rid of the loading spinner on the play button.
function showPlayAvailable() {
    var play = document.getElementById("play");
    play.src = "img/editor/btn_play.png";
}

function init() {
    // Let the beat demos know when all of their assets have been loaded.
    // Add some new methods to support this.
        
    showPlayAvailable();

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


    var elKitCombo = document.getElementById('kitcombo');
    elKitCombo.addEventListener("mousedown", handleKitComboMouseDown, true);

    document.body.addEventListener("mousedown", handleBodyMouseDown, true);

    initControls();
    updateControls();
}

function initControls() {
    // Initialize note buttons
    initButtons();
    makeKitList();

    // sliders
    document.getElementById('swing_thumb').addEventListener('mousedown', handleSliderMouseDown, true);
    /***document.getElementById('swing_thumb').addEventListener('dblclick', handleSliderDoubleClick, true);*/

    // tool buttons
    document.getElementById('play').addEventListener('mousedown', handlePlay, true);
    document.getElementById('stop').addEventListener('mousedown', handleStop, true);
    document.getElementById('save').addEventListener('mousedown', handleSave, true);
    document.getElementById('save_ok').addEventListener('mousedown', handleSaveOk, true);
   
    document.getElementById('load').addEventListener('mousedown', handleLoad, true);
    document.getElementById('load_ok').addEventListener('mousedown', handleLoadOk, true);
    document.getElementById('load_cancel').addEventListener('mousedown', handleLoadCancel, true);
    document.getElementById('reset').addEventListener('mousedown', handleReset, true);

    var elBody = document.getElementById('body');
    elBody.addEventListener('mousemove', handleMouseMove, true);
    elBody.addEventListener('mouseup', handleMouseUp, true);

    document.getElementById('tempoinc').addEventListener('mousedown', tempoIncrease, true);
    document.getElementById('tempodec').addEventListener('mousedown', tempoDecrease, true);
}

function initButtons() {        
    var elButton;

    for (i = 0; i < loopLength; ++i) {
        for (j = 0; j < kNumInstruments; j++) {
                elButton = document.getElementById(instruments[j] + '_' + i);
                elButton.addEventListener("mousedown", handleButtonMouseDown, true);
        }
    }
}

function makeKitList() {
    var elList = document.getElementById('kitlist');
    var numKits = kitName.length;
    
    for (var i = 0; i < numKits; i++) {
        var elItem = document.createElement('li');
        elItem.innerHTML = kitNamePretty[i];
        elList.appendChild(elItem);
        elItem.addEventListener("mousedown", handleKitMouseDown, true);
    }
}

function advanceNote() {
    // Advance time by a 16th note...
    var secondsPerBeat = 60.0 / theBeat.tempo;

    rhythmIndex++;
    if (rhythmIndex == loopLength) {
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
        
        // Kick
        if (theBeat.rhythm1[rhythmIndex]) {
            playNote(currentKit.kickBuffer, false, 0,0,-2, 0.5, volumes[theBeat.rhythm1[rhythmIndex]] * 1.0, kickPitch, contextPlayTime);
        }

        // Snare
        if (theBeat.rhythm2[rhythmIndex]) {
            playNote(currentKit.snareBuffer, false, 0,0,-2, 1, volumes[theBeat.rhythm2[rhythmIndex]] * 0.6, snarePitch, contextPlayTime);
        }

        // Hihat
        if (theBeat.rhythm3[rhythmIndex]) {
            // Pan the hihat according to sequence position.
            playNote(currentKit.hihatBuffer, true, 0.0, 0, -1.0, 1, volumes[theBeat.rhythm3[rhythmIndex]] * 0.7, hihatPitch, contextPlayTime);
        }

        // Toms    
        if (theBeat.rhythm4[rhythmIndex]) {
            playNote(currentKit.tom1, false, 0,0,-2, 1, volumes[theBeat.rhythm4[rhythmIndex]] * 0.6, tom1Pitch, contextPlayTime);
        }

        if (theBeat.rhythm5[rhythmIndex]) {
            playNote(currentKit.tom2, false, 0,0,-2, 1, volumes[theBeat.rhythm5[rhythmIndex]] * 0.6, tom2Pitch, contextPlayTime);
        }

        if (theBeat.rhythm6[rhythmIndex]) {
            playNote(currentKit.tom3, false, 0,0,-2, 1, volumes[theBeat.rhythm6[rhythmIndex]] * 0.6, tom3Pitch, contextPlayTime);
        }

        
        // Attempt to synchronize drawing time with sound
        if (noteTime != lastDrawTime) {
            lastDrawTime = noteTime;
            drawPlayhead((rhythmIndex + 15) % 16);
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

/*function handleSliderDoubleClick(event) {
    var id = event.target.id;
    if (id != 'swing_thumb' && id != 'effect_thumb') {
        mouseCapture = null;
        sliderSetValue(event.target.id, 0.5);
        updateControls();
    }
}*/

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
    var rhythmIndex;

    var elId = event.target.id;
    rhythmIndex = elId.substr(elId.indexOf('_') + 1, 2);
    instrumentIndex = instruments.indexOf(elId.substr(0, elId.indexOf('_')));
        
    switch (instrumentIndex) {
        case 0: notes = theBeat.rhythm1; break;
        case 1: notes = theBeat.rhythm2; break;
        case 2: notes = theBeat.rhythm3; break;
        case 3: notes = theBeat.rhythm4; break;
        case 4: notes = theBeat.rhythm5; break;
        case 5: notes = theBeat.rhythm6; break;
    }

    notes[rhythmIndex] = (notes[rhythmIndex] + 1) % 3;

    drawNote(notes[rhythmIndex], rhythmIndex, instrumentIndex);
}

function handleKitComboMouseDown(event) {
    document.getElementById('kitcombo').classList.toggle('active');
}

function handleKitMouseDown(event) {
    var index = kitNamePretty.indexOf(event.target.innerHTML);
    theBeat.kitIndex = index;
    kits[index].load();
    currentKit = kits[index];
    document.getElementById('kitname').innerHTML = kitNamePretty[index];
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

function handlePlay(event) {
    noteTime = 0.0;
    startTime = context.currentTime + 0.005;
    schedule();

    document.getElementById('play').classList.add('playing');
    document.getElementById('stop').classList.add('playing');
}

function handleStop(event) {
    clearTimeout(timeoutId);

    var elOld = document.getElementById('LED_' + (rhythmIndex + 14) % 16);
    elOld.src = 'img/editor/LED_off.png';

    rhythmIndex = 0;

    document.getElementById('play').classList.remove('playing');
    document.getElementById('stop').classList.remove('playing');
}

function handleSave(event) {
    toggleSaveContainer();
    var elTextarea = document.getElementById('save_textarea');
    elTextarea.value = JSON.stringify(theBeat);
}

function handleSaveOk(event) {
    toggleSaveContainer();
}

function handleLoad(event) {
    toggleLoadContainer();
}

function handleLoadOk(event) {
    var elTextarea = document.getElementById('load_textarea');
    theBeat = JSON.parse(elTextarea.value);

    // Set drumkit
    currentKit = kits[theBeat.kitIndex];
    document.getElementById('kitname').innerHTML = kitNamePretty[theBeat.kitIndex];

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

    sliderSetValue('swing_thumb', theBeat.swingFactor);

    updateControls();

    return true;
}

function updateControls() {
    for (i = 0; i < loopLength; ++i) {
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
    }

    document.getElementById('kitname').innerHTML = kitNamePretty[theBeat.kitIndex];
    document.getElementById('tempo').innerHTML = theBeat.tempo;
    sliderSetPosition('swing_thumb', theBeat.swingFactor);

}


function drawNote(draw, xindex, yindex) {    
    var elButton = document.getElementById(instruments[yindex] + '_' + xindex);
    switch (draw) {
        case 0: elButton.src = 'img/editor/button_off.png'; break;
        case 1: elButton.src = 'img/editor/button_half.png'; break;
        case 2: elButton.src = 'img/editor/button_on.png'; break;
    }
}

function drawPlayhead(xindex) {
    var lastIndex = (xindex + 15) % 16;

    var elNew = document.getElementById('LED_' + xindex);
    var elOld = document.getElementById('LED_' + lastIndex);
    
    elNew.src = 'img/editor/LED_on.png';
    elOld.src = 'img/editor/LED_off.png';
}