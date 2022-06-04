let puppeteer =  require ('puppeteer')
console.log('Before')
let browserWillbeLaunchedPromise = puppeteer.launch({
    headless: false,
    defaultViewport:null,
     rgs: ['--start-maximized']
})// pending pehla step promise ka 

browserWillbeLaunchedPromise.then(function(browserInstance){
    let newTabPromise =browserInstance.newPage()
    return newTabPromise;
}).then(function(newTab){
 
    console.log('New tab opened')

    let pageWillbeOpenedPromise = newTab.goto('https://www.hackerrank.com/auth/login')
    return pageWillbeOpenedPromise 

}).then(function(webPage){
    console.log('Website opened ')
})

console.log('After ')

