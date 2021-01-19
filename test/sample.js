const usi = require('./utils/usi_test.js');
const puppeteer = require("puppeteer");
const expect = require('chai').expect;

describe("", () => {
  before(async () => {
    global.browser = await puppeteer.launch({headless: false, defaultViewport: {width:1920, height:1080}, slowMo: 100});
    global.page = await browser.newPage();
  });

  // code goes here

  after(async () => {
    await browser.close();
  });
});