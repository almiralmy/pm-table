import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Row } from './row';
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
  selectedRow: Row;

  constructor(private rowService: RowService){}

  getRows(): void {
    this.rowService
      .getRows()
      .then(rows => this.rows = rows);
  }

  ngOnInit(): void {
    this.getRows();
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
