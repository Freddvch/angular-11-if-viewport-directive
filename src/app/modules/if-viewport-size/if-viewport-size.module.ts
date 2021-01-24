import { NgModule } from '@angular/core';
import { IfViewportSizeDirective } from './directives/if-viewport-size.directive';

const components = [IfViewportSizeDirective];

@NgModule({
  declarations: [...components],
  exports: [...components]
})
export class IfViewportSizeModule { }
