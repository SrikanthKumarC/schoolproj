const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://www.webprosindia.com/hitam/", {
    waitUntil: "networkidle0",
  });
  await page.type("#txtId2", "19E51A0524");
  await page.type("#txtPwd2", "THankyou12@!");
  await page.click("#imgBtn2");
  await page.waitForNetworkIdle();
  const page1 = await browser.newPage();
  await page1.goto("http://www.webprosindia.com/hitam/Academics/StudentAttendance.aspx?showtype=SA");
  await page1.click("#radTillNow");
  await page1.click("#btnShow");
  await page1.waitForNetworkIdle();
  const val = await page1.$x('//*[@id="tblReport"]/table/tbody/tr[3]/td/table/tbody/tr[19]/td[4]')
  let text = await val[0].getProperty('textContent')
  console.log(text._remoteObject.value);
  await browser.close();
})();
