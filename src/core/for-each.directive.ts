export class ForEachDirective {
    static config = () => {
        return {
            name: 'foreach',
            tag: `forEach`
        }
    };

    parentNode:Element;
    component: any;
    parts: string;
    part: string;
    node: Element;

    link(node: Element, component: any, expression: string) {
        this.node = node;
        this.parentNode = node.parentElement;
        this.component = component;
        let parts: string[] = expression.split('in');
        this.part = parts[0].trim();
        this.parts = parts[1].trim();
    }

    render() {
        let elements = this.component[this.parts];
        while(this.parentNode.firstChild) {
            this.parentNode.removeChild(this.parentNode.firstChild);
        }
        let index = 0;
        elements.forEach((t: any) => {
            console.log(`The item ` + t);
            let node: any = this.node.cloneNode(true);
            console.log(node.innerHTML);
            let text:string = node.innerHTML;
            let interpolate = text.substring(text.indexOf('{{') + 2, text.indexOf('}}'));
            console.log(interpolate);
            text = text.replace('{{' + this.part + '}}', t);
            text = text.replace('index', index++ + '');
            node.innerHTML = text;
            let children: HTMLCollection = node.children;
            console.log(children);
            this.compileChildren(children);

            this.parentNode.appendChild(node);
        });
    }

    private compileChildren(nodes: HTMLCollection) {
        [].forEach.call(nodes, (node:Element) => {
            if (node.tagName === 'BUTTON') {
                console.log('The tag is button');
                let fn = node.getAttribute('ng-click');
                let fnName: string = fn.substring(0, fn.indexOf('('));
                let args: string = fn.substring(fn.indexOf('(') + 1, fn.indexOf(')'));
                node.addEventListener('click', (evt) => {
                    console.log(`The event is `, evt);
                    this.component[ fnName ](args);
                });
            }
        });

    }
}