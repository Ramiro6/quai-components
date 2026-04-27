import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuaiBoundaryErrorLegacy } from './quai-boundary-error-legacy';

describe('QuaiBoundaryError', () => {
  let component: QuaiBoundaryErrorLegacy;
  let fixture: ComponentFixture<QuaiBoundaryErrorLegacy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuaiBoundaryErrorLegacy],
    }).compileComponents();

    fixture = TestBed.createComponent(QuaiBoundaryErrorLegacy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
