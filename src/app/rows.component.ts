import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Row } from './row';
//import { Rowprogress } from './rowprogress';
import { RowService } from './row.service';
import { RowAddModalComponent } from './row-add.modal';
//import { InlineEditorDirectives } from 'ng2-inline-editor';
import { RowProgressbarComponent } from './row-progressbar';


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
  totalEV: number;
  totalAC: number;
  totalCV: number;


  constructor(private rowService: RowService){
    rowService.newRowAdded$.subscribe(
      newRow => {
        //var staticModal: any = document.getElementById('staticModal');
        //Gestione aggiunta nuova riga
        let biggerIndex = this.rows[0].id;
        for(let r of this.rows){
          if(r.id > biggerIndex){
            biggerIndex = r.id;
          }
        }
        //console.log(biggerIndex);
        let newRowObject = new Row();

        newRowObject.id = biggerIndex+1;
        newRowObject.wbscode = newRow[0];
        newRowObject.description = newRow[1];
        newRowObject.enabled = true;
        newRowObject.pv=newRow[2];
        newRowObject.progress=newRow[3];
        newRowObject.ev = newRowObject.pv * newRowObject.progress / 100;

        //this.rows.push(newRowObject);
        this.rows.splice(newRow[4]-1, 0, newRowObject);
        this.getActualCosts();
        this.rowService.addedNewRow(this.rows.length);
        //console.log(staticModal);
        //staticModal.preventDefault();
        //staticModal.dialog("close");
      });
  }

  getRows(): Promise<Row[]> {
    console.log("Rows Start 1");
    return this.rowService
      .getRows()
      .then(rows => this.rows = rows);
  }

  getProgress(): Promise<Row[]> {
    console.log("Progress Start");
    let instance: RowsComponent = this;
    return this.rowService
      .getProgress()
      .then(progress => {
        this.progress = progress;
        console.log("Inside Progress Success");
        for(let prg of progress){
          //Per ogni elemento di progress, cerco il rispettivo in rows e aggiorno il valore di progress.
          let item = this.rows.filter(item => item.id === prg.id)[0];
            item.progress = prg.progress;
            item.ev = item.pv * item.progress / 100;
        }
        return progress;
      });
      //console.log("Progress End");
      //return new Promise((resolve) => {
      //  console.log("End Progress Promise");
      //});
  }

  getActualCosts(): void {
    console.log("Actual Costs Start");
    //let instance: RowsComponent = this;
    this.totalEV=0;
    this.totalAC=0;
    this.totalCV=0;
    this.rowService
      .getActualCosts()
      .then(costs => {
        this.costs = costs;
        for(let cost of costs){
          let item = this.rows.filter(item => item.id === cost.id)[0];
          if (item != undefined){
            item.ac = cost.ac/8;
            item.cv = item.ev-item.ac;
            this.totalEV += item.ev;
            this.totalAC += item.ac;
            this.totalCV += item.cv
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
    let RowsComponent = this;

    this.getRows().then((resolve) => {
      this.getProgress().then((resolve) => {
        this.getActualCosts();
        //Usato per passare il numero totale di righe al componente modale
        console.log("Numero righe " + this.rows.length);
        this.rowService.addedNewRow(this.rows.length);
      })
    });
  }

  onSelect(row: Row): void {
    this.selectedRow = row;
  }

  recalcValues(row: Row): void {
      row.ev = row.pv * row.progress / 100;
      row.cv = row.ev - row.ac;
  }

  recalcTotals(rows: Row[]): void {
    console.log('Recalc totals!!');
      this.totalEV = 0;
      this.totalAC = 0;
      this.totalCV = 0;
    for(let r of rows){
        this.totalEV += r.ev;
        this.totalAC += r.ac;
        this.totalCV += r.cv;
    }
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
    /*
    row.ac = row.ac + row.ev;
    this.totalEV -= row.ev;
    this.totalAC += row.ev;
    this.totalCV -= row.ev;
    row.cv = 0 - row.ac;
    */
    //this.rowService
    //  .disable(row.id)
    //  .then();
  }

  enable(row: Row): void {
    console.log('Enable row with id: ' + row.id);
    row.enabled = true;
    /*
    row.ac = row.ac - row.ev;
    row.cv = row.ev - row.ac;
    this.totalEV += row.ev;
    this.totalAC -= row.ev;
    this.totalCV += row.ev;
    */
    //this.rowService
    //  .enable(row.id)
    //  .then();
  }

  cancel(row: Row): void {
    console.log('Cancel row with id: ' + row.id);
    row.enabled = false;
    this.rows.splice(this.rows.indexOf(row),1);
    this.getActualCosts();
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
