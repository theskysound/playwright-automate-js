import BasePage from "./basePage";

export class Login extends BasePage {

    async login(username, password) {
        await this.typeText('username', username)
        await this.typeText('password', password)
    }
}
