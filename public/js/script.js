
var instruments = [
	{
		'name':'Crash',
		'values' : ['x', 'X', 'S', 'C'],
		'valueNames' : ['Crash', 'Accented Crash', 'Splash', 'China']
	},
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

$(document).ready(function(){
	
	if($('#editor').length){
	
		var html;
		
		$.each(instruments, function(i, values) {
			html = '<tr><td>'+instruments[i]['name']+'</td></tr>';
			
			var contentValues = '<table class="table table-condensed">';
			$.each(instruments[i]['values'], function(j, item){
				contentValues += '<tr><td>' + item + '</td><td class="description">' + instruments[i]['valueNames'][j] + '</tr>';
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
		
		$('#editor').bind("contextmenu", function () {
			return false;
		});
		
		$('#editor input').mousedown(function(){
			event.preventDefault();
			switch (event.which) {
				// left mouse button
				case 1:
					var index = $(this).parents('tr:eq(1)').index() - 1;
					if(!$(this).val()){
						$(this).val(instruments[index]['values'][0]);
					} else {
						var newVal = '';
						var value = $(this).val();
						$.each(instruments[index]['values'], function(i, item){
							if(item == value){
								if(instruments[index]['values'].length > i){
									newVal = instruments[index]['values'][i+1];
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
		});	
	
		/*$('#editor_form').on('submit', function(e) {
			e.preventDefault();
			console.log( $(this).serialize() );
		});*/
		

		//window.onload = init;
		
	}
	
});

var context;
var playing = false;
var startTime = 0;
var timeoutId;

function init() {
	context = new webkitAudioContext();

	bufferLoader = new BufferLoader(
		context,
		[
			'sounds/kick.wav',
			'sounds/snare.wav',
			'sounds/hihat.wav'
		],
		finishedLoading
	);

	bufferLoader.load();		  
}

function playSound(buffer, time) {
	var source = context.createBufferSource();
	source.buffer = buffer;
	source.connect(context.destination);
	source.noteOn(time);
}			

function finishedLoading(bufferList) {

	$('#btn_play').click(function(){
		
		if(!playing){
			playing = true;
			$('#btn_play i').removeClass('icon-play').addClass('icon-stop');
			startTime = context.currentTime + 0.005;
			schedule();
		} else {
			playing = false;
			$('#btn_play i').removeClass('icon-stop').addClass('icon-play');
			clearTimeout(timeoutId);
		}
		
	});


	/*var kick=bufferList[0];
	var snare=bufferList[1];
	var hihat=bufferList[2];
	var startTime=context.currentTime;
	var tempo=80;
	var eighthNoteTime=(60/tempo)/2;
	
	for(var bar=0;bar<2;bar++){
		var time=startTime+bar*8*eighthNoteTime;
		playSound(kick,time);
		playSound(kick,time+4*eighthNoteTime);
		playSound(snare,time+2*eighthNoteTime);
		playSound(snare,time+6*eighthNoteTime);
		
		for(var i=0;i<8;++i){
			playSound(hihat,time+i*eighthNoteTime);
		}
	}*/


}

function schedule() {
	
	console.log('1');

	/*var currentTime = context.currentTime;

	// The sequence starts at startTime, so normalize currentTime so that it's 0 at the start of the sequence.
	currentTime -= startTime;

	while (noteTime < currentTime + 0.200) {
		// Convert noteTime to context time.
		var contextPlayTime = noteTime + startTime;
		
		// Kick
		if (theBeat.rhythm1[rhythmIndex]) {
			playNote(currentKit.kickBuffer, false, 0,0,-2, 0.5, volumes[theBeat.rhythm1[rhythmIndex]] * 1.0, kickPitch,  
			);
		}

		// Snare
		if (theBeat.rhythm2[rhythmIndex]) {
			playNote(currentKit.snareBuffer, false, 0,0,-2, 1, volumes[theBeat.rhythm2[rhythmIndex]] * 0.6, snarePitch, contextPlayTime);
		}

		// Hihat
		if (theBeat.rhythm3[rhythmIndex]) {
			// Pan the hihat according to sequence position.
			playNote(currentKit.hihatBuffer, true, 0.5*rhythmIndex - 4, 0, -1.0, 1, volumes[theBeat.rhythm3[rhythmIndex]] * 0.7, hihatPitch, contextPlayTime);
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
	}*/

	timeoutId = setTimeout("schedule()", 0);
}	