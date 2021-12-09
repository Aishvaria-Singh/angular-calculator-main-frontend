import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appThemeOption]'
})
export class ThemeOptionDirective implements OnChanges {
  @Input('appThemeOption') position: string = 'flex-start'

  @HostBinding('style.justify-content') justifyContent: string;
  constructor() { }

  ngOnChanges(){
    this.justifyContent = this.position;
  }

}
