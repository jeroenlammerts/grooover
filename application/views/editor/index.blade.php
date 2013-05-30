@layout('master')
@section('content')



				<div class="row">
					<div class="span12">
						<h2>Pattern editor</h2>					
					</div>
				</div>	
				<div class="row">
					<div class="span12" id="editor_wrap_container">

						{{ Form::open('pattern', 'POST', array('id' => 'editor_form')) }}
						{{ Form::hidden('pattern_id', $pattern_id) }}

					    <section class='editor_container active' id='pad'>
					        <div class='buttons_row'>
					            <span class='editor_label'>Tom 1</span>
					            <img id='Tom1_0' class='btn' src='/img/editor/button_off.png'><img id='Tom1_1' class='btn' src='/img/editor/button_off.png'><img id='Tom1_2' class='btn' src='/img/editor/button_off.png'><img id='Tom1_3' class='btn' src='/img/editor/button_off.png'><img id='Tom1_4' class='btn' src='/img/editor/button_off.png'><img id='Tom1_5' class='btn' src='/img/editor/button_off.png'><img id='Tom1_6' class='btn' src='/img/editor/button_off.png'><img id='Tom1_7' class='btn' src='/img/editor/button_off.png'><img id='Tom1_8' class='btn' src='/img/editor/button_off.png'><img id='Tom1_9' class='btn' src='/img/editor/button_off.png'><img id='Tom1_10' class='btn' src='/img/editor/button_off.png'><img id='Tom1_11' class='btn' src='/img/editor/button_off.png'><img id='Tom1_12' class='btn' src='/img/editor/button_off.png'><img id='Tom1_13' class='btn' src='/img/editor/button_off.png'><img id='Tom1_14' class='btn' src='/img/editor/button_off.png'><img id='Tom1_15' class='btn' src='/img/editor/button_off.png'>
					        </div>
					        <div class='buttons_row'>
					            <span class='editor_label'>Tom 2</span>
					            <img id='Tom2_0' class='btn' src='/img/editor/button_off.png'><img id='Tom2_1' class='btn' src='/img/editor/button_off.png'><img id='Tom2_2' class='btn' src='/img/editor/button_off.png'><img id='Tom2_3' class='btn' src='/img/editor/button_off.png'><img id='Tom2_4' class='btn' src='/img/editor/button_off.png'><img id='Tom2_5' class='btn' src='/img/editor/button_off.png'><img id='Tom2_6' class='btn' src='/img/editor/button_off.png'><img id='Tom2_7' class='btn' src='/img/editor/button_off.png'><img id='Tom2_8' class='btn' src='/img/editor/button_off.png'><img id='Tom2_9' class='btn' src='/img/editor/button_off.png'><img id='Tom2_10' class='btn' src='/img/editor/button_off.png'><img id='Tom2_11' class='btn' src='/img/editor/button_off.png'><img id='Tom2_12' class='btn' src='/img/editor/button_off.png'><img id='Tom2_13' class='btn' src='/img/editor/button_off.png'><img id='Tom2_14' class='btn' src='/img/editor/button_off.png'><img id='Tom2_15' class='btn' src='/img/editor/button_off.png'>
					        </div>
					        <div class='buttons_row'>
					            <span class='editor_label'>Tom 3</span>
					            <img id='Tom3_0' class='btn' src='/img/editor/button_off.png'><img id='Tom3_1' class='btn' src='/img/editor/button_off.png'><img id='Tom3_2' class='btn' src='/img/editor/button_off.png'><img id='Tom3_3' class='btn' src='/img/editor/button_off.png'><img id='Tom3_4' class='btn' src='/img/editor/button_off.png'><img id='Tom3_5' class='btn' src='/img/editor/button_off.png'><img id='Tom3_6' class='btn' src='/img/editor/button_off.png'><img id='Tom3_7' class='btn' src='/img/editor/button_off.png'><img id='Tom3_8' class='btn' src='/img/editor/button_off.png'><img id='Tom3_9' class='btn' src='/img/editor/button_off.png'><img id='Tom3_10' class='btn' src='/img/editor/button_off.png'><img id='Tom3_11' class='btn' src='/img/editor/button_off.png'><img id='Tom3_12' class='btn' src='/img/editor/button_off.png'><img id='Tom3_13' class='btn' src='/img/editor/button_off.png'><img id='Tom3_14' class='btn' src='/img/editor/button_off.png'><img id='Tom3_15' class='btn' src='/img/editor/button_off.png'>
					        </div>
					        <div class='buttons_row'>
					            <span class='editor_label'>Hi-Hat</span>
					            <img id='HiHat_0' class='btn' src='/img/editor/button_off.png'><img id='HiHat_1' class='btn' src='/img/editor/button_off.png'><img id='HiHat_2' class='btn' src='/img/editor/button_off.png'><img id='HiHat_3' class='btn' src='/img/editor/button_off.png'><img id='HiHat_4' class='btn' src='/img/editor/button_off.png'><img id='HiHat_5' class='btn' src='/img/editor/button_off.png'><img id='HiHat_6' class='btn' src='/img/editor/button_off.png'><img id='HiHat_7' class='btn' src='/img/editor/button_off.png'><img id='HiHat_8' class='btn' src='/img/editor/button_off.png'><img id='HiHat_9' class='btn' src='/img/editor/button_off.png'><img id='HiHat_10' class='btn' src='/img/editor/button_off.png'><img id='HiHat_11' class='btn' src='/img/editor/button_off.png'><img id='HiHat_12' class='btn' src='/img/editor/button_off.png'><img id='HiHat_13' class='btn' src='/img/editor/button_off.png'><img id='HiHat_14' class='btn' src='/img/editor/button_off.png'><img id='HiHat_15' class='btn' src='/img/editor/button_off.png'>
					        </div>
					        <div class='buttons_row'>
					            <span class='editor_label'>Snare</span>
					            <img id='Snare_0' class='btn' src='/img/editor/button_off.png'><img id='Snare_1' class='btn' src='/img/editor/button_off.png'><img id='Snare_2' class='btn' src='/img/editor/button_off.png'><img id='Snare_3' class='btn' src='/img/editor/button_off.png'><img id='Snare_4' class='btn' src='/img/editor/button_off.png'><img id='Snare_5' class='btn' src='/img/editor/button_off.png'><img id='Snare_6' class='btn' src='/img/editor/button_off.png'><img id='Snare_7' class='btn' src='/img/editor/button_off.png'><img id='Snare_8' class='btn' src='/img/editor/button_off.png'><img id='Snare_9' class='btn' src='/img/editor/button_off.png'><img id='Snare_10' class='btn' src='/img/editor/button_off.png'><img id='Snare_11' class='btn' src='/img/editor/button_off.png'><img id='Snare_12' class='btn' src='/img/editor/button_off.png'><img id='Snare_13' class='btn' src='/img/editor/button_off.png'><img id='Snare_14' class='btn' src='/img/editor/button_off.png'><img id='Snare_15' class='btn' src='/img/editor/button_off.png'>
					        </div>
					        <div class='buttons_row'>
					            <span class='editor_label'>Kick</span>
					            <img id='Kick_0' class='btn' src='/img/editor/button_off.png'><img id='Kick_1' class='btn' src='/img/editor/button_off.png'><img id='Kick_2' class='btn' src='/img/editor/button_off.png'><img id='Kick_3' class='btn' src='/img/editor/button_off.png'><img id='Kick_4' class='btn' src='/img/editor/button_off.png'><img id='Kick_5' class='btn' src='/img/editor/button_off.png'><img id='Kick_6' class='btn' src='/img/editor/button_off.png'><img id='Kick_7' class='btn' src='/img/editor/button_off.png'><img id='Kick_8' class='btn' src='/img/editor/button_off.png'><img id='Kick_9' class='btn' src='/img/editor/button_off.png'><img id='Kick_10' class='btn' src='/img/editor/button_off.png'><img id='Kick_11' class='btn' src='/img/editor/button_off.png'><img id='Kick_12' class='btn' src='/img/editor/button_off.png'><img id='Kick_13' class='btn' src='/img/editor/button_off.png'><img id='Kick_14' class='btn' src='/img/editor/button_off.png'><img id='Kick_15' class='btn' src='/img/editor/button_off.png'>
					        </div>
					        <div class='buttons_row' id='LED_row'>
					            <span class='editor_label'></span>
					            <img id='LED_0' src='/img/editor/LED_off.png'><img id='LED_1' src='/img/editor/LED_off.png'><img id='LED_2' src='/img/editor/LED_off.png'><img id='LED_3' src='/img/editor/LED_off.png'><img id='LED_4' src='/img/editor/LED_off.png'><img id='LED_5' src='/img/editor/LED_off.png'><img id='LED_6' src='/img/editor/LED_off.png'><img id='LED_7' src='/img/editor/LED_off.png'><img id='LED_8' src='/img/editor/LED_off.png'><img id='LED_9' src='/img/editor/LED_off.png'><img id='LED_10' src='/img/editor/LED_off.png'><img id='LED_11' src='/img/editor/LED_off.png'><img id='LED_12' src='/img/editor/LED_off.png'><img id='LED_13' src='/img/editor/LED_off.png'><img id='LED_14' src='/img/editor/LED_off.png'><img id='LED_15' src='/img/editor/LED_off.png'>
					        </div>
					    </section>
					    <section class='editor_container active' id='params'>
					        <div id='paramsleft_container'>
					            <div id='kitcombo_container'>
					                <span class='editor_label' id='kitlabel'>Kit</span>
					                <div class='combo' id='kitcombo'>
					                    <span id='kitname'></span>
					                    <img src='/img/editor/drop_arrow.png'>
					                    <ul class='combolist' id='kitlist'>
					                    </ul>
					                </div>
					            </div>
					            <div id='effectcombo_container'>
					                <span class='editor_label' id='effectlabel'>Effect</span>
					                <div class='combo' id='effectcombo'>
					                    <span id='effectname'></span>
					                    <img src='/img/editor/drop_arrow.png'>
					                    <ul class='combolist' id='effectlist'>
					                    </ul>
					                </div>
					            </div>
					            <div id='tempo_container'>
					                <span class='editor_label' id='tempolabel'>Tempo</span>
					                <div id='tempodisplay'>
					                <span id='tempo'></span>&nbsp;<span id='bpm'>bpm</span>
					                </div>
					                <img id='tempodec' src='/img/editor/tempo_dec.png'><img id='tempoinc' src='/img/editor/tempo_inc.png'>
					            </div>
					            <div class='slider_container' id='swing_container'>
					                <span class='editor_label' id='swinglabel'>Swing</span>
					                <div class='slider_groove'>
					                    <img class='slider_track' src='/img/editor/sliderh_track.png'>
					                    <img class='slider_thumb' id='swing_thumb' src='/img/editor/sliderh_thumb.png'>
					                </div>
					            </div>
					        </div>
					        <div class='vrule'></div>
					        <div class='slider_container' id='effect_container'>
					            <div class='slider_groove'>
					                <img class='slider_track' src='/img/editor/slider_track.png'>
					                <img class='slider_thumb' id='effect_thumb' src='/img/editor/slider_thumb.png'>
					            </div>
					            <div class='slider_label'>
					                Effect Level
					            </div>
					        </div>
					        <div class='vrule'></div>
					        <div class='slider_container' id='kick_container'>
					            <div class='slider_groove'>
					                <img class='slider_track' src='/img/editor/slider_track.png'>
					                <img class='slider_thumb' id='kick_thumb' src='/img/editor/slider_thumb.png'>
					            </div>
					            <div class='slider_label'>
					                Kick Pitch
					            </div>
					        </div>
					        <div class='slider_container' id='snare_container'>
					            <div class='slider_groove'>
					                <img class='slider_track' src='/img/editor/slider_track.png'>
					                <img class='slider_thumb' id='snare_thumb' src='/img/editor/slider_thumb.png'>
					            </div>
					            <div class='slider_label'>
					                Snare Pitch
					            </div>
					        </div>
					        <div class='slider_container' id='hihat_container'>
					            <div class='slider_groove'>
					                <img class='slider_track' src='/img/editor/slider_track.png'>
					                <img class='slider_thumb' id='hihat_thumb' src='/img/editor/slider_thumb.png'>
					            </div>
					            <div class='slider_label'>
					                Hi-Hat Pitch
					            </div>
					        </div>
					        <div class='slider_container' id='tom1_container'>
					            <div class='slider_groove'>
					                <img class='slider_track' src='/img/editor/slider_track.png'>
					                <img class='slider_thumb' id='tom1_thumb' src='/img/editor/slider_thumb.png'>
					            </div>
					            <div class='slider_label'>
					                Tom 1 Pitch
					            </div>
					        </div>
					        <div class='slider_container' id='tom2_container'>
					            <div class='slider_groove'>
					                <img class='slider_track' src='/img/editor/slider_track.png'>
					                <img class='slider_thumb' id='tom2_thumb' src='/img/editor/slider_thumb.png'>
					            </div>
					            <div class='slider_label'>
					                Tom 2 Pitch
					            </div>
					        </div>
					        <div class='slider_container' id='tom3_container'>
					            <div class='slider_groove'>
					                <img class='slider_track' src='/img/editor/slider_track.png'>
					                <img class='slider_thumb' id='tom3_thumb' src='/img/editor/slider_thumb.png'>
					            </div>
					            <div class='slider_label'>
					                Tom 3 Pitch
					            </div>
					        </div>
					    </section>
					    
					    <section class='editor_container active' id='tools'>
					        <span class='editor_label' id='beatlabel'>Beat</span>
					        <img id='play' src='/img/editor/btn_play_loading.gif' width='80' height='33'>
					        <img id='stop' src='/img/editor/btn_stop.png'>
					        <img id='save' src='/img/editor/btn_save.png'>
					        <img id='load' src='/img/editor/btn_load.png'>
					        <img id='reset' src='/img/editor/btn_reset.png'>
					        <span id='demos_container'>
					            <span class='editor_label' id='demolabel'>Demo</span>
					            <img id='demo1' src='/img/editor/btn_demo1_loading.gif' width='44' height='33'><img id='demo2' src='/img/editor/btn_demo2_loading.gif' width='44' height='33'><img id='demo3' src='/img/editor/btn_demo3_loading.gif' width='44' height='33'><img id='demo4' src='/img/editor/btn_demo4_loading.gif' width='44' height='33'><img id='demo5' src='/img/editor/btn_demo5_loading.gif' width='45' height='33'>
					        </span>
					    </section>
					    
					    

					    <textarea id='save_textarea' name="data" spellcheck='false'>{{ $data }}</textarea>


					    {{ Form::button('Save', array('class' => 'btn', 'id' => 'save_btn')) }}

					    {{ Form::close() }}

					</div>
				</div>	



				<!--<form class="form-inline" id="editor_form">	
				<div id="editor_info">
					<legend>Settings</legend>
					<div class="row">
						<div class="span3">
							<label for="type">Type</label>
							<select class="input-medium" name="type" id="type">
								<option value="1">Groove</option>
								<option value="2">Fill</option>
								<option value="3">Break</option>
							</select>
						</div>
						<div class="span3">
							<label for="genre">Genre</label>
							<select class="input-medium" name="genre" id="genre">
								<option value="1">Pop</option>
								<option value="2">Rock</option>
								<option value="3">Metal</option>
							</select>
						</div>
						<div class="span3">						
							<label for="artist">Artist</label>
							<select class="input-medium" name="artist" id="artist">
								<option value="1">Eigen</option>
								<option value="2">Black Keys</option>
								<option value="3">Foo Fighters</option>
							</select>
						</div>
						<div class="span3">						
							<label for="song">Song</label>
							<select class="input-medium" name="song" id="song">
								<option value="1">Eigen</option>
								<option value="2">Gold On The Ceiling</option>
								<option value="3">All My Life</option>
							</select>
						</div>					
					</div>

					<div class="row">
						<div class="span3">
							<label for="time">Time</label>
							<input type="text" class="input-medium" name="time" id="time" placeholder="1:23" />
						</div>	
						<div class="span3">
							<label for="youtube">Youtube</label>
							<input type="text" class="input-medium" name="youtube" id="youtube" placeholder="http://www.youtube.com/watch?v=Phfc0rPB_7k" />
						</div>
					</div>
				</div>


						<button class="btn btn-large pull-right" type="submit" id="save_editor">Opslaan</button>

				

				</form>-->

@endsection