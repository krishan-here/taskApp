import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionService{
  today;
  startCol;
  lastCol;
  lastSundayDate;

  constructor(){}

  changeToKey(str: string){
    str=str.replaceAll(' ','');
    str = str.charAt(0).toLowerCase() + str.slice(1);
    return str;
  }


  getCalender(){
    this.today = new Date();
    const dayOne = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    this.startCol = dayOne.getDay();
    const lastDate = new Date(this.today.getFullYear(), this.today.getMonth()+1, 0);
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
