console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
    const data = e.data.json();
    console.log(data.body);
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: "http://image.ibb.co/frYOFd/tmlogo.png"
    });
});