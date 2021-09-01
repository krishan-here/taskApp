import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService{

  constructor(
    private http: HttpClient
  ){}

  createTask(task: string){
    return this.http.post('https://taskapp-fed58-default-rtdb.firebaseio.com/alltasks.json',{
      task,
      status: false,
    });
  }

  getTasks(){
    return this.http.get('https://taskapp-fed58-default-rtdb.firebaseio.com/alltasks.json')
    .pipe(map((res)=>{
      const taskArray: Array<any>=[];
      for(const item in res){
        if(res.hasOwnProperty(item)){
          taskArray.push(res[item]);
        }
      }
      return taskArray;
    }));
  }
}
