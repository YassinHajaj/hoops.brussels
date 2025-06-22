import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { LandingComponent } from './components/landing/landing.component';
import { MapPageComponent } from './components/map-page/map-page.component';
import { CourtService } from './services/court.service';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'map', component: MapPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LandingComponent,
    MapPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [CourtService],
  bootstrap: [AppComponent]
})
export class AppModule { }