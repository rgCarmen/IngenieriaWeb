import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalHistoryComponent } from './clinical-history.component';

describe('ClinicalHistoryComponent', () => {
  let component: ClinicalHistoryComponent;
  let fixture: ComponentFixture<ClinicalHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClinicalHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
