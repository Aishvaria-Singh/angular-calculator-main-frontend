import { STATE } from './design.states';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorFunctionsService{
  // Logic Variables
  firstValue: number = 0;
  operator: string = ''
  allValues: string = '';
  public get getAllValues(): string {
    return this.allValues;
  }

  public get getOperator(): string {
    return this.operator;
  }

  public get getFirstValue(): number {
    return this.firstValue;
  }

  // Design Variables
  state: string[] = STATE;
  option: number = 1;
  currentOption: string = this.state[0];

  public get getOption(): number {
    return this.option;
  }

  public get getCurrentOption(): string {
    return this.currentOption;
  }

  changeUI() {
    this.option++;
    this.option = this.option > 3 ? 1 : this.option;
    this.currentOption = this.state[this.option - 1];
  }


  handleKeyboardEvent(key) {
    switch (key) {
      case 'Enter':
        key = '=';
        break;
      case 'Backspace':
        key = 'DEL';
        break;
      case 'Escape':
        key = 'RESET';
        break;
      case '*':
        key = 'x';
        break;
      default:
        break;
    }
    this.analyzeKey(key);
  }

  analyzeKey(key) {
    switch (key) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.allValues += key;
        break;
      case '.':
        if (this.allValues.length <= 0) {
          this.allValues += '0.'
        }
        if (!this.allValues.includes('.')) {
          this.allValues += key;
        }
        break;
      case '+':
      case '-':
      case 'x':
      case '/':
        if(this.operator){
          if(key === '-'){
            if(this.allValues[0]!== '-'){
              this.allValues = '-'+this.allValues;
              break;
            }
          }
        }
        if (!this.operator) {
          this.firstValue = +this.allValues;
          this.allValues = '';
          this.operator = key;
        } else {
          if (this.allValues && this.allValues !== '-') {
            this.firstValue = this.compute();
            this.allValues = '';
          }
          this.operator = key;
        }
        break;
      case '=':
        if (this.firstValue && this.allValues && this.allValues !== '-') {
          this.allValues = String(this.compute());
          this.operator = '';
          this.firstValue = 0;
        }
        break;
      case 'DEL':
        if (this.allValues) {
          this.allValues = this.allValues.slice(0, this.allValues.length - 1);
        }
        break;
      case 'RESET':
        this.allValues = '';
        this.operator = '';
        this.firstValue = 0;
        break;
      default:
        break;
    }
    this.allValues = this.lengthChecker();
  }

  lengthChecker() {
    if (this.allValues.length > 15) {
      return this.allValues.slice(0, 15);
    }
    return this.allValues;
  }

  compute() {
    let ans: number;
    switch (this.operator) {
      case '+':
        ans = (this.firstValue + +this.allValues);
        break;
      case '-':
        ans = (this.firstValue - +this.allValues);
        break;
      case 'x':
        ans = (this.firstValue * +this.allValues);
        break;
      case '/':
        ans = (this.firstValue / +this.allValues);
      default:
        break;
    }
    return Math.round(ans * 1000000000000) / 1000000000000;
  }
}