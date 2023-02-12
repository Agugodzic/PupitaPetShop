import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoMiniaturaComponent } from './producto-miniatura.component';

describe('ProductoMiniaturaComponent', () => {
  let component: ProductoMiniaturaComponent;
  let fixture: ComponentFixture<ProductoMiniaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoMiniaturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoMiniaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
