<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<title>Grooover | grooves, fills, breaks | @if(isset($title)) {{ $title }} @endif</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
	{{ HTML::style('css/bootstrap.min.css') }}
	{{ HTML::style('css/bootstrap-responsive.css') }}
	{{ HTML::style('css/style.css') }}

	{{ HTML::style('css/drummachine.css') }}

	<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
	<!--[if lt IE 9]>
	  <script src="/js/html5shiv.js"></script>
	<![endif]-->
</head>
<body id="body">
	<header>
		<div class="container">
			<div class="row">
				<div class="span8">
					<a href="{{ URL::to_route('home') }}"><h1>Grooover <span>grooves, fills, breaks</span></h1></a>
				</div>
				<div class="span4">
					<img src="/img/ad3.jpg" alt="" id="top_ad" />
				</div>				
			</div>
			<div class="row">
				<div class="span12">
					<div class="navbar">
						<div class="navbar-inner">
							<ul class="nav">
								<li{{ Request::route()->is('home') ? ' class="active"' : '' }}><a href="{{ URL::to_route('home') }}">Home</a></li>
								<li{{ Request::route()->is('patterns') ? ' class="active"' : '' }}><a href="{{ URL::to_route('patterns') }}">Patterns</a></li>
								@if(Auth::user())
								<li{{ Request::route()->is('editor') ? ' class="active"' : '' }}><a href="{{ URL::to_route('editor') }}">Editor</a></li>
								@endif
								<li{{ Request::route()->is('about') ? ' class="active"' : '' }}><a href="{{ URL::to_route('about') }}">About</a></li>
								<li{{ Request::route()->is('help') ? ' class="active"' : '' }}><a href="{{ URL::to_route('help') }}">Help</a></li>
							</ul>

							{{ Form::open('patterns', 'GET', array('class' => 'navbar-search')) }}
								<div class="input-append">
								  <input class="span2" id="appendedInputButton" type="text" placeholder="Search" name="keyword">
								  <button class="btn" type="submit"><i class="icon-search"></i></button>
								</div>
							{{ Form::close() }}

							@if(Auth::user())
							<ul class="nav pull-right">
								<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Welcome, {{ Auth::user()->first_name }} <b class="caret"></b></a>
									<ul class="dropdown-menu">
										<li><a href="{{ URL::to_route('profile') }}"><i class="icon-cog"></i> Profile</a></li>
										<li><a href="{{ URL::to_route('my_patterns') }}"><i class="icon-music"></i> My patterns</a></li>
										<li><a href="{{ URL::to_route('my_favourites') }}"><i class="icon-star"></i> My favourites</a></li>
										<li class="divider"></li>
										<li><a href="{{ URL::to_route('premium') }}"><i class="icon-bookmark"></i> Upgrade to premium</a></li>
										<li class="divider"></li>
										<li><a href="{{ URL::to_route('logout') }}"><i class="icon-off"></i> Logout</a></li>
									</ul>
								</li>
							</ul>
							@else
							<ul class="nav pull-right">
								<li><a href="{{ URL::to_route('register') }}">Register</a></li>
								<li class="dropdown">
									<a class="dropdown-toggle" href="#" data-toggle="dropdown">Log In <strong class="caret"></strong></a>
									<div class="dropdown-menu" style="padding: 15px; padding-bottom: 0px;">
										{{ Form::open('login') }}
											{{ Form::text('email', '', array('class' => '', 'placeholder' => 'Email')) }}
											{{ Form::password('password', array('class' => '', 'placeholder' => 'Password')) }}
											{{ Form::label('remember_me', 'Remember me') }}
											{{ Form::checkbox('remember_me', '1'); }}
											{{ Form::submit('Login', array('class' => 'btn btn-block')) }}

											<a href="{{ URL::to_route('forgot_password') }}">Forgot password?</a>
										{{ Form::close() }}
									</div>
								</li>
							</ul>
							@endif
						</div>
					</div>
				</div>
			</div>
			<!--<div class="row">
				<div class="span12">
					<ul class="breadcrumb">
						<li><a href="#">Home</a> <span class="divider">/</span></li>
						<li><a href="#">Patterns</a> <span class="divider">/</span></li>
						<li class="active">Fills</li>
					</ul>	
				</div>					
			</div>-->					
		</div>
	</header>
	
	<section class="content">
		<div class="container">
			@include('plugins.status')
			@yield('content')
		</div>
	</section>
	<footer>
		<div class="container">
			<hr/>
			<p>&copy; BLProductions 2013</p>
		</div>
	</footer>
	{{ HTML::script('js/jquery.js') }}
	{{ HTML::script('js/bootstrap.min.js') }}
	{{ HTML::script('js/script.js') }}	
	{{ HTML::script('js/bootstrap-slider.js') }}	
	{{ HTML::script('js/editor.js') }}
</body>
</html>