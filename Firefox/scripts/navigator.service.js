(async function () {
const jsonFileUrl = browser.extension.getURL('assets/navigator.json');
const res = await fetch(jsonFileUrl)
const data = await res.json()
console.log(data)

let script = document.createElement('script')
script.textContent = `
    Object.defineProperty(navigator, 'platform', {
        get: function () { return '${data.platform[40]}'; }
    });

    Object.defineProperty(navigator, 'userAgent', {
        get: function () { return 'fake userAgent'; }
    });
    // Add more properties as needed
`;
(document.head||document.documentElement).appendChild(script);
script.remove();

console.log(`extension UA ${navigator.userAgent}`);
console.log(`extension platform ${navigator.platform}`);
})();