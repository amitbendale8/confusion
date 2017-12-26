import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
import {PROMOTIONS} from '../shared/promotions';

@Injectable()
export class PromotionService {

  constructor() { }

  public getPromotions(): Promise<Promotion[]>{
    return Promise.resolve(PROMOTIONS);
  }

  getPromotion(id: number): Promise<Promotion>{
    return Promise.resolve(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]);
  }

  getFeatuedPromotion(): Promise<Promotion>{

    return Promise.resolve(PROMOTIONS.filter((promotion) => (promotion.featured === true))[0]);
  }

}
