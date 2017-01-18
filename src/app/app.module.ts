import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ng2-bootstrap/modal';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { RowsComponent } from './rows.component';
import { RowService } from './row.service';
import { RowAddModalComponent} from './row-add.modal';

import { InlineEditorModule } from 'ng2-inline-editor';
import { DragulaModule } from '../assets/ng2-dragula/ng2-dragula'

@NgModule({
  declarations: [
    AppComponent,
    RowsComponent,
    RowAddModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //InMemoryWebApiModule.forRoot(InMemoryDataService),
    InlineEditorModule,
    DragulaModule,
    ModalModule.forRoot()
  ],
  providers: [RowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
