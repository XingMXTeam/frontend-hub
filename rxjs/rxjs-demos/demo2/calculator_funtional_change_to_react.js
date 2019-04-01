class Calculator {
    getTotal(...items) {
        const items$ = Rx.Observable.from(items);
        const total$ = items$.map(::this.addVAT).reduce(this.sumElements);
        return total$;
    }
    addVAT(itemValue) {
        return itemValue + this.calculateVAT(itemValue);
    }
    calculateVAT(value) {
        const VAT = 22;
        return value * VAT / 100;
    }
    sumElements(accumulator, value) {
        return accumulator + value
    }
}

class Receipt {
    print(total$) {
        total$.subscribe(total => console.log(`total receipt £${total.toFixed(2)}`));
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
