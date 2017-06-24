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
        this.isConnected = false;

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
            callback(tabs);
        });
    }



    // ------------------------------------------------------------------------
    //
    // Events
    //
    // ------------------------------------------------------------------------
    initEvents() {
        // chrome.webRequest.onBeforeRequest.addListener((details) => {
        //     return {
        //         cancel: true
        //     };
        // }, {
        //     urls: ['<all_urls>']
        // }, ['blocking']);

        chrome.tabs.onActivated.addListener((activeInfo) => {
            this._tabHandler((tabs) => {
                if (tabs.length != 0 && !this.isConnected) {
                    chrome.tabs.update(tabs[0].id, {
                        selected: true
                    });
                }
            });
        });

        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            this.isConnected = request.connected;

            this._tabHandler((tabs) => {
                if (this.isConnected) {
                    chrome.tabs.remove(tabs[0].id);
                }
            });
        });
    }

}

new Background();
