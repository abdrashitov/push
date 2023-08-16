const publicVapidKey = "BJc5-ieMikJm3M8wDjoya4ICk9P35ggcSXlZM-tioVqLzbP_9dxoPeADLaL6KjS6CgLAZwPkcWoNtOhQO_bl6vs";
async function registerServiceWorker() {
  const register = await navigator.serviceWorker.register('./worker.js', {
    scope: '/'
  });

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey,
  });

  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json",
    }
  }).then((res) => console.log(res))
}

if('serviceWorker' in navigator) {
  registerServiceWorker()
      .catch(e => console.error(e))
}