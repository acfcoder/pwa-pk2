import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
 

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonComponent,
  //  ResultadosComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatListModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonToggleModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
