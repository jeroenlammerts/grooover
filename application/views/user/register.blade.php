@layout('master')
@section('content')

<div class="row">
	<div class="span12">
		<h2>Register</h2>
		{{ Form::open('register') }}
			<fieldset>
				<legend>Please fill in your information below to register Grooover.</legend>
				<div class="control-group">
					{{ Form::label('first_name', 'First name', array('class' => 'input-xlarge')) }}
					<div class="controls">
						{{ Form::text('first_name', Input::old('first_name'), array('class' => 'input-xlarge')) }}
					</div>
				</div>
				<div class="control-group">
					{{ Form::label('last_name', 'Last name', array('class' => 'input-xlarge')) }}
					<div class="controls">
						{{ Form::text('last_name', Input::old('last_name'), array('class' => 'input-xlarge')) }}
					</div>
				</div>
				<div class="control-group">
					{{ Form::label('email', 'Email', array('class' => 'input-xlarge')) }}
					<div class="controls">
						{{ Form::text('email', Input::old('email'), array('class' => 'input-xlarge', 'autocomplete' => 'off')) }}
					</div>
				</div>
				<div class="control-group">
					{{ Form::label('password', 'Password', array('class' => 'input-xlarge')) }}
					<div class="controls">
						{{ Form::password('password', array('class' => 'input-xlarge', 'autocomplete' => 'off')) }}
						<p class="help-block">Password should be at least 6 characters</p>
					</div>
				</div>

				<div class="control-group">
					{{ Form::label('password_confirm', 'Password confirm', array('class' => 'input-xlarge')) }}
					<div class="controls">
						{{ Form::password('password_confirm', array('class' => 'input-xlarge')) }}
						<p class="help-block">Please confirm password</p>
					</div>
				</div>

				<div class="control-group">
					<div class="controls">
						{{ Form::submit('Register', array('class' => 'btn')) }}
					</div>
				</div>
			</fieldset>
		{{ Form::close() }}
	</div>
</div>

@endsection