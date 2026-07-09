import { BasePage } from './BasePage.js';

const TODO_URL = 'https://demo.playwright.dev/todomvc';

export class TodoPage extends BasePage {
  async navigateTo() {
    await this.goto(TODO_URL);
  }

  async addTodo(text) {
    const newTodo = this.page.getByPlaceholder('What needs to be done?');
    await newTodo.fill(text);
    await newTodo.press('Enter');
  }

  async getTodoTitles() {
    return await this.page.getByTestId('todo-title').allTextContents();
  }

  async getTodoCount() {
    return await this.page.getByTestId('todo-item').count();
  }

  async getTodoCountText() {
    return await this.page.getByTestId('todo-count').textContent();
  }

  async markAllAsComplete() {
    await this.page.getByLabel('Mark all as complete').check();
  }

  async unmarkAllAsComplete() {
    await this.page.getByLabel('Mark all as complete').uncheck();
  }

  async isAllCompleteChecked() {
    return await this.page.getByLabel('Mark all as complete').isChecked();
  }

  async getTodoClasses(index) {
    return await this.page.getByTestId('todo-item').nth(index).evaluate(el => el.className);
  }

  async checkTodo(index) {
    await this.page.getByTestId('todo-item').nth(index).getByRole('checkbox').check();
  }

  async uncheckTodo(index) {
    await this.page.getByTestId('todo-item').nth(index).getByRole('checkbox').uncheck();
  }

  async isTodoChecked(index) {
    return await this.page.getByTestId('todo-item').nth(index).getByRole('checkbox').isChecked();
  }

  async editTodo(index, newText) {
    const todoItem = this.page.getByTestId('todo-item').nth(index);
    await todoItem.dblclick();
    await todoItem.getByRole('textbox', { name: 'Edit' }).fill(newText);
    await todoItem.getByRole('textbox', { name: 'Edit' }).press('Enter');
  }

  async editTodoAndBlur(index, newText) {
    const todoItem = this.page.getByTestId('todo-item').nth(index);
    await todoItem.dblclick();
    await todoItem.getByRole('textbox', { name: 'Edit' }).fill(newText);
    await todoItem.getByRole('textbox', { name: 'Edit' }).dispatchEvent('blur');
  }

  async cancelEditTodo(index) {
    const todoItem = this.page.getByTestId('todo-item').nth(index);
    await todoItem.dblclick();
    await todoItem.getByRole('textbox', { name: 'Edit' }).press('Escape');
  }

  async isTodoCheckboxVisible(index) {
    return await this.page.getByTestId('todo-item').nth(index).getByRole('checkbox').isVisible();
  }

  async isTodoLabelVisible(index, text) {
    return await this.page.getByTestId('todo-item').nth(index).locator('label', { hasText: text }).isVisible();
  }

  async clearCompleted() {
    await this.page.getByRole('button', { name: 'Clear completed' }).click();
  }

  async isClearCompletedVisible() {
    return await this.page.getByRole('button', { name: 'Clear completed' }).isVisible();
  }

  async isClearCompletedHidden() {
    return await this.page.getByRole('button', { name: 'Clear completed' }).isHidden();
  }

  async clickFilter(filter) {
    await this.page.getByRole('link', { name: filter }).click();
  }

  async isFilterActive(filter) {
    const link = this.page.getByRole('link', { name: filter });
    const className = await link.getAttribute('class');
    return className?.includes('selected');
  }

  async goBack() {
    await this.page.goBack();
  }

  async reload() {
    await this.page.reload();
  }

  async waitForLocalStorage(condition) {
    return await this.page.waitForFunction(condition);
  }

  async getTodoInputValue(index) {
    return await this.page.getByTestId('todo-item').nth(index).getByRole('textbox', { name: 'Edit' }).inputValue();
  }
}
