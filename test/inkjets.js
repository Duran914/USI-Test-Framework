const usi = require('./utils/usi_test.js');
const puppeteer = require("puppeteer");
const expect = require('chai').expect;

describe("Inkjets TT 22374", () => {
  before(async () => {
    global.browser = await puppeteer.launch({headless: false, defaultViewport: {width:1920, height:1080}, slowMo: 100});
    global.page = await browser.newPage();
  });

  usi.navigate_url("https://www.inkcartridges.com/product-brother-compatible-ink-lc61bulk-2136")
  usi.click({"Add To Cart Button": ".add_to_cart_btn.button"})
  usi.click({"View cart & checkout button":".cart-container button[data-url='https://www.inkcartridges.com/checkout/cart/']"})
  usi.launch_modal()
  usi.click({"USI CTA": ".usi_submitbutton"})
  usi.coupon_validation(
      validate_by="selector-text",
      selecotor=".messages .async-success-msg .ng-binding",
      validation_text="COUPON CODE \"ICAFLQ1\" WAS APPLIED."
    )
  after(async () => {
    await browser.close();
  });
});