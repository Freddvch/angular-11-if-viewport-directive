import { Observable } from 'rxjs';
import { Injectable, InjectionToken, Inject } from '@angular/core';
import { SIZES_MATRIX, SizesEnum, IConfig } from './models';
import { resizesAsObservable } from './rxjs-operators/resize-event-as-observable';

export const IF_VIEWPORT_SIZE_CONFIG = new InjectionToken<IConfig>(
  'IF_VIEWPORT_SIZE_CONFIG',
);

@Injectable({
  providedIn: 'root',
})
export class ViewportSizesService {
  private readonly currentSize$: Observable<SizesEnum>;
  private currentSize = SIZES_MATRIX.DEFAULT;

  get size$(): Observable<SizesEnum> {
    return this.currentSize$;
  }
  get sizes(): any {
    return this.currentSize;
  }

  constructor(@Inject(IF_VIEWPORT_SIZE_CONFIG) private config: IConfig) {
    this.currentSize$ = resizesAsObservable(config);
    this.subscriptionToResizeObservable();
  }

  private subscriptionToResizeObservable(): void {
    this.currentSize$.subscribe(size => this.changeSizeHandler(size));
  }
  private changeSizeHandler(size: SizesEnum): void {
    switch (size) {
      case SizesEnum.large:
        this.currentSize = SIZES_MATRIX.LARGE;
        break;

      case SizesEnum.medium:
        this.currentSize = SIZES_MATRIX.MEDIUM;
        break;

      case SizesEnum.small:
        this.currentSize = SIZES_MATRIX.SMALL;
        break;

      default:
        this.currentSize = SIZES_MATRIX.DEFAULT;
    }
  }
}
