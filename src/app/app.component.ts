import { Component, OnInit } from '@angular/core';
import { Row } from './row';
import { RowService } from './row.service';
//import { NgSwitch } from '@angular/directives';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RowService]
})
export class AppComponent implements OnInit {

  title = 'PM TABLE';
  selectedRow: Row;

  constructor(private rowService: RowService){}

  getRows(): void{
    console.log("component start rows")
  //  this.rowService.getRows().then(rows => this.rows = rows);
  }

  getProgress(): void{
    console.log("component start progress")
  //  this.rowService.getProgress().then(progress => this.progress = progress);
  }

  ngOnInit(): void {
  //  this.getRows();
  //  this.getProgress();
  }

  onSelect(row: Row): void {
    this.selectedRow = row;
  }

  fnErrorLength = function () {
   alert('This is a custom error!');
 };

}
