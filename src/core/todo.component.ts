import { ComponentConfig } from './app.config';

export class TodoComponent {

    static config = (): ComponentConfig => {
        return {
            name: 'todoComponent',
            tag: `todo-component`,
            template: `
                    <input type='text' name='item' value='' placeholder="Enter an item"> 
                    <button type="button" value="Add" ng-click="add(value)">Add</button>
                    <ul>
                        <li forEach="item in items">{{item}} <button type="button" value='delete' ng-click="delete(index)">Delete</button></li>
                    </ul>
                    `
        };
    };
    items: string[] = [];
    value: string = '';

    click() {
        console.log(`The todo component value = ${this.value}`);
        this.items.push();
    }

    add(val: string) {
        console.log(`The todo component value = ${this.value}`);
        this.items.push(val);
        console.log(`Current intems `, this.items);
    }

    delete(index: number) {
        this.items.splice(index, 1);
    }
}
