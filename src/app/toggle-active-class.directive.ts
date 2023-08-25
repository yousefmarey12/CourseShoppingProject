import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ShoppingList } from './services/shoppinglist.service';
import { Ingredient } from './shared/ingredient.model';


@Directive({
  selector: '[appToggleActiveClass]'
})
export class ToggleActiveClassDirective  {
  constructor(private el: ElementRef, private renderer: Renderer2, private shoppingService: ShoppingList) { }

  @HostListener("click") toggleOpenClass() {
    if (!this.el.nativeElement.classList.contains("active")) {
      this.renderer.addClass(this.el.nativeElement, "active")
      
  }
  else {
    this.renderer.removeClass(this.el.nativeElement, "active")
  }
}



deleteIngredients() {
  if (this.el.nativeElement.classList.contains("active")) {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'none')
  }
}

}