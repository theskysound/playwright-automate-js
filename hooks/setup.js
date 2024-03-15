import { test as setup } from '@playwright/test';
import { baseUrl } from '../utils/constants';
import { getAvailableUsers } from '../utils/helper';

setup('setting up available users', async ({ page }) => {
  console.log('get available users...');
  await page.goto(baseUrl);

  // Extract the text content of the div with ID 'login_credentials'    
  const loginCredentialsDiv = await page.$('#login_credentials');    
  getAvailableUsers(loginCredentialsDiv.innerText);
});