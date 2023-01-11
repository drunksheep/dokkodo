export default function headlessDOMHandling (doc : unknown) {

    // @ts-ignore
    let imgs = doc.querySelectorAll('img');
    // @ts-ignore
    let bgs = doc.querySelectorAll('[style*="background-image');
    
    let elems = new Set([
        ...imgs,
        ...bgs
    ]) 

    let results : Array<string> = []; 

    elems.forEach( ( el : HTMLImageElement | HTMLDivElement | any ) => {
        if (el.nodeName == "IMG") {
            results.push(el.src)
        } else {
            // @ts-ignore
            let style = el.currentStyle || window.getComputedStyle(el, false);

            results.push(style.backgroundImage.slice(4, -1).replace(/"/g, ""))
        }
    })

    return results;
}