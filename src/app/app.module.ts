import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';


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

import { AppComponent } from './app.component';
import { HangmanDashboardComponent } from './containers/hangman-dashboard/hangman-dashboard.component';
import { FolkComponent } from './components/folk/folk.component';

@NgModule({
  declarations: [
    AppComponent,
    HangmanDashboardComponent,
    FolkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
