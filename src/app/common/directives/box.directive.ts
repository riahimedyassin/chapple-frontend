import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBox]',
  standalone: true,
})
export class BoxDirective {
  constructor(public element: ElementRef, private renderer: Renderer2) {}
  private classLists: string[] =
    'cursor-pointer w-full border-t-[1px] border-gray-500 flex items-center justify-start gap-10 py-2 px-6 hover:bg-deepBlack transition-all'.split(
      ' '
    );
  ngOnInit(): void {
    this.classLists.forEach((item) => {
      this.renderer.addClass(this.element.nativeElement, item);
    });
  }
}
