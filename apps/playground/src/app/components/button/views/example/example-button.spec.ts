import { ExampleButton } from './example-button';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('Button', () => {
  let component: ExampleButton;
  let fixture: ComponentFixture<ExampleButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleButton],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
