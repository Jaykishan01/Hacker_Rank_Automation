const puppeteer = require('puppeteer')

const codeFile = require('./code')

let email = 'jemoca9843@vapaka.com'
let password = '@PWD'

let page

let browserWillbeLaunchedPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    rgs: ['--start-maximized']
})
browserWillbeLaunchedPromise.then(function (newBrowser) {
    let newTabPromise = newBrowser.newPage()
    return newTabPromise
}).then(function (newTab) {
    page = newTab
    newTabOpened = newTab.goto('https://www.hackerrank.com/auth/login')
    return newTabOpened
}).then(function () {
    let typeEmailPromise = page.type('input[id="input-1"]', email, { delay: 100 })
    return typeEmailPromise

}).then(function () {
    let typePasswordPromise = page.type('[id="input-2"]', password, { delay: 100 })
    return typePasswordPromise
}).then(function () {
    let loginPromise = page.click('button[data-analytics="LoginPassword"]', { delay: 100 })
    return loginPromise
}).then(function () {

    let algoWillBeclickedPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]', page)

    return algoWillBeclickedPromise;

}).then(function () {
    let getToWarmUpPromise = waitAndClick('input[value="warmup"]', page)
    return getToWarmUpPromise
}).then(function () {
    let ChallengesArrPromise = page.$$(
        ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",
        { delay: 100 }
    );
    return ChallengesArrPromise

}).then(function (questionsArr) {
    console.log("No of questions " + questionsArr.length)



    let questionWillVeSolvedPromise = questionSolver(page, questionsArr[0], codeFile.answers[0])



})

function waitAndClick(selector, cpage) {

    return new Promise(function (resolve, reject) {
        let waitForModalPromise = cpage.waitForSelector(selector)
        waitForModalPromise.then(function () {
            let clickModel = cpage.click(selector, { delay: 100 })
            return clickModel
        }).then(function () {
            resolve()
        }).catch(function () {
            reject()
        })
    })

}

function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
      let questionWillBeClickedPromise = question.click();
      questionWillBeClickedPromise
        .then(function () {
          let waitForEditorPromise = waitAndClick(
            ".monaco-editor.no-user-select.vs",
            page
          );
          return waitForEditorPromise;
        })
        .then(function () {
          return waitAndClick(".checkbox-input", page);
        })
        .then(function () {
          return page.waitForSelector(".text-area.custominput");
        })
        .then(function () {
          return page.type(".text-area.custominput", answer, { delay: 20 });
        })
        .then(function () {
          let ctrlonHoldPromise = page.keyboard.down('Control');
          return ctrlonHoldPromise
        }).then(function(){
          let AisPressedPromise = page.keyboard.press('A' , {delay : 20});
          return AisPressedPromise
        }).then(function(){
           let XisPressedPromise = page.keyboard.press('X' , {delay:20})
           return XisPressedPromise
        }).then(function(){
           let ctrlIsReleasedPromise = page.keyboard.up('Control')
           return ctrlIsReleasedPromise
        }).then(function () {
          let waitForEditorPromise = waitAndClick(
            ".monaco-editor.no-user-select.vs",
            page
          );
          return waitForEditorPromise;
        }).then(function () {
          let ctrlonHoldPromise = page.keyboard.down('Control');
          return ctrlonHoldPromise
        }).then(function(){
          let AisPressedPromise = page.keyboard.press('A' , {delay : 20});
          return AisPressedPromise
        }).then(function(){
          let VisPressedPromise = page.keyboard.press('V' , {delay:20})
          return VisPressedPromise
       }).then(function(){
        let ctrlIsReleasedPromise = page.keyboard.up('Control')
        return ctrlIsReleasedPromise
     }).then(function(){
        return page.click('.hr-monaco__run-code' , {delay : 20})
     }).then(function(){
       resolve()
     }).catch(function(err){
       console.log(err)
     })
    });
  }