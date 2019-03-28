const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  // Open page.
  await page.goto('http://192.168.0.12/isimjss/login');
  await page.waitFor(3000);
  await page.waitForNavigation();
  await page.goto('http://192.168.0.12/ISIMJSS/Student/FeedBack');
  await page.click('#MCPH1_SCPH_gvFeedBackList_btnSelect_0');
  await page.waitFor(5000);
  let elements =await page.evaluate(() => {
        console.log(document.getElementsByClassName('linkselect'));
         return document.getElementsByClassName('linkselect');

         
    });

await page.waitFor('#MCPH1_SCPH_grddtFacultyEvalSubMap_btnSelect1_0');
for(var i=0;i<Object.keys(elements).length-1;i++){
  await page.click('#MCPH1_SCPH_grddtFacultyEvalSubMap_btnSelect1_'+i);
  await page.waitForNavigation();
  await page.evaluate(() => {
      var radio=document.querySelectorAll("input[value=rdbExcellent]");
      for(var i=0;i<radio.length;i++){
        radio[i].checked=true;
      }
    });
  try{
    await page.click('#MCPH1_SCPH_BtnShow');
    await page.waitForNavigation();
  }catch(e){

  }
  await page.click('#MCPH1_SCPH_btnClose');
  await page.waitForNavigation(); 
}

  // Keep the browser open.
  browser.close();
})();