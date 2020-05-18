import { Component, OnInit } from '@angular/core';
import { Breed } from '../breed';
import { BreedService } from '../breed.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  breeds: Breed[] = [];
  randomFluff: Breed;
  breedOptions: Breed[] = [];
  selectedBreedOpt: Breed;
  message: String;

  constructor(private breedService: BreedService) { }

  ngOnInit() {
    this.breedService.getBreeds().subscribe(data => {
      this.breeds = data;
      this.generateQuestion();
    });
  }

  generateQuestion() :void {
    this.selectedBreedOpt = undefined;
    // get random breed
    this.randomFluff = this.breeds[Math.floor(Math.random() * this.breeds.length)];
    // array of possible answers
    let breedOptions = [];
    breedOptions.push(this.randomFluff);

    // generate 3 additional random breeds
    while (breedOptions.length < 4) {
      let tempBreed = this.breeds[Math.floor(Math.random() * this.breeds.length)];
      if (!breedOptions.some(e => e.fields.name === tempBreed.fields.name)) {
        breedOptions.push(tempBreed);
      }
    }

    this.breedOptions = breedOptions;
  }
  
  onSelect(breed: Breed): void {
    this.selectedBreedOpt = breed;
    if (this.selectedBreedOpt.fields.name == this.randomFluff.fields.name) {
      this.message = "You guessed right!";
    } else {
      this.message = "You guessed wrong :( It is " + this.randomFluff.fields.name;
    }
  }

}
