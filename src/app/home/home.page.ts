import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  lists: string[] = ['Exercise', 'Morning Affirmations', 'Breakfast'];
  showInput = false;
  constructor() { }


  addTask(task) {
    this.lists.push(task);
    this.showInput = false;
  }

}
