import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuController, ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../core/services/api.service';
import { FunctionService } from '../core/services/function.service';
import { AddTaskComponent } from './add-task/add-task.component';
import { monthArray } from './data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {

  monthArray: {[key: string]: any}= monthArray;
  lists: any[] = [];
  showInput = false;
  calenderArray=[];
  today;
  startCol;
  lastCol;
  lastSundayDate;
  todayData={
      isTaskDone: true,
      date: 'Wed Sep 01 2021',
      task: [
        {
          name: 'exercise',
          status: true,
        },
        {
          name: 'Bath',
          status: false,
        },
        {
          name: 'coding',
          status: true,
        },
      ]
    };
  constructor(
    private functionService: FunctionService,
    public toastController: ToastController,
    public modalController: ModalController,
  ) { }

  ngOnInit(){
    this.presentToast();
    this.calenderArray= this.functionService.getCalender();
    this.today = this.functionService.today;
    this.startCol = this.functionService.startCol;
    this.lastSundayDate = this.functionService.lastSundayDate;
    this.lastCol = this.functionService.lastCol;
    this.onGetTasks();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your',
      duration: 2000,
      position: 'top',
      cssClass: 'reward-toast'
    });
    toast.present();
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

  showType(date){
    const d= new Date(this.today.getFullYear(), this.today.getMonth(), date);
    const dateName = this.functionService.changeToKey(d.toDateString());
    if(this.monthArray.hasOwnProperty(dateName) && this.monthArray[dateName].isTaskDone){
      return 'success';
    }
    if(d.toDateString() === this.today.toDateString()){
      return 'today';
    }
    if(this.monthArray.hasOwnProperty(dateName) && !this.monthArray[dateName].isTaskDone){
      return 'fail';
    }
    return 'number';

  }

  addTask(){
    this.presentTaskModal();
  }

  onGetTasks(){
    this.lists = this.todayData.task;
  }
  statusChange(){
    //logic for update in db

  }

}
