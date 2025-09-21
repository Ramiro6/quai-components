import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuaiBoundaryError } from './quai-boundary-error';

describe('QuaiBoundaryError', () => {
  let component: QuaiBoundaryError;
  let fixture: ComponentFixture<QuaiBoundaryError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuaiBoundaryError],
    }).compileComponents();

    fixture = TestBed.createComponent(QuaiBoundaryError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
