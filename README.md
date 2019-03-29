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

The webapp uses images on the search, dashboard and match page.
When the images are disabled, the alt tags are shown.

### 5.2 Custom Fonts

The webapp uses the Open Sans font for all pages.
When disabling the custom font, the Verdana font family will be used. 
I chose this font family because it's a web-safe font and because it looks similar to Open Sans.
If Verdana is not supported, the fallback will be the default sans-serif font family of the browser.

### 5.3 Colors



### 5.4 Bandwidth



### 5.5 Mouse/Trackpad



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
This way the page still can show the updated scores and notifications.

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
