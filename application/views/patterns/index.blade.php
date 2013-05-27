@layout('master')
@section('content')

<div class="row">
	<div class="span12">
		<h2>Patterns</h2>
	</div>
</div>				
<div class="row">
	<div class="span10">
		<div class="well">
			<form class="form-horizontal">
				<div class="control-group">
					<label class="control-label" for="type">Type</label>
					<div class="controls">
						<select class="input-medium" name="type" id="type">
							<option value="1">All types</option>
							<option value="1">Groove</option>
							<option value="2">Fill</option>
							<option value="3">Break</option>
						</select>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="genre">Genre</label>
					<div class="controls">
						<select class="input-medium" name="genre" id="genre">
							<option value="1">All genres</option>
							<option value="1">Pop</option>
							<option value="2">Rock</option>
							<option value="3">Metal</option>
						</select>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="artist">Artist</label>
					<div class="controls">
						<select class="input-medium" name="artist" id="artist">
							<option value="1">All artists</option>
							<option value="2">Black Keys</option>
							<option value="3">Foo Fighters</option>
						</select>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="song">Song</label>
					<div class="controls">
						<select class="input-medium" name="song" id="song">
							<option value="1">All songs</option>
							<option value="1">Eigen</option>
							<option value="2">Gold On The Ceiling</option>
							<option value="3">All My Life</option>
						</select>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="keyword">Keyword</label>
					<div class="controls">
						<input class="input-medium" type="text" name="keyword" id="keyword" />
					</div>
				</div>
				<div class="control-group">
					<div class="controls">
						<button type="submit" class="btn">Search</button>
					</div>
				</div>
			</form>	
		</div>
	
		
		<table class="table table-hover table-striped">
			<thead>
				<tr>
					<th>Name</th>
					<th>Time</th>
					<th>Type</th>
					<th>Genre</th>
					<th>Score</th>
					<th>&nbsp;</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><a href="/index.php?page=pattern">Oasis - Wonderwall</a></td>
					<td><a href="/index.php?page=pattern">1:15</a></td>
					<td><a href="/index.php?page=pattern">Fill</a></td>
					<td><a href="/index.php?page=pattern">Pop</a></td>
					<td>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star-empty"></i>
						<i class="icon-star-empty"></i>
					</td>
					<td><i class="icon-facetime-video"></i></td>
				</tr>								
				<tr class="ad">
					<td><a href="http://www.drumscore.com/" target="_blank"> Oasis - Wonderwall</a></td>
					<td><a href="http://www.drumscore.com/" target="_blank"> <i class="icon-music"></i> Full song</a></td>
					<td><a href="http://www.drumscore.com/" target="_blank">Drumscore</a></td>
					<td><a href="http://www.drumscore.com/" target="_blank">Pop</a></td>
					<td>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
					</td>
					<td>&nbsp;</td>
				</tr>
				<tr>
					<td><a href="/index.php?page=pattern">Foo Fighters - All My Life</a></td>
					<td><a href="/index.php?page=pattern">2:01</a></td>
					<td><a href="/index.php?page=pattern">Fill</a></td>
					<td><a href="/index.php?page=pattern">Rock</a></td>
					<td>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
					</td>
					<td><i class="icon-facetime-video"></i></td>									
				</tr>
				<tr>
					<td><a href="/index.php?page=pattern">Mozambique</a></td>
					<td><a href="/index.php?page=pattern">0:29</a></td>
					<td><a href="/index.php?page=pattern">Groove</a></td>
					<td><a href="/index.php?page=pattern">African pattern</a></td>
					<td>
						<i class="icon-star"></i>
						<i class="icon-star-empty"></i>
						<i class="icon-star-empty"></i>
						<i class="icon-star-empty"></i>
						<i class="icon-star-empty"></i>
					</td>
					<td>&nbsp;</td>
				</tr>	
				<tr>
					<td><a href="/index.php?page=pattern">Oasis - Wonderwall</a></td>
					<td><a href="/index.php?page=pattern">1:15</a></td>
					<td><a href="/index.php?page=pattern">Fill</a></td>
					<td><a href="/index.php?page=pattern">Pop</a></td>
					<td>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star-empty"></i>
						<i class="icon-star-empty"></i>
					</td>
					<td>&nbsp;</td>
				</tr>
				<tr>
					<td><a href="/index.php?page=pattern">Foo Fighters - All My Life</a></td>
					<td><a href="/index.php?page=pattern">2:01</a></td>
					<td><a href="/index.php?page=pattern">Fill</a></td>
					<td><a href="/index.php?page=pattern">Rock</a></td>
					<td>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
					</td>
					<td><i class="icon-facetime-video"></i></td>		
				</tr>
				<tr class="ad">
					<td><a href="http://www.drumscore.com/" target="_blank"> Foo Fighters - All My Life</a></td>
					<td><a href="http://www.drumscore.com/" target="_blank"> <i class="icon-music"></i> Full song</a></td>
					<td><a href="http://www.drumscore.com/" target="_blank">Drumscore</a></td>
					<td><a href="http://www.drumscore.com/" target="_blank">Pop</a></td>
					<td>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
					</td>
					<td>&nbsp;</td>
				</tr>								
				<tr>
					<td><a href="/index.php?page=pattern">Mozambique</a></td>
					<td><a href="/index.php?page=pattern">0:29</a></td>
					<td><a href="/index.php?page=pattern">Groove</a></td>
					<td><a href="/index.php?page=pattern">African pattern</a></td>
					<td>
						<i class="icon-star"></i>
						<i class="icon-star-empty"></i>
						<i class="icon-star-empty"></i>
						<i class="icon-star-empty"></i>
						<i class="icon-star-empty"></i>
					</td>
					<td>&nbsp;</td>
				</tr>
				<tr>
					<td><a href="/index.php?page=pattern">Mozambique</a></td>
					<td><a href="/index.php?page=pattern">0:29</a></td>
					<td><a href="/index.php?page=pattern">Groove</a></td>
					<td><a href="/index.php?page=pattern">African pattern</a></td>
					<td>
						<i class="icon-star"></i>
						<i class="icon-star-empty"></i>
						<i class="icon-star-empty"></i>
						<i class="icon-star-empty"></i>
						<i class="icon-star-empty"></i>
					</td>
					<td>&nbsp;</td>
				</tr>	
				<tr>
					<td><a href="/index.php?page=pattern">Oasis - Wonderwall</a></td>
					<td><a href="/index.php?page=pattern">1:15</a></td>
					<td><a href="/index.php?page=pattern">Fill</a></td>
					<td><a href="/index.php?page=pattern">Pop</a></td>
					<td>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star-empty"></i>
						<i class="icon-star-empty"></i>
					</td>
					<td>&nbsp;</td>
				</tr>
				<tr>
					<td><a href="/index.php?page=pattern">Foo Fighters - All My Life</a></td>
					<td><a href="/index.php?page=pattern">2:01</a></td>
					<td><a href="/index.php?page=pattern">Fill</a></td>
					<td><a href="/index.php?page=pattern">Rock</a></td>
					<td>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
						<i class="icon-star"></i>
					</td>
					<td>&nbsp;</td>
				</tr>
				<tr>
					<td><a href="/index.php?page=pattern">Mozambique</a></td>
					<td><a href="/index.php?page=pattern">0:29</a></td>
					<td><a href="/index.php?page=pattern">Groove</a></td>
					<td><a href="/index.php?page=pattern">African pattern</a></td>
					<td>
						<i class="icon-star"></i>
						<i class="icon-star-empty"></i>
						<i class="icon-star-empty"></i>
						<i class="icon-star-empty"></i>
						<i class="icon-star-empty"></i>
					</td>
					<td>&nbsp;</td>
				</tr>									
			</tbody>
		</table>

		<div class="pagination">
			<ul>
				<li><a href="#">Prev</a></li>
				<li><a href="#">1</a></li>
				<li class="active"><a href="#">2</a></li>
				<li><a href="#">3</a></li>
				<li><a href="#">4</a></li>
				<li><a href="#">5</a></li>
				<li><a href="#">Next</a></li>
			</ul>
		</div>						
		
	</div>
	<div class="span2">
		<img src="img/ad1.jpg" alt=""/>
		<img src="img/ad2.jpg" alt=""/>
		<img src="img/ad4.jpg" alt=""/>
	</div>
</div>

@endsection