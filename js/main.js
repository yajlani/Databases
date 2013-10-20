var webworksreadyFired = false,
				darkColoring = false,
				darkScreenColor = 'black';

			window.addEventListener('load',function() {
				
				createDB();
				getMovie();
				
				
				document.addEventListener('webworksready', function(e) {

					if (webworksreadyFired) return;
					webworksreadyFired = true;

					var config;

					if (darkColoring) {
						config = {controlsDark: true,
								listsDark: true};
					} else {
						config = {controlsDark: false,
								listsDark: false,
								coloredTitleBar: true};
					}

					config.onscreenready = function(element, id) {
												if (darkColoring) {
													var screen = element.querySelector('[data-bb-type=screen]');
													if (screen) {
														screen.style['background-color'] = darkScreenColor;
													}
												}
											};
					config.ondomready = function(element, id, params) {
												if (id == 'dataOnTheFly') {
													dataOnTheFly_initialLoad(element);
												} 
											};
					bb.init(config);
					bb.pushScreen('results.htm', 'results');
				}, false);

				if (navigator.userAgent.indexOf('BB10') < 0) {
					var evt = document.createEvent('Events');
					evt.initEvent('webworksready', true, true);
					document.dispatchEvent(evt);
				}
			}, false);
			
			
// encapsulate a global variable into a container so that we can access the database
moviesdb = {};
// create a database called movie database, with a version of 1.0, a display title of 'Offline Movie Information', and a size of 5GB
moviesdb.db = window.openDatabase('movie database', '1.0', 'Offline Movie Information', 5*1024*1024);
var movie_name = "";
var movie_rev = "";

// createDB will store the information
function createDB() {
	var db = moviesdb.db;
	db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS Movies(ID INTEGER PRIMARY KEY ASC, name TEXT, review TEXT, added_on DATETIME)", 
        	[], 
			
        	function(trans, result) {
           // handle  the success
            	console.log("Table created!");
        	}, 
			
        	function(trans, error) {
            // handle the error
            	console.log("Table creation error: " + error);
        	}
		);
	});
		
}

// addMovie will instert adta into the table
function addMovie(movie_name, movie_rev) {
	
	
	var db = moviesdb.db;
	
	db.transaction(function(tx) {
    	   var addedOn = new Date();
     	   tx.executeSql("INSERT INTO Movies(name, review, added_on) VALUES (?, ?, ?) ",
      	      [movie_name, movie_rev, addedOn],
      	      function(trans, result) {
        	        // handle the success
            	    console.log("Movie added: " + movie_name + movie_rev);
            	}, 
            	function(trans, error) {
                 // handle the error
                	 console.log("Error adding " + movie_name + movie_rev + ": " + error);
    	        }
			);
	});
}

// addNewMovie will add a movie to the results page when "add" the button is clicked on the add page
function addNewMovie(){
				var movieName = document.getElementById("inputMovie").value;
				var movieReview = document.getElementById("inputReview").value;
				console.log (movieName + " " + movieReview);
		
		addMovie(movieName, movieReview);
		
	}


//getMovie will get the data out of the table
function getMovie() {
	var db = moviesdb.db;
	var ul = document.createElement("ul");
	
	db.transaction(function(tx) {
        	tx.executeSql("SELECT * FROM Movies",
        	[],
        	function(trans, result) {
            	var movies = "";
				var reviews = "";
			 
            	for(var i=0; i < result.rows.length; i++) {
                	movies = result.rows.item(i).name + " - " + result.rows.item(i).review;
		      		//reviews = result.rows.item(i).review + " ";
				
					var li = document.createElement("li");
					var txt = document.createTextNode(movies);
					
					//var li2 = document.createElement("li");
					//var txt2 = document.createTextNode(reviews);
					
					li.appendChild(txt);
					//li2.appendChild(txt2);
					
					ul.appendChild(li);
					//ul.appendChild(li2);
				}
				
				
				if(document.getElementById("outputDiv"))
				{
					//console.log("WIN");
					var output = document.getElementById("outputDiv");
					output.appendChild(ul);
					//document.body.appendChild(ul);
				}
				

			},
			function(trans, error) {
           		console.log("test2");
				// handle the error
				
        	}
		);
    });
}


