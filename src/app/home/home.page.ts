import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../core/services/api.service';
import { AddTaskComponent } from './add-task/add-task.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  lists: any[] = [];
  showInput = false;
  calenderArray=[];
  startCol;
  lastCol;
  lastSundayDate;
  constructor(
    private apiService: ApiService,
    public modalController: ModalController,
  ) { }

  ngOnInit(){
    this.calenderArray= this.getCalender();
    this.onGetTasks();
  }
  async presentTaskModal() {
    const modal = await this.modalController.create({
      component: AddTaskComponent,
      cssClass: 'task_modal',
      mode: 'ios',
      swipeToClose: true
    });
    modal.onDidDismiss().then(()=>{
      this.onGetTasks();
    });
    return await modal.present();
  }

  addTask(){
    this.presentTaskModal();
  }

  onGetTasks(){
    this.apiService.getTasks().subscribe({
      next: (res) => this.lists = res,
      error: (err)=> console.log(err)
    });
  }

  getCalender(){
    const today = new Date();
    const dayOne = new Date(today.getFullYear(), today.getMonth(), 1);
    this.startCol = dayOne.getDay();
    const lastDate = new Date(today.getFullYear(), today.getMonth()+1, 0);
    this.lastCol = lastDate.getDay();
    const array=[];
    let i=7 - this.startCol + 1;
    while(i<=lastDate.getDate()){
      array.push(i);
      i+=7;
    }
    this.lastSundayDate = array.pop();
    return array;

  }
}
