// mcp/server.js
import { chromium } from 'playwright';

let browser;
let page;

export const tools = {
  async openBrowser() {
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
    return 'Browser opened';
  },

  async goto(url) {
    await page.goto(url);
    return `Navigated to ${url}`;
  },

  async click(selector) {
    await page.click(selector);
    return `Clicked ${selector}`;
  },

  async getTitle() {
    return await page.title();
  },

  async screenshot() {
    await page.screenshot({ path: 'mcp/screenshot.png' });
    return 'Screenshot saved';
  },

  async closeBrowser() {
    await browser.close();
    return 'Browser closed';
  }
};

