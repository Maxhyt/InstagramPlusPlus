// ==UserScript==
// @name         Instagram++
// @namespace    maxhyt.instagrampp
// @version      2.2.1
// @description  Instagram++ Help Tools
// @author       Maxhyt
// @homepage     https://maxhyt.github.io/InstagramPlusPlus/
// @homepageURL  https://maxhyt.github.io/InstagramPlusPlus/
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

    var curHour = Math.round(new Date().getTime()/3600000);
  	var lastFetch = -2;
//END SETUP
  (async function() {
    if (typeof gm.getValue("lastFetch") === "undefined")
    {
        gm.setValue("lastFetch", 0);
    }
    else
    {
		let i = await gm.getValue("lastFetch", -1);
        if (i === -1)
        {
          	gm.setValue("lastFetch", 0);
        }
    }

    lastFetch = await gm.getValue("lastFetch");
    var r = await gm.getValue("storyJS");

    gm.registerMenuCommand("IG++ Fetch story script", function() { gm.setValue("lastFetch", 0); location.href=location.href; });

    if (lastFetch < (curHour - 6))
    {
        alert("IG++: IG Story script outdated. Click on any stories to generate a new one!");
        setTimeout(function()
        {
            var storyPanel = jQuery("._c6cph")[0];
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
                                    r = msg.replaceAll(/,\w\.props\.onNext\(\"automatic_forward\"\)/, "").replaceAll("isEnded: !0","isEnded: !1");
                                    gm.setValue("storyJS", r);
                                    gm.setValue("lastFetch", curHour);
                                    if(confirm("I need to refresh this page so the new script can work. Do you want me to refresh?"))
                                    {
                                        window.location.href = "https://www.instagram.com";
                                        throw "Updated!";
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
            if (lastFetch >= (curHour - 6))
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
            var storyMenu = jQuery("._i38s9")[0];
            if (typeof storyMenu !== "undefined" && storyMenu.innerHTML.indexOf("Download") === -1 && window.location.href.indexOf("stories") !== -1)
            {
                var stPicLink = jQuery("._ntjhp._ro0gg")[0];
                var stVidLink = jQuery("._ntjhp._6kyf0")[0];

                if (typeof stPicLink !== "undefined")
                    storyMenu.innerHTML += "<a class=\"_c92w7\" href=\"" + stPicLink.src + "\" download target=\"_blank\" tabindex=\"1\">Download</a>";
                else if (typeof stVidLink !== "undefined")
                    storyMenu.innerHTML += "<a class=\"_c92w7\" href=\"" + stVidLink.getElementsByTagName("source")[0].src + "\" download target=\"_blank\" tabindex=\"1\">Download</a>";
                else
                    storyMenu.innerHTML += "<a class=\"_c92w7\" onclick=\"alert('Error: Could not get link');\" class=\"_h74gn\" tabindex=\"1\">Download</a>";
                storyMenu.innerHTML += "<a class=\"_c92w7\" target=\"_blank\" href=\"https://maxhyt.github.io/InstagramPlusPlus\" tabindex=\"2\">IG++ Guide</a>";
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
})();
