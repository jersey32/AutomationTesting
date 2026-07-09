import { BasePage } from './BasePage.js';

export class PhoneTrackerPage extends BasePage {
  async isButtonVisible(buttonName) {
    return await this.page.getByRole('button', { name: buttonName }).isVisible();
  }

  async navigateToWatchdogDashboard() {
    await this.page.getByText('Watchdog Dashboard').click();
  }

  async navigateToCompanies() {
    await this.page.getByRole('link', { name: 'Companies' }).hover();
  }

  async isCompanyLinkVisible(linkName) {
    return await this.page.getByRole('link', { name: linkName }).isVisible();
  }

  async navigateToEmployees() {
    await this.page.getByRole('link', { name: 'Employees/POCs/Equipment' }).click();
  }

  async isEmployeesTextVisible() {
    return await this.page.getByText('Employees/POCs', { exact: true }).isVisible();
  }

  async clickDeviceLink() {
    await this.page.getByRole('link', { name: '100, Device' }).click();
  }

  async isDeviceTextVisible() {
    return await this.page.getByText('Device', { exact: true }).isVisible();
  }

  async isDeviceIdVisible() {
    return await this.page.getByText('100', { exact: true }).isVisible();
  }

  async isSerialNumberVisible() {
    return await this.page.getByRole('link', { name: 'R9PT402TLZD' }).isVisible();
  }
}
