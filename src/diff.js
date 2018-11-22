import { VDom, isVDom } from "./vdom";
import { create, remove, append, replace, root } from "./dom";
export { h, isVDom } from "./vdom";

/**
 * Master is the mark to store the previous state
 * and if the node is controlled by one or more components
 */
export let MASTER = "__master__";
/**
 * Each time a component is removed from the dom,
 * the property is marked as true
 */
export let REMOVE = "__remove__";

export let LISTENER = "__listeners__";
/**
 * Special properties of virtual dom,
 * these are ignored from the diffProps process,
 * since it is part of the component's life cycle
 */
export let IGNORE = [
    "children",
    "create",
    "created",
    "remove",
    "removed",
    "update",
    /**
     * It is executed once sent to the diff process to the succesors
     */
    "updated",
    /**
     * Create a new context for successors
     */
    "context",
    /**
     * Defines the initial state for a component
     */
    "state",
    /**
     * It allows to avoid the execution of the
     * component the same type of label that
     * its predecessor is conserved
     */
    "static"
];
/**
 * It allows to print the status of virtual dom on the planned configuration
 * @param {VDom} next - the next state of the node
 * @param {HTMLElement} parent - the container of the node
 * @param {HTMLElement} [child]  - the ancestor of the node
 * @param {Object} [context] - the context of the node
 * @param {boolean} [isSvg] - check if the node belongs to a svg unit, to control it as such
 * @returns {HTMLElement} - The current node
 */
export function render(next, parent, child, context, isSvg) {
    return diff(parent, child, next, context, isSvg);
}
/**
 * Gets the node's status mark
 * @param {HTMLElement} [base]
 * @return {object} - returns an object since the property associated
 *                    with the master in the whole diff is decomposed
 */
export function getMaster(base) {
    return (base && base[MASTER]) || {};
}

export function defer(handler) {
    requestAnimationFrame(handler);
    //setTimeout(handler, 8.33);
}
/**
 *
 * @param {Function} component  - Function that controls the node
 * @param {*} [currentState] - The initial state of the component
 * @param {Boolean} [isSvg] - Create components for a group of svg
 * @return {HTMLElement} - Returns the current component node
 */
export function Component(tag, state, isSvg, deep, key, components) {
    this.tag = tag;
    this.state = state;
    this.context = {};
    this.prevent = false;
    this.render = (parent, base) => {
        let set = state => {
                this.state = state;
                if (!base[REMOVE] && !this.prevent) {
                    this.prevent = true;
                    defer(() => {
                        this.render(parent, base);
                        this.prevent = false;
                    });
                }
            },
            get = () => this.state;
        return (base = diff(
            parent,
            base,
            this.tag(this.props, { set, get }, this.context),
            this.context,
            isSvg,
            deep + 1,
            key + 1,
            components
        ));
    };
}
/**
 * It allows to print the status of virtual dom on the planned configuration
 * @param {HTMLElement} parent - the container of the node
 * @param {HTMLElement} [node]  - the ancestor of the node
 * @param {VDom} next - the next state of the node
 * @param {Object} [context] - the context of the node
 * @param {boolean} [isSvg] - check if the node belongs to a svg unit, to control it as such
 * @returns {HTMLElement} - The current node
 */

