//依赖注入方式
class Calculator {
	sum(a, b) {
		return a + b;
	}
}

class Receipt {
	contructor(calculator) {
		this.calc = calculator;
	}
	print(itemA, itemB) {
		const total = this.calc.sum(itemA, itemB);
		console.log(`total receipt ${total}`);
	}
}

const pizza = 6.00;
const beer = 5.00;
const cal = new Calculator();
const receipt = new Receipt(calc);
receipt.print(pizza, beer);

