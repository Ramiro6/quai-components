import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentsContainer } from './components-container';

describe('Components', () => {
  let component: ComponentsContainer;
  let fixture: ComponentFixture<ComponentsContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentsContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
