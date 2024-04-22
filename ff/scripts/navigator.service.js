if (window.localStorage.getItem("smudgeEnabled")) {
    let script = document.createElement('script');
    script.textContent = `
        Object.defineProperty(navigator, 'platform', {
            get: function () { return 'fake platform'; }
        });
    
        Object.defineProperty(navigator, 'userAgent', {
            get: function () { return 'fake userAgent'; }
        });
        // Add more properties as needed
    `;
    (document.head||document.documentElement).appendChild(script);
    script.remove();
    
    
    console.log(`extension UA ${navigator.userAgent}`)
    console.log(`extension platform ${navigator.platform}`)
}