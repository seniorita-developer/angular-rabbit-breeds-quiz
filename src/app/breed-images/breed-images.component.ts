import { Component, OnInit } from '@angular/core';
import { Breed } from '../breed';
import { BreedService } from '../breed.service';

@Component({
  selector: 'app-breed-images',
  templateUrl: './breed-images.component.html',
  styleUrls: ['./breed-images.component.css']
})
export class BreedImagesComponent implements OnInit {
  breeds: Breed[] = [];

  constructor(private breedService: BreedService) { }

  ngOnInit() {
    this.breedService.getBreeds().subscribe(data => {
      this.breeds = data;
    });
  }

}
