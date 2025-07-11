import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsLookupComponent } from './sms-lookup.component';

describe('SmsLookupComponent', () => {
  let component: SmsLookupComponent;
  let fixture: ComponentFixture<SmsLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmsLookupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
