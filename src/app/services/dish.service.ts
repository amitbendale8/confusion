import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import {DISHES } from '../shared/dishes';

@Injectable()
export class DishService {

  constructor() { }

  public getDishes(): Promise<Dish[]>{
    return Promise.resolve(DISHES);
  }

  getDish(id: number): Promise<Dish>{
    return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  }

  getFeatuedDish(): Promise<Dish>{

    return Promise.resolve(DISHES.filter((dish) => (dish.featured === true))[0]);
  }

}
