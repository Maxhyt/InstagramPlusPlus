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
//Story
            var storyMenu = document.getElementsByClassName("_cepxb")[0];
            if (typeof storyMenu !== "undefined" && storyMenu.innerHTML.indexOf("Download") === -1)
            {
                var stPicLink = document.getElementsByClassName("_ntjhp _ro0gg")[0];
                var stVidLink = document.getElementsByClassName("_ntjhp  _6kyf0")[0];

                if (typeof stPicLink !== "undefined")
                    storyMenu.innerHTML += "<li class=\"_o2wxh\"><a href=\"" + stPicLink.src + "\" download><button class=\"_h74gn\">Download</button></a></li>";
                else if (typeof stVidLink !== "undefined")
                    storyMenu.innerHTML += "<li class=\"_o2wxh\"><a href=\"" + stVidLink.getElementsByTagName("source")[0].src + "\" download><button class=\"_h74gn\">Download</button></a></li>";
                else
                    storyMenu.innerHTML += "<li class=\"_o2wxh\"><button class=\"_h74gn\">Download</button></li>";
                storyMenu.innerHTML += "<li class=\"_o2wxh\"><a target=\"_blank\" href=\"https://maxhyt.github.io/InstagramPlusPlus\"><button class=\"_h74gn\">IG++ Guide</button></a></li>";
            }
//News Feed
            var article = document.getElementsByClassName("_s5vjd _622au _5lms4 _8n9ix");
            for (var i = 0; i < article.length; i++)
            {

                var src;
                var picLink = article[i].getElementsByClassName("_2di5p")[0];
                var vidLink = article[i].getElementsByClassName("_l6uaz")[0];

                if (typeof picLink !== "undefined")
                    src = picLink.src;
                else if (typeof vidLink !== "undefined")
                    src = vidLink.src;

                var feedMenu = article[i].getElementsByClassName("_hmd6j _8oo9w")[0];

                var arrow = article[i].getElementsByClassName("_5wmqs")[0];
                if (typeof arrow !== "undefined")
                    arrow.onclick = function () {
                        var theButton = feedMenu.getElementsByClassName("coreDownloadSaveButton")[0];
                        alert(theButton);
                    };

                if (feedMenu.innerHTML.indexOf("Download") === -1)
                    feedMenu.innerHTML += "<a class=\"_l9yih coreDownloadSaveButton\" href=\"" + src + "\" download role=\"button\"><span class=\"_8scx2\" style=\"background-image: url(https://maxhyt.github.io/InstagramPlusPlus/download.png); width: 24px; height: 24px;\">Download</span></a>";
            }
//TODO: Profile
            dlButton();
        }, 500);
    }
})();
