// ==UserScript==
// @name         Instagram++
// @namespace    maxhyt.instagrampp
// @version      1.2.3
// @description  Instagram++ Help Tools
// @author       Maxhyt
// @homepage     https://maxhyt.github.io/InstagramPlusPlus/
// @match        https://www.instagram.com/
// @run-at       document-end
// @downloadURL  https://maxhyt.github.io/InstagramPlusPlus/InstagramPlusPlus.user.js
// @updateURL    https://maxhyt.github.io/InstagramPlusPlus/InstagramPlusPlus.user.js
// @grant        none
// ==/UserScript==

(function () {
    var pplus = document.createElement("script");
    pplus.type = "text/javascript";
    pplus.src = "https://maxhyt.github.io/InstagramPlusPlus/InstagramStories.js";
    pplus.setAttribute("async", "");
    pplus.setAttribute("charset", "utf-8");
    pplus.crossOrigin = "anonymous";
    document.body.appendChild(pplus);

    var loop = true;

    dlButton();
    function dlButton()
    {
        if (loop)
        setTimeout(function () {
            var menu = document.getElementsByClassName("_cepxb")[0];
            if (typeof menu !== "undefined" && menu.innerHTML.indexOf("Download") === -1)
            {
                var picLink = document.getElementsByClassName("_ntjhp _ro0gg")[0];
                var vidLink = document.getElementsByClassName("_ntjhp  _6kyf0")[0];

                if (typeof picLink !== "undefined")
                    menu.innerHTML += "<li class=\"_o2wxh\"><a href=\"" + picLink.src + "\" download><button class=\"_h74gn\">Download</button></a></li>";
                else if (typeof vidLink !== "undefined")
                    menu.innerHTML += "<li class=\"_o2wxh\"><a href=\"" + vidLink.getElementsByTagName("source")[0].src + "\" download><button class=\"_h74gn\">Download</button></a></li>";
                else
                    menu.innerHTML += "<li class=\"_o2wxh\"><button class=\"_h74gn\">Download</button></li>";
                menu.innerHTML += "<li class=\"_o2wxh\"><a target=\"_blank\" href=\"https://maxhyt.github.io/InstagramPlusPlus\"><button class=\"_h74gn\">Subscribe on first use</button></a></li>";
            }
            dlButton();
        }, 500);
    }
})();
