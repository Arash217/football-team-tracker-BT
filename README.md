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

It doesn't look pretty but it still works. The scores and notifications are updated by constantly refreshing the page every second which triggers the server to send a new page back.

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
When the images are disabled, content of the alt attributes are shown.

### 5.2 Custom Fonts

The webapp uses the Open Sans font for all pages.
When disabling the custom font, the Verdana font family will be used. 
I chose this font family because it's a web-safe font and because it looks similar to Open Sans.
If Verdana is not supported, the fallback will be the default sans-serif font family of the browser.

### 5.3 Colors
I use primarily the colors purple and white. As you can see, the contrast between these colors are good! 

<p align="center">
  <img width="500px" src="https://github.com/Arash217/football-team-tracker-BT/blob/master/docs/color.jpg">
</p>

### 5.4 Bandwidth

I tested the webapp with Chrome's 'slow 3G' emulation. 
The match page took 8 seconds to load the 190 KB.
This is without optimizations.
Unfortunately I didn't had time to do optimizations such as minifying, compressing and caching.

### 5.5 Mouse/Trackpad

The website works with keyboard only.
You can easily navigate around between the pages, search for a team, add a team and click on a team to display the live match. 
Both with JavaScript enabled and disabled.

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
It worked on all devices but there was an issue with a smartphone which had a FireFox OS.
For some reason the time didn't get updated but the notifications did.

### Screen reader
The screen reader works perfectly on the search page but there are issues on the other pages. 
It doesn’t work on the dashboard for the teams list. 
Because I’m wrapping a link tag around a div without giving the a tag text.
The screen reader also doesn’t work properly when JavaScript is disabled in the match page. 
Since the page is refreshed every second, the screen reader will continuously repeat the 'back to dashboard button' properties. 
