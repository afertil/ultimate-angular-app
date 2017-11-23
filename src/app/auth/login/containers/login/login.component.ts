import { Component } from '@angular/core';

@Component({
    selector: 'app-login',
    template: `
        <div>
            <app-auth-form>
                <h1>Login</h1>
                <a routerLink="/auth/register">Not registered?</a>
                <button type="submit">
                    Login
                </button>
            </app-auth-form>
        </div>
    `
})
export class LoginComponent {
    constructor() {}
}
