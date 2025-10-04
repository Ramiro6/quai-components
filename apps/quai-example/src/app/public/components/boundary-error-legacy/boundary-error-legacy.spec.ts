import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoundaryErrorLegacy } from './boundary-error-legacy';

describe('BoundaryErrorLegacy', () => {
  let component: BoundaryErrorLegacy;
  let fixture: ComponentFixture<BoundaryErrorLegacy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoundaryErrorLegacy],
    }).compileComponents();

    fixture = TestBed.createComponent(BoundaryErrorLegacy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
