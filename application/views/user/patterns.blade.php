@layout('master')
@section('content')

<div class="row">
	<div class="span12">
		<h2>{{ $title }}</h2>
	</div>
</div>				
<div class="row">
	<div class="span12">
		@include('patterns.table')
	</div>
</div>
@endsection