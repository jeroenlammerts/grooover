@layout('master')

@section('content')

<div class="row" id="home_intro">
	<div class="span6">
		<h2>About Grooover</h2>
		<p>
			Welcome to Grooover!
		</p>
		<p>
			Grooover is an online application made for drummers and other rhythm makers. Grooover offers drummers to create, find and share grooves, fills, breaks, complete songs and a lot more!<br />
		</p>
		<p>
			The editor in Grooover allows you to easily create your drumpatterns.
		</p>
		<p>
			To know more about how Grooover works, please view the instruction video or visit the <a href="{{ URL::to_route('help') }}">help</a> page.
		</p>
	</div>
	<div class="span6">
		<iframe width="570" height="400" src="http://www.youtube.com/embed/zkkdbZpI87s" frameborder="0" allowfullscreen></iframe>
	</div>
</div>
<div class="row">
	<div class="span6">
		<h4>Recent patterns</h4>
		<?php $patterns = $recent_patterns; ?>
		@include('patterns.table')
	</div>	
	<div class="span6">
		<h4>Most popular</h4>
		<?php $patterns = $popular_patterns; ?>
		@include('patterns.table')
	</div>			
</div>			

@endsection