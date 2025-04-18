let deferredPrompt;

// Check if the app is running in standalone mode
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

if (!isStandalone) {
    // Create the download button
    const installButton = document.createElement('button');
    installButton.textContent = 'Download App';
    installButton.style.position = 'fixed';
    installButton.style.bottom = '10px';
    installButton.style.right = '10px';
    installButton.style.padding = '10px';
    installButton.style.backgroundColor = '#4caf50';
    installButton.style.color = 'white';
    installButton.style.border = 'none';
    installButton.style.borderRadius = '5px';
    installButton.style.cursor = 'pointer';

    document.body.appendChild(installButton);

    // Listen for the `beforeinstallprompt` event
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        // Show the download button
        installButton.style.display = 'block';

        installButton.addEventListener('click', () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                deferredPrompt = null;
                installButton.style.display = 'none';
            });
        });
    });

    // Hide the button by default if `beforeinstallprompt` doesn't fire
    installButton.style.display = 'none';
}
