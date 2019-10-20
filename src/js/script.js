if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(function() {
        console.log('SW registration successful')
      })
      .catch(function() {
        console.log('SW registration error')
      })
  })
}

console.log('   __ __  ____  __  __    _')
console.log('  / // / / __ \\/ /_/ /_  (_)__ _   _____  _____')
console.log(' / // /_/ / / / __/ __ \\/ / _ \\ | / / _ \\/ ___/')
console.log('/__  __/ /_/ / /_/ / / / /  __/ |/ /  __(__  )')
console.log('  /_/  \\____/\\__/_/ /_/_/\\___/|___/\\___/____/')
