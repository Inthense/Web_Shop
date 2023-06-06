import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnRewardsComponent } from './earn-rewards.component';

describe('EarnRewardsComponent', () => {
  let component: EarnRewardsComponent;
  let fixture: ComponentFixture<EarnRewardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EarnRewardsComponent]
    });
    fixture = TestBed.createComponent(EarnRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
