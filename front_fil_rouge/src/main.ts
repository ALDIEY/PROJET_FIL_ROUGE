import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { ConnectModule } from "./app/connect/connect.module";

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
