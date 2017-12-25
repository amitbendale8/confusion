import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
import {PROMOTIONS} from '../shared/promotions';

@Injectable()
export class PromotionService {

  constructor() { }

  public getPromotions(): Promotion[]{
    return PROMOTIONS;
  }

  getPromotion(id: number): Promotion{
    return PROMOTIONS.filter((promotion) => (promotion.id === id))[0];
  }

  getFeatuedPromotion(): Promotion{

    return PROMOTIONS.filter((promotion) => (promotion.featured === true))[0];
  }

}
