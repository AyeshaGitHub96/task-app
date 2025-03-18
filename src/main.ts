import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations as angularProvideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [...(appConfig.providers || []), provideAnimations()]
}).catch((err) => console.error(err));

function provideAnimations(): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  return angularProvideAnimations();
}

