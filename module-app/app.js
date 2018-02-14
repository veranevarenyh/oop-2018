var App = function(){
	this.modules = {
		random: new RandGenerator()
	}

	this.spec = {
		start:function(){
			mocha.run();
		}
	}
}

var app = new App();