import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// [TODO] remove unused
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/distinctUntilKeyChanged';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/combineLatest';

// Redux
import { reducers } from './reducers';
import { HangmanEffects } from './hangman.effects';

import { AppComponent } from './app.component';
import { HangmanDashboardComponent } from './containers/hangman-dashboard/hangman-dashboard.component';
import { FolkComponent } from './components/folk/folk.component';
import { HangmanService } from './services/hangman.service';

@NgModule({
  declarations: [
    AppComponent,
    HangmanDashboardComponent,
    FolkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(reducers),
    EffectsModule.run(HangmanEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ],
  exports: [],
  providers: [HangmanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
