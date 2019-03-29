# Football notifications

## Summary
A demo based on the use case: I want to be able to see match notifications; with the aim that all users, with all browsers, can see or hear at least the core functionality in every context..

![Overview](../master/docs/match.jpg)

## 1. Usage

Fork and/or clone it
```bash
git clone https://github.com/Arash217/football-team-tracker-BT
```

Install dependencies
```bash
npm install
```

Run the server (will use port 3200)
```bash
npm start
```

## 2. Wireflow
Sketches of my initial idea:

**Search**
<p align="center">
  <img width="500px" src="https://github.com/Arash217/football-team-tracker-BT/blob/master/docs/1.png">
</p>

**Dashboard**
<p align="center">
  <img width="500px" src="https://github.com/Arash217/football-team-tracker-BT/blob/master/docs/2.png">
</p>

**Notifications**
<p align="center">
  <img width="500px" src="https://github.com/Arash217/football-team-tracker-BT/blob/master/docs/3.png">
</p>

## 3. Core functionality
The core functionality of the app is to see/receive notifications when your favorite team scores, as you can see in my notifications sketch.

I initially, had the idea of showing also other match stats, but I didn't had time to realise it, so I scraped it.

## 4. Progressive enhancement

### 4.1 Functional and reliable
Without CSS and JavaScript:

<p align="center">
  <img height="500px" src="https://github.com/Arash217/football-team-tracker-BT/blob/master/docs/reliable.jpg">
</p>

It doesn't look pretty but it still works. The scores and notifications are updated, because the page constantly refreshes every second which causes the server to send a new page.

### 4.2 Usable
With CSS but no JavaScript:

<p align="center">
  <img width="500px" src="https://github.com/Arash217/football-team-tracker-BT/blob/master/docs/usable.jpg">
</p>

It looks a lot better now! Though, the page still refreshes every second to update the scores and notifications.

### 4.3 Pleasurable
With JavaScript:

<p align="center">
  <img width="500px" src="https://github.com/Arash217/football-team-tracker-BT/blob/master/docs/pleasurable.jpg">
</p>

Now we're talking! We get push notifications when a team scores. Also the page isn't constantly refreshing anymore to update the scores and notifications, instead it's updated with websockets. The scores and time are updated by the server, meaning that when a change happens in the server the data is pushed to the browser with websockets. For browsers that don't support websockets, the page is being updated by polling the server. Neat, huh? 

## 5. Features

### 5.1 Images

##### Context
The webapp uses besides images that are loaded by an API in the details page, only a png image for the 'click to scan' button on the homepage. SVG is used for everything else.

##### Tests
By disabling images in my browser, the image of the 'click to scan' button disappeared along with the images on the details page that are requested by the API.

##### Solution(s)
The image of the 'click to scan' button converted to a SVG since it should have been a SVG like the rest anyway. The images on the details page had already an alt tag so didn't change anything there.

### 5.2 Custom Fonts

##### Context
The webapp uses the Open Sans font for all pages.

##### Tests
By disabling the custom font, the default sans-serif font of the browser will be used. 
While this is not a big issue since the Open Sans is a sans-serif font, 
it would be nicer to have a fallback that would look similar to Open Sans 
and not the default font of the browser that would cause the website to look different on different systems/browsers.

##### Solution(s)
Added the Verdana font family as fallback since it looks similar to Open Sans. The sans-serif is still used as the last fallback.

### 5.3 Colors

##### Context
The webapp uses white and different shades of turquoise as colors.

##### Tests
Tested the website for the different types of color blindness:
- Protanopia
- Deuteranopia
- Tritanopia
- Monochromacy

There weren't any issues, because there is enough contrast between the colors.

##### Solution(s)
No solutions implemented, because there weren't any issues.

## 5.4 Bandwidth

##### Context
The webapp is a SPA and is built by using vanilla JavaScript, JavaScript libraries, CSS and SVG.

##### Tests
I used the Chrome developer tools to simulate a slow 3G network, while disabling cache.
It took 18.87 seconds for the browser to load all the required files and to render the homepage of the webapp.
All the required files were totally 222kb.

##### Solution(s)
It would have been a good idea to render the app server-side so that there can be optimizations.
For example, the webapp's JavaScript files and CSS files could be minified and compressed.
I would also like to add skeleton screens to improve perceived performance.

### 5.5 Mouse/Trackpad

##### Tests
- The 'click to scan' button on the homepage worked with keyboard only, meaning that I could navigate to the next page.
Not surprisingly since the button is actually an a tag.
- The toggle flashlight button on the scan page doesn't work for keyboard since it's a SVG.
- Can't play tracks on the details page because the eventlistener is attached to a div and not a button.

### 5.6 JavaScript

The webapp works in all pages without JavaScript. 

#### Search Page
The search page has a search form which is enhanced with JavaScript.
When JavaScript is enabled, the results will be shown automatically in a list after the user searches for a team.
When JavaScript is disabled, a submit button will be shown to send the data to the server,
so that the server can send back a new page with the list of results of the search query.

#### Dashboard Page
No JavaScript used on this page.

#### Match Page
Push notifications and websockets work when JavaScript is enabled.
When JavaScript is disabled, I use a noscript tag with http-equiv="refresh" to request a new page from the server.
This way the page still can show the scores and the notifications.

### 5.7 Cookies
Webapp doesn't use cookies.

### 5.8 Localstorage
Webapp doesn't use localstorage.

### Device lab
I tested the webapp on different devices. 
Unfortunately, it worked only on the HTC tablet because it was the only device that supported HTTP2.
I didn't had enough time to add support for HTTPS so that's a todo for later.
Though, the app did work well on the HTC tablet. 
The home page and the scan page worked perfectly.
The only issue was on the details page, where the SVG of the stop button didn't display.
I didn't had time to look into the problem, so that's a todo for later.

### Screen reader
I tested the webapp with the Windows screen reader.
While the screen reader did found my buttons and a tag so that the user can navigate around, toggle the flashlight and play the tracks,
the buttons and the a tag didn't had any meaning.
For the a tag on the homepage the screen reader read out the full url to the scan page. 
For a user using a screen reader the url is hard to understand because it's basically all numbers. This is because the webapp is hosted on a server which doesn't use a domain name.
The screen reader reffered the flashlight button on the scan page simply as 'button'. This doesn't has any meaning for a user using a screen reader.
The play/stop buttons on the details page got the same issue.
I didn't had enough time to investigate the issues with the screen reader, so I add it as a todo for later.
