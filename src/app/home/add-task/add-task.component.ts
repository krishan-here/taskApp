import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {

  constructor(
    private modalController: ModalController,
    private apiService: ApiService,
  ) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
  saveTask(task){
    this.apiService.createTask(task.value).subscribe({
      next: ()=> this.dismiss(),
      error: (err)=> console.log(err)
    });
  }

}
