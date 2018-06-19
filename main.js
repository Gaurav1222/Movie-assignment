$(document).ready(() => {
	$('#searchForm').on('submit',(e) => {
		let searchText = $('#searchText').val();
		getMovies(searchText);
		e.preventDefault();
	});
});


function getMovies(searchText){
	axios.get('http://www.omdbapi.com?s='+searchText)
	.then((response) => {
	console.log(response);
	let movies = response.data.Search;
	let output = '';
	$.each(movies,(index,movie) => {
		output +='
				<div class="col-md-3">
				<div class="well text-center">
				<img src="${movie.poster}">
				<h5>$.{movie.Title}</h5>
				<a onclick="movieSelected()('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Deatails</a>
				</div
				</div>
		';
	});


		$('#movies').html(output);
})
	.catch((err) => {
		console.log(err);

	});

}
function movieSelected(id){
	sesssionStorage.setItem('movieId',id)
	window.location ='movie.html';
	return false;
}
function getMovie(){
	let movieId = sesssionStorage.getItem('movieId');

	axios.get('http://www.omdbapi.com?i='+movieId)
	.then((response) => {
	console.log(response);
	let movie= response.data;

	let output ='
		<div class="row">
		<div class="col-md-4">
		<img src="$(movie.poster)" class="thumbnail">
 		</div>
		<div class="col-md-8">
		<h2>${movie.Title}</h2>
		<ul class="list-group">
		<li class="list-group-item"><strong>Genre</strong>$(movie.Genre)</li>
		<li class="list-group-item"><strong>Released</strong>$(movie.Released)</li>
		<li class="list-group-item"><strong>Rated</strong>$(movie.Rated)</li>
		<li class="list-group-item"><strong>IMDB</strong>$(movie.imdbRating)</li>
		<li class="list-group-item"><strong>Director</strong>$(movie.Director)</li>
		<li class="list-group-item"><strong>Writer</strong>$(movie.Writer)</li>
		<li class="list-group-item"><strong>Actor</strong>$(movie.Actor)</li>
		</ul>
		</div>
		</div>
			<div class="row">
			<div class="well">
			<h3>Plot</h3>
			${movie.plot}
			<hr>
			<a href="http://imdb.com/title/${movie.imdbID}"target="_blank" class="btn btn-primary">view IMDB</a>
			<a href="index.html" class="btn btn-default">Go back to search</a>


	';

	$('#movie').html(output);
})
	.catch((err) => {
		console.log(err);

	});


}