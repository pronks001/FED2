// NameSpace of Module pattern
var app = app || {};

// Self Invoking Anonymous Function
(function(){

	app.controller = {
		init: function(){
			app.config.init();
			app.router.init();
			app.sections.init();
		}
	}

	app.router = {

		init: function() {
			routie({
			    'about': function() {
			    	console.log("About");
					app.sections.toggle("about");
			    },
			    'movies': function() {
			    	console.log("Movies");
					app.sections.toggle("movies");
			    }
			});
		}

	}

	app.content = {

		about: {
			title: "About this app",
			description: [
				{
					paragraph: "Cities fall but they are rebuilt. heroes die but they are remembered. the man likes to play chess; let's get him some rocks. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. bruce... i'm god. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can't now, being dead and all. rehabilitated? well, now let me see. you know, i don't have any idea what that means. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. rehabilitated? well, now let me see. you know, i don't have any idea what that means. cities fall but they are rebuilt. heroes die but they are remembered. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can't now, being dead and all."
				},
				{
					paragraph: "I did the same thing to gandhi, he didn't eat for three weeks. bruce... i'm god. cities fall but they are rebuilt. heroes die but they are remembered. i once heard a wise man say there are no perfect men. only perfect intentions. cities fall but they are rebuilt. heroes die but they are remembered. boxing is about respect. getting it for yourself, and taking it away from the other guy. well, what is it today? more spelunking? let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. bruce... i'm god. well, what is it today? more spelunking? it only took me six days. same time it took the lord to make the world. i did the same thing to gandhi, he didn't eat for three weeks."
				},
				{
					paragraph: "Let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. boxing is about respect. getting it for yourself, and taking it away from the other guy. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. you measure yourself by the people who measure themselves by you. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. you measure yourself by the people who measure themselves by you. you measure yourself by the people who measure themselves by you. that tall drink of water with the silver spoon up his ass. i once heard a wise man say there are no perfect men. only perfect intentions. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. boxing is about respect. getting it for yourself, and taking it away from the other guy."
				},
				{
					paragraph: "That tall drink of water with the silver spoon up his ass. well, what is it today? more spelunking? i now issue a new commandment: thou shalt do the dance. let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. i did the same thing to gandhi, he didn't eat for three weeks. the man likes to play chess; let's get him some rocks. i now issue a new commandment: thou shalt do the dance. i now issue a new commandment: thou shalt do the dance. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. i don't think they tried to market it to the billionaire, spelunking, base-jumping crowd. that tall drink of water with the silver spoon up his ass. it only took me six days. same time it took the lord to make the world."
				}
			]
		},

		movieTitle :{title:"Movies"},

		movieReviews: {},
		movies: localStorage.getItem('films'),
	}
    
    app.manipulatieData =  {
            reviewData: function() {
                console.log("manipulate review scores")
                // get data
                var data = JSON.parse(localStorage.getItem('films'));

                //map reduce
                _.map(data, function (movie, i) {
                        movie.reviews   = _.reduce(movie.reviews,   function(memo, review){   return memo + review.score; }, 0) / movie.reviews.length;

                console.log(movie.reviews)
                return movie;
                })  
        console.log(data)
        app.content.movies = data;
        console.log(app.content.movies)
        return data;
         
        }
    }

	app.sections = {

		init: function() {
            app.manipulatieData.reviewData();
			app.sections.about();
			app.sections.movies();
			app.sections.toggle();
			
		},

		about: function() {
			Transparency.render(document.getElementById('about'), app.content.about);
		},

		movies: function() {
			var self = this;

			if(localStorage.getItem('films')){
				Transparency.render(document.getElementById('movies'), app.content.movies, app.config.directives);
				Transparency.render(document.getElementById('movie'), app.content.movieTitle, app.config.directives);
			}
			else{
				app.config.xhr.trigger("GET", "http://dennistel.nl/movies", self.moviesSucces, "JSON");

			}

			



		},

		moviesSucces: function(text) {
			console.log('Parsed data', JSON.parse(text));
			app.content.movies = JSON.parse(text);
			console.log('Data from data object', app.content.movies);
			
			//underscore_js


			Transparency.render(document.getElementById('movies'), app.content.movies, app.config.directives);
			Transparency.render(document.getElementById('movie'), app.content.movieTitle, app.config.directives);

			localStorage.setItem('films', text);
		},

		toggle: function(section) {
			if (section == "about") {
				document.querySelector('#about').classList.add('active');
				document.querySelector('#movie').classList.remove('active');
				document.querySelector('#movies').classList.remove('active');
			} 
			else if (section == "movies") {
				document.querySelector('#movie').classList.add('active');
				document.querySelector('#movies').classList.add('active');
				document.querySelector('#about').classList.remove('active');
			}
		}

	}
    
	app.config = {
		init: function() {
            this.transparency();
        },

        // Custom binding name
        transparency: function() {
            Transparency.matcher = function(element, key) {
                return element.el.getAttribute('data-name') == key;
            };
        },

		directives: {
			cover: {
			    src: function(params) {
			      	return this.cover;
			    }
		  	}
		},

		xhr: {
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
		}

	}


})();

app.controller.init();