import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/app.animation';

import { baseURL } from '../shared/baseurl';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[];

  selectedDish: Dish;

  errMess: string;

  baseURL = baseURL;

  constructor(private DishService: DishService,
    /*@Inject('baseURL') private baseURL*/) { }

  ngOnInit() {
    this.DishService.getDishes().subscribe(dishes => this.dishes = dishes, 
      errMess => this.errMess = <any>errMess);
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

};