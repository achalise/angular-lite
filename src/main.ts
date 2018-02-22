import { AppModule } from './core/app.config';
import { bootstrap } from './core/dom-compiler';

bootstrap(new AppModule()); // use singleton here