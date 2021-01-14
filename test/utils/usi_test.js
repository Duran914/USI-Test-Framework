
async function navigate_url(url){
    it(`Navigating to ${url}`, async () => {
        await page.goto(url, { waitUntil: "networkidle0" });
    });
  }

  async function append_url(param){
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

async function launch_modal(){
    it("Launch TT", async () => {
        await page.evaluate(function(){
           usi_js.display(); 
       });
    })
  }

async function click(element_data) {
    for (const selector in element_data) {
        it(`Clicked ${selector}`, async () => {
            await page.waitForSelector(element_data[selector])
            await page.click(element_data[selector]);
        })
    }  
}

async function input(element_data) {
    for (const selector in element_data) {
        it(`Type ${element_data[selector][1]} in ${selector} field`, async () => {
            await page.waitForSelector(element_data[selector][0])
            await page.type(element_data[selector][0], element_data[selector][1])
          })   
    }  
}

module.exports = { navigate_url, launch_modal, click, input, append_url};