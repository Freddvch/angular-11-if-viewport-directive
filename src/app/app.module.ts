import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IfViewportSizeModule } from './modules/if-viewport-size/if-viewport-size.module';
import { IF_VIEWPORT_SIZE_CONFIG } from './modules/if-viewport-size/viewport.service';
import { TestComponent } from './test.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    IfViewportSizeModule,
    BrowserModule
  ],
  providers: [
    {
      provide: IF_VIEWPORT_SIZE_CONFIG,
      useValue: { small: 500, medium: 768, large: 1024 },
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
