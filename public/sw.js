self.addEventListener("push", function (event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "ENFORCE";
  const options = {
    body: data.body || "Time.",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
