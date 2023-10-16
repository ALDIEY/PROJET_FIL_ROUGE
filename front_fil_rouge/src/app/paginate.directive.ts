import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appSimplePaginator]'
})
export class SimplePaginatorDirective implements OnChanges {
  @Input() items: any[] = [];
  @Input() pageSize: number = 10;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.viewContainer.clear();
    for (let i = 0; i < this.items.length; i += this.pageSize) {
      const slice = this.items.slice(i, i + this.pageSize);
      this.viewContainer.createEmbeddedView(this.templateRef, { $implicit: slice });
    }
  }
}

