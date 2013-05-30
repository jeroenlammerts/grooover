@layout('master')
@section('content')

<div class="row">
	<div class="span12">
		<h2>Profile</h2>
		{{ Form::open('profile') }}
			<fieldset>
				<legend>Your account information.</legend>
				<div class="control-group">
					{{ Form::label('first_name', 'First name', array('class' => 'input-xlarge')) }}
					<div class="controls">
						{{ Form::text('first_name', $user->first_name, array('class' => 'input-xlarge')) }}
					</div>
				</div>
				<div class="control-group">
					{{ Form::label('last_name', 'Last name', array('class' => 'input-xlarge')) }}
					<div class="controls">
						{{ Form::text('last_name', $user->last_name, array('class' => 'input-xlarge')) }}
					</div>
				</div>
				<div class="control-group">
					{{ Form::label('email', 'Email', array('class' => 'input-xlarge')) }}
					<div class="controls">
						{{ Form::text('email', $user->email, array('class' => 'input-xlarge')) }}
					</div>
				</div>
				<div class="control-group">
					{{ Form::label('password', 'Password', array('class' => 'input-xlarge')) }}
					<div class="controls">
						{{ Form::password('password', array('class' => 'input-xlarge')) }}
						<p class="help-block">Fill in to change your password</p>
					</div>
				</div>

				<div class="control-group">
					<div class="controls">
						{{ Form::submit('Save', array('class' => 'btn')) }}
					</div>
				</div>
			</fieldset>
		{{ Form::close() }}
	</div>
</div>

@endsection