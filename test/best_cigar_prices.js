const usi = require('./utils/usi_test.js');
const puppeteer = require("puppeteer");

describe("Best Cigar Prices TT 12345", () => {
  before(async () => {
    global.browser = await puppeteer.launch({headless: false, defaultViewport: {width:1920, height:1080}, slowMo: 100});
    global.page = await browser.newPage();
  });
  usi.navigate_url("https://www.bestcigarprices.com/about-us/?usi_enable=1&qa_testing=1")
  usi.launch_modal()
  usi.click({"CTA":".usi_submitbutton"}) 
  after(async () => {
    await browser.close();
  });
});