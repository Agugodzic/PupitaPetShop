import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadderComponent } from './loadder.component';

describe('LoadderComponent', () => {
  let component: LoadderComponent;
  let fixture: ComponentFixture<LoadderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
