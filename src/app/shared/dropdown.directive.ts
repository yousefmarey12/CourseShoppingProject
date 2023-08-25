import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener("click") toggleOpenClass() {
    if (!this.el.nativeElement.classList.contains("open")) {
      this.renderer.addClass(this.el.nativeElement, "open") 
  }
  else {
    this.renderer.removeClass(this.el.nativeElement, "open")
  }

}

}
