const usi = require('./utils/usi_test.js');
const expect = require('chai').expect;


const window_1 = require("puppeteer");
describe("Papr TT 33853", () => {
  before(async () => {
    global.browser = await window_1.launch({headless: false, defaultViewport: {width:1920, height:1080}, slowMo: 100});
    global.page = await browser.newPage();
  });

  usi.navigate_url("https://papercosmetics.com/")
  usi.click({
      "Popup close button":"div[formtype='POPUP'] button[alt='Close form']",
      "First product":".owl-wrapper .owl-item:first-child #add"
    })
  usi.launch_modal()
  usi.click({
      "CTA":".usi_submitbutton",
      "Checkout button":".off-canvas--main-content section div:nth-child(1) .cart--checkout-button"
    })
    usi.coupon_validation(
        validate_by="selector-text",
        selector=".total-line__name .reduction-code .reduction-code__text",
        validation_text="UP10"
      )
  after(async () => {
    await browser.close();
  });
});

// declare new puppeteer to open new browser window
const window_2 = require("puppeteer");

describe("Papr TT 34127", () => {
  before(async () => {
    global.browser = await window_2.launch({headless: false, defaultViewport: {width:1920, height:1080}, slowMo: 100});
    global.page = await browser.newPage();
  });
  usi.navigate_url("https://papercosmetics.com/collections/vegan-deodorants/products/bright-shiny-morning")
  usi.click({
      "Popup close button":"div[formtype='POPUP'] button[alt='Close form']",
      "Add to Cart":".add-to-cart #add",
      "CTA":".usi_submitbutton"
    })
  usi.waitForVisibility(element_name="Subscription text",selector=".bold_recurring_desc")
  after(async () => {
    await browser.close();
  });
});
