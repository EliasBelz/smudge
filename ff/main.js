document.body.style.border = "5px solid blue"

navigator.__defineGetter__("userAgent", function () {
    return 'test'
})

// alert(window.navigator.userAgent)
console.log(window.navigator.userAgent)