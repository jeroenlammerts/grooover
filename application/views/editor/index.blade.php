@layout('master')
@section('content')

				<div class="row">

					<div class="span12">

						<h2>Editor</h2>

						<p>

							...

						</p>						

					</div>

				</div>	

				

				<form class="form-inline" id="editor_form">	

				<div id="editor_info">

					<legend>Settings</legend>

					<div class="row">

						<div class="span3">

							<label for="type">Type</label>

							<select class="input-medium" name="type" id="type">

								<option value="1">Groove</option>

								<option value="2">Fill</option>

								<option value="3">Break</option>

							</select>

						</div>

						<div class="span3">

							<label for="genre">Genre</label>

							<select class="input-medium" name="genre" id="genre">

								<option value="1">Pop</option>

								<option value="2">Rock</option>

								<option value="3">Metal</option>

							</select>

						</div>

						<div class="span3">						

							<label for="artist">Artist</label>

							<select class="input-medium" name="artist" id="artist">

								<option value="1">Eigen</option>

								<option value="2">Black Keys</option>

								<option value="3">Foo Fighters</option>

							</select>

						</div>

						<div class="span3">						

							<label for="song">Song</label>

							<select class="input-medium" name="song" id="song">

								<option value="1">Eigen</option>

								<option value="2">Gold On The Ceiling</option>

								<option value="3">All My Life</option>

							</select>

						</div>					

					</div>

					<div class="row">

						<div class="span3">

							<label for="time">Time</label>

							<input type="text" class="input-medium" name="time" id="time" placeholder="1:23" />

						</div>	

						<div class="span3">

							<label for="youtube">Youtube</label>

							<input type="text" class="input-medium" name="youtube" id="youtube" placeholder="http://www.youtube.com/watch?v=Phfc0rPB_7k" />

						</div>

					</div>

				</div>

				

				<div class="row" id="editor_wrap">

					<div class="span2" id="editor_instruments">

						<table class="table">

							<tr class="first">
								<td>&nbsp;</td>
							</tr>
							<tr>
								<td>

									<div class="btn-group">

										<button class="btn dropdown-toggle" data-toggle="dropdown"><i class="icon-plus"></i></button>

										<ul class="dropdown-menu">

											<li><a href="#">Tom1</a></li>

											<li><a href="#">Tom2</a></li>

											<li><a href="#">Floortom</a></li>

											<li class="divider"></li>

											<li><a href="#">Cowbell</a></li>

										</ul>

									</div>

								</td>
							</tr>
						</table>

					</div>

					<div class="span10" id="editor_container">

						<div id="editor">

							<table class="table">

								<tr class="first">

									<td>

										1.

									</td>

									<td colspan="3">

										<div class="btn-group pull-right">

											<a href="#" class="btn"><i class="icon-edit"></i></a>

											<a href="#" class="btn"><i class="icon-trash"></i></a>

											<a href="#" class="btn"><i class="icon-plus"></i></a>

										</div>

									</td>									

								</tr>

								<tr>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>									

								</tr>

								<tr>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>									

								</tr>

								<tr>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>									

								</tr>

								<tr>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>									

								</tr>								

								<tr>

									<td>

										<table class="count">

											<tr>

												<td>1</td>

												<td>e</td>

												<td>+</td>

												<td>a</td>

											</tr>

										</table>									

									</td>

									<td>

										<table class="count">

											<tr>

												<td>2</td>

												<td>e</td>

												<td>+</td>

												<td>a</td>

											</tr>

										</table>									

									</td>

									<td>

										<table class="count">

											<tr>

												<td>3</td>

												<td>e</td>

												<td>+</td>

												<td>a</td>

											</tr>

										</table>									

									</td>

									<td>

										<table class="count">

											<tr>

												<td>4</td>

												<td>e</td>

												<td>+</td>

												<td>a</td>

											</tr>

										</table>									

									</td>									

								</tr>

							</table>

							

							<table class="table">

								<tr class="first">

									<td>

										2.

									</td>

									<td colspan="3">

										<div class="btn-group pull-right">

											<a href="#" class="btn"><i class="icon-edit"></i></a>

											<a href="#" class="btn"><i class="icon-trash"></i></a>

											<a href="#" class="btn"><i class="icon-plus"></i></a>

										</div>

									</td>									

								</tr>

								<tr>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>									

								</tr>

								<tr>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>									

								</tr>

								<tr>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>									

								</tr>

								<tr>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>									

								</tr>								

								<tr>

									<td>

										<table class="count">

											<tr>

												<td>1</td>

												<td>e</td>

												<td>+</td>

												<td>a</td>

											</tr>

										</table>									

									</td>

									<td>

										<table class="count">

											<tr>

												<td>2</td>

												<td>e</td>

												<td>+</td>

												<td>a</td>

											</tr>

										</table>									

									</td>

									<td>

										<table class="count">

											<tr>

												<td>3</td>

												<td>e</td>

												<td>+</td>

												<td>a</td>

											</tr>

										</table>									

									</td>

									<td>

										<table class="count">

											<tr>

												<td>4</td>

												<td>e</td>

												<td>+</td>

												<td>a</td>

											</tr>

										</table>									

									</td>									

								</tr>

							</table>							

							

							<table class="table">

								<tr class="first">

									<td>

										3.

									</td>

									<td colspan="3">

										<div class="btn-group pull-right">

											<a href="#" class="btn"><i class="icon-edit"></i></a>

											<a href="#" class="btn"><i class="icon-trash"></i></a>

											<a href="#" class="btn"><i class="icon-plus"></i></a>

										</div>

									</td>									

								</tr>

								<tr>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>									

								</tr>

								<tr>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>									

								</tr>

								<tr>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>									

								</tr>

								<tr>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>

									<td>

										<table>

											<tr>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

												<td><input type="text" name="" id="" placeholder="-" /></td>

											</tr>

										</table>

									</td>									

								</tr>								

								<tr>

									<td>

										<table class="count">

											<tr>

												<td>1</td>

												<td>e</td>

												<td>+</td>

												<td>a</td>

											</tr>

										</table>									

									</td>

									<td>

										<table class="count">

											<tr>

												<td>2</td>

												<td>e</td>

												<td>+</td>

												<td>a</td>

											</tr>

										</table>									

									</td>

									<td>

										<table class="count">

											<tr>

												<td>3</td>

												<td>e</td>

												<td>+</td>

												<td>a</td>

											</tr>

										</table>									

									</td>

									<td>

										<table class="count">

											<tr>

												<td>4</td>

												<td>e</td>

												<td>+</td>

												<td>a</td>

											</tr>

										</table>									

									</td>									

								</tr>

							</table>							



						</div>

					</div>

				</div>

				<div class="row" id="editor_contols">

					<div class="span10 offset2">

					

						<div class="btn-toolbar">

							<div class="btn-group">

								<a href="#" class="btn btn-inverse"><i class="icon-white icon-fast-backward"></i></a>

								<a href="#" class="btn btn-inverse"><i class="icon-white icon-backward"></i></a>

								<a href="javascript: void(0);" class="btn btn-inverse" id="btn_play"><i class="icon-white icon-play"></i></a>

								<a href="#" class="btn btn-inverse"><i class="icon-white icon-pause"></i></a>

								<a href="#" class="btn btn-inverse"><i class="icon-white icon-forward"></i></a>

								<a href="#" class="btn btn-inverse"><i class="icon-white icon-fast-forward"></i></a>

								<a href="#" class="btn btn-inverse"><i class="icon-white icon-repeat"></i></a>

							</div>

							<div class="btn-group">

								<a class="btn btn-inverse dropdown-toggle" data-toggle="dropdown" href="#">

									Rock kit

									<span class="caret"></span>

								</a>

								<ul class="dropdown-menu">

									<li><a href="#">Pop kit</a></li>

									<li><a href="#">Jazz kit</a></li>

									<li><a href="#">Fusion kit</a></li>							

									<li><a href="#">Electro kit</a></li>							

								</ul>

							</div>
							<div class="btn-group">

								<a href="#" class="btn btn-inverse">120 BPM</a>

								<a href="#" class="btn btn-inverse"><i class="icon-white icon-plus"></i></a>

								<a href="#" class="btn btn-inverse"><i class="icon-white icon-minus"></i></a>

								<a href="#" class="btn btn-inverse">Swing</a>

							</div>

						</div>

						

						<button class="btn btn-large pull-right" type="submit" id="save_editor">Opslaan</button>

						

					</div>

				</div>

				

				</form>

@endsection