
# DIM

Destiny Item Manager


## Contributors:

* [kyleshay](https://github.com/kyleshay)
* [chrisfried](https://github.com/chrisfried)
* [yunaforever009](https://github.com/yunaforever009)
* [SunburnedGoose](https://github.com/SunburnedGoose)
* harro
* [polyesterhat](https://github.com/polyesterhat)



## Developer Install

After cloning the repo:

    git clone git@github.com:polyesterhat/DIM.git DIM
    cd DIM

Install the dependancies with these commands:

    npm install
    bower install

You may need to use `sudo npm install`. If you don't have npm, Google search "install node.js"


**Run The App**

    grunt

This will begin a watch task which will rebuild the app into the `DIM/build` folder each time a change is saved and reload the extension within Chrome.

If you don't want to start a livereload session or a file watch, just use `grunt dist` which will simply build the extension into the build foler.


## Install the Extension in Chrome

1. In chrome go to the [extensions page](chrome://extensions/)
2. Make sure 'Developer Mode' is checked at the top of the page.
3. Click 'Load unpacked extension...' button.
4. Select the DIM/build folder

You do need to select the `DIM/build` folder because `manifest.json` is in there. Also, the scripts get copied into the build folder. This way, you just publish the build folder to the chrome webstore. It's ok to have the unpacked extension running parallel with the official chrome webstore extension.


####NOTE ABOUT LIVERELOAD

This chrome extension has two chrome scripts in build/chrome which open the actual window.html page. On event binds to a websocket on the default livereload port `35729`. This socket isn't persistent, so you must run `grunt` before you reload the unpacked extension in chrome.

1. Install or Reload the Chrome extension
2. Run `grunt`
3. Begin making changes in the `src/` directory

If you do those steps, the extension will reload automatically for you!! Having the [Chrome Apps and Extensions Developer Tool](https://chrome.google.com/webstore/detail/chrome-apps-extensions-de/ohmmkhmmmpcnpikjeljgnaoabkaalbgc?hl=en) it's extremely easy to reload the extension for that initial step 1.


## Discussion

For bugs, and feature/design requests use the subreddit [/r/DestinyItemManager](http://www.reddit.com/r/DestinyItemManager/)

Here's the [Original Reddit post](http://www.reddit.com/r/DestinyTheGame/comments/2xvwf8/misc_dim_destiny_item_manager_loadouts/)



