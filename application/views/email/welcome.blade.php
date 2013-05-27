@layout('email.master')
@section('content')

Welcome to Grooover!<br /><br />

Your login information:<br /><br />

{{ $email }}<br />
{{ $password }}

@endsection