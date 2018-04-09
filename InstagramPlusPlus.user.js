// ==UserScript==
// @name         Instagram++
// @namespace    maxhyt.instagrampp
// @version      2.1.1.1
// @description  Instagram++ Help Tools
// @author       Maxhyt
// @homepage     https://maxhyt.github.io/InstagramPlusPlus/
// @match        https://www.instagram.com/*
// @updateURL    https://maxhyt.github.io/InstagramPlusPlus/InstagramPlusPlus.meta.js
// @downloadURL  https://maxhyt.github.io/InstagramPlusPlus/InstagramPlusPlus.user.js
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function () {
//SETUP
    String.prototype.replaceAll = function(target, replacement) {
        return this.split(target).join(replacement);
    };

    const gm = {};
    if (typeof GM_setValue === "function")
        gm.setValue = GM_setValue;
    else
        gm.setValue = GM.setValue;

    if (typeof GM_getValue === "function")
        gm.getValue = GM_getValue;
    else
        gm.getValue = GM.getValue;

    if (typeof GM_registerMenuCommand === 'undefined') {
        gm.registerMenuCommand = (caption, commandFunc, accessKey) => {
            if (!document.body) {
                if (document.readyState === 'loading' && document.documentElement && document.documentElement.localName === 'html') {
                    new MutationObserver((mutations, observer) => {
                        if (document.body) {
                            observer.disconnect();
                            GM_registerMenuCommand(caption, commandFunc, accessKey);
                        }
                    }).observe(document.documentElement, {childList: true});
                } else {
                    console.error('GM_registerMenuCommand got no body.');
                }
                return;
            }
            let contextMenu = document.body.getAttribute('contextmenu');
            let menu = (contextMenu ? document.querySelector('menu#' + contextMenu) : null);
            if (!menu) {
                menu = document.createElement('menu');
                menu.setAttribute('id', 'gm-registered-menu');
                menu.setAttribute('type', 'context');
                document.body.appendChild(menu);
                document.body.setAttribute('contextmenu', 'gm-registered-menu');
            }
            let menuItem = document.createElement('menuitem');
            menuItem.textContent = caption;
            menuItem.addEventListener('click', commandFunc, true);
            menu.appendChild(menuItem);
        };
    }
    else
        gm.registerMenuCommand = GM_registerMenuCommand;
//END SETUP
    gm.registerMenuCommand("IG++ Fetch story script", function() { gm.setValue("lastFetch", 0); location.href=location.href; });

    var r = gm.getValue("storyJS");

    if (gm.getValue("lastFetch") < (Math.round(new Date().getTime()/3600000) - 6))
    {
        alert("IG++: IG Story script outdated. Click on any stories to generate a new one!");
        setTimeout(function()
        {
            var storyPanel = jQuery("._guwow")[0];
            if (typeof storyPanel !== "undefined")
            {
                storyPanel.onclick = function () {
                    setTimeout(function() {
                        var scripts = jQuery("script");
                        for (var i = 0; i < scripts.length; i++)
                        {
                            if (scripts[i].src.indexOf("DesktopStories") !== -1)
                            {
                                var storyLink = scripts[i].src;
                                jQuery.ajax({
                                    method: "POST",
                                    url: storyLink
                                }).done(function(msg) {
                                    r = msg.replaceAll(",o.props.onNext(\"automatic_forward\"),o.setState({isEnded:!0", ",o.setState({isEnded:!1").replaceAll(",o.props.onNext(\"automatic_forward\")","");
                                    gm.setValue("storyJS", r);
                                    gm.setValue("lastFetch", Math.round(new Date().getTime()/60000));
                                    if(confirm("I need to refresh this page so the new script can work. Do you want me to refresh?"))
                                    {
                                        location.href = location.href;
                                        return;
                                    }
                                });
                                break;
                            }
                        }
                    }, 2000);
                };
            }
        }, 1000);
    }

    implement();
    function implement()
    {
        setTimeout(function() {
            if (gm.getValue("lastFetch") >= (Math.round(new Date().getTime()/3600000) - 6))
            {
                var pplus = document.createElement("script");
                pplus.type = "text/javascript";
                pplus.innerHTML = r + " alert(\"IG++: Instagram Stories script overrided!\");";
                jQuery("head")[0].appendChild(pplus);
            }
            else
                implement();
        }, 1000);
    }

    dlButton();
    function dlButton()
    {
        setTimeout(function () {
//Story
            var storyMenu = jQuery("._cepxb")[0];
            if (typeof storyMenu !== "undefined" && storyMenu.innerHTML.indexOf("Download") === -1 && window.location.href.indexOf("stories") !== -1)
            {
                var stPicLink = jQuery("._ntjhp._ro0gg")[0];
                var stVidLink = jQuery("._ntjhp._6kyf0")[0];

                if (typeof stPicLink !== "undefined")
                    storyMenu.innerHTML += "<li class=\"_o2wxh\"><a href=\"" + stPicLink.src + "\" download target=\"_blank\"><button class=\"_h74gn\">Download</button></a></li>";
                else if (typeof stVidLink !== "undefined")
                    storyMenu.innerHTML += "<li class=\"_o2wxh\"><a href=\"" + stVidLink.getElementsByTagName("source")[0].src + "\" download target=\"_blank\"><button class=\"_h74gn\">Download</button></a></li>";
                else
                    storyMenu.innerHTML += "<li class=\"_o2wxh\"><button onclick=\"alert('Error: Could not get link');\" class=\"_h74gn\">Download</button></li>";
                storyMenu.innerHTML += "<li class=\"_o2wxh\"><a target=\"_blank\" href=\"https://maxhyt.github.io/InstagramPlusPlus\"><button class=\"_h74gn\">IG++ Guide</button></a></li>";
            }
//News Feed
            var article = jQuery("article._622au");
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

                var arrowFeed = article[i].getElementsByClassName("_5wmqs")[0];
                if (typeof arrowFeed !== "undefined")
                {
                    arrowFeed.onclick = function () { reset(); };
                }

                var arrowArticleLeft = article[i].getElementsByClassName("coreSpriteLeftChevron")[0];
                if (typeof arrowArticleLeft !== "undefined")
                {
                    arrowArticleLeft.onclick = function () { reset(); };
                }

                var arrowArticleRight = article[i].getElementsByClassName("coreSpriteRightChevron")[0];
                if (typeof arrowArticleRight !== "undefined")
                {
                    arrowArticleRight.onclick = function () { reset(); };
                }
//Profile
                var arrowSwitchLeft = document.getElementsByClassName("coreSpriteLeftPaginationArrow")[0];
                if (typeof arrowSwitchLeft !== "undefined")
                {
                    arrowSwitchLeft.onclick = function () { setTimeout(reset, 1500); };
                }

                var arrowSwitchRight = document.getElementsByClassName("coreSpriteRightPaginationArrow")[0];
                if (typeof arrowSwitchRight !== "undefined")
                {
                    arrowSwitchRight.onclick = function () { setTimeout(reset, 1500); };
                }

                if (feedMenu.innerHTML.indexOf("Download") === -1)
                    feedMenu.innerHTML += "<a class=\"_l9yih coreDownloadSaveButton\" href=\"" + src + "\" download target=\"_blank\" role=\"button\"><span class=\"_8scx2\" style=\"background-image: url(https://maxhyt.github.io/InstagramPlusPlus/download.png); width: 24px; height: 24px;\">Download</span></a>";
            }
            dlButton();
        }, 500);
    }

    function reset()
    {
        var tmp = jQuery(".coreDownloadSaveButton");
        for (var m = 0; m < tmp.length; m++)
        {
            tmp[m].parentNode.removeChild(tmp[m]);
        }
    }
})();
