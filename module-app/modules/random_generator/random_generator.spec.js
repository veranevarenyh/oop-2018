var generator = new RandGenerator();

//проверяем правильно ли работает генератор чисел
describe("Генератор случайных чисел", function() {

  it("генерирует число в диапозоне 20-30", function() {

  	var rand_value = generator.randomInt(20,30)

    assert.equal((rand_value >=20 && rand_value <= 30), true);
  });

  it("генерирует целое число", function() {

  	var rand_value = generator.randomInt(20,30)

    assert.equal((rand_value >=20 && rand_value <= 30), true);
  });

});
