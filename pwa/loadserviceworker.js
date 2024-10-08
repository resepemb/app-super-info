
function getScope() {
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        return "/";
    } else {
        var repositoryName = window.location.pathname.split('/')[1];
        return '/'+ repositoryName+'/';
    }
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            let currentScope = getScope();
            
            // Check if a service worker is already registered
            const registration = await navigator.serviceWorker.getRegistration(`${currentScope}sw.js`);
            if (registration) {
                console.info('Service worker already registered with scope: ' + registration.scope);
            } else {
                // If not registered, register the service worker
                const reg = await navigator.serviceWorker.register(`${currentScope}sw.js`, {scope: currentScope});
                console.info('Registration succeeded. Scope is: ' + reg.scope);
            }
        } catch (error) {
            // Handle registration failure
            console.error('Registration failed with ' + error);
        }
    });
}