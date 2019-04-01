// 命令行方式
class Caculator {
	constructor() {
		this.VAT = 22;
	}
	sum(...items) {
		let total = 0;
		let i = 0;
		for(i; i<items.length; i++) {
			total = total + items[i];
			total = total + items[i] * this.VAT / 100;
		}
		return total;
	}
}

class Receipt {
	constructor(caculator) {
		this.calc = calculator;
	}
	print(...items) {
		let total = this.calc.sum(...items);
		console.log(`total receipt ${total.toFixed(2)}`);
	}
}

const JEANS = 80.00;
const SHIRT = 35.00;
const SHOES = 90.00;
const COAT = 140.00;
const HAT = 29.00;
const calc = new Calculator();
const receipt = new Receipt(calc);
receipt.print(JEANS, SHIRT, SHOES, COAT, HAT); 