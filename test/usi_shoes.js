const usi = require("./utils/usi_test.js");
const puppeteer = require("puppeteer");
const expect = require('chai').expect;

describe("USI shoes TT 67890", () => {
  before(async () => {
    global.browser = await puppeteer.launch({headless: false, defaultViewport: {width:1920, height:1080}, slowMo: 100});
    global.page = await browser.newPage();
  });
  usi.navigate_url("https://upsellitshoes.com/password")
  usi.append_url(param="usi_enable=1")
  usi.click({"Enter button":".password-login a"})
  usi.input({"Password field":["#Password","upsellit123"]})
  usi.click({
    "Login Button":"button.btn--narrow",
    "Select first product on home page":".collection-grid .product-item:first-child a"
  })
  after(async () => {
    await browser.close();
  });
});