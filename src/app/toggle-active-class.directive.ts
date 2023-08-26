import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { ShoppingList } from './services/shoppinglist.service';
import { Ingredient } from './shared/ingredient.model';


@Directive({
  selector: '[appToggleActiveClass]'
})
export class ToggleActiveClassDirective implements OnInit  {
  constructor(private el: ElementRef, private renderer: Renderer2, private shoppingService: ShoppingList,
    private rendererFactory: RendererFactory2) { }
  ngOnInit(): void {
    this.Renderer = this.rendererFactory.createRenderer(null, null);
  }
    private Renderer: Renderer2

  @HostListener("click") toggleOpenClass() {
    if (!this.el.nativeElement.classList.contains("active")) {
      this.renderer.addClass(this.el.nativeElement, "active")
      
  }
  else {
    this.renderer.removeClass(this.el.nativeElement, "active")
  }
}



deleteItem() {
  // We call this method so that any anchor tag that has a class of 'active' gets removed
  if (this.el.nativeElement.classList.contains("active")) {
    let element = this.el.nativeElement;
    let parent = this.renderer.parentNode(element);
    this.Renderer.removeChild(parent, element)  }
}

checkIfAnyActive(): boolean {
    return this.el.nativeElement.classList.contains('active')
}
}