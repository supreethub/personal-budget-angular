import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  budgetData: Observable<any[]>;

  public budgetArray = [];

  constructor(private http: HttpClient) { }

  fetchData() {
    // var d = this.http.get('http://localhost:3000/budget');
    // return d;


    if (this.budgetArray.length === 0) {
      this.budgetData = this.http.get<any>('http://localhost:3000/budget');
      this.budgetData.subscribe((res) => {
      this.budgetArray = res;
    });
      return this.budgetData;

    }
    else {
      return this.budgetData;
    }

  }
}
