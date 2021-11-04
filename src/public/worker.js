self.addEventListener("push", e => {
    const data = e.data.json();
    self.registration.showNotification(
        data.title, // title of the notification
        {
            body: "New stock! Your wishlisted toys are in inventory!", //the body of the push notification
            image: "https://i.imgur.com/46KWNJC.png",
            icon: "https://i.imgur.com/WmrOIhP.png" // icon 
        }
    );
});