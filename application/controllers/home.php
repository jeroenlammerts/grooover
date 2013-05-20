<?php

class Home_Controller extends Base_Controller {

	/*
	|--------------------------------------------------------------------------
	| The Default Controller
	|--------------------------------------------------------------------------
	|
	| Instead of using RESTful routes and anonymous functions, you might wish
	| to use controllers to organize your application API. You'll love them.
	|
	| This controller responds to URIs beginning with "home", and it also
	| serves as the default controller for the application, meaning it
	| handles requests to the root of the application.
	|
	| You can respond to GET requests to "/home/profile" like so:
	|
	|		public function action_profile()
	|		{
	|			return "This is your profile!";
	|		}
	|
	| Any extra segments are passed to the method as parameters:
	|
	|		public function action_profile($id)
	|		{
	|			return "This is the profile for user {$id}.";
	|		}
	|
	*/

	public function action_index()
	{



			$mailer = IoC::resolve('phpmailer');
			try {

				$data = array(
					'subject' => 'Activation',
					'activation_code' => 'YUH&FJ*(^bh'
				);

				$mailer->Subject = $data['subject'];
				$mailer->Body = View::make('email.activate')
					->with('subject', $data['subject'])
					->with('activation_code', $data['activation_code'])
					->render();
				$mailer->AddAddress('jeroenlammerts@gmail.com');
				if(!$mailer->Send()) {
					echo $error = 'Mail error: '.$mail->ErrorInfo; 
				}
			} catch (Exception $e) {
			    echo 'Message was not sent.';
			    echo 'Mailer error: ' . $e->getMessage();
			}


		$title = "Home";
		return View::make('home.index')
			->with('title', $title);
	}

}