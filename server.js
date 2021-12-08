const puppeteer = require("puppeteer");
const { Telegraf } = require("telegraf");
const {parse, stringify, toJSON, fromJSON} = require('flatted');

const bot = new Telegraf("5008074125:AAFgOpp2zt1xyvANTgpmB_7DafzqKXINtW4");
let text = ''
bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Type 'Attendance' for checking attendance"));
bot.on("sticker", (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.hears("Attendance", (ctx) => {
  ctx.reply("please wait...");
  red(ctx);
});
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
// MG73c534fccc1a65c1bc1e0956dd914f20

const red = async (ctx) => {
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
  await page1.goto(
    "http://www.webprosindia.com/hitam/Academics/StudentAttendance.aspx?showtype=SA"
  );
  await page1.click("#radTillNow");
  await page1.click("#btnShow");
  await page1.waitForNetworkIdle();
  const val = await page1.$x(
    '//*[@id="tblReport"]/table/tbody/tr[3]/td/table/tbody/tr[19]/td[4]'
  );
  text = await val[0].getProperty("textContent");
  textres = text._remoteObject.value + ''
  bot.telegram.sendMessage(ctx.message.chat.id, 'Your attendance is ' + textres + "%.\nHave a nice day :)");
  await browser.close();
};
