import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariarPreciosComponent } from './variar-precios.component';

describe('VariarPreciosComponent', () => {
  let component: VariarPreciosComponent;
  let fixture: ComponentFixture<VariarPreciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariarPreciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariarPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
