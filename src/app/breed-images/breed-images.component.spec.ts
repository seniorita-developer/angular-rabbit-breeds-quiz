import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedImagesComponent } from './breed-images.component';

describe('BreedImagesComponent', () => {
  let component: BreedImagesComponent;
  let fixture: ComponentFixture<BreedImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreedImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
