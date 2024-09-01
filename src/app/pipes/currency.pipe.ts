import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'formatCurrency', standalone: true })
export class CurrencyPipe implements PipeTransform {
    constructor() { }
    transform(value: string | number, ...args: any[]) {
        const _n = parseFloat('' + value);
        return _n.toFixed(2);
    }
}