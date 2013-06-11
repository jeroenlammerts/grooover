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
					                <span id='tempo'></span>&nbsp;
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
					    
					    

					    <textarea id='save_textarea' name="data" spellcheck='false'>{{ $pattern->data }}</textarea>

					</div>
				</div>	

				<div id="editor_info" class="form-inline">
					<legend>Settings</legend>
					<div class="row">
						<div class="span3">
							<label for="youtube">Youtube</label>
							<input type="text" class="input-medium" name="youtube" id="youtube" placeholder="http://www.youtube.com/watch?v=Phfc0rPB_7k" value="{{ $pattern->youtube }}" />
						</div>						
						<div class="span3">
							<label for="title">Title</label>
							<input type="text" class="input-medium" name="title" id="title" placeholder="" value="{{ $pattern->title }}" />
						</div>
						<div class="span3">
							<label for="type">Type</label>
							<select class="input-medium" name="type" id="type">
								@foreach($pattern_types as $type)
								<option value="{{ $type->id }}"@if($type->id == $pattern->pattern_type_id) selected="selected"@endif>{{ $type->name }}</option>
								@endforeach
							</select>
						</div>
						<div class="span3">
							<label for="genre">Genre</label>
							<select class="input-medium" name="genre" id="genre">
								@foreach($genres as $genre)
								<option value="{{ $genre->id }}"@if($genre->id == $pattern->genre_id) selected="selected"@endif>{{ $genre->name }}</option>
								@endforeach
							</select>
						</div>				
					</div>
					<div class="row">
						<div class="span3">
							<label for="time">Time</label>
							<input type="text" class="input-medium" name="time" id="time" placeholder="1:23" value="{{ date('H:i:s', strtotime($pattern->time)) }}" />
						</div>	
						<div class="span3">
							<label for="public">Visibility</label>
							<select class="input-medium" name="public" id="public">
								<option value="1"@if($pattern->public) selected="selected"@endif>Public</option>
								<option value="0"@if(!$pattern->public) selected="selected"@endif>Private</option>
							</select>
						</div>
					</div>
				</div>

				<div id="video_container"@if(trim($pattern->youtube) != '') class="visible"@endif>
					<legend>Video</legend>
					<iframe id="video_frame" width="400" height="300" src="http://www.youtube.com/embed/{{ $pattern->youtube }}?start={{ strtotime('1970-01-01 ' . $pattern->time . 'GMT') }}" frameborder="0" allowfullscreen></iframe>
				</div>

				<legend>Pattern</legend>
				<div class="row" id="editor_contols">
					<div class="span12">
						<div class="btn-toolbar" id="editor_controls">
							<div class="btn-group">
								<!--<a href="javascript: void(0);" class="btn btn-inverse"><i class="icon-white icon-backward"></i></a>-->
								<a href="javascript: void(0);" class="btn btn-inverse" id="btn_play"><i class="icon-white icon-play"></i></a>
								<!--<a href="javascript: void(0);" class="btn btn-inverse"><i class="icon-white icon-pause"></i></a>
								<a href="javascript: void(0);" class="btn btn-inverse"><i class="icon-white icon-forward"></i></a>-->
								<a href="javascript: void(0);" class="btn btn-inverse" id="btn_loop"><i class="icon-white icon-repeat"></i></a>
							</div>
							<div class="btn-group">
								<a class="btn btn-inverse dropdown-toggle" data-toggle="dropdown" href="#">
									<span id="active_kit">Loading..</span>
									<span class="caret"></span>
								</a>
								<ul class="dropdown-menu" id="kits_list"></ul>
							</div>
							<div class="btn-group">
								<a class="btn btn-inverse dropdown-toggle" data-toggle="dropdown" href="#">
									<span id="active_effect">Loading..</span>
									<span class="caret"></span>
								</a>
								<ul class="dropdown-menu" id="effects_list"></ul>
							</div>
							<div class="btn-group">
								<a href="javascript: void(0);" class="btn btn-inverse"><span id="bpm"></span> BPM</a>
								<a href="javascript: void(0);" class="btn btn-inverse" id="bpm_up"><i class="icon-white icon-plus"></i></a>
								<a href="javascript: void(0);" class="btn btn-inverse" id="bpm_down"><i class="icon-white icon-minus"></i></a>
							</div>
							<div class="btn-group">
								<a href="javascript: void(0);" class="btn btn-inverse">
									<span class="swing">Swing</span><input type="text" id="swing_slider" value="" />
								</a>
							</div>
						</div>					
					</div>
				</div>

				<div class="row" id="editor_wrap">

					<div class="span2" id="editor_instruments">
						<table class="table">
							<tr class="first">
								<td>&nbsp;</td>
							</tr>
							<tr>
								<td>
								</td>
							</tr>
						</table>
					</div>

					<div class="span12" id="editor_container">
						<div id="editor"></div>
					</div>

				</div>

			    {{ Form::button('Save', array('class' => 'btn btn-large pull-right', 'id' => 'save_btn')) }}
			    {{ Form::close() }}


<div id="deleteWindow" class="modal hide fade">
    <div class="modal-header">
      <a href="#" class="close" data-dismiss="modal" aria-hidden="true">&times;</a>
      <h3>Delete measure</h3>
    </div>
    <div class="modal-body">
      <p>Do you really want to delete this measure?</p>
    </div>
    <div class="modal-footer">
      <a href="#" class="btn btn-danger" id="deleteReal">Yes</a>
      <a href="#" class="btn btn-secondary" data-dismiss="modal" >No</a>
    </div>
</div>			    

@endsection