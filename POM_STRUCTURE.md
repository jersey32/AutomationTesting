# Page Object Model Structure

All test scripts have been refactored to use the Page Object Model (POM) pattern. This provides better maintainability, reusability, and readability.

## Base Page Classes

### `BasePage.js`
The foundation for all page objects with common functionality:
- Navigation (`goto`)
- Load state management (`waitForLoadState`)
- Element interactions (`click`, `fill`, `getText`)
- Frame handling (`getFrame`)

### `AcumaticaBasePage.js`
Extends BasePage with Acumatica-specific functionality:
- Main frame access (`getMainFrame`)
- Record save operations (`saveRecord`)
- Common email field handling (`fillEmail`)

## Application-Specific Page Objects

### Login Pages
- **LoginPage.js** - Handles login for all applications:
  - `loginSauceDemo()` - Login to SauceDemo
  - `loginPhoneTracker()` - Login to PhoneTracker (PT)
  - `loginAcumatica()` - Login to Acumatica

### Practice/Demo
- **PracticePage.js** - Playwright practice application:
  - Form interactions (username, email, password, age)
  - Radio button selection
  - Drag and drop operations

### Reporting Tools
- **ARTPage.js** - Automatic Reporting Tool:
  - Navigation
  - Online status verification
  - Template dropdown checks

- **WebmethousPage.js** - Automatic Scraping Tool:
  - Navigation
  - Online status verification
  - Script dropdown checks

### PhoneTracker (PT)
- **PhoneTrackerPage.js** - PhoneTracker application:
  - Dashboard navigation (Home, Watchdog, KAM)
  - Button and link visibility checks
  - Companies navigation
  - Employee/POC/Equipment browsing

### SauceDemo E-Commerce
- **InventoryPage.js** - Product inventory and shopping:
  - Add to cart operations
  - Cart management
  - Logout functionality
  - Item visibility checks

- **CheckoutPage.js** - Checkout flow:
  - Checkout steps (1, 2, completion)
  - Form filling (name, address, postal code)
  - Order summary verification
  - Completion confirmation

### Acumatica
All Acumatica pages extend `AcumaticaBasePage.js` for common frame and save operations.

- **AcumaticaCustomerPage.js** - Customer management:
  - Fill customer details (name, address, email, phone)
  - Inherits: `getMainFrame()`, `saveRecord()`, `fillEmail()`

- **AcumaticaLeadPage.js** - Lead management:
  - Fill lead details (first name, last name, email, phone, company)
  - Inherits: `getMainFrame()`, `saveRecord()`, `fillEmail()`

- **AcumaticaSalesOrderPage.js** - Sales order operations:
  - Fill order headers
  - Add items to orders
  - Tab navigation
  - Hold/credit hold removal
  - Send to staging/POP operations
  - Generate/view payment links
  - Print functionality
  - Inherits: `getMainFrame()`, `saveRecord()`

- **AcumaticaPurchaseOrderPage.js** - Purchase order operations:
  - Fill order headers with vendors
  - Add items from warehouses
  - Tracking number management
  - Inherits: `getMainFrame()`, `saveRecord()`

- **AcumaticaStockItemPage.js** - Stock item management:
  - Select inventory items
  - Update last cost
  - Inherits: `getMainFrame()`, `saveRecord()`

### API Testing
- **APIClient.js** - API request helper:
  - GET/POST/PUT/PATCH/DELETE methods
  - Headers and base URL management
  - Query parameter handling

### Performance Testing
- **PerformancePage.js** - Performance measurements:
  - Page load time tracking
  - API response status checks

### Todo Application
- **TodoPage.js** - Todo application (demo):
  - Add/edit/delete todos
  - Mark as complete/incomplete
  - Filter operations (All, Active, Completed)
  - Clear completed items
  - Persistence checks

## Test Files Updated

### Web UI Tests
- `tests/Web UI/Practice.spec.js` - Uses `PracticePage`
- `tests/Web UI/CustomerLogin.spec.js` - Uses `LoginPage`, `InventoryPage`
- `tests/Web UI/Checkout.spec.js` - Uses `LoginPage`, `InventoryPage`, `CheckoutPage`

### Application Tests
- `tests/specs/ART/art.spec.js` - Uses `ARTPage`
- `tests/specs/PT/PT.spec.js` - Uses `LoginPage`, `PhoneTrackerPage`
- `tests/specs/Webmethues/webmethues.spec.js` - Uses `WebmethousPage`

### API Tests
- `tests/specs/API testing/APITESTING.spec.js` - Uses `APIClient`

### Performance Tests
- `tests/specs/Site Performance/performance.spec.js` - Uses `PerformancePage`

### Acumatica Tests
- `tests/specs/Acu/Customer.spec.js` - Uses `LoginPage`, `AcumaticaCustomerPage`
- `tests/specs/Acu/generatepayment.spec.js` - Uses `LoginPage`, `AcumaticaSalesOrderPage`
- `tests/specs/Acu/PurchaseOrder.spec.js` - Uses `LoginPage`, `AcumaticaPurchaseOrderPage`
- `tests/specs/Acu/SO-Net.spec.js` - Uses `LoginPage`, `AcumaticaSalesOrderPage`
- `tests/specs/Acu/SO-Prepay.spec.js` - Uses `LoginPage`, `AcumaticaSalesOrderPage`
- `tests/specs/Acu/StockItem.spec.js` - Uses `LoginPage`, `AcumaticaStockItemPage`

### Example Tests
- `tests-examples/demo-todo-app.spec.js` - Uses `TodoPage`

## Benefits of This Structure

1. **Reusability** - Common actions are encapsulated in page objects and can be reused across tests
2. **Maintainability** - If a selector changes, it only needs to be updated in one place
3. **Readability** - Tests read like business logic rather than technical implementation
4. **Scalability** - Easy to add new pages or extend existing ones
5. **Reduced Duplication** - No more copy-pasting selectors and actions
6. **Better Organization** - All interactions with a page are grouped together

## Usage Example

```javascript
import { LoginPage, ACU_URL } from '../../pages/LoginPage.js';
import { AcumaticaCustomerPage } from '../../pages/AcumaticaCustomerPage.js';
import { CUSTOMER_DATA } from '../../pages/menu-page.js';

test('Create Customer', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const customerPage = new AcumaticaCustomerPage(page);

  // Login to Acumatica
  await loginPage.loginAcumatica(
    `${ACU_URL}AR303000`,
    process.env.ACU_USERNAME,
    process.env.ACU_PASSWORD
  );

  // Get the main frame
  const frame = await customerPage.getMainFrame();

  // Fill customer details using page object
  await customerPage.fillCustomerDetails(frame, CUSTOMER_DATA);

  // Save the record
  await customerPage.saveRecord(frame);
});
```

## Page Object Guidelines

When adding new tests or modifying existing ones:

1. **Create Page Objects** for new pages/features
2. **Extract Selectors** from tests into page objects
3. **Use Descriptive Methods** that describe what the user does, not how
4. **Keep Methods Focused** on a single responsibility
5. **Use Inheritance** from BasePage for common functionality
6. **Group Related Methods** logically within page objects
