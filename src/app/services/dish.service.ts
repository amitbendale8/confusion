import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import {DISHES } from '../shared/dishes';

@Injectable()
export class DishService {

  constructor() { }

  public getDishes(): Dish[]{
    return DISHES;
  }

  getDish(id: number): Dish{
    return DISHES.filter((dish) => (dish.id === id))[0];
  }

  getFeatuedDish(): Dish{

    return DISHES.filter((dish) => (dish.featured === true))[0];
  }

}
