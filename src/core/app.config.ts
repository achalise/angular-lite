import { ForEachDirective } from './for-each.directive';
import { TodoComponent } from './todo.component';

export class AppModule {
    components: ComponentConfig[] = [
        TodoComponent.config()
    ];
    directives: DirectiveConfig[] = [
        ForEachDirective.config()
    ];
}

export interface DirectiveConfig {
    name: string;
    tag: string;
}

export interface ComponentConfig extends DirectiveConfig{
    template: string;
}
