// 需要计算每个值，以及最终的和。 不关注如果遍历数组和关注保持数组的状态i
class Calculator {
	getTotal(...item) {
		const total = items.map(::this.addVAT).reduce(this.sumElements);
		return total;
	}
	addVAT(itemValue) {
		return itemValue + this.calculatorVAT(itemValue);
	}
	calculatorVAT(value) {
		const VAT = 22;
		return value * VAT/100;
	}
	sumElements(accumulator, value) {
		return accumulator + value;
	}
}

class Receipt {
	print(total){
		console.log(`total receipt £${total.toFixed(2)}`);
	}
}
const JEANS = 80.00;
const SHIRT = 35.00;
const SHOES = 90.00;
const COAT = 140.00;
const HAT = 29.00;
const calc = new Calculator();
const receipt = new Receipt();
receipt.print(calc.getTotal(JEANS, SHIRT, SHOES, COAT, HAT));

// 另外一个点是：函数作为另一个函数的参数称之为高阶函数。 还有其他的点，比如curry化..
// 