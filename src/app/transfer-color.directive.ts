import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[transferColor]'
})

export class TransferColorDirective {
  @Input('transferColor') tutar: number;

  constructor(private el: ElementRef) { }

  private highlight(color: string) {
    this.el.nativeElement.style.color = color;
  }

  ngOnInit(): void {
    let color = Math.sign(this.tutar) === 1 ? 'green' : 'red'
    this.highlight(color)
  }
}
