
function navigate_url(url){
    it(`Navigating to ${url}`, async () => {
        await page.goto(url, { waitUntil: "networkidle0" });
    });
  }

function append_url(param){
    it(`Appending ${param} to url`, async () => {
        let current_url = await page.url();
        let new_url;
            if(current_url.indexOf("?") != 1){
                new_url = current_url.concat("?" + param)
            } 
            else{
                new_url = current_url.concat("&" + param)
            }  
        await page.goto(new_url, { waitUntil: "networkidle0" });
    });
  }

function launch_modal(){
    it("Launch TT", async () => {
        await page.evaluate(function(){
           usi_js.display();
       });
    })
  }

function click(element_data) {
    for (const selector in element_data) {
        it(`Clicked ${selector}`, async () => {
            await page.waitForSelector(element_data[selector],{visible: true})
            await page.click(element_data[selector])    
        })
    }  
}

function input(element_data) {
    for (const selector in element_data) {
        it(`Type ${element_data[selector][1]} in ${selector} field`, async () => {
            await page.waitForSelector(element_data[selector][0])
            await page.type(element_data[selector][0], element_data[selector][1])
          })   
    }  
}

// validate_by = selector or selector_text
function coupon_validation(validate_by, selector, validation_text=""){
    it("Coupon validation", async () => {
        if(validate_by == "selector"){
            if(await page.waitForSelector(selector)){
                done();
                }
            }
            else if(validate_by == "selector-text"){
                let coupon_field = await page.waitForSelector(selector);
                // Get innerText of coupon_field
                let scraped_coupon_text = await page.evaluate(coupon_field => coupon_field.innerText, coupon_field);
                expect(scraped_coupon_text).to.equal(validation_text);
            }
    })
  }

function boostbar_check(selector="#usi_boost_container") {
    it('Boostbar visibility', async() => {
        if(await page.waitForSelector(selector)){
            return true;
        }
    });
}

module.exports = { 
    navigate_url, launch_modal, click, input, append_url, coupon_validation,
    boostbar_check
};