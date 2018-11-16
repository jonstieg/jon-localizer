import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LocalizerDetailsComponent } from './localizer/localizer-details/localizer-details.component';
import { LocalizerListComponent } from './localizer/localizer-list/localizer-list.component';
import { RouterModule, Routes, Router } from '@angular/router';

const appRoutes: Routes = [
  { path: ':id', component: LocalizerListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LocalizerDetailsComponent,
    LocalizerListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
