
var app = app || {};

var xhr = {
	trigger: function (type, url, success, data) {
		var req = new XMLHttpRequest;
		req.open(type, url, true);

		req.setRequestHeader('Content-type','application/json');

		type === 'POST' ? req.send(data) : req.send(null);

		req.onreadystatechange = function() {
			if (req.readyState === 4) {
				if (req.status === 200 || req.status === 201) {
					success(req.responseText);
				}
			}
		}
	}
};

function succes (text){
	console.log(JSON.parse(text));
}

xhr.trigger("GET", "http://dennistel.nl/movies", succes, "JSON");

(function(){ 

	app.controller = {

		init:function(){
			// app.working.init();
			app.router.init();
			app.sections.init();
		}
	}

	app.router = {

		init:function(){

			routie({
				'about':function() {
					console.log("about");
					app.sections.toggle("#about");
				},
				'movies':function(){
					console.log("movies");
					app.sections.toggle("#movies");

				}
			});

		}
	}

	app.content = {

		about: {
			title: "About this app",
			description:[
			{
				p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at finibus diam. Sed commodo."
			},
			{
				p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at finibus diam. Sed commodo."
			},
			{
				p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at finibus diam. Sed commodo."
			},
			{
				p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at finibus diam. Sed commodo."
			},

			]
		},

		movies:{
			title: "Favorite movies",
			movieContent: [

    		{	title:'Shawshank Redemption',
    			releaseDate:'14 October 1994',
    			description:'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    			cover:'static/images/shawshank-redemption.jpg'
    		},

    		{	title:'TheGodfather',
    			releaseDate:'14 October 1994',
    			description:'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    			cover:'static/images/the-godfather.jpg'
    		},

    		{	title:'PulpFiction',
    			releaseDate:'14 October 1994',
    			description:'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    			cover:'static/images/pulp-fiction.jpg'
    		},

    		{	title:'TheDarkKnight',
    			releaseDate:'14 October 1994',
    			description:'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    			cover:'static/images/the-dark-knight.jpg'
    		}
		]

		}
	}

	app.directives = {
		cover: {
			src: function(params) {
				return this.cover;
			}
		}
	};

	app.sections = { 
		init: function(){ 
			app.sections.about(); 
			app.sections.movies();

			//app.sections.toggle(); 
		}, 
		about: function(){ 
			Transparency.render(document.getElementById('about'), app.content.about); 
		}, 
		movies: function(){ 
			movies: {
				Transparency.render(document.getElementById('movies'), app.content.movies);
			} 

			moviesContent: {
				Transparency.render(document.getElementsByClassName('moviesContent')[0], app.content.movies.movieContent, app.directives); 
			}
		}, 


		toggle: function(sections){

			if (sections == "#about") {
				document.getElementById('about' ).classList.add( 'active' );
				document.getElementById('movies' ).classList.remove( 'active'); 
				//document.querySelector("#movies").classList.remove('active'); 
			}

			else if (sections == "#movies"){ 
				document.getElementById('movies').classList.add('active');
				document.getElementById('about' ).classList.remove('active'); 
			}
		}
	};



})();

app.controller.init();


