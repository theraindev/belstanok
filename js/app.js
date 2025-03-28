(() => {
    "use strict";
    const modules_flsModules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function addLoadedClass() {
        if (!document.documentElement.classList.contains("loading")) window.addEventListener("load", (function() {
            setTimeout((function() {
                document.documentElement.classList.add("loaded");
            }), 0);
        }));
    }
    function functions_getHash() {
        if (location.hash) return location.hash.replace("#", "");
    }
    function setHash(hash) {
        hash = hash ? `#${hash}` : window.location.href.split("#")[0];
        history.pushState("", "", hash);
    }
    let _slideUp = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout((() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout((() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
    };
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function spollers() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            spollersArray.forEach((spollersBlock => {
                if (!spollersBlock.dataset.spollers || spollersBlock.classList.contains("online__content") || spollersBlock.classList.contains("selling__content")) initSpoller(spollersBlock); else {
                    let mdQueriesArray = dataMediaQueries([ spollersBlock ], "spollers");
                    if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                        mdQueriesItem.matchMedia.addEventListener("change", (function() {
                            toggleSpollerByMedia(spollersBlock, mdQueriesItem.matchMedia);
                        }));
                        toggleSpollerByMedia(spollersBlock, mdQueriesItem.matchMedia);
                    }));
                }
            }));
            function initSpoller(spollersBlock) {
                spollersBlock.classList.add("_spoller-init");
                const spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                spollerTitles.forEach((title => {
                    title.nextElementSibling.hidden = !title.classList.contains("_spoller-active");
                }));
                spollersBlock.addEventListener("click", setSpollerAction);
            }
            function toggleSpollerByMedia(spollersBlock, matchMedia) {
                if (matchMedia.matches) initSpoller(spollersBlock); else {
                    spollersBlock.classList.remove("_spoller-init");
                    spollersBlock.querySelectorAll("[data-spoller]").forEach((title => {
                        title.nextElementSibling.hidden = false;
                    }));
                    spollersBlock.removeEventListener("click", setSpollerAction);
                }
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("[data-spoller]")) {
                    const spollerTitle = el.closest("[data-spoller]");
                    const spollersBlock = spollerTitle.closest("[data-spollers]");
                    const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (!spollersBlock.querySelectorAll("._slide").length) {
                        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                        spollerTitle.classList.toggle("_spoller-active");
                        _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                    }
                    e.preventDefault();
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                }
            }
        }
    }
    function tabs() {
        const tabs = document.querySelectorAll("[data-tabs]");
        let tabsActiveHash = [];
        if (tabs.length > 0) {
            const hash = functions_getHash();
            if (hash && hash.startsWith("tab-")) tabsActiveHash = hash.replace("tab-", "").split("-");
            tabs.forEach(((tabsBlock, index) => {
                tabsBlock.classList.add("_tab-init");
                tabsBlock.setAttribute("data-tabs-index", index);
                tabsBlock.addEventListener("click", setTabsAction);
                initTabs(tabsBlock);
            }));
            let mdQueriesArray = dataMediaQueries(tabs, "tabs");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
        }
        function setTitlePosition(tabsMediaArray, matchMedia) {
            tabsMediaArray.forEach((tabsMediaItem => {
                tabsMediaItem = tabsMediaItem.item;
                let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
                let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
                let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
                let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
                tabsTitleItems = Array.from(tabsTitleItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                tabsContentItems = Array.from(tabsContentItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                tabsContentItems.forEach(((tabsContentItem, index) => {
                    if (matchMedia.matches) {
                        tabsContent.append(tabsTitleItems[index]);
                        tabsContent.append(tabsContentItem);
                        tabsMediaItem.classList.add("_tab-spoller");
                    } else {
                        tabsTitles.append(tabsTitleItems[index]);
                        tabsMediaItem.classList.remove("_tab-spoller");
                    }
                }));
            }));
        }
        function initTabs(tabsBlock = null) {
            if (tabsBlock) {
                const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
                const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
                let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
                let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
                if (tabsActiveHashBlock) {
                    const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
                    tabsActiveTitle?.classList.remove("_tab-active");
                }
                if (tabsContent.length) {
                    tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsContent.forEach(((tabsContentItem, index) => {
                        tabsTitles[index].setAttribute("data-tabs-title", "");
                        tabsContentItem.setAttribute("data-tabs-item", "");
                        if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsTitles[index].classList.add("_tab-active");
                        tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
                    }));
                }
            } else {
                const tabsContainers = document.querySelectorAll("[data-tabs]");
                tabsContainers.forEach((container => {
                    const titles = container.querySelectorAll("[data-tabs-title]");
                    const contents = container.querySelectorAll("[data-tabs-item]");
                    if (titles.length > 0 && contents.length > 0) contents[0].hidden = false;
                    titles.forEach(((title, index) => {
                        title.addEventListener("click", (() => {
                            titles.forEach((t => t.classList.remove("_tab-active")));
                            contents.forEach((c => c.hidden = true));
                            title.classList.add("_tab-active");
                            contents[index].hidden = false;
                            contents[index].style.animation = "fadeIn 0.3s ease";
                        }));
                    }));
                }));
            }
        }
        function setTabsStatus(tabsBlock) {
            let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
            let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            function isTabsAnamate(tabsBlock) {
                if (tabsBlock.hasAttribute("data-tabs-animate")) return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
            }
            const tabsBlockAnimate = isTabsAnamate(tabsBlock);
            if (tabsContent.length > 0) {
                const isHash = tabsBlock.hasAttribute("data-tabs-hash");
                tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsContent.forEach(((tabsContentItem, index) => {
                    if (tabsTitles[index].classList.contains("_tab-active")) {
                        if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = false;
                        if (isHash && !tabsContentItem.closest(".popup")) setHash(`tab-${tabsBlockIndex}-${index}`);
                    } else if (tabsBlockAnimate) _slideUp(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = true;
                }));
            }
        }
        function setTabsAction(e) {
            const el = e.target;
            if (el.closest("[data-tabs-title]")) {
                const tabTitle = el.closest("[data-tabs-title]");
                const tabsBlock = tabTitle.closest("[data-tabs]");
                if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
                    let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
                    tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter((item => item.closest("[data-tabs]") === tabsBlock)) : null;
                    tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
                    tabTitle.classList.add("_tab-active");
                    setTabsStatus(tabsBlock);
                }
                e.preventDefault();
            }
        }
    }
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function functions_FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    function uniqArray(array) {
        return array.filter((function(item, index, self) {
            return self.indexOf(item) === index;
        }));
    }
    function dataMediaQueries(array, dataSetValue) {
        const media = Array.from(array).filter((function(item, index, self) {
            if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
        }));
        if (media.length) {
            const breakpointsArray = [];
            media.forEach((item => {
                const params = item.dataset[dataSetValue];
                const breakpoint = {};
                const paramsArray = params.split(",");
                breakpoint.value = paramsArray[0];
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                breakpoint.item = item;
                breakpointsArray.push(breakpoint);
            }));
            let mdQueries = breakpointsArray.map((function(item) {
                return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
            }));
            mdQueries = uniqArray(mdQueries);
            const mdQueriesArray = [];
            if (mdQueries.length) {
                mdQueries.forEach((breakpoint => {
                    const paramsArray = breakpoint.split(",");
                    const mediaBreakpoint = paramsArray[1];
                    const mediaType = paramsArray[2];
                    const matchMedia = window.matchMedia(paramsArray[0]);
                    const itemsArray = breakpointsArray.filter((function(item) {
                        if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                    }));
                    mdQueriesArray.push({
                        itemsArray,
                        matchMedia
                    });
                }));
                return mdQueriesArray;
            }
        }
    }
    document.addEventListener("DOMContentLoaded", (function() {
        const accordionButtons = document.querySelectorAll(".accordion-button");
        accordionButtons.forEach((button => {
            button.addEventListener("click", (function() {
                const content = this.nextElementSibling;
                const icon = this.querySelector(".accordion-icon");
                content.classList.toggle("active");
                button.classList.toggle("active");
                if (content.classList.contains("active")) icon.textContent = "−"; else icon.textContent = "+";
            }));
        }));
    }));
    class Popup {
        constructor(options) {
            let config = {
                logging: true,
                init: true,
                attributeOpenButton: "data-popup",
                attributeCloseButton: "data-close",
                fixElementSelector: "[data-lp]",
                youtubeAttribute: "data-popup-youtube",
                youtubePlaceAttribute: "data-popup-youtube-place",
                setAutoplayYoutube: true,
                classes: {
                    popup: "popup",
                    popupContent: "popup__content",
                    popupActive: "popup_show",
                    bodyActive: "popup-show"
                },
                focusCatch: true,
                closeEsc: true,
                bodyLock: true,
                hashSettings: {
                    location: true,
                    goHash: true
                },
                on: {
                    beforeOpen: function() {},
                    afterOpen: function() {},
                    beforeClose: function() {},
                    afterClose: function() {}
                }
            };
            this.youTubeCode;
            this.isOpen = false;
            this.targetOpen = {
                selector: false,
                element: false
            };
            this.previousOpen = {
                selector: false,
                element: false
            };
            this.lastClosed = {
                selector: false,
                element: false
            };
            this._dataValue = false;
            this.hash = false;
            this._reopen = false;
            this._selectorOpen = false;
            this.lastFocusEl = false;
            this._focusEl = [ "a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])' ];
            this.options = {
                ...config,
                ...options,
                classes: {
                    ...config.classes,
                    ...options?.classes
                },
                hashSettings: {
                    ...config.hashSettings,
                    ...options?.hashSettings
                },
                on: {
                    ...config.on,
                    ...options?.on
                }
            };
            this.bodyLock = false;
            this.options.init ? this.initPopups() : null;
        }
        initPopups() {
            this.popupLogging(`Прокинувся`);
            this.eventsPopup();
        }
        eventsPopup() {
            document.addEventListener("click", function(e) {
                const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
                if (buttonOpen) {
                    e.preventDefault();
                    this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
                    this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
                    if ("error" !== this._dataValue) {
                        if (!this.isOpen) this.lastFocusEl = buttonOpen;
                        this.targetOpen.selector = `${this._dataValue}`;
                        this._selectorOpen = true;
                        this.open();
                        return;
                    } else this.popupLogging(`Йой, не заповнено атрибут у ${buttonOpen.classList}`);
                    return;
                }
                const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
                if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
                    e.preventDefault();
                    this.close();
                    return;
                }
            }.bind(this));
            document.addEventListener("keydown", function(e) {
                if (this.options.closeEsc && 27 == e.which && "Escape" === e.code && this.isOpen) {
                    e.preventDefault();
                    this.close();
                    return;
                }
                if (this.options.focusCatch && 9 == e.which && this.isOpen) {
                    this._focusCatch(e);
                    return;
                }
            }.bind(this));
            if (this.options.hashSettings.goHash) {
                window.addEventListener("hashchange", function() {
                    if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
                }.bind(this));
                window.addEventListener("load", function() {
                    if (window.location.hash) this._openToHash();
                }.bind(this));
            }
        }
        open(selectorValue) {
            if (bodyLockStatus) {
                this.bodyLock = document.documentElement.classList.contains("lock") && !this.isOpen ? true : false;
                if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) {
                    this.targetOpen.selector = selectorValue;
                    this._selectorOpen = true;
                }
                if (this.isOpen) {
                    this._reopen = true;
                    this.close();
                }
                if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
                if (!this._reopen) this.previousActiveElement = document.activeElement;
                this.targetOpen.element = document.querySelector(this.targetOpen.selector);
                if (this.targetOpen.element) {
                    if (this.youTubeCode) {
                        const codeVideo = this.youTubeCode;
                        const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
                        const iframe = document.createElement("iframe");
                        iframe.setAttribute("allowfullscreen", "");
                        const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
                        iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
                        iframe.setAttribute("src", urlVideo);
                        if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
                            this.targetOpen.element.querySelector(".popup__text").setAttribute(`${this.options.youtubePlaceAttribute}`, "");
                        }
                        this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
                    }
                    if (this.options.hashSettings.location) {
                        this._getHash();
                        this._setHash();
                    }
                    this.options.on.beforeOpen(this);
                    document.dispatchEvent(new CustomEvent("beforePopupOpen", {
                        detail: {
                            popup: this
                        }
                    }));
                    this.targetOpen.element.classList.add(this.options.classes.popupActive);
                    document.documentElement.classList.add(this.options.classes.bodyActive);
                    if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
                    this.targetOpen.element.setAttribute("aria-hidden", "false");
                    this.previousOpen.selector = this.targetOpen.selector;
                    this.previousOpen.element = this.targetOpen.element;
                    this._selectorOpen = false;
                    this.isOpen = true;
                    setTimeout((() => {
                        this._focusTrap();
                    }), 50);
                    this.options.on.afterOpen(this);
                    document.dispatchEvent(new CustomEvent("afterPopupOpen", {
                        detail: {
                            popup: this
                        }
                    }));
                    this.popupLogging(`Відкрив попап`);
                } else this.popupLogging(`Йой, такого попапу немає. Перевірте коректність введення. `);
            }
        }
        close(selectorValue) {
            if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) this.previousOpen.selector = selectorValue;
            if (!this.isOpen || !bodyLockStatus) return;
            this.options.on.beforeClose(this);
            document.dispatchEvent(new CustomEvent("beforePopupClose", {
                detail: {
                    popup: this
                }
            }));
            if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
            this.previousOpen.element.classList.remove(this.options.classes.popupActive);
            this.previousOpen.element.setAttribute("aria-hidden", "true");
            if (!this._reopen) {
                document.documentElement.classList.remove(this.options.classes.bodyActive);
                !this.bodyLock ? bodyUnlock() : null;
                this.isOpen = false;
            }
            this._removeHash();
            if (this._selectorOpen) {
                this.lastClosed.selector = this.previousOpen.selector;
                this.lastClosed.element = this.previousOpen.element;
            }
            this.options.on.afterClose(this);
            document.dispatchEvent(new CustomEvent("afterPopupClose", {
                detail: {
                    popup: this
                }
            }));
            setTimeout((() => {
                this._focusTrap();
            }), 50);
            this.popupLogging(`Закрив попап`);
        }
        _getHash() {
            if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
        }
        _openToHash() {
            let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
            const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
            this.youTubeCode = buttons.getAttribute(this.options.youtubeAttribute) ? buttons.getAttribute(this.options.youtubeAttribute) : null;
            if (buttons && classInHash) this.open(classInHash);
        }
        _setHash() {
            history.pushState("", "", this.hash);
        }
        _removeHash() {
            history.pushState("", "", window.location.href.split("#")[0]);
        }
        _focusCatch(e) {
            const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
            const focusArray = Array.prototype.slice.call(focusable);
            const focusedIndex = focusArray.indexOf(document.activeElement);
            if (e.shiftKey && 0 === focusedIndex) {
                focusArray[focusArray.length - 1].focus();
                e.preventDefault();
            }
            if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
                focusArray[0].focus();
                e.preventDefault();
            }
        }
        _focusTrap() {
            const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
            if (!this.isOpen && this.lastFocusEl) this.lastFocusEl.focus(); else focusable[0].focus();
        }
        popupLogging(message) {
            this.options.logging ? functions_FLS(`[Попапос]: ${message}`) : null;
        }
    }
    modules_flsModules.popup = new Popup({});
    function formFieldsInit(options = {
        viewPass: false,
        autoHeight: false
    }) {
        document.body.addEventListener("focusin", (function(e) {
            const targetElement = e.target;
            if ("INPUT" === targetElement.tagName || "TEXTAREA" === targetElement.tagName) {
                if (!targetElement.hasAttribute("data-no-focus-classes")) {
                    targetElement.classList.add("_form-focus");
                    targetElement.parentElement.classList.add("_form-focus");
                }
                formValidate.removeError(targetElement);
                targetElement.hasAttribute("data-validate") ? formValidate.removeError(targetElement) : null;
            }
        }));
        document.body.addEventListener("focusout", (function(e) {
            const targetElement = e.target;
            if ("INPUT" === targetElement.tagName || "TEXTAREA" === targetElement.tagName) {
                if (!targetElement.hasAttribute("data-no-focus-classes")) {
                    targetElement.classList.remove("_form-focus");
                    targetElement.parentElement.classList.remove("_form-focus");
                }
                targetElement.hasAttribute("data-validate") ? formValidate.validateInput(targetElement) : null;
            }
        }));
        if (options.viewPass) document.addEventListener("click", (function(e) {
            let targetElement = e.target;
            if (targetElement.closest('[class*="__viewpass"]')) {
                let inputType = targetElement.classList.contains("_viewpass-active") ? "password" : "text";
                targetElement.parentElement.querySelector("input").setAttribute("type", inputType);
                targetElement.classList.toggle("_viewpass-active");
            }
        }));
        if (options.autoHeight) {
            const textareas = document.querySelectorAll("textarea[data-autoheight]");
            if (textareas.length) {
                textareas.forEach((textarea => {
                    const startHeight = textarea.hasAttribute("data-autoheight-min") ? Number(textarea.dataset.autoheightMin) : Number(textarea.offsetHeight);
                    const maxHeight = textarea.hasAttribute("data-autoheight-max") ? Number(textarea.dataset.autoheightMax) : 1 / 0;
                    setHeight(textarea, Math.min(startHeight, maxHeight));
                    textarea.addEventListener("input", (() => {
                        if (textarea.scrollHeight > startHeight) {
                            textarea.style.height = `auto`;
                            setHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
                        }
                    }));
                }));
                function setHeight(textarea, height) {
                    textarea.style.height = `${height}px`;
                }
            }
        }
    }
    let formValidate = {
        getErrors(form) {
            let error = 0;
            let formRequiredItems = form.querySelectorAll("*[data-required]");
            if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                if ((null !== formRequiredItem.offsetParent || "SELECT" === formRequiredItem.tagName) && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
            }));
            return error;
        },
        validateInput(formRequiredItem) {
            let error = 0;
            if ("email" === formRequiredItem.dataset.required) {
                formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                if (this.emailTest(formRequiredItem)) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
            } else if ("checkbox" === formRequiredItem.type && !formRequiredItem.checked) {
                this.addError(formRequiredItem);
                error++;
            } else if (!formRequiredItem.value.trim()) {
                this.addError(formRequiredItem);
                error++;
            } else this.removeError(formRequiredItem);
            return error;
        },
        addError(formRequiredItem) {
            formRequiredItem.classList.add("_form-error");
            formRequiredItem.parentElement.classList.add("_form-error");
            let inputError = formRequiredItem.parentElement.querySelector(".form__error");
            if (inputError) formRequiredItem.parentElement.removeChild(inputError);
            if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
        },
        removeError(formRequiredItem) {
            formRequiredItem.classList.remove("_form-error");
            formRequiredItem.parentElement.classList.remove("_form-error");
            if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
        },
        formClean(form) {
            form.reset();
            setTimeout((() => {
                let inputs = form.querySelectorAll("input,textarea");
                for (let index = 0; index < inputs.length; index++) {
                    const el = inputs[index];
                    el.parentElement.classList.remove("_form-focus");
                    el.classList.remove("_form-focus");
                    formValidate.removeError(el);
                }
                let checkboxes = form.querySelectorAll(".checkbox__input");
                if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                    const checkbox = checkboxes[index];
                    checkbox.checked = false;
                }
                if (modules_flsModules.select) {
                    let selects = form.querySelectorAll(".select");
                    if (selects.length) for (let index = 0; index < selects.length; index++) {
                        const select = selects[index].querySelector("select");
                        modules_flsModules.select.selectBuild(select);
                    }
                }
            }), 0);
        },
        emailTest(formRequiredItem) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
        }
    };
    function formQuantity() {
        document.addEventListener("click", (function(e) {
            let targetElement = e.target;
            if (targetElement.closest("[data-quantity-plus]") || targetElement.closest("[data-quantity-minus]")) {
                const valueElement = targetElement.closest("[data-quantity]").querySelector("[data-quantity-value]");
                let value = parseInt(valueElement.value);
                if (targetElement.hasAttribute("data-quantity-plus")) {
                    value++;
                    if (+valueElement.dataset.quantityMax && +valueElement.dataset.quantityMax < value) value = valueElement.dataset.quantityMax;
                } else {
                    --value;
                    if (+valueElement.dataset.quantityMin) {
                        if (+valueElement.dataset.quantityMin > value) value = valueElement.dataset.quantityMin;
                    } else if (value < 1) value = 1;
                }
                targetElement.closest("[data-quantity]").querySelector("[data-quantity-value]").value = value;
            }
        }));
    }
    function isObject(obj) {
        return null !== obj && "object" === typeof obj && "constructor" in obj && obj.constructor === Object;
    }
    function extend(target = {}, src = {}) {
        Object.keys(src).forEach((key => {
            if ("undefined" === typeof target[key]) target[key] = src[key]; else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) extend(target[key], src[key]);
        }));
    }
    const ssrDocument = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: {
            blur() {},
            nodeName: ""
        },
        querySelector() {
            return null;
        },
        querySelectorAll() {
            return [];
        },
        getElementById() {
            return null;
        },
        createEvent() {
            return {
                initEvent() {}
            };
        },
        createElement() {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute() {},
                getElementsByTagName() {
                    return [];
                }
            };
        },
        createElementNS() {
            return {};
        },
        importNode() {
            return null;
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        }
    };
    function ssr_window_esm_getDocument() {
        const doc = "undefined" !== typeof document ? document : {};
        extend(doc, ssrDocument);
        return doc;
    }
    const ssrWindow = {
        document: ssrDocument,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState() {},
            pushState() {},
            go() {},
            back() {}
        },
        CustomEvent: function CustomEvent() {
            return this;
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle() {
            return {
                getPropertyValue() {
                    return "";
                }
            };
        },
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia() {
            return {};
        },
        requestAnimationFrame(callback) {
            if ("undefined" === typeof setTimeout) {
                callback();
                return null;
            }
            return setTimeout(callback, 0);
        },
        cancelAnimationFrame(id) {
            if ("undefined" === typeof setTimeout) return;
            clearTimeout(id);
        }
    };
    function ssr_window_esm_getWindow() {
        const win = "undefined" !== typeof window ? window : {};
        extend(win, ssrWindow);
        return win;
    }
    function deleteProps(obj) {
        const object = obj;
        Object.keys(object).forEach((key => {
            try {
                object[key] = null;
            } catch (e) {}
            try {
                delete object[key];
            } catch (e) {}
        }));
    }
    function utils_nextTick(callback, delay = 0) {
        return setTimeout(callback, delay);
    }
    function utils_now() {
        return Date.now();
    }
    function utils_getComputedStyle(el) {
        const window = ssr_window_esm_getWindow();
        let style;
        if (window.getComputedStyle) style = window.getComputedStyle(el, null);
        if (!style && el.currentStyle) style = el.currentStyle;
        if (!style) style = el.style;
        return style;
    }
    function utils_getTranslate(el, axis = "x") {
        const window = ssr_window_esm_getWindow();
        let matrix;
        let curTransform;
        let transformMatrix;
        const curStyle = utils_getComputedStyle(el, null);
        if (window.WebKitCSSMatrix) {
            curTransform = curStyle.transform || curStyle.webkitTransform;
            if (curTransform.split(",").length > 6) curTransform = curTransform.split(", ").map((a => a.replace(",", "."))).join(", ");
            transformMatrix = new window.WebKitCSSMatrix("none" === curTransform ? "" : curTransform);
        } else {
            transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
            matrix = transformMatrix.toString().split(",");
        }
        if ("x" === axis) if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; else if (16 === matrix.length) curTransform = parseFloat(matrix[12]); else curTransform = parseFloat(matrix[4]);
        if ("y" === axis) if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; else if (16 === matrix.length) curTransform = parseFloat(matrix[13]); else curTransform = parseFloat(matrix[5]);
        return curTransform || 0;
    }
    function utils_isObject(o) {
        return "object" === typeof o && null !== o && o.constructor && "Object" === Object.prototype.toString.call(o).slice(8, -1);
    }
    function isNode(node) {
        if ("undefined" !== typeof window && "undefined" !== typeof window.HTMLElement) return node instanceof HTMLElement;
        return node && (1 === node.nodeType || 11 === node.nodeType);
    }
    function utils_extend(...args) {
        const to = Object(args[0]);
        const noExtend = [ "__proto__", "constructor", "prototype" ];
        for (let i = 1; i < args.length; i += 1) {
            const nextSource = args[i];
            if (void 0 !== nextSource && null !== nextSource && !isNode(nextSource)) {
                const keysArray = Object.keys(Object(nextSource)).filter((key => noExtend.indexOf(key) < 0));
                for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                    const nextKey = keysArray[nextIndex];
                    const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (void 0 !== desc && desc.enumerable) if (utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]); else if (!utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
                        to[nextKey] = {};
                        if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]);
                    } else to[nextKey] = nextSource[nextKey];
                }
            }
        }
        return to;
    }
    function utils_setCSSProperty(el, varName, varValue) {
        el.style.setProperty(varName, varValue);
    }
    function animateCSSModeScroll({swiper, targetPosition, side}) {
        const window = ssr_window_esm_getWindow();
        const startPosition = -swiper.translate;
        let startTime = null;
        let time;
        const duration = swiper.params.speed;
        swiper.wrapperEl.style.scrollSnapType = "none";
        window.cancelAnimationFrame(swiper.cssModeFrameID);
        const dir = targetPosition > startPosition ? "next" : "prev";
        const isOutOfBound = (current, target) => "next" === dir && current >= target || "prev" === dir && current <= target;
        const animate = () => {
            time = (new Date).getTime();
            if (null === startTime) startTime = time;
            const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
            const easeProgress = .5 - Math.cos(progress * Math.PI) / 2;
            let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
            if (isOutOfBound(currentPosition, targetPosition)) currentPosition = targetPosition;
            swiper.wrapperEl.scrollTo({
                [side]: currentPosition
            });
            if (isOutOfBound(currentPosition, targetPosition)) {
                swiper.wrapperEl.style.overflow = "hidden";
                swiper.wrapperEl.style.scrollSnapType = "";
                setTimeout((() => {
                    swiper.wrapperEl.style.overflow = "";
                    swiper.wrapperEl.scrollTo({
                        [side]: currentPosition
                    });
                }));
                window.cancelAnimationFrame(swiper.cssModeFrameID);
                return;
            }
            swiper.cssModeFrameID = window.requestAnimationFrame(animate);
        };
        animate();
    }
    function utils_getSlideTransformEl(slideEl) {
        return slideEl.querySelector(".swiper-slide-transform") || slideEl.shadowEl && slideEl.shadowEl.querySelector(".swiper-slide-transform") || slideEl;
    }
    function utils_elementChildren(element, selector = "") {
        return [ ...element.children ].filter((el => el.matches(selector)));
    }
    function utils_createElement(tag, classes = []) {
        const el = document.createElement(tag);
        el.classList.add(...Array.isArray(classes) ? classes : [ classes ]);
        return el;
    }
    function utils_elementOffset(el) {
        const window = ssr_window_esm_getWindow();
        const document = ssr_window_esm_getDocument();
        const box = el.getBoundingClientRect();
        const body = document.body;
        const clientTop = el.clientTop || body.clientTop || 0;
        const clientLeft = el.clientLeft || body.clientLeft || 0;
        const scrollTop = el === window ? window.scrollY : el.scrollTop;
        const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
        return {
            top: box.top + scrollTop - clientTop,
            left: box.left + scrollLeft - clientLeft
        };
    }
    function elementPrevAll(el, selector) {
        const prevEls = [];
        while (el.previousElementSibling) {
            const prev = el.previousElementSibling;
            if (selector) {
                if (prev.matches(selector)) prevEls.push(prev);
            } else prevEls.push(prev);
            el = prev;
        }
        return prevEls;
    }
    function elementNextAll(el, selector) {
        const nextEls = [];
        while (el.nextElementSibling) {
            const next = el.nextElementSibling;
            if (selector) {
                if (next.matches(selector)) nextEls.push(next);
            } else nextEls.push(next);
            el = next;
        }
        return nextEls;
    }
    function elementStyle(el, prop) {
        const window = ssr_window_esm_getWindow();
        return window.getComputedStyle(el, null).getPropertyValue(prop);
    }
    function utils_elementIndex(el) {
        let child = el;
        let i;
        if (child) {
            i = 0;
            while (null !== (child = child.previousSibling)) if (1 === child.nodeType) i += 1;
            return i;
        }
        return;
    }
    function utils_elementParents(el, selector) {
        const parents = [];
        let parent = el.parentElement;
        while (parent) {
            if (selector) {
                if (parent.matches(selector)) parents.push(parent);
            } else parents.push(parent);
            parent = parent.parentElement;
        }
        return parents;
    }
    function utils_elementTransitionEnd(el, callback) {
        function fireCallBack(e) {
            if (e.target !== el) return;
            callback.call(el, e);
            el.removeEventListener("transitionend", fireCallBack);
        }
        if (callback) el.addEventListener("transitionend", fireCallBack);
    }
    function elementOuterSize(el, size, includeMargins) {
        const window = ssr_window_esm_getWindow();
        if (includeMargins) return el["width" === size ? "offsetWidth" : "offsetHeight"] + parseFloat(window.getComputedStyle(el, null).getPropertyValue("width" === size ? "margin-right" : "margin-top")) + parseFloat(window.getComputedStyle(el, null).getPropertyValue("width" === size ? "margin-left" : "margin-bottom"));
        return el.offsetWidth;
    }
    let support;
    function calcSupport() {
        const window = ssr_window_esm_getWindow();
        const document = ssr_window_esm_getDocument();
        return {
            smoothScroll: document.documentElement && "scrollBehavior" in document.documentElement.style,
            touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch)
        };
    }
    function getSupport() {
        if (!support) support = calcSupport();
        return support;
    }
    let deviceCached;
    function calcDevice({userAgent} = {}) {
        const support = getSupport();
        const window = ssr_window_esm_getWindow();
        const platform = window.navigator.platform;
        const ua = userAgent || window.navigator.userAgent;
        const device = {
            ios: false,
            android: false
        };
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        const windows = "Win32" === platform;
        let macos = "MacIntel" === platform;
        const iPadScreens = [ "1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810" ];
        if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
            ipad = ua.match(/(Version)\/([\d.]+)/);
            if (!ipad) ipad = [ 0, 1, "13_0_0" ];
            macos = false;
        }
        if (android && !windows) {
            device.os = "android";
            device.android = true;
        }
        if (ipad || iphone || ipod) {
            device.os = "ios";
            device.ios = true;
        }
        return device;
    }
    function getDevice(overrides = {}) {
        if (!deviceCached) deviceCached = calcDevice(overrides);
        return deviceCached;
    }
    let browser;
    function calcBrowser() {
        const window = ssr_window_esm_getWindow();
        let needPerspectiveFix = false;
        function isSafari() {
            const ua = window.navigator.userAgent.toLowerCase();
            return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
        }
        if (isSafari()) {
            const ua = String(window.navigator.userAgent);
            if (ua.includes("Version/")) {
                const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num => Number(num)));
                needPerspectiveFix = major < 16 || 16 === major && minor < 2;
            }
        }
        return {
            isSafari: needPerspectiveFix || isSafari(),
            needPerspectiveFix,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
        };
    }
    function getBrowser() {
        if (!browser) browser = calcBrowser();
        return browser;
    }
    function Resize({swiper, on, emit}) {
        const window = ssr_window_esm_getWindow();
        let observer = null;
        let animationFrame = null;
        const resizeHandler = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            emit("beforeResize");
            emit("resize");
        };
        const createObserver = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            observer = new ResizeObserver((entries => {
                animationFrame = window.requestAnimationFrame((() => {
                    const {width, height} = swiper;
                    let newWidth = width;
                    let newHeight = height;
                    entries.forEach((({contentBoxSize, contentRect, target}) => {
                        if (target && target !== swiper.el) return;
                        newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
                        newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
                    }));
                    if (newWidth !== width || newHeight !== height) resizeHandler();
                }));
            }));
            observer.observe(swiper.el);
        };
        const removeObserver = () => {
            if (animationFrame) window.cancelAnimationFrame(animationFrame);
            if (observer && observer.unobserve && swiper.el) {
                observer.unobserve(swiper.el);
                observer = null;
            }
        };
        const orientationChangeHandler = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            emit("orientationchange");
        };
        on("init", (() => {
            if (swiper.params.resizeObserver && "undefined" !== typeof window.ResizeObserver) {
                createObserver();
                return;
            }
            window.addEventListener("resize", resizeHandler);
            window.addEventListener("orientationchange", orientationChangeHandler);
        }));
        on("destroy", (() => {
            removeObserver();
            window.removeEventListener("resize", resizeHandler);
            window.removeEventListener("orientationchange", orientationChangeHandler);
        }));
    }
    function Observer({swiper, extendParams, on, emit}) {
        const observers = [];
        const window = ssr_window_esm_getWindow();
        const attach = (target, options = {}) => {
            const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            const observer = new ObserverFunc((mutations => {
                if (swiper.__preventObserver__) return;
                if (1 === mutations.length) {
                    emit("observerUpdate", mutations[0]);
                    return;
                }
                const observerUpdate = function observerUpdate() {
                    emit("observerUpdate", mutations[0]);
                };
                if (window.requestAnimationFrame) window.requestAnimationFrame(observerUpdate); else window.setTimeout(observerUpdate, 0);
            }));
            observer.observe(target, {
                attributes: "undefined" === typeof options.attributes ? true : options.attributes,
                childList: "undefined" === typeof options.childList ? true : options.childList,
                characterData: "undefined" === typeof options.characterData ? true : options.characterData
            });
            observers.push(observer);
        };
        const init = () => {
            if (!swiper.params.observer) return;
            if (swiper.params.observeParents) {
                const containerParents = utils_elementParents(swiper.el);
                for (let i = 0; i < containerParents.length; i += 1) attach(containerParents[i]);
            }
            attach(swiper.el, {
                childList: swiper.params.observeSlideChildren
            });
            attach(swiper.wrapperEl, {
                attributes: false
            });
        };
        const destroy = () => {
            observers.forEach((observer => {
                observer.disconnect();
            }));
            observers.splice(0, observers.length);
        };
        extendParams({
            observer: false,
            observeParents: false,
            observeSlideChildren: false
        });
        on("init", init);
        on("destroy", destroy);
    }
    const events_emitter = {
        on(events, handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if ("function" !== typeof handler) return self;
            const method = priority ? "unshift" : "push";
            events.split(" ").forEach((event => {
                if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
                self.eventsListeners[event][method](handler);
            }));
            return self;
        },
        once(events, handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if ("function" !== typeof handler) return self;
            function onceHandler(...args) {
                self.off(events, onceHandler);
                if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
                handler.apply(self, args);
            }
            onceHandler.__emitterProxy = handler;
            return self.on(events, onceHandler, priority);
        },
        onAny(handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if ("function" !== typeof handler) return self;
            const method = priority ? "unshift" : "push";
            if (self.eventsAnyListeners.indexOf(handler) < 0) self.eventsAnyListeners[method](handler);
            return self;
        },
        offAny(handler) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsAnyListeners) return self;
            const index = self.eventsAnyListeners.indexOf(handler);
            if (index >= 0) self.eventsAnyListeners.splice(index, 1);
            return self;
        },
        off(events, handler) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsListeners) return self;
            events.split(" ").forEach((event => {
                if ("undefined" === typeof handler) self.eventsListeners[event] = []; else if (self.eventsListeners[event]) self.eventsListeners[event].forEach(((eventHandler, index) => {
                    if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) self.eventsListeners[event].splice(index, 1);
                }));
            }));
            return self;
        },
        emit(...args) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsListeners) return self;
            let events;
            let data;
            let context;
            if ("string" === typeof args[0] || Array.isArray(args[0])) {
                events = args[0];
                data = args.slice(1, args.length);
                context = self;
            } else {
                events = args[0].events;
                data = args[0].data;
                context = args[0].context || self;
            }
            data.unshift(context);
            const eventsArray = Array.isArray(events) ? events : events.split(" ");
            eventsArray.forEach((event => {
                if (self.eventsAnyListeners && self.eventsAnyListeners.length) self.eventsAnyListeners.forEach((eventHandler => {
                    eventHandler.apply(context, [ event, ...data ]);
                }));
                if (self.eventsListeners && self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler => {
                    eventHandler.apply(context, data);
                }));
            }));
            return self;
        }
    };
    function updateSize() {
        const swiper = this;
        let width;
        let height;
        const el = swiper.el;
        if ("undefined" !== typeof swiper.params.width && null !== swiper.params.width) width = swiper.params.width; else width = el.clientWidth;
        if ("undefined" !== typeof swiper.params.height && null !== swiper.params.height) height = swiper.params.height; else height = el.clientHeight;
        if (0 === width && swiper.isHorizontal() || 0 === height && swiper.isVertical()) return;
        width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10);
        height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10);
        if (Number.isNaN(width)) width = 0;
        if (Number.isNaN(height)) height = 0;
        Object.assign(swiper, {
            width,
            height,
            size: swiper.isHorizontal() ? width : height
        });
    }
    function updateSlides() {
        const swiper = this;
        function getDirectionLabel(property) {
            if (swiper.isHorizontal()) return property;
            return {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom"
            }[property];
        }
        function getDirectionPropertyValue(node, label) {
            return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
        }
        const params = swiper.params;
        const {wrapperEl, slidesEl, size: swiperSize, rtlTranslate: rtl, wrongRTL} = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
        const slides = utils_elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
        const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
        let snapGrid = [];
        const slidesGrid = [];
        const slidesSizesGrid = [];
        let offsetBefore = params.slidesOffsetBefore;
        if ("function" === typeof offsetBefore) offsetBefore = params.slidesOffsetBefore.call(swiper);
        let offsetAfter = params.slidesOffsetAfter;
        if ("function" === typeof offsetAfter) offsetAfter = params.slidesOffsetAfter.call(swiper);
        const previousSnapGridLength = swiper.snapGrid.length;
        const previousSlidesGridLength = swiper.slidesGrid.length;
        let spaceBetween = params.spaceBetween;
        let slidePosition = -offsetBefore;
        let prevSlideSize = 0;
        let index = 0;
        if ("undefined" === typeof swiperSize) return;
        if ("string" === typeof spaceBetween && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
        swiper.virtualSize = -spaceBetween;
        slides.forEach((slideEl => {
            if (rtl) slideEl.style.marginLeft = ""; else slideEl.style.marginRight = "";
            slideEl.style.marginBottom = "";
            slideEl.style.marginTop = "";
        }));
        if (params.centeredSlides && params.cssMode) {
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
        }
        const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
        if (gridEnabled) swiper.grid.initSlides(slidesLength);
        let slideSize;
        const shouldResetSlideSize = "auto" === params.slidesPerView && params.breakpoints && Object.keys(params.breakpoints).filter((key => "undefined" !== typeof params.breakpoints[key].slidesPerView)).length > 0;
        for (let i = 0; i < slidesLength; i += 1) {
            slideSize = 0;
            let slide;
            if (slides[i]) slide = slides[i];
            if (gridEnabled) swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
            if (slides[i] && "none" === elementStyle(slide, "display")) continue;
            if ("auto" === params.slidesPerView) {
                if (shouldResetSlideSize) slides[i].style[getDirectionLabel("width")] = ``;
                const slideStyles = getComputedStyle(slide);
                const currentTransform = slide.style.transform;
                const currentWebKitTransform = slide.style.webkitTransform;
                if (currentTransform) slide.style.transform = "none";
                if (currentWebKitTransform) slide.style.webkitTransform = "none";
                if (params.roundLengths) slideSize = swiper.isHorizontal() ? elementOuterSize(slide, "width", true) : elementOuterSize(slide, "height", true); else {
                    const width = getDirectionPropertyValue(slideStyles, "width");
                    const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
                    const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
                    const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
                    const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
                    const boxSizing = slideStyles.getPropertyValue("box-sizing");
                    if (boxSizing && "border-box" === boxSizing) slideSize = width + marginLeft + marginRight; else {
                        const {clientWidth, offsetWidth} = slide;
                        slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
                    }
                }
                if (currentTransform) slide.style.transform = currentTransform;
                if (currentWebKitTransform) slide.style.webkitTransform = currentWebKitTransform;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
            } else {
                slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
                if (slides[i]) slides[i].style[getDirectionLabel("width")] = `${slideSize}px`;
            }
            if (slides[i]) slides[i].swiperSlideSize = slideSize;
            slidesSizesGrid.push(slideSize);
            if (params.centeredSlides) {
                slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                if (0 === prevSlideSize && 0 !== i) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (0 === i) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
            } else {
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
                slidePosition = slidePosition + slideSize + spaceBetween;
            }
            swiper.virtualSize += slideSize + spaceBetween;
            prevSlideSize = slideSize;
            index += 1;
        }
        swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
        if (rtl && wrongRTL && ("slide" === params.effect || "coverflow" === params.effect)) wrapperEl.style.width = `${swiper.virtualSize + params.spaceBetween}px`;
        if (params.setWrapperSize) wrapperEl.style[getDirectionLabel("width")] = `${swiper.virtualSize + params.spaceBetween}px`;
        if (gridEnabled) swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
        if (!params.centeredSlides) {
            const newSlidesGrid = [];
            for (let i = 0; i < snapGrid.length; i += 1) {
                let slidesGridItem = snapGrid[i];
                if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
                if (snapGrid[i] <= swiper.virtualSize - swiperSize) newSlidesGrid.push(slidesGridItem);
            }
            snapGrid = newSlidesGrid;
            if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) snapGrid.push(swiper.virtualSize - swiperSize);
        }
        if (isVirtual && params.loop) {
            const size = slidesSizesGrid[0] + spaceBetween;
            if (params.slidesPerGroup > 1) {
                const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
                const groupSize = size * params.slidesPerGroup;
                for (let i = 0; i < groups; i += 1) snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
            }
            for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1) {
                if (1 === params.slidesPerGroup) snapGrid.push(snapGrid[snapGrid.length - 1] + size);
                slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
                swiper.virtualSize += size;
            }
        }
        if (0 === snapGrid.length) snapGrid = [ 0 ];
        if (0 !== params.spaceBetween) {
            const key = swiper.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
            slides.filter(((_, slideIndex) => {
                if (!params.cssMode || params.loop) return true;
                if (slideIndex === slides.length - 1) return false;
                return true;
            })).forEach((slideEl => {
                slideEl.style[key] = `${spaceBetween}px`;
            }));
        }
        if (params.centeredSlides && params.centeredSlidesBounds) {
            let allSlidesSize = 0;
            slidesSizesGrid.forEach((slideSizeValue => {
                allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
            }));
            allSlidesSize -= params.spaceBetween;
            const maxSnap = allSlidesSize - swiperSize;
            snapGrid = snapGrid.map((snap => {
                if (snap < 0) return -offsetBefore;
                if (snap > maxSnap) return maxSnap + offsetAfter;
                return snap;
            }));
        }
        if (params.centerInsufficientSlides) {
            let allSlidesSize = 0;
            slidesSizesGrid.forEach((slideSizeValue => {
                allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
            }));
            allSlidesSize -= params.spaceBetween;
            if (allSlidesSize < swiperSize) {
                const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
                snapGrid.forEach(((snap, snapIndex) => {
                    snapGrid[snapIndex] = snap - allSlidesOffset;
                }));
                slidesGrid.forEach(((snap, snapIndex) => {
                    slidesGrid[snapIndex] = snap + allSlidesOffset;
                }));
            }
        }
        Object.assign(swiper, {
            slides,
            snapGrid,
            slidesGrid,
            slidesSizesGrid
        });
        if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
            const addToSnapGrid = -swiper.snapGrid[0];
            const addToSlidesGrid = -swiper.slidesGrid[0];
            swiper.snapGrid = swiper.snapGrid.map((v => v + addToSnapGrid));
            swiper.slidesGrid = swiper.slidesGrid.map((v => v + addToSlidesGrid));
        }
        if (slidesLength !== previousSlidesLength) swiper.emit("slidesLengthChange");
        if (snapGrid.length !== previousSnapGridLength) {
            if (swiper.params.watchOverflow) swiper.checkOverflow();
            swiper.emit("snapGridLengthChange");
        }
        if (slidesGrid.length !== previousSlidesGridLength) swiper.emit("slidesGridLengthChange");
        if (params.watchSlidesProgress) swiper.updateSlidesOffset();
        if (!isVirtual && !params.cssMode && ("slide" === params.effect || "fade" === params.effect)) {
            const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
            const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
            if (slidesLength <= params.maxBackfaceHiddenSlides) {
                if (!hasClassBackfaceClassAdded) swiper.el.classList.add(backFaceHiddenClass);
            } else if (hasClassBackfaceClassAdded) swiper.el.classList.remove(backFaceHiddenClass);
        }
    }
    function updateAutoHeight(speed) {
        const swiper = this;
        const activeSlides = [];
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        let newHeight = 0;
        let i;
        if ("number" === typeof speed) swiper.setTransition(speed); else if (true === speed) swiper.setTransition(swiper.params.speed);
        const getSlideByIndex = index => {
            if (isVirtual) return swiper.getSlideIndexByData(index);
            return swiper.slides[index];
        };
        if ("auto" !== swiper.params.slidesPerView && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) (swiper.visibleSlides || []).forEach((slide => {
            activeSlides.push(slide);
        })); else for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
            const index = swiper.activeIndex + i;
            if (index > swiper.slides.length && !isVirtual) break;
            activeSlides.push(getSlideByIndex(index));
        } else activeSlides.push(getSlideByIndex(swiper.activeIndex));
        for (i = 0; i < activeSlides.length; i += 1) if ("undefined" !== typeof activeSlides[i]) {
            const height = activeSlides[i].offsetHeight;
            newHeight = height > newHeight ? height : newHeight;
        }
        if (newHeight || 0 === newHeight) swiper.wrapperEl.style.height = `${newHeight}px`;
    }
    function updateSlidesOffset() {
        const swiper = this;
        const slides = swiper.slides;
        const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
        for (let i = 0; i < slides.length; i += 1) slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset;
    }
    function updateSlidesProgress(translate = this && this.translate || 0) {
        const swiper = this;
        const params = swiper.params;
        const {slides, rtlTranslate: rtl, snapGrid} = swiper;
        if (0 === slides.length) return;
        if ("undefined" === typeof slides[0].swiperSlideOffset) swiper.updateSlidesOffset();
        let offsetCenter = -translate;
        if (rtl) offsetCenter = translate;
        slides.forEach((slideEl => {
            slideEl.classList.remove(params.slideVisibleClass);
        }));
        swiper.visibleSlidesIndexes = [];
        swiper.visibleSlides = [];
        for (let i = 0; i < slides.length; i += 1) {
            const slide = slides[i];
            let slideOffset = slide.swiperSlideOffset;
            if (params.cssMode && params.centeredSlides) slideOffset -= slides[0].swiperSlideOffset;
            const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
            const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
            const slideBefore = -(offsetCenter - slideOffset);
            const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
            const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
            if (isVisible) {
                swiper.visibleSlides.push(slide);
                swiper.visibleSlidesIndexes.push(i);
                slides[i].classList.add(params.slideVisibleClass);
            }
            slide.progress = rtl ? -slideProgress : slideProgress;
            slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
        }
    }
    function updateProgress(translate) {
        const swiper = this;
        if ("undefined" === typeof translate) {
            const multiplier = swiper.rtlTranslate ? -1 : 1;
            translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
        }
        const params = swiper.params;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        let {progress, isBeginning, isEnd, progressLoop} = swiper;
        const wasBeginning = isBeginning;
        const wasEnd = isEnd;
        if (0 === translatesDiff) {
            progress = 0;
            isBeginning = true;
            isEnd = true;
        } else {
            progress = (translate - swiper.minTranslate()) / translatesDiff;
            const isBeginningRounded = Math.abs(translate - swiper.minTranslate()) < 1;
            const isEndRounded = Math.abs(translate - swiper.maxTranslate()) < 1;
            isBeginning = isBeginningRounded || progress <= 0;
            isEnd = isEndRounded || progress >= 1;
            if (isBeginningRounded) progress = 0;
            if (isEndRounded) progress = 1;
        }
        if (params.loop) {
            const firstSlideIndex = swiper.getSlideIndexByData(0);
            const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
            const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
            const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
            const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
            const translateAbs = Math.abs(translate);
            if (translateAbs >= firstSlideTranslate) progressLoop = (translateAbs - firstSlideTranslate) / translateMax; else progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
            if (progressLoop > 1) progressLoop -= 1;
        }
        Object.assign(swiper, {
            progress,
            progressLoop,
            isBeginning,
            isEnd
        });
        if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
        if (isBeginning && !wasBeginning) swiper.emit("reachBeginning toEdge");
        if (isEnd && !wasEnd) swiper.emit("reachEnd toEdge");
        if (wasBeginning && !isBeginning || wasEnd && !isEnd) swiper.emit("fromEdge");
        swiper.emit("progress", progress);
    }
    function updateSlidesClasses() {
        const swiper = this;
        const {slides, params, slidesEl, activeIndex} = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        const getFilteredSlide = selector => utils_elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
        slides.forEach((slideEl => {
            slideEl.classList.remove(params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
        }));
        let activeSlide;
        if (isVirtual) if (params.loop) {
            let slideIndex = activeIndex - swiper.virtual.slidesBefore;
            if (slideIndex < 0) slideIndex = swiper.virtual.slides.length + slideIndex;
            if (slideIndex >= swiper.virtual.slides.length) slideIndex -= swiper.virtual.slides.length;
            activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
        } else activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`); else activeSlide = slides[activeIndex];
        if (activeSlide) {
            activeSlide.classList.add(params.slideActiveClass);
            let nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
            if (params.loop && !nextSlide) nextSlide = slides[0];
            if (nextSlide) nextSlide.classList.add(params.slideNextClass);
            let prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
            if (params.loop && 0 === !prevSlide) prevSlide = slides[slides.length - 1];
            if (prevSlide) prevSlide.classList.add(params.slidePrevClass);
        }
        swiper.emitSlidesClasses();
    }
    const processLazyPreloader = (swiper, imageEl) => {
        if (!swiper || swiper.destroyed || !swiper.params) return;
        const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
        const slideEl = imageEl.closest(slideSelector());
        if (slideEl) {
            const lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
            if (lazyEl) lazyEl.remove();
        }
    };
    const unlazy = (swiper, index) => {
        if (!swiper.slides[index]) return;
        const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
        if (imageEl) imageEl.removeAttribute("loading");
    };
    const preload = swiper => {
        if (!swiper || swiper.destroyed || !swiper.params) return;
        let amount = swiper.params.lazyPreloadPrevNext;
        const len = swiper.slides.length;
        if (!len || !amount || amount < 0) return;
        amount = Math.min(amount, len);
        const slidesPerView = "auto" === swiper.params.slidesPerView ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
        const activeIndex = swiper.activeIndex;
        const slideIndexLastInView = activeIndex + slidesPerView - 1;
        if (swiper.params.rewind) for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
            const realIndex = (i % len + len) % len;
            if (realIndex !== activeIndex && realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
        } else for (let i = Math.max(slideIndexLastInView - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) if (i !== activeIndex && i > slideIndexLastInView) unlazy(swiper, i);
    };
    function getActiveIndexByTranslate(swiper) {
        const {slidesGrid, params} = swiper;
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        let activeIndex;
        for (let i = 0; i < slidesGrid.length; i += 1) if ("undefined" !== typeof slidesGrid[i + 1]) {
            if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) activeIndex = i; else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) activeIndex = i + 1;
        } else if (translate >= slidesGrid[i]) activeIndex = i;
        if (params.normalizeSlideIndex) if (activeIndex < 0 || "undefined" === typeof activeIndex) activeIndex = 0;
        return activeIndex;
    }
    function updateActiveIndex(newActiveIndex) {
        const swiper = this;
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        const {snapGrid, params, activeIndex: previousIndex, realIndex: previousRealIndex, snapIndex: previousSnapIndex} = swiper;
        let activeIndex = newActiveIndex;
        let snapIndex;
        const getVirtualRealIndex = aIndex => {
            let realIndex = aIndex - swiper.virtual.slidesBefore;
            if (realIndex < 0) realIndex = swiper.virtual.slides.length + realIndex;
            if (realIndex >= swiper.virtual.slides.length) realIndex -= swiper.virtual.slides.length;
            return realIndex;
        };
        if ("undefined" === typeof activeIndex) activeIndex = getActiveIndexByTranslate(swiper);
        if (snapGrid.indexOf(translate) >= 0) snapIndex = snapGrid.indexOf(translate); else {
            const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
            snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
        }
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
        if (activeIndex === previousIndex) {
            if (snapIndex !== previousSnapIndex) {
                swiper.snapIndex = snapIndex;
                swiper.emit("snapIndexChange");
            }
            if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) swiper.realIndex = getVirtualRealIndex(activeIndex);
            return;
        }
        let realIndex;
        if (swiper.virtual && params.virtual.enabled && params.loop) realIndex = getVirtualRealIndex(activeIndex); else if (swiper.slides[activeIndex]) realIndex = parseInt(swiper.slides[activeIndex].getAttribute("data-swiper-slide-index") || activeIndex, 10); else realIndex = activeIndex;
        Object.assign(swiper, {
            snapIndex,
            realIndex,
            previousIndex,
            activeIndex
        });
        if (swiper.initialized) preload(swiper);
        swiper.emit("activeIndexChange");
        swiper.emit("snapIndexChange");
        if (previousRealIndex !== realIndex) swiper.emit("realIndexChange");
        if (swiper.initialized || swiper.params.runCallbacksOnInit) swiper.emit("slideChange");
    }
    function updateClickedSlide(e) {
        const swiper = this;
        const params = swiper.params;
        const slide = e.closest(`.${params.slideClass}, swiper-slide`);
        let slideFound = false;
        let slideIndex;
        if (slide) for (let i = 0; i < swiper.slides.length; i += 1) if (swiper.slides[i] === slide) {
            slideFound = true;
            slideIndex = i;
            break;
        }
        if (slide && slideFound) {
            swiper.clickedSlide = slide;
            if (swiper.virtual && swiper.params.virtual.enabled) swiper.clickedIndex = parseInt(slide.getAttribute("data-swiper-slide-index"), 10); else swiper.clickedIndex = slideIndex;
        } else {
            swiper.clickedSlide = void 0;
            swiper.clickedIndex = void 0;
            return;
        }
        if (params.slideToClickedSlide && void 0 !== swiper.clickedIndex && swiper.clickedIndex !== swiper.activeIndex) swiper.slideToClickedSlide();
    }
    const update = {
        updateSize,
        updateSlides,
        updateAutoHeight,
        updateSlidesOffset,
        updateSlidesProgress,
        updateProgress,
        updateSlidesClasses,
        updateActiveIndex,
        updateClickedSlide
    };
    function getSwiperTranslate(axis = (this.isHorizontal() ? "x" : "y")) {
        const swiper = this;
        const {params, rtlTranslate: rtl, translate, wrapperEl} = swiper;
        if (params.virtualTranslate) return rtl ? -translate : translate;
        if (params.cssMode) return translate;
        let currentTranslate = utils_getTranslate(wrapperEl, axis);
        if (rtl) currentTranslate = -currentTranslate;
        return currentTranslate || 0;
    }
    function setTranslate(translate, byController) {
        const swiper = this;
        const {rtlTranslate: rtl, params, wrapperEl, progress} = swiper;
        let x = 0;
        let y = 0;
        const z = 0;
        if (swiper.isHorizontal()) x = rtl ? -translate : translate; else y = translate;
        if (params.roundLengths) {
            x = Math.floor(x);
            y = Math.floor(y);
        }
        if (params.cssMode) wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y; else if (!params.virtualTranslate) wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
        swiper.previousTranslate = swiper.translate;
        swiper.translate = swiper.isHorizontal() ? x : y;
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        if (0 === translatesDiff) newProgress = 0; else newProgress = (translate - swiper.minTranslate()) / translatesDiff;
        if (newProgress !== progress) swiper.updateProgress(translate);
        swiper.emit("setTranslate", swiper.translate, byController);
    }
    function minTranslate() {
        return -this.snapGrid[0];
    }
    function maxTranslate() {
        return -this.snapGrid[this.snapGrid.length - 1];
    }
    function translateTo(translate = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
        const swiper = this;
        const {params, wrapperEl} = swiper;
        if (swiper.animating && params.preventInteractionOnTransition) return false;
        const minTranslate = swiper.minTranslate();
        const maxTranslate = swiper.maxTranslate();
        let newTranslate;
        if (translateBounds && translate > minTranslate) newTranslate = minTranslate; else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate; else newTranslate = translate;
        swiper.updateProgress(newTranslate);
        if (params.cssMode) {
            const isH = swiper.isHorizontal();
            if (0 === speed) wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate; else {
                if (!swiper.support.smoothScroll) {
                    animateCSSModeScroll({
                        swiper,
                        targetPosition: -newTranslate,
                        side: isH ? "left" : "top"
                    });
                    return true;
                }
                wrapperEl.scrollTo({
                    [isH ? "left" : "top"]: -newTranslate,
                    behavior: "smooth"
                });
            }
            return true;
        }
        if (0 === speed) {
            swiper.setTransition(0);
            swiper.setTranslate(newTranslate);
            if (runCallbacks) {
                swiper.emit("beforeTransitionStart", speed, internal);
                swiper.emit("transitionEnd");
            }
        } else {
            swiper.setTransition(speed);
            swiper.setTranslate(newTranslate);
            if (runCallbacks) {
                swiper.emit("beforeTransitionStart", speed, internal);
                swiper.emit("transitionStart");
            }
            if (!swiper.animating) {
                swiper.animating = true;
                if (!swiper.onTranslateToWrapperTransitionEnd) swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
                    if (!swiper || swiper.destroyed) return;
                    if (e.target !== this) return;
                    swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                    swiper.onTranslateToWrapperTransitionEnd = null;
                    delete swiper.onTranslateToWrapperTransitionEnd;
                    if (runCallbacks) swiper.emit("transitionEnd");
                };
                swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
            }
        }
        return true;
    }
    const translate = {
        getTranslate: getSwiperTranslate,
        setTranslate,
        minTranslate,
        maxTranslate,
        translateTo
    };
    function setTransition(duration, byController) {
        const swiper = this;
        if (!swiper.params.cssMode) swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
        swiper.emit("setTransition", duration, byController);
    }
    function transitionEmit({swiper, runCallbacks, direction, step}) {
        const {activeIndex, previousIndex} = swiper;
        let dir = direction;
        if (!dir) if (activeIndex > previousIndex) dir = "next"; else if (activeIndex < previousIndex) dir = "prev"; else dir = "reset";
        swiper.emit(`transition${step}`);
        if (runCallbacks && activeIndex !== previousIndex) {
            if ("reset" === dir) {
                swiper.emit(`slideResetTransition${step}`);
                return;
            }
            swiper.emit(`slideChangeTransition${step}`);
            if ("next" === dir) swiper.emit(`slideNextTransition${step}`); else swiper.emit(`slidePrevTransition${step}`);
        }
    }
    function transitionStart(runCallbacks = true, direction) {
        const swiper = this;
        const {params} = swiper;
        if (params.cssMode) return;
        if (params.autoHeight) swiper.updateAutoHeight();
        transitionEmit({
            swiper,
            runCallbacks,
            direction,
            step: "Start"
        });
    }
    function transitionEnd(runCallbacks = true, direction) {
        const swiper = this;
        const {params} = swiper;
        swiper.animating = false;
        if (params.cssMode) return;
        swiper.setTransition(0);
        transitionEmit({
            swiper,
            runCallbacks,
            direction,
            step: "End"
        });
    }
    const transition = {
        setTransition,
        transitionStart,
        transitionEnd
    };
    function slideTo(index = 0, speed = this.params.speed, runCallbacks = true, internal, initial) {
        if ("string" === typeof index) index = parseInt(index, 10);
        const swiper = this;
        let slideIndex = index;
        if (slideIndex < 0) slideIndex = 0;
        const {params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl, wrapperEl, enabled} = swiper;
        if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) return false;
        const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
        let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
        const translate = -snapGrid[snapIndex];
        if (params.normalizeSlideIndex) for (let i = 0; i < slidesGrid.length; i += 1) {
            const normalizedTranslate = -Math.floor(100 * translate);
            const normalizedGrid = Math.floor(100 * slidesGrid[i]);
            const normalizedGridNext = Math.floor(100 * slidesGrid[i + 1]);
            if ("undefined" !== typeof slidesGrid[i + 1]) {
                if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) slideIndex = i; else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) slideIndex = i + 1;
            } else if (normalizedTranslate >= normalizedGrid) slideIndex = i;
        }
        if (swiper.initialized && slideIndex !== activeIndex) {
            if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) return false;
            if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) if ((activeIndex || 0) !== slideIndex) return false;
        }
        if (slideIndex !== (previousIndex || 0) && runCallbacks) swiper.emit("beforeSlideChangeStart");
        swiper.updateProgress(translate);
        let direction;
        if (slideIndex > activeIndex) direction = "next"; else if (slideIndex < activeIndex) direction = "prev"; else direction = "reset";
        if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
            swiper.updateActiveIndex(slideIndex);
            if (params.autoHeight) swiper.updateAutoHeight();
            swiper.updateSlidesClasses();
            if ("slide" !== params.effect) swiper.setTranslate(translate);
            if ("reset" !== direction) {
                swiper.transitionStart(runCallbacks, direction);
                swiper.transitionEnd(runCallbacks, direction);
            }
            return false;
        }
        if (params.cssMode) {
            const isH = swiper.isHorizontal();
            const t = rtl ? translate : -translate;
            if (0 === speed) {
                const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
                if (isVirtual) {
                    swiper.wrapperEl.style.scrollSnapType = "none";
                    swiper._immediateVirtual = true;
                }
                if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
                    swiper._cssModeVirtualInitialSet = true;
                    requestAnimationFrame((() => {
                        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                    }));
                } else wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                if (isVirtual) requestAnimationFrame((() => {
                    swiper.wrapperEl.style.scrollSnapType = "";
                    swiper._immediateVirtual = false;
                }));
            } else {
                if (!swiper.support.smoothScroll) {
                    animateCSSModeScroll({
                        swiper,
                        targetPosition: t,
                        side: isH ? "left" : "top"
                    });
                    return true;
                }
                wrapperEl.scrollTo({
                    [isH ? "left" : "top"]: t,
                    behavior: "smooth"
                });
            }
            return true;
        }
        swiper.setTransition(speed);
        swiper.setTranslate(translate);
        swiper.updateActiveIndex(slideIndex);
        swiper.updateSlidesClasses();
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.transitionStart(runCallbacks, direction);
        if (0 === speed) swiper.transitionEnd(runCallbacks, direction); else if (!swiper.animating) {
            swiper.animating = true;
            if (!swiper.onSlideToWrapperTransitionEnd) swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
                if (!swiper || swiper.destroyed) return;
                if (e.target !== this) return;
                swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                swiper.onSlideToWrapperTransitionEnd = null;
                delete swiper.onSlideToWrapperTransitionEnd;
                swiper.transitionEnd(runCallbacks, direction);
            };
            swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
        }
        return true;
    }
    function slideToLoop(index = 0, speed = this.params.speed, runCallbacks = true, internal) {
        if ("string" === typeof index) {
            const indexAsNumber = parseInt(index, 10);
            index = indexAsNumber;
        }
        const swiper = this;
        let newIndex = index;
        if (swiper.params.loop) if (swiper.virtual && swiper.params.virtual.enabled) newIndex += swiper.virtual.slidesBefore; else newIndex = swiper.getSlideIndexByData(newIndex);
        return swiper.slideTo(newIndex, speed, runCallbacks, internal);
    }
    function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
        const swiper = this;
        const {enabled, params, animating} = swiper;
        if (!enabled) return swiper;
        let perGroup = params.slidesPerGroup;
        if ("auto" === params.slidesPerView && 1 === params.slidesPerGroup && params.slidesPerGroupAuto) perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
        const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        if (params.loop) {
            if (animating && !isVirtual && params.loopPreventsSliding) return false;
            swiper.loopFix({
                direction: "next"
            });
            swiper._clientLeft = swiper.wrapperEl.clientLeft;
        }
        if (params.rewind && swiper.isEnd) return swiper.slideTo(0, speed, runCallbacks, internal);
        return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
    }
    function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
        const swiper = this;
        const {params, snapGrid, slidesGrid, rtlTranslate, enabled, animating} = swiper;
        if (!enabled) return swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        if (params.loop) {
            if (animating && !isVirtual && params.loopPreventsSliding) return false;
            swiper.loopFix({
                direction: "prev"
            });
            swiper._clientLeft = swiper.wrapperEl.clientLeft;
        }
        const translate = rtlTranslate ? swiper.translate : -swiper.translate;
        function normalize(val) {
            if (val < 0) return -Math.floor(Math.abs(val));
            return Math.floor(val);
        }
        const normalizedTranslate = normalize(translate);
        const normalizedSnapGrid = snapGrid.map((val => normalize(val)));
        let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
        if ("undefined" === typeof prevSnap && params.cssMode) {
            let prevSnapIndex;
            snapGrid.forEach(((snap, snapIndex) => {
                if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
            }));
            if ("undefined" !== typeof prevSnapIndex) prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
        }
        let prevIndex = 0;
        if ("undefined" !== typeof prevSnap) {
            prevIndex = slidesGrid.indexOf(prevSnap);
            if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
            if ("auto" === params.slidesPerView && 1 === params.slidesPerGroup && params.slidesPerGroupAuto) {
                prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
                prevIndex = Math.max(prevIndex, 0);
            }
        }
        if (params.rewind && swiper.isBeginning) {
            const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
            return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
        }
        return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    }
    function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
        const swiper = this;
        return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
    }
    function slideToClosest(speed = this.params.speed, runCallbacks = true, internal, threshold = .5) {
        const swiper = this;
        let index = swiper.activeIndex;
        const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
        const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        if (translate >= swiper.snapGrid[snapIndex]) {
            const currentSnap = swiper.snapGrid[snapIndex];
            const nextSnap = swiper.snapGrid[snapIndex + 1];
            if (translate - currentSnap > (nextSnap - currentSnap) * threshold) index += swiper.params.slidesPerGroup;
        } else {
            const prevSnap = swiper.snapGrid[snapIndex - 1];
            const currentSnap = swiper.snapGrid[snapIndex];
            if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) index -= swiper.params.slidesPerGroup;
        }
        index = Math.max(index, 0);
        index = Math.min(index, swiper.slidesGrid.length - 1);
        return swiper.slideTo(index, speed, runCallbacks, internal);
    }
    function slideToClickedSlide() {
        const swiper = this;
        const {params, slidesEl} = swiper;
        const slidesPerView = "auto" === params.slidesPerView ? swiper.slidesPerViewDynamic() : params.slidesPerView;
        let slideToIndex = swiper.clickedIndex;
        let realIndex;
        const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
        if (params.loop) {
            if (swiper.animating) return;
            realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
            if (params.centeredSlides) if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
                swiper.loopFix();
                slideToIndex = swiper.getSlideIndex(utils_elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
                utils_nextTick((() => {
                    swiper.slideTo(slideToIndex);
                }));
            } else swiper.slideTo(slideToIndex); else if (slideToIndex > swiper.slides.length - slidesPerView) {
                swiper.loopFix();
                slideToIndex = swiper.getSlideIndex(utils_elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
                utils_nextTick((() => {
                    swiper.slideTo(slideToIndex);
                }));
            } else swiper.slideTo(slideToIndex);
        } else swiper.slideTo(slideToIndex);
    }
    const slide = {
        slideTo,
        slideToLoop,
        slideNext,
        slidePrev,
        slideReset,
        slideToClosest,
        slideToClickedSlide
    };
    function loopCreate(slideRealIndex) {
        const swiper = this;
        const {params, slidesEl} = swiper;
        if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
        const slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
        slides.forEach(((el, index) => {
            el.setAttribute("data-swiper-slide-index", index);
        }));
        swiper.loopFix({
            slideRealIndex,
            direction: params.centeredSlides ? void 0 : "next"
        });
    }
    function loopFix({slideRealIndex, slideTo = true, direction, setTranslate, activeSlideIndex, byController, byMousewheel} = {}) {
        const swiper = this;
        if (!swiper.params.loop) return;
        swiper.emit("beforeLoopFix");
        const {slides, allowSlidePrev, allowSlideNext, slidesEl, params} = swiper;
        swiper.allowSlidePrev = true;
        swiper.allowSlideNext = true;
        if (swiper.virtual && params.virtual.enabled) {
            if (slideTo) if (!params.centeredSlides && 0 === swiper.snapIndex) swiper.slideTo(swiper.virtual.slides.length, 0, false, true); else if (params.centeredSlides && swiper.snapIndex < params.slidesPerView) swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true); else if (swiper.snapIndex === swiper.snapGrid.length - 1) swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            swiper.emit("loopFix");
            return;
        }
        const slidesPerView = "auto" === params.slidesPerView ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10));
        let loopedSlides = params.loopedSlides || slidesPerView;
        if (loopedSlides % params.slidesPerGroup !== 0) loopedSlides += params.slidesPerGroup - loopedSlides % params.slidesPerGroup;
        swiper.loopedSlides = loopedSlides;
        const prependSlidesIndexes = [];
        const appendSlidesIndexes = [];
        let activeIndex = swiper.activeIndex;
        if ("undefined" === typeof activeSlideIndex) activeSlideIndex = swiper.getSlideIndex(swiper.slides.filter((el => el.classList.contains(params.slideActiveClass)))[0]); else activeIndex = activeSlideIndex;
        const isNext = "next" === direction || !direction;
        const isPrev = "prev" === direction || !direction;
        let slidesPrepended = 0;
        let slidesAppended = 0;
        if (activeSlideIndex < loopedSlides) {
            slidesPrepended = Math.max(loopedSlides - activeSlideIndex, params.slidesPerGroup);
            for (let i = 0; i < loopedSlides - activeSlideIndex; i += 1) {
                const index = i - Math.floor(i / slides.length) * slides.length;
                prependSlidesIndexes.push(slides.length - index - 1);
            }
        } else if (activeSlideIndex > swiper.slides.length - 2 * loopedSlides) {
            slidesAppended = Math.max(activeSlideIndex - (swiper.slides.length - 2 * loopedSlides), params.slidesPerGroup);
            for (let i = 0; i < slidesAppended; i += 1) {
                const index = i - Math.floor(i / slides.length) * slides.length;
                appendSlidesIndexes.push(index);
            }
        }
        if (isPrev) prependSlidesIndexes.forEach((index => {
            slidesEl.prepend(swiper.slides[index]);
        }));
        if (isNext) appendSlidesIndexes.forEach((index => {
            slidesEl.append(swiper.slides[index]);
        }));
        swiper.recalcSlides();
        if (params.watchSlidesProgress) swiper.updateSlidesOffset();
        if (slideTo) if (prependSlidesIndexes.length > 0 && isPrev) {
            if ("undefined" === typeof slideRealIndex) {
                const currentSlideTranslate = swiper.slidesGrid[activeIndex];
                const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
                const diff = newSlideTranslate - currentSlideTranslate;
                if (byMousewheel) swiper.setTranslate(swiper.translate - diff); else {
                    swiper.slideTo(activeIndex + slidesPrepended, 0, false, true);
                    if (setTranslate) swiper.touches[swiper.isHorizontal() ? "startX" : "startY"] += diff;
                }
            } else if (setTranslate) swiper.slideToLoop(slideRealIndex, 0, false, true);
        } else if (appendSlidesIndexes.length > 0 && isNext) if ("undefined" === typeof slideRealIndex) {
            const currentSlideTranslate = swiper.slidesGrid[activeIndex];
            const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
            const diff = newSlideTranslate - currentSlideTranslate;
            if (byMousewheel) swiper.setTranslate(swiper.translate - diff); else {
                swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
                if (setTranslate) swiper.touches[swiper.isHorizontal() ? "startX" : "startY"] += diff;
            }
        } else swiper.slideToLoop(slideRealIndex, 0, false, true);
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        if (swiper.controller && swiper.controller.control && !byController) {
            const loopParams = {
                slideRealIndex,
                slideTo: false,
                direction,
                setTranslate,
                activeSlideIndex,
                byController: true
            };
            if (Array.isArray(swiper.controller.control)) swiper.controller.control.forEach((c => {
                if (!c.destroyed && c.params.loop) c.loopFix(loopParams);
            })); else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) swiper.controller.control.loopFix(loopParams);
        }
        swiper.emit("loopFix");
    }
    function loopDestroy() {
        const swiper = this;
        const {params, slidesEl} = swiper;
        if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
        swiper.recalcSlides();
        const newSlidesOrder = [];
        swiper.slides.forEach((slideEl => {
            const index = "undefined" === typeof slideEl.swiperSlideIndex ? 1 * slideEl.getAttribute("data-swiper-slide-index") : slideEl.swiperSlideIndex;
            newSlidesOrder[index] = slideEl;
        }));
        swiper.slides.forEach((slideEl => {
            slideEl.removeAttribute("data-swiper-slide-index");
        }));
        newSlidesOrder.forEach((slideEl => {
            slidesEl.append(slideEl);
        }));
        swiper.recalcSlides();
        swiper.slideTo(swiper.realIndex, 0);
    }
    const loop = {
        loopCreate,
        loopFix,
        loopDestroy
    };
    function setGrabCursor(moving) {
        const swiper = this;
        if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
        const el = "container" === swiper.params.touchEventsTarget ? swiper.el : swiper.wrapperEl;
        if (swiper.isElement) swiper.__preventObserver__ = true;
        el.style.cursor = "move";
        el.style.cursor = moving ? "grabbing" : "grab";
        if (swiper.isElement) requestAnimationFrame((() => {
            swiper.__preventObserver__ = false;
        }));
    }
    function unsetGrabCursor() {
        const swiper = this;
        if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
        if (swiper.isElement) swiper.__preventObserver__ = true;
        swiper["container" === swiper.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "";
        if (swiper.isElement) requestAnimationFrame((() => {
            swiper.__preventObserver__ = false;
        }));
    }
    const grab_cursor = {
        setGrabCursor,
        unsetGrabCursor
    };
    function closestElement(selector, base = this) {
        function __closestFrom(el) {
            if (!el || el === ssr_window_esm_getDocument() || el === ssr_window_esm_getWindow()) return null;
            if (el.assignedSlot) el = el.assignedSlot;
            const found = el.closest(selector);
            if (!found && !el.getRootNode) return null;
            return found || __closestFrom(el.getRootNode().host);
        }
        return __closestFrom(base);
    }
    function onTouchStart(event) {
        const swiper = this;
        const document = ssr_window_esm_getDocument();
        const window = ssr_window_esm_getWindow();
        const data = swiper.touchEventsData;
        data.evCache.push(event);
        const {params, touches, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && "mouse" === event.pointerType) return;
        if (swiper.animating && params.preventInteractionOnTransition) return;
        if (!swiper.animating && params.cssMode && params.loop) swiper.loopFix();
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        let targetEl = e.target;
        if ("wrapper" === params.touchEventsTarget) if (!swiper.wrapperEl.contains(targetEl)) return;
        if ("which" in e && 3 === e.which) return;
        if ("button" in e && e.button > 0) return;
        if (data.isTouched && data.isMoved) return;
        const swipingClassHasValue = !!params.noSwipingClass && "" !== params.noSwipingClass;
        const eventPath = event.composedPath ? event.composedPath() : event.path;
        if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) targetEl = eventPath[0];
        const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
        const isTargetShadow = !!(e.target && e.target.shadowRoot);
        if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
            swiper.allowClick = true;
            return;
        }
        if (params.swipeHandler) if (!targetEl.closest(params.swipeHandler)) return;
        touches.currentX = e.pageX;
        touches.currentY = e.pageY;
        const startX = touches.currentX;
        const startY = touches.currentY;
        const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
        const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
        if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) if ("prevent" === edgeSwipeDetection) event.preventDefault(); else return;
        Object.assign(data, {
            isTouched: true,
            isMoved: false,
            allowTouchCallbacks: true,
            isScrolling: void 0,
            startMoving: void 0
        });
        touches.startX = startX;
        touches.startY = startY;
        data.touchStartTime = utils_now();
        swiper.allowClick = true;
        swiper.updateSize();
        swiper.swipeDirection = void 0;
        if (params.threshold > 0) data.allowThresholdMove = false;
        let preventDefault = true;
        if (targetEl.matches(data.focusableElements)) {
            preventDefault = false;
            if ("SELECT" === targetEl.nodeName) data.isTouched = false;
        }
        if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== targetEl) document.activeElement.blur();
        const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
        if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) e.preventDefault();
        if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) swiper.freeMode.onTouchStart();
        swiper.emit("touchStart", e);
    }
    function onTouchMove(event) {
        const document = ssr_window_esm_getDocument();
        const swiper = this;
        const data = swiper.touchEventsData;
        const {params, touches, rtlTranslate: rtl, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && "mouse" === event.pointerType) return;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        if (!data.isTouched) {
            if (data.startMoving && data.isScrolling) swiper.emit("touchMoveOpposite", e);
            return;
        }
        const pointerIndex = data.evCache.findIndex((cachedEv => cachedEv.pointerId === e.pointerId));
        if (pointerIndex >= 0) data.evCache[pointerIndex] = e;
        const targetTouch = data.evCache.length > 1 ? data.evCache[0] : e;
        const pageX = targetTouch.pageX;
        const pageY = targetTouch.pageY;
        if (e.preventedByNestedSwiper) {
            touches.startX = pageX;
            touches.startY = pageY;
            return;
        }
        if (!swiper.allowTouchMove) {
            if (!e.target.matches(data.focusableElements)) swiper.allowClick = false;
            if (data.isTouched) {
                Object.assign(touches, {
                    startX: pageX,
                    startY: pageY,
                    prevX: swiper.touches.currentX,
                    prevY: swiper.touches.currentY,
                    currentX: pageX,
                    currentY: pageY
                });
                data.touchStartTime = utils_now();
            }
            return;
        }
        if (params.touchReleaseOnEdges && !params.loop) if (swiper.isVertical()) {
            if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
                data.isTouched = false;
                data.isMoved = false;
                return;
            }
        } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) return;
        if (document.activeElement) if (e.target === document.activeElement && e.target.matches(data.focusableElements)) {
            data.isMoved = true;
            swiper.allowClick = false;
            return;
        }
        if (data.allowTouchCallbacks) swiper.emit("touchMove", e);
        if (e.targetTouches && e.targetTouches.length > 1) return;
        touches.currentX = pageX;
        touches.currentY = pageY;
        const diffX = touches.currentX - touches.startX;
        const diffY = touches.currentY - touches.startY;
        if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
        if ("undefined" === typeof data.isScrolling) {
            let touchAngle;
            if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) data.isScrolling = false; else if (diffX * diffX + diffY * diffY >= 25) {
                touchAngle = 180 * Math.atan2(Math.abs(diffY), Math.abs(diffX)) / Math.PI;
                data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
            }
        }
        if (data.isScrolling) swiper.emit("touchMoveOpposite", e);
        if ("undefined" === typeof data.startMoving) if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) data.startMoving = true;
        if (data.isScrolling || swiper.zoom && swiper.params.zoom && swiper.params.zoom.enabled && data.evCache.length > 1) {
            data.isTouched = false;
            return;
        }
        if (!data.startMoving) return;
        swiper.allowClick = false;
        if (!params.cssMode && e.cancelable) e.preventDefault();
        if (params.touchMoveStopPropagation && !params.nested) e.stopPropagation();
        let diff = swiper.isHorizontal() ? diffX : diffY;
        let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
        if (params.oneWayMovement) {
            diff = Math.abs(diff) * (rtl ? 1 : -1);
            touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
        }
        touches.diff = diff;
        diff *= params.touchRatio;
        if (rtl) {
            diff = -diff;
            touchesDiff = -touchesDiff;
        }
        const prevTouchesDirection = swiper.touchesDirection;
        swiper.swipeDirection = diff > 0 ? "prev" : "next";
        swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
        const isLoop = swiper.params.loop && !params.cssMode;
        if (!data.isMoved) {
            if (isLoop) swiper.loopFix({
                direction: swiper.swipeDirection
            });
            data.startTranslate = swiper.getTranslate();
            swiper.setTransition(0);
            if (swiper.animating) {
                const evt = new window.CustomEvent("transitionend", {
                    bubbles: true,
                    cancelable: true
                });
                swiper.wrapperEl.dispatchEvent(evt);
            }
            data.allowMomentumBounce = false;
            if (params.grabCursor && (true === swiper.allowSlideNext || true === swiper.allowSlidePrev)) swiper.setGrabCursor(true);
            swiper.emit("sliderFirstMove", e);
        }
        let loopFixed;
        if (data.isMoved && prevTouchesDirection !== swiper.touchesDirection && isLoop && Math.abs(diff) >= 1) {
            swiper.loopFix({
                direction: swiper.swipeDirection,
                setTranslate: true
            });
            loopFixed = true;
        }
        swiper.emit("sliderMove", e);
        data.isMoved = true;
        data.currentTranslate = diff + data.startTranslate;
        let disableParentSwiper = true;
        let resistanceRatio = params.resistanceRatio;
        if (params.touchReleaseOnEdges) resistanceRatio = 0;
        if (diff > 0) {
            if (isLoop && !loopFixed && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.size / 2 : swiper.minTranslate())) swiper.loopFix({
                direction: "prev",
                setTranslate: true,
                activeSlideIndex: 0
            });
            if (data.currentTranslate > swiper.minTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
            }
        } else if (diff < 0) {
            if (isLoop && !loopFixed && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.size / 2 : swiper.maxTranslate())) swiper.loopFix({
                direction: "next",
                setTranslate: true,
                activeSlideIndex: swiper.slides.length - ("auto" === params.slidesPerView ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
            });
            if (data.currentTranslate < swiper.maxTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
            }
        }
        if (disableParentSwiper) e.preventedByNestedSwiper = true;
        if (!swiper.allowSlideNext && "next" === swiper.swipeDirection && data.currentTranslate < data.startTranslate) data.currentTranslate = data.startTranslate;
        if (!swiper.allowSlidePrev && "prev" === swiper.swipeDirection && data.currentTranslate > data.startTranslate) data.currentTranslate = data.startTranslate;
        if (!swiper.allowSlidePrev && !swiper.allowSlideNext) data.currentTranslate = data.startTranslate;
        if (params.threshold > 0) if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
            if (!data.allowThresholdMove) {
                data.allowThresholdMove = true;
                touches.startX = touches.currentX;
                touches.startY = touches.currentY;
                data.currentTranslate = data.startTranslate;
                touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
                return;
            }
        } else {
            data.currentTranslate = data.startTranslate;
            return;
        }
        if (!params.followFinger || params.cssMode) return;
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) swiper.freeMode.onTouchMove();
        swiper.updateProgress(data.currentTranslate);
        swiper.setTranslate(data.currentTranslate);
    }
    function onTouchEnd(event) {
        const swiper = this;
        const data = swiper.touchEventsData;
        const pointerIndex = data.evCache.findIndex((cachedEv => cachedEv.pointerId === event.pointerId));
        if (pointerIndex >= 0) data.evCache.splice(pointerIndex, 1);
        if ([ "pointercancel", "pointerout", "pointerleave" ].includes(event.type)) {
            const proceed = "pointercancel" === event.type && (swiper.browser.isSafari || swiper.browser.isWebView);
            if (!proceed) return;
        }
        const {params, touches, rtlTranslate: rtl, slidesGrid, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && "mouse" === event.pointerType) return;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        if (data.allowTouchCallbacks) swiper.emit("touchEnd", e);
        data.allowTouchCallbacks = false;
        if (!data.isTouched) {
            if (data.isMoved && params.grabCursor) swiper.setGrabCursor(false);
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        if (params.grabCursor && data.isMoved && data.isTouched && (true === swiper.allowSlideNext || true === swiper.allowSlidePrev)) swiper.setGrabCursor(false);
        const touchEndTime = utils_now();
        const timeDiff = touchEndTime - data.touchStartTime;
        if (swiper.allowClick) {
            const pathTree = e.path || e.composedPath && e.composedPath();
            swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
            swiper.emit("tap click", e);
            if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) swiper.emit("doubleTap doubleClick", e);
        }
        data.lastClickTime = utils_now();
        utils_nextTick((() => {
            if (!swiper.destroyed) swiper.allowClick = true;
        }));
        if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || 0 === touches.diff || data.currentTranslate === data.startTranslate) {
            data.isTouched = false;
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        data.isTouched = false;
        data.isMoved = false;
        data.startMoving = false;
        let currentPos;
        if (params.followFinger) currentPos = rtl ? swiper.translate : -swiper.translate; else currentPos = -data.currentTranslate;
        if (params.cssMode) return;
        if (swiper.params.freeMode && params.freeMode.enabled) {
            swiper.freeMode.onTouchEnd({
                currentPos
            });
            return;
        }
        let stopIndex = 0;
        let groupSize = swiper.slidesSizesGrid[0];
        for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
            const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
            if ("undefined" !== typeof slidesGrid[i + increment]) {
                if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
                    stopIndex = i;
                    groupSize = slidesGrid[i + increment] - slidesGrid[i];
                }
            } else if (currentPos >= slidesGrid[i]) {
                stopIndex = i;
                groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
            }
        }
        let rewindFirstIndex = null;
        let rewindLastIndex = null;
        if (params.rewind) if (swiper.isBeginning) rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1; else if (swiper.isEnd) rewindFirstIndex = 0;
        const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
        const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
        if (timeDiff > params.longSwipesMs) {
            if (!params.longSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            if ("next" === swiper.swipeDirection) if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment); else swiper.slideTo(stopIndex);
            if ("prev" === swiper.swipeDirection) if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment); else if (null !== rewindLastIndex && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) swiper.slideTo(rewindLastIndex); else swiper.slideTo(stopIndex);
        } else {
            if (!params.shortSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
            if (!isNavButtonTarget) {
                if ("next" === swiper.swipeDirection) swiper.slideTo(null !== rewindFirstIndex ? rewindFirstIndex : stopIndex + increment);
                if ("prev" === swiper.swipeDirection) swiper.slideTo(null !== rewindLastIndex ? rewindLastIndex : stopIndex);
            } else if (e.target === swiper.navigation.nextEl) swiper.slideTo(stopIndex + increment); else swiper.slideTo(stopIndex);
        }
    }
    let timeout;
    function onResize() {
        const swiper = this;
        const {params, el} = swiper;
        if (el && 0 === el.offsetWidth) return;
        if (params.breakpoints) swiper.setBreakpoint();
        const {allowSlideNext, allowSlidePrev, snapGrid} = swiper;
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        swiper.allowSlideNext = true;
        swiper.allowSlidePrev = true;
        swiper.updateSize();
        swiper.updateSlides();
        swiper.updateSlidesClasses();
        const isVirtualLoop = isVirtual && params.loop;
        if (("auto" === params.slidesPerView || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) swiper.slideTo(swiper.slides.length - 1, 0, false, true); else if (swiper.params.loop && !isVirtual) swiper.slideToLoop(swiper.realIndex, 0, false, true); else swiper.slideTo(swiper.activeIndex, 0, false, true);
        if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
            clearTimeout(timeout);
            timeout = setTimeout((() => {
                if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) swiper.autoplay.resume();
            }), 500);
        }
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
    }
    function onClick(e) {
        const swiper = this;
        if (!swiper.enabled) return;
        if (!swiper.allowClick) {
            if (swiper.params.preventClicks) e.preventDefault();
            if (swiper.params.preventClicksPropagation && swiper.animating) {
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        }
    }
    function onScroll() {
        const swiper = this;
        const {wrapperEl, rtlTranslate, enabled} = swiper;
        if (!enabled) return;
        swiper.previousTranslate = swiper.translate;
        if (swiper.isHorizontal()) swiper.translate = -wrapperEl.scrollLeft; else swiper.translate = -wrapperEl.scrollTop;
        if (0 === swiper.translate) swiper.translate = 0;
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        if (0 === translatesDiff) newProgress = 0; else newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
        if (newProgress !== swiper.progress) swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
        swiper.emit("setTranslate", swiper.translate, false);
    }
    function onLoad(e) {
        const swiper = this;
        processLazyPreloader(swiper, e.target);
        swiper.update();
    }
    let dummyEventAttached = false;
    function dummyEventListener() {}
    const events = (swiper, method) => {
        const document = ssr_window_esm_getDocument();
        const {params, el, wrapperEl, device} = swiper;
        const capture = !!params.nested;
        const domMethod = "on" === method ? "addEventListener" : "removeEventListener";
        const swiperMethod = method;
        el[domMethod]("pointerdown", swiper.onTouchStart, {
            passive: false
        });
        document[domMethod]("pointermove", swiper.onTouchMove, {
            passive: false,
            capture
        });
        document[domMethod]("pointerup", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointercancel", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointerout", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointerleave", swiper.onTouchEnd, {
            passive: true
        });
        if (params.preventClicks || params.preventClicksPropagation) el[domMethod]("click", swiper.onClick, true);
        if (params.cssMode) wrapperEl[domMethod]("scroll", swiper.onScroll);
        if (params.updateOnWindowResize) swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true); else swiper[swiperMethod]("observerUpdate", onResize, true);
        el[domMethod]("load", swiper.onLoad, {
            capture: true
        });
    };
    function attachEvents() {
        const swiper = this;
        const document = ssr_window_esm_getDocument();
        const {params} = swiper;
        swiper.onTouchStart = onTouchStart.bind(swiper);
        swiper.onTouchMove = onTouchMove.bind(swiper);
        swiper.onTouchEnd = onTouchEnd.bind(swiper);
        if (params.cssMode) swiper.onScroll = onScroll.bind(swiper);
        swiper.onClick = onClick.bind(swiper);
        swiper.onLoad = onLoad.bind(swiper);
        if (!dummyEventAttached) {
            document.addEventListener("touchstart", dummyEventListener);
            dummyEventAttached = true;
        }
        events(swiper, "on");
    }
    function detachEvents() {
        const swiper = this;
        events(swiper, "off");
    }
    const core_events = {
        attachEvents,
        detachEvents
    };
    const isGridEnabled = (swiper, params) => swiper.grid && params.grid && params.grid.rows > 1;
    function setBreakpoint() {
        const swiper = this;
        const {realIndex, initialized, params, el} = swiper;
        const breakpoints = params.breakpoints;
        if (!breakpoints || breakpoints && 0 === Object.keys(breakpoints).length) return;
        const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
        if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
        const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
        const breakpointParams = breakpointOnlyParams || swiper.originalParams;
        const wasMultiRow = isGridEnabled(swiper, params);
        const isMultiRow = isGridEnabled(swiper, breakpointParams);
        const wasEnabled = params.enabled;
        if (wasMultiRow && !isMultiRow) {
            el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
            swiper.emitContainerClasses();
        } else if (!wasMultiRow && isMultiRow) {
            el.classList.add(`${params.containerModifierClass}grid`);
            if (breakpointParams.grid.fill && "column" === breakpointParams.grid.fill || !breakpointParams.grid.fill && "column" === params.grid.fill) el.classList.add(`${params.containerModifierClass}grid-column`);
            swiper.emitContainerClasses();
        }
        [ "navigation", "pagination", "scrollbar" ].forEach((prop => {
            const wasModuleEnabled = params[prop] && params[prop].enabled;
            const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
            if (wasModuleEnabled && !isModuleEnabled) swiper[prop].disable();
            if (!wasModuleEnabled && isModuleEnabled) swiper[prop].enable();
        }));
        const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
        const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
        if (directionChanged && initialized) swiper.changeDirection();
        utils_extend(swiper.params, breakpointParams);
        const isEnabled = swiper.params.enabled;
        Object.assign(swiper, {
            allowTouchMove: swiper.params.allowTouchMove,
            allowSlideNext: swiper.params.allowSlideNext,
            allowSlidePrev: swiper.params.allowSlidePrev
        });
        if (wasEnabled && !isEnabled) swiper.disable(); else if (!wasEnabled && isEnabled) swiper.enable();
        swiper.currentBreakpoint = breakpoint;
        swiper.emit("_beforeBreakpoint", breakpointParams);
        if (needsReLoop && initialized) {
            swiper.loopDestroy();
            swiper.loopCreate(realIndex);
            swiper.updateSlides();
        }
        swiper.emit("breakpoint", breakpointParams);
    }
    function getBreakpoint(breakpoints, base = "window", containerEl) {
        if (!breakpoints || "container" === base && !containerEl) return;
        let breakpoint = false;
        const window = ssr_window_esm_getWindow();
        const currentHeight = "window" === base ? window.innerHeight : containerEl.clientHeight;
        const points = Object.keys(breakpoints).map((point => {
            if ("string" === typeof point && 0 === point.indexOf("@")) {
                const minRatio = parseFloat(point.substr(1));
                const value = currentHeight * minRatio;
                return {
                    value,
                    point
                };
            }
            return {
                value: point,
                point
            };
        }));
        points.sort(((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10)));
        for (let i = 0; i < points.length; i += 1) {
            const {point, value} = points[i];
            if ("window" === base) {
                if (window.matchMedia(`(min-width: ${value}px)`).matches) breakpoint = point;
            } else if (value <= containerEl.clientWidth) breakpoint = point;
        }
        return breakpoint || "max";
    }
    const breakpoints = {
        setBreakpoint,
        getBreakpoint
    };
    function prepareClasses(entries, prefix) {
        const resultClasses = [];
        entries.forEach((item => {
            if ("object" === typeof item) Object.keys(item).forEach((classNames => {
                if (item[classNames]) resultClasses.push(prefix + classNames);
            })); else if ("string" === typeof item) resultClasses.push(prefix + item);
        }));
        return resultClasses;
    }
    function addClasses() {
        const swiper = this;
        const {classNames, params, rtl, el, device} = swiper;
        const suffixes = prepareClasses([ "initialized", params.direction, {
            "free-mode": swiper.params.freeMode && params.freeMode.enabled
        }, {
            autoheight: params.autoHeight
        }, {
            rtl
        }, {
            grid: params.grid && params.grid.rows > 1
        }, {
            "grid-column": params.grid && params.grid.rows > 1 && "column" === params.grid.fill
        }, {
            android: device.android
        }, {
            ios: device.ios
        }, {
            "css-mode": params.cssMode
        }, {
            centered: params.cssMode && params.centeredSlides
        }, {
            "watch-progress": params.watchSlidesProgress
        } ], params.containerModifierClass);
        classNames.push(...suffixes);
        el.classList.add(...classNames);
        swiper.emitContainerClasses();
    }
    function removeClasses_removeClasses() {
        const swiper = this;
        const {el, classNames} = swiper;
        el.classList.remove(...classNames);
        swiper.emitContainerClasses();
    }
    const classes = {
        addClasses,
        removeClasses: removeClasses_removeClasses
    };
    function checkOverflow() {
        const swiper = this;
        const {isLocked: wasLocked, params} = swiper;
        const {slidesOffsetBefore} = params;
        if (slidesOffsetBefore) {
            const lastSlideIndex = swiper.slides.length - 1;
            const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + 2 * slidesOffsetBefore;
            swiper.isLocked = swiper.size > lastSlideRightEdge;
        } else swiper.isLocked = 1 === swiper.snapGrid.length;
        if (true === params.allowSlideNext) swiper.allowSlideNext = !swiper.isLocked;
        if (true === params.allowSlidePrev) swiper.allowSlidePrev = !swiper.isLocked;
        if (wasLocked && wasLocked !== swiper.isLocked) swiper.isEnd = false;
        if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? "lock" : "unlock");
    }
    const check_overflow = {
        checkOverflow
    };
    const defaults = {
        init: true,
        direction: "horizontal",
        oneWayMovement: false,
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: false,
        updateOnWindowResize: true,
        resizeObserver: true,
        nested: false,
        createElements: false,
        enabled: true,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: false,
        userAgent: null,
        url: null,
        edgeSwipeDetection: false,
        edgeSwipeThreshold: 20,
        autoHeight: false,
        setWrapperSize: false,
        virtualTranslate: false,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: false,
        centeredSlides: false,
        centeredSlidesBounds: false,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: true,
        centerInsufficientSlides: false,
        watchOverflow: true,
        roundLengths: false,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        shortSwipes: true,
        longSwipes: true,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: true,
        allowTouchMove: true,
        threshold: 5,
        touchMoveStopPropagation: false,
        touchStartPreventDefault: true,
        touchStartForcePreventDefault: false,
        touchReleaseOnEdges: false,
        uniqueNavElements: true,
        resistance: true,
        resistanceRatio: .85,
        watchSlidesProgress: false,
        grabCursor: false,
        preventClicks: true,
        preventClicksPropagation: true,
        slideToClickedSlide: false,
        loop: false,
        loopedSlides: null,
        loopPreventsSliding: true,
        rewind: false,
        allowSlidePrev: true,
        allowSlideNext: true,
        swipeHandler: null,
        noSwiping: true,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: true,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideActiveClass: "swiper-slide-active",
        slideVisibleClass: "swiper-slide-visible",
        slideNextClass: "swiper-slide-next",
        slidePrevClass: "swiper-slide-prev",
        wrapperClass: "swiper-wrapper",
        lazyPreloaderClass: "swiper-lazy-preloader",
        lazyPreloadPrevNext: 0,
        runCallbacksOnInit: true,
        _emitClasses: false
    };
    function moduleExtendParams(params, allModulesParams) {
        return function extendParams(obj = {}) {
            const moduleParamName = Object.keys(obj)[0];
            const moduleParams = obj[moduleParamName];
            if ("object" !== typeof moduleParams || null === moduleParams) {
                utils_extend(allModulesParams, obj);
                return;
            }
            if ([ "navigation", "pagination", "scrollbar" ].indexOf(moduleParamName) >= 0 && true === params[moduleParamName]) params[moduleParamName] = {
                auto: true
            };
            if (!(moduleParamName in params && "enabled" in moduleParams)) {
                utils_extend(allModulesParams, obj);
                return;
            }
            if (true === params[moduleParamName]) params[moduleParamName] = {
                enabled: true
            };
            if ("object" === typeof params[moduleParamName] && !("enabled" in params[moduleParamName])) params[moduleParamName].enabled = true;
            if (!params[moduleParamName]) params[moduleParamName] = {
                enabled: false
            };
            utils_extend(allModulesParams, obj);
        };
    }
    const prototypes = {
        eventsEmitter: events_emitter,
        update,
        translate,
        transition,
        slide,
        loop,
        grabCursor: grab_cursor,
        events: core_events,
        breakpoints,
        checkOverflow: check_overflow,
        classes
    };
    const extendedDefaults = {};
    class core_Swiper {
        constructor(...args) {
            let el;
            let params;
            if (1 === args.length && args[0].constructor && "Object" === Object.prototype.toString.call(args[0]).slice(8, -1)) params = args[0]; else [el, params] = args;
            if (!params) params = {};
            params = utils_extend({}, params);
            if (el && !params.el) params.el = el;
            const document = ssr_window_esm_getDocument();
            if (params.el && "string" === typeof params.el && document.querySelectorAll(params.el).length > 1) {
                const swipers = [];
                document.querySelectorAll(params.el).forEach((containerEl => {
                    const newParams = utils_extend({}, params, {
                        el: containerEl
                    });
                    swipers.push(new core_Swiper(newParams));
                }));
                return swipers;
            }
            const swiper = this;
            swiper.__swiper__ = true;
            swiper.support = getSupport();
            swiper.device = getDevice({
                userAgent: params.userAgent
            });
            swiper.browser = getBrowser();
            swiper.eventsListeners = {};
            swiper.eventsAnyListeners = [];
            swiper.modules = [ ...swiper.__modules__ ];
            if (params.modules && Array.isArray(params.modules)) swiper.modules.push(...params.modules);
            const allModulesParams = {};
            swiper.modules.forEach((mod => {
                mod({
                    params,
                    swiper,
                    extendParams: moduleExtendParams(params, allModulesParams),
                    on: swiper.on.bind(swiper),
                    once: swiper.once.bind(swiper),
                    off: swiper.off.bind(swiper),
                    emit: swiper.emit.bind(swiper)
                });
            }));
            const swiperParams = utils_extend({}, defaults, allModulesParams);
            swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
            swiper.originalParams = utils_extend({}, swiper.params);
            swiper.passedParams = utils_extend({}, params);
            if (swiper.params && swiper.params.on) Object.keys(swiper.params.on).forEach((eventName => {
                swiper.on(eventName, swiper.params.on[eventName]);
            }));
            if (swiper.params && swiper.params.onAny) swiper.onAny(swiper.params.onAny);
            Object.assign(swiper, {
                enabled: swiper.params.enabled,
                el,
                classNames: [],
                slides: [],
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal() {
                    return "horizontal" === swiper.params.direction;
                },
                isVertical() {
                    return "vertical" === swiper.params.direction;
                },
                activeIndex: 0,
                realIndex: 0,
                isBeginning: true,
                isEnd: false,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: false,
                allowSlideNext: swiper.params.allowSlideNext,
                allowSlidePrev: swiper.params.allowSlidePrev,
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: swiper.params.focusableElements,
                    lastClickTime: 0,
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    startMoving: void 0,
                    evCache: []
                },
                allowClick: true,
                allowTouchMove: swiper.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            });
            swiper.emit("_swiper");
            if (swiper.params.init) swiper.init();
            return swiper;
        }
        getSlideIndex(slideEl) {
            const {slidesEl, params} = this;
            const slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
            const firstSlideIndex = utils_elementIndex(slides[0]);
            return utils_elementIndex(slideEl) - firstSlideIndex;
        }
        getSlideIndexByData(index) {
            return this.getSlideIndex(this.slides.filter((slideEl => 1 * slideEl.getAttribute("data-swiper-slide-index") === index))[0]);
        }
        recalcSlides() {
            const swiper = this;
            const {slidesEl, params} = swiper;
            swiper.slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
        }
        enable() {
            const swiper = this;
            if (swiper.enabled) return;
            swiper.enabled = true;
            if (swiper.params.grabCursor) swiper.setGrabCursor();
            swiper.emit("enable");
        }
        disable() {
            const swiper = this;
            if (!swiper.enabled) return;
            swiper.enabled = false;
            if (swiper.params.grabCursor) swiper.unsetGrabCursor();
            swiper.emit("disable");
        }
        setProgress(progress, speed) {
            const swiper = this;
            progress = Math.min(Math.max(progress, 0), 1);
            const min = swiper.minTranslate();
            const max = swiper.maxTranslate();
            const current = (max - min) * progress + min;
            swiper.translateTo(current, "undefined" === typeof speed ? 0 : speed);
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        emitContainerClasses() {
            const swiper = this;
            if (!swiper.params._emitClasses || !swiper.el) return;
            const cls = swiper.el.className.split(" ").filter((className => 0 === className.indexOf("swiper") || 0 === className.indexOf(swiper.params.containerModifierClass)));
            swiper.emit("_containerClasses", cls.join(" "));
        }
        getSlideClasses(slideEl) {
            const swiper = this;
            if (swiper.destroyed) return "";
            return slideEl.className.split(" ").filter((className => 0 === className.indexOf("swiper-slide") || 0 === className.indexOf(swiper.params.slideClass))).join(" ");
        }
        emitSlidesClasses() {
            const swiper = this;
            if (!swiper.params._emitClasses || !swiper.el) return;
            const updates = [];
            swiper.slides.forEach((slideEl => {
                const classNames = swiper.getSlideClasses(slideEl);
                updates.push({
                    slideEl,
                    classNames
                });
                swiper.emit("_slideClass", slideEl, classNames);
            }));
            swiper.emit("_slideClasses", updates);
        }
        slidesPerViewDynamic(view = "current", exact = false) {
            const swiper = this;
            const {params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex} = swiper;
            let spv = 1;
            if (params.centeredSlides) {
                let slideSize = slides[activeIndex].swiperSlideSize;
                let breakLoop;
                for (let i = activeIndex + 1; i < slides.length; i += 1) if (slides[i] && !breakLoop) {
                    slideSize += slides[i].swiperSlideSize;
                    spv += 1;
                    if (slideSize > swiperSize) breakLoop = true;
                }
                for (let i = activeIndex - 1; i >= 0; i -= 1) if (slides[i] && !breakLoop) {
                    slideSize += slides[i].swiperSlideSize;
                    spv += 1;
                    if (slideSize > swiperSize) breakLoop = true;
                }
            } else if ("current" === view) for (let i = activeIndex + 1; i < slides.length; i += 1) {
                const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
                if (slideInView) spv += 1;
            } else for (let i = activeIndex - 1; i >= 0; i -= 1) {
                const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
                if (slideInView) spv += 1;
            }
            return spv;
        }
        update() {
            const swiper = this;
            if (!swiper || swiper.destroyed) return;
            const {snapGrid, params} = swiper;
            if (params.breakpoints) swiper.setBreakpoint();
            [ ...swiper.el.querySelectorAll('[loading="lazy"]') ].forEach((imageEl => {
                if (imageEl.complete) processLazyPreloader(swiper, imageEl);
            }));
            swiper.updateSize();
            swiper.updateSlides();
            swiper.updateProgress();
            swiper.updateSlidesClasses();
            function setTranslate() {
                const translateValue = swiper.rtlTranslate ? -1 * swiper.translate : swiper.translate;
                const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
                swiper.setTranslate(newTranslate);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            let translated;
            if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
                setTranslate();
                if (swiper.params.autoHeight) swiper.updateAutoHeight();
            } else {
                if (("auto" === swiper.params.slidesPerView || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true); else translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
                if (!translated) setTranslate();
            }
            if (params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
            swiper.emit("update");
        }
        changeDirection(newDirection, needUpdate = true) {
            const swiper = this;
            const currentDirection = swiper.params.direction;
            if (!newDirection) newDirection = "horizontal" === currentDirection ? "vertical" : "horizontal";
            if (newDirection === currentDirection || "horizontal" !== newDirection && "vertical" !== newDirection) return swiper;
            swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
            swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
            swiper.emitContainerClasses();
            swiper.params.direction = newDirection;
            swiper.slides.forEach((slideEl => {
                if ("vertical" === newDirection) slideEl.style.width = ""; else slideEl.style.height = "";
            }));
            swiper.emit("changeDirection");
            if (needUpdate) swiper.update();
            return swiper;
        }
        changeLanguageDirection(direction) {
            const swiper = this;
            if (swiper.rtl && "rtl" === direction || !swiper.rtl && "ltr" === direction) return;
            swiper.rtl = "rtl" === direction;
            swiper.rtlTranslate = "horizontal" === swiper.params.direction && swiper.rtl;
            if (swiper.rtl) {
                swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
                swiper.el.dir = "rtl";
            } else {
                swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
                swiper.el.dir = "ltr";
            }
            swiper.update();
        }
        mount(element) {
            const swiper = this;
            if (swiper.mounted) return true;
            let el = element || swiper.params.el;
            if ("string" === typeof el) el = document.querySelector(el);
            if (!el) return false;
            el.swiper = swiper;
            if (el.shadowEl) swiper.isElement = true;
            const getWrapperSelector = () => `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
            const getWrapper = () => {
                if (el && el.shadowRoot && el.shadowRoot.querySelector) {
                    const res = el.shadowRoot.querySelector(getWrapperSelector());
                    return res;
                }
                return utils_elementChildren(el, getWrapperSelector())[0];
            };
            let wrapperEl = getWrapper();
            if (!wrapperEl && swiper.params.createElements) {
                wrapperEl = utils_createElement("div", swiper.params.wrapperClass);
                el.append(wrapperEl);
                utils_elementChildren(el, `.${swiper.params.slideClass}`).forEach((slideEl => {
                    wrapperEl.append(slideEl);
                }));
            }
            Object.assign(swiper, {
                el,
                wrapperEl,
                slidesEl: swiper.isElement ? el : wrapperEl,
                mounted: true,
                rtl: "rtl" === el.dir.toLowerCase() || "rtl" === elementStyle(el, "direction"),
                rtlTranslate: "horizontal" === swiper.params.direction && ("rtl" === el.dir.toLowerCase() || "rtl" === elementStyle(el, "direction")),
                wrongRTL: "-webkit-box" === elementStyle(wrapperEl, "display")
            });
            return true;
        }
        init(el) {
            const swiper = this;
            if (swiper.initialized) return swiper;
            const mounted = swiper.mount(el);
            if (false === mounted) return swiper;
            swiper.emit("beforeInit");
            if (swiper.params.breakpoints) swiper.setBreakpoint();
            swiper.addClasses();
            swiper.updateSize();
            swiper.updateSlides();
            if (swiper.params.watchOverflow) swiper.checkOverflow();
            if (swiper.params.grabCursor && swiper.enabled) swiper.setGrabCursor();
            if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true); else swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
            if (swiper.params.loop) swiper.loopCreate();
            swiper.attachEvents();
            [ ...swiper.el.querySelectorAll('[loading="lazy"]') ].forEach((imageEl => {
                if (imageEl.complete) processLazyPreloader(swiper, imageEl); else imageEl.addEventListener("load", (e => {
                    processLazyPreloader(swiper, e.target);
                }));
            }));
            preload(swiper);
            swiper.initialized = true;
            preload(swiper);
            swiper.emit("init");
            swiper.emit("afterInit");
            return swiper;
        }
        destroy(deleteInstance = true, cleanStyles = true) {
            const swiper = this;
            const {params, el, wrapperEl, slides} = swiper;
            if ("undefined" === typeof swiper.params || swiper.destroyed) return null;
            swiper.emit("beforeDestroy");
            swiper.initialized = false;
            swiper.detachEvents();
            if (params.loop) swiper.loopDestroy();
            if (cleanStyles) {
                swiper.removeClasses();
                el.removeAttribute("style");
                wrapperEl.removeAttribute("style");
                if (slides && slides.length) slides.forEach((slideEl => {
                    slideEl.classList.remove(params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
                    slideEl.removeAttribute("style");
                    slideEl.removeAttribute("data-swiper-slide-index");
                }));
            }
            swiper.emit("destroy");
            Object.keys(swiper.eventsListeners).forEach((eventName => {
                swiper.off(eventName);
            }));
            if (false !== deleteInstance) {
                swiper.el.swiper = null;
                deleteProps(swiper);
            }
            swiper.destroyed = true;
            return null;
        }
        static extendDefaults(newDefaults) {
            utils_extend(extendedDefaults, newDefaults);
        }
        static get extendedDefaults() {
            return extendedDefaults;
        }
        static get defaults() {
            return defaults;
        }
        static installModule(mod) {
            if (!core_Swiper.prototype.__modules__) core_Swiper.prototype.__modules__ = [];
            const modules = core_Swiper.prototype.__modules__;
            if ("function" === typeof mod && modules.indexOf(mod) < 0) modules.push(mod);
        }
        static use(module) {
            if (Array.isArray(module)) {
                module.forEach((m => core_Swiper.installModule(m)));
                return core_Swiper;
            }
            core_Swiper.installModule(module);
            return core_Swiper;
        }
    }
    Object.keys(prototypes).forEach((prototypeGroup => {
        Object.keys(prototypes[prototypeGroup]).forEach((protoMethod => {
            core_Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
        }));
    }));
    core_Swiper.use([ Resize, Observer ]);
    const core = core_Swiper;
    function Mousewheel({swiper, extendParams, on, emit}) {
        const window = ssr_window_esm_getWindow();
        extendParams({
            mousewheel: {
                enabled: false,
                releaseOnEdges: false,
                invert: false,
                forceToAxis: false,
                sensitivity: 1,
                eventsTarget: "container",
                thresholdDelta: null,
                thresholdTime: null
            }
        });
        swiper.mousewheel = {
            enabled: false
        };
        let timeout;
        let lastScrollTime = utils_now();
        let lastEventBeforeSnap;
        const recentWheelEvents = [];
        function normalize(e) {
            const PIXEL_STEP = 10;
            const LINE_HEIGHT = 40;
            const PAGE_HEIGHT = 800;
            let sX = 0;
            let sY = 0;
            let pX = 0;
            let pY = 0;
            if ("detail" in e) sY = e.detail;
            if ("wheelDelta" in e) sY = -e.wheelDelta / 120;
            if ("wheelDeltaY" in e) sY = -e.wheelDeltaY / 120;
            if ("wheelDeltaX" in e) sX = -e.wheelDeltaX / 120;
            if ("axis" in e && e.axis === e.HORIZONTAL_AXIS) {
                sX = sY;
                sY = 0;
            }
            pX = sX * PIXEL_STEP;
            pY = sY * PIXEL_STEP;
            if ("deltaY" in e) pY = e.deltaY;
            if ("deltaX" in e) pX = e.deltaX;
            if (e.shiftKey && !pX) {
                pX = pY;
                pY = 0;
            }
            if ((pX || pY) && e.deltaMode) if (1 === e.deltaMode) {
                pX *= LINE_HEIGHT;
                pY *= LINE_HEIGHT;
            } else {
                pX *= PAGE_HEIGHT;
                pY *= PAGE_HEIGHT;
            }
            if (pX && !sX) sX = pX < 1 ? -1 : 1;
            if (pY && !sY) sY = pY < 1 ? -1 : 1;
            return {
                spinX: sX,
                spinY: sY,
                pixelX: pX,
                pixelY: pY
            };
        }
        function handleMouseEnter() {
            if (!swiper.enabled) return;
            swiper.mouseEntered = true;
        }
        function handleMouseLeave() {
            if (!swiper.enabled) return;
            swiper.mouseEntered = false;
        }
        function animateSlider(newEvent) {
            if (swiper.params.mousewheel.thresholdDelta && newEvent.delta < swiper.params.mousewheel.thresholdDelta) return false;
            if (swiper.params.mousewheel.thresholdTime && utils_now() - lastScrollTime < swiper.params.mousewheel.thresholdTime) return false;
            if (newEvent.delta >= 6 && utils_now() - lastScrollTime < 60) return true;
            if (newEvent.direction < 0) {
                if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
                    swiper.slideNext();
                    emit("scroll", newEvent.raw);
                }
            } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
                swiper.slidePrev();
                emit("scroll", newEvent.raw);
            }
            lastScrollTime = (new window.Date).getTime();
            return false;
        }
        function releaseScroll(newEvent) {
            const params = swiper.params.mousewheel;
            if (newEvent.direction < 0) {
                if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) return true;
            } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) return true;
            return false;
        }
        function handle(event) {
            let e = event;
            let disableParentSwiper = true;
            if (!swiper.enabled) return;
            const params = swiper.params.mousewheel;
            if (swiper.params.cssMode) e.preventDefault();
            let targetEl = swiper.el;
            if ("container" !== swiper.params.mousewheel.eventsTarget) targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
            const targetElContainsTarget = targetEl && targetEl.contains(e.target);
            if (!swiper.mouseEntered && !targetElContainsTarget && !params.releaseOnEdges) return true;
            if (e.originalEvent) e = e.originalEvent;
            let delta = 0;
            const rtlFactor = swiper.rtlTranslate ? -1 : 1;
            const data = normalize(e);
            if (params.forceToAxis) if (swiper.isHorizontal()) if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = -data.pixelX * rtlFactor; else return true; else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = -data.pixelY; else return true; else delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
            if (0 === delta) return true;
            if (params.invert) delta = -delta;
            let positions = swiper.getTranslate() + delta * params.sensitivity;
            if (positions >= swiper.minTranslate()) positions = swiper.minTranslate();
            if (positions <= swiper.maxTranslate()) positions = swiper.maxTranslate();
            disableParentSwiper = swiper.params.loop ? true : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());
            if (disableParentSwiper && swiper.params.nested) e.stopPropagation();
            if (!swiper.params.freeMode || !swiper.params.freeMode.enabled) {
                const newEvent = {
                    time: utils_now(),
                    delta: Math.abs(delta),
                    direction: Math.sign(delta),
                    raw: event
                };
                if (recentWheelEvents.length >= 2) recentWheelEvents.shift();
                const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : void 0;
                recentWheelEvents.push(newEvent);
                if (prevEvent) {
                    if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) animateSlider(newEvent);
                } else animateSlider(newEvent);
                if (releaseScroll(newEvent)) return true;
            } else {
                const newEvent = {
                    time: utils_now(),
                    delta: Math.abs(delta),
                    direction: Math.sign(delta)
                };
                const ignoreWheelEvents = lastEventBeforeSnap && newEvent.time < lastEventBeforeSnap.time + 500 && newEvent.delta <= lastEventBeforeSnap.delta && newEvent.direction === lastEventBeforeSnap.direction;
                if (!ignoreWheelEvents) {
                    lastEventBeforeSnap = void 0;
                    let position = swiper.getTranslate() + delta * params.sensitivity;
                    const wasBeginning = swiper.isBeginning;
                    const wasEnd = swiper.isEnd;
                    if (position >= swiper.minTranslate()) position = swiper.minTranslate();
                    if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();
                    swiper.setTransition(0);
                    swiper.setTranslate(position);
                    swiper.updateProgress();
                    swiper.updateActiveIndex();
                    swiper.updateSlidesClasses();
                    if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) swiper.updateSlidesClasses();
                    if (swiper.params.loop) swiper.loopFix({
                        direction: newEvent.direction < 0 ? "next" : "prev",
                        byMousewheel: true
                    });
                    if (swiper.params.freeMode.sticky) {
                        clearTimeout(timeout);
                        timeout = void 0;
                        if (recentWheelEvents.length >= 15) recentWheelEvents.shift();
                        const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : void 0;
                        const firstEvent = recentWheelEvents[0];
                        recentWheelEvents.push(newEvent);
                        if (prevEvent && (newEvent.delta > prevEvent.delta || newEvent.direction !== prevEvent.direction)) recentWheelEvents.splice(0); else if (recentWheelEvents.length >= 15 && newEvent.time - firstEvent.time < 500 && firstEvent.delta - newEvent.delta >= 1 && newEvent.delta <= 6) {
                            const snapToThreshold = delta > 0 ? .8 : .2;
                            lastEventBeforeSnap = newEvent;
                            recentWheelEvents.splice(0);
                            timeout = utils_nextTick((() => {
                                swiper.slideToClosest(swiper.params.speed, true, void 0, snapToThreshold);
                            }), 0);
                        }
                        if (!timeout) timeout = utils_nextTick((() => {
                            const snapToThreshold = .5;
                            lastEventBeforeSnap = newEvent;
                            recentWheelEvents.splice(0);
                            swiper.slideToClosest(swiper.params.speed, true, void 0, snapToThreshold);
                        }), 500);
                    }
                    if (!ignoreWheelEvents) emit("scroll", e);
                    if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) swiper.autoplay.stop();
                    if (position === swiper.minTranslate() || position === swiper.maxTranslate()) return true;
                }
            }
            if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
            return false;
        }
        function events(method) {
            let targetEl = swiper.el;
            if ("container" !== swiper.params.mousewheel.eventsTarget) targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
            targetEl[method]("mouseenter", handleMouseEnter);
            targetEl[method]("mouseleave", handleMouseLeave);
            targetEl[method]("wheel", handle);
        }
        function enable() {
            if (swiper.params.cssMode) {
                swiper.wrapperEl.removeEventListener("wheel", handle);
                return true;
            }
            if (swiper.mousewheel.enabled) return false;
            events("addEventListener");
            swiper.mousewheel.enabled = true;
            return true;
        }
        function disable() {
            if (swiper.params.cssMode) {
                swiper.wrapperEl.addEventListener(event, handle);
                return true;
            }
            if (!swiper.mousewheel.enabled) return false;
            events("removeEventListener");
            swiper.mousewheel.enabled = false;
            return true;
        }
        on("init", (() => {
            if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) disable();
            if (swiper.params.mousewheel.enabled) enable();
        }));
        on("destroy", (() => {
            if (swiper.params.cssMode) enable();
            if (swiper.mousewheel.enabled) disable();
        }));
        Object.assign(swiper.mousewheel, {
            enable,
            disable
        });
    }
    function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
        if (swiper.params.createElements) Object.keys(checkProps).forEach((key => {
            if (!params[key] && true === params.auto) {
                let element = utils_elementChildren(swiper.el, `.${checkProps[key]}`)[0];
                if (!element) {
                    element = utils_createElement("div", checkProps[key]);
                    element.className = checkProps[key];
                    swiper.el.append(element);
                }
                params[key] = element;
                originalParams[key] = element;
            }
        }));
        return params;
    }
    function Navigation({swiper, extendParams, on, emit}) {
        extendParams({
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: false,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock",
                navigationDisabledClass: "swiper-navigation-disabled"
            }
        });
        swiper.navigation = {
            nextEl: null,
            prevEl: null
        };
        const makeElementsArray = el => {
            if (!Array.isArray(el)) el = [ el ].filter((e => !!e));
            return el;
        };
        function getEl(el) {
            let res;
            if (el && "string" === typeof el && swiper.isElement) {
                res = swiper.el.shadowRoot.querySelector(el);
                if (res) return res;
            }
            if (el) {
                if ("string" === typeof el) res = [ ...document.querySelectorAll(el) ];
                if (swiper.params.uniqueNavElements && "string" === typeof el && res.length > 1 && 1 === swiper.el.querySelectorAll(el).length) res = swiper.el.querySelector(el);
            }
            if (el && !res) return el;
            return res;
        }
        function toggleEl(el, disabled) {
            const params = swiper.params.navigation;
            el = makeElementsArray(el);
            el.forEach((subEl => {
                if (subEl) {
                    subEl.classList[disabled ? "add" : "remove"](...params.disabledClass.split(" "));
                    if ("BUTTON" === subEl.tagName) subEl.disabled = disabled;
                    if (swiper.params.watchOverflow && swiper.enabled) subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
                }
            }));
        }
        function update() {
            const {nextEl, prevEl} = swiper.navigation;
            if (swiper.params.loop) {
                toggleEl(prevEl, false);
                toggleEl(nextEl, false);
                return;
            }
            toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
            toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
        }
        function onPrevClick(e) {
            e.preventDefault();
            if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
            swiper.slidePrev();
            emit("navigationPrev");
        }
        function onNextClick(e) {
            e.preventDefault();
            if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
            swiper.slideNext();
            emit("navigationNext");
        }
        function init() {
            const params = swiper.params.navigation;
            swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
                nextEl: "swiper-button-next",
                prevEl: "swiper-button-prev"
            });
            if (!(params.nextEl || params.prevEl)) return;
            let nextEl = getEl(params.nextEl);
            let prevEl = getEl(params.prevEl);
            Object.assign(swiper.navigation, {
                nextEl,
                prevEl
            });
            nextEl = makeElementsArray(nextEl);
            prevEl = makeElementsArray(prevEl);
            const initButton = (el, dir) => {
                if (el) el.addEventListener("click", "next" === dir ? onNextClick : onPrevClick);
                if (!swiper.enabled && el) el.classList.add(...params.lockClass.split(" "));
            };
            nextEl.forEach((el => initButton(el, "next")));
            prevEl.forEach((el => initButton(el, "prev")));
        }
        function destroy() {
            let {nextEl, prevEl} = swiper.navigation;
            nextEl = makeElementsArray(nextEl);
            prevEl = makeElementsArray(prevEl);
            const destroyButton = (el, dir) => {
                el.removeEventListener("click", "next" === dir ? onNextClick : onPrevClick);
                el.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
            };
            nextEl.forEach((el => destroyButton(el, "next")));
            prevEl.forEach((el => destroyButton(el, "prev")));
        }
        on("init", (() => {
            if (false === swiper.params.navigation.enabled) disable(); else {
                init();
                update();
            }
        }));
        on("toEdge fromEdge lock unlock", (() => {
            update();
        }));
        on("destroy", (() => {
            destroy();
        }));
        on("enable disable", (() => {
            let {nextEl, prevEl} = swiper.navigation;
            nextEl = makeElementsArray(nextEl);
            prevEl = makeElementsArray(prevEl);
            [ ...nextEl, ...prevEl ].filter((el => !!el)).forEach((el => el.classList[swiper.enabled ? "remove" : "add"](swiper.params.navigation.lockClass)));
        }));
        on("click", ((_s, e) => {
            let {nextEl, prevEl} = swiper.navigation;
            nextEl = makeElementsArray(nextEl);
            prevEl = makeElementsArray(prevEl);
            const targetEl = e.target;
            if (swiper.params.navigation.hideOnClick && !prevEl.includes(targetEl) && !nextEl.includes(targetEl)) {
                if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
                let isHidden;
                if (nextEl.length) isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass); else if (prevEl.length) isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
                if (true === isHidden) emit("navigationShow"); else emit("navigationHide");
                [ ...nextEl, ...prevEl ].filter((el => !!el)).forEach((el => el.classList.toggle(swiper.params.navigation.hiddenClass)));
            }
        }));
        const enable = () => {
            swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(" "));
            init();
            update();
        };
        const disable = () => {
            swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(" "));
            destroy();
        };
        Object.assign(swiper.navigation, {
            enable,
            disable,
            update,
            init,
            destroy
        });
    }
    function classes_to_selector_classesToSelector(classes = "") {
        return `.${classes.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
    }
    function Pagination({swiper, extendParams, on, emit}) {
        const pfx = "swiper-pagination";
        extendParams({
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: false,
                hideOnClick: false,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: false,
                type: "bullets",
                dynamicBullets: false,
                dynamicMainBullets: 1,
                formatFractionCurrent: number => number,
                formatFractionTotal: number => number,
                bulletClass: `${pfx}-bullet`,
                bulletActiveClass: `${pfx}-bullet-active`,
                modifierClass: `${pfx}-`,
                currentClass: `${pfx}-current`,
                totalClass: `${pfx}-total`,
                hiddenClass: `${pfx}-hidden`,
                progressbarFillClass: `${pfx}-progressbar-fill`,
                progressbarOppositeClass: `${pfx}-progressbar-opposite`,
                clickableClass: `${pfx}-clickable`,
                lockClass: `${pfx}-lock`,
                horizontalClass: `${pfx}-horizontal`,
                verticalClass: `${pfx}-vertical`,
                paginationDisabledClass: `${pfx}-disabled`
            }
        });
        swiper.pagination = {
            el: null,
            bullets: []
        };
        let bulletSize;
        let dynamicBulletIndex = 0;
        const makeElementsArray = el => {
            if (!Array.isArray(el)) el = [ el ].filter((e => !!e));
            return el;
        };
        function isPaginationDisabled() {
            return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && 0 === swiper.pagination.el.length;
        }
        function setSideBullets(bulletEl, position) {
            const {bulletActiveClass} = swiper.params.pagination;
            if (!bulletEl) return;
            bulletEl = bulletEl[`${"prev" === position ? "previous" : "next"}ElementSibling`];
            if (bulletEl) {
                bulletEl.classList.add(`${bulletActiveClass}-${position}`);
                bulletEl = bulletEl[`${"prev" === position ? "previous" : "next"}ElementSibling`];
                if (bulletEl) bulletEl.classList.add(`${bulletActiveClass}-${position}-${position}`);
            }
        }
        function onBulletClick(e) {
            const bulletEl = e.target.closest(classes_to_selector_classesToSelector(swiper.params.pagination.bulletClass));
            if (!bulletEl) return;
            e.preventDefault();
            const index = utils_elementIndex(bulletEl) * swiper.params.slidesPerGroup;
            if (swiper.params.loop) {
                if (swiper.realIndex === index) return;
                if (index < swiper.loopedSlides || index > swiper.slides.length - swiper.loopedSlides) swiper.loopFix({
                    direction: index < swiper.loopedSlides ? "prev" : "next",
                    activeSlideIndex: index,
                    slideTo: false
                });
                swiper.slideToLoop(index);
            } else swiper.slideTo(index);
        }
        function update() {
            const rtl = swiper.rtl;
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            let el = swiper.pagination.el;
            el = makeElementsArray(el);
            let current;
            const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
            const total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
            if (swiper.params.loop) current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex; else if ("undefined" !== typeof swiper.snapIndex) current = swiper.snapIndex; else current = swiper.activeIndex || 0;
            if ("bullets" === params.type && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
                const bullets = swiper.pagination.bullets;
                let firstIndex;
                let lastIndex;
                let midIndex;
                if (params.dynamicBullets) {
                    bulletSize = elementOuterSize(bullets[0], swiper.isHorizontal() ? "width" : "height", true);
                    el.forEach((subEl => {
                        subEl.style[swiper.isHorizontal() ? "width" : "height"] = `${bulletSize * (params.dynamicMainBullets + 4)}px`;
                    }));
                    if (params.dynamicMainBullets > 1 && void 0 !== swiper.previousIndex) {
                        dynamicBulletIndex += current - (swiper.previousIndex || 0);
                        if (dynamicBulletIndex > params.dynamicMainBullets - 1) dynamicBulletIndex = params.dynamicMainBullets - 1; else if (dynamicBulletIndex < 0) dynamicBulletIndex = 0;
                    }
                    firstIndex = Math.max(current - dynamicBulletIndex, 0);
                    lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
                    midIndex = (lastIndex + firstIndex) / 2;
                }
                bullets.forEach((bulletEl => {
                    const classesToRemove = [ ...[ "", "-next", "-next-next", "-prev", "-prev-prev", "-main" ].map((suffix => `${params.bulletActiveClass}${suffix}`)) ].map((s => "string" === typeof s && s.includes(" ") ? s.split(" ") : s)).flat();
                    bulletEl.classList.remove(...classesToRemove);
                }));
                if (el.length > 1) bullets.forEach((bullet => {
                    const bulletIndex = utils_elementIndex(bullet);
                    if (bulletIndex === current) bullet.classList.add(...params.bulletActiveClass.split(" "));
                    if (params.dynamicBullets) {
                        if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) bullet.classList.add(...`${params.bulletActiveClass}-main`.split(" "));
                        if (bulletIndex === firstIndex) setSideBullets(bullet, "prev");
                        if (bulletIndex === lastIndex) setSideBullets(bullet, "next");
                    }
                })); else {
                    const bullet = bullets[current];
                    if (bullet) bullet.classList.add(...params.bulletActiveClass.split(" "));
                    if (params.dynamicBullets) {
                        const firstDisplayedBullet = bullets[firstIndex];
                        const lastDisplayedBullet = bullets[lastIndex];
                        for (let i = firstIndex; i <= lastIndex; i += 1) if (bullets[i]) bullets[i].classList.add(...`${params.bulletActiveClass}-main`.split(" "));
                        setSideBullets(firstDisplayedBullet, "prev");
                        setSideBullets(lastDisplayedBullet, "next");
                    }
                }
                if (params.dynamicBullets) {
                    const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
                    const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
                    const offsetProp = rtl ? "right" : "left";
                    bullets.forEach((bullet => {
                        bullet.style[swiper.isHorizontal() ? offsetProp : "top"] = `${bulletsOffset}px`;
                    }));
                }
            }
            el.forEach(((subEl, subElIndex) => {
                if ("fraction" === params.type) {
                    subEl.querySelectorAll(classes_to_selector_classesToSelector(params.currentClass)).forEach((fractionEl => {
                        fractionEl.textContent = params.formatFractionCurrent(current + 1);
                    }));
                    subEl.querySelectorAll(classes_to_selector_classesToSelector(params.totalClass)).forEach((totalEl => {
                        totalEl.textContent = params.formatFractionTotal(total);
                    }));
                }
                if ("progressbar" === params.type) {
                    let progressbarDirection;
                    if (params.progressbarOpposite) progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal"; else progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
                    const scale = (current + 1) / total;
                    let scaleX = 1;
                    let scaleY = 1;
                    if ("horizontal" === progressbarDirection) scaleX = scale; else scaleY = scale;
                    subEl.querySelectorAll(classes_to_selector_classesToSelector(params.progressbarFillClass)).forEach((progressEl => {
                        progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
                        progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
                    }));
                }
                if ("custom" === params.type && params.renderCustom) {
                    subEl.innerHTML = params.renderCustom(swiper, current + 1, total);
                    if (0 === subElIndex) emit("paginationRender", subEl);
                } else {
                    if (0 === subElIndex) emit("paginationRender", subEl);
                    emit("paginationUpdate", subEl);
                }
                if (swiper.params.watchOverflow && swiper.enabled) subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
            }));
        }
        function render() {
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
            let el = swiper.pagination.el;
            el = makeElementsArray(el);
            let paginationHTML = "";
            if ("bullets" === params.type) {
                let numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
                if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) numberOfBullets = slidesLength;
                for (let i = 0; i < numberOfBullets; i += 1) if (params.renderBullet) paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass); else paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
            }
            if ("fraction" === params.type) if (params.renderFraction) paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass); else paginationHTML = `<span class="${params.currentClass}"></span>` + " / " + `<span class="${params.totalClass}"></span>`;
            if ("progressbar" === params.type) if (params.renderProgressbar) paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass); else paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
            swiper.pagination.bullets = [];
            el.forEach((subEl => {
                if ("custom" !== params.type) subEl.innerHTML = paginationHTML || "";
                if ("bullets" === params.type) swiper.pagination.bullets.push(...subEl.querySelectorAll(classes_to_selector_classesToSelector(params.bulletClass)));
            }));
            if ("custom" !== params.type) emit("paginationRender", el[0]);
        }
        function init() {
            swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
                el: "swiper-pagination"
            });
            const params = swiper.params.pagination;
            if (!params.el) return;
            let el;
            if ("string" === typeof params.el && swiper.isElement) el = swiper.el.shadowRoot.querySelector(params.el);
            if (!el && "string" === typeof params.el) el = [ ...document.querySelectorAll(params.el) ];
            if (!el) el = params.el;
            if (!el || 0 === el.length) return;
            if (swiper.params.uniqueNavElements && "string" === typeof params.el && Array.isArray(el) && el.length > 1) {
                el = [ ...swiper.el.querySelectorAll(params.el) ];
                if (el.length > 1) el = el.filter((subEl => {
                    if (utils_elementParents(subEl, ".swiper")[0] !== swiper.el) return false;
                    return true;
                }))[0];
            }
            if (Array.isArray(el) && 1 === el.length) el = el[0];
            Object.assign(swiper.pagination, {
                el
            });
            el = makeElementsArray(el);
            el.forEach((subEl => {
                if ("bullets" === params.type && params.clickable) subEl.classList.add(params.clickableClass);
                subEl.classList.add(params.modifierClass + params.type);
                subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                if ("bullets" === params.type && params.dynamicBullets) {
                    subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
                    dynamicBulletIndex = 0;
                    if (params.dynamicMainBullets < 1) params.dynamicMainBullets = 1;
                }
                if ("progressbar" === params.type && params.progressbarOpposite) subEl.classList.add(params.progressbarOppositeClass);
                if (params.clickable) subEl.addEventListener("click", onBulletClick);
                if (!swiper.enabled) subEl.classList.add(params.lockClass);
            }));
        }
        function destroy() {
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            let el = swiper.pagination.el;
            if (el) {
                el = makeElementsArray(el);
                el.forEach((subEl => {
                    subEl.classList.remove(params.hiddenClass);
                    subEl.classList.remove(params.modifierClass + params.type);
                    subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                    if (params.clickable) subEl.removeEventListener("click", onBulletClick);
                }));
            }
            if (swiper.pagination.bullets) swiper.pagination.bullets.forEach((subEl => subEl.classList.remove(...params.bulletActiveClass.split(" "))));
        }
        on("init", (() => {
            if (false === swiper.params.pagination.enabled) disable(); else {
                init();
                render();
                update();
            }
        }));
        on("activeIndexChange", (() => {
            if ("undefined" === typeof swiper.snapIndex) update();
        }));
        on("snapIndexChange", (() => {
            update();
        }));
        on("snapGridLengthChange", (() => {
            render();
            update();
        }));
        on("destroy", (() => {
            destroy();
        }));
        on("enable disable", (() => {
            let {el} = swiper.pagination;
            if (el) {
                el = makeElementsArray(el);
                el.forEach((subEl => subEl.classList[swiper.enabled ? "remove" : "add"](swiper.params.pagination.lockClass)));
            }
        }));
        on("lock unlock", (() => {
            update();
        }));
        on("click", ((_s, e) => {
            const targetEl = e.target;
            let {el} = swiper.pagination;
            if (!Array.isArray(el)) el = [ el ].filter((element => !!element));
            if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
                if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
                const isHidden = el[0].classList.contains(swiper.params.pagination.hiddenClass);
                if (true === isHidden) emit("paginationShow"); else emit("paginationHide");
                el.forEach((subEl => subEl.classList.toggle(swiper.params.pagination.hiddenClass)));
            }
        }));
        const enable = () => {
            swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
            let {el} = swiper.pagination;
            if (el) {
                el = makeElementsArray(el);
                el.forEach((subEl => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass)));
            }
            init();
            render();
            update();
        };
        const disable = () => {
            swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
            let {el} = swiper.pagination;
            if (el) {
                el = makeElementsArray(el);
                el.forEach((subEl => subEl.classList.add(swiper.params.pagination.paginationDisabledClass)));
            }
            destroy();
        };
        Object.assign(swiper.pagination, {
            enable,
            disable,
            render,
            update,
            init,
            destroy
        });
    }
    function Scrollbar({swiper, extendParams, on, emit}) {
        const document = ssr_window_esm_getDocument();
        let isTouched = false;
        let timeout = null;
        let dragTimeout = null;
        let dragStartPos;
        let dragSize;
        let trackSize;
        let divider;
        extendParams({
            scrollbar: {
                el: null,
                dragSize: "auto",
                hide: false,
                draggable: false,
                snapOnRelease: true,
                lockClass: "swiper-scrollbar-lock",
                dragClass: "swiper-scrollbar-drag",
                scrollbarDisabledClass: "swiper-scrollbar-disabled",
                horizontalClass: `swiper-scrollbar-horizontal`,
                verticalClass: `swiper-scrollbar-vertical`
            }
        });
        swiper.scrollbar = {
            el: null,
            dragEl: null
        };
        function setTranslate() {
            if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
            const {scrollbar, rtlTranslate: rtl} = swiper;
            const {dragEl, el} = scrollbar;
            const params = swiper.params.scrollbar;
            const progress = swiper.params.loop ? swiper.progressLoop : swiper.progress;
            let newSize = dragSize;
            let newPos = (trackSize - dragSize) * progress;
            if (rtl) {
                newPos = -newPos;
                if (newPos > 0) {
                    newSize = dragSize - newPos;
                    newPos = 0;
                } else if (-newPos + dragSize > trackSize) newSize = trackSize + newPos;
            } else if (newPos < 0) {
                newSize = dragSize + newPos;
                newPos = 0;
            } else if (newPos + dragSize > trackSize) newSize = trackSize - newPos;
            if (swiper.isHorizontal()) {
                dragEl.style.transform = `translate3d(${newPos}px, 0, 0)`;
                dragEl.style.width = `${newSize}px`;
            } else {
                dragEl.style.transform = `translate3d(0px, ${newPos}px, 0)`;
                dragEl.style.height = `${newSize}px`;
            }
            if (params.hide) {
                clearTimeout(timeout);
                el.style.opacity = 1;
                timeout = setTimeout((() => {
                    el.style.opacity = 0;
                    el.style.transitionDuration = "400ms";
                }), 1e3);
            }
        }
        function setTransition(duration) {
            if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
            swiper.scrollbar.dragEl.style.transitionDuration = `${duration}ms`;
        }
        function updateSize() {
            if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
            const {scrollbar} = swiper;
            const {dragEl, el} = scrollbar;
            dragEl.style.width = "";
            dragEl.style.height = "";
            trackSize = swiper.isHorizontal() ? el.offsetWidth : el.offsetHeight;
            divider = swiper.size / (swiper.virtualSize + swiper.params.slidesOffsetBefore - (swiper.params.centeredSlides ? swiper.snapGrid[0] : 0));
            if ("auto" === swiper.params.scrollbar.dragSize) dragSize = trackSize * divider; else dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
            if (swiper.isHorizontal()) dragEl.style.width = `${dragSize}px`; else dragEl.style.height = `${dragSize}px`;
            if (divider >= 1) el.style.display = "none"; else el.style.display = "";
            if (swiper.params.scrollbar.hide) el.style.opacity = 0;
            if (swiper.params.watchOverflow && swiper.enabled) scrollbar.el.classList[swiper.isLocked ? "add" : "remove"](swiper.params.scrollbar.lockClass);
        }
        function getPointerPosition(e) {
            return swiper.isHorizontal() ? e.clientX : e.clientY;
        }
        function setDragPosition(e) {
            const {scrollbar, rtlTranslate: rtl} = swiper;
            const {el} = scrollbar;
            let positionRatio;
            positionRatio = (getPointerPosition(e) - utils_elementOffset(el)[swiper.isHorizontal() ? "left" : "top"] - (null !== dragStartPos ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
            positionRatio = Math.max(Math.min(positionRatio, 1), 0);
            if (rtl) positionRatio = 1 - positionRatio;
            const position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
            swiper.updateProgress(position);
            swiper.setTranslate(position);
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        function onDragStart(e) {
            const params = swiper.params.scrollbar;
            const {scrollbar, wrapperEl} = swiper;
            const {el, dragEl} = scrollbar;
            isTouched = true;
            dragStartPos = e.target === dragEl ? getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? "left" : "top"] : null;
            e.preventDefault();
            e.stopPropagation();
            wrapperEl.style.transitionDuration = "100ms";
            dragEl.style.transitionDuration = "100ms";
            setDragPosition(e);
            clearTimeout(dragTimeout);
            el.style.transitionDuration = "0ms";
            if (params.hide) el.style.opacity = 1;
            if (swiper.params.cssMode) swiper.wrapperEl.style["scroll-snap-type"] = "none";
            emit("scrollbarDragStart", e);
        }
        function onDragMove(e) {
            const {scrollbar, wrapperEl} = swiper;
            const {el, dragEl} = scrollbar;
            if (!isTouched) return;
            if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
            setDragPosition(e);
            wrapperEl.style.transitionDuration = "0ms";
            el.style.transitionDuration = "0ms";
            dragEl.style.transitionDuration = "0ms";
            emit("scrollbarDragMove", e);
        }
        function onDragEnd(e) {
            const params = swiper.params.scrollbar;
            const {scrollbar, wrapperEl} = swiper;
            const {el} = scrollbar;
            if (!isTouched) return;
            isTouched = false;
            if (swiper.params.cssMode) {
                swiper.wrapperEl.style["scroll-snap-type"] = "";
                wrapperEl.style.transitionDuration = "";
            }
            if (params.hide) {
                clearTimeout(dragTimeout);
                dragTimeout = utils_nextTick((() => {
                    el.style.opacity = 0;
                    el.style.transitionDuration = "400ms";
                }), 1e3);
            }
            emit("scrollbarDragEnd", e);
            if (params.snapOnRelease) swiper.slideToClosest();
        }
        function events(method) {
            const {scrollbar, params} = swiper;
            const el = scrollbar.el;
            if (!el) return;
            const target = el;
            const activeListener = params.passiveListeners ? {
                passive: false,
                capture: false
            } : false;
            const passiveListener = params.passiveListeners ? {
                passive: true,
                capture: false
            } : false;
            if (!target) return;
            const eventMethod = "on" === method ? "addEventListener" : "removeEventListener";
            target[eventMethod]("pointerdown", onDragStart, activeListener);
            document[eventMethod]("pointermove", onDragMove, activeListener);
            document[eventMethod]("pointerup", onDragEnd, passiveListener);
        }
        function enableDraggable() {
            if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
            events("on");
        }
        function disableDraggable() {
            if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
            events("off");
        }
        function init() {
            const {scrollbar, el: swiperEl} = swiper;
            swiper.params.scrollbar = createElementIfNotDefined(swiper, swiper.originalParams.scrollbar, swiper.params.scrollbar, {
                el: "swiper-scrollbar"
            });
            const params = swiper.params.scrollbar;
            if (!params.el) return;
            let el;
            if ("string" === typeof params.el && swiper.isElement) el = swiper.el.shadowRoot.querySelector(params.el);
            if (!el && "string" === typeof params.el) el = document.querySelectorAll(params.el); else if (!el) el = params.el;
            if (swiper.params.uniqueNavElements && "string" === typeof params.el && el.length > 1 && 1 === swiperEl.querySelectorAll(params.el).length) el = swiperEl.querySelector(params.el);
            if (el.length > 0) el = el[0];
            el.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
            let dragEl;
            if (el) {
                dragEl = el.querySelector(`.${swiper.params.scrollbar.dragClass}`);
                if (!dragEl) {
                    dragEl = utils_createElement("div", swiper.params.scrollbar.dragClass);
                    el.append(dragEl);
                }
            }
            Object.assign(scrollbar, {
                el,
                dragEl
            });
            if (params.draggable) enableDraggable();
            if (el) el.classList[swiper.enabled ? "remove" : "add"](swiper.params.scrollbar.lockClass);
        }
        function destroy() {
            const params = swiper.params.scrollbar;
            const el = swiper.scrollbar.el;
            if (el) el.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
            disableDraggable();
        }
        on("init", (() => {
            if (false === swiper.params.scrollbar.enabled) disable(); else {
                init();
                updateSize();
                setTranslate();
            }
        }));
        on("update resize observerUpdate lock unlock", (() => {
            updateSize();
        }));
        on("setTranslate", (() => {
            setTranslate();
        }));
        on("setTransition", ((_s, duration) => {
            setTransition(duration);
        }));
        on("enable disable", (() => {
            const {el} = swiper.scrollbar;
            if (el) el.classList[swiper.enabled ? "remove" : "add"](swiper.params.scrollbar.lockClass);
        }));
        on("destroy", (() => {
            destroy();
        }));
        const enable = () => {
            swiper.el.classList.remove(swiper.params.scrollbar.scrollbarDisabledClass);
            if (swiper.scrollbar.el) swiper.scrollbar.el.classList.remove(swiper.params.scrollbar.scrollbarDisabledClass);
            init();
            updateSize();
            setTranslate();
        };
        const disable = () => {
            swiper.el.classList.add(swiper.params.scrollbar.scrollbarDisabledClass);
            if (swiper.scrollbar.el) swiper.scrollbar.el.classList.add(swiper.params.scrollbar.scrollbarDisabledClass);
            destroy();
        };
        Object.assign(swiper.scrollbar, {
            enable,
            disable,
            updateSize,
            setTranslate,
            init,
            destroy
        });
    }
    function Autoplay({swiper, extendParams, on, emit, params}) {
        swiper.autoplay = {
            running: false,
            paused: false,
            timeLeft: 0
        };
        extendParams({
            autoplay: {
                enabled: false,
                delay: 3e3,
                waitForTransition: true,
                disableOnInteraction: true,
                stopOnLastSlide: false,
                reverseDirection: false,
                pauseOnMouseEnter: false
            }
        });
        let timeout;
        let raf;
        let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3e3;
        let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3e3;
        let autoplayTimeLeft;
        let autoplayStartTime = (new Date).getTime;
        let wasPaused;
        let isTouched;
        let pausedByTouch;
        let touchStartTimeout;
        let slideChanged;
        let pausedByInteraction;
        function onTransitionEnd(e) {
            if (!swiper || swiper.destroyed || !swiper.wrapperEl) return;
            if (e.target !== swiper.wrapperEl) return;
            swiper.wrapperEl.removeEventListener("transitionend", onTransitionEnd);
            resume();
        }
        const calcTimeLeft = () => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            if (swiper.autoplay.paused) wasPaused = true; else if (wasPaused) {
                autoplayDelayCurrent = autoplayTimeLeft;
                wasPaused = false;
            }
            const timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - (new Date).getTime();
            swiper.autoplay.timeLeft = timeLeft;
            emit("autoplayTimeLeft", timeLeft, timeLeft / autoplayDelayTotal);
            raf = requestAnimationFrame((() => {
                calcTimeLeft();
            }));
        };
        const getSlideDelay = () => {
            let activeSlideEl;
            if (swiper.virtual && swiper.params.virtual.enabled) activeSlideEl = swiper.slides.filter((slideEl => slideEl.classList.contains("swiper-slide-active")))[0]; else activeSlideEl = swiper.slides[swiper.activeIndex];
            if (!activeSlideEl) return;
            const currentSlideDelay = parseInt(activeSlideEl.getAttribute("data-swiper-autoplay"), 10);
            return currentSlideDelay;
        };
        const run = delayForce => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            cancelAnimationFrame(raf);
            calcTimeLeft();
            let delay = "undefined" === typeof delayForce ? swiper.params.autoplay.delay : delayForce;
            autoplayDelayTotal = swiper.params.autoplay.delay;
            autoplayDelayCurrent = swiper.params.autoplay.delay;
            const currentSlideDelay = getSlideDelay();
            if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && "undefined" === typeof delayForce) {
                delay = currentSlideDelay;
                autoplayDelayTotal = currentSlideDelay;
                autoplayDelayCurrent = currentSlideDelay;
            }
            autoplayTimeLeft = delay;
            const speed = swiper.params.speed;
            const proceed = () => {
                if (!swiper || swiper.destroyed) return;
                if (swiper.params.autoplay.reverseDirection) {
                    if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
                        swiper.slidePrev(speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.params.autoplay.stopOnLastSlide) {
                        swiper.slideTo(swiper.slides.length - 1, speed, true, true);
                        emit("autoplay");
                    }
                } else if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
                    swiper.slideNext(speed, true, true);
                    emit("autoplay");
                } else if (!swiper.params.autoplay.stopOnLastSlide) {
                    swiper.slideTo(0, speed, true, true);
                    emit("autoplay");
                }
                if (swiper.params.cssMode) {
                    autoplayStartTime = (new Date).getTime();
                    requestAnimationFrame((() => {
                        run();
                    }));
                }
            };
            if (delay > 0) {
                clearTimeout(timeout);
                timeout = setTimeout((() => {
                    proceed();
                }), delay);
            } else requestAnimationFrame((() => {
                proceed();
            }));
            return delay;
        };
        const start = () => {
            swiper.autoplay.running = true;
            run();
            emit("autoplayStart");
        };
        const stop = () => {
            swiper.autoplay.running = false;
            clearTimeout(timeout);
            cancelAnimationFrame(raf);
            emit("autoplayStop");
        };
        const pause = (internal, reset) => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            clearTimeout(timeout);
            if (!internal) pausedByInteraction = true;
            const proceed = () => {
                emit("autoplayPause");
                if (swiper.params.autoplay.waitForTransition) swiper.wrapperEl.addEventListener("transitionend", onTransitionEnd); else resume();
            };
            swiper.autoplay.paused = true;
            if (reset) {
                if (slideChanged) autoplayTimeLeft = swiper.params.autoplay.delay;
                slideChanged = false;
                proceed();
                return;
            }
            const delay = autoplayTimeLeft || swiper.params.autoplay.delay;
            autoplayTimeLeft = delay - ((new Date).getTime() - autoplayStartTime);
            if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) return;
            if (autoplayTimeLeft < 0) autoplayTimeLeft = 0;
            proceed();
        };
        const resume = () => {
            if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running) return;
            autoplayStartTime = (new Date).getTime();
            if (pausedByInteraction) {
                pausedByInteraction = false;
                run(autoplayTimeLeft);
            } else run();
            swiper.autoplay.paused = false;
            emit("autoplayResume");
        };
        const onVisibilityChange = () => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            const document = ssr_window_esm_getDocument();
            if ("hidden" === document.visibilityState) {
                pausedByInteraction = true;
                pause(true);
            }
            if ("visible" === document.visibilityState) resume();
        };
        const onPointerEnter = e => {
            if ("mouse" !== e.pointerType) return;
            pausedByInteraction = true;
            pause(true);
        };
        const onPointerLeave = e => {
            if ("mouse" !== e.pointerType) return;
            if (swiper.autoplay.paused) resume();
        };
        const attachMouseEvents = () => {
            if (swiper.params.autoplay.pauseOnMouseEnter) {
                swiper.el.addEventListener("pointerenter", onPointerEnter);
                swiper.el.addEventListener("pointerleave", onPointerLeave);
            }
        };
        const detachMouseEvents = () => {
            swiper.el.removeEventListener("pointerenter", onPointerEnter);
            swiper.el.removeEventListener("pointerleave", onPointerLeave);
        };
        const attachDocumentEvents = () => {
            const document = ssr_window_esm_getDocument();
            document.addEventListener("visibilitychange", onVisibilityChange);
        };
        const detachDocumentEvents = () => {
            const document = ssr_window_esm_getDocument();
            document.removeEventListener("visibilitychange", onVisibilityChange);
        };
        on("init", (() => {
            if (swiper.params.autoplay.enabled) {
                attachMouseEvents();
                attachDocumentEvents();
                autoplayStartTime = (new Date).getTime();
                start();
            }
        }));
        on("destroy", (() => {
            detachMouseEvents();
            detachDocumentEvents();
            if (swiper.autoplay.running) stop();
        }));
        on("beforeTransitionStart", ((_s, speed, internal) => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            if (internal || !swiper.params.autoplay.disableOnInteraction) pause(true, true); else stop();
        }));
        on("sliderFirstMove", (() => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            if (swiper.params.autoplay.disableOnInteraction) {
                stop();
                return;
            }
            isTouched = true;
            pausedByTouch = false;
            pausedByInteraction = false;
            touchStartTimeout = setTimeout((() => {
                pausedByInteraction = true;
                pausedByTouch = true;
                pause(true);
            }), 200);
        }));
        on("touchEnd", (() => {
            if (swiper.destroyed || !swiper.autoplay.running || !isTouched) return;
            clearTimeout(touchStartTimeout);
            clearTimeout(timeout);
            if (swiper.params.autoplay.disableOnInteraction) {
                pausedByTouch = false;
                isTouched = false;
                return;
            }
            if (pausedByTouch && swiper.params.cssMode) resume();
            pausedByTouch = false;
            isTouched = false;
        }));
        on("slideChange", (() => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            slideChanged = true;
        }));
        Object.assign(swiper.autoplay, {
            start,
            stop,
            pause,
            resume
        });
    }
    function Thumb({swiper, extendParams, on}) {
        extendParams({
            thumbs: {
                swiper: null,
                multipleActiveThumbs: true,
                autoScrollOffset: 0,
                slideThumbActiveClass: "swiper-slide-thumb-active",
                thumbsContainerClass: "swiper-thumbs"
            }
        });
        let initialized = false;
        let swiperCreated = false;
        swiper.thumbs = {
            swiper: null
        };
        function onThumbClick() {
            const thumbsSwiper = swiper.thumbs.swiper;
            if (!thumbsSwiper || thumbsSwiper.destroyed) return;
            const clickedIndex = thumbsSwiper.clickedIndex;
            const clickedSlide = thumbsSwiper.clickedSlide;
            if (clickedSlide && clickedSlide.classList.contains(swiper.params.thumbs.slideThumbActiveClass)) return;
            if ("undefined" === typeof clickedIndex || null === clickedIndex) return;
            let slideToIndex;
            if (thumbsSwiper.params.loop) slideToIndex = parseInt(thumbsSwiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10); else slideToIndex = clickedIndex;
            if (swiper.params.loop) swiper.slideToLoop(slideToIndex); else swiper.slideTo(slideToIndex);
        }
        function init() {
            const {thumbs: thumbsParams} = swiper.params;
            if (initialized) return false;
            initialized = true;
            const SwiperClass = swiper.constructor;
            if (thumbsParams.swiper instanceof SwiperClass) {
                swiper.thumbs.swiper = thumbsParams.swiper;
                Object.assign(swiper.thumbs.swiper.originalParams, {
                    watchSlidesProgress: true,
                    slideToClickedSlide: false
                });
                Object.assign(swiper.thumbs.swiper.params, {
                    watchSlidesProgress: true,
                    slideToClickedSlide: false
                });
                swiper.thumbs.swiper.update();
            } else if (utils_isObject(thumbsParams.swiper)) {
                const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
                Object.assign(thumbsSwiperParams, {
                    watchSlidesProgress: true,
                    slideToClickedSlide: false
                });
                swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
                swiperCreated = true;
            }
            swiper.thumbs.swiper.el.classList.add(swiper.params.thumbs.thumbsContainerClass);
            swiper.thumbs.swiper.on("tap", onThumbClick);
            return true;
        }
        function update(initial) {
            const thumbsSwiper = swiper.thumbs.swiper;
            if (!thumbsSwiper || thumbsSwiper.destroyed) return;
            const slidesPerView = "auto" === thumbsSwiper.params.slidesPerView ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView;
            let thumbsToActivate = 1;
            const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;
            if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) thumbsToActivate = swiper.params.slidesPerView;
            if (!swiper.params.thumbs.multipleActiveThumbs) thumbsToActivate = 1;
            thumbsToActivate = Math.floor(thumbsToActivate);
            thumbsSwiper.slides.forEach((slideEl => slideEl.classList.remove(thumbActiveClass)));
            if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled) for (let i = 0; i < thumbsToActivate; i += 1) utils_elementChildren(thumbsSwiper.slidesEl, `[data-swiper-slide-index="${swiper.realIndex + i}"]`).forEach((slideEl => {
                slideEl.classList.add(thumbActiveClass);
            })); else for (let i = 0; i < thumbsToActivate; i += 1) if (thumbsSwiper.slides[swiper.realIndex + i]) thumbsSwiper.slides[swiper.realIndex + i].classList.add(thumbActiveClass);
            const autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
            const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
            if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
                const currentThumbsIndex = thumbsSwiper.activeIndex;
                let newThumbsIndex;
                let direction;
                if (thumbsSwiper.params.loop) {
                    const newThumbsSlide = thumbsSwiper.slides.filter((slideEl => slideEl.getAttribute("data-swiper-slide-index") === `${swiper.realIndex}`))[0];
                    newThumbsIndex = thumbsSwiper.slides.indexOf(newThumbsSlide);
                    direction = swiper.activeIndex > swiper.previousIndex ? "next" : "prev";
                } else {
                    newThumbsIndex = swiper.realIndex;
                    direction = newThumbsIndex > swiper.previousIndex ? "next" : "prev";
                }
                if (useOffset) newThumbsIndex += "next" === direction ? autoScrollOffset : -1 * autoScrollOffset;
                if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
                    if (thumbsSwiper.params.centeredSlides) if (newThumbsIndex > currentThumbsIndex) newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1; else newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1; else if (newThumbsIndex > currentThumbsIndex && 1 === thumbsSwiper.params.slidesPerGroup) ;
                    thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : void 0);
                }
            }
        }
        on("beforeInit", (() => {
            const {thumbs} = swiper.params;
            if (!thumbs || !thumbs.swiper) return;
            if ("string" === typeof thumbs.swiper || thumbs.swiper instanceof HTMLElement) {
                const document = ssr_window_esm_getDocument();
                const getThumbsElementAndInit = () => {
                    const thumbsElement = "string" === typeof thumbs.swiper ? document.querySelector(thumbs.swiper) : thumbs.swiper;
                    if (thumbsElement && thumbsElement.swiper) {
                        thumbs.swiper = thumbsElement.swiper;
                        init();
                        update(true);
                    } else if (thumbsElement) {
                        const onThumbsSwiper = e => {
                            thumbs.swiper = e.detail[0];
                            thumbsElement.removeEventListener("init", onThumbsSwiper);
                            init();
                            update(true);
                            thumbs.swiper.update();
                            swiper.update();
                        };
                        thumbsElement.addEventListener("init", onThumbsSwiper);
                    }
                    return thumbsElement;
                };
                const watchForThumbsToAppear = () => {
                    if (swiper.destroyed) return;
                    const thumbsElement = getThumbsElementAndInit();
                    if (!thumbsElement) requestAnimationFrame(watchForThumbsToAppear);
                };
                requestAnimationFrame(watchForThumbsToAppear);
            } else {
                init();
                update(true);
            }
        }));
        on("slideChange update resize observerUpdate", (() => {
            update();
        }));
        on("setTransition", ((_s, duration) => {
            const thumbsSwiper = swiper.thumbs.swiper;
            if (!thumbsSwiper || thumbsSwiper.destroyed) return;
            thumbsSwiper.setTransition(duration);
        }));
        on("beforeDestroy", (() => {
            const thumbsSwiper = swiper.thumbs.swiper;
            if (!thumbsSwiper || thumbsSwiper.destroyed) return;
            if (swiperCreated) thumbsSwiper.destroy();
        }));
        Object.assign(swiper.thumbs, {
            init,
            update
        });
    }
    function effect_init_effectInit(params) {
        const {effect, swiper, on, setTranslate, setTransition, overwriteParams, perspective, recreateShadows, getEffectParams} = params;
        on("beforeInit", (() => {
            if (swiper.params.effect !== effect) return;
            swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
            if (perspective && perspective()) swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
            const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
            Object.assign(swiper.params, overwriteParamsResult);
            Object.assign(swiper.originalParams, overwriteParamsResult);
        }));
        on("setTranslate", (() => {
            if (swiper.params.effect !== effect) return;
            setTranslate();
        }));
        on("setTransition", ((_s, duration) => {
            if (swiper.params.effect !== effect) return;
            setTransition(duration);
        }));
        on("transitionEnd", (() => {
            if (swiper.params.effect !== effect) return;
            if (recreateShadows) {
                if (!getEffectParams || !getEffectParams().slideShadows) return;
                swiper.slides.forEach((slideEl => {
                    slideEl.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl => shadowEl.remove()));
                }));
                recreateShadows();
            }
        }));
        let requireUpdateOnVirtual;
        on("virtualUpdate", (() => {
            if (swiper.params.effect !== effect) return;
            if (!swiper.slides.length) requireUpdateOnVirtual = true;
            requestAnimationFrame((() => {
                if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
                    setTranslate();
                    requireUpdateOnVirtual = false;
                }
            }));
        }));
    }
    function effect_target_effectTarget(effectParams, slideEl) {
        const transformEl = utils_getSlideTransformEl(slideEl);
        if (transformEl !== slideEl) {
            transformEl.style.backfaceVisibility = "hidden";
            transformEl.style["-webkit-backface-visibility"] = "hidden";
        }
        return transformEl;
    }
    function effect_virtual_transition_end_effectVirtualTransitionEnd({swiper, duration, transformElements, allSlides}) {
        const {activeIndex} = swiper;
        const getSlide = el => {
            if (!el.parentElement) {
                const slide = swiper.slides.filter((slideEl => slideEl.shadowEl && slideEl.shadowEl === el.parentNode))[0];
                return slide;
            }
            return el.parentElement;
        };
        if (swiper.params.virtualTranslate && 0 !== duration) {
            let eventTriggered = false;
            let transitionEndTarget;
            if (allSlides) transitionEndTarget = transformElements; else transitionEndTarget = transformElements.filter((transformEl => {
                const el = transformEl.classList.contains("swiper-slide-transform") ? getSlide(transformEl) : transformEl;
                return swiper.getSlideIndex(el) === activeIndex;
            }));
            transitionEndTarget.forEach((el => {
                utils_elementTransitionEnd(el, (() => {
                    if (eventTriggered) return;
                    if (!swiper || swiper.destroyed) return;
                    eventTriggered = true;
                    swiper.animating = false;
                    const evt = new window.CustomEvent("transitionend", {
                        bubbles: true,
                        cancelable: true
                    });
                    swiper.wrapperEl.dispatchEvent(evt);
                }));
            }));
        }
    }
    function EffectFade({swiper, extendParams, on}) {
        extendParams({
            fadeEffect: {
                crossFade: false
            }
        });
        const setTranslate = () => {
            const {slides} = swiper;
            const params = swiper.params.fadeEffect;
            for (let i = 0; i < slides.length; i += 1) {
                const slideEl = swiper.slides[i];
                const offset = slideEl.swiperSlideOffset;
                let tx = -offset;
                if (!swiper.params.virtualTranslate) tx -= swiper.translate;
                let ty = 0;
                if (!swiper.isHorizontal()) {
                    ty = tx;
                    tx = 0;
                }
                const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(slideEl.progress), 0) : 1 + Math.min(Math.max(slideEl.progress, -1), 0);
                const targetEl = effect_target_effectTarget(params, slideEl);
                targetEl.style.opacity = slideOpacity;
                targetEl.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`;
            }
        };
        const setTransition = duration => {
            const transformElements = swiper.slides.map((slideEl => utils_getSlideTransformEl(slideEl)));
            transformElements.forEach((el => {
                el.style.transitionDuration = `${duration}ms`;
            }));
            effect_virtual_transition_end_effectVirtualTransitionEnd({
                swiper,
                duration,
                transformElements,
                allSlides: true
            });
        };
        effect_init_effectInit({
            effect: "fade",
            swiper,
            on,
            setTranslate,
            setTransition,
            overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: true,
                spaceBetween: 0,
                virtualTranslate: !swiper.params.cssMode
            })
        });
    }
    function initSliders() {
        if (document.querySelector(".advertising__slider")) new core(".advertising__slider", {
            modules: [ Navigation, Pagination, Autoplay, EffectFade, Scrollbar ],
            touchReleaseOnEdges: true,
            edgeSwipeDetection: true,
            edgeSwipeThreshold: 20,
            on: {
                touchStart: function(swiper, e) {
                    if (swiper.isBeginning || swiper.isEnd) swiper.allowTouchMove = false; else swiper.allowTouchMove = true;
                }
            },
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 10,
            autoHeight: true,
            speed: 800,
            effect: "fade",
            autoplay: {
                delay: 3e3,
                disableOnInteraction: false
            },
            scrollbar: {
                el: ".swiper-scrollbar",
                draggable: true,
                hide: true
            },
            on: {}
        });
        if (document.querySelector(".popular__slider")) new core(".popular__slider", {
            modules: [ Navigation, Pagination ],
            touchReleaseOnEdges: true,
            edgeSwipeDetection: true,
            edgeSwipeThreshold: 20,
            observer: true,
            observeParents: true,
            slidesPerView: 2,
            spaceBetween: 10,
            autoHeight: true,
            speed: 800,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            navigation: {
                prevEl: ".popular-swiper-button-prev",
                nextEl: ".popular-swiper-button-next"
            },
            breakpoints: {
                568: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                1170: {
                    slidesPerView: 4,
                    spaceBetween: 30
                }
            },
            on: {}
        });
        if (document.querySelector(".new__slider")) new core(".new__slider:not(.not)", {
            modules: [ Navigation, Pagination ],
            touchReleaseOnEdges: true,
            edgeSwipeDetection: true,
            edgeSwipeThreshold: 20,
            observer: true,
            observeParents: true,
            slidesPerView: 2,
            spaceBetween: 10,
            autoHeight: true,
            speed: 800,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            navigation: {
                prevEl: ".new-swiper-button-prev ",
                nextEl: ".new-swiper-button-next "
            },
            breakpoints: {
                568: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                1170: {
                    slidesPerView: 4,
                    spaceBetween: 30
                }
            },
            on: {}
        });
        if (document.querySelector(".action__slider")) new core(".action__slider", {
            modules: [ Navigation, Pagination ],
            touchReleaseOnEdges: true,
            edgeSwipeDetection: true,
            edgeSwipeThreshold: 20,
            observer: true,
            observeParents: true,
            slidesPerView: 2,
            spaceBetween: 10,
            autoHeight: true,
            speed: 800,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            navigation: {
                prevEl: ".action-swiper-button-prev",
                nextEl: ".action-swiper-button-next"
            },
            breakpoints: {
                568: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                1170: {
                    slidesPerView: 4,
                    spaceBetween: 30
                }
            },
            on: {}
        });
        if (document.querySelector(".stock__slider")) new core(".stock__slider", {
            modules: [ Navigation, Pagination ],
            touchReleaseOnEdges: true,
            edgeSwipeDetection: true,
            edgeSwipeThreshold: 20,
            observer: true,
            observeParents: true,
            slidesPerView: 2,
            spaceBetween: 10,
            autoHeight: true,
            speed: 800,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            navigation: {
                prevEl: ".stock-swiper-button-prev",
                nextEl: ".stock-swiper-button-next"
            },
            breakpoints: {
                568: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                1170: {
                    slidesPerView: 4,
                    spaceBetween: 30
                }
            },
            on: {}
        });
        if (document.querySelector(".reviews__slider")) new core(".reviews__slider", {
            modules: [ Pagination ],
            touchReleaseOnEdges: true,
            edgeSwipeDetection: true,
            edgeSwipeThreshold: 20,
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 10,
            autoHeight: true,
            speed: 800,
            grabCursor: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            breakpoints: {
                440: {
                    slidesPerView: 1.3,
                    spaceBetween: 10,
                    autoHeight: true
                },
                668: {
                    slidesPerView: 2,
                    autoHeight: true,
                    spaceBetween: 20
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                    autoHeight: true
                }
            },
            on: {}
        });
        if (document.querySelector(".slider__images .swiper-container")) {
            const sliderThumbs = new core(".slider__thumbs .swiper-container", {
                modules: [ Navigation, Thumb ],
                direction: "vertical",
                slidesPerView: 3,
                spaceBetween: 24,
                freeMode: true,
                touchRatio: .8,
                allowTouchMove: true,
                simulateTouch: true,
                navigation: {
                    nextEl: ".slider__next",
                    prevEl: ".slider__prev"
                },
                breakpoints: {
                    0: {
                        direction: "horizontal",
                        touchRatio: 1
                    },
                    768: {
                        direction: "vertical"
                    }
                }
            });
            new core(".slider__images .swiper-container", {
                modules: [ Navigation, Thumb, Mousewheel ],
                direction: "vertical",
                slidesPerView: 1,
                spaceBetween: 32,
                mousewheel: true,
                grabCursor: true,
                touchRatio: 1,
                allowTouchMove: true,
                simulateTouch: true,
                noSwipingSelector: "iframe",
                navigation: {
                    nextEl: ".slider__next",
                    prevEl: ".slider__prev"
                },
                thumbs: {
                    swiper: sliderThumbs
                },
                on: {
                    init: function() {
                        const videoSlide = document.querySelector(".video-slide");
                        if (videoSlide) {
                            let startX, startY, isTap;
                            videoSlide.addEventListener("touchstart", (e => {
                                startX = e.touches[0].clientX;
                                startY = e.touches[0].clientY;
                                isTap = true;
                            }), {
                                passive: true
                            });
                            videoSlide.addEventListener("touchmove", (e => {
                                const moveX = e.touches[0].clientX;
                                const moveY = e.touches[0].clientY;
                                if (Math.abs(moveX - startX) > 5 || Math.abs(moveY - startY) > 5) isTap = false;
                            }), {
                                passive: true
                            });
                            videoSlide.addEventListener("touchend", (e => {
                                if (isTap) {
                                    const link = videoSlide.querySelector("a");
                                    if (link) {
                                        link.style.pointerEvents = "auto";
                                        setTimeout((() => link.click()), 50);
                                    }
                                }
                            }), {
                                passive: true
                            });
                        }
                    }
                },
                breakpoints: {
                    0: {
                        direction: "horizontal",
                        touchRatio: 1.2
                    },
                    768: {
                        direction: "vertical"
                    }
                }
            });
        }
        if (document.querySelector(".similar-products__slider")) new core(".similar-products__slider", {
            modules: [ Navigation, Pagination ],
            touchReleaseOnEdges: true,
            edgeSwipeDetection: true,
            edgeSwipeThreshold: 20,
            observer: true,
            observeParents: true,
            slidesPerView: 1.3,
            spaceBetween: 10,
            autoHeight: true,
            speed: 800,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            navigation: {
                prevEl: ".similar-swiper-button-prev",
                nextEl: ".similar-swiper-button-next"
            },
            breakpoints: {
                600: {
                    slidesPerView: 5
                },
                486: {
                    slidesPerView: 4
                },
                384: {
                    slidesPerView: 3
                },
                288: {
                    slidesPerView: 2
                },
                0: {
                    slidesPerView: 1
                }
            }
        });
        if (document.querySelector(".trust__slider")) {
            const mobileBreakpoint = window.matchMedia("(max-width: 767.98px)");
            const handleSlider = e => {
                if (e.matches) {
                    new core(".trust__slider", {
                        modules: [ Navigation, Pagination ],
                        touchReleaseOnEdges: true,
                        edgeSwipeDetection: true,
                        edgeSwipeThreshold: 20,
                        observer: true,
                        observeParents: true,
                        slidesPerView: 1.3,
                        spaceBetween: 10,
                        autoHeight: true,
                        speed: 800,
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: true
                        },
                        navigation: {
                            prevEl: ".trust-swiper-button-prev",
                            nextEl: ".trust-swiper-button-next"
                        },
                        breakpoints: {
                            440: {
                                slidesPerView: 1.8,
                                spaceBetween: 10
                            },
                            568: {
                                slidesPerView: 2,
                                spaceBetween: 20
                            }
                        }
                    });
                    const trustWrapper = document.querySelector(".trust__wrapper");
                    if (trustWrapper) {
                        trustWrapper.style.removeProperty("display");
                        trustWrapper.style.removeProperty("grid-template-columns");
                        trustWrapper.style.removeProperty("gap");
                    }
                } else {
                    const slider = document.querySelector(".trust__slider").swiper;
                    if (slider) slider.destroy();
                    const trustWrapper = document.querySelector(".trust__wrapper");
                    if (trustWrapper) {
                        trustWrapper.style.display = "grid";
                        trustWrapper.style.gridTemplateColumns = "repeat(auto-fill, minmax(15rem, 1fr))";
                        trustWrapper.style.gap = "20px";
                    }
                }
            };
            mobileBreakpoint.addEventListener("change", handleSlider);
            handleSlider(mobileBreakpoint);
        }
    }
    document.addEventListener("DOMContentLoaded", (function() {
        initSliders();
    }));
    class ScrollWatcher {
        constructor(props) {
            let defaultConfig = {
                logging: true
            };
            this.config = Object.assign(defaultConfig, props);
            this.observer;
            !document.documentElement.classList.contains("watcher") ? this.scrollWatcherRun() : null;
        }
        scrollWatcherUpdate() {
            this.scrollWatcherRun();
        }
        scrollWatcherRun() {
            document.documentElement.classList.add("watcher");
            this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"));
        }
        scrollWatcherConstructor(items) {
            if (items.length) {
                this.scrollWatcherLogging(`Прокинувся, стежу за об'єктами (${items.length})...`);
                let uniqParams = uniqArray(Array.from(items).map((function(item) {
                    return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : "0px"}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
                })));
                uniqParams.forEach((uniqParam => {
                    let uniqParamArray = uniqParam.split("|");
                    let paramsWatch = {
                        root: uniqParamArray[0],
                        margin: uniqParamArray[1],
                        threshold: uniqParamArray[2]
                    };
                    let groupItems = Array.from(items).filter((function(item) {
                        let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
                        let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : "0px";
                        let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
                        if (String(watchRoot) === paramsWatch.root && String(watchMargin) === paramsWatch.margin && String(watchThreshold) === paramsWatch.threshold) return item;
                    }));
                    let configWatcher = this.getScrollWatcherConfig(paramsWatch);
                    this.scrollWatcherInit(groupItems, configWatcher);
                }));
            } else this.scrollWatcherLogging("Сплю, немає об'єктів для стеження. ZzzZZzz");
        }
        getScrollWatcherConfig(paramsWatch) {
            let configWatcher = {};
            if (document.querySelector(paramsWatch.root)) configWatcher.root = document.querySelector(paramsWatch.root); else if ("null" !== paramsWatch.root) this.scrollWatcherLogging(`Эмм... батьківського об'єкта ${paramsWatch.root} немає на сторінці`);
            configWatcher.rootMargin = paramsWatch.margin;
            if (paramsWatch.margin.indexOf("px") < 0 && paramsWatch.margin.indexOf("%") < 0) {
                this.scrollWatcherLogging(`йой, налаштування data-watch-margin потрібно задавати в PX або %`);
                return;
            }
            if ("prx" === paramsWatch.threshold) {
                paramsWatch.threshold = [];
                for (let i = 0; i <= 1; i += .005) paramsWatch.threshold.push(i);
            } else paramsWatch.threshold = paramsWatch.threshold.split(",");
            configWatcher.threshold = paramsWatch.threshold;
            return configWatcher;
        }
        scrollWatcherCreate(configWatcher) {
            this.observer = new IntersectionObserver(((entries, observer) => {
                entries.forEach((entry => {
                    this.scrollWatcherCallback(entry, observer);
                }));
            }), configWatcher);
        }
        scrollWatcherInit(items, configWatcher) {
            this.scrollWatcherCreate(configWatcher);
            items.forEach((item => this.observer.observe(item)));
        }
        scrollWatcherIntersecting(entry, targetElement) {
            if (entry.isIntersecting) {
                !targetElement.classList.contains("_watcher-view") ? targetElement.classList.add("_watcher-view") : null;
                this.scrollWatcherLogging(`Я бачу ${targetElement.classList}, додав клас _watcher-view`);
            } else {
                targetElement.classList.contains("_watcher-view") ? targetElement.classList.remove("_watcher-view") : null;
                this.scrollWatcherLogging(`Я не бачу ${targetElement.classList}, прибрав клас _watcher-view`);
            }
        }
        scrollWatcherOff(targetElement, observer) {
            observer.unobserve(targetElement);
            this.scrollWatcherLogging(`Я перестав стежити за ${targetElement.classList}`);
        }
        scrollWatcherLogging(message) {
            this.config.logging ? functions_FLS(`[Спостерігач]: ${message}`) : null;
        }
        scrollWatcherCallback(entry, observer) {
            const targetElement = entry.target;
            this.scrollWatcherIntersecting(entry, targetElement);
            targetElement.hasAttribute("data-watch-once") && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
            document.dispatchEvent(new CustomEvent("watcherCallback", {
                detail: {
                    entry
                }
            }));
        }
    }
    modules_flsModules.watcher = new ScrollWatcher({});
    let addWindowScrollEvent = false;
    function headerScroll() {
        addWindowScrollEvent = true;
        const header = document.querySelector("header.header");
        const headerCatalog = document.querySelector(".catalog-header");
        const headerShow = header.hasAttribute("data-scroll-show");
        const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
        const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
        let scrollDirection = 0;
        let timer;
        const originalHeaderHeight = header.offsetHeight;
        header.style.minHeight = `${originalHeaderHeight}px`;
        document.addEventListener("windowScroll", (function(e) {
            const scrollTop = window.scrollY;
            clearTimeout(timer);
            if (scrollTop >= startPoint) {
                if (!header.classList.contains("_header-scroll")) {
                    header.classList.add("_header-scroll");
                    header.style.minHeight = `${originalHeaderHeight}px`;
                    if (headerCatalog) headerCatalog.style.cssText = "bottom: 17%;";
                }
                if (!header.classList.contains("_header-show")) {
                    header.classList.add("_header-show");
                    header.style.minHeight = `${originalHeaderHeight}px`;
                }
                if (headerShow) {
                    if (scrollTop > scrollDirection) ; else if (!header.classList.contains("_header-show")) {
                        header.classList.add("_header-show");
                        header.style.minHeight = `${originalHeaderHeight}px`;
                    }
                    timer = setTimeout((() => {
                        if (!header.classList.contains("_header-show")) {
                            header.classList.add("_header-show");
                            header.style.minHeight = `${originalHeaderHeight}px`;
                        }
                    }), headerShowTimer);
                }
            } else {
                if (header.classList.contains("_header-scroll")) {
                    header.classList.remove("_header-scroll");
                    header.style.minHeight = `${originalHeaderHeight}px`;
                    if (headerCatalog) headerCatalog.style.cssText = "bottom: 11%;";
                }
                if (headerShow) if (header.classList.contains("_header-show")) {
                    header.classList.remove("_header-show");
                    header.style.minHeight = `${originalHeaderHeight}px`;
                }
            }
            scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
        }));
    }
    function digitsCounter() {
        if (document.querySelectorAll("[data-digits-counter]").length) document.querySelectorAll("[data-digits-counter]").forEach((element => {
            element.dataset.digitsCounter = element.innerHTML;
            element.innerHTML = `0`;
        }));
        function digitsCountersInit(digitsCountersItems) {
            let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
            if (digitsCounters.length) digitsCounters.forEach((digitsCounter => {
                digitsCountersAnimate(digitsCounter);
            }));
        }
        function digitsCountersAnimate(digitsCounter) {
            let startTimestamp = null;
            const duration = parseInt(digitsCounter.dataset.digitsCounterSpeed) ? parseInt(digitsCounter.dataset.digitsCounterSpeed) : 1e3;
            const startValue = parseInt(digitsCounter.dataset.digitsCounter);
            const startPosition = 0;
            const step = timestamp => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
                if (progress < 1) window.requestAnimationFrame(step);
            };
            window.requestAnimationFrame(step);
        }
        function digitsCounterAction(e) {
            const entry = e.detail.entry;
            const targetElement = entry.target;
            if (targetElement.querySelectorAll("[data-digits-counter]").length) digitsCountersInit(targetElement.querySelectorAll("[data-digits-counter]"));
        }
        document.addEventListener("watcherCallback", digitsCounterAction);
    }
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const t = (t, e = 1e4) => (t = parseFloat(t + "") || 0, Math.round((t + Number.EPSILON) * e) / e), e = function(t) {
        if (!(t && t instanceof Element && t.offsetParent)) return !1;
        const e = t.scrollHeight > t.clientHeight, i = window.getComputedStyle(t).overflowY, n = -1 !== i.indexOf("hidden"), s = -1 !== i.indexOf("visible");
        return e && !n && !s;
    }, i = function(t, n = void 0) {
        return !(!t || t === document.body || n && t === n) && (e(t) ? t : i(t.parentElement, n));
    }, n = function(t) {
        var e = (new DOMParser).parseFromString(t, "text/html").body;
        if (e.childElementCount > 1) {
            for (var i = document.createElement("div"); e.firstChild; ) i.appendChild(e.firstChild);
            return i;
        }
        return e.firstChild;
    }, s = t => `${t || ""}`.split(" ").filter((t => !!t)), o = (t, e, i) => {
        t && s(e).forEach((e => {
            t.classList.toggle(e, i || !1);
        }));
    };
    class a {
        constructor(t) {
            Object.defineProperty(this, "pageX", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "pageY", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "clientX", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "clientY", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "id", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "time", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "nativePointer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), this.nativePointer = t, this.pageX = t.pageX, this.pageY = t.pageY, this.clientX = t.clientX, 
            this.clientY = t.clientY, this.id = self.Touch && t instanceof Touch ? t.identifier : -1, 
            this.time = Date.now();
        }
    }
    const r = {
        passive: !1
    };
    class l {
        constructor(t, {start: e = (() => !0), move: i = (() => {}), end: n = (() => {})}) {
            Object.defineProperty(this, "element", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "startCallback", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "moveCallback", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "endCallback", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "currentPointers", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: []
            }), Object.defineProperty(this, "startPointers", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: []
            }), this.element = t, this.startCallback = e, this.moveCallback = i, this.endCallback = n;
            for (const t of [ "onPointerStart", "onTouchStart", "onMove", "onTouchEnd", "onPointerEnd", "onWindowBlur" ]) this[t] = this[t].bind(this);
            this.element.addEventListener("mousedown", this.onPointerStart, r), this.element.addEventListener("touchstart", this.onTouchStart, r), 
            this.element.addEventListener("touchmove", this.onMove, r), this.element.addEventListener("touchend", this.onTouchEnd), 
            this.element.addEventListener("touchcancel", this.onTouchEnd);
        }
        onPointerStart(t) {
            if (!t.buttons || 0 !== t.button) return;
            const e = new a(t);
            this.currentPointers.some((t => t.id === e.id)) || this.triggerPointerStart(e, t) && (window.addEventListener("mousemove", this.onMove), 
            window.addEventListener("mouseup", this.onPointerEnd), window.addEventListener("blur", this.onWindowBlur));
        }
        onTouchStart(t) {
            for (const e of Array.from(t.changedTouches || [])) this.triggerPointerStart(new a(e), t);
            window.addEventListener("blur", this.onWindowBlur);
        }
        onMove(t) {
            const e = this.currentPointers.slice(), i = "changedTouches" in t ? Array.from(t.changedTouches || []).map((t => new a(t))) : [ new a(t) ], n = [];
            for (const t of i) {
                const e = this.currentPointers.findIndex((e => e.id === t.id));
                e < 0 || (n.push(t), this.currentPointers[e] = t);
            }
            n.length && this.moveCallback(t, this.currentPointers.slice(), e);
        }
        onPointerEnd(t) {
            t.buttons > 0 && 0 !== t.button || (this.triggerPointerEnd(t, new a(t)), window.removeEventListener("mousemove", this.onMove), 
            window.removeEventListener("mouseup", this.onPointerEnd), window.removeEventListener("blur", this.onWindowBlur));
        }
        onTouchEnd(t) {
            for (const e of Array.from(t.changedTouches || [])) this.triggerPointerEnd(t, new a(e));
        }
        triggerPointerStart(t, e) {
            return !!this.startCallback(e, t, this.currentPointers.slice()) && (this.currentPointers.push(t), 
            this.startPointers.push(t), !0);
        }
        triggerPointerEnd(t, e) {
            const i = this.currentPointers.findIndex((t => t.id === e.id));
            i < 0 || (this.currentPointers.splice(i, 1), this.startPointers.splice(i, 1), this.endCallback(t, e, this.currentPointers.slice()));
        }
        onWindowBlur() {
            this.clear();
        }
        clear() {
            for (;this.currentPointers.length; ) {
                const t = this.currentPointers[this.currentPointers.length - 1];
                this.currentPointers.splice(this.currentPointers.length - 1, 1), this.startPointers.splice(this.currentPointers.length - 1, 1), 
                this.endCallback(new Event("touchend", {
                    bubbles: !0,
                    cancelable: !0,
                    clientX: t.clientX,
                    clientY: t.clientY
                }), t, this.currentPointers.slice());
            }
        }
        stop() {
            this.element.removeEventListener("mousedown", this.onPointerStart, r), this.element.removeEventListener("touchstart", this.onTouchStart, r), 
            this.element.removeEventListener("touchmove", this.onMove, r), this.element.removeEventListener("touchend", this.onTouchEnd), 
            this.element.removeEventListener("touchcancel", this.onTouchEnd), window.removeEventListener("mousemove", this.onMove), 
            window.removeEventListener("mouseup", this.onPointerEnd), window.removeEventListener("blur", this.onWindowBlur);
        }
    }
    function c(t, e) {
        return e ? Math.sqrt(Math.pow(e.clientX - t.clientX, 2) + Math.pow(e.clientY - t.clientY, 2)) : 0;
    }
    function h(t, e) {
        return e ? {
            clientX: (t.clientX + e.clientX) / 2,
            clientY: (t.clientY + e.clientY) / 2
        } : t;
    }
    const d = t => "object" == typeof t && null !== t && t.constructor === Object && "[object Object]" === Object.prototype.toString.call(t), u = (t, ...e) => {
        const i = e.length;
        for (let n = 0; n < i; n++) {
            const i = e[n] || {};
            Object.entries(i).forEach((([e, i]) => {
                const n = Array.isArray(i) ? [] : {};
                t[e] || Object.assign(t, {
                    [e]: n
                }), d(i) ? Object.assign(t[e], u(n, i)) : Array.isArray(i) ? Object.assign(t, {
                    [e]: [ ...i ]
                }) : Object.assign(t, {
                    [e]: i
                });
            }));
        }
        return t;
    }, p = function(t, e) {
        return t.split(".").reduce(((t, e) => "object" == typeof t ? t[e] : void 0), e);
    };
    class f {
        constructor(t = {}) {
            Object.defineProperty(this, "options", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: t
            }), Object.defineProperty(this, "events", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: new Map
            }), this.setOptions(t);
            for (const t of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) t.startsWith("on") && "function" == typeof this[t] && (this[t] = this[t].bind(this));
        }
        setOptions(t) {
            this.options = t ? u({}, this.constructor.defaults, t) : {};
            for (const [t, e] of Object.entries(this.option("on") || {})) this.on(t, e);
        }
        option(t, ...e) {
            let i = p(t, this.options);
            return i && "function" == typeof i && (i = i.call(this, this, ...e)), i;
        }
        optionFor(t, e, i, ...n) {
            let s = p(e, t);
            var o;
            "string" != typeof (o = s) || isNaN(o) || isNaN(parseFloat(o)) || (s = parseFloat(s)), 
            "true" === s && (s = !0), "false" === s && (s = !1), s && "function" == typeof s && (s = s.call(this, this, t, ...n));
            let a = p(e, this.options);
            return a && "function" == typeof a ? s = a.call(this, this, t, ...n, s) : void 0 === s && (s = a), 
            void 0 === s ? i : s;
        }
        cn(t) {
            const e = this.options.classes;
            return e && e[t] || "";
        }
        localize(t, e = []) {
            t = String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g, ((t, e, i) => {
                let n = "";
                return i ? n = this.option(`${e[0] + e.toLowerCase().substring(1)}.l10n.${i}`) : e && (n = this.option(`l10n.${e}`)), 
                n || (n = t), n;
            }));
            for (let i = 0; i < e.length; i++) t = t.split(e[i][0]).join(e[i][1]);
            return t = t.replace(/\{\{(.*?)\}\}/g, ((t, e) => e));
        }
        on(t, e) {
            let i = [];
            "string" == typeof t ? i = t.split(" ") : Array.isArray(t) && (i = t), this.events || (this.events = new Map), 
            i.forEach((t => {
                let i = this.events.get(t);
                i || (this.events.set(t, []), i = []), i.includes(e) || i.push(e), this.events.set(t, i);
            }));
        }
        off(t, e) {
            let i = [];
            "string" == typeof t ? i = t.split(" ") : Array.isArray(t) && (i = t), i.forEach((t => {
                const i = this.events.get(t);
                if (Array.isArray(i)) {
                    const t = i.indexOf(e);
                    t > -1 && i.splice(t, 1);
                }
            }));
        }
        emit(t, ...e) {
            [ ...this.events.get(t) || [] ].forEach((t => t(this, ...e))), "*" !== t && this.emit("*", t, ...e);
        }
    }
    Object.defineProperty(f, "version", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "5.0.36"
    }), Object.defineProperty(f, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {}
    });
    class g extends f {
        constructor(t = {}) {
            super(t), Object.defineProperty(this, "plugins", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {}
            });
        }
        attachPlugins(t = {}) {
            const e = new Map;
            for (const [i, n] of Object.entries(t)) {
                const t = this.option(i), s = this.plugins[i];
                s || !1 === t ? s && !1 === t && (s.detach(), delete this.plugins[i]) : e.set(i, new n(this, t || {}));
            }
            for (const [t, i] of e) this.plugins[t] = i, i.attach();
        }
        detachPlugins(t) {
            t = t || Object.keys(this.plugins);
            for (const e of t) {
                const t = this.plugins[e];
                t && t.detach(), delete this.plugins[e];
            }
            return this.emit("detachPlugins"), this;
        }
    }
    var m;
    !function(t) {
        t[t.Init = 0] = "Init", t[t.Error = 1] = "Error", t[t.Ready = 2] = "Ready", t[t.Panning = 3] = "Panning", 
        t[t.Mousemove = 4] = "Mousemove", t[t.Destroy = 5] = "Destroy";
    }(m || (m = {}));
    const v = [ "a", "b", "c", "d", "e", "f" ], b = {
        PANUP: "Move up",
        PANDOWN: "Move down",
        PANLEFT: "Move left",
        PANRIGHT: "Move right",
        ZOOMIN: "Zoom in",
        ZOOMOUT: "Zoom out",
        TOGGLEZOOM: "Toggle zoom level",
        TOGGLE1TO1: "Toggle zoom level",
        ITERATEZOOM: "Toggle zoom level",
        ROTATECCW: "Rotate counterclockwise",
        ROTATECW: "Rotate clockwise",
        FLIPX: "Flip horizontally",
        FLIPY: "Flip vertically",
        FITX: "Fit horizontally",
        FITY: "Fit vertically",
        RESET: "Reset",
        TOGGLEFS: "Toggle fullscreen"
    }, y = {
        content: null,
        width: "auto",
        height: "auto",
        panMode: "drag",
        touch: !0,
        dragMinThreshold: 3,
        lockAxis: !1,
        mouseMoveFactor: 1,
        mouseMoveFriction: .12,
        zoom: !0,
        pinchToZoom: !0,
        panOnlyZoomed: "auto",
        minScale: 1,
        maxScale: 2,
        friction: .25,
        dragFriction: .35,
        decelFriction: .05,
        click: "toggleZoom",
        dblClick: !1,
        wheel: "zoom",
        wheelLimit: 7,
        spinner: !0,
        bounds: "auto",
        infinite: !1,
        rubberband: !0,
        bounce: !0,
        maxVelocity: 75,
        transformParent: !1,
        classes: {
            content: "f-panzoom__content",
            isLoading: "is-loading",
            canZoomIn: "can-zoom_in",
            canZoomOut: "can-zoom_out",
            isDraggable: "is-draggable",
            isDragging: "is-dragging",
            inFullscreen: "in-fullscreen",
            htmlHasFullscreen: "with-panzoom-in-fullscreen"
        },
        l10n: b
    }, w = '<circle cx="25" cy="25" r="20"></circle>', x = '<div class="f-spinner"><svg viewBox="0 0 50 50">' + w + w + "</svg></div>", E = t => t && null !== t && t instanceof Element && "nodeType" in t, S = (t, e) => {
        t && s(e).forEach((e => {
            t.classList.remove(e);
        }));
    }, P = (t, e) => {
        t && s(e).forEach((e => {
            t.classList.add(e);
        }));
    }, C = {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 0,
        f: 0
    }, T = 1e5, M = 1e4, O = "mousemove", A = "drag", L = "content", z = "auto";
    let R = null, k = null;
    class I extends g {
        get fits() {
            return this.contentRect.width - this.contentRect.fitWidth < 1 && this.contentRect.height - this.contentRect.fitHeight < 1;
        }
        get isTouchDevice() {
            return null === k && (k = window.matchMedia("(hover: none)").matches), k;
        }
        get isMobile() {
            return null === R && (R = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)), 
            R;
        }
        get panMode() {
            return this.options.panMode !== O || this.isTouchDevice ? A : O;
        }
        get panOnlyZoomed() {
            const t = this.options.panOnlyZoomed;
            return t === z ? this.isTouchDevice : t;
        }
        get isInfinite() {
            return this.option("infinite");
        }
        get angle() {
            return 180 * Math.atan2(this.current.b, this.current.a) / Math.PI || 0;
        }
        get targetAngle() {
            return 180 * Math.atan2(this.target.b, this.target.a) / Math.PI || 0;
        }
        get scale() {
            const {a: t, b: e} = this.current;
            return Math.sqrt(t * t + e * e) || 1;
        }
        get targetScale() {
            const {a: t, b: e} = this.target;
            return Math.sqrt(t * t + e * e) || 1;
        }
        get minScale() {
            return this.option("minScale") || 1;
        }
        get fullScale() {
            const {contentRect: t} = this;
            return t.fullWidth / t.fitWidth || 1;
        }
        get maxScale() {
            return this.fullScale * (this.option("maxScale") || 1) || 1;
        }
        get coverScale() {
            const {containerRect: t, contentRect: e} = this, i = Math.max(t.height / e.fitHeight, t.width / e.fitWidth) || 1;
            return Math.min(this.fullScale, i);
        }
        get isScaling() {
            return Math.abs(this.targetScale - this.scale) > 1e-5 && !this.isResting;
        }
        get isContentLoading() {
            const t = this.content;
            return !!(t && t instanceof HTMLImageElement) && !t.complete;
        }
        get isResting() {
            if (this.isBouncingX || this.isBouncingY) return !1;
            for (const t of v) {
                const e = "e" == t || "f" === t ? 1e-4 : 1e-5;
                if (Math.abs(this.target[t] - this.current[t]) > e) return !1;
            }
            return !(!this.ignoreBounds && !this.checkBounds().inBounds);
        }
        constructor(t, e = {}, i = {}) {
            var s;
            if (super(e), Object.defineProperty(this, "pointerTracker", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "resizeObserver", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "updateTimer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "clickTimer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "rAF", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "isTicking", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "ignoreBounds", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "isBouncingX", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "isBouncingY", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "clicks", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "trackingPoints", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: []
            }), Object.defineProperty(this, "pwt", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "cwd", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "pmme", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "friction", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "state", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: m.Init
            }), Object.defineProperty(this, "isDragging", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "container", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "content", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "spinner", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "containerRect", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0
                }
            }), Object.defineProperty(this, "contentRect", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    fullWidth: 0,
                    fullHeight: 0,
                    fitWidth: 0,
                    fitHeight: 0,
                    width: 0,
                    height: 0
                }
            }), Object.defineProperty(this, "dragStart", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {
                    x: 0,
                    y: 0,
                    top: 0,
                    left: 0,
                    time: 0
                }
            }), Object.defineProperty(this, "dragOffset", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {
                    x: 0,
                    y: 0,
                    time: 0
                }
            }), Object.defineProperty(this, "current", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: Object.assign({}, C)
            }), Object.defineProperty(this, "target", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: Object.assign({}, C)
            }), Object.defineProperty(this, "velocity", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                    e: 0,
                    f: 0
                }
            }), Object.defineProperty(this, "lockedAxis", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), !t) throw new Error("Container Element Not Found");
            this.container = t, this.initContent(), this.attachPlugins(Object.assign(Object.assign({}, I.Plugins), i)), 
            this.emit("attachPlugins"), this.emit("init");
            const o = this.content;
            if (o.addEventListener("load", this.onLoad), o.addEventListener("error", this.onError), 
            this.isContentLoading) {
                if (this.option("spinner")) {
                    t.classList.add(this.cn("isLoading"));
                    const e = n(x);
                    !t.contains(o) || o.parentElement instanceof HTMLPictureElement ? this.spinner = t.appendChild(e) : this.spinner = (null === (s = o.parentElement) || void 0 === s ? void 0 : s.insertBefore(e, o)) || null;
                }
                this.emit("beforeLoad");
            } else queueMicrotask((() => {
                this.enable();
            }));
        }
        initContent() {
            const {container: t} = this, e = this.cn(L);
            let i = this.option(L) || t.querySelector(`.${e}`);
            if (i || (i = t.querySelector("img,picture") || t.firstElementChild, i && P(i, e)), 
            i instanceof HTMLPictureElement && (i = i.querySelector("img")), !i) throw new Error("No content found");
            this.content = i;
        }
        onLoad() {
            const {spinner: t, container: e, state: i} = this;
            t && (t.remove(), this.spinner = null), this.option("spinner") && e.classList.remove(this.cn("isLoading")), 
            this.emit("afterLoad"), i === m.Init ? this.enable() : this.updateMetrics();
        }
        onError() {
            this.state !== m.Destroy && (this.spinner && (this.spinner.remove(), this.spinner = null), 
            this.stop(), this.detachEvents(), this.state = m.Error, this.emit("error"));
        }
        getNextScale(t) {
            const {fullScale: e, targetScale: i, coverScale: n, maxScale: s, minScale: o} = this;
            let a = o;
            switch (t) {
              case "toggleMax":
                a = i - o < .5 * (s - o) ? s : o;
                break;

              case "toggleCover":
                a = i - o < .5 * (n - o) ? n : o;
                break;

              case "toggleZoom":
                a = i - o < .5 * (e - o) ? e : o;
                break;

              case "iterateZoom":
                let t = [ 1, e, s ].sort(((t, e) => t - e)), r = t.findIndex((t => t > i + 1e-5));
                a = t[r] || 1;
            }
            return a;
        }
        attachObserver() {
            var t;
            const e = () => {
                const {container: t, containerRect: e} = this;
                return Math.abs(e.width - t.getBoundingClientRect().width) > .1 || Math.abs(e.height - t.getBoundingClientRect().height) > .1;
            };
            this.resizeObserver || void 0 === window.ResizeObserver || (this.resizeObserver = new ResizeObserver((() => {
                this.updateTimer || (e() ? (this.onResize(), this.isMobile && (this.updateTimer = setTimeout((() => {
                    e() && this.onResize(), this.updateTimer = null;
                }), 500))) : this.updateTimer && (clearTimeout(this.updateTimer), this.updateTimer = null));
            }))), null === (t = this.resizeObserver) || void 0 === t || t.observe(this.container);
        }
        detachObserver() {
            var t;
            null === (t = this.resizeObserver) || void 0 === t || t.disconnect();
        }
        attachEvents() {
            const {container: t} = this;
            t.addEventListener("click", this.onClick, {
                passive: !1,
                capture: !1
            }), t.addEventListener("wheel", this.onWheel, {
                passive: !1
            }), this.pointerTracker = new l(t, {
                start: this.onPointerDown,
                move: this.onPointerMove,
                end: this.onPointerUp
            }), document.addEventListener(O, this.onMouseMove);
        }
        detachEvents() {
            var t;
            const {container: e} = this;
            e.removeEventListener("click", this.onClick, {
                passive: !1,
                capture: !1
            }), e.removeEventListener("wheel", this.onWheel, {
                passive: !1
            }), null === (t = this.pointerTracker) || void 0 === t || t.stop(), this.pointerTracker = null, 
            document.removeEventListener(O, this.onMouseMove), document.removeEventListener("keydown", this.onKeydown, !0), 
            this.clickTimer && (clearTimeout(this.clickTimer), this.clickTimer = null), this.updateTimer && (clearTimeout(this.updateTimer), 
            this.updateTimer = null);
        }
        animate() {
            this.setTargetForce();
            const t = this.friction, e = this.option("maxVelocity");
            for (const i of v) t ? (this.velocity[i] *= 1 - t, e && !this.isScaling && (this.velocity[i] = Math.max(Math.min(this.velocity[i], e), -1 * e)), 
            this.current[i] += this.velocity[i]) : this.current[i] = this.target[i];
            this.setTransform(), this.setEdgeForce(), !this.isResting || this.isDragging ? this.rAF = requestAnimationFrame((() => this.animate())) : this.stop("current");
        }
        setTargetForce() {
            for (const t of v) "e" === t && this.isBouncingX || "f" === t && this.isBouncingY || (this.velocity[t] = (1 / (1 - this.friction) - 1) * (this.target[t] - this.current[t]));
        }
        checkBounds(t = 0, e = 0) {
            const {current: i} = this, n = i.e + t, s = i.f + e, o = this.getBounds(), {x: a, y: r} = o, l = a.min, c = a.max, h = r.min, d = r.max;
            let u = 0, p = 0;
            return l !== 1 / 0 && n < l ? u = l - n : c !== 1 / 0 && n > c && (u = c - n), h !== 1 / 0 && s < h ? p = h - s : d !== 1 / 0 && s > d && (p = d - s), 
            Math.abs(u) < 1e-4 && (u = 0), Math.abs(p) < 1e-4 && (p = 0), Object.assign(Object.assign({}, o), {
                xDiff: u,
                yDiff: p,
                inBounds: !u && !p
            });
        }
        clampTargetBounds() {
            const {target: t} = this, {x: e, y: i} = this.getBounds();
            e.min !== 1 / 0 && (t.e = Math.max(t.e, e.min)), e.max !== 1 / 0 && (t.e = Math.min(t.e, e.max)), 
            i.min !== 1 / 0 && (t.f = Math.max(t.f, i.min)), i.max !== 1 / 0 && (t.f = Math.min(t.f, i.max));
        }
        calculateContentDim(t = this.current) {
            const {content: e, contentRect: i} = this, {fitWidth: n, fitHeight: s, fullWidth: o, fullHeight: a} = i;
            let r = o, l = a;
            if (this.option("zoom") || 0 !== this.angle) {
                const i = !(e instanceof HTMLImageElement) && ("none" === window.getComputedStyle(e).maxWidth || "none" === window.getComputedStyle(e).maxHeight), c = i ? o : n, h = i ? a : s, d = this.getMatrix(t), u = new DOMPoint(0, 0).matrixTransform(d), p = new DOMPoint(0 + c, 0).matrixTransform(d), f = new DOMPoint(0 + c, 0 + h).matrixTransform(d), g = new DOMPoint(0, 0 + h).matrixTransform(d), m = Math.abs(f.x - u.x), v = Math.abs(f.y - u.y), b = Math.abs(g.x - p.x), y = Math.abs(g.y - p.y);
                r = Math.max(m, b), l = Math.max(v, y);
            }
            return {
                contentWidth: r,
                contentHeight: l
            };
        }
        setEdgeForce() {
            if (this.ignoreBounds || this.isDragging || this.panMode === O || this.targetScale < this.scale) return this.isBouncingX = !1, 
            void (this.isBouncingY = !1);
            const {target: t} = this, {x: e, y: i, xDiff: n, yDiff: s} = this.checkBounds();
            const o = this.option("maxVelocity");
            let a = this.velocity.e, r = this.velocity.f;
            0 !== n ? (this.isBouncingX = !0, n * a <= 0 ? a += .14 * n : (a = .14 * n, e.min !== 1 / 0 && (this.target.e = Math.max(t.e, e.min)), 
            e.max !== 1 / 0 && (this.target.e = Math.min(t.e, e.max))), o && (a = Math.max(Math.min(a, o), -1 * o))) : this.isBouncingX = !1, 
            0 !== s ? (this.isBouncingY = !0, s * r <= 0 ? r += .14 * s : (r = .14 * s, i.min !== 1 / 0 && (this.target.f = Math.max(t.f, i.min)), 
            i.max !== 1 / 0 && (this.target.f = Math.min(t.f, i.max))), o && (r = Math.max(Math.min(r, o), -1 * o))) : this.isBouncingY = !1, 
            this.isBouncingX && (this.velocity.e = a), this.isBouncingY && (this.velocity.f = r);
        }
        enable() {
            const {content: t} = this, e = new DOMMatrixReadOnly(window.getComputedStyle(t).transform);
            for (const t of v) this.current[t] = this.target[t] = e[t];
            this.updateMetrics(), this.attachObserver(), this.attachEvents(), this.state = m.Ready, 
            this.emit("ready");
        }
        onClick(t) {
            var e;
            "click" === t.type && 0 === t.detail && (this.dragOffset.x = 0, this.dragOffset.y = 0), 
            this.isDragging && (null === (e = this.pointerTracker) || void 0 === e || e.clear(), 
            this.trackingPoints = [], this.startDecelAnim());
            const i = t.target;
            if (!i || t.defaultPrevented) return;
            if (i.hasAttribute("disabled")) return t.preventDefault(), void t.stopPropagation();
            if ((() => {
                const t = window.getSelection();
                return t && "Range" === t.type;
            })() && !i.closest("button")) return;
            const n = i.closest("[data-panzoom-action]"), s = i.closest("[data-panzoom-change]"), o = n || s, a = o && E(o) ? o.dataset : null;
            if (a) {
                const e = a.panzoomChange, i = a.panzoomAction;
                if ((e || i) && t.preventDefault(), e) {
                    let t = {};
                    try {
                        t = JSON.parse(e);
                    } catch (t) {
                        console && console.warn("The given data was not valid JSON");
                    }
                    return void this.applyChange(t);
                }
                if (i) return void (this[i] && this[i]());
            }
            if (Math.abs(this.dragOffset.x) > 3 || Math.abs(this.dragOffset.y) > 3) return t.preventDefault(), 
            void t.stopPropagation();
            if (i.closest("[data-fancybox]")) return;
            const r = this.content.getBoundingClientRect(), l = this.dragStart;
            if (l.time && !this.canZoomOut() && (Math.abs(r.x - l.x) > 2 || Math.abs(r.y - l.y) > 2)) return;
            this.dragStart.time = 0;
            const c = e => {
                this.option("zoom", t) && e && "string" == typeof e && /(iterateZoom)|(toggle(Zoom|Full|Cover|Max)|(zoomTo(Fit|Cover|Max)))/.test(e) && "function" == typeof this[e] && (t.preventDefault(), 
                this[e]({
                    event: t
                }));
            }, h = this.option("click", t), d = this.option("dblClick", t);
            d ? (this.clicks++, 1 == this.clicks && (this.clickTimer = setTimeout((() => {
                1 === this.clicks ? (this.emit("click", t), !t.defaultPrevented && h && c(h)) : (this.emit("dblClick", t), 
                t.defaultPrevented || c(d)), this.clicks = 0, this.clickTimer = null;
            }), 350))) : (this.emit("click", t), !t.defaultPrevented && h && c(h));
        }
        addTrackingPoint(t) {
            const e = this.trackingPoints.filter((t => t.time > Date.now() - 100));
            e.push(t), this.trackingPoints = e;
        }
        onPointerDown(t, e, i) {
            var n;
            if (!1 === this.option("touch", t)) return !1;
            this.pwt = 0, this.dragOffset = {
                x: 0,
                y: 0,
                time: 0
            }, this.trackingPoints = [];
            const s = this.content.getBoundingClientRect();
            if (this.dragStart = {
                x: s.x,
                y: s.y,
                top: s.top,
                left: s.left,
                time: Date.now()
            }, this.clickTimer) return !1;
            if (this.panMode === O && this.targetScale > 1) return t.preventDefault(), t.stopPropagation(), 
            !1;
            const o = t.composedPath()[0];
            if (!i.length) {
                if ([ "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO", "IFRAME" ].includes(o.nodeName) || o.closest("[contenteditable],[data-selectable],[data-draggable],[data-clickable],[data-panzoom-change],[data-panzoom-action]")) return !1;
                null === (n = window.getSelection()) || void 0 === n || n.removeAllRanges();
            }
            if ("mousedown" === t.type) [ "A", "BUTTON" ].includes(o.nodeName) || t.preventDefault(); else if (Math.abs(this.velocity.a) > .3) return !1;
            return this.target.e = this.current.e, this.target.f = this.current.f, this.stop(), 
            this.isDragging || (this.isDragging = !0, this.addTrackingPoint(e), this.emit("touchStart", t)), 
            !0;
        }
        onPointerMove(e, n, s) {
            if (!1 === this.option("touch", e)) return;
            if (!this.isDragging) return;
            if (n.length < 2 && this.panOnlyZoomed && t(this.targetScale) <= t(this.minScale)) return;
            if (this.emit("touchMove", e), e.defaultPrevented) return;
            this.addTrackingPoint(n[0]);
            const {content: o} = this, a = h(s[0], s[1]), r = h(n[0], n[1]);
            let l = 0, d = 0;
            if (n.length > 1) {
                const t = o.getBoundingClientRect();
                l = a.clientX - t.left - .5 * t.width, d = a.clientY - t.top - .5 * t.height;
            }
            const u = c(s[0], s[1]), p = c(n[0], n[1]);
            let f = u ? p / u : 1, g = r.clientX - a.clientX, m = r.clientY - a.clientY;
            this.dragOffset.x += g, this.dragOffset.y += m, this.dragOffset.time = Date.now() - this.dragStart.time;
            let v = t(this.targetScale) === t(this.minScale) && this.option("lockAxis");
            if (v && !this.lockedAxis) if ("xy" === v || "y" === v || "touchmove" === e.type) {
                if (Math.abs(this.dragOffset.x) < 6 && Math.abs(this.dragOffset.y) < 6) return void e.preventDefault();
                const t = Math.abs(180 * Math.atan2(this.dragOffset.y, this.dragOffset.x) / Math.PI);
                this.lockedAxis = t > 45 && t < 135 ? "y" : "x", this.dragOffset.x = 0, this.dragOffset.y = 0, 
                g = 0, m = 0;
            } else this.lockedAxis = v;
            if (i(e.target, this.content) && (v = "x", this.dragOffset.y = 0), v && "xy" !== v && this.lockedAxis !== v && t(this.targetScale) === t(this.minScale)) return;
            e.cancelable && e.preventDefault(), this.container.classList.add(this.cn("isDragging"));
            const b = this.checkBounds(g, m);
            this.option("rubberband") ? ("x" !== this.isInfinite && (b.xDiff > 0 && g < 0 || b.xDiff < 0 && g > 0) && (g *= Math.max(0, .5 - Math.abs(.75 / this.contentRect.fitWidth * b.xDiff))), 
            "y" !== this.isInfinite && (b.yDiff > 0 && m < 0 || b.yDiff < 0 && m > 0) && (m *= Math.max(0, .5 - Math.abs(.75 / this.contentRect.fitHeight * b.yDiff)))) : (b.xDiff && (g = 0), 
            b.yDiff && (m = 0));
            const y = this.targetScale, w = this.minScale, x = this.maxScale;
            y < .5 * w && (f = Math.max(f, w)), y > 1.5 * x && (f = Math.min(f, x)), "y" === this.lockedAxis && t(y) === t(w) && (g = 0), 
            "x" === this.lockedAxis && t(y) === t(w) && (m = 0), this.applyChange({
                originX: l,
                originY: d,
                panX: g,
                panY: m,
                scale: f,
                friction: this.option("dragFriction"),
                ignoreBounds: !0
            });
        }
        onPointerUp(t, e, n) {
            if (n.length) return this.dragOffset.x = 0, this.dragOffset.y = 0, void (this.trackingPoints = []);
            this.container.classList.remove(this.cn("isDragging")), this.isDragging && (this.addTrackingPoint(e), 
            this.panOnlyZoomed && this.contentRect.width - this.contentRect.fitWidth < 1 && this.contentRect.height - this.contentRect.fitHeight < 1 && (this.trackingPoints = []), 
            i(t.target, this.content) && "y" === this.lockedAxis && (this.trackingPoints = []), 
            this.emit("touchEnd", t), this.isDragging = !1, this.lockedAxis = !1, this.state !== m.Destroy && (t.defaultPrevented || this.startDecelAnim()));
        }
        startDecelAnim() {
            var e;
            const i = this.isScaling;
            this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = !1, 
            this.isBouncingY = !1;
            for (const t of v) this.velocity[t] = 0;
            this.target.e = this.current.e, this.target.f = this.current.f, S(this.container, "is-scaling"), 
            S(this.container, "is-animating"), this.isTicking = !1;
            const {trackingPoints: n} = this, s = n[0], o = n[n.length - 1];
            let a = 0, r = 0, l = 0;
            o && s && (a = o.clientX - s.clientX, r = o.clientY - s.clientY, l = o.time - s.time);
            const c = (null === (e = window.visualViewport) || void 0 === e ? void 0 : e.scale) || 1;
            1 !== c && (a *= c, r *= c);
            let h = 0, d = 0, u = 0, p = 0, f = this.option("decelFriction");
            const g = this.targetScale;
            if (l > 0) {
                u = Math.abs(a) > 3 ? a / (l / 30) : 0, p = Math.abs(r) > 3 ? r / (l / 30) : 0;
                const t = this.option("maxVelocity");
                t && (u = Math.max(Math.min(u, t), -1 * t), p = Math.max(Math.min(p, t), -1 * t));
            }
            u && (h = u / (1 / (1 - f) - 1)), p && (d = p / (1 / (1 - f) - 1)), ("y" === this.option("lockAxis") || "xy" === this.option("lockAxis") && "y" === this.lockedAxis && t(g) === this.minScale) && (h = u = 0), 
            ("x" === this.option("lockAxis") || "xy" === this.option("lockAxis") && "x" === this.lockedAxis && t(g) === this.minScale) && (d = p = 0);
            const m = this.dragOffset.x, b = this.dragOffset.y, y = this.option("dragMinThreshold") || 0;
            Math.abs(m) < y && Math.abs(b) < y && (h = d = 0, u = p = 0), (this.option("zoom") && (g < this.minScale - 1e-5 || g > this.maxScale + 1e-5) || i && !h && !d) && (f = .35), 
            this.applyChange({
                panX: h,
                panY: d,
                friction: f
            }), this.emit("decel", u, p, m, b);
        }
        onWheel(t) {
            var e = [ -t.deltaX || 0, -t.deltaY || 0, -t.detail || 0 ].reduce((function(t, e) {
                return Math.abs(e) > Math.abs(t) ? e : t;
            }));
            const i = Math.max(-1, Math.min(1, e));
            if (this.emit("wheel", t, i), this.panMode === O) return;
            if (t.defaultPrevented) return;
            const n = this.option("wheel");
            "pan" === n ? (t.preventDefault(), this.panOnlyZoomed && !this.canZoomOut() || this.applyChange({
                panX: 2 * -t.deltaX,
                panY: 2 * -t.deltaY,
                bounce: !1
            })) : "zoom" === n && !1 !== this.option("zoom") && this.zoomWithWheel(t);
        }
        onMouseMove(t) {
            this.panWithMouse(t);
        }
        onKeydown(t) {
            "Escape" === t.key && this.toggleFS();
        }
        onResize() {
            this.updateMetrics(), this.checkBounds().inBounds || this.requestTick();
        }
        setTransform() {
            this.emit("beforeTransform");
            const {current: e, target: i, content: n, contentRect: s} = this, o = Object.assign({}, C);
            for (const n of v) {
                const s = "e" == n || "f" === n ? M : T;
                o[n] = t(e[n], s), Math.abs(i[n] - e[n]) < ("e" == n || "f" === n ? .51 : .001) && (e[n] = i[n]);
            }
            let {a, b: r, c: l, d: c, e: h, f: d} = o, u = `matrix(${a}, ${r}, ${l}, ${c}, ${h}, ${d})`, p = n.parentElement instanceof HTMLPictureElement ? n.parentElement : n;
            if (this.option("transformParent") && (p = p.parentElement || p), p.style.transform === u) return;
            p.style.transform = u;
            const {contentWidth: f, contentHeight: g} = this.calculateContentDim();
            s.width = f, s.height = g, this.emit("afterTransform");
        }
        updateMetrics(e = !1) {
            var i;
            if (!this || this.state === m.Destroy) return;
            if (this.isContentLoading) return;
            const n = Math.max(1, (null === (i = window.visualViewport) || void 0 === i ? void 0 : i.scale) || 1), {container: s, content: o} = this, a = o instanceof HTMLImageElement, r = s.getBoundingClientRect(), l = getComputedStyle(this.container);
            let c = r.width * n, h = r.height * n;
            const d = parseFloat(l.paddingTop) + parseFloat(l.paddingBottom), u = c - (parseFloat(l.paddingLeft) + parseFloat(l.paddingRight)), p = h - d;
            this.containerRect = {
                width: c,
                height: h,
                innerWidth: u,
                innerHeight: p
            };
            const f = parseFloat(o.dataset.width || "") || (t => {
                let e = 0;
                return e = t instanceof HTMLImageElement ? t.naturalWidth : t instanceof SVGElement ? t.width.baseVal.value : Math.max(t.offsetWidth, t.scrollWidth), 
                e || 0;
            })(o), g = parseFloat(o.dataset.height || "") || (t => {
                let e = 0;
                return e = t instanceof HTMLImageElement ? t.naturalHeight : t instanceof SVGElement ? t.height.baseVal.value : Math.max(t.offsetHeight, t.scrollHeight), 
                e || 0;
            })(o);
            let v = this.option("width", f) || z, b = this.option("height", g) || z;
            const y = v === z, w = b === z;
            "number" != typeof v && (v = f), "number" != typeof b && (b = g), y && (v = f * (b / g)), 
            w && (b = g / (f / v));
            let x = o.parentElement instanceof HTMLPictureElement ? o.parentElement : o;
            this.option("transformParent") && (x = x.parentElement || x);
            const E = x.getAttribute("style") || "";
            x.style.setProperty("transform", "none", "important"), a && (x.style.width = "", 
            x.style.height = ""), x.offsetHeight;
            const S = o.getBoundingClientRect();
            let P = S.width * n, C = S.height * n, T = P, M = C;
            P = Math.min(P, v), C = Math.min(C, b), a ? ({width: P, height: C} = ((t, e, i, n) => {
                const s = i / t, o = n / e, a = Math.min(s, o);
                return {
                    width: t *= a,
                    height: e *= a
                };
            })(v, b, P, C)) : (P = Math.min(P, v), C = Math.min(C, b));
            let O = .5 * (M - C), A = .5 * (T - P);
            this.contentRect = Object.assign(Object.assign({}, this.contentRect), {
                top: S.top - r.top + O,
                bottom: r.bottom - S.bottom + O,
                left: S.left - r.left + A,
                right: r.right - S.right + A,
                fitWidth: P,
                fitHeight: C,
                width: P,
                height: C,
                fullWidth: v,
                fullHeight: b
            }), x.style.cssText = E, a && (x.style.width = `${P}px`, x.style.height = `${C}px`), 
            this.setTransform(), !0 !== e && this.emit("refresh"), this.ignoreBounds || (t(this.targetScale) < t(this.minScale) ? this.zoomTo(this.minScale, {
                friction: 0
            }) : this.targetScale > this.maxScale ? this.zoomTo(this.maxScale, {
                friction: 0
            }) : this.state === m.Init || this.checkBounds().inBounds || this.requestTick()), 
            this.updateControls();
        }
        calculateBounds() {
            const {contentWidth: e, contentHeight: i} = this.calculateContentDim(this.target), {targetScale: n, lockedAxis: s} = this, {fitWidth: o, fitHeight: a} = this.contentRect;
            let r = 0, l = 0, c = 0, h = 0;
            const d = this.option("infinite");
            if (!0 === d || s && d === s) r = -1 / 0, c = 1 / 0, l = -1 / 0, h = 1 / 0; else {
                let {containerRect: s, contentRect: d} = this, u = t(o * n, M), p = t(a * n, M), {innerWidth: f, innerHeight: g} = s;
                if (s.width === u && (f = s.width), s.width === p && (g = s.height), e > f) {
                    c = .5 * (e - f), r = -1 * c;
                    let t = .5 * (d.right - d.left);
                    r += t, c += t;
                }
                if (o > f && e < f && (r -= .5 * (o - f), c -= .5 * (o - f)), i > g) {
                    h = .5 * (i - g), l = -1 * h;
                    let t = .5 * (d.bottom - d.top);
                    l += t, h += t;
                }
                a > g && i < g && (r -= .5 * (a - g), c -= .5 * (a - g));
            }
            return {
                x: {
                    min: r,
                    max: c
                },
                y: {
                    min: l,
                    max: h
                }
            };
        }
        getBounds() {
            const t = this.option("bounds");
            return t !== z ? t : this.calculateBounds();
        }
        updateControls() {
            const e = this, i = e.container, {panMode: n, contentRect: s, targetScale: a, minScale: r} = e;
            let l = r, c = e.option("click") || !1;
            c && (l = e.getNextScale(c));
            let h = e.canZoomIn(), d = e.canZoomOut(), u = n === A && !!this.option("touch"), p = d && u;
            if (u && (t(a) < t(r) && !this.panOnlyZoomed && (p = !0), (t(s.width, 1) > t(s.fitWidth, 1) || t(s.height, 1) > t(s.fitHeight, 1)) && (p = !0)), 
            t(s.width * a, 1) < t(s.fitWidth, 1) && (p = !1), n === O && (p = !1), o(i, this.cn("isDraggable"), p), 
            !this.option("zoom")) return;
            let f = h && t(l) > t(a), g = !f && !p && d && t(l) < t(a);
            o(i, this.cn("canZoomIn"), f), o(i, this.cn("canZoomOut"), g);
            for (const t of i.querySelectorAll("[data-panzoom-action]")) {
                let e = !1, i = !1;
                switch (t.dataset.panzoomAction) {
                  case "zoomIn":
                    h ? e = !0 : i = !0;
                    break;

                  case "zoomOut":
                    d ? e = !0 : i = !0;
                    break;

                  case "toggleZoom":
                  case "iterateZoom":
                    h || d ? e = !0 : i = !0;
                    const n = t.querySelector("g");
                    n && (n.style.display = h ? "" : "none");
                }
                e ? (t.removeAttribute("disabled"), t.removeAttribute("tabindex")) : i && (t.setAttribute("disabled", ""), 
                t.setAttribute("tabindex", "-1"));
            }
        }
        panTo({x: t = this.target.e, y: e = this.target.f, scale: i = this.targetScale, friction: n = this.option("friction"), angle: s = 0, originX: o = 0, originY: a = 0, flipX: r = !1, flipY: l = !1, ignoreBounds: c = !1}) {
            this.state !== m.Destroy && this.applyChange({
                panX: t - this.target.e,
                panY: e - this.target.f,
                scale: i / this.targetScale,
                angle: s,
                originX: o,
                originY: a,
                friction: n,
                flipX: r,
                flipY: l,
                ignoreBounds: c
            });
        }
        applyChange({panX: e = 0, panY: i = 0, scale: n = 1, angle: s = 0, originX: o = -this.current.e, originY: a = -this.current.f, friction: r = this.option("friction"), flipX: l = !1, flipY: c = !1, ignoreBounds: h = !1, bounce: d = this.option("bounce")}) {
            const u = this.state;
            if (u === m.Destroy) return;
            this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.friction = r || 0, 
            this.ignoreBounds = h;
            const {current: p} = this, f = p.e, g = p.f, b = this.getMatrix(this.target);
            let y = (new DOMMatrix).translate(f, g).translate(o, a).translate(e, i);
            if (this.option("zoom")) {
                if (!h) {
                    const t = this.targetScale, e = this.minScale, i = this.maxScale;
                    t * n < e && (n = e / t), t * n > i && (n = i / t);
                }
                y = y.scale(n);
            }
            y = y.translate(-o, -a).translate(-f, -g).multiply(b), s && (y = y.rotate(s)), l && (y = y.scale(-1, 1)), 
            c && (y = y.scale(1, -1));
            for (const e of v) "e" !== e && "f" !== e && (y[e] > this.minScale + 1e-5 || y[e] < this.minScale - 1e-5) ? this.target[e] = y[e] : this.target[e] = t(y[e], M);
            (this.targetScale < this.scale || Math.abs(n - 1) > .1 || this.panMode === O || !1 === d) && !h && this.clampTargetBounds(), 
            u === m.Init ? this.animate() : this.isResting || (this.state = m.Panning, this.requestTick());
        }
        stop(t = !1) {
            if (this.state === m.Init || this.state === m.Destroy) return;
            const e = this.isTicking;
            this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = !1, 
            this.isBouncingY = !1;
            for (const e of v) this.velocity[e] = 0, "current" === t ? this.current[e] = this.target[e] : "target" === t && (this.target[e] = this.current[e]);
            this.setTransform(), S(this.container, "is-scaling"), S(this.container, "is-animating"), 
            this.isTicking = !1, this.state = m.Ready, e && (this.emit("endAnimation"), this.updateControls());
        }
        requestTick() {
            this.isTicking || (this.emit("startAnimation"), this.updateControls(), P(this.container, "is-animating"), 
            this.isScaling && P(this.container, "is-scaling")), this.isTicking = !0, this.rAF || (this.rAF = requestAnimationFrame((() => this.animate())));
        }
        panWithMouse(e, i = this.option("mouseMoveFriction")) {
            if (this.pmme = e, this.panMode !== O || !e) return;
            if (t(this.targetScale) <= t(this.minScale)) return;
            this.emit("mouseMove", e);
            const {container: n, containerRect: s, contentRect: o} = this, a = s.width, r = s.height, l = n.getBoundingClientRect(), c = (e.clientX || 0) - l.left, h = (e.clientY || 0) - l.top;
            let {contentWidth: d, contentHeight: u} = this.calculateContentDim(this.target);
            const p = this.option("mouseMoveFactor");
            p > 1 && (d !== a && (d *= p), u !== r && (u *= p));
            let f = .5 * (d - a) - c / a * 100 / 100 * (d - a);
            f += .5 * (o.right - o.left);
            let g = .5 * (u - r) - h / r * 100 / 100 * (u - r);
            g += .5 * (o.bottom - o.top), this.applyChange({
                panX: f - this.target.e,
                panY: g - this.target.f,
                friction: i
            });
        }
        zoomWithWheel(e) {
            if (this.state === m.Destroy || this.state === m.Init) return;
            const i = Date.now();
            if (i - this.pwt < 45) return void e.preventDefault();
            this.pwt = i;
            var n = [ -e.deltaX || 0, -e.deltaY || 0, -e.detail || 0 ].reduce((function(t, e) {
                return Math.abs(e) > Math.abs(t) ? e : t;
            }));
            const s = Math.max(-1, Math.min(1, n)), {targetScale: o, maxScale: a, minScale: r} = this;
            let l = o * (100 + 45 * s) / 100;
            t(l) < t(r) && t(o) <= t(r) ? (this.cwd += Math.abs(s), l = r) : t(l) > t(a) && t(o) >= t(a) ? (this.cwd += Math.abs(s), 
            l = a) : (this.cwd = 0, l = Math.max(Math.min(l, a), r)), this.cwd > this.option("wheelLimit") || (e.preventDefault(), 
            t(l) !== t(o) && this.zoomTo(l, {
                event: e
            }));
        }
        canZoomIn() {
            return this.option("zoom") && (t(this.contentRect.width, 1) < t(this.contentRect.fitWidth, 1) || t(this.targetScale) < t(this.maxScale));
        }
        canZoomOut() {
            return this.option("zoom") && t(this.targetScale) > t(this.minScale);
        }
        zoomIn(t = 1.25, e) {
            this.zoomTo(this.targetScale * t, e);
        }
        zoomOut(t = .8, e) {
            this.zoomTo(this.targetScale * t, e);
        }
        zoomToFit(t) {
            this.zoomTo("fit", t);
        }
        zoomToCover(t) {
            this.zoomTo("cover", t);
        }
        zoomToFull(t) {
            this.zoomTo("full", t);
        }
        zoomToMax(t) {
            this.zoomTo("max", t);
        }
        toggleZoom(t) {
            this.zoomTo(this.getNextScale("toggleZoom"), t);
        }
        toggleMax(t) {
            this.zoomTo(this.getNextScale("toggleMax"), t);
        }
        toggleCover(t) {
            this.zoomTo(this.getNextScale("toggleCover"), t);
        }
        iterateZoom(t) {
            this.zoomTo("next", t);
        }
        zoomTo(t = 1, {friction: e = z, originX: i = z, originY: n = z, event: s} = {}) {
            if (this.isContentLoading || this.state === m.Destroy) return;
            const {targetScale: o, fullScale: a, maxScale: r, coverScale: l} = this;
            if (this.stop(), this.panMode === O && (s = this.pmme || s), s || i === z || n === z) {
                const t = this.content.getBoundingClientRect(), e = this.container.getBoundingClientRect(), o = s ? s.clientX : e.left + .5 * e.width, a = s ? s.clientY : e.top + .5 * e.height;
                i = o - t.left - .5 * t.width, n = a - t.top - .5 * t.height;
            }
            let c = 1;
            "number" == typeof t ? c = t : "full" === t ? c = a : "cover" === t ? c = l : "max" === t ? c = r : "fit" === t ? c = 1 : "next" === t && (c = this.getNextScale("iterateZoom")), 
            c = c / o || 1, e = e === z ? c > 1 ? .15 : .25 : e, this.applyChange({
                scale: c,
                originX: i,
                originY: n,
                friction: e
            }), s && this.panMode === O && this.panWithMouse(s, e);
        }
        rotateCCW() {
            this.applyChange({
                angle: -90
            });
        }
        rotateCW() {
            this.applyChange({
                angle: 90
            });
        }
        flipX() {
            this.applyChange({
                flipX: !0
            });
        }
        flipY() {
            this.applyChange({
                flipY: !0
            });
        }
        fitX() {
            this.stop("target");
            const {containerRect: t, contentRect: e, target: i} = this;
            this.applyChange({
                panX: .5 * t.width - (e.left + .5 * e.fitWidth) - i.e,
                panY: .5 * t.height - (e.top + .5 * e.fitHeight) - i.f,
                scale: t.width / e.fitWidth / this.targetScale,
                originX: 0,
                originY: 0,
                ignoreBounds: !0
            });
        }
        fitY() {
            this.stop("target");
            const {containerRect: t, contentRect: e, target: i} = this;
            this.applyChange({
                panX: .5 * t.width - (e.left + .5 * e.fitWidth) - i.e,
                panY: .5 * t.innerHeight - (e.top + .5 * e.fitHeight) - i.f,
                scale: t.height / e.fitHeight / this.targetScale,
                originX: 0,
                originY: 0,
                ignoreBounds: !0
            });
        }
        toggleFS() {
            const {container: t} = this, e = this.cn("inFullscreen"), i = this.cn("htmlHasFullscreen");
            t.classList.toggle(e);
            const n = t.classList.contains(e);
            n ? (document.documentElement.classList.add(i), document.addEventListener("keydown", this.onKeydown, !0)) : (document.documentElement.classList.remove(i), 
            document.removeEventListener("keydown", this.onKeydown, !0)), this.updateMetrics(), 
            this.emit(n ? "enterFS" : "exitFS");
        }
        getMatrix(t = this.current) {
            const {a: e, b: i, c: n, d: s, e: o, f: a} = t;
            return new DOMMatrix([ e, i, n, s, o, a ]);
        }
        reset(t) {
            if (this.state !== m.Init && this.state !== m.Destroy) {
                this.stop("current");
                for (const t of v) this.target[t] = C[t];
                this.target.a = this.minScale, this.target.d = this.minScale, this.clampTargetBounds(), 
                this.isResting || (this.friction = void 0 === t ? this.option("friction") : t, this.state = m.Panning, 
                this.requestTick());
            }
        }
        destroy() {
            this.stop(), this.state = m.Destroy, this.detachEvents(), this.detachObserver();
            const {container: t, content: e} = this, i = this.option("classes") || {};
            for (const e of Object.values(i)) t.classList.remove(e + "");
            e && (e.removeEventListener("load", this.onLoad), e.removeEventListener("error", this.onError)), 
            this.detachPlugins();
        }
    }
    Object.defineProperty(I, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: y
    }), Object.defineProperty(I, "Plugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {}
    });
    const D = function(t, e) {
        let i = !0;
        return (...n) => {
            i && (i = !1, t(...n), setTimeout((() => {
                i = !0;
            }), e));
        };
    }, F = (t, e) => {
        let i = [];
        return t.childNodes.forEach((t => {
            t.nodeType !== Node.ELEMENT_NODE || e && !t.matches(e) || i.push(t);
        })), i;
    }, j = {
        viewport: null,
        track: null,
        enabled: !0,
        slides: [],
        axis: "x",
        transition: "fade",
        preload: 1,
        slidesPerPage: "auto",
        initialPage: 0,
        friction: .12,
        Panzoom: {
            decelFriction: .12
        },
        center: !0,
        infinite: !0,
        fill: !0,
        dragFree: !1,
        adaptiveHeight: !1,
        direction: "ltr",
        classes: {
            container: "f-carousel",
            viewport: "f-carousel__viewport",
            track: "f-carousel__track",
            slide: "f-carousel__slide",
            isLTR: "is-ltr",
            isRTL: "is-rtl",
            isHorizontal: "is-horizontal",
            isVertical: "is-vertical",
            inTransition: "in-transition",
            isSelected: "is-selected"
        },
        l10n: {
            NEXT: "Next slide",
            PREV: "Previous slide",
            GOTO: "Go to slide #%d"
        }
    };
    var B;
    !function(t) {
        t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Destroy = 2] = "Destroy";
    }(B || (B = {}));
    const H = t => {
        if ("string" == typeof t || t instanceof HTMLElement) t = {
            html: t
        }; else {
            const e = t.thumb;
            void 0 !== e && ("string" == typeof e && (t.thumbSrc = e), e instanceof HTMLImageElement && (t.thumbEl = e, 
            t.thumbElSrc = e.src, t.thumbSrc = e.src), delete t.thumb);
        }
        return Object.assign({
            html: "",
            el: null,
            isDom: !1,
            class: "",
            customClass: "",
            index: -1,
            dim: 0,
            gap: 0,
            pos: 0,
            transition: !1
        }, t);
    }, N = (t = {}) => Object.assign({
        index: -1,
        slides: [],
        dim: 0,
        pos: -1
    }, t);
    class _ extends f {
        constructor(t, e) {
            super(e), Object.defineProperty(this, "instance", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: t
            });
        }
        attach() {}
        detach() {}
    }
    const $ = {
        classes: {
            list: "f-carousel__dots",
            isDynamic: "is-dynamic",
            hasDots: "has-dots",
            dot: "f-carousel__dot",
            isBeforePrev: "is-before-prev",
            isPrev: "is-prev",
            isCurrent: "is-current",
            isNext: "is-next",
            isAfterNext: "is-after-next"
        },
        dotTpl: '<button type="button" data-carousel-page="%i" aria-label="{{GOTO}}"><span class="f-carousel__dot" aria-hidden="true"></span></button>',
        dynamicFrom: 11,
        maxCount: 1 / 0,
        minCount: 2
    };
    class W extends _ {
        constructor() {
            super(...arguments), Object.defineProperty(this, "isDynamic", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "list", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            });
        }
        onRefresh() {
            this.refresh();
        }
        build() {
            let t = this.list;
            if (!t) {
                t = document.createElement("ul"), P(t, this.cn("list")), t.setAttribute("role", "tablist");
                const e = this.instance.container;
                e.appendChild(t), P(e, this.cn("hasDots")), this.list = t;
            }
            return t;
        }
        refresh() {
            var t;
            const e = this.instance.pages.length, i = Math.min(2, this.option("minCount")), n = Math.max(2e3, this.option("maxCount")), s = this.option("dynamicFrom");
            if (e < i || e > n) return void this.cleanup();
            const a = "number" == typeof s && e > 5 && e >= s, r = !this.list || this.isDynamic !== a || this.list.children.length !== e;
            r && this.cleanup();
            const l = this.build();
            if (o(l, this.cn("isDynamic"), !!a), r) for (let t = 0; t < e; t++) l.append(this.createItem(t));
            let c, h = 0;
            for (const e of [ ...l.children ]) {
                const i = h === this.instance.page;
                i && (c = e), o(e, this.cn("isCurrent"), i), null === (t = e.children[0]) || void 0 === t || t.setAttribute("aria-selected", i ? "true" : "false");
                for (const t of [ "isBeforePrev", "isPrev", "isNext", "isAfterNext" ]) S(e, this.cn(t));
                h++;
            }
            if (c = c || l.firstChild, a && c) {
                const t = c.previousElementSibling, e = t && t.previousElementSibling;
                P(t, this.cn("isPrev")), P(e, this.cn("isBeforePrev"));
                const i = c.nextElementSibling, n = i && i.nextElementSibling;
                P(i, this.cn("isNext")), P(n, this.cn("isAfterNext"));
            }
            this.isDynamic = a;
        }
        createItem(t = 0) {
            var e;
            const i = document.createElement("li");
            i.setAttribute("role", "presentation");
            const s = n(this.instance.localize(this.option("dotTpl"), [ [ "%d", t + 1 ] ]).replace(/\%i/g, t + ""));
            return i.appendChild(s), null === (e = i.children[0]) || void 0 === e || e.setAttribute("role", "tab"), 
            i;
        }
        cleanup() {
            this.list && (this.list.remove(), this.list = null), this.isDynamic = !1, S(this.instance.container, this.cn("hasDots"));
        }
        attach() {
            this.instance.on([ "refresh", "change" ], this.onRefresh);
        }
        detach() {
            this.instance.off([ "refresh", "change" ], this.onRefresh), this.cleanup();
        }
    }
    Object.defineProperty(W, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: $
    });
    const X = "disabled", q = "next", Y = "prev";
    class V extends _ {
        constructor() {
            super(...arguments), Object.defineProperty(this, "container", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "prev", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "next", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "isDom", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            });
        }
        onRefresh() {
            const t = this.instance, e = t.pages.length, i = t.page;
            if (e < 2) return void this.cleanup();
            this.build();
            let n = this.prev, s = this.next;
            n && s && (n.removeAttribute(X), s.removeAttribute(X), t.isInfinite || (i <= 0 && n.setAttribute(X, ""), 
            i >= e - 1 && s.setAttribute(X, "")));
        }
        addBtn(t) {
            var e;
            const i = this.instance, n = document.createElement("button");
            n.setAttribute("tabindex", "0"), n.setAttribute("title", i.localize(`{{${t.toUpperCase()}}}`)), 
            P(n, this.cn("button") + " " + this.cn(t === q ? "isNext" : "isPrev"));
            const s = i.isRTL ? t === q ? Y : q : t;
            var o;
            return n.innerHTML = i.localize(this.option(`${s}Tpl`)), n.dataset[`carousel${o = t, 
            o ? o.match("^[a-z]") ? o.charAt(0).toUpperCase() + o.substring(1) : o : ""}`] = "true", 
            null === (e = this.container) || void 0 === e || e.appendChild(n), n;
        }
        build() {
            const t = this.instance.container, e = this.cn("container");
            let {container: i, prev: n, next: s} = this;
            i || (i = t.querySelector("." + e), this.isDom = !!i), i || (i = document.createElement("div"), 
            P(i, e), t.appendChild(i)), this.container = i, s || (s = i.querySelector("[data-carousel-next]")), 
            s || (s = this.addBtn(q)), this.next = s, n || (n = i.querySelector("[data-carousel-prev]")), 
            n || (n = this.addBtn(Y)), this.prev = n;
        }
        cleanup() {
            this.isDom || (this.prev && this.prev.remove(), this.next && this.next.remove(), 
            this.container && this.container.remove()), this.prev = null, this.next = null, 
            this.container = null, this.isDom = !1;
        }
        attach() {
            this.instance.on([ "refresh", "change" ], this.onRefresh);
        }
        detach() {
            this.instance.off([ "refresh", "change" ], this.onRefresh), this.cleanup();
        }
    }
    Object.defineProperty(V, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            classes: {
                container: "f-carousel__nav",
                button: "f-button",
                isNext: "is-next",
                isPrev: "is-prev"
            },
            nextTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',
            prevTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>'
        }
    });
    class Z extends _ {
        constructor() {
            super(...arguments), Object.defineProperty(this, "selectedIndex", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "target", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "nav", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            });
        }
        addAsTargetFor(t) {
            this.target = this.instance, this.nav = t, this.attachEvents();
        }
        addAsNavFor(t) {
            this.nav = this.instance, this.target = t, this.attachEvents();
        }
        attachEvents() {
            const {nav: t, target: e} = this;
            t && e && (t.options.initialSlide = e.options.initialPage, t.state === B.Ready ? this.onNavReady(t) : t.on("ready", this.onNavReady), 
            e.state === B.Ready ? this.onTargetReady(e) : e.on("ready", this.onTargetReady));
        }
        onNavReady(t) {
            t.on("createSlide", this.onNavCreateSlide), t.on("Panzoom.click", this.onNavClick), 
            t.on("Panzoom.touchEnd", this.onNavTouch), this.onTargetChange();
        }
        onTargetReady(t) {
            t.on("change", this.onTargetChange), t.on("Panzoom.refresh", this.onTargetChange), 
            this.onTargetChange();
        }
        onNavClick(t, e, i) {
            this.onNavTouch(t, t.panzoom, i);
        }
        onNavTouch(t, e, i) {
            var n, s;
            if (Math.abs(e.dragOffset.x) > 3 || Math.abs(e.dragOffset.y) > 3) return;
            const o = i.target, {nav: a, target: r} = this;
            if (!a || !r || !o) return;
            const l = o.closest("[data-index]");
            if (i.stopPropagation(), i.preventDefault(), !l) return;
            const c = parseInt(l.dataset.index || "", 10) || 0, h = r.getPageForSlide(c), d = a.getPageForSlide(c);
            a.slideTo(d), r.slideTo(h, {
                friction: (null === (s = null === (n = this.nav) || void 0 === n ? void 0 : n.plugins) || void 0 === s ? void 0 : s.Sync.option("friction")) || 0
            }), this.markSelectedSlide(c);
        }
        onNavCreateSlide(t, e) {
            e.index === this.selectedIndex && this.markSelectedSlide(e.index);
        }
        onTargetChange() {
            var t, e;
            const {target: i, nav: n} = this;
            if (!i || !n) return;
            if (n.state !== B.Ready || i.state !== B.Ready) return;
            const s = null === (e = null === (t = i.pages[i.page]) || void 0 === t ? void 0 : t.slides[0]) || void 0 === e ? void 0 : e.index, o = n.getPageForSlide(s);
            this.markSelectedSlide(s), n.slideTo(o, null === n.prevPage && null === i.prevPage ? {
                friction: 0
            } : void 0);
        }
        markSelectedSlide(t) {
            const e = this.nav;
            e && e.state === B.Ready && (this.selectedIndex = t, [ ...e.slides ].map((e => {
                e.el && e.el.classList[e.index === t ? "add" : "remove"]("is-nav-selected");
            })));
        }
        attach() {
            const t = this;
            let e = t.options.target, i = t.options.nav;
            e ? t.addAsNavFor(e) : i && t.addAsTargetFor(i);
        }
        detach() {
            const t = this, e = t.nav, i = t.target;
            e && (e.off("ready", t.onNavReady), e.off("createSlide", t.onNavCreateSlide), e.off("Panzoom.click", t.onNavClick), 
            e.off("Panzoom.touchEnd", t.onNavTouch)), t.nav = null, i && (i.off("ready", t.onTargetReady), 
            i.off("refresh", t.onTargetChange), i.off("change", t.onTargetChange)), t.target = null;
        }
    }
    Object.defineProperty(Z, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            friction: .35
        }
    });
    const U = {
        Navigation: V,
        Dots: W,
        Sync: Z
    }, G = "animationend", K = "isSelected", J = "slide";
    class Q extends g {
        get axis() {
            return this.isHorizontal ? "e" : "f";
        }
        get isEnabled() {
            return this.state === B.Ready;
        }
        get isInfinite() {
            let t = !1;
            const {contentDim: e, viewportDim: i, pages: n, slides: s} = this, o = s[0];
            return n.length >= 2 && o && e + o.dim >= i && (t = this.option("infinite")), t;
        }
        get isRTL() {
            return "rtl" === this.option("direction");
        }
        get isHorizontal() {
            return "x" === this.option("axis");
        }
        constructor(t, e = {}, i = {}) {
            if (super(), Object.defineProperty(this, "bp", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: ""
            }), Object.defineProperty(this, "lp", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "userOptions", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {}
            }), Object.defineProperty(this, "userPlugins", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {}
            }), Object.defineProperty(this, "state", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: B.Init
            }), Object.defineProperty(this, "page", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "prevPage", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "container", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "viewport", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "track", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "slides", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: []
            }), Object.defineProperty(this, "pages", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: []
            }), Object.defineProperty(this, "panzoom", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "inTransition", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: new Set
            }), Object.defineProperty(this, "contentDim", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "viewportDim", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), "string" == typeof t && (t = document.querySelector(t)), !t || !E(t)) throw new Error("No Element found");
            this.container = t, this.slideNext = D(this.slideNext.bind(this), 150), this.slidePrev = D(this.slidePrev.bind(this), 150), 
            this.userOptions = e, this.userPlugins = i, queueMicrotask((() => {
                this.processOptions();
            }));
        }
        processOptions() {
            var t, e;
            const i = u({}, Q.defaults, this.userOptions);
            let n = "";
            const s = i.breakpoints;
            if (s && d(s)) for (const [t, e] of Object.entries(s)) window.matchMedia(t).matches && d(e) && (n += t, 
            u(i, e));
            n === this.bp && this.state !== B.Init || (this.bp = n, this.state === B.Ready && (i.initialSlide = (null === (e = null === (t = this.pages[this.page]) || void 0 === t ? void 0 : t.slides[0]) || void 0 === e ? void 0 : e.index) || 0), 
            this.state !== B.Init && this.destroy(), super.setOptions(i), !1 === this.option("enabled") ? this.attachEvents() : setTimeout((() => {
                this.init();
            }), 0));
        }
        init() {
            this.state = B.Init, this.emit("init"), this.attachPlugins(Object.assign(Object.assign({}, Q.Plugins), this.userPlugins)), 
            this.emit("attachPlugins"), this.initLayout(), this.initSlides(), this.updateMetrics(), 
            this.setInitialPosition(), this.initPanzoom(), this.attachEvents(), this.state = B.Ready, 
            this.emit("ready");
        }
        initLayout() {
            const {container: t} = this, e = this.option("classes");
            P(t, this.cn("container")), o(t, e.isLTR, !this.isRTL), o(t, e.isRTL, this.isRTL), 
            o(t, e.isVertical, !this.isHorizontal), o(t, e.isHorizontal, this.isHorizontal);
            let i = this.option("viewport") || t.querySelector(`.${e.viewport}`);
            i || (i = document.createElement("div"), P(i, e.viewport), i.append(...F(t, `.${e.slide}`)), 
            t.prepend(i)), i.addEventListener("scroll", this.onScroll);
            let n = this.option("track") || t.querySelector(`.${e.track}`);
            n || (n = document.createElement("div"), P(n, e.track), n.append(...Array.from(i.childNodes))), 
            n.setAttribute("aria-live", "polite"), i.contains(n) || i.prepend(n), this.viewport = i, 
            this.track = n, this.emit("initLayout");
        }
        initSlides() {
            const {track: t} = this;
            if (!t) return;
            const e = [ ...this.slides ], i = [];
            [ ...F(t, `.${this.cn(J)}`) ].forEach((t => {
                if (E(t)) {
                    const e = H({
                        el: t,
                        isDom: !0,
                        index: this.slides.length
                    });
                    i.push(e);
                }
            }));
            for (let t of [ ...this.option("slides", []) || [], ...e ]) i.push(H(t));
            this.slides = i;
            for (let t = 0; t < this.slides.length; t++) this.slides[t].index = t;
            for (const t of i) this.emit("beforeInitSlide", t, t.index), this.emit("initSlide", t, t.index);
            this.emit("initSlides");
        }
        setInitialPage() {
            const t = this.option("initialSlide");
            this.page = "number" == typeof t ? this.getPageForSlide(t) : parseInt(this.option("initialPage", 0) + "", 10) || 0;
        }
        setInitialPosition() {
            const {track: t, pages: e, isHorizontal: i} = this;
            if (!t || !e.length) return;
            let n = this.page;
            e[n] || (this.page = n = 0);
            const s = (e[n].pos || 0) * (this.isRTL && i ? 1 : -1), o = i ? `${s}px` : "0", a = i ? "0" : `${s}px`;
            t.style.transform = `translate3d(${o}, ${a}, 0) scale(1)`, this.option("adaptiveHeight") && this.setViewportHeight();
        }
        initPanzoom() {
            this.panzoom && (this.panzoom.destroy(), this.panzoom = null);
            const t = this.option("Panzoom") || {};
            this.panzoom = new I(this.viewport, u({}, {
                content: this.track,
                zoom: !1,
                panOnlyZoomed: !1,
                lockAxis: this.isHorizontal ? "x" : "y",
                infinite: this.isInfinite,
                click: !1,
                dblClick: !1,
                touch: t => !(this.pages.length < 2 && !t.options.infinite),
                bounds: () => this.getBounds(),
                maxVelocity: t => Math.abs(t.target[this.axis] - t.current[this.axis]) < 2 * this.viewportDim ? 100 : 0
            }, t)), this.panzoom.on("*", ((t, e, ...i) => {
                this.emit(`Panzoom.${e}`, t, ...i);
            })), this.panzoom.on("decel", this.onDecel), this.panzoom.on("refresh", this.onRefresh), 
            this.panzoom.on("beforeTransform", this.onBeforeTransform), this.panzoom.on("endAnimation", this.onEndAnimation);
        }
        attachEvents() {
            const t = this.container;
            t && (t.addEventListener("click", this.onClick, {
                passive: !1,
                capture: !1
            }), t.addEventListener("slideTo", this.onSlideTo)), window.addEventListener("resize", this.onResize);
        }
        createPages() {
            let t = [];
            const {contentDim: e, viewportDim: i} = this;
            let n = this.option("slidesPerPage");
            n = ("auto" === n || e <= i) && !1 !== this.option("fill") ? 1 / 0 : parseFloat(n + "");
            let s = 0, o = 0, a = 0;
            for (const e of this.slides) (!t.length || o + e.dim - i > .05 || a >= n) && (t.push(N()), 
            s = t.length - 1, o = 0, a = 0), t[s].slides.push(e), o += e.dim + e.gap, a++;
            return t;
        }
        processPages() {
            const e = this.pages, {contentDim: i, viewportDim: n, isInfinite: s} = this, o = this.option("center"), a = this.option("fill"), r = a && o && i > n && !s;
            if (e.forEach(((t, e) => {
                var s;
                t.index = e, t.pos = (null === (s = t.slides[0]) || void 0 === s ? void 0 : s.pos) || 0, 
                t.dim = 0;
                for (const [e, i] of t.slides.entries()) t.dim += i.dim, e < t.slides.length - 1 && (t.dim += i.gap);
                r && t.pos + .5 * t.dim < .5 * n ? t.pos = 0 : r && t.pos + .5 * t.dim >= i - .5 * n ? t.pos = i - n : o && (t.pos += -.5 * (n - t.dim));
            })), e.forEach((e => {
                a && !s && i > n && (e.pos = Math.max(e.pos, 0), e.pos = Math.min(e.pos, i - n)), 
                e.pos = t(e.pos, 1e3), e.dim = t(e.dim, 1e3), Math.abs(e.pos) <= .1 && (e.pos = 0);
            })), s) return e;
            const l = [];
            let c;
            return e.forEach((t => {
                const e = Object.assign({}, t);
                c && e.pos === c.pos ? (c.dim += e.dim, c.slides = [ ...c.slides, ...e.slides ]) : (e.index = l.length, 
                c = e, l.push(e));
            })), l;
        }
        getPageFromIndex(t = 0) {
            const e = this.pages.length;
            let i;
            return t = parseInt((t || 0).toString()) || 0, i = this.isInfinite ? (t % e + e) % e : Math.max(Math.min(t, e - 1), 0), 
            i;
        }
        getSlideMetrics(e) {
            var i, n;
            const s = this.isHorizontal ? "width" : "height";
            let o = 0, a = 0, r = e.el;
            const l = !(!r || r.parentNode);
            if (r ? o = parseFloat(r.dataset[s] || "") || 0 : (r = document.createElement("div"), 
            r.style.visibility = "hidden", (this.track || document.body).prepend(r)), P(r, this.cn(J) + " " + e.class + " " + e.customClass), 
            o) r.style[s] = `${o}px`, r.style["width" === s ? "height" : "width"] = ""; else {
                l && (this.track || document.body).prepend(r), o = r.getBoundingClientRect()[s] * Math.max(1, (null === (i = window.visualViewport) || void 0 === i ? void 0 : i.scale) || 1);
                let t = r[this.isHorizontal ? "offsetWidth" : "offsetHeight"];
                t - 1 > o && (o = t);
            }
            const c = getComputedStyle(r);
            return "content-box" === c.boxSizing && (this.isHorizontal ? (o += parseFloat(c.paddingLeft) || 0, 
            o += parseFloat(c.paddingRight) || 0) : (o += parseFloat(c.paddingTop) || 0, o += parseFloat(c.paddingBottom) || 0)), 
            a = parseFloat(c[this.isHorizontal ? "marginRight" : "marginBottom"]) || 0, l ? null === (n = r.parentElement) || void 0 === n || n.removeChild(r) : e.el || r.remove(), 
            {
                dim: t(o, 1e3),
                gap: t(a, 1e3)
            };
        }
        getBounds() {
            const {isInfinite: t, isRTL: e, isHorizontal: i, pages: n} = this;
            let s = {
                min: 0,
                max: 0
            };
            if (t) s = {
                min: -1 / 0,
                max: 1 / 0
            }; else if (n.length) {
                const t = n[0].pos, o = n[n.length - 1].pos;
                s = e && i ? {
                    min: t,
                    max: o
                } : {
                    min: -1 * o,
                    max: -1 * t
                };
            }
            return {
                x: i ? s : {
                    min: 0,
                    max: 0
                },
                y: i ? {
                    min: 0,
                    max: 0
                } : s
            };
        }
        repositionSlides() {
            let e, {isHorizontal: i, isRTL: n, isInfinite: s, viewport: o, viewportDim: a, contentDim: r, page: l, pages: c, slides: h, panzoom: d} = this, u = 0, p = 0, f = 0, g = 0;
            d ? g = -1 * d.current[this.axis] : c[l] && (g = c[l].pos || 0), e = i ? n ? "right" : "left" : "top", 
            n && i && (g *= -1);
            for (const i of h) {
                const n = i.el;
                n ? ("top" === e ? (n.style.right = "", n.style.left = "") : n.style.top = "", i.index !== u ? n.style[e] = 0 === p ? "" : `${t(p, 1e3)}px` : n.style[e] = "", 
                f += i.dim + i.gap, u++) : p += i.dim + i.gap;
            }
            if (s && f && o) {
                let n = getComputedStyle(o), s = "padding", l = i ? "Right" : "Bottom", c = parseFloat(n[s + (i ? "Left" : "Top")]);
                g -= c, a += c, a += parseFloat(n[s + l]);
                for (const i of h) i.el && (t(i.pos) < t(a) && t(i.pos + i.dim + i.gap) < t(g) && t(g) > t(r - a) && (i.el.style[e] = `${t(p + f, 1e3)}px`), 
                t(i.pos + i.gap) >= t(r - a) && t(i.pos) > t(g + a) && t(g) < t(a) && (i.el.style[e] = `-${t(f, 1e3)}px`));
            }
            let m, v, b = [ ...this.inTransition ];
            if (b.length > 1 && (m = c[b[0]], v = c[b[1]]), m && v) {
                let i = 0;
                for (const n of h) n.el ? this.inTransition.has(n.index) && m.slides.indexOf(n) < 0 && (n.el.style[e] = `${t(i + (m.pos - v.pos), 1e3)}px`) : i += n.dim + n.gap;
            }
        }
        createSlideEl(t) {
            const {track: e, slides: i} = this;
            if (!e || !t) return;
            if (t.el && t.el.parentNode) return;
            const n = t.el || document.createElement("div");
            P(n, this.cn(J)), P(n, t.class), P(n, t.customClass);
            const s = t.html;
            s && (s instanceof HTMLElement ? n.appendChild(s) : n.innerHTML = t.html + "");
            const o = [];
            i.forEach(((t, e) => {
                t.el && o.push(e);
            }));
            const a = t.index;
            let r = null;
            if (o.length) r = i[o.reduce(((t, e) => Math.abs(e - a) < Math.abs(t - a) ? e : t))];
            const l = r && r.el && r.el.parentNode ? r.index < t.index ? r.el.nextSibling : r.el : null;
            e.insertBefore(n, e.contains(l) ? l : null), t.el = n, this.emit("createSlide", t);
        }
        removeSlideEl(t, e = !1) {
            const i = null == t ? void 0 : t.el;
            if (!i || !i.parentNode) return;
            const n = this.cn(K);
            if (i.classList.contains(n) && (S(i, n), this.emit("unselectSlide", t)), t.isDom && !e) return i.removeAttribute("aria-hidden"), 
            i.removeAttribute("data-index"), void (i.style.left = "");
            this.emit("removeSlide", t);
            const s = new CustomEvent(G);
            i.dispatchEvent(s), t.el && (t.el.remove(), t.el = null);
        }
        transitionTo(t = 0, e = this.option("transition")) {
            var i, n, s, o;
            if (!e) return !1;
            const a = this.page, {pages: r, panzoom: l} = this;
            t = parseInt((t || 0).toString()) || 0;
            const c = this.getPageFromIndex(t);
            if (!l || !r[c] || r.length < 2 || Math.abs(((null === (n = null === (i = r[a]) || void 0 === i ? void 0 : i.slides[0]) || void 0 === n ? void 0 : n.dim) || 0) - this.viewportDim) > 1) return !1;
            let h = t > a ? 1 : -1;
            this.isInfinite && (0 === a && t === r.length - 1 && (h = -1), a === r.length - 1 && 0 === t && (h = 1));
            const d = r[c].pos * (this.isRTL ? 1 : -1);
            if (a === c && Math.abs(d - l.target[this.axis]) < 1) return !1;
            this.clearTransitions();
            const u = l.isResting;
            P(this.container, this.cn("inTransition"));
            const p = (null === (s = r[a]) || void 0 === s ? void 0 : s.slides[0]) || null, f = (null === (o = r[c]) || void 0 === o ? void 0 : o.slides[0]) || null;
            this.inTransition.add(f.index), this.createSlideEl(f);
            let g = p.el, m = f.el;
            u || e === J || (e = "fadeFast", g = null);
            const v = this.isRTL ? "next" : "prev", b = this.isRTL ? "prev" : "next";
            return g && (this.inTransition.add(p.index), p.transition = e, g.addEventListener(G, this.onAnimationEnd), 
            g.classList.add(`f-${e}Out`, `to-${h > 0 ? b : v}`)), m && (f.transition = e, m.addEventListener(G, this.onAnimationEnd), 
            m.classList.add(`f-${e}In`, `from-${h > 0 ? v : b}`)), l.current[this.axis] = d, 
            l.target[this.axis] = d, l.requestTick(), this.onChange(c), !0;
        }
        manageSlideVisiblity() {
            const t = new Set, e = new Set, i = this.getVisibleSlides(parseFloat(this.option("preload", 0) + "") || 0);
            for (const n of this.slides) i.has(n) ? t.add(n) : e.add(n);
            for (const e of this.inTransition) t.add(this.slides[e]);
            for (const e of t) this.createSlideEl(e), this.lazyLoadSlide(e);
            for (const i of e) t.has(i) || this.removeSlideEl(i);
            this.markSelectedSlides(), this.repositionSlides();
        }
        markSelectedSlides() {
            if (!this.pages[this.page] || !this.pages[this.page].slides) return;
            const t = "aria-hidden";
            let e = this.cn(K);
            if (e) for (const i of this.slides) {
                const n = i.el;
                n && (n.dataset.index = `${i.index}`, n.classList.contains("f-thumbs__slide") ? this.getVisibleSlides(0).has(i) ? n.removeAttribute(t) : n.setAttribute(t, "true") : this.pages[this.page].slides.includes(i) ? (n.classList.contains(e) || (P(n, e), 
                this.emit("selectSlide", i)), n.removeAttribute(t)) : (n.classList.contains(e) && (S(n, e), 
                this.emit("unselectSlide", i)), n.setAttribute(t, "true")));
            }
        }
        flipInfiniteTrack() {
            const {axis: t, isHorizontal: e, isInfinite: i, isRTL: n, viewportDim: s, contentDim: o} = this, a = this.panzoom;
            if (!a || !i) return;
            let r = a.current[t], l = a.target[t] - r, c = 0, h = .5 * s;
            n && e ? (r < -h && (c = -1, r += o), r > o - h && (c = 1, r -= o)) : (r > h && (c = 1, 
            r -= o), r < -o + h && (c = -1, r += o)), c && (a.current[t] = r, a.target[t] = r + l);
        }
        lazyLoadImg(t, e) {
            const i = this, s = "f-fadeIn", o = "is-preloading";
            let a = !1, r = null;
            const l = () => {
                a || (a = !0, r && (r.remove(), r = null), S(e, o), e.complete && (P(e, s), setTimeout((() => {
                    S(e, s);
                }), 350)), this.option("adaptiveHeight") && t.el && this.pages[this.page].slides.indexOf(t) > -1 && (i.updateMetrics(), 
                i.setViewportHeight()), this.emit("load", t));
            };
            P(e, o), e.src = e.dataset.lazySrcset || e.dataset.lazySrc || "", delete e.dataset.lazySrc, 
            delete e.dataset.lazySrcset, e.addEventListener("error", (() => {
                l();
            })), e.addEventListener("load", (() => {
                l();
            })), setTimeout((() => {
                const i = e.parentNode;
                i && t.el && (e.complete ? l() : a || (r = n(x), i.insertBefore(r, e)));
            }), 300);
        }
        lazyLoadSlide(t) {
            const e = t && t.el;
            if (!e) return;
            const i = new Set;
            let n = Array.from(e.querySelectorAll("[data-lazy-src],[data-lazy-srcset]"));
            e.dataset.lazySrc && n.push(e), n.map((t => {
                t instanceof HTMLImageElement ? i.add(t) : t instanceof HTMLElement && t.dataset.lazySrc && (t.style.backgroundImage = `url('${t.dataset.lazySrc}')`, 
                delete t.dataset.lazySrc);
            }));
            for (const e of i) this.lazyLoadImg(t, e);
        }
        onAnimationEnd(t) {
            var e;
            const i = t.target, n = i ? parseInt(i.dataset.index || "", 10) || 0 : -1, s = this.slides[n], o = t.animationName;
            if (!i || !s || !o) return;
            const a = !!this.inTransition.has(n) && s.transition;
            a && o.substring(0, a.length + 2) === `f-${a}` && this.inTransition.delete(n), this.inTransition.size || this.clearTransitions(), 
            n === this.page && (null === (e = this.panzoom) || void 0 === e ? void 0 : e.isResting) && this.emit("settle");
        }
        onDecel(t, e = 0, i = 0, n = 0, s = 0) {
            if (this.option("dragFree")) return void this.setPageFromPosition();
            const {isRTL: o, isHorizontal: a, axis: r, pages: l} = this, c = l.length, h = Math.abs(Math.atan2(i, e) / (Math.PI / 180));
            let d = 0;
            if (d = h > 45 && h < 135 ? a ? 0 : i : a ? e : 0, !c) return;
            let u = this.page, p = o && a ? 1 : -1;
            const f = t.current[r] * p;
            let {pageIndex: g} = this.getPageFromPosition(f);
            Math.abs(d) > 5 ? (l[u].dim < document.documentElement["client" + (this.isHorizontal ? "Width" : "Height")] - 1 && (u = g), 
            u = o && a ? d < 0 ? u - 1 : u + 1 : d < 0 ? u + 1 : u - 1) : u = 0 === n && 0 === s ? u : g, 
            this.slideTo(u, {
                transition: !1,
                friction: t.option("decelFriction")
            });
        }
        onClick(t) {
            const e = t.target, i = e && E(e) ? e.dataset : null;
            let n, s;
            i && (void 0 !== i.carouselPage ? (s = "slideTo", n = i.carouselPage) : void 0 !== i.carouselNext ? s = "slideNext" : void 0 !== i.carouselPrev && (s = "slidePrev")), 
            s ? (t.preventDefault(), t.stopPropagation(), e && !e.hasAttribute("disabled") && this[s](n)) : this.emit("click", t);
        }
        onSlideTo(t) {
            const e = t.detail || 0;
            this.slideTo(this.getPageForSlide(e), {
                friction: 0
            });
        }
        onChange(t, e = 0) {
            const i = this.page;
            this.prevPage = i, this.page = t, this.option("adaptiveHeight") && this.setViewportHeight(), 
            t !== i && (this.markSelectedSlides(), this.emit("change", t, i, e));
        }
        onRefresh() {
            let t = this.contentDim, e = this.viewportDim;
            this.updateMetrics(), this.contentDim === t && this.viewportDim === e || this.slideTo(this.page, {
                friction: 0,
                transition: !1
            });
        }
        onScroll() {
            var t;
            null === (t = this.viewport) || void 0 === t || t.scroll(0, 0);
        }
        onResize() {
            this.option("breakpoints") && this.processOptions();
        }
        onBeforeTransform(t) {
            this.lp !== t.current[this.axis] && (this.flipInfiniteTrack(), this.manageSlideVisiblity()), 
            this.lp = t.current.e;
        }
        onEndAnimation() {
            this.inTransition.size || this.emit("settle");
        }
        reInit(t = null, e = null) {
            this.destroy(), this.state = B.Init, this.prevPage = null, this.userOptions = t || this.userOptions, 
            this.userPlugins = e || this.userPlugins, this.processOptions();
        }
        slideTo(t = 0, {friction: e = this.option("friction"), transition: i = this.option("transition")} = {}) {
            if (this.state === B.Destroy) return;
            t = parseInt((t || 0).toString()) || 0;
            const n = this.getPageFromIndex(t), {axis: s, isHorizontal: o, isRTL: a, pages: r, panzoom: l} = this, c = r.length, h = a && o ? 1 : -1;
            if (!l || !c) return;
            if (this.page !== n) {
                const e = new Event("beforeChange", {
                    bubbles: !0,
                    cancelable: !0
                });
                if (this.emit("beforeChange", e, t), e.defaultPrevented) return;
            }
            if (this.transitionTo(t, i)) return;
            let d = r[n].pos;
            if (this.isInfinite) {
                const e = this.contentDim, i = l.target[s] * h;
                if (2 === c) d += e * Math.floor(parseFloat(t + "") / 2); else d = [ d, d - e, d + e ].reduce((function(t, e) {
                    return Math.abs(e - i) < Math.abs(t - i) ? e : t;
                }));
            }
            d *= h, Math.abs(l.target[s] - d) < 1 || (l.panTo({
                x: o ? d : 0,
                y: o ? 0 : d,
                friction: e
            }), this.onChange(n));
        }
        slideToClosest(t) {
            if (this.panzoom) {
                const {pageIndex: e} = this.getPageFromPosition();
                this.slideTo(e, t);
            }
        }
        slideNext() {
            this.slideTo(this.page + 1);
        }
        slidePrev() {
            this.slideTo(this.page - 1);
        }
        clearTransitions() {
            this.inTransition.clear(), S(this.container, this.cn("inTransition"));
            const t = [ "to-prev", "to-next", "from-prev", "from-next" ];
            for (const e of this.slides) {
                const i = e.el;
                if (i) {
                    i.removeEventListener(G, this.onAnimationEnd), i.classList.remove(...t);
                    const n = e.transition;
                    n && i.classList.remove(`f-${n}Out`, `f-${n}In`);
                }
            }
            this.manageSlideVisiblity();
        }
        addSlide(t, e) {
            var i, n, s, o;
            const a = this.panzoom, r = (null === (i = this.pages[this.page]) || void 0 === i ? void 0 : i.pos) || 0, l = (null === (n = this.pages[this.page]) || void 0 === n ? void 0 : n.dim) || 0, c = this.contentDim < this.viewportDim;
            let h = Array.isArray(e) ? e : [ e ];
            const d = [];
            for (const t of h) d.push(H(t));
            this.slides.splice(t, 0, ...d);
            for (let t = 0; t < this.slides.length; t++) this.slides[t].index = t;
            for (const t of d) this.emit("beforeInitSlide", t, t.index);
            if (this.page >= t && (this.page += d.length), this.updateMetrics(), a) {
                const e = (null === (s = this.pages[this.page]) || void 0 === s ? void 0 : s.pos) || 0, i = (null === (o = this.pages[this.page]) || void 0 === o ? void 0 : o.dim) || 0, n = this.pages.length || 1, h = this.isRTL ? l - i : i - l, d = this.isRTL ? r - e : e - r;
                c && 1 === n ? (t <= this.page && (a.current[this.axis] -= h, a.target[this.axis] -= h), 
                a.panTo({
                    [this.isHorizontal ? "x" : "y"]: -1 * e
                })) : d && t <= this.page && (a.target[this.axis] -= d, a.current[this.axis] -= d, 
                a.requestTick());
            }
            for (const t of d) this.emit("initSlide", t, t.index);
        }
        prependSlide(t) {
            this.addSlide(0, t);
        }
        appendSlide(t) {
            this.addSlide(this.slides.length, t);
        }
        removeSlide(t) {
            const e = this.slides.length;
            t = (t % e + e) % e;
            const i = this.slides[t];
            if (i) {
                this.removeSlideEl(i, !0), this.slides.splice(t, 1);
                for (let t = 0; t < this.slides.length; t++) this.slides[t].index = t;
                this.updateMetrics(), this.slideTo(this.page, {
                    friction: 0,
                    transition: !1
                }), this.emit("destroySlide", i);
            }
        }
        updateMetrics() {
            const {panzoom: e, viewport: i, track: n, slides: s, isHorizontal: o, isInfinite: a} = this;
            if (!n) return;
            const r = o ? "width" : "height", l = o ? "offsetWidth" : "offsetHeight";
            if (i) {
                let e = Math.max(i[l], t(i.getBoundingClientRect()[r], 1e3)), n = getComputedStyle(i), s = "padding", a = o ? "Right" : "Bottom";
                e -= parseFloat(n[s + (o ? "Left" : "Top")]) + parseFloat(n[s + a]), this.viewportDim = e;
            }
            let c, h = 0;
            for (const [e, i] of s.entries()) {
                let n = 0, o = 0;
                !i.el && c ? (n = c.dim, o = c.gap) : (({dim: n, gap: o} = this.getSlideMetrics(i)), 
                c = i), n = t(n, 1e3), o = t(o, 1e3), i.dim = n, i.gap = o, i.pos = h, h += n, (a || e < s.length - 1) && (h += o);
            }
            h = t(h, 1e3), this.contentDim = h, e && (e.contentRect[r] = h, e.contentRect[o ? "fullWidth" : "fullHeight"] = h), 
            this.pages = this.createPages(), this.pages = this.processPages(), this.state === B.Init && this.setInitialPage(), 
            this.page = Math.max(0, Math.min(this.page, this.pages.length - 1)), this.manageSlideVisiblity(), 
            this.emit("refresh");
        }
        getProgress(e, i = !1, n = !1) {
            void 0 === e && (e = this.page);
            const s = this, o = s.panzoom, a = s.contentDim, r = s.pages[e] || 0;
            if (!r || !o) return e > this.page ? -1 : 1;
            let l = -1 * o.current.e, c = t((l - r.pos) / (1 * r.dim), 1e3), h = c, d = c;
            this.isInfinite && !0 !== n && (h = t((l - r.pos + a) / (1 * r.dim), 1e3), d = t((l - r.pos - a) / (1 * r.dim), 1e3));
            let u = [ c, h, d ].reduce((function(t, e) {
                return Math.abs(e) < Math.abs(t) ? e : t;
            }));
            return i ? u : u > 1 ? 1 : u < -1 ? -1 : u;
        }
        setViewportHeight() {
            const {page: t, pages: e, viewport: i, isHorizontal: n} = this;
            if (!i || !e[t]) return;
            let s = 0;
            n && this.track && (this.track.style.height = "auto", e[t].slides.forEach((t => {
                t.el && (s = Math.max(s, t.el.offsetHeight));
            }))), i.style.height = s ? `${s}px` : "";
        }
        getPageForSlide(t) {
            for (const e of this.pages) for (const i of e.slides) if (i.index === t) return e.index;
            return -1;
        }
        getVisibleSlides(t = 0) {
            var e;
            const i = new Set;
            let {panzoom: n, contentDim: s, viewportDim: o, pages: a, page: r} = this;
            if (o) {
                s = s + (null === (e = this.slides[this.slides.length - 1]) || void 0 === e ? void 0 : e.gap) || 0;
                let l = 0;
                l = n && n.state !== m.Init && n.state !== m.Destroy ? -1 * n.current[this.axis] : a[r] && a[r].pos || 0, 
                this.isInfinite && (l -= Math.floor(l / s) * s), this.isRTL && this.isHorizontal && (l *= -1);
                const c = l - o * t, h = l + o * (t + 1), d = this.isInfinite ? [ -1, 0, 1 ] : [ 0 ];
                for (const t of this.slides) for (const e of d) {
                    const n = t.pos + e * s, o = n + t.dim + t.gap;
                    n < h && o > c && i.add(t);
                }
            }
            return i;
        }
        getPageFromPosition(t) {
            const {viewportDim: e, contentDim: i, slides: n, pages: s, panzoom: o} = this, a = s.length, r = n.length, l = n[0], c = n[r - 1], h = this.option("center");
            let d = 0, u = 0, p = 0, f = void 0 === t ? -1 * ((null == o ? void 0 : o.target[this.axis]) || 0) : t;
            h && (f += .5 * e), this.isInfinite ? (f < l.pos - .5 * c.gap && (f -= i, p = -1), 
            f > c.pos + c.dim + .5 * c.gap && (f -= i, p = 1)) : f = Math.max(l.pos || 0, Math.min(f, c.pos));
            let g = c, m = n.find((t => {
                const e = t.pos - .5 * g.gap, i = t.pos + t.dim + .5 * t.gap;
                return g = t, f >= e && f < i;
            }));
            return m || (m = c), u = this.getPageForSlide(m.index), d = u + p * a, {
                page: d,
                pageIndex: u
            };
        }
        setPageFromPosition() {
            const {pageIndex: t} = this.getPageFromPosition();
            this.onChange(t);
        }
        destroy() {
            if ([ B.Destroy ].includes(this.state)) return;
            this.state = B.Destroy;
            const {container: t, viewport: e, track: i, slides: n, panzoom: s} = this, o = this.option("classes");
            t.removeEventListener("click", this.onClick, {
                passive: !1,
                capture: !1
            }), t.removeEventListener("slideTo", this.onSlideTo), window.removeEventListener("resize", this.onResize), 
            s && (s.destroy(), this.panzoom = null), n && n.forEach((t => {
                this.removeSlideEl(t);
            })), this.detachPlugins(), e && (e.removeEventListener("scroll", this.onScroll), 
            e.offsetParent && i && i.offsetParent && e.replaceWith(...i.childNodes));
            for (const [e, i] of Object.entries(o)) "container" !== e && i && t.classList.remove(i);
            this.track = null, this.viewport = null, this.page = 0, this.slides = [];
            const a = this.events.get("ready");
            this.events = new Map, a && this.events.set("ready", a);
        }
    }
    Object.defineProperty(Q, "Panzoom", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: I
    }), Object.defineProperty(Q, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: j
    }), Object.defineProperty(Q, "Plugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: U
    });
    const tt = function(t) {
        if (!E(t)) return 0;
        const e = window.scrollY, i = window.innerHeight, n = e + i, s = t.getBoundingClientRect(), o = s.y + e, a = s.height, r = o + a;
        if (e > r || n < o) return 0;
        if (e < o && n > r) return 100;
        if (o < e && r > n) return 100;
        let l = a;
        o < e && (l -= e - o), r > n && (l -= r - n);
        const c = l / i * 100;
        return Math.round(c);
    }, et = !("undefined" == typeof window || !window.document || !window.document.createElement);
    let it;
    const nt = [ "a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden]):not(.fancybox-focus-guard)", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"]):not([disabled]):not([aria-hidden])' ].join(","), st = t => {
        if (t && et) {
            void 0 === it && document.createElement("div").focus({
                get preventScroll() {
                    return it = !0, !1;
                }
            });
            try {
                if (it) t.focus({
                    preventScroll: !0
                }); else {
                    const e = window.scrollY || document.body.scrollTop, i = window.scrollX || document.body.scrollLeft;
                    t.focus(), document.body.scrollTo({
                        top: e,
                        left: i,
                        behavior: "auto"
                    });
                }
            } catch (t) {}
        }
    }, ot = () => {
        const t = document;
        let e, i = "", n = "", s = "";
        return t.fullscreenEnabled ? (i = "requestFullscreen", n = "exitFullscreen", s = "fullscreenElement") : t.webkitFullscreenEnabled && (i = "webkitRequestFullscreen", 
        n = "webkitExitFullscreen", s = "webkitFullscreenElement"), i && (e = {
            request: function(e = t.documentElement) {
                return "webkitRequestFullscreen" === i ? e[i](Element.ALLOW_KEYBOARD_INPUT) : e[i]();
            },
            exit: function() {
                return t[s] && t[n]();
            },
            isFullscreen: function() {
                return t[s];
            }
        }), e;
    }, at = {
        animated: !0,
        autoFocus: !0,
        backdropClick: "close",
        Carousel: {
            classes: {
                container: "fancybox__carousel",
                viewport: "fancybox__viewport",
                track: "fancybox__track",
                slide: "fancybox__slide"
            }
        },
        closeButton: "auto",
        closeExisting: !1,
        commonCaption: !1,
        compact: () => window.matchMedia("(max-width: 578px), (max-height: 578px)").matches,
        contentClick: "toggleZoom",
        contentDblClick: !1,
        defaultType: "image",
        defaultDisplay: "flex",
        dragToClose: !0,
        Fullscreen: {
            autoStart: !1
        },
        groupAll: !1,
        groupAttr: "data-fancybox",
        hideClass: "f-fadeOut",
        hideScrollbar: !0,
        idle: 3500,
        keyboard: {
            Escape: "close",
            Delete: "close",
            Backspace: "close",
            PageUp: "next",
            PageDown: "prev",
            ArrowUp: "prev",
            ArrowDown: "next",
            ArrowRight: "next",
            ArrowLeft: "prev"
        },
        l10n: Object.assign(Object.assign({}, b), {
            CLOSE: "Close",
            NEXT: "Next",
            PREV: "Previous",
            MODAL: "You can close this modal content with the ESC key",
            ERROR: "Something Went Wrong, Please Try Again Later",
            IMAGE_ERROR: "Image Not Found",
            ELEMENT_NOT_FOUND: "HTML Element Not Found",
            AJAX_NOT_FOUND: "Error Loading AJAX : Not Found",
            AJAX_FORBIDDEN: "Error Loading AJAX : Forbidden",
            IFRAME_ERROR: "Error Loading Page",
            TOGGLE_ZOOM: "Toggle zoom level",
            TOGGLE_THUMBS: "Toggle thumbnails",
            TOGGLE_SLIDESHOW: "Toggle slideshow",
            TOGGLE_FULLSCREEN: "Toggle full-screen mode",
            DOWNLOAD: "Download"
        }),
        parentEl: null,
        placeFocusBack: !0,
        showClass: "f-zoomInUp",
        startIndex: 0,
        tpl: {
            closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M20 20L4 4m16 0L4 20"/></svg></button>',
            main: '<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">\n    <div class="fancybox__backdrop"></div>\n    <div class="fancybox__carousel"></div>\n    <div class="fancybox__footer"></div>\n  </div>'
        },
        trapFocus: !0,
        wheel: "zoom"
    };
    var rt, lt;
    !function(t) {
        t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Closing = 2] = "Closing", 
        t[t.CustomClosing = 3] = "CustomClosing", t[t.Destroy = 4] = "Destroy";
    }(rt || (rt = {})), function(t) {
        t[t.Loading = 0] = "Loading", t[t.Opening = 1] = "Opening", t[t.Ready = 2] = "Ready", 
        t[t.Closing = 3] = "Closing";
    }(lt || (lt = {}));
    let ct = "", ht = !1, dt = !1, ut = null;
    const pt = () => {
        let t = "", e = "";
        const i = Oe.getInstance();
        if (i) {
            const n = i.carousel, s = i.getSlide();
            if (n && s) {
                let o = s.slug || void 0, a = s.triggerEl || void 0;
                e = o || i.option("slug") || "", !e && a && a.dataset && (e = a.dataset.fancybox || ""), 
                e && "true" !== e && (t = "#" + e + (!o && n.slides.length > 1 ? "-" + (s.index + 1) : ""));
            }
        }
        return {
            hash: t,
            slug: e,
            index: 1
        };
    }, ft = () => {
        const t = new URL(document.URL).hash, e = t.slice(1).split("-"), i = e[e.length - 1], n = i && /^\+?\d+$/.test(i) && parseInt(e.pop() || "1", 10) || 1;
        return {
            hash: t,
            slug: e.join("-"),
            index: n
        };
    }, gt = () => {
        const {slug: t, index: e} = ft();
        if (!t) return;
        let i = document.querySelector(`[data-slug="${t}"]`);
        if (i && i.dispatchEvent(new CustomEvent("click", {
            bubbles: !0,
            cancelable: !0
        })), Oe.getInstance()) return;
        const n = document.querySelectorAll(`[data-fancybox="${t}"]`);
        n.length && (i = n[e - 1], i && i.dispatchEvent(new CustomEvent("click", {
            bubbles: !0,
            cancelable: !0
        })));
    }, mt = () => {
        if (!1 === Oe.defaults.Hash) return;
        const t = Oe.getInstance();
        if (!1 === (null == t ? void 0 : t.options.Hash)) return;
        const {slug: e, index: i} = ft(), {slug: n} = pt();
        t && (e === n ? t.jumpTo(i - 1) : (ht = !0, t.close())), gt();
    }, vt = () => {
        ut && clearTimeout(ut), queueMicrotask((() => {
            mt();
        }));
    }, bt = () => {
        window.addEventListener("hashchange", vt, !1), setTimeout((() => {
            mt();
        }), 500);
    };
    et && (/complete|interactive|loaded/.test(document.readyState) ? bt() : document.addEventListener("DOMContentLoaded", bt));
    const yt = "is-zooming-in";
    class wt extends _ {
        onCreateSlide(t, e, i) {
            const n = this.instance.optionFor(i, "src") || "";
            i.el && "image" === i.type && "string" == typeof n && this.setImage(i, n);
        }
        onRemoveSlide(t, e, i) {
            i.panzoom && i.panzoom.destroy(), i.panzoom = void 0, i.imageEl = void 0;
        }
        onChange(t, e, i, n) {
            S(this.instance.container, yt);
            for (const t of e.slides) {
                const e = t.panzoom;
                e && t.index !== i && e.reset(.35);
            }
        }
        onClose() {
            var t;
            const e = this.instance, i = e.container, n = e.getSlide();
            if (!i || !i.parentElement || !n) return;
            const {el: s, contentEl: o, panzoom: a, thumbElSrc: r} = n;
            if (!s || !r || !o || !a || a.isContentLoading || a.state === m.Init || a.state === m.Destroy) return;
            a.updateMetrics();
            let l = this.getZoomInfo(n);
            if (!l) return;
            this.instance.state = rt.CustomClosing, i.classList.remove(yt), i.classList.add("is-zooming-out"), 
            o.style.backgroundImage = `url('${r}')`;
            const c = i.getBoundingClientRect();
            1 === ((null === (t = window.visualViewport) || void 0 === t ? void 0 : t.scale) || 1) && Object.assign(i.style, {
                position: "absolute",
                top: `${i.offsetTop + window.scrollY}px`,
                left: `${i.offsetLeft + window.scrollX}px`,
                bottom: "auto",
                right: "auto",
                width: `${c.width}px`,
                height: `${c.height}px`,
                overflow: "hidden"
            });
            const {x: h, y: d, scale: u, opacity: p} = l;
            if (p) {
                const t = ((t, e, i, n) => {
                    const s = e - t, o = n - i;
                    return e => i + ((e - t) / s * o || 0);
                })(a.scale, u, 1, 0);
                a.on("afterTransform", (() => {
                    o.style.opacity = t(a.scale) + "";
                }));
            }
            a.on("endAnimation", (() => {
                e.destroy();
            })), a.target.a = u, a.target.b = 0, a.target.c = 0, a.target.d = u, a.panTo({
                x: h,
                y: d,
                scale: u,
                friction: p ? .2 : .33,
                ignoreBounds: !0
            }), a.isResting && e.destroy();
        }
        setImage(t, e) {
            const i = this.instance;
            t.src = e, this.process(t, e).then((e => {
                const {contentEl: n, imageEl: s, thumbElSrc: o, el: a} = t;
                if (i.isClosing() || !n || !s) return;
                n.offsetHeight;
                const r = !!i.isOpeningSlide(t) && this.getZoomInfo(t);
                if (this.option("protected") && a) {
                    a.addEventListener("contextmenu", (t => {
                        t.preventDefault();
                    }));
                    const t = document.createElement("div");
                    P(t, "fancybox-protected"), n.appendChild(t);
                }
                if (o && r) {
                    const s = e.contentRect, a = Math.max(s.fullWidth, s.fullHeight);
                    let c = null;
                    !r.opacity && a > 1200 && (c = document.createElement("img"), P(c, "fancybox-ghost"), 
                    c.src = o, n.appendChild(c));
                    const h = () => {
                        c && (P(c, "f-fadeFastOut"), setTimeout((() => {
                            c && (c.remove(), c = null);
                        }), 200));
                    };
                    (l = o, new Promise(((t, e) => {
                        const i = new Image;
                        i.onload = t, i.onerror = e, i.src = l;
                    }))).then((() => {
                        i.hideLoading(t), t.state = lt.Opening, this.instance.emit("reveal", t), this.zoomIn(t).then((() => {
                            h(), this.instance.done(t);
                        }), (() => {})), c && setTimeout((() => {
                            h();
                        }), a > 2500 ? 800 : 200);
                    }), (() => {
                        i.hideLoading(t), i.revealContent(t);
                    }));
                } else {
                    const n = this.optionFor(t, "initialSize"), s = this.optionFor(t, "zoom"), o = {
                        event: i.prevMouseMoveEvent || i.options.event,
                        friction: s ? .12 : 0
                    };
                    let a = i.optionFor(t, "showClass") || void 0, r = !0;
                    i.isOpeningSlide(t) && ("full" === n ? e.zoomToFull(o) : "cover" === n ? e.zoomToCover(o) : "max" === n ? e.zoomToMax(o) : r = !1, 
                    e.stop("current")), r && a && (a = e.isDragging ? "f-fadeIn" : ""), i.hideLoading(t), 
                    i.revealContent(t, a);
                }
                var l;
            }), (() => {
                i.setError(t, "{{IMAGE_ERROR}}");
            }));
        }
        process(t, e) {
            return new Promise(((i, s) => {
                var o;
                const a = this.instance, r = t.el;
                a.clearContent(t), a.showLoading(t);
                let l = this.optionFor(t, "content");
                if ("string" == typeof l && (l = n(l)), !l || !E(l)) {
                    if (l = document.createElement("img"), l instanceof HTMLImageElement) {
                        let i = "", n = t.caption;
                        i = "string" == typeof n && n ? n.replace(/<[^>]+>/gi, "").substring(0, 1e3) : `Image ${t.index + 1} of ${(null === (o = a.carousel) || void 0 === o ? void 0 : o.pages.length) || 1}`, 
                        l.src = e || "", l.alt = i, l.draggable = !1, t.srcset && l.setAttribute("srcset", t.srcset), 
                        this.instance.isOpeningSlide(t) && (l.fetchPriority = "high");
                    }
                    t.sizes && l.setAttribute("sizes", t.sizes);
                }
                P(l, "fancybox-image"), t.imageEl = l, a.setContent(t, l, !1);
                t.panzoom = new I(r, u({
                    transformParent: !0
                }, this.option("Panzoom") || {}, {
                    content: l,
                    width: (e, i) => a.optionFor(t, "width", "auto", i) || "auto",
                    height: (e, i) => a.optionFor(t, "height", "auto", i) || "auto",
                    wheel: () => {
                        const t = a.option("wheel");
                        return ("zoom" === t || "pan" == t) && t;
                    },
                    click: (e, i) => {
                        var n, s;
                        if (a.isCompact || a.isClosing()) return !1;
                        if (t.index !== (null === (n = a.getSlide()) || void 0 === n ? void 0 : n.index)) return !1;
                        if (i) {
                            const t = i.composedPath()[0];
                            if ([ "A", "BUTTON", "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO" ].includes(t.nodeName)) return !1;
                        }
                        let o = !i || i.target && (null === (s = t.contentEl) || void 0 === s ? void 0 : s.contains(i.target));
                        return a.option(o ? "contentClick" : "backdropClick") || !1;
                    },
                    dblClick: () => a.isCompact ? "toggleZoom" : a.option("contentDblClick") || !1,
                    spinner: !1,
                    panOnlyZoomed: !0,
                    wheelLimit: 1 / 0,
                    on: {
                        ready: t => {
                            i(t);
                        },
                        error: () => {
                            s();
                        },
                        destroy: () => {
                            s();
                        }
                    }
                }));
            }));
        }
        zoomIn(t) {
            return new Promise(((e, i) => {
                const n = this.instance, s = n.container, {panzoom: o, contentEl: a, el: r} = t;
                o && o.updateMetrics();
                const l = this.getZoomInfo(t);
                if (!(l && r && a && o && s)) return void i();
                const {x: c, y: h, scale: d, opacity: u} = l, p = () => {
                    t.state !== lt.Closing && (u && (a.style.opacity = Math.max(Math.min(1, 1 - (1 - o.scale) / (1 - d)), 0) + ""), 
                    o.scale >= 1 && o.scale > o.targetScale - .1 && e(o));
                }, f = t => {
                    (t.scale < .99 || t.scale > 1.01) && !t.isDragging || (S(s, yt), a.style.opacity = "", 
                    t.off("endAnimation", f), t.off("touchStart", f), t.off("afterTransform", p), e(t));
                };
                o.on("endAnimation", f), o.on("touchStart", f), o.on("afterTransform", p), o.on([ "error", "destroy" ], (() => {
                    i();
                })), o.panTo({
                    x: c,
                    y: h,
                    scale: d,
                    friction: 0,
                    ignoreBounds: !0
                }), o.stop("current");
                const g = {
                    event: "mousemove" === o.panMode ? n.prevMouseMoveEvent || n.options.event : void 0
                }, m = this.optionFor(t, "initialSize");
                P(s, yt), n.hideLoading(t), "full" === m ? o.zoomToFull(g) : "cover" === m ? o.zoomToCover(g) : "max" === m ? o.zoomToMax(g) : o.reset(.172);
            }));
        }
        getZoomInfo(t) {
            const {el: e, imageEl: i, thumbEl: n, panzoom: s} = t, o = this.instance, a = o.container;
            if (!e || !i || !n || !s || tt(n) < 3 || !this.optionFor(t, "zoom") || !a || o.state === rt.Destroy) return !1;
            if ("0" === getComputedStyle(a).getPropertyValue("--f-images-zoom")) return !1;
            const r = window.visualViewport || null;
            if (1 !== (r ? r.scale : 1)) return !1;
            let {top: l, left: c, width: h, height: d} = n.getBoundingClientRect(), {top: u, left: p, fitWidth: f, fitHeight: g} = s.contentRect;
            if (!(h && d && f && g)) return !1;
            const m = s.container.getBoundingClientRect();
            p += m.left, u += m.top;
            const v = -1 * (p + .5 * f - (c + .5 * h)), b = -1 * (u + .5 * g - (l + .5 * d)), y = h / f;
            let w = this.option("zoomOpacity") || !1;
            return "auto" === w && (w = Math.abs(h / d - f / g) > .1), {
                x: v,
                y: b,
                scale: y,
                opacity: w
            };
        }
        attach() {
            const t = this, e = t.instance;
            e.on("Carousel.change", t.onChange), e.on("Carousel.createSlide", t.onCreateSlide), 
            e.on("Carousel.removeSlide", t.onRemoveSlide), e.on("close", t.onClose);
        }
        detach() {
            const t = this, e = t.instance;
            e.off("Carousel.change", t.onChange), e.off("Carousel.createSlide", t.onCreateSlide), 
            e.off("Carousel.removeSlide", t.onRemoveSlide), e.off("close", t.onClose);
        }
    }
    Object.defineProperty(wt, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            initialSize: "fit",
            Panzoom: {
                maxScale: 1
            },
            protected: !1,
            zoom: !0,
            zoomOpacity: "auto"
        }
    }), "function" == typeof SuppressedError && SuppressedError;
    const xt = "html", Et = "image", St = "map", Pt = "youtube", Ct = "vimeo", Tt = "html5video", Mt = (t, e = {}) => {
        const i = new URL(t), n = new URLSearchParams(i.search), s = new URLSearchParams;
        for (const [t, i] of [ ...n, ...Object.entries(e) ]) {
            let e = i + "";
            if ("t" === t) {
                let t = e.match(/((\d*)m)?(\d*)s?/);
                t && s.set("start", 60 * parseInt(t[2] || "0") + parseInt(t[3] || "0") + "");
            } else s.set(t, e);
        }
        let o = s + "", a = t.match(/#t=((.*)?\d+s)/);
        return a && (o += `#t=${a[1]}`), o;
    }, Ot = {
        ajax: null,
        autoSize: !0,
        iframeAttr: {
            allow: "autoplay; fullscreen",
            scrolling: "auto"
        },
        preload: !0,
        videoAutoplay: !0,
        videoRatio: 16 / 9,
        videoTpl: '<video class="fancybox__html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">\n  <source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos.</video>',
        videoFormat: "",
        vimeo: {
            byline: 1,
            color: "00adef",
            controls: 1,
            dnt: 1,
            muted: 0
        },
        youtube: {
            controls: 1,
            enablejsapi: 1,
            nocookie: 1,
            rel: 0,
            fs: 1
        }
    }, At = [ "image", "html", "ajax", "inline", "clone", "iframe", "map", "pdf", "html5video", "youtube", "vimeo" ];
    class Lt extends _ {
        onBeforeInitSlide(t, e, i) {
            this.processType(i);
        }
        onCreateSlide(t, e, i) {
            this.setContent(i);
        }
        onClearContent(t, e) {
            e.xhr && (e.xhr.abort(), e.xhr = null);
            const i = e.iframeEl;
            i && (i.onload = i.onerror = null, i.src = "//about:blank", e.iframeEl = null);
            const n = e.contentEl, s = e.placeholderEl;
            if ("inline" === e.type && n && s) n.classList.remove("fancybox__content"), "none" !== getComputedStyle(n).getPropertyValue("display") && (n.style.display = "none"), 
            setTimeout((() => {
                s && (n && s.parentNode && s.parentNode.insertBefore(n, s), s.remove());
            }), 0), e.contentEl = void 0, e.placeholderEl = void 0; else for (;e.el && e.el.firstChild; ) e.el.removeChild(e.el.firstChild);
        }
        onSelectSlide(t, e, i) {
            i.state === lt.Ready && this.playVideo();
        }
        onUnselectSlide(t, e, i) {
            var n, s;
            if (i.type === Tt) {
                try {
                    null === (s = null === (n = i.el) || void 0 === n ? void 0 : n.querySelector("video")) || void 0 === s || s.pause();
                } catch (t) {}
                return;
            }
            let o;
            i.type === Ct ? o = {
                method: "pause",
                value: "true"
            } : i.type === Pt && (o = {
                event: "command",
                func: "pauseVideo"
            }), o && i.iframeEl && i.iframeEl.contentWindow && i.iframeEl.contentWindow.postMessage(JSON.stringify(o), "*"), 
            i.poller && clearTimeout(i.poller);
        }
        onDone(t, e) {
            t.isCurrentSlide(e) && !t.isClosing() && this.playVideo();
        }
        onRefresh(t, e) {
            e.slides.forEach((t => {
                t.el && (this.resizeIframe(t), this.setAspectRatio(t));
            }));
        }
        onMessage(t) {
            try {
                let e = JSON.parse(t.data);
                if ("https://player.vimeo.com" === t.origin) {
                    if ("ready" === e.event) for (let e of Array.from(document.getElementsByClassName("fancybox__iframe"))) e instanceof HTMLIFrameElement && e.contentWindow === t.source && (e.dataset.ready = "true");
                } else if (t.origin.match(/^https:\/\/(www.)?youtube(-nocookie)?.com$/) && "onReady" === e.event) {
                    const t = document.getElementById(e.id);
                    t && (t.dataset.ready = "true");
                }
            } catch (t) {}
        }
        loadAjaxContent(t) {
            const e = this.instance.optionFor(t, "src") || "";
            this.instance.showLoading(t);
            const i = this.instance, n = new XMLHttpRequest;
            i.showLoading(t), n.onreadystatechange = function() {
                n.readyState === XMLHttpRequest.DONE && i.state === rt.Ready && (i.hideLoading(t), 
                200 === n.status ? i.setContent(t, n.responseText) : i.setError(t, 404 === n.status ? "{{AJAX_NOT_FOUND}}" : "{{AJAX_FORBIDDEN}}"));
            };
            const s = t.ajax || null;
            n.open(s ? "POST" : "GET", e + ""), n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), 
            n.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n.send(s), t.xhr = n;
        }
        setInlineContent(t) {
            let e = null;
            if (E(t.src)) e = t.src; else if ("string" == typeof t.src) {
                const i = t.src.split("#", 2).pop();
                e = i ? document.getElementById(i) : null;
            }
            if (e) {
                if ("clone" === t.type || e.closest(".fancybox__slide")) {
                    e = e.cloneNode(!0);
                    const i = e.dataset.animationName;
                    i && (e.classList.remove(i), delete e.dataset.animationName);
                    let n = e.getAttribute("id");
                    n = n ? `${n}--clone` : `clone-${this.instance.id}-${t.index}`, e.setAttribute("id", n);
                } else if (e.parentNode) {
                    const i = document.createElement("div");
                    i.classList.add("fancybox-placeholder"), e.parentNode.insertBefore(i, e), t.placeholderEl = i;
                }
                this.instance.setContent(t, e);
            } else this.instance.setError(t, "{{ELEMENT_NOT_FOUND}}");
        }
        setIframeContent(t) {
            const {src: e, el: i} = t;
            if (!e || "string" != typeof e || !i) return;
            i.classList.add("is-loading");
            const n = this.instance, s = document.createElement("iframe");
            s.className = "fancybox__iframe", s.setAttribute("id", `fancybox__iframe_${n.id}_${t.index}`);
            for (const [e, i] of Object.entries(this.optionFor(t, "iframeAttr") || {})) s.setAttribute(e, i);
            s.onerror = () => {
                n.setError(t, "{{IFRAME_ERROR}}");
            }, t.iframeEl = s;
            const o = this.optionFor(t, "preload");
            if ("iframe" !== t.type || !1 === o) return s.setAttribute("src", t.src + ""), n.setContent(t, s, !1), 
            this.resizeIframe(t), void n.revealContent(t);
            n.showLoading(t), s.onload = () => {
                if (!s.src.length) return;
                const e = "true" !== s.dataset.ready;
                s.dataset.ready = "true", this.resizeIframe(t), e ? n.revealContent(t) : n.hideLoading(t);
            }, s.setAttribute("src", e), n.setContent(t, s, !1);
        }
        resizeIframe(t) {
            const {type: e, iframeEl: i} = t;
            if (e === Pt || e === Ct) return;
            const n = null == i ? void 0 : i.parentElement;
            if (!i || !n) return;
            let s = t.autoSize;
            void 0 === s && (s = this.optionFor(t, "autoSize"));
            let o = t.width || 0, a = t.height || 0;
            o && a && (s = !1);
            const r = n && n.style;
            if (!1 !== t.preload && !1 !== s && r) try {
                const t = window.getComputedStyle(n), e = parseFloat(t.paddingLeft) + parseFloat(t.paddingRight), s = parseFloat(t.paddingTop) + parseFloat(t.paddingBottom), l = i.contentWindow;
                if (l) {
                    const t = l.document, i = t.getElementsByTagName(xt)[0], n = t.body;
                    r.width = "", n.style.overflow = "hidden", o = o || i.scrollWidth + e, r.width = `${o}px`, 
                    n.style.overflow = "", r.flex = "0 0 auto", r.height = `${n.scrollHeight}px`, a = i.scrollHeight + s;
                }
            } catch (t) {}
            if (o || a) {
                const t = {
                    flex: "0 1 auto",
                    width: "",
                    height: ""
                };
                o && "auto" !== o && (t.width = `${o}px`), a && "auto" !== a && (t.height = `${a}px`), 
                Object.assign(r, t);
            }
        }
        playVideo() {
            const t = this.instance.getSlide();
            if (!t) return;
            const {el: e} = t;
            if (!e || !e.offsetParent) return;
            if (!this.optionFor(t, "videoAutoplay")) return;
            if (t.type === Tt) try {
                const t = e.querySelector("video");
                if (t) {
                    const e = t.play();
                    void 0 !== e && e.then((() => {})).catch((e => {
                        t.muted = !0, t.play();
                    }));
                }
            } catch (t) {}
            if (t.type !== Pt && t.type !== Ct) return;
            const i = () => {
                if (t.iframeEl && t.iframeEl.contentWindow) {
                    let e;
                    if ("true" === t.iframeEl.dataset.ready) return e = t.type === Pt ? {
                        event: "command",
                        func: "playVideo"
                    } : {
                        method: "play",
                        value: "true"
                    }, e && t.iframeEl.contentWindow.postMessage(JSON.stringify(e), "*"), void (t.poller = void 0);
                    t.type === Pt && (e = {
                        event: "listening",
                        id: t.iframeEl.getAttribute("id")
                    }, t.iframeEl.contentWindow.postMessage(JSON.stringify(e), "*"));
                }
                t.poller = setTimeout(i, 250);
            };
            i();
        }
        processType(t) {
            if (t.html) return t.type = xt, t.src = t.html, void (t.html = "");
            const e = this.instance.optionFor(t, "src", "");
            if (!e || "string" != typeof e) return;
            let i = t.type, n = null;
            if (n = e.match(/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|shorts\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i)) {
                const s = this.optionFor(t, Pt), {nocookie: o} = s, a = function(t, e) {
                    var i = {};
                    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.indexOf(n) < 0 && (i[n] = t[n]);
                    if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
                        var s = 0;
                        for (n = Object.getOwnPropertySymbols(t); s < n.length; s++) e.indexOf(n[s]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[s]) && (i[n[s]] = t[n[s]]);
                    }
                    return i;
                }(s, [ "nocookie" ]), r = `www.youtube${o ? "-nocookie" : ""}.com`, l = Mt(e, a), c = encodeURIComponent(n[2]);
                t.videoId = c, t.src = `https://${r}/embed/${c}?${l}`, t.thumbSrc = t.thumbSrc || `https://i.ytimg.com/vi/${c}/mqdefault.jpg`, 
                i = Pt;
            } else if (n = e.match(/^.+vimeo.com\/(?:\/)?([\d]+)((\/|\?h=)([a-z0-9]+))?(.*)?/)) {
                const s = Mt(e, this.optionFor(t, Ct)), o = encodeURIComponent(n[1]), a = n[4] || "";
                t.videoId = o, t.src = `https://player.vimeo.com/video/${o}?${a ? `h=${a}${s ? "&" : ""}` : ""}${s}`, 
                i = Ct;
            }
            if (!i && t.triggerEl) {
                const e = t.triggerEl.dataset.type;
                At.includes(e) && (i = e);
            }
            i || "string" == typeof e && ("#" === e.charAt(0) ? i = "inline" : (n = e.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (i = Tt, 
            t.videoFormat = t.videoFormat || "video/" + ("ogv" === n[1] ? "ogg" : n[1])) : e.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? i = Et : e.match(/\.(pdf)((\?|#).*)?$/i) && (i = "pdf")), 
            (n = e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i)) ? (t.src = `https://maps.google.${n[1]}/?ll=${(n[2] ? n[2] + "&z=" + Math.floor(parseFloat(n[3])) + (n[4] ? n[4].replace(/^\//, "&") : "") : n[4] + "").replace(/\?/, "&")}&output=${n[4] && n[4].indexOf("layer=c") > 0 ? "svembed" : "embed"}`, 
            i = St) : (n = e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i)) && (t.src = `https://maps.google.${n[1]}/maps?q=${n[2].replace("query=", "q=").replace("api=1", "")}&output=embed`, 
            i = St), i = i || this.instance.option("defaultType"), t.type = i, i === Et && (t.thumbSrc = t.thumbSrc || t.src);
        }
        setContent(t) {
            const e = this.instance.optionFor(t, "src") || "";
            if (t && t.type && e) {
                switch (t.type) {
                  case xt:
                    this.instance.setContent(t, e);
                    break;

                  case Tt:
                    const i = this.option("videoTpl");
                    i && this.instance.setContent(t, i.replace(/\{\{src\}\}/gi, e + "").replace(/\{\{format\}\}/gi, this.optionFor(t, "videoFormat") || "").replace(/\{\{poster\}\}/gi, t.poster || t.thumbSrc || ""));
                    break;

                  case "inline":
                  case "clone":
                    this.setInlineContent(t);
                    break;

                  case "ajax":
                    this.loadAjaxContent(t);
                    break;

                  case "pdf":
                  case St:
                  case Pt:
                  case Ct:
                    t.preload = !1;

                  case "iframe":
                    this.setIframeContent(t);
                }
                this.setAspectRatio(t);
            }
        }
        setAspectRatio(t) {
            const e = t.contentEl;
            if (!(t.el && e && t.type && [ Pt, Ct, Tt ].includes(t.type))) return;
            let i, n = t.width || "auto", s = t.height || "auto";
            if ("auto" === n || "auto" === s) {
                i = this.optionFor(t, "videoRatio");
                const e = (i + "").match(/(\d+)\s*\/\s?(\d+)/);
                i = e && e.length > 2 ? parseFloat(e[1]) / parseFloat(e[2]) : parseFloat(i + "");
            } else n && s && (i = n / s);
            if (!i) return;
            e.style.aspectRatio = "", e.style.width = "", e.style.height = "", e.offsetHeight;
            const o = e.getBoundingClientRect(), a = o.width || 1, r = o.height || 1;
            e.style.aspectRatio = i + "", i < a / r ? (s = "auto" === s ? r : Math.min(r, s), 
            e.style.width = "auto", e.style.height = `${s}px`) : (n = "auto" === n ? a : Math.min(a, n), 
            e.style.width = `${n}px`, e.style.height = "auto");
        }
        attach() {
            const t = this, e = t.instance;
            e.on("Carousel.beforeInitSlide", t.onBeforeInitSlide), e.on("Carousel.createSlide", t.onCreateSlide), 
            e.on("Carousel.selectSlide", t.onSelectSlide), e.on("Carousel.unselectSlide", t.onUnselectSlide), 
            e.on("Carousel.Panzoom.refresh", t.onRefresh), e.on("done", t.onDone), e.on("clearContent", t.onClearContent), 
            window.addEventListener("message", t.onMessage);
        }
        detach() {
            const t = this, e = t.instance;
            e.off("Carousel.beforeInitSlide", t.onBeforeInitSlide), e.off("Carousel.createSlide", t.onCreateSlide), 
            e.off("Carousel.selectSlide", t.onSelectSlide), e.off("Carousel.unselectSlide", t.onUnselectSlide), 
            e.off("Carousel.Panzoom.refresh", t.onRefresh), e.off("done", t.onDone), e.off("clearContent", t.onClearContent), 
            window.removeEventListener("message", t.onMessage);
        }
    }
    Object.defineProperty(Lt, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Ot
    });
    const zt = "play", Rt = "pause", kt = "ready";
    class It extends _ {
        constructor() {
            super(...arguments), Object.defineProperty(this, "state", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: kt
            }), Object.defineProperty(this, "inHover", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "timer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "progressBar", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            });
        }
        get isActive() {
            return this.state !== kt;
        }
        onReady(t) {
            this.option("autoStart") && (t.isInfinite || t.page < t.pages.length - 1) && this.start();
        }
        onChange() {
            this.removeProgressBar(), this.pause();
        }
        onSettle() {
            this.resume();
        }
        onVisibilityChange() {
            "visible" === document.visibilityState ? this.resume() : this.pause();
        }
        onMouseEnter() {
            this.inHover = !0, this.pause();
        }
        onMouseLeave() {
            var t;
            this.inHover = !1, (null === (t = this.instance.panzoom) || void 0 === t ? void 0 : t.isResting) && this.resume();
        }
        onTimerEnd() {
            const t = this.instance;
            "play" === this.state && (t.isInfinite || t.page !== t.pages.length - 1 ? t.slideNext() : t.slideTo(0));
        }
        removeProgressBar() {
            this.progressBar && (this.progressBar.remove(), this.progressBar = null);
        }
        createProgressBar() {
            var t;
            if (!this.option("showProgress")) return null;
            this.removeProgressBar();
            const e = this.instance, i = (null === (t = e.pages[e.page]) || void 0 === t ? void 0 : t.slides) || [];
            let n = this.option("progressParentEl");
            if (n || (n = (1 === i.length ? i[0].el : null) || e.viewport), !n) return null;
            const s = document.createElement("div");
            return P(s, "f-progress"), n.prepend(s), this.progressBar = s, s.offsetHeight, s;
        }
        set() {
            const t = this, e = t.instance;
            if (e.pages.length < 2) return;
            if (t.timer) return;
            const i = t.option("timeout");
            t.state = zt, P(e.container, "has-autoplay");
            let n = t.createProgressBar();
            n && (n.style.transitionDuration = `${i}ms`, n.style.transform = "scaleX(1)"), t.timer = setTimeout((() => {
                t.timer = null, t.inHover || t.onTimerEnd();
            }), i), t.emit("set");
        }
        clear() {
            const t = this;
            t.timer && (clearTimeout(t.timer), t.timer = null), t.removeProgressBar();
        }
        start() {
            const t = this;
            if (t.set(), t.state !== kt) {
                if (t.option("pauseOnHover")) {
                    const e = t.instance.container;
                    e.addEventListener("mouseenter", t.onMouseEnter, !1), e.addEventListener("mouseleave", t.onMouseLeave, !1);
                }
                document.addEventListener("visibilitychange", t.onVisibilityChange, !1), t.emit("start");
            }
        }
        stop() {
            const t = this, e = t.state, i = t.instance.container;
            t.clear(), t.state = kt, i.removeEventListener("mouseenter", t.onMouseEnter, !1), 
            i.removeEventListener("mouseleave", t.onMouseLeave, !1), document.removeEventListener("visibilitychange", t.onVisibilityChange, !1), 
            S(i, "has-autoplay"), e !== kt && t.emit("stop");
        }
        pause() {
            const t = this;
            t.state === zt && (t.state = Rt, t.clear(), t.emit(Rt));
        }
        resume() {
            const t = this, e = t.instance;
            if (e.isInfinite || e.page !== e.pages.length - 1) if (t.state !== zt) {
                if (t.state === Rt && !t.inHover) {
                    const e = new Event("resume", {
                        bubbles: !0,
                        cancelable: !0
                    });
                    t.emit("resume", e), e.defaultPrevented || t.set();
                }
            } else t.set(); else t.stop();
        }
        toggle() {
            this.state === zt || this.state === Rt ? this.stop() : this.start();
        }
        attach() {
            const t = this, e = t.instance;
            e.on("ready", t.onReady), e.on("Panzoom.startAnimation", t.onChange), e.on("Panzoom.endAnimation", t.onSettle), 
            e.on("Panzoom.touchMove", t.onChange);
        }
        detach() {
            const t = this, e = t.instance;
            e.off("ready", t.onReady), e.off("Panzoom.startAnimation", t.onChange), e.off("Panzoom.endAnimation", t.onSettle), 
            e.off("Panzoom.touchMove", t.onChange), t.stop();
        }
    }
    Object.defineProperty(It, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            autoStart: !0,
            pauseOnHover: !0,
            progressParentEl: null,
            showProgress: !0,
            timeout: 3e3
        }
    });
    class Dt extends _ {
        constructor() {
            super(...arguments), Object.defineProperty(this, "ref", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            });
        }
        onPrepare(t) {
            const e = t.carousel;
            if (!e) return;
            const i = t.container;
            i && (e.options.Autoplay = u({
                autoStart: !1
            }, this.option("Autoplay") || {}, {
                pauseOnHover: !1,
                timeout: this.option("timeout"),
                progressParentEl: () => this.option("progressParentEl") || null,
                on: {
                    start: () => {
                        t.emit("startSlideshow");
                    },
                    set: e => {
                        var n;
                        i.classList.add("has-slideshow"), (null === (n = t.getSlide()) || void 0 === n ? void 0 : n.state) !== lt.Ready && e.pause();
                    },
                    stop: () => {
                        i.classList.remove("has-slideshow"), t.isCompact || t.endIdle(), t.emit("endSlideshow");
                    },
                    resume: (e, i) => {
                        var n, s, o;
                        !i || !i.cancelable || (null === (n = t.getSlide()) || void 0 === n ? void 0 : n.state) === lt.Ready && (null === (o = null === (s = t.carousel) || void 0 === s ? void 0 : s.panzoom) || void 0 === o ? void 0 : o.isResting) || i.preventDefault();
                    }
                }
            }), e.attachPlugins({
                Autoplay: It
            }), this.ref = e.plugins.Autoplay);
        }
        onReady(t) {
            const e = t.carousel, i = this.ref;
            i && e && this.option("playOnStart") && (e.isInfinite || e.page < e.pages.length - 1) && i.start();
        }
        onDone(t, e) {
            const i = this.ref, n = t.carousel;
            if (!i || !n) return;
            const s = e.panzoom;
            s && s.on("startAnimation", (() => {
                t.isCurrentSlide(e) && i.stop();
            })), t.isCurrentSlide(e) && i.resume();
        }
        onKeydown(t, e) {
            var i;
            const n = this.ref;
            n && e === this.option("key") && "BUTTON" !== (null === (i = document.activeElement) || void 0 === i ? void 0 : i.nodeName) && n.toggle();
        }
        attach() {
            const t = this, e = t.instance;
            e.on("Carousel.init", t.onPrepare), e.on("Carousel.ready", t.onReady), e.on("done", t.onDone), 
            e.on("keydown", t.onKeydown);
        }
        detach() {
            const t = this, e = t.instance;
            e.off("Carousel.init", t.onPrepare), e.off("Carousel.ready", t.onReady), e.off("done", t.onDone), 
            e.off("keydown", t.onKeydown);
        }
    }
    Object.defineProperty(Dt, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            key: " ",
            playOnStart: !1,
            progressParentEl: t => {
                var e;
                return (null === (e = t.instance.container) || void 0 === e ? void 0 : e.querySelector(".fancybox__toolbar [data-fancybox-toggle-slideshow]")) || t.instance.container;
            },
            timeout: 3e3
        }
    });
    const Ft = {
        classes: {
            container: "f-thumbs f-carousel__thumbs",
            viewport: "f-thumbs__viewport",
            track: "f-thumbs__track",
            slide: "f-thumbs__slide",
            isResting: "is-resting",
            isSelected: "is-selected",
            isLoading: "is-loading",
            hasThumbs: "has-thumbs"
        },
        minCount: 2,
        parentEl: null,
        thumbTpl: '<button class="f-thumbs__slide__button" tabindex="0" type="button" aria-label="{{GOTO}}" data-carousel-index="%i"><img class="f-thumbs__slide__img" data-lazy-src="{{%s}}" alt="" /></button>',
        type: "modern"
    };
    var jt;
    !function(t) {
        t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Hidden = 2] = "Hidden";
    }(jt || (jt = {}));
    const Bt = "isResting", Ht = "thumbWidth", Nt = "thumbHeight", _t = "thumbClipWidth";
    let $t = class extends _ {
        constructor() {
            super(...arguments), Object.defineProperty(this, "type", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: "modern"
            }), Object.defineProperty(this, "container", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "track", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "carousel", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "thumbWidth", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "thumbClipWidth", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "thumbHeight", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "thumbGap", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "thumbExtraGap", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "state", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: jt.Init
            });
        }
        get isModern() {
            return "modern" === this.type;
        }
        onInitSlide(t, e) {
            const i = e.el ? e.el.dataset : void 0;
            i && (e.thumbSrc = i.thumbSrc || e.thumbSrc || "", e[_t] = parseFloat(i[_t] || "") || e[_t] || 0, 
            e[Nt] = parseFloat(i.thumbHeight || "") || e[Nt] || 0), this.addSlide(e);
        }
        onInitSlides() {
            this.build();
        }
        onChange() {
            var t;
            if (!this.isModern) return;
            const e = this.container, i = this.instance, n = i.panzoom, s = this.carousel, a = s ? s.panzoom : null, r = i.page;
            if (n && s && a) {
                if (n.isDragging) {
                    S(e, this.cn(Bt));
                    let n = (null === (t = s.pages[r]) || void 0 === t ? void 0 : t.pos) || 0;
                    n += i.getProgress(r) * (this[_t] + this.thumbGap);
                    let o = a.getBounds();
                    -1 * n > o.x.min && -1 * n < o.x.max && a.panTo({
                        x: -1 * n,
                        friction: .12
                    });
                } else o(e, this.cn(Bt), n.isResting);
                this.shiftModern();
            }
        }
        onRefresh() {
            this.updateProps();
            for (const t of this.instance.slides || []) this.resizeModernSlide(t);
            this.shiftModern();
        }
        isDisabled() {
            const t = this.option("minCount") || 0;
            if (t) {
                const e = this.instance;
                let i = 0;
                for (const t of e.slides || []) t.thumbSrc && i++;
                if (i < t) return !0;
            }
            const e = this.option("type");
            return [ "modern", "classic" ].indexOf(e) < 0;
        }
        getThumb(t) {
            const e = this.option("thumbTpl") || "";
            return {
                html: this.instance.localize(e, [ [ "%i", t.index ], [ "%d", t.index + 1 ], [ "%s", t.thumbSrc || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" ] ])
            };
        }
        addSlide(t) {
            const e = this.carousel;
            e && e.addSlide(t.index, this.getThumb(t));
        }
        getSlides() {
            const t = [];
            for (const e of this.instance.slides || []) t.push(this.getThumb(e));
            return t;
        }
        resizeModernSlide(t) {
            this.isModern && (t[Ht] = t[_t] && t[Nt] ? Math.round(this[Nt] * (t[_t] / t[Nt])) : this[Ht]);
        }
        updateProps() {
            const t = this.container;
            if (!t) return;
            const e = e => parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-" + e)) || 0;
            this.thumbGap = e("gap"), this.thumbExtraGap = e("extra-gap"), this[Ht] = e("width") || 40, 
            this[_t] = e("clip-width") || 40, this[Nt] = e("height") || 40;
        }
        build() {
            const t = this;
            if (t.state !== jt.Init) return;
            if (t.isDisabled()) return void t.emit("disabled");
            const e = t.instance, i = e.container, n = t.getSlides(), s = t.option("type");
            t.type = s;
            const o = t.option("parentEl"), a = t.cn("container"), r = t.cn("track");
            let l = null == o ? void 0 : o.querySelector("." + a);
            l || (l = document.createElement("div"), P(l, a), o ? o.appendChild(l) : i.after(l)), 
            P(l, `is-${s}`), P(i, t.cn("hasThumbs")), t.container = l, t.updateProps();
            let c = l.querySelector("." + r);
            c || (c = document.createElement("div"), P(c, t.cn("track")), l.appendChild(c)), 
            t.track = c;
            const h = u({}, {
                track: c,
                infinite: !1,
                center: !0,
                fill: "classic" === s,
                dragFree: !0,
                slidesPerPage: 1,
                transition: !1,
                preload: .25,
                friction: .12,
                Panzoom: {
                    maxVelocity: 0
                },
                Dots: !1,
                Navigation: !1,
                classes: {
                    container: "f-thumbs",
                    viewport: "f-thumbs__viewport",
                    track: "f-thumbs__track",
                    slide: "f-thumbs__slide"
                }
            }, t.option("Carousel") || {}, {
                Sync: {
                    target: e
                },
                slides: n
            }), d = new e.constructor(l, h);
            d.on("createSlide", ((e, i) => {
                t.setProps(i.index), t.emit("createSlide", i, i.el);
            })), d.on("ready", (() => {
                t.shiftModern(), t.emit("ready");
            })), d.on("refresh", (() => {
                t.shiftModern();
            })), d.on("Panzoom.click", ((e, i, n) => {
                t.onClick(n);
            })), t.carousel = d, t.state = jt.Ready;
        }
        onClick(t) {
            t.preventDefault(), t.stopPropagation();
            const e = this.instance, {pages: i, page: n} = e, s = t => {
                if (t) {
                    const e = t.closest("[data-carousel-index]");
                    if (e) return [ parseInt(e.dataset.carouselIndex || "", 10) || 0, e ];
                }
                return [ -1, void 0 ];
            }, o = (t, e) => {
                const i = document.elementFromPoint(t, e);
                return i ? s(i) : [ -1, void 0 ];
            };
            let [a, r] = s(t.target);
            if (a > -1) return;
            const l = this[_t], c = t.clientX, h = t.clientY;
            let [d, u] = o(c - l, h), [p, f] = o(c + l, h);
            u && f ? (a = Math.abs(c - u.getBoundingClientRect().right) < Math.abs(c - f.getBoundingClientRect().left) ? d : p, 
            a === n && (a = a === d ? p : d)) : u ? a = d : f && (a = p), a > -1 && i[a] && e.slideTo(a);
        }
        getShift(t) {
            var e;
            const i = this, {instance: n} = i, s = i.carousel;
            if (!n || !s) return 0;
            const o = i[Ht], a = i[_t], r = i.thumbGap, l = i.thumbExtraGap;
            if (!(null === (e = s.slides[t]) || void 0 === e ? void 0 : e.el)) return 0;
            const c = .5 * (o - a), h = n.pages.length - 1;
            let d = n.getProgress(0), u = n.getProgress(h), p = n.getProgress(t, !1, !0), f = 0, g = c + l + r;
            const m = d < 0 && d > -1, v = u > 0 && u < 1;
            return 0 === t ? (f = g * Math.abs(d), v && 1 === d && (f -= g * Math.abs(u))) : t === h ? (f = g * Math.abs(u) * -1, 
            m && -1 === u && (f += g * Math.abs(d))) : m || v ? (f = -1 * g, f += g * Math.abs(d), 
            f += g * (1 - Math.abs(u))) : f = g * p, f;
        }
        setProps(e) {
            var i;
            const n = this;
            if (!n.isModern) return;
            const {instance: s} = n, o = n.carousel;
            if (s && o) {
                const a = null === (i = o.slides[e]) || void 0 === i ? void 0 : i.el;
                if (a && a.childNodes.length) {
                    let i = t(1 - Math.abs(s.getProgress(e))), o = t(n.getShift(e));
                    a.style.setProperty("--progress", i ? i + "" : ""), a.style.setProperty("--shift", o + "");
                }
            }
        }
        shiftModern() {
            const t = this;
            if (!t.isModern) return;
            const {instance: e, track: i} = t, n = e.panzoom, s = t.carousel;
            if (!(e && i && n && s)) return;
            if (n.state === m.Init || n.state === m.Destroy) return;
            for (const i of e.slides) t.setProps(i.index);
            let o = (t[_t] + t.thumbGap) * (s.slides.length || 0);
            i.style.setProperty("--width", o + "");
        }
        cleanup() {
            const t = this;
            t.carousel && t.carousel.destroy(), t.carousel = null, t.container && t.container.remove(), 
            t.container = null, t.track && t.track.remove(), t.track = null, t.state = jt.Init, 
            S(t.instance.container, t.cn("hasThumbs"));
        }
        attach() {
            const t = this, e = t.instance;
            e.on("initSlide", t.onInitSlide), e.state === B.Init ? e.on("initSlides", t.onInitSlides) : t.onInitSlides(), 
            e.on([ "change", "Panzoom.afterTransform" ], t.onChange), e.on("Panzoom.refresh", t.onRefresh);
        }
        detach() {
            const t = this, e = t.instance;
            e.off("initSlide", t.onInitSlide), e.off("initSlides", t.onInitSlides), e.off([ "change", "Panzoom.afterTransform" ], t.onChange), 
            e.off("Panzoom.refresh", t.onRefresh), t.cleanup();
        }
    };
    Object.defineProperty($t, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Ft
    });
    const Wt = Object.assign(Object.assign({}, Ft), {
        key: "t",
        showOnStart: !0,
        parentEl: null
    }), Xt = "is-masked", qt = "aria-hidden";
    class Yt extends _ {
        constructor() {
            super(...arguments), Object.defineProperty(this, "ref", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "hidden", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            });
        }
        get isEnabled() {
            const t = this.ref;
            return t && !t.isDisabled();
        }
        get isHidden() {
            return this.hidden;
        }
        onClick(t, e) {
            e.stopPropagation();
        }
        onCreateSlide(t, e) {
            var i, n, s;
            const o = (null === (s = null === (n = null === (i = this.instance) || void 0 === i ? void 0 : i.carousel) || void 0 === n ? void 0 : n.slides[e.index]) || void 0 === s ? void 0 : s.type) || "", a = e.el;
            if (a && o) {
                let t = `for-${o}`;
                [ "video", "youtube", "vimeo", "html5video" ].includes(o) && (t += " for-video"), 
                P(a, t);
            }
        }
        onInit() {
            var t;
            const e = this, i = e.instance, n = i.carousel;
            if (e.ref || !n) return;
            const s = e.option("parentEl") || i.footer || i.container;
            if (!s) return;
            const o = u({}, e.options, {
                parentEl: s,
                classes: {
                    container: "f-thumbs fancybox__thumbs"
                },
                Carousel: {
                    Sync: {
                        friction: i.option("Carousel.friction") || 0
                    }
                },
                on: {
                    ready: t => {
                        const i = t.container;
                        i && this.hidden && (e.refresh(), i.style.transition = "none", e.hide(), i.offsetHeight, 
                        queueMicrotask((() => {
                            i.style.transition = "", e.show();
                        })));
                    }
                }
            });
            o.Carousel = o.Carousel || {}, o.Carousel.on = u((null === (t = e.options.Carousel) || void 0 === t ? void 0 : t.on) || {}, {
                click: this.onClick,
                createSlide: this.onCreateSlide
            }), n.options.Thumbs = o, n.attachPlugins({
                Thumbs: $t
            }), e.ref = n.plugins.Thumbs, e.option("showOnStart") || (e.ref.state = jt.Hidden, 
            e.hidden = !0);
        }
        onResize() {
            var t;
            const e = null === (t = this.ref) || void 0 === t ? void 0 : t.container;
            e && (e.style.maxHeight = "");
        }
        onKeydown(t, e) {
            const i = this.option("key");
            i && i === e && this.toggle();
        }
        toggle() {
            const t = this.ref;
            if (t && !t.isDisabled()) return t.state === jt.Hidden ? (t.state = jt.Init, void t.build()) : void (this.hidden ? this.show() : this.hide());
        }
        show() {
            const t = this.ref;
            if (!t || t.isDisabled()) return;
            const e = t.container;
            e && (this.refresh(), e.offsetHeight, e.removeAttribute(qt), e.classList.remove(Xt), 
            this.hidden = !1);
        }
        hide() {
            const t = this.ref, e = t && t.container;
            e && (this.refresh(), e.offsetHeight, e.classList.add(Xt), e.setAttribute(qt, "true")), 
            this.hidden = !0;
        }
        refresh() {
            const t = this.ref;
            if (!t || !t.state) return;
            const e = t.container, i = (null == e ? void 0 : e.firstChild) || null;
            e && i && i.childNodes.length && (e.style.maxHeight = `${i.getBoundingClientRect().height}px`);
        }
        attach() {
            const t = this, e = t.instance;
            e.state === rt.Init ? e.on("Carousel.init", t.onInit) : t.onInit(), e.on("resize", t.onResize), 
            e.on("keydown", t.onKeydown);
        }
        detach() {
            var t;
            const e = this, i = e.instance;
            i.off("Carousel.init", e.onInit), i.off("resize", e.onResize), i.off("keydown", e.onKeydown), 
            null === (t = i.carousel) || void 0 === t || t.detachPlugins([ "Thumbs" ]), e.ref = null;
        }
    }
    Object.defineProperty(Yt, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Wt
    });
    const Vt = {
        panLeft: {
            icon: '<svg><path d="M5 12h14M5 12l6 6M5 12l6-6"/></svg>',
            change: {
                panX: -100
            }
        },
        panRight: {
            icon: '<svg><path d="M5 12h14M13 18l6-6M13 6l6 6"/></svg>',
            change: {
                panX: 100
            }
        },
        panUp: {
            icon: '<svg><path d="M12 5v14M18 11l-6-6M6 11l6-6"/></svg>',
            change: {
                panY: -100
            }
        },
        panDown: {
            icon: '<svg><path d="M12 5v14M18 13l-6 6M6 13l6 6"/></svg>',
            change: {
                panY: 100
            }
        },
        zoomIn: {
            icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>',
            action: "zoomIn"
        },
        zoomOut: {
            icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
            action: "zoomOut"
        },
        toggle1to1: {
            icon: '<svg><path d="M3.51 3.07c5.74.02 11.48-.02 17.22.02 1.37.1 2.34 1.64 2.18 3.13 0 4.08.02 8.16 0 12.23-.1 1.54-1.47 2.64-2.79 2.46-5.61-.01-11.24.02-16.86-.01-1.36-.12-2.33-1.65-2.17-3.14 0-4.07-.02-8.16 0-12.23.1-1.36 1.22-2.48 2.42-2.46Z"/><path d="M5.65 8.54h1.49v6.92m8.94-6.92h1.49v6.92M11.5 9.4v.02m0 5.18v0"/></svg>',
            action: "toggleZoom"
        },
        toggleZoom: {
            icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
            action: "toggleZoom"
        },
        iterateZoom: {
            icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
            action: "iterateZoom"
        },
        rotateCCW: {
            icon: '<svg><path d="M15 4.55a8 8 0 0 0-6 14.9M9 15v5H4M18.37 7.16v.01M13 19.94v.01M16.84 18.37v.01M19.37 15.1v.01M19.94 11v.01"/></svg>',
            action: "rotateCCW"
        },
        rotateCW: {
            icon: '<svg><path d="M9 4.55a8 8 0 0 1 6 14.9M15 15v5h5M5.63 7.16v.01M4.06 11v.01M4.63 15.1v.01M7.16 18.37v.01M11 19.94v.01"/></svg>',
            action: "rotateCW"
        },
        flipX: {
            icon: '<svg style="stroke-width: 1.3"><path d="M12 3v18M16 7v10h5L16 7M8 7v10H3L8 7"/></svg>',
            action: "flipX"
        },
        flipY: {
            icon: '<svg style="stroke-width: 1.3"><path d="M3 12h18M7 16h10L7 21v-5M7 8h10L7 3v5"/></svg>',
            action: "flipY"
        },
        fitX: {
            icon: '<svg><path d="M4 12V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M10 18H3M21 18h-7M6 15l-3 3 3 3M18 15l3 3-3 3"/></svg>',
            action: "fitX"
        },
        fitY: {
            icon: '<svg><path d="M12 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6M18 14v7M18 3v7M15 18l3 3 3-3M15 6l3-3 3 3"/></svg>',
            action: "fitY"
        },
        reset: {
            icon: '<svg><path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg>',
            action: "reset"
        },
        toggleFS: {
            icon: '<svg><g><path d="M14.5 9.5 21 3m0 0h-6m6 0v6M3 21l6.5-6.5M3 21v-6m0 6h6"/></g><g><path d="m14 10 7-7m-7 7h6m-6 0V4M3 21l7-7m0 0v6m0-6H4"/></g></svg>',
            action: "toggleFS"
        }
    };
    var Zt;
    !function(t) {
        t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Disabled = 2] = "Disabled";
    }(Zt || (Zt = {}));
    const Ut = {
        absolute: "auto",
        display: {
            left: [ "infobar" ],
            middle: [],
            right: [ "iterateZoom", "slideshow", "fullscreen", "thumbs", "close" ]
        },
        enabled: "auto",
        items: {
            infobar: {
                tpl: '<div class="fancybox__infobar" tabindex="-1"><span data-fancybox-current-index></span>/<span data-fancybox-count></span></div>'
            },
            download: {
                tpl: '<a class="f-button" title="{{DOWNLOAD}}" data-fancybox-download href="javasript:;"><svg><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12"/></svg></a>'
            },
            prev: {
                tpl: '<button class="f-button" title="{{PREV}}" data-fancybox-prev><svg><path d="m15 6-6 6 6 6"/></svg></button>'
            },
            next: {
                tpl: '<button class="f-button" title="{{NEXT}}" data-fancybox-next><svg><path d="m9 6 6 6-6 6"/></svg></button>'
            },
            slideshow: {
                tpl: '<button class="f-button" title="{{TOGGLE_SLIDESHOW}}" data-fancybox-toggle-slideshow><svg><g><path d="M8 4v16l13 -8z"></path></g><g><path d="M8 4v15M17 4v15"/></g></svg></button>'
            },
            fullscreen: {
                tpl: '<button class="f-button" title="{{TOGGLE_FULLSCREEN}}" data-fancybox-toggle-fullscreen><svg><g><path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v2M16 20h2a2 2 0 0 0 2-2v-2"/></g><g><path d="M15 19v-2a2 2 0 0 1 2-2h2M15 5v2a2 2 0 0 0 2 2h2M5 15h2a2 2 0 0 1 2 2v2M5 9h2a2 2 0 0 0 2-2V5"/></g></svg></button>'
            },
            thumbs: {
                tpl: '<button class="f-button" title="{{TOGGLE_THUMBS}}" data-fancybox-toggle-thumbs><svg><circle cx="5.5" cy="5.5" r="1"/><circle cx="12" cy="5.5" r="1"/><circle cx="18.5" cy="5.5" r="1"/><circle cx="5.5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18.5" cy="12" r="1"/><circle cx="5.5" cy="18.5" r="1"/><circle cx="12" cy="18.5" r="1"/><circle cx="18.5" cy="18.5" r="1"/></svg></button>'
            },
            close: {
                tpl: '<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg><path d="m19.5 4.5-15 15M4.5 4.5l15 15"/></svg></button>'
            }
        },
        parentEl: null
    }, Gt = {
        tabindex: "-1",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg"
    }, Kt = "has-toolbar", Jt = "fancybox__toolbar";
    class Qt extends _ {
        constructor() {
            super(...arguments), Object.defineProperty(this, "state", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: Zt.Init
            }), Object.defineProperty(this, "container", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            });
        }
        onReady(t) {
            var e;
            if (!t.carousel) return;
            let i = this.option("display"), n = this.option("absolute"), s = this.option("enabled");
            if ("auto" === s) {
                const t = this.instance.carousel;
                let e = 0;
                if (t) for (const i of t.slides) (i.panzoom || "image" === i.type) && e++;
                e || (s = !1);
            }
            s || (i = void 0);
            let o = 0;
            const a = {
                left: [],
                middle: [],
                right: []
            };
            if (i) for (const t of [ "left", "middle", "right" ]) for (const n of i[t]) {
                const i = this.createEl(n);
                i && (null === (e = a[t]) || void 0 === e || e.push(i), o++);
            }
            let r = null;
            if (o && (r = this.createContainer()), r) {
                for (const [t, e] of Object.entries(a)) {
                    const i = document.createElement("div");
                    P(i, Jt + "__column is-" + t);
                    for (const t of e) i.appendChild(t);
                    "auto" !== n || "middle" !== t || e.length || (n = !0), r.appendChild(i);
                }
                !0 === n && P(r, "is-absolute"), this.state = Zt.Ready, this.onRefresh();
            } else this.state = Zt.Disabled;
        }
        onClick(t) {
            var e, i;
            const n = this.instance, s = n.getSlide(), o = null == s ? void 0 : s.panzoom, a = t.target, r = a && E(a) ? a.dataset : null;
            if (!r) return;
            if (void 0 !== r.fancyboxToggleThumbs) return t.preventDefault(), t.stopPropagation(), 
            void (null === (e = n.plugins.Thumbs) || void 0 === e || e.toggle());
            if (void 0 !== r.fancyboxToggleFullscreen) return t.preventDefault(), t.stopPropagation(), 
            void this.instance.toggleFullscreen();
            if (void 0 !== r.fancyboxToggleSlideshow) {
                t.preventDefault(), t.stopPropagation();
                const e = null === (i = n.carousel) || void 0 === i ? void 0 : i.plugins.Autoplay;
                let s = e.isActive;
                return o && "mousemove" === o.panMode && !s && o.reset(), void (s ? e.stop() : e.start());
            }
            const l = r.panzoomAction, c = r.panzoomChange;
            if ((c || l) && (t.preventDefault(), t.stopPropagation()), c) {
                let t = {};
                try {
                    t = JSON.parse(c);
                } catch (t) {}
                o && o.applyChange(t);
            } else l && o && o[l] && o[l]();
        }
        onChange() {
            this.onRefresh();
        }
        onRefresh() {
            if (this.instance.isClosing()) return;
            const t = this.container;
            if (!t) return;
            const e = this.instance.getSlide();
            if (!e || e.state !== lt.Ready) return;
            const i = e && !e.error && e.panzoom;
            for (const e of t.querySelectorAll("[data-panzoom-action]")) i ? (e.removeAttribute("disabled"), 
            e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
            let n = i && i.canZoomIn(), s = i && i.canZoomOut();
            for (const e of t.querySelectorAll('[data-panzoom-action="zoomIn"]')) n ? (e.removeAttribute("disabled"), 
            e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
            for (const e of t.querySelectorAll('[data-panzoom-action="zoomOut"]')) s ? (e.removeAttribute("disabled"), 
            e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
            for (const e of t.querySelectorAll('[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]')) {
                s || n ? (e.removeAttribute("disabled"), e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), 
                e.setAttribute("tabindex", "-1"));
                const t = e.querySelector("g");
                t && (t.style.display = n ? "" : "none");
            }
        }
        onDone(t, e) {
            var i;
            null === (i = e.panzoom) || void 0 === i || i.on("afterTransform", (() => {
                this.instance.isCurrentSlide(e) && this.onRefresh();
            })), this.instance.isCurrentSlide(e) && this.onRefresh();
        }
        createContainer() {
            const t = this.instance.container;
            if (!t) return null;
            const e = this.option("parentEl") || t;
            let i = e.querySelector("." + Jt);
            return i || (i = document.createElement("div"), P(i, Jt), e.prepend(i)), i.addEventListener("click", this.onClick, {
                passive: !1,
                capture: !0
            }), t && P(t, Kt), this.container = i, i;
        }
        createEl(t) {
            const e = this.instance, i = e.carousel;
            if (!i) return null;
            if ("toggleFS" === t) return null;
            if ("fullscreen" === t && !ot()) return null;
            let s = null;
            const o = i.slides.length || 0;
            let a = 0, r = 0;
            for (const t of i.slides) (t.panzoom || "image" === t.type) && a++, ("image" === t.type || t.downloadSrc) && r++;
            if (o < 2 && [ "infobar", "prev", "next" ].includes(t)) return s;
            if (void 0 !== Vt[t] && !a) return null;
            if ("download" === t && !r) return null;
            if ("thumbs" === t) {
                const t = e.plugins.Thumbs;
                if (!t || !t.isEnabled) return null;
            }
            if ("slideshow" === t) if (!i.plugins.Autoplay || o < 2) return null;
            if (void 0 !== Vt[t]) {
                const e = Vt[t];
                s = document.createElement("button"), s.setAttribute("title", this.instance.localize(`{{${t.toUpperCase()}}}`)), 
                P(s, "f-button"), e.action && (s.dataset.panzoomAction = e.action), e.change && (s.dataset.panzoomChange = JSON.stringify(e.change)), 
                s.appendChild(n(this.instance.localize(e.icon)));
            } else {
                const e = (this.option("items") || [])[t];
                e && (s = n(this.instance.localize(e.tpl)), "function" == typeof e.click && s.addEventListener("click", (t => {
                    t.preventDefault(), t.stopPropagation(), "function" == typeof e.click && e.click.call(this, this, t);
                })));
            }
            const l = null == s ? void 0 : s.querySelector("svg");
            if (l) for (const [t, e] of Object.entries(Gt)) l.getAttribute(t) || l.setAttribute(t, String(e));
            return s;
        }
        removeContainer() {
            const t = this.container;
            t && t.remove(), this.container = null, this.state = Zt.Disabled;
            const e = this.instance.container;
            e && S(e, Kt);
        }
        attach() {
            const t = this, e = t.instance;
            e.on("Carousel.initSlides", t.onReady), e.on("done", t.onDone), e.on([ "reveal", "Carousel.change" ], t.onChange), 
            t.onReady(t.instance);
        }
        detach() {
            const t = this, e = t.instance;
            e.off("Carousel.initSlides", t.onReady), e.off("done", t.onDone), e.off([ "reveal", "Carousel.change" ], t.onChange), 
            t.removeContainer();
        }
    }
    Object.defineProperty(Qt, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Ut
    });
    const te = {
        Hash: class extends _ {
            onReady() {
                ht = !1;
            }
            onChange(t) {
                ut && clearTimeout(ut);
                const {hash: e} = pt(), {hash: i} = ft(), n = t.isOpeningSlide(t.getSlide());
                n && (ct = i === e ? "" : i), e && e !== i && (ut = setTimeout((() => {
                    try {
                        if (t.state === rt.Ready) {
                            let t = "replaceState";
                            n && !dt && (t = "pushState", dt = !0), window.history[t]({}, document.title, window.location.pathname + window.location.search + e);
                        }
                    } catch (t) {}
                }), 300));
            }
            onClose(t) {
                if (ut && clearTimeout(ut), !ht && dt) return dt = !1, ht = !1, void window.history.back();
                if (!ht) try {
                    window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (ct || ""));
                } catch (t) {}
            }
            attach() {
                const t = this.instance;
                t.on("ready", this.onReady), t.on([ "Carousel.ready", "Carousel.change" ], this.onChange), 
                t.on("close", this.onClose);
            }
            detach() {
                const t = this.instance;
                t.off("ready", this.onReady), t.off([ "Carousel.ready", "Carousel.change" ], this.onChange), 
                t.off("close", this.onClose);
            }
            static parseURL() {
                return ft();
            }
            static startFromUrl() {
                gt();
            }
            static destroy() {
                window.removeEventListener("hashchange", vt, !1);
            }
        },
        Html: Lt,
        Images: wt,
        Slideshow: Dt,
        Thumbs: Yt,
        Toolbar: Qt
    }, ee = "with-fancybox", ie = "hide-scrollbar", ne = "--fancybox-scrollbar-compensate", se = "--fancybox-body-margin", oe = "aria-hidden", ae = "is-using-tab", re = "is-animated", le = "is-compact", ce = "is-loading", he = "is-opening", de = "has-caption", ue = "disabled", pe = "tabindex", fe = "download", ge = "href", me = "src", ve = t => "string" == typeof t, be = function() {
        var t = window.getSelection();
        return !!t && "Range" === t.type;
    };
    let ye, we = null, xe = null, Ee = 0, Se = 0, Pe = 0, Ce = 0;
    const Te = new Map;
    let Me = 0;
    class Oe extends g {
        get isIdle() {
            return this.idle;
        }
        get isCompact() {
            return this.option("compact");
        }
        constructor(t = [], e = {}, i = {}) {
            super(e), Object.defineProperty(this, "userSlides", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: []
            }), Object.defineProperty(this, "userPlugins", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {}
            }), Object.defineProperty(this, "idle", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "idleTimer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "clickTimer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "pwt", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "ignoreFocusChange", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "startedFs", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "state", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: rt.Init
            }), Object.defineProperty(this, "id", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "container", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "caption", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "footer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "carousel", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "lastFocus", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "prevMouseMoveEvent", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), ye || (ye = ot()), this.id = e.id || ++Me, Te.set(this.id, this), this.userSlides = t, 
            this.userPlugins = i, queueMicrotask((() => {
                this.init();
            }));
        }
        init() {
            if (this.state === rt.Destroy) return;
            this.state = rt.Init, this.attachPlugins(Object.assign(Object.assign({}, Oe.Plugins), this.userPlugins)), 
            this.emit("init"), this.emit("attachPlugins"), !0 === this.option("hideScrollbar") && (() => {
                if (!et) return;
                const t = document, e = t.body, i = t.documentElement;
                if (e.classList.contains(ie)) return;
                let n = window.innerWidth - i.getBoundingClientRect().width;
                const s = parseFloat(window.getComputedStyle(e).marginRight);
                n < 0 && (n = 0), i.style.setProperty(ne, `${n}px`), s && e.style.setProperty(se, `${s}px`), 
                e.classList.add(ie);
            })(), this.initLayout(), this.scale();
            const t = () => {
                this.initCarousel(this.userSlides), this.state = rt.Ready, this.attachEvents(), 
                this.emit("ready"), setTimeout((() => {
                    this.container && this.container.setAttribute(oe, "false");
                }), 16);
            };
            this.option("Fullscreen.autoStart") && ye && !ye.isFullscreen() ? ye.request().then((() => {
                this.startedFs = !0, t();
            })).catch((() => t())) : t();
        }
        initLayout() {
            var t, e;
            const i = this.option("parentEl") || document.body, s = n(this.localize(this.option("tpl.main") || ""));
            if (s) {
                if (s.setAttribute("id", `fancybox-${this.id}`), s.setAttribute("aria-label", this.localize("{{MODAL}}")), 
                s.classList.toggle(le, this.isCompact), P(s, this.option("mainClass") || ""), P(s, he), 
                this.container = s, this.footer = s.querySelector(".fancybox__footer"), i.appendChild(s), 
                P(document.documentElement, ee), we && xe || (we = document.createElement("span"), 
                P(we, "fancybox-focus-guard"), we.setAttribute(pe, "0"), we.setAttribute(oe, "true"), 
                we.setAttribute("aria-label", "Focus guard"), xe = we.cloneNode(), null === (t = s.parentElement) || void 0 === t || t.insertBefore(we, s), 
                null === (e = s.parentElement) || void 0 === e || e.append(xe)), s.addEventListener("mousedown", (t => {
                    Ee = t.pageX, Se = t.pageY, S(s, ae);
                })), this.option("closeExisting")) for (const t of Te.values()) t.id !== this.id && t.close(); else this.option("animated") && (P(s, re), 
                setTimeout((() => {
                    this.isClosing() || S(s, re);
                }), 350));
                this.emit("initLayout");
            }
        }
        initCarousel(t) {
            const i = this.container;
            if (!i) return;
            const n = i.querySelector(".fancybox__carousel");
            if (!n) return;
            const s = this.carousel = new Q(n, u({}, {
                slides: t,
                transition: "fade",
                Panzoom: {
                    lockAxis: this.option("dragToClose") ? "xy" : "x",
                    infinite: !!this.option("dragToClose") && "y"
                },
                Dots: !1,
                Navigation: {
                    classes: {
                        container: "fancybox__nav",
                        button: "f-button",
                        isNext: "is-next",
                        isPrev: "is-prev"
                    }
                },
                initialPage: this.option("startIndex"),
                l10n: this.option("l10n")
            }, this.option("Carousel") || {}));
            s.on("*", ((t, e, ...i) => {
                this.emit(`Carousel.${e}`, t, ...i);
            })), s.on([ "ready", "change" ], (() => {
                this.manageCaption();
            })), this.on("Carousel.removeSlide", ((t, e, i) => {
                this.clearContent(i), i.state = void 0;
            })), s.on("Panzoom.touchStart", (() => {
                var t, e;
                this.isCompact || this.endIdle(), (null === (t = document.activeElement) || void 0 === t ? void 0 : t.closest(".f-thumbs")) && (null === (e = this.container) || void 0 === e || e.focus());
            })), s.on("settle", (() => {
                this.idleTimer || this.isCompact || !this.option("idle") || this.setIdle(), this.option("autoFocus") && !this.isClosing && this.checkFocus();
            })), this.option("dragToClose") && (s.on("Panzoom.afterTransform", ((t, i) => {
                const n = this.getSlide();
                if (n && e(n.el)) return;
                const s = this.container;
                if (s) {
                    const t = Math.abs(i.current.f), e = t < 1 ? "" : Math.max(.5, Math.min(1, 1 - t / i.contentRect.fitHeight * 1.5));
                    s.style.setProperty("--fancybox-ts", e ? "0s" : ""), s.style.setProperty("--fancybox-opacity", e + "");
                }
            })), s.on("Panzoom.touchEnd", ((t, i, n) => {
                var s;
                const o = this.getSlide();
                if (o && e(o.el)) return;
                if (i.isMobile && document.activeElement && -1 !== [ "TEXTAREA", "INPUT" ].indexOf(null === (s = document.activeElement) || void 0 === s ? void 0 : s.nodeName)) return;
                const a = Math.abs(i.dragOffset.y);
                "y" === i.lockedAxis && (a >= 200 || a >= 50 && i.dragOffset.time < 300) && (n && n.cancelable && n.preventDefault(), 
                this.close(n, "f-throwOut" + (i.current.f < 0 ? "Up" : "Down")));
            }))), s.on("change", (t => {
                var e;
                let i = null === (e = this.getSlide()) || void 0 === e ? void 0 : e.triggerEl;
                if (i) {
                    const e = new CustomEvent("slideTo", {
                        bubbles: !0,
                        cancelable: !0,
                        detail: t.page
                    });
                    i.dispatchEvent(e);
                }
            })), s.on([ "refresh", "change" ], (t => {
                const e = this.container;
                if (!e) return;
                for (const i of e.querySelectorAll("[data-fancybox-current-index]")) i.innerHTML = t.page + 1;
                for (const i of e.querySelectorAll("[data-fancybox-count]")) i.innerHTML = t.pages.length;
                if (!t.isInfinite) {
                    for (const i of e.querySelectorAll("[data-fancybox-next]")) t.page < t.pages.length - 1 ? (i.removeAttribute(ue), 
                    i.removeAttribute(pe)) : (i.setAttribute(ue, ""), i.setAttribute(pe, "-1"));
                    for (const i of e.querySelectorAll("[data-fancybox-prev]")) t.page > 0 ? (i.removeAttribute(ue), 
                    i.removeAttribute(pe)) : (i.setAttribute(ue, ""), i.setAttribute(pe, "-1"));
                }
                const i = this.getSlide();
                if (!i) return;
                let n = i.downloadSrc || "";
                n || "image" !== i.type || i.error || !ve(i[me]) || (n = i[me]);
                for (const t of e.querySelectorAll("[data-fancybox-download]")) {
                    const e = i.downloadFilename;
                    n ? (t.removeAttribute(ue), t.removeAttribute(pe), t.setAttribute(ge, n), t.setAttribute(fe, e || n), 
                    t.setAttribute("target", "_blank")) : (t.setAttribute(ue, ""), t.setAttribute(pe, "-1"), 
                    t.removeAttribute(ge), t.removeAttribute(fe));
                }
            })), this.emit("initCarousel");
        }
        attachEvents() {
            const t = this, e = t.container;
            if (!e) return;
            e.addEventListener("click", t.onClick, {
                passive: !1,
                capture: !1
            }), e.addEventListener("wheel", t.onWheel, {
                passive: !1,
                capture: !1
            }), document.addEventListener("keydown", t.onKeydown, {
                passive: !1,
                capture: !0
            }), document.addEventListener("visibilitychange", t.onVisibilityChange, !1), document.addEventListener("mousemove", t.onMousemove), 
            t.option("trapFocus") && document.addEventListener("focus", t.onFocus, !0), window.addEventListener("resize", t.onResize);
            const i = window.visualViewport;
            i && (i.addEventListener("scroll", t.onResize), i.addEventListener("resize", t.onResize));
        }
        detachEvents() {
            const t = this, e = t.container;
            if (!e) return;
            document.removeEventListener("keydown", t.onKeydown, {
                passive: !1,
                capture: !0
            }), e.removeEventListener("wheel", t.onWheel, {
                passive: !1,
                capture: !1
            }), e.removeEventListener("click", t.onClick, {
                passive: !1,
                capture: !1
            }), document.removeEventListener("mousemove", t.onMousemove), window.removeEventListener("resize", t.onResize);
            const i = window.visualViewport;
            i && (i.removeEventListener("resize", t.onResize), i.removeEventListener("scroll", t.onResize)), 
            document.removeEventListener("visibilitychange", t.onVisibilityChange, !1), document.removeEventListener("focus", t.onFocus, !0);
        }
        scale() {
            const t = this.container;
            if (!t) return;
            const e = window.visualViewport, i = Math.max(1, (null == e ? void 0 : e.scale) || 1);
            let n = "", s = "", o = "";
            if (e && i > 1) {
                let t = `${e.offsetLeft}px`, a = `${e.offsetTop}px`;
                n = e.width * i + "px", s = e.height * i + "px", o = `translate3d(${t}, ${a}, 0) scale(${1 / i})`;
            }
            t.style.transform = o, t.style.width = n, t.style.height = s;
        }
        onClick(t) {
            var e;
            const {container: i, isCompact: n} = this;
            if (!i || this.isClosing()) return;
            !n && this.option("idle") && this.resetIdle();
            const s = t.composedPath()[0];
            if (s.closest(".fancybox-spinner") || s.closest("[data-fancybox-close]")) return t.preventDefault(), 
            void this.close(t);
            if (s.closest("[data-fancybox-prev]")) return t.preventDefault(), void this.prev();
            if (s.closest("[data-fancybox-next]")) return t.preventDefault(), void this.next();
            if ("click" === t.type && 0 === t.detail) return;
            if (Math.abs(t.pageX - Ee) > 30 || Math.abs(t.pageY - Se) > 30) return;
            const o = document.activeElement;
            if (be() && o && i.contains(o)) return;
            if (n && "image" === (null === (e = this.getSlide()) || void 0 === e ? void 0 : e.type)) return void (this.clickTimer ? (clearTimeout(this.clickTimer), 
            this.clickTimer = null) : this.clickTimer = setTimeout((() => {
                this.toggleIdle(), this.clickTimer = null;
            }), 350));
            if (this.emit("click", t), t.defaultPrevented) return;
            let a = !1;
            if (s.closest(".fancybox__content")) {
                if (o) {
                    if (o.closest("[contenteditable]")) return;
                    s.matches(nt) || o.blur();
                }
                if (be()) return;
                a = this.option("contentClick");
            } else s.closest(".fancybox__carousel") && !s.matches(nt) && (a = this.option("backdropClick"));
            "close" === a ? (t.preventDefault(), this.close(t)) : "next" === a ? (t.preventDefault(), 
            this.next()) : "prev" === a && (t.preventDefault(), this.prev());
        }
        onWheel(t) {
            const e = t.target;
            let n = this.option("wheel", t);
            e.closest(".fancybox__thumbs") && (n = "slide");
            const s = "slide" === n, o = [ -t.deltaX || 0, -t.deltaY || 0, -t.detail || 0 ].reduce((function(t, e) {
                return Math.abs(e) > Math.abs(t) ? e : t;
            })), a = Math.max(-1, Math.min(1, o)), r = Date.now();
            this.pwt && r - this.pwt < 300 ? s && t.preventDefault() : (this.pwt = r, this.emit("wheel", t, a), 
            t.defaultPrevented || ("close" === n ? (t.preventDefault(), this.close(t)) : "slide" === n && (i(e) || (t.preventDefault(), 
            this[a > 0 ? "prev" : "next"]()))));
        }
        onScroll() {
            window.scrollTo(Pe, Ce);
        }
        onKeydown(t) {
            if (!this.isTopmost()) return;
            this.isCompact || !this.option("idle") || this.isClosing() || this.resetIdle();
            const e = t.key, i = this.option("keyboard");
            if (!i) return;
            const n = t.composedPath()[0], s = document.activeElement && document.activeElement.classList, o = s && s.contains("f-button") || n.dataset.carouselPage || n.dataset.carouselIndex;
            if ("Escape" !== e && !o && E(n)) if (n.isContentEditable || -1 !== [ "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO" ].indexOf(n.nodeName)) return;
            if ("Tab" === t.key ? P(this.container, ae) : S(this.container, ae), t.ctrlKey || t.altKey || t.shiftKey) return;
            this.emit("keydown", e, t);
            const a = i[e];
            a && "function" == typeof this[a] && (t.preventDefault(), this[a]());
        }
        onResize() {
            const t = this.container;
            if (!t) return;
            const e = this.isCompact;
            t.classList.toggle(le, e), this.manageCaption(this.getSlide()), this.isCompact ? this.clearIdle() : this.endIdle(), 
            this.scale(), this.emit("resize");
        }
        onFocus(t) {
            this.isTopmost() && this.checkFocus(t);
        }
        onMousemove(t) {
            this.prevMouseMoveEvent = t, !this.isCompact && this.option("idle") && this.resetIdle();
        }
        onVisibilityChange() {
            "visible" === document.visibilityState ? this.checkFocus() : this.endIdle();
        }
        manageCloseBtn(t) {
            const e = this.optionFor(t, "closeButton") || !1;
            if ("auto" === e) {
                const t = this.plugins.Toolbar;
                if (t && t.state === Zt.Ready) return;
            }
            if (!e) return;
            if (!t.contentEl || t.closeBtnEl) return;
            const i = this.option("tpl.closeButton");
            if (i) {
                const e = n(this.localize(i));
                t.closeBtnEl = t.contentEl.appendChild(e), t.el && P(t.el, "has-close-btn");
            }
        }
        manageCaption(t = void 0) {
            var e, i;
            const n = "fancybox__caption", s = this.container;
            if (!s) return;
            S(s, de);
            const o = this.isCompact || this.option("commonCaption"), a = !o;
            if (this.caption && this.stop(this.caption), a && this.caption && (this.caption.remove(), 
            this.caption = null), o && !this.caption) for (const t of (null === (e = this.carousel) || void 0 === e ? void 0 : e.slides) || []) t.captionEl && (t.captionEl.remove(), 
            t.captionEl = void 0, S(t.el, de), null === (i = t.el) || void 0 === i || i.removeAttribute("aria-labelledby"));
            if (t || (t = this.getSlide()), !t || o && !this.isCurrentSlide(t)) return;
            const r = t.el;
            let l = this.optionFor(t, "caption", "");
            if (!l) return void (o && this.caption && this.animate(this.caption, "f-fadeOut", (() => {
                this.caption && (this.caption.innerHTML = "");
            })));
            let c = null;
            if (a) {
                if (c = t.captionEl || null, r && !c) {
                    const e = n + `_${this.id}_${t.index}`;
                    c = document.createElement("div"), P(c, n), c.setAttribute("id", e), t.captionEl = r.appendChild(c), 
                    P(r, de), r.setAttribute("aria-labelledby", e);
                }
            } else {
                if (c = this.caption, c || (c = s.querySelector("." + n)), !c) {
                    c = document.createElement("div"), c.dataset.fancyboxCaption = "", P(c, n);
                    (this.footer || s).prepend(c);
                }
                P(s, de), this.caption = c;
            }
            c && (c.innerHTML = "", ve(l) || "number" == typeof l ? c.innerHTML = l + "" : l instanceof HTMLElement && c.appendChild(l));
        }
        checkFocus(t) {
            this.focus(t);
        }
        focus(t) {
            var e;
            if (this.ignoreFocusChange) return;
            const i = document.activeElement || null, n = (null == t ? void 0 : t.target) || null, s = this.container, o = null === (e = this.carousel) || void 0 === e ? void 0 : e.viewport;
            if (!s || !o) return;
            if (!t && i && s.contains(i)) return;
            const a = this.getSlide(), r = a && a.state === lt.Ready ? a.el : null;
            if (!r || r.contains(i) || s === i) return;
            t && t.cancelable && t.preventDefault(), this.ignoreFocusChange = !0;
            const l = Array.from(s.querySelectorAll(nt));
            let c = [], h = null;
            for (let t of l) {
                const e = !t.offsetParent || !!t.closest('[aria-hidden="true"]'), i = r && r.contains(t), n = !o.contains(t);
                if (t === s || (i || n) && !e) {
                    c.push(t);
                    const e = t.dataset.origTabindex;
                    void 0 !== e && e && (t.tabIndex = parseFloat(e)), t.removeAttribute("data-orig-tabindex"), 
                    !t.hasAttribute("autoFocus") && h || (h = t);
                } else {
                    const e = void 0 === t.dataset.origTabindex ? t.getAttribute("tabindex") || "" : t.dataset.origTabindex;
                    e && (t.dataset.origTabindex = e), t.tabIndex = -1;
                }
            }
            let d = null;
            t ? (!n || c.indexOf(n) < 0) && (d = h || s, c.length && (i === xe ? d = c[0] : this.lastFocus !== s && i !== we || (d = c[c.length - 1]))) : d = a && "image" === a.type ? s : h || s, 
            d && st(d), this.lastFocus = document.activeElement, this.ignoreFocusChange = !1;
        }
        next() {
            const t = this.carousel;
            t && t.pages.length > 1 && t.slideNext();
        }
        prev() {
            const t = this.carousel;
            t && t.pages.length > 1 && t.slidePrev();
        }
        jumpTo(...t) {
            this.carousel && this.carousel.slideTo(...t);
        }
        isTopmost() {
            var t;
            return (null === (t = Oe.getInstance()) || void 0 === t ? void 0 : t.id) == this.id;
        }
        animate(t = null, e = "", i) {
            if (!t || !e) return void (i && i());
            this.stop(t);
            const n = s => {
                s.target === t && t.dataset.animationName && (t.removeEventListener("animationend", n), 
                delete t.dataset.animationName, i && i(), S(t, e));
            };
            t.dataset.animationName = e, t.addEventListener("animationend", n), P(t, e);
        }
        stop(t) {
            t && t.dispatchEvent(new CustomEvent("animationend", {
                bubbles: !1,
                cancelable: !0,
                currentTarget: t
            }));
        }
        setContent(t, e = "", i = !0) {
            if (this.isClosing()) return;
            const s = t.el;
            if (!s) return;
            let o = null;
            if (E(e) ? o = e : (o = n(e + ""), E(o) || (o = document.createElement("div"), o.innerHTML = e + "")), 
            [ "img", "picture", "iframe", "video", "audio" ].includes(o.nodeName.toLowerCase())) {
                const t = document.createElement("div");
                t.appendChild(o), o = t;
            }
            E(o) && t.filter && !t.error && (o = o.querySelector(t.filter)), o && E(o) ? (P(o, "fancybox__content"), 
            t.id && o.setAttribute("id", t.id), s.classList.add(`has-${t.error ? "error" : t.type || "unknown"}`), 
            s.prepend(o), "none" === o.style.display && (o.style.display = ""), "none" === getComputedStyle(o).getPropertyValue("display") && (o.style.display = t.display || this.option("defaultDisplay") || "flex"), 
            t.contentEl = o, i && this.revealContent(t), this.manageCloseBtn(t), this.manageCaption(t)) : this.setError(t, "{{ELEMENT_NOT_FOUND}}");
        }
        revealContent(t, e) {
            const i = t.el, n = t.contentEl;
            i && n && (this.emit("reveal", t), this.hideLoading(t), t.state = lt.Opening, (e = this.isOpeningSlide(t) ? void 0 === e ? this.optionFor(t, "showClass") : e : "f-fadeIn") ? this.animate(n, e, (() => {
                this.done(t);
            })) : this.done(t));
        }
        done(t) {
            this.isClosing() || (t.state = lt.Ready, this.emit("done", t), P(t.el, "is-done"), 
            this.isCurrentSlide(t) && this.option("autoFocus") && queueMicrotask((() => {
                var e;
                null === (e = t.panzoom) || void 0 === e || e.updateControls(), this.option("autoFocus") && this.focus();
            })), this.isOpeningSlide(t) && (S(this.container, he), !this.isCompact && this.option("idle") && this.setIdle()));
        }
        isCurrentSlide(t) {
            const e = this.getSlide();
            return !(!t || !e) && e.index === t.index;
        }
        isOpeningSlide(t) {
            var e, i;
            return null === (null === (e = this.carousel) || void 0 === e ? void 0 : e.prevPage) && t && t.index === (null === (i = this.getSlide()) || void 0 === i ? void 0 : i.index);
        }
        showLoading(t) {
            t.state = lt.Loading;
            const e = t.el;
            if (!e) return;
            P(e, ce), this.emit("loading", t), t.spinnerEl || setTimeout((() => {
                if (!this.isClosing() && !t.spinnerEl && t.state === lt.Loading) {
                    let i = n(x);
                    P(i, "fancybox-spinner"), t.spinnerEl = i, e.prepend(i), this.animate(i, "f-fadeIn");
                }
            }), 250);
        }
        hideLoading(t) {
            const e = t.el;
            if (!e) return;
            const i = t.spinnerEl;
            this.isClosing() ? null == i || i.remove() : (S(e, ce), i && this.animate(i, "f-fadeOut", (() => {
                i.remove();
            })), t.state === lt.Loading && (this.emit("loaded", t), t.state = lt.Ready));
        }
        setError(t, e) {
            if (this.isClosing()) return;
            const i = new Event("error", {
                bubbles: !0,
                cancelable: !0
            });
            if (this.emit("error", i, t), i.defaultPrevented) return;
            t.error = e, this.hideLoading(t), this.clearContent(t);
            const n = document.createElement("div");
            n.classList.add("fancybox-error"), n.innerHTML = this.localize(e || "<p>{{ERROR}}</p>"), 
            this.setContent(t, n);
        }
        clearContent(t) {
            if (void 0 === t.state) return;
            this.emit("clearContent", t), t.contentEl && (t.contentEl.remove(), t.contentEl = void 0);
            const e = t.el;
            e && (S(e, "has-error"), S(e, "has-unknown"), S(e, `has-${t.type || "unknown"}`)), 
            t.closeBtnEl && t.closeBtnEl.remove(), t.closeBtnEl = void 0, t.captionEl && t.captionEl.remove(), 
            t.captionEl = void 0, t.spinnerEl && t.spinnerEl.remove(), t.spinnerEl = void 0;
        }
        getSlide() {
            var t;
            const e = this.carousel;
            return (null === (t = null == e ? void 0 : e.pages[null == e ? void 0 : e.page]) || void 0 === t ? void 0 : t.slides[0]) || void 0;
        }
        close(t, e) {
            if (this.isClosing()) return;
            const i = new Event("shouldClose", {
                bubbles: !0,
                cancelable: !0
            });
            if (this.emit("shouldClose", i, t), i.defaultPrevented) return;
            t && t.cancelable && (t.preventDefault(), t.stopPropagation());
            const n = () => {
                this.proceedClose(t, e);
            };
            this.startedFs && ye && ye.isFullscreen() ? Promise.resolve(ye.exit()).then((() => n())) : n();
        }
        clearIdle() {
            this.idleTimer && clearTimeout(this.idleTimer), this.idleTimer = null;
        }
        setIdle(t = !1) {
            const e = () => {
                this.clearIdle(), this.idle = !0, P(this.container, "is-idle"), this.emit("setIdle");
            };
            if (this.clearIdle(), !this.isClosing()) if (t) e(); else {
                const t = this.option("idle");
                t && (this.idleTimer = setTimeout(e, t));
            }
        }
        endIdle() {
            this.clearIdle(), this.idle && !this.isClosing() && (this.idle = !1, S(this.container, "is-idle"), 
            this.emit("endIdle"));
        }
        resetIdle() {
            this.endIdle(), this.setIdle();
        }
        toggleIdle() {
            this.idle ? this.endIdle() : this.setIdle(!0);
        }
        toggleFullscreen() {
            ye && (ye.isFullscreen() ? ye.exit() : ye.request().then((() => {
                this.startedFs = !0;
            })));
        }
        isClosing() {
            return [ rt.Closing, rt.CustomClosing, rt.Destroy ].includes(this.state);
        }
        proceedClose(t, e) {
            var i, n;
            this.state = rt.Closing, this.clearIdle(), this.detachEvents();
            const s = this.container, o = this.carousel, a = this.getSlide(), r = a && this.option("placeFocusBack") ? a.triggerEl || this.option("triggerEl") : null;
            if (r && (tt(r) ? st(r) : r.focus()), s && (S(s, he), P(s, "is-closing"), s.setAttribute(oe, "true"), 
            this.option("animated") && P(s, re), s.style.pointerEvents = "none"), o) {
                o.clearTransitions(), null === (i = o.panzoom) || void 0 === i || i.destroy(), null === (n = o.plugins.Navigation) || void 0 === n || n.detach();
                for (const t of o.slides) {
                    t.state = lt.Closing, this.hideLoading(t);
                    const e = t.contentEl;
                    e && this.stop(e);
                    const i = null == t ? void 0 : t.panzoom;
                    i && (i.stop(), i.detachEvents(), i.detachObserver()), this.isCurrentSlide(t) || o.emit("removeSlide", t);
                }
            }
            Pe = window.scrollX, Ce = window.scrollY, window.addEventListener("scroll", this.onScroll), 
            this.emit("close", t), this.state !== rt.CustomClosing ? (void 0 === e && a && (e = this.optionFor(a, "hideClass")), 
            e && a ? (this.animate(a.contentEl, e, (() => {
                o && o.emit("removeSlide", a);
            })), setTimeout((() => {
                this.destroy();
            }), 500)) : this.destroy()) : setTimeout((() => {
                this.destroy();
            }), 500);
        }
        destroy() {
            var t;
            if (this.state === rt.Destroy) return;
            window.removeEventListener("scroll", this.onScroll), this.state = rt.Destroy, null === (t = this.carousel) || void 0 === t || t.destroy();
            const e = this.container;
            e && e.remove(), Te.delete(this.id);
            const i = Oe.getInstance();
            i ? i.focus() : (we && (we.remove(), we = null), xe && (xe.remove(), xe = null), 
            S(document.documentElement, ee), (() => {
                if (!et) return;
                const t = document, e = t.body;
                e.classList.remove(ie), e.style.setProperty(se, ""), t.documentElement.style.setProperty(ne, "");
            })(), this.emit("destroy"));
        }
        static bind(t, e, i) {
            if (!et) return;
            let n, s = "", o = {};
            if (void 0 === t ? n = document.body : ve(t) ? (n = document.body, s = t, "object" == typeof e && (o = e || {})) : (n = t, 
            ve(e) && (s = e), "object" == typeof i && (o = i || {})), !n || !E(n)) return;
            s = s || "[data-fancybox]";
            const a = Oe.openers.get(n) || new Map;
            a.set(s, o), Oe.openers.set(n, a), 1 === a.size && n.addEventListener("click", Oe.fromEvent);
        }
        static unbind(t, e) {
            let i, n = "";
            if (ve(t) ? (i = document.body, n = t) : (i = t, ve(e) && (n = e)), !i) return;
            const s = Oe.openers.get(i);
            s && n && s.delete(n), n && s || (Oe.openers.delete(i), i.removeEventListener("click", Oe.fromEvent));
        }
        static destroy() {
            let t;
            for (;t = Oe.getInstance(); ) t.destroy();
            for (const t of Oe.openers.keys()) t.removeEventListener("click", Oe.fromEvent);
            Oe.openers = new Map;
        }
        static fromEvent(t) {
            if (t.defaultPrevented) return;
            if (t.button && 0 !== t.button) return;
            if (t.ctrlKey || t.metaKey || t.shiftKey) return;
            let e = t.composedPath()[0];
            const i = e.closest("[data-fancybox-trigger]");
            if (i) {
                const t = i.dataset.fancyboxTrigger || "", n = document.querySelectorAll(`[data-fancybox="${t}"]`), s = parseInt(i.dataset.fancyboxIndex || "", 10) || 0;
                e = n[s] || e;
            }
            if (!(e && e instanceof Element)) return;
            let n, s, o, a;
            if ([ ...Oe.openers ].reverse().find((([t, i]) => !(!t.contains(e) || ![ ...i ].reverse().find((([i, r]) => {
                let l = e.closest(i);
                return !!l && (n = t, s = i, o = l, a = r, !0);
            }))))), !n || !s || !o) return;
            a = a || {}, t.preventDefault(), e = o;
            let r = [], l = u({}, at, a);
            l.event = t, l.triggerEl = e, l.delegate = i;
            const c = l.groupAll, h = l.groupAttr, d = h && e ? e.getAttribute(`${h}`) : "";
            if ((!e || d || c) && (r = [].slice.call(n.querySelectorAll(s))), e && !c && (r = d ? r.filter((t => t.getAttribute(`${h}`) === d)) : [ e ]), 
            !r.length) return;
            const p = Oe.getInstance();
            return p && p.options.triggerEl && r.indexOf(p.options.triggerEl) > -1 ? void 0 : (e && (l.startIndex = r.indexOf(e)), 
            Oe.fromNodes(r, l));
        }
        static fromSelector(t, e, i) {
            let n = null, s = "", o = {};
            if (ve(t) ? (n = document.body, s = t, "object" == typeof e && (o = e || {})) : t instanceof HTMLElement && ve(e) && (n = t, 
            s = e, "object" == typeof i && (o = i || {})), !n || !s) return !1;
            const a = Oe.openers.get(n);
            return !!a && (o = u({}, a.get(s) || {}, o), !!o && Oe.fromNodes(Array.from(n.querySelectorAll(s)), o));
        }
        static fromNodes(t, e) {
            e = u({}, at, e || {});
            const i = [];
            for (const n of t) {
                const t = n.dataset || {}, s = t[me] || n.getAttribute(ge) || n.getAttribute("currentSrc") || n.getAttribute(me) || void 0;
                let o;
                const a = e.delegate;
                let r;
                a && i.length === e.startIndex && (o = a instanceof HTMLImageElement ? a : a.querySelector("img:not([aria-hidden])")), 
                o || (o = n instanceof HTMLImageElement ? n : n.querySelector("img:not([aria-hidden])")), 
                o && (r = o.currentSrc || o[me] || void 0, !r && o.dataset && (r = o.dataset.lazySrc || o.dataset[me] || void 0));
                const l = {
                    src: s,
                    triggerEl: n,
                    thumbEl: o,
                    thumbElSrc: r,
                    thumbSrc: r
                };
                for (const e in t) {
                    let i = t[e] + "";
                    i = "false" !== i && ("true" === i || i), l[e] = i;
                }
                i.push(l);
            }
            return new Oe(i, e);
        }
        static getInstance(t) {
            if (t) return Te.get(t);
            return Array.from(Te.values()).reverse().find((t => !t.isClosing() && t)) || null;
        }
        static getSlide() {
            var t;
            return (null === (t = Oe.getInstance()) || void 0 === t ? void 0 : t.getSlide()) || null;
        }
        static show(t = [], e = {}) {
            return new Oe(t, e);
        }
        static next() {
            const t = Oe.getInstance();
            t && t.next();
        }
        static prev() {
            const t = Oe.getInstance();
            t && t.prev();
        }
        static close(t = !0, ...e) {
            if (t) for (const t of Te.values()) t.close(...e); else {
                const t = Oe.getInstance();
                t && t.close(...e);
            }
        }
    }
    Object.defineProperty(Oe, "version", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "5.0.36"
    }), Object.defineProperty(Oe, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: at
    }), Object.defineProperty(Oe, "Plugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: te
    }), Object.defineProperty(Oe, "openers", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Map
    });
    Oe.bind('[data-fancybox="gallery"]', {});
    Oe.bind('[data-fancybox="video-gallery"]', {
        Youtube: {
            controls: 1,
            rel: 0,
            autoplay: 1
        },
        iframe: {
            css: {
                width: "60vw",
                height: "60vh",
                maxWidth: "1200px",
                maxHeight: "675px"
            }
        }
    });
    class DynamicAdapt {
        constructor(type) {
            this.type = type;
        }
        init() {
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = [ ...document.querySelectorAll("[data-da]") ];
            this.nodes.forEach((node => {
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }));
            this.arraySort(this.оbjects);
            this.mediaQueries = this.оbjects.map((({breakpoint}) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)).filter(((item, index, self) => self.indexOf(item) === index));
            this.mediaQueries.forEach((media => {
                const mediaSplit = media.split(",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = this.оbjects.filter((({breakpoint}) => breakpoint === mediaBreakpoint));
                matchMedia.addEventListener("change", (() => {
                    this.mediaHandler(matchMedia, оbjectsFilter);
                }));
                this.mediaHandler(matchMedia, оbjectsFilter);
            }));
        }
        mediaHandler(matchMedia, оbjects) {
            if (matchMedia.matches) оbjects.forEach((оbject => {
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            })); else оbjects.forEach((({parent, element, index}) => {
                if (element.classList.contains(this.daClassname)) this.moveBack(parent, element, index);
            }));
        }
        moveTo(place, element, destination) {
            element.classList.add(this.daClassname);
            if ("last" === place || place >= destination.children.length) {
                destination.append(element);
                return;
            }
            if ("first" === place) {
                destination.prepend(element);
                return;
            }
            destination.children[place].before(element);
        }
        moveBack(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (void 0 !== parent.children[index]) parent.children[index].before(element); else parent.append(element);
        }
        indexInParent(parent, element) {
            return [ ...parent.children ].indexOf(element);
        }
        arraySort(arr) {
            if ("min" === this.type) arr.sort(((a, b) => {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if ("first" === a.place || "last" === b.place) return -1;
                    if ("last" === a.place || "first" === b.place) return 1;
                    return 0;
                }
                return a.breakpoint - b.breakpoint;
            })); else {
                arr.sort(((a, b) => {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if ("first" === a.place || "last" === b.place) return 1;
                        if ("last" === a.place || "first" === b.place) return -1;
                        return 0;
                    }
                    return b.breakpoint - a.breakpoint;
                }));
                return;
            }
        }
    }
    const da = new DynamicAdapt("max");
    da.init();
    document.addEventListener("click", (function(e) {
        const targetElement = e.target;
        if (!targetElement.closest(".catalog-header") && !targetElement.closest(".header__catalog") && !targetElement.closest(".button-menu-phone")) {
            const catalogList = document.querySelector(".catalog-header");
            if (catalogList) catalogList.classList.remove("catalog-menu-open");
            document.documentElement.classList.remove("body-catalog-open");
        }
    }));
    document.addEventListener("click", documentActions);
    const menuBlocks = document.querySelectorAll(".sub-menu-catalog__block");
    if (menuBlocks.length) menuBlocks.forEach((menuBlock => {
        const menuBlockItems = menuBlock.querySelectorAll(".sub-menu-catalog__category").length;
        menuBlock.classList.add(`sub-menu-catalog__block_${menuBlockItems}`);
    }));
    function documentActions(e) {
        const targetElement = e.target;
        const catalogList = document.querySelector(".catalog-header");
        let catalogHoverTimer;
        const isCursorOverCatalog = () => catalogList.matches(":hover") || document.querySelector(".header__catalog").matches(":hover") || document.querySelector(".catalog-header__menu").matches(":hover") || document.querySelector(".catalog-header__sub-menu").matches(":hover");
        const handleCatalogHover = show => {
            clearTimeout(catalogHoverTimer);
            if (show) {
                document.documentElement.classList.add("lock");
                catalogList.classList.add("catalog-menu-open");
                document.documentElement.classList.add("body-catalog-open");
                document.documentElement.classList.add("menu-open");
            } else catalogHoverTimer = setTimeout((() => {
                if (!isCursorOverCatalog()) closeCatalog();
            }), 300);
        };
        const closeCatalog = () => {
            catalogList.classList.remove("catalog-menu-open");
            document.documentElement.classList.remove("body-catalog-open");
            document.documentElement.classList.remove("menu-open");
            document.documentElement.classList.remove("lock");
            document.documentElement.classList.remove("sub-menu-open");
            document.querySelectorAll("._sub-menu-active").forEach((activeLink => {
                activeLink.classList.remove("_sub-menu-active");
            }));
            document.querySelectorAll("._sub-menu-open").forEach((activeBlock => {
                activeBlock.classList.remove("_sub-menu-open");
            }));
        };
        if (targetElement.closest("[data-parent]")) {
            const subMenuId = targetElement.dataset.parent ? targetElement.dataset.parent : null;
            const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`);
            if (subMenu) {
                document.querySelectorAll("._sub-menu-active").forEach((activeLink => {
                    activeLink.classList.remove("_sub-menu-active");
                }));
                document.querySelectorAll("._sub-menu-open").forEach((activeBlock => {
                    activeBlock.classList.remove("_sub-menu-open");
                }));
                document.documentElement.classList.remove("sub-menu-open");
                document.documentElement.classList.add("sub-menu-open");
                targetElement.classList.add("_sub-menu-active");
                subMenu.classList.add("_sub-menu-open");
            } else console.log("Ой ой, нет такого подменю :(");
            e.preventDefault();
        }
        if (targetElement.closest(".menu-catalog__back-main")) {
            const isForceClose = targetElement.closest(".menu-catalog__back-main.close-force");
            if (isForceClose) closeCatalog(); else {
                const isSubMenuOpen = document.documentElement.classList.contains("sub-menu-open");
                if (window.matchMedia("(max-width: 991.98px)").matches) if (isSubMenuOpen) {
                    document.documentElement.classList.remove("sub-menu-open");
                    document.querySelectorAll("._sub-menu-active").forEach((activeLink => {
                        activeLink.classList.remove("_sub-menu-active");
                    }));
                    document.querySelectorAll("._sub-menu-open").forEach((activeBlock => {
                        activeBlock.classList.remove("_sub-menu-open");
                    }));
                } else closeCatalog(); else closeCatalog();
            }
            e.preventDefault();
        }
        const catalogButton = document.querySelector(".header__catalog");
        if (catalogButton && catalogList) {
            if (window.matchMedia("(min-width: 992px)").matches) {
                catalogButton.addEventListener("mouseenter", (() => handleCatalogHover(true)));
                catalogButton.addEventListener("mouseleave", (() => handleCatalogHover(false)));
                catalogList.addEventListener("mouseenter", (() => clearTimeout(catalogHoverTimer)));
                catalogList.addEventListener("mouseleave", (() => handleCatalogHover(false)));
                const menu = document.querySelector(".catalog-header__menu");
                const subMenu = document.querySelector(".catalog-header__sub-menu");
                if (menu) menu.addEventListener("mouseleave", (() => handleCatalogHover(false)));
                if (subMenu) subMenu.addEventListener("mouseleave", (() => handleCatalogHover(false)));
            }
            if (targetElement.closest(".header__catalog")) {
                if (window.matchMedia("(max-width: 991px)").matches) {
                    document.documentElement.classList.toggle("lock");
                    if (catalogList.classList.contains("catalog-menu-open")) closeCatalog(); else {
                        catalogList.classList.add("catalog-menu-open");
                        document.documentElement.classList.add("body-catalog-open");
                        document.documentElement.classList.add("menu-open");
                    }
                }
                e.preventDefault();
            }
        }
        if (targetElement.closest(".button-menu-phone")) {
            document.documentElement.classList.toggle("body-catalog-open");
            document.documentElement.classList.toggle("menu-open");
            document.documentElement.classList.toggle("lock");
            if (catalogList) catalogList.classList.toggle("catalog-menu-open");
            e.preventDefault();
        }
        if (targetElement.closest(".menu-phone__button") && targetElement.classList.contains("menu-phone__button")) {
            const buttons = document.querySelectorAll(".menu-phone__button");
            buttons.forEach((button => {
                button.classList.remove("active-menu-phone");
            }));
            targetElement.classList.add("active-menu-phone");
            e.preventDefault();
        }
        document.addEventListener("click", (e => {
            if (window.matchMedia("(max-width: 991px)").matches && !e.target.closest(".header__catalog") && !e.target.closest(".catalog-header") && !e.target.closest(".button-menu-phone")) if (catalogList.classList.contains("catalog-menu-open")) closeCatalog();
        }));
    }
    document.addEventListener("DOMContentLoaded", (() => {
        const catalogButton = document.querySelector(".header__catalog");
        const catalogList = document.querySelector(".catalog-header");
        if (catalogButton && catalogList) if (window.matchMedia("(min-width: 992px)").matches) {
            let catalogHoverTimer;
            catalogButton.addEventListener("mouseenter", (() => {
                document.documentElement.classList.add("lock");
                catalogList.classList.add("catalog-menu-open");
                document.documentElement.classList.add("body-catalog-open");
                document.documentElement.classList.add("menu-open");
            }));
            catalogButton.addEventListener("mouseleave", (() => {
                catalogHoverTimer = setTimeout((() => {
                    if (!catalogList.matches(":hover") && !document.querySelector(".catalog-header__menu").matches(":hover") && !document.querySelector(".catalog-header__sub-menu").matches(":hover")) {
                        catalogList.classList.remove("catalog-menu-open");
                        document.documentElement.classList.remove("body-catalog-open");
                        document.documentElement.classList.remove("menu-open");
                        document.documentElement.classList.remove("lock");
                    }
                }), 300);
            }));
            catalogList.addEventListener("mouseenter", (() => {
                clearTimeout(catalogHoverTimer);
            }));
            catalogList.addEventListener("mouseleave", (() => {
                catalogHoverTimer = setTimeout((() => {
                    if (!catalogButton.matches(":hover")) {
                        catalogList.classList.remove("catalog-menu-open");
                        document.documentElement.classList.remove("body-catalog-open");
                        document.documentElement.classList.remove("menu-open");
                        document.documentElement.classList.remove("lock");
                    }
                }), 300);
            }));
            const menu = document.querySelector(".catalog-header__menu");
            const subMenu = document.querySelector(".catalog-header__sub-menu");
            if (menu) menu.addEventListener("mouseleave", (() => {
                catalogHoverTimer = setTimeout((() => {
                    if (!catalogButton.matches(":hover") && !catalogList.matches(":hover") && !subMenu.matches(":hover")) {
                        catalogList.classList.remove("catalog-menu-open");
                        document.documentElement.classList.remove("body-catalog-open");
                        document.documentElement.classList.remove("menu-open");
                        document.documentElement.classList.remove("lock");
                    }
                }), 300);
            }));
            if (subMenu) subMenu.addEventListener("mouseleave", (() => {
                catalogHoverTimer = setTimeout((() => {
                    if (!catalogButton.matches(":hover") && !catalogList.matches(":hover") && !menu.matches(":hover")) {
                        catalogList.classList.remove("catalog-menu-open");
                        document.documentElement.classList.remove("body-catalog-open");
                        document.documentElement.classList.remove("menu-open");
                        document.documentElement.classList.remove("lock");
                    }
                }), 300);
            }));
        }
    }));
    document.addEventListener("DOMContentLoaded", (function() {
        const catalogItems = document.querySelectorAll(".catalog-header__item button[data-parent]");
        document.querySelector(".catalog-header__sub-menu");
        function isScreenLarge() {
            return window.innerWidth > 991.98;
        }
        catalogItems.forEach((item => {
            const subMenuId = item.dataset.parent;
            const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`);
            if (subMenu) {
                item.addEventListener("mouseenter", (() => {
                    if (!isScreenLarge()) return;
                    document.querySelectorAll(".catalog-header__sub-list-body").forEach((menu => {
                        menu.hidden = true;
                    }));
                    subMenu.hidden = false;
                    item.querySelector(".catalog-header__item-arrow").style.opacity = "1";
                }));
                item.addEventListener("mouseleave", (() => {
                    if (!isScreenLarge()) return;
                    setTimeout((() => {
                        if (!subMenu.matches(":hover")) {
                            subMenu.hidden = true;
                            item.querySelector(".catalog-header__item-arrow").style.opacity = "0";
                        }
                    }), 100);
                }));
            }
            subMenu.addEventListener("mouseenter", (() => {
                if (!isScreenLarge()) return;
                subMenu.hidden = false;
                item.querySelector(".catalog-header__item-arrow").style.opacity = "1";
            }));
            subMenu.addEventListener("mouseleave", (() => {
                if (!isScreenLarge()) return;
                subMenu.hidden = true;
                item.querySelector(".catalog-header__item-arrow").style.opacity = "0";
            }));
        }));
        document.addEventListener("mouseover", (e => {
            if (!isScreenLarge()) return;
            if (!e.target.closest(".catalog-header")) {
                document.querySelectorAll(".catalog-header__sub-list-body").forEach((menu => {
                    menu.hidden = true;
                }));
                document.querySelectorAll(".catalog-header__item-arrow").forEach((arrow => {
                    arrow.style.opacity = "0";
                }));
            }
        }));
    }));
    window["FLS"] = true;
    isWebp();
    addLoadedClass();
    menuInit();
    spollers();
    tabs();
    formFieldsInit({
        viewPass: true,
        autoHeight: false
    });
    formQuantity();
    headerScroll();
    digitsCounter();
})();