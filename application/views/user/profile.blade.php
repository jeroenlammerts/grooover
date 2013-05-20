@layout('master')
@section('content')

<div class="row">
	<div class="span6 well">
		Welcome to your profile page {{ Auth::user()->email }}
	</div>
</div>

@endsection