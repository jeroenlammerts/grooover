@layout('master')
@section('content')

	pattern detail {{ $pattern_id }}

	<a href="{{ URL::to_route('editor', array($pattern_id)) }}">Edit pattern</a>


@endsection