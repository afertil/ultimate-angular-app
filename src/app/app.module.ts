import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { Store } from '../store';

// Feature modules
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';

// Containers
import { AppComponent } from './app.component';

// Components
import { AppHeaderComponent } from './shared/app-header/app-header.component';
import { AppNavComponent } from './shared/app-nav/app-nav.component';

// Routes
export const ROUTES: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppNavComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthModule,
    HealthModule
  ],
  providers: [
    Store
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
