'use strict';

/**!
 * dial-up
 * background.js
 *
 * Ken Frederick
 * ken.frederick@gmx.de
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 */


class Background {
    // ------------------------------------------------------------------------
    //
    // Constructor
    //
    // ------------------------------------------------------------------------
    constructor() {
        this.isConnected = true;
        this.tabId = 0;

        this.initEvents();
    }



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    _tabHandler(callback = function(){}) {
        chrome.tabs.query({
            currentWindow: true,
            title: 'Boop beep bop beep boop bop beep boop ppprrrrrrrttttttt prrt eet prtt eeeeeeeeeeeeeee prrrrrrrrrrrrrrrtttt grrrr wee ooo wee ooo wee'
        }, (tabs) => {
            if (tabs.length != 0) {
                this.tabId = tabs[0].id;
                callback(tabs);
            }
        });
    }



    // ------------------------------------------------------------------------
    //
    // Events
    //
    // ------------------------------------------------------------------------
    initEvents() {
        /*
            if you uncomment this, add the following to the manifest "permissions":
            "webRequest",
            "webRequestBlocking",
            "<all_urls>"
         */
        // chrome.webRequest.onBeforeRequest.addListener((details) => {
        //     // prevents user from surfing web... overkill :/
        //     if (!this.isConnected) {
        //         return {
        //             cancel: true
        //         };
        //     }
        // }, {
        //     urls: ['<all_urls>']
        // }, ['blocking']);


        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            this.isConnected = request.connected;

            this._tabHandler((tabs) => {
                // once connected close newtab
                if (this.isConnected) {
                    chrome.tabs.remove(tabs[0].id);
                }
            });
        });


        chrome.tabs.onRemoved.addListener((tabId) => {
            // if user closes any tab everything is back to normal
            this.isConnected = true;
        });
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            // prevents user from changing URL... annoying :)
            if (tabId == this.tabId && !this.isConnected) {
                if (tab.url !== 'chrome://newtab/') {
                    chrome.tabs.update(tabId, {
                        url: 'chrome://newtab/'
                    });
                }
            }
        });
        chrome.tabs.onActivated.addListener((activeInfo) => {
            // prevents user from changing to a different tab... annoying :)
            this._tabHandler((tabs) => {
                if (tabs.length != 0 && !this.isConnected) {
                    chrome.tabs.update(tabs[0].id, {
                        selected: true
                    });
                }
            });
        });
    }

}

new Background();
