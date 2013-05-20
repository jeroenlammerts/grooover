@layout('master')
@section('content')

<div class="row">
	<div class="span12">
		<h2>Register</h2>
		{{ Form::open('login') }}
			<fieldset>
				<legend>Please fill in your information below to login Grooover.</legend>
				<div class="control-group">
					{{ Form::label('email', 'Email', array('class' => 'input-xlarge')) }}
					<div class="controls">
						{{ Form::text('email', Input::old('email'), array('class' => 'input-xlarge')) }}
					</div>
				</div>
				<div class="control-group">
					{{ Form::label('password', 'Password', array('class' => 'input-xlarge')) }}
					<div class="controls">
						{{ Form::password('password', array('class' => 'input-xlarge')) }}
					</div>
				</div>
				<div class="control-group">
					<div class="controls">
						{{ Form::submit('Login', array('class' => 'btn')) }}
					</div>
				</div>
			</fieldset>
		{{ Form::close() }}
	</div>
</div>

@endsection