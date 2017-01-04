import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Row } from './row';
//import { Rowprogress } from './rowprogress';
import { RowService } from './row.service';
//import { InlineEditorDirectives } from 'ng2-inline-editor';

@Component({
  //moduleId: module.id,
  selector: 'my-rows',
  templateUrl: 'rows.component.html',
  styleUrls: ['rows.component.css']
})
export class RowsComponent implements OnInit {
  rows: Row[];
  progress: Row[];
  selectedRow: Row;

  constructor(private rowService: RowService){}

  getRows(): void {
    console.log("Rows Start");
    this.rowService
      .getRows()
      .then(rows => this.rows = rows);
      console.log("Rows End");
  }

  getProgress(): void {
    console.log("Progress Start");
    let instance: RowsComponent = this;
    this.rowService
      .getProgress()
      .then(progress => {
        this.progress = progress;
        //console.log("Inside Progress Success");
        for(let prg of progress){
          //Per ogni elemento di progress, cerco il rispettivo in rows e aggiorno il valore di progress.
          this.rows.filter(item => item.id === prg.id)[0].progress = prg.progress;
        }
      });
      console.log("Progress End");
  }

  ngOnInit(): void {
    this.getRows();
    this.getProgress();
  }

  onSelect(row: Row): void {
    this.selectedRow = row;
  }

  add(wbscode: string): void {
    wbscode = wbscode.trim();
    if(!wbscode) {return;}
    this.rowService.create(wbscode)
      .then(row => {
        this.rows.push(row);
        this.selectedRow = null;
      });
  }

  saveEditable(value) {
    // call to http server
    console.log('http.server: ' + value);
  }

  disable(row: Row): void {
    console.log('Disable row with id: ' + row.id);
    row.enabled = false;
    this.rowService
      .disable(row.id)
      .then();
  }

  enable(row: Row): void {
    console.log('Enable row with id: ' + row.id);
    row.enabled = true;
    this.rowService
      .enable(row.id)
      .then();
  }

  /*delete(row: Row): void {
    this.rowService
      .delete(row.id)
      .then(() => {
        this.rows = this.rows.filter(h => h !== row);
        if (this.selectedRow === row) { this.selectedRow = null; }
      });
  }*/

}
