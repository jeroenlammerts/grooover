<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Simply tell Laravel the HTTP verbs and URIs it should respond to. It is a
| breeze to setup your application using Laravel's RESTful routing and it
| is perfectly suited for building large applications and simple APIs.
|
| Let's respond to a simple GET request to http://example.com/hello:
|
|		Route::get('hello', function()
|		{
|			return 'Hello World!';
|		});
|
| You can even respond to more than one URI:
|
|		Route::post(array('hello', 'world'), function()
|		{
|			return 'Hello World!';
|		});
|
| It's easy to allow URI wildcards using (:num) or (:any):
|
|		Route::put('hello/(:any)', function($name)
|		{
|			return "Welcome, $name.";
|		});
|
*/

Route::get('/', array('as' => 'home', 'uses' => 'home@index'));
Route::get('patterns', array('as' => 'patterns', 'uses' => 'patterns@index'));
Route::get('pattern/(:num)', array('as' => 'pattern_detail', 'uses' => 'patterns@pattern'));
Route::get('editor/(:num?)', array('as' => 'editor', 'uses' => 'patterns@editor'));
//Route::get('editor/json', array('as' => 'editor', 'uses' => 'patterns@json'));
Route::get('about', array('as' => 'about', 'uses' => 'home@about'));
Route::get('help', array('as' => 'help', 'uses' => 'home@help'));
Route::get('login', array('as' => 'login', 'uses' => 'user@index'));
Route::get('register', array('as' => 'register', 'uses' => 'user@register'));
Route::get('register-activate', array('as' => 'register_finished', 'uses' => 'user@register_finished'));
Route::get('activate/(:num)/(:all)', array('as' => 'activate', 'uses' => 'user@activate'));
Route::get('logout', array('as' => 'logout', 'uses' => 'user@logout'));
Route::get('forgot-password', array('as' => 'forgot_password', 'uses' => 'user@forgot_pass'));

// user account
Route::get('profile', array('as' => 'profile', 'uses' => 'user@profile'));
Route::get('my-patterns', array('as' => 'my_patterns', 'uses' => 'patterns@my_patterns'));
Route::get('my-favourites', array('as' => 'my_favourites', 'uses' => 'patterns@my_favourites'));
Route::get('premium', array('as' => 'premium', 'uses' => 'user@premium'));

// post forms
Route::post('login', 'user@index');
Route::post('register', 'user@register');
Route::post('forgot_password', 'user@forgot_pass');
Route::post('profile', 'user@profile');
Route::post('pattern', 'patterns@pattern');
Route::post('search_patterns', 'patterns@search_patterns');

// ajax
Route::post('add_to_favourite', 'patterns@add_to_favourite');

/*
|--------------------------------------------------------------------------
| Application 404 & 500 Error Handlers
|--------------------------------------------------------------------------
|
| To centralize and simplify 404 handling, Laravel uses an awesome event
| system to retrieve the response. Feel free to modify this function to
| your tastes and the needs of your application.
|
| Similarly, we use an event to handle the display of 500 level errors
| within the application. These errors are fired when there is an
| uncaught exception thrown in the application. The exception object
| that is captured during execution is then passed to the 500 listener.
|
*/

Event::listen('404', function()
{
	return Response::error('404');
});

Event::listen('500', function($exception)
{
	return Response::error('500');
});

/*
|--------------------------------------------------------------------------
| Route Filters
|--------------------------------------------------------------------------
|
| Filters provide a convenient method for attaching functionality to your
| routes. The built-in before and after filters are called before and
| after every request to your application, and you may even create
| other filters that can be attached to individual routes.
|
| Let's walk through an example...
|
| First, define a filter:
|
|		Route::filter('filter', function()
|		{
|			return 'Filtered!';
|		});
|
| Next, attach the filter to a route:
|
|		Route::get('/', array('before' => 'filter', function()
|		{
|			return 'Hello World!';
|		}));
|
*/

Route::filter('before', function()
{
	// Do stuff before every request to your application...
});

Route::filter('after', function($response)
{
	// Do stuff after every request to your application...
});

Route::filter('csrf', function()
{
	if (Request::forged()) return Response::error('500');
});

Route::filter('auth', function()
{
	if (Auth::guest()) return Redirect::to('login');
});