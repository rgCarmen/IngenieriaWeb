import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAppointmentComponent } from './modify-appointment.component';

describe('ModifyAppointmentComponent', () => {
  let component: ModifyAppointmentComponent;
  let fixture: ComponentFixture<ModifyAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
