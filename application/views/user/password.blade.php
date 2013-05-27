@layout('master')
@section('content')

<div class="row">
	<div class="span12">
		<h2>Forgot password</h2>
		{{ Form::open('forgot_password') }}
			<fieldset>
				<legend>Please fill in your email below to get a new password.</legend>
				<div class="control-group">
					{{ Form::label('email', 'Email', array('class' => 'input-xlarge')) }}
					<div class="controls">
						{{ Form::text('email', Input::old('email'), array('class' => 'input-xlarge')) }}
					</div>
				</div>
				<div class="control-group">
					<div class="controls">
						{{ Form::submit('Send', array('class' => 'btn')) }}
					</div>
				</div>
			</fieldset>
		{{ Form::close() }}
	</div>
</div>

@endsection