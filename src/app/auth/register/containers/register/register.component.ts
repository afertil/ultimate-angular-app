import { Component } from '@angular/core';

@Component({
    selector: 'app-register',
    template: `
        <div>
            Register
            <app-auth-form>
                <h1>Register</h1>
                <a routerLink="/auth/login">Already have an account?</a>
                <button type="submit">
                    Create account
                </button>
            </app-auth-form>
        </div>
    `
})
export class RegisterComponent {
    constructor() {}
}
