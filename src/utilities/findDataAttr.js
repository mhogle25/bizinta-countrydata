export function findDataAttr(el, attr) {
    while (el) {
        if (el.dataset && attr in el.dataset)
            return el.dataset[attr];

        el = el.parentNode;
    }
    return null;
}
