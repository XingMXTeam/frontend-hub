class Calculator {
    constructor() {
        this.VAT = 22;
    }
    sum(items) {
        const items$ = Rx.Observable.from(items);
        const total$ = items$.map(value => value + (value * this.VAT / 100))
            .reduce((acc, value) => acc + value);
        return total$;
    }
}
class Receipt {
    constructor(calculator) {
        this.calc = calculator;
    }
    print(...items) {
        const total$ = this.calc.sum(items);
        total$.subscribe(total => console.log(`total receipt £${total.toFixed(2)}`));
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
