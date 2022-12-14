const domHandling = () => {

    let input = document.querySelector('input');
    let imgs = document.querySelectorAll('img');
    let bgs = document.querySelectorAll('[style*="background-image');
    let elems = new Set([
        ...imgs,
        ...bgs
    ])

    elems.forEach(el => {
        if (el.nodeName == "IMG") {
            console.log(el.src)
        } else {
            let style = el.currentStyle || window.getComputedStyle(el, false);
            console.log(style.backgroundImage.slice(4, -1).replace(/"/g, ""));
        }
    })

}

module.exports = domHandling;
