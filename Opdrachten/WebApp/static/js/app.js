// NameSpace of Module pattern
var app = app || {};

//Self Invoking Anonymous Function
(function(){

	app.controller = {
		init:function(){
			app.working.init();
		}
	}

	app.working = {
		init:function(){
			app.working.desk();
			app.working.chair();
		},

		desk:function(){
			console.log("start working at desk");
		},

		chair:function(){
			console.log("start working at chair");
		}
	}

})();

app.controller.init();
app.working.desk();