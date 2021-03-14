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
  guessed: Boolean;
  counter: number;
  score: number;
  fluffNotRepeated: Array<any>;
  breedIdsSkipped: Array<number>;

  constructor(private breedService: BreedService) { }

  ngOnInit() {
    this.breedService.getBreeds().subscribe(data => {
      this.breedIdsSkipped = [6, 8, 13, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 31, 32, 34, 40,43, 47, 48, 61, 64, 66, 69, 70, 71, 74, 75, 78, 83, 84];
      this.breedIdsSkipped.forEach(itemId => {
        let toDelete = data.findIndex(breed => breed.breed_id == itemId);
        data.splice(toDelete, 1);
      });
      this.breeds = data;
      this.counter = 0;
      this.score = 0;
      this.fluffNotRepeated = [];
      this.generateQuestion();
      if (data) {hideShowElement("spinner", "none")}
      if (!data) {
        hideShowElement("random-fluff-image", "none");
      }
      else {
        hideShowElement("random-fluff-image", "block")
      }
    });
    function hideShowElement(elementId: string, style: string) {
      document.getElementById(elementId).style.display = style;
    }
  }


  generateQuestion(): void {
    this.selectedBreedOpt = undefined;

    // check if breed is not repeated
    do {
      var tempFluff = this.breeds[Math.floor(Math.random() * this.breeds.length)]
    } while (this.fluffNotRepeated.some(e => e.breed_id === tempFluff.breed_id))

    this.fluffNotRepeated.push(tempFluff);
    tempFluff["name"] = tempFluff.name.split(/See|Originally|Also|Not/)[0];
    this.randomFluff = tempFluff;
    // array of possible answers
    let breedOptions = Array<Breed>();
    breedOptions.push(this.randomFluff);

    // generate 3 additional random breeds
    while (breedOptions.length < 4) {
      let tempBreed = this.breeds[Math.floor(Math.random() * this.breeds.length)];
      if (!breedOptions.some(e => e.breed_id === tempBreed.breed_id)) {
        tempBreed["name"] = tempBreed.name.split(/See|Originally|Also|Not/)[0];
        breedOptions.push(tempBreed);
      }
    }

    this.breedOptions = this.shuffleBreedOptions(breedOptions);
    this.counter++;
  }


  onSelect(breed: Breed): void {
    this.selectedBreedOpt = breed;
    if (this.selectedBreedOpt.breed_id == this.randomFluff.breed_id) {
      this.message = "You guessed right! It is " + this.randomFluff.name.split(/See|Originally|Also|Not/)[0].toUpperCase();
      this.guessed = true;
      this.score++;
    } else {
      this.message = "Oh no :( It is not " + this.selectedBreedOpt.name.split(/See|Originally|Also|Not/)[0] + ". Right answer - " + this.randomFluff.name.split(/See|Originally|Also|Not/)[0].toUpperCase();
      this.guessed = false;
    }
  }

  shuffleBreedOptions(array: Array<Breed>) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

}
