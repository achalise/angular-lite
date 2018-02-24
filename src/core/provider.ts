import { ForEachDirective } from './for-each.directive';
import { TodoComponent } from './todo.component';

const componentFactory: any = {
    todoComponent: () => {
        return new TodoComponent()
    },
    foreach: () => {
        return new ForEachDirective();
    }
};

class Provider {
    index:number = 0;
     private _cache: any = {

    };

    constructor() {
        console.log(`Created provider`);
    }

    getComponent(name: string) {
        let component: any = componentFactory[name]();
        this._cache[name + this.index++ ] = component;
        return component;
    }

    getExistingDirectives() {
        return Object.keys(this._cache).map(key => this._cache[key]);
    }
}

const provider = () => {
    return new Provider();
};

export const PROVIDER = provider();
