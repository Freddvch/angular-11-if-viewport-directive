import { IConfig, SizesEnum } from '../models';
import { animationFrameScheduler, fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, observeOn, shareReplay, startWith } from 'rxjs/operators';

function _window(): any {
  return window;
}

const DEBOUNCE_TIME = 100;

const getViewPortSize = (config: IConfig) => () => {
  const nativeWindow = _window();

  if (nativeWindow.innerWidth < config.medium) {
    return SizesEnum.small;
  }

  if (nativeWindow.innerWidth < config.large) {
    return SizesEnum.medium;
  }

  return SizesEnum.large;
};


export const resizesAsObservable = (config: IConfig): Observable<SizesEnum> => {
  const getViewportSize = getViewPortSize(config);
  const initValue = getViewportSize();

  return fromEvent(_window(), 'resize')
    .pipe(
      observeOn(animationFrameScheduler),
      startWith({ initValue }),
      debounceTime(DEBOUNCE_TIME),
      map(getViewPortSize(config)),
      distinctUntilChanged(),
      shareReplay()
    );
};
