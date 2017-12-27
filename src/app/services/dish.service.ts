import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import {DISHES } from '../shared/dishes';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Injectable()
export class DishService {

  constructor() { }

  public getDishes(): Observable<Dish[]>{
    return Observable.of(DISHES).delay(2000);
  }

  public getDish(id: number): Observable<Dish> {
    return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay(2000);
  }

  public getFeaturedDish(): Observable<Dish> {
    //return Observable.of(DISHES.filter((dish) => dish.featured)[0]).delay(2000).toPromise();
    return Observable.of(DISHES.filter((dish) => dish.featured)[0]).delay(2000);
    //return Promise.resolve(DISHES[0]);
    
  }

}
