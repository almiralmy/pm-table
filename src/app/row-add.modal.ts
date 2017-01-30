import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'row-add',
  templateUrl: './row-add.modal.html'
})
export class RowAddModalComponent implements OnInit {
  @Input() actualrows:Array<Object>;

  constructor() {
  }

  ngOnInit():void {
    console.log(this.actualrows);
  }




}
