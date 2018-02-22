import '../../node_modules/zone.js/dist/zone.js';
import { AppModule } from './app.config';
import { provider } from './provider';


/**
 * Boostraps the app by parsing the DOM and setting up components and directives
 * @param {AppModule} appConfig
 */
export const bootstrap = (appConfig: AppModule) => {
    let components: any[] = appConfig.components;
    let directives: any[] = appConfig.directives;


    let child: Element = document.children[ 0 ];
    console.log(`No of children`, child.childElementCount);

    // Fork a zone with our custom config and run the app in the ZONE!!
    Zone.current.fork({
        name: 'myZone', onInvokeTask : (parentZoneDelegate, currentZone, targetZone, task, applyThis, applyArgs) => {
            console.log('Invoking task ', task);
            parentZoneDelegate.invokeTask(currentZone, task, applyThis, applyArgs);
            console.log('Completed task', task);
            // TODO replace this with global change detection trigger
            render();
        }
    }).run(() => {
        dfs(child, components, directives,null);
        render();
    });

    function render() {
        // let dirs: any =  Object.keys(Provider._cache).map(key => Provider._cache[key]);
        let dirs: any = provider().getExistingDirectives();
        dirs.map((d:any) => d.render && d.render());
    }
};

// Depth first traversal of the DOM nodes to scan for components/ directives and initialise them.
// Only checking the component tags, INPUT and BUTTON tags and forEach directive, assuming INPUT is always textfield and
// BUTTON always has ng-click attribute
function dfs(node: Element, components: any[], directives: any[], currentComponent: any) {
    if (!node) {
        return;
    }
    let component: any = null;
    let names = components.map(d => d.tag);

    if (names.indexOf(node.tagName.toLowerCase()) > -1) {
        let template = components.filter(t => t.tag === node.tagName.toLowerCase())[ 0 ].template;
        node.innerHTML = template;
        component = provider().getComponent(components.filter(c => c.tag === node.tagName.toLowerCase())[0].name);
        currentComponent = component;
    }

    if (node.tagName === 'INPUT') {
        let n = node as HTMLInputElement;
        node.addEventListener('keyup', () => {
            currentComponent.value = n.value;
        });
    }

    if (node.tagName === 'BUTTON') {
        let fn = node.getAttribute('ng-click');
        let fnName: string = fn.substring(0, fn.indexOf('('));
        let args: string = fn.substring(fn.indexOf('(') + 1, fn.indexOf(')'));
        node.addEventListener('click', () => currentComponent[ fnName ](currentComponent[args]));
    }

    let attributes: NamedNodeMap = node.attributes;
    let directivenames: string[] = directives.map(d => d.tag.toLowerCase());
    for (let i = 0; i < attributes.length; i++) {
        let attribute = attributes.item(i);
        if (directivenames.indexOf(attribute.name) > -1) {
            let directive = provider().getComponent(attribute.name);
            directive.link(node, currentComponent, attribute.value);
        }
    }

    let children: HTMLCollection = node.children;
    [].map.apply(children, [ (t: any) => {
        dfs(t, components, directives, currentComponent)
    } ]);
}
