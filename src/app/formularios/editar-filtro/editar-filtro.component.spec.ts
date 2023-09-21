import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFiltroComponent } from './editar-filtro.component';

describe('EditarFiltroComponent', () => {
  let component: EditarFiltroComponent;
  let fixture: ComponentFixture<EditarFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarFiltroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
