import { Subscription } from 'rxjs';
import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  EmbeddedViewRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { SizesEnum } from '../models';
import { ViewportSizesService } from '../viewport.service';


@Directive({
  selector: '[ifViewportSize]',
})
export class IfViewportSizeDirective implements OnInit, OnDestroy {
  private currentView: EmbeddedViewRef<any>;
  private subscriptionToSizesService: Subscription;
  private size: SizesEnum;

  @Input('ifViewportSize')
  set setSize(size: SizesEnum | undefined) {
    this.size = size;
    this.setSizeHandler();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private viewportSizesService: ViewportSizesService,
  ) {}

  public ngOnInit(): void {
    this.subscriptionToResizeService();
  }

  public ngOnDestroy(): void {
    if (this.subscriptionToSizesService) {
      this.subscriptionToSizesService.unsubscribe();
    }
  }

  private setSizeHandler(): void {
    if (!this.size) {
      this.insertInViewContainer();
      return;
    }

    const result = this.viewportSizesService.sizes[this.size];

    if (result) {
      this.insertInViewContainer();
      return;
    }

    this.clearViewContainer();
  }

  private insertInViewContainer(): void {
    if (this.currentView) {
      this.clearViewContainer();
    }

    this.currentView = this.viewContainerRef.createEmbeddedView(this.templateRef);
  }

  private clearViewContainer(): void {
    if (!this.currentView) {
      return;
    }

    this.currentView.destroy();
    this.currentView = null;
  }

  private subscriptionToResizeService(): void {
    this.subscriptionToSizesService = this.viewportSizesService
      .size$
      .subscribe(() => this.setSizeHandler());
  }
}
