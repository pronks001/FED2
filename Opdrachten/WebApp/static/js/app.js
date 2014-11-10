// NameSpace of Module pattern
var app = app || {};

// Self Invoking Anonymous Function
(function(){

	app.controller = {
		init: function(){
			app.config.init();
			app.router.init();
			app.sections.init();
			app.gesture.init();
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
					app.sections.movies();
			    },
                'movies/genre/:genre':function(genre){
                    console.log("Genre: " + genre);
                    app.sections.moviesByGenre(genre);
                },
                
                'movies/:id': function(id){
                    console.log("details page of movie " + id);
                    app.sections.movieDetail(id);
                },
				'*':function(){
					app.sections.toggle("about");
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
		movies: {},
	}
    
    app.hideAllSections = function() {
        _.each(document.getElementsByClassName("section"), function(el){
            el.classList.remove('active'); 
        });
    }
    
    app.manipulatieData =  {
            reviewData: function() {
                console.log("manipulate review scores")
                // get data
                var data = JSON.parse(localStorage.getItem('films'));
                //map reduce
                _.map(data, function (movie, i) {
                        movie.reviews = _.reduce(movie.reviews,   function(memo, review){   return memo + review.score; }, 0) / movie.reviews.length;

                console.log(movie.reviews)
                return movie;
                })  
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
			app.hideAllSections();
            Transparency.render(document.getElementById('about'), app.content.about);
		},

		movies: function() {
			app.hideAllSections();
            var self = this;

            document.getElementById('movies').classList.add('active');
            
			if(localStorage.getItem('films')){
				Transparency.render(document.getElementById('movies'), app.content.movies, app.config.directives);
				Transparency.render(document.getElementById('movie'), app.content.movieTitle, app.config.directives);
			}
			else{
				app.config.xhr.trigger("GET", "http://dennistel.nl/movies", self.moviesSucces, "JSON");

			}

			



		},

		moviesSucces: function(text) {
            app.hideAllSections();
			console.log('Parsed data', JSON.parse(text));
			app.content.movies = JSON.parse(text);
			console.log('Data from data object', app.content.movies);

			Transparency.render(document.getElementById('movies'), app.content.movies, app.config.directives);
			Transparency.render(document.getElementById('movie'), app.content.movieTitle, app.config.directives);

			localStorage.setItem('films', text);
		},
        
        moviesByGenre:function(genre){
            app.hideAllSections();
            document.getElementById('movies').classList.add('active');
            
            var movies = app.content.movies;
            
            var filteredMovies = _.filter(movies, function(movie){
                for(var i=0; i<movie.genres.length; i++){
                    if(movie.genres[i] == genre) return true;
                }
                return false;
            });
            
            Transparency.render(document.getElementById('movies'), filteredMovies, app.config.directives);
        },
        
        movieDetail: function(id){
            app.hideAllSections();
            
            var movies = app.content.movies;
            
            id = parseInt(id);
            
            var movie = _.findWhere(movies, {id: id});
            console.log(movie);
            document.getElementById('detail').classList.add('active');
            Transparency.render(document.getElementById('detail'), movie, app.config.directives);
        },

		toggle: function(section) {
			if (section == "about") {
				app.hideAllSections();
				document.querySelector('#about').classList.add('active');
			} 
			else if (section == "movies") {
				app.hideAllSections();
				document.querySelector('#movies').classList.add('active');
			}
			
			else{
				app.hideAllSections();
				document.querySelector('#about').classList.add('active');
			}
		}

	}
    
	app.gesture = {
		init: function() {
			app.gesture.genreFilter();
		}, 
		
		genreFilter:function(){
			var movieSection = document.getElementsByClassName('genre-filter')[0];

			// create a simple instance
			// by default, it only adds horizontal recognizers
			var mc = new Hammer(movieSection);
			
			var panFilter = document.getElementById('pan-filter');
			
			document.getElementById('pan-filter').classList.add('panRight');
			
			mc.on("panleft", function(ev){
				panFilter.classList.add('panLeft');
				panFilter.classList.remove('panRight');
			});
			
			mc.on("panright", function(ev){
				panFilter.classList.remove('panLeft');
				panFilter.classList.add('panRight');
			});
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
		  	},
            reviews: {
                text: function(){                       
                    if(isNaN(this.reviews)){
                        return 'No reviewscore available';
                    } else {
                        return this.reviews;
                    }
                }
            },
            readMore:{
                href: function(params) {
                    return '#movies/' + this.id;
                }
            },
			
			genres:{
				genre:{
					href:function(){
						return "#movies/genre/" + this.value;
					},
					text: function(){
						return this.value;
					}
				}
			},
			
            actors:{
                url_profile: {
                    href: function(params) {
                        return this.url_profile;
                    }
                },
                
                url_character:{
                    href:function(params) {
                        return this.url_character;
                    }                        
                },
                url_photo: {
			        src: function(params) {
			      	  return this.url_photo;
			        }
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

var image = document.createElement('img');
image.setAttribute('src', 'static/images/ajax-loader.gif');
document.getElementsByTagName('body')[0].appendChild(image);

setTimeout(
	function(){
		image.parentNode.removeChild(image);
		app.controller.init();
	}, 10);

//app.controller.init();