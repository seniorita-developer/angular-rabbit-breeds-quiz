import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Breed } from './breed';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rabbit-quiz-angular';
  breeds: Breed[] = [];
  quizOn: Boolean = false;
  
  constructor(private httpClient: HttpClient){}
  ngOnInit(){
    this.httpClient.get<Breed[]>("assets/rabbit_breeds.json").subscribe(data =>{
      
      this.breeds = data;
      
    })
  }

  startQuiz() {
    this.quizOn = true;
  }
}
