// seems to not work on amiunique
navigator.__defineGetter__("userAgent", function () {
    return "test 1"
})

console.log(navigator.userAgent)