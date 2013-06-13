<?php

class User_Controller extends Base_Controller
{
	public $restful = true;

	public function get_index()
	{
		$title = "Login";
		return View::make('user.index')
			->with('title', $title);
	}

	public function post_index()
	{
		$input = Input::all();

		$rules = array(
			'email' => 'required|email',
			'password' => 'required'
		);

		$v = Validator::make($input, $rules);

		if($v->fails()){
			return Redirect::to_route('login')->with_errors($v)->with_input();
		} else {
			$credentials = array(
				'username' => $input['email'],
				'password' => $input['password']
			);

			$remember = Input::has('remember_me');

			if(Auth::attempt($credentials, $remember)){
				return Redirect::to_route('profile');
			} else {
				return Redirect::to_route('login');
			}
		}		
	}

	public function get_register()
	{
		$title = "Register";
		return View::make('user.register')
			->with('title', $title);
	}	
	public function get_forgot_pass()
	{
		$title = "Forgot password";
		return View::make('user.password')
			->with('title', $title);
	}

	public function post_forgot_pass()
	{
		$input = Input::all();

		$rules = array(
			'email' => 'required|email|exists:users'
		);

		$v = Validator::make($input, $rules);

		if($v->fails()){
			return Redirect::to_route('forgot_password')->with_errors($v)->with_input();
		} else {
			
			$user = User::where_email($input['email'])->first();
			if($user){
				$new_pass = Str::random(8);
				$new_pass_hashed = Hash::make($new_pass);
				$user->password = $new_pass_hashed;
				$user->save();

				$mailer = IoC::resolve('phpmailer');
				try {

					$data = array(
						'subject' => 'Forgot password',
						'password' => $new_pass
					);

					$mailer->Subject = $data['subject'];
					$mailer->Body = View::make('email.password')
						->with('subject', $data['subject'])
						->with('password', $data['password'])
						->render();
					$mailer->AddAddress($user->email, $user->full_name());
					if(!$mailer->Send()) {
						echo $error = 'Mail error: '.$mail->ErrorInfo; 
					}
				} catch (Exception $e) {
				    echo 'Message was not sent.';
				    echo 'Mailer error: ' . $e->getMessage();
				}

				return Redirect::to_route('login')->with('status', 'New password has been sent to your e-mail address.')->with_input();

			}

		}		
	}


	public function get_register_finished()
	{
		$title = "Activate account";
		return View::make('user.activate')
			->with('title', $title);
	}

	public function post_register()
	{
		$input = Input::all();

		$rules = array(
			'first_name' => 'required',
			'last_name' => 'required',
			'email' => 'required|unique:users|email',
			'password' => 'required|min:6',
			'password_confirm' => 'required|same:password|min:6'
		);

		$v = Validator::make($input, $rules);

		if($v->fails()){
			return Redirect::to_route('register')->with_errors($v)->with_input();
		} else {
			$password = $input['password'];
			$password_hased = Hash::make($password);

			$activation_code = Str::random(32);

			$user = new User;
			$user->first_name = $input['first_name'];
			$user->last_name = $input['last_name'];
			$user->email = $input['email'];
			$user->password = $password_hased;
			//$user->activation_code = $activation_code;
			$user->save();

			// welcome mail
			$mailer = IoC::resolve('phpmailer');
			try {

				$data = array(
					'subject' => 'Welcome',
					'first_name' => $user->first_name,
					'email' => $user->email,
					'password' => $password
				);

				$mailer->Subject = $data['subject'];
				$mailer->Body = View::make('email.welcome')
					->with('subject', $data['subject'])
					->with('first_name', $data['first_name'])
					->with('email', $data['email'])
					->with('password', $data['password'])
					->render();
				$mailer->AddAddress($user->email, $user->full_name());
				if(!$mailer->Send()) {
					echo $error = 'Mail error: '.$mail->ErrorInfo; 
				}
			} catch (Exception $e) {
			    echo 'Message was not sent.';
			    echo 'Mailer error: ' . $e->getMessage();
			}

			return Redirect::to_route('login');
		}
	}

	public function get_profile()
	{

		$user = Auth::user();

		$title = "Profile";
		return View::make('user.profile')
			->with('title', $title)
			->with('user', $user);
	}

	public function post_profile()
	{
		$input = Input::all();

		$rules = array(
			'first_name' => 'required',
			'last_name' => 'required',
			'email' => 'required|email',
			'password' => 'min:6'
		);

		$v = Validator::make($input, $rules);

		if($v->fails()){
			return Redirect::to_route('profile')->with_errors($v)->with_input();
		} else {

			$user = Auth::user();

			if($user->id != 12){
				$user->first_name = $input['first_name'];
				$user->last_name = $input['last_name'];
				$user->email = $input['email'];
				if(trim($input['password']) != ''){
					$password = $input['password'];
					$password_hased = Hash::make($password);
					$user->password = $password_hased;
				}			
				$user->save();
				$status = 'Profile saved';
			} else {
				$status = 'Cannot change demo user';
			}

			return Redirect::to_route('profile')->with('status', $status)->with_input();
		}
	}

	public function get_logout()
	{
		Auth::logout();
		return Redirect::to_route('home'); 
	}

	public function get_activate($user_id, $activation_code)
	{
		$user = User::find($user_id);
		if($user->activation_code == $activation_code){
			$user->activated = 1;
			$user->save();

			return Redirect::to_route('login');

		} else {
			return Redirect::to_route('home');
		}

	}

	public function get_premium()
	{
		$title = "Premium";
		return View::make('user.premium')
			->with('title', $title);
	}	

}