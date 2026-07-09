import { BasePage } from './BasePage.js';

export class PerformancePage extends BasePage {
  async measurePageLoadTime(url) {
    const startTime = Date.now();
    await this.goto(url);
    const endTime = Date.now();
    return endTime - startTime;
  }

  async checkAPIResponseStatus(request, url) {
    const response = await request.get(url);
    return response.status();
  }
}
