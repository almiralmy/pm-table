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
  costs: Row[];
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
          let item = this.rows.filter(item => item.id === prg.id)[0];
            item.progress = prg.progress;
            item.ev = item.pv * item.progress / 100;
        }
      });
      console.log("Progress End");
  }

  getActualCosts(): void {
    console.log("Actual Costs Start");
    let instance: RowsComponent = this;
    this.rowService
      .getActualCosts()
      .then(costs => {
        this.costs = costs;
        for(let cost of costs){
          let item = this.rows.filter(item => item.id === cost.id)[0];
          if (item != undefined){
            item.ac = cost.ac/8;
            item.cv = item.ev-item.ac;
          }
        }
      });
  }

  calcValues(): void {
    console.log("Calc Values Start");
    let instance: RowsComponent = this;
    console.log(this.rows);
    for(let r of this.rows){
      r.ev = r.pv * r.progress / 100;
      r.cv = r.ev - r.ac;
    }
  }

  ngOnInit(): void {
    this.getRows();
    this.getProgress();
    this.getActualCosts();
  }

  onSelect(row: Row): void {
    this.selectedRow = row;
  }

  recalcValues(row: Row): void {
    row.ev = row.pv * row.progress / 100;
    row.cv = row.ev - row.ac;
  }

  /*updateRow(row: Row): void {
    this.rowService
      .updateRow(row)
      .then(row => row);
  }*/

  add(wbscode: string): void {
    wbscode = wbscode.trim();
    if(!wbscode) {return;}
    //calcolo id
    let biggerIndex = this.rows[0].id;
    for(let r of this.rows){
      if(r.id > biggerIndex){
        biggerIndex = r.id;
      }
    }
    //console.log(biggerIndex);
    let newRow = new Row();

    newRow.id = biggerIndex+1;
    newRow.wbscode = wbscode;
    newRow.enabled = true;
    newRow.pv=0;
    newRow.progress=0;
    newRow.ev=0;
    newRow.ac=0;
    newRow.cv=0;


    this.rows.push(newRow);
    this.getActualCosts();

    //this.rowService.create(wbscode)
      //.then(row => {
      //  this.rows.push(row);
      //  this.selectedRow = null;
      //});
  }

  saveEditable(value) {
    // call to http server
    console.log('http.server: ' + value);
  }

  disable(row: Row): void {
    console.log('Disable row with id: ' + row.id);
    row.enabled = false;
    //this.rowService
    //  .disable(row.id)
    //  .then();
  }

  enable(row: Row): void {
    console.log('Enable row with id: ' + row.id);
    row.enabled = true;
    //this.rowService
    //  .enable(row.id)
    //  .then();
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
