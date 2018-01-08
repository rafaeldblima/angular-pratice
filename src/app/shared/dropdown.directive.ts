import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  constructor(private renderer: Renderer2, private elRef: ElementRef) {}
  @HostListener('click') onClick() {
    if (!this.elRef.nativeElement.classList.contains('open')) {
      this.renderer.addClass(this.elRef.nativeElement, 'open');
    } else {
     this.renderer.removeClass(this.elRef.nativeElement, 'open');
    }
  }
  /*
  * @HostBinding('class.open') isOpen = false;
  * @HostListener('click') toggleMenu(){
  * this.isOpen = !this.isOpen;
  * }*/
}