export function diff(
    parent,
    node,
    next,
    context = {},
    isSvg,
    deep = 0,
    currentKey = 0,
    currentComponents = {}
) {
    next = isVDom(next) ? next : new VDom("", {}, [next || ""]);

    let base = node,
        { prev = new VDom(), components = currentComponents } = getMaster(base),
        component,
        isCreate,
        addContext = next.props.context;

    context = addContext ? { ...context, ...addContext } : context;

    isSvg = next.tag === "svg" || isSvg;
    if (prev === next || (prev.tag && next.tag && next.props.static))
        return base;

    if (components[currentKey] && components[currentKey].tag !== next.tag) {
        delete components[currentKey];
    }

    if (typeof next.tag === "function") {
        if ((components[currentKey] || {}).tag !== next.tag) {
            components[currentKey] = new Component(
                next.tag,
                next.props.state,
                isSvg,
                deep,
                currentKey,
                components
            );
        }
        component = components[currentKey];
        next = next.clone(prev.tag || (isSvg ? "g" : ""));
    }

    let children = next.props.children;

    if (next.tag !== prev.tag) {
        base = create(next.tag, isSvg);
        if (node) {
            if (!component && next.tag !== "") {
                let length = children.length;
                while (node.firstChild) {
                    if (!length--) break;
                    append(base, node.firstChild);
                }
            }
            replace(parent, base, node);
            if (!component) emitRemove(node);
        } else {
            append(parent, base);
        }
        isCreate = true;
        next.emit("create", base);
    }
    if (component) {
        component.props = next.props;
        component.context = context;
        if (deep && component.prevent) {
            return base;
        }
        return component.render(parent, base);
    } else if (!next.tag) {
        if (prev.props.children[0] !== next.props.children[0]) {
            base.textContent = String(next.props.children[0]);
        }
    } else {
        if (
            isCreate ||
            next.emit("update", base, prev.props, next.props) !== false
        ) {
            diffProps(
                base,
                next.tag === prev.tag ? prev.props : {},
                next.props,
                isSvg
            );
            deep++;
            let childNodes = Array.from(root(base).childNodes),
                length = Math.max(childNodes.length, children.length);
            for (let i = 0; i < length; i++) {
                if (children[i]) {
                    diff(
                        base,
                        childNodes[i],
                        children[i],
                        context,
                        isSvg,
                        deep
                    );
                } else {
                    if (childNodes[i]) {
                        emitRemove(childNodes[i]);
                        remove(base, childNodes[i]);
                    }
                }
            }
        }
    }
    base[MASTER] = {
        prev: next,
        components
    };

    next.emit(isCreate ? "created" : "updated", base);

    return base;
}
/**
 * Update or delete the attributes and events of a node
 * @param {HTMLElement} node - Node to assign changes
 * @param {Object} prev - Previous status of attributes
 * @param {Object} next - next status of attributes
 * @param {Boolean} [isSvg] - If it belongs to svg tree
 */
export function diffProps(node, prev, next, isSvg) {
    let prevKeys = Object.keys(prev),
        nextKeys = Object.keys(next).filter(
            key => prevKeys.indexOf(key) === -1
        ),
        keys = prevKeys.concat(nextKeys);

    for (let i = 0; i < keys.length; i++) {
        let prop = keys[i];

        if (IGNORE.indexOf(prop) > -1 || prev[prop] === next[prop]) continue;

        let isFnPrev = typeof prev[prop] === "function",
            isFnNext = typeof next[prop] === "function";
        if (isFnPrev || isFnNext) {
            if (!isFnNext && isFnPrev) {
                node.removeEventListener(prop, node[LISTENER][prop][0]);
            }
            if (isFnNext) {
                if (!isFnPrev) {
                    node[LISTENER] = node[LISTENER] || {};
                    if (!node[LISTENER][prop]) {
                        node[LISTENER][prop] = [
                            event => {
                                node[LISTENER][prop][1](event);
                            }
                        ];
                    }
                    node.addEventListener(prop, node[LISTENER][prop][0]);
                }
                node[LISTENER][prop][1] = next[prop];
            }
        } else if (prop in next) {
            if ((prop in node && !isSvg) || (isSvg && prop === "style")) {
                if (prop === "style") {
                    if (typeof next[prop] === "object") {
                        let prevStyle = prev[prop] || {},
                            nextStyle = next[prop];
                        for (let prop in nextStyle) {
                            if (prevStyle[prop] !== nextStyle[prop]) {
                                if (prop[0] === "-") {
                                    node.setProperty(prop, nextStyle[prop]);
                                } else {
                                    node.style[prop] = nextStyle[prop];
                                }
                            }
                        }
                        // next[prop] = { ...prevStyle, ...nextStyle };
                    } else {
                        node.style.cssText = next[prop];
                    }
                } else {
                    node[prop] = next[prop];
                }
            } else {
                isSvg
                    ? node.setAttributeNS(null, prop, next[prop])
                    : node.setAttribute(prop, next[prop]);
            }
        } else {
            node.removeAttribute(prop);
        }
    }
}
/**
 * Issues the deletion of node and its children
 * @param {HTMLElement} base
 */
export function emitRemove(base) {
    let { prev = new VDom() } = getMaster(base),
        children = base.childNodes;
    base[REMOVE] = true;
    prev.emit("remove", base);
    for (let i = 0; i < children.length; i++) {
        emitRemove(children[i]);
    }
    prev.emit("removed", base);
}
