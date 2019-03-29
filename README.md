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

It doesn't look pretty but it still works. The score and notifications are updated, because the page constantly refreshes every second which causes the server to send a new page.

### 4.2 Usable

<p align="center">
  <img width="500px" src="https://github.com/Arash217/football-team-tracker-BT/blob/master/docs/usable.jpg">
</p>

### 4.3 Pleasurable

<p align="center">
  <img width="500px" src="https://github.com/Arash217/football-team-tracker-BT/blob/master/docs/pleasurable.jpg">
</p>
