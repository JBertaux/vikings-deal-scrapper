// ==UserScript==
// @name         Mobile Vikings Deals
// @namespace    https://jeromebertaux.be
// @version      0.2
// @description  Diplay deals in partner website
// @author       Jérôme Bertaux
// @match        http*://*/*
// @icon         https://mobilevikings.be/static/img/icons/favicons/safari-pinned-tab.svg
// @updateURL    https://raw.githubusercontent.com/JBertaux/vikings-deal-scrapper/main/deals.user.js
// @downloadURL  https://raw.githubusercontent.com/JBertaux/vikings-deal-scrapper/main/deals.user.js
// ==/UserScript==

(function () {
    'use strict';

    function addBanner(json) {
        if (shouldBannerBeAdded(json)) {
            var banner = document.createElement("div");
            banner.innerHTML = "There is a Viking Deals";
            banner.style.color = 'black';
            banner.style.backgroundColor = 'red';
            banner.style.textAlign = 'center';

            document.body.insertBefore(banner, document.body.childNodes[0]);
        }
    }

    function shouldBannerBeAdded(json) {
        let currentUrl = window.location.href;
        for (let deal of json) {
            if (deal['enabled']) {
                for (let url of deal['urls']) {
                    if (currentUrl.includes(url)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    fetch('https://raw.githubusercontent.com/JBertaux/vikings-deal-scrapper/main/data/data.json')
        .then((response) => response.json())
        .then((json) => addBanner(json));

})();