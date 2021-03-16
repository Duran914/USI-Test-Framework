const expect = require('chai').expect;

function navigate_url(url, check_tag=true){
    it(`Navigating to ${url}`, async () => {
        await page.goto(url, { waitUntil: "networkidle0" });
    });
    if (check_tag == true) {
        appfile_check();
    }
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
        await page.waitForSelector("#usi_display.usi_hide_css")
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
function coupon_validation(validate_by, selector, validation_text){
    it("Coupon validation", async () => {
        if(validate_by == "selector"){
            if(await page.waitForSelector(selector)){
                done();
                }
            }
            else if(validate_by == "selector-text"){
                const coupon_field = await page.waitForSelector(selector);
                // Get innerText of coupon_field
                const scraped_coupon_text = await page.evaluate(coupon_field => coupon_field.innerText, coupon_field);
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

function waitForVisibility(Element_name, selector) {
    it(`${Element_name} is now visible`, async() => {
        await page.waitForSelector(selector,{visible: true})
    });
}

function email_follow(email_type) {
    it("Navigating to email", async () => {
        let cookies = await page.cookies();
        let session = '';
        let session_tries = 5;
        let session_type = ""
        let email_type_lcase = email_type.toLowerCase();

        if(email_type_lcase == "lc"){
            session_type = "usi_sess";
        }
        else if(email_type_lcase == "pc"){  
            session_type = "USI_Session";
        }

        while (session == '') {
            for (let i = 0; i < cookies.length; i++) {
              let usi_cookie = cookies[i];
              if(usi_cookie["name"] == session_type){
                session = cookies[i].value
                } 
            }
            session_tries -= 1;
            await page.waitForTimeout(5000)

            if(session_tries == 0){
                console.log("Session not found");
                break;
            }
         console.log(`tries lfft: ${session_tries}`);
         console.log("session: " + session);
      } 
        await page.goto(`https://www.upsellit.com/email/onlineversion.jsp?${session}~1`)  

        let email_loads = 5
        // Reloads page until email loads
        while (await page.title() == "Oops, email has expired") {
            await page.reload()
            await page.waitForTimeout(5000)
            email_loads -= 1
            console.log("Loads left: " + email_loads);
            
            if (email_loads == 0) {
                console.log("Email not found");
                break;
            }
        }
    });  
}

function refresh_page(seconds) {
    it('Page Refreshed', async() => {
        await page.reload(seconds)
    });
  }
  
  function wait(seconds){
    it(`Waited for ${seconds} ms.`, async() => {
        await page.waitForTimeout(seconds)
    });
  }

  function appfile_check() {
    it('App file loaded', async() => {
        let app_file_loads = 5
        while (app_file_loads != 0) {
            try {
                if(await page.evaluate(() => {return usi_app})){
                    expect(await page.evaluate(() => {return usi_app})).to.be.a('object');
                    break;
                }
              } catch (error) {
                await page.waitForTimeout(5000)
                app_file_loads--;
                console.log(`App file tries left: ${app_file_loads}`);
              }
              if (app_file_loads == 0) {
                expect(await page.evaluate(() => {return usi_app})).to.be.a('object');
                console.log("App file not Loaded");
                break;
            } 
        } 
    });
  }

// Work in prgress
function site_id_check(id) {
    it(`site id ${id} loaded`, async() => {      
        // Ensures usi_js library has loaded
        let usi_js_loads = 5
        while (usi_js_loads != 0) {
            try {
                if(await page.evaluate(() => {return usi_js})){
                    expect(await page.evaluate(() => {return usi_js})).to.be.a('object');
                    break;
                }
              } catch (error) {
                await page.waitForTimeout(5000)
                usi_js_loads--;
                console.log(`usi_js tries left: ${usi_js_loads}`);
              }
              if (usi_js_loads == 0) {
                expect(await page.evaluate(() => {return usi_js})).to.be.a('object');
                console.log("usi_js not Loaded");
                break;
            } 
        }        
        // Check for correct site id
        let site_id_loads = 5
        while (await page.evaluate(() => {return usi_js.campaign.site_id}) != id) {
            await page.waitForTimeout(5000);
            site_id_loads--;
            console.log(`Site id tries left: ${site_id_loads}`);
            if (site_id_loads == 0) {
                expect(await page.evaluate(() => {return usi_js.campaign.site_id})).to.equal(id);
                console.log("Site ID not Loaded");
                break;
            }
        }
    });
}

function split_test_check(control_id) {

    it('USI group loaded', async() => {
        let cookies = await page.cookies();
        let split_group = '';
        let split_group_tries = 5;
    
        while (split_group == '') {
            for (let i = 0; i < cookies.length; i++) {
              let usi_cookie = cookies[i];
              if(usi_cookie["name"] == `usi_dice_roll${control_id}`){
                 split_group = cookies[i].value;
                 expect(split_group).to.equal('1', message=`USI control group loaded ${split_group}`)
                 break;
              } 
            }
            split_group_tries--;
            await page.waitForTimeout(5000)
    
            if(split_group_tries == 0){
                expect(split_group).to.equal('1')
                break;
            }

         console.log(`split_group tries lfft: ${split_group_tries}`);
         console.log("split_group: " + split_group);
      }  
    });
}

module.exports = { 
    navigate_url, launch_modal, click, input, append_url, coupon_validation,
    boostbar_check, waitForVisibility, email_follow, wait, refresh_page, site_id_check, 
    appfile_check, split_test_check
};