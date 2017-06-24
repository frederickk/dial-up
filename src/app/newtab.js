'use strict';

/**!
 * dial-up
 * newtab.js
 *
 * Ken Frederick
 * ken.frederick@gmx.de
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 */

class DialUp {
    // ------------------------------------------------------------------------
    //
    // Constructor
    //
    // ------------------------------------------------------------------------
    constructor() {
        console.log('Boop beep bop beep boop bop beep boop ppprrrrrrrrrrrrrrttttttt prrt eet prtt eeeeeeeeeeeeeee prrrrrrrrrrrrrrrrtttt grrrr wee ooo wee ooo wee ffffffffffffffffffffffffffffff fffffffffffffffff ssssshhhhhhhhhh');

        this.boopbeep = document.getElementById('boopbeep');
        this.welcome = document.getElementById('welcome');

        this.status = document.getElementById('status');

        this.dialing = {
            text  : document.getElementById('dialing'),
            image : document.getElementById('aol-man')
        };
        this.connecting = {
            text  : document.getElementById('connecting'),
            image : document.getElementById('aol-man-running')
        };
        this.connected = {
            text  : document.getElementById('connected'),
            image : document.getElementById('aol-friends')
        };

        this._disconnected();

        this.initEvents();
    }



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    _hide(element) {
        // element.classList.add('hidden');
        if (!element.classList.contains('invisible')) {
            element.classList.add('invisible');
        }
    }

    _unhide(element) {
        // element.classList.remove('hidden');
        if (element.classList.contains('invisible')) {
            element.classList.remove('invisible');
        }
    }

    _disconnected() {
        chrome.runtime.sendMessage({
            connected: false
        });
    }

    _connected() {
        chrome.runtime.sendMessage({
            connected: true
        });
    }



    // ------------------------------------------------------------------------
    //
    // Events
    //
    // ------------------------------------------------------------------------
    initEvents() {
        this.boopbeep.addEventListener('timeupdate', () => {
            const pct = (this.boopbeep.currentTime / this.boopbeep.duration) * 100;
            // console.log(`${pct}%`);

            if (pct > 13 && pct < 92) {
                this._hide(this.dialing.text);
                this._unhide(this.connecting.text);
                this._unhide(this.connecting.image);
            }
            else if (pct > 92) {
                this._hide(this.connecting.text);
                this._unhide(this.connected.text);
                this._unhide(this.connected.image);
            }

            if (pct >= 100) {
                this.welcome.play();
                document.body.removeChild(this.boopbeep);
            }
        });

        this.welcome.addEventListener('timeupdate', () => {
            const pct = (this.welcome.currentTime / this.welcome.duration) * 100;
            // console.log(`${pct}%`);

            if (pct >= 100) {
                this.status.classList.add('invisible');
                this._connected();
                document.body.removeChild(this.welcome);
            }
        });
    }

}

new DialUp();
