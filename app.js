const init = () => {

    /**
 * @param {DOMTokenNode} el Element to apply
 * @param {Function} cb Callback Function
 * @see https://gist.github.com/alirezas/c4f9f43e9fe1abba9a4824dd6fc60a55
 * FadeOut polyfill for vanilla JS
*/

    const fadeOut = (el, cb) => {
        el.style.opacity = 1;

        (function fade() {
            if ((el.style.opacity -= .1) < 0) {
                el.style.display = "none";
            } else {
                requestAnimationFrame(fade);
            }
        })();

        typeof cb === 'function' ? cb() : false;
    }

    /**
     * @param {DOMTokenNode} el Element to apply
     * @param {String} display What display property should be applied to the element after fading in. Defaults to Block
     * @param {Function} cb Callback Function
     * @see https://gist.github.com/alirezas/c4f9f43e9fe1abba9a4824dd6fc60a55
     * FadeIn polyfill for vanilla JS
    */

    const fadeIn = (el, display, cb) => {
        el.style.opacity = 0;
        el.style.display = display || 'block';

        (function fade() {
            var val = parseFloat(el.style.opacity);
            if (!((val += .075) > 1)) {
                el.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();

        typeof cb === 'function' ? cb() : false;
    }

    /**
     * @method fetchResults
     * @param {String} url | URL to fetch
     * @param {String} actionName | WP action name
     * @param {Object} body | POST body if exists
     * @description Fetch helper for wordpress
    */

    const fetchResults = (url, body) => {

        const config = {
            method: typeof body === undefined || null ? 'GET' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            credentials: 'same-origin'
        }

        if (body) {
            config.body = JSON.stringify(body)
        }

        let request = fetch(`${url}/images`, config)

        return request;
    }


    /**
     * 
     * @method getFormData
     * @param {String} formElem | Form Element to get data
     * @returns {Obj} | Form data Object
     * @description returns each form node as a key:value pair json object
    */

    const getFormData = (formElem) => {

        var form;

        if (typeof formElem === 'string') {
            form = document.querySelector(formElem);
        } else {
            form = formElem;
        }

        let formdata = new FormData(form);
        let data = {};

        for (var pair of formdata.entries()) {
            data[pair[0]] = pair[1];
        }

        return data;
    }

    const showOverlay = () => {
        fadeIn(document.querySelector('.ajax-overlay'));
    }

    const hideOverlay = () => {
        fadeOut(document.querySelector('.ajax-overlay'));
    }

    const getImages = e => {

        showOverlay();

        e.preventDefault();
        let formData = getFormData('form');
        let request = fetchResults('//localhost:5001', formData);
        let containList = document.querySelector('.image-listing');
        let html = '';

        request.then(response => response.json())
            .then(data => {
                data.forEach(image => {
                    let fileName = /[^/]*$/.exec(image)

                    html +=
                        `
                    <li>
                        <img height="150" width="150" style="object-fit: cover;" src="${image}" />
                        <p>${fileName}</p>
                        <button class="dl-btn">BAIXAR</button>
                    </li>
                `;
                });

                containList.innerHTML = html;

                hideOverlay();
            });

    }

    const randomQuote = () => {
        const quotes = ['1. Accept everything just the way it is.','2. Do not seek pleasure for its own sake.','3. Do not, under any circumstances, depend on a partial feeling.','4. Think lightly of yourself and deeply of the world.','5. Be detached from desire your whole life long.','6. Do not regret what you have done.','7. Never be jealous.','8. Never let yourself be saddened by a separation.','9. Resentment and complaint are appropriate neither for oneself nor others.','10. Do not let yourself be guided by the feeling of lust or love.','11. In all things have no preferences.','12. Be indifferent to where you live.','13. Do not pursue the taste of good food.','14. Do not hold on to possessions you no longer need.','15. Do not act following customary beliefs.','16. Do not collect weapons or practice with weapons beyond what is useful.','17. Do not fear death.','18. Do not seek to possess either goods or fiefs for your old age.','19. Respect Buddha and the gods without counting on their help.','20. You may abandon your own body but you must preserve your honour.','21. Never stray from the way.'];

        const random = Math.floor(Math.random() * quotes.length);
        
        document.querySelector('.quote').innerHTML = `<span>${quotes[random]}</span>`;
    }

    randomQuote();

    let form = document.getElementsByTagName('form')[0];


    form.addEventListener('submit', getImages);

}


window.addEventListener('load', init);
