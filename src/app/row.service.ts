import { Injectable } from '@angular/core';

import { Row } from './row';
import { ROWS } from './mock-rows';

@Injectable()
export class RowService {
  getRows(): Promise<Row[]>{
    return Promise.resolve(ROWS);
  }
}
