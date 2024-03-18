import * as loginElement from "../matchers/login";
import BasePage from "./basePage";

export class Login extends BasePage {

    async login(username, password) {
        await this.typeText(loginElement.userNameInput, username)
        await this.typeText(loginElement.passwordInput, password)
    }
    
}
