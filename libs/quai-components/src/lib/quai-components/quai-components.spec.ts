import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuaiComponents } from './quai-components';

describe('QuaiComponents', () => {
  let component: QuaiComponents;
  let fixture: ComponentFixture<QuaiComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuaiComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(QuaiComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
