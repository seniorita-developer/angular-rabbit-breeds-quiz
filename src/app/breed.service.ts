import { Injectable } from '@angular/core';
import { Breed } from './breed';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BreedService {
  //breeds: Breed[] = [];

  constructor(private httpClient: HttpClient){}


    getBreeds(): Observable<Breed[]> {
      let results = this.httpClient
      .get<Breed[]>("https://rabbit-breed-api.herokuapp.com/breeds-with-images/");

      return results.pipe(map(data => _.values(data)));
    } 
  }