var RandGenerator = function(){
	this.model_path = './modules/random_generator/model.json'
	this.model = {};
	this.randomInt = (min, max) => {
		var rand = min + Math.random() * (max - min)
		rand = Math.round(rand);
		return rand;
	}

	this.load_model = () => {
		$.get(this.model_path, (res)=>{
			console.log(res)
			this.model = res;
		})
	}

	this.init = () => {
		this.load_model();
	}
	this.init();
} 