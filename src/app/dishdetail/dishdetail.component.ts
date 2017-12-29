import { Component, OnInit,Input,Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location }from '@angular/common';

import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Comment } from '../shared/comment';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds : number[];
  prev: number;
  next: number;
  commentForm: FormGroup;
  comment: Comment;

  formErrors = {
    'author' : '',
    
  }

  validationMessages = {
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.',
      'maxlength':     'Author cannot be more than 25 characters long.'
    }
  };

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) { 
      this.createCommentForm();
    }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.
    switchMap((params: Params) => this.dishservice.getDish(+params['id'])).
    subscribe(dish => { this.dish = dish;
                        this.setPrevNext(dish.id) });
    // this.dishservice.getDish(id).
    // subscribe(dish => this.dish = dish);
  }

  setPrevNext(dishId : number){
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)% this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)% this.dishIds.length];
  }

  goBack(): void{
    this.location.back();
  }

  createCommentForm(){
    this.commentForm = this.fb.group({
      author : ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: '',
      comment: '',
      date: ''
    });

    this.commentForm.valueChanges.
    subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onCommentSubmit(){
    var currentDate: Date;
    this.comment = this.commentForm.value;
    currentDate = new Date();
    this.comment.date = currentDate.toString();
    if(this.dish.comments){
      this.dish.comments.push(this.comment)
    }
    //console.log(this.feedback);
    this.commentForm.reset({
      author: '',
      rating: 1,
      comment: '',
      date: ''
      
    });
  }

  
}

