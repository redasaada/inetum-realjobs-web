import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyCreationComponent } from './vacancy-creation.component';

describe('VacancyCreationComponent', () => {
  let component: VacancyCreationComponent;
  let fixture: ComponentFixture<VacancyCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacancyCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
