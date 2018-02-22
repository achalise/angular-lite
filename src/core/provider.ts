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

const _cache: any = {

};

let _provider: Provider;

class Provider {
    index:number = 0;

    constructor(){}
    getComponent(name: string) {
        let component: any = componentFactory[name]();
        _cache[name + this.index++ ] = component;
        return component;
    }

    getExistingDirectives() {
        return Object.keys(_cache).map(key => _cache[key]);
    }
}


export const provider = () => {
  _provider = _provider || new Provider();
  return _provider;
};