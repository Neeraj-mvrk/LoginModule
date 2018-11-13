import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleDataComponent } from './google-data.component';

describe('GoogleDataComponent', () => {
  let component: GoogleDataComponent;
  let fixture: ComponentFixture<GoogleDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
