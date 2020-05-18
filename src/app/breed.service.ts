import { Injectable } from '@angular/core';
import { Breed } from './breed';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BreedService {
  //breeds: Breed[] = [];

  constructor(private httpClient: HttpClient){}

    getBreeds(): Observable<Breed[]> {
      return this.httpClient.get<Breed[]>("assets/rabbit_breeds.json");
    } 
  }