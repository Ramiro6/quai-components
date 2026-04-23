import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { QuaiText } from './quai-text';

describe('QuaiText', () => {
  let component: QuaiText;
  let fixture: ComponentFixture<QuaiText>;
  let compiled: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuaiText],
    }).compileComponents();

    fixture = TestBed.createComponent(QuaiText);
    component = fixture.componentInstance;
    compiled = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply text-base class by default', () => {
    const span = compiled.nativeElement.querySelector('span');
    expect(span.classList.contains('quai-text-base')).toBe(true);
  });

  it('should apply correct text size class based on level input', () => {
    fixture.componentRef.setInput('level', 'lg');
    fixture.detectChanges();

    const span = compiled.nativeElement.querySelector('span');
    expect(span.classList.contains('quai-text-lg')).toBe(true);
  });

  it('should apply muted class when muted input is true', () => {
    fixture.componentRef.setInput('muted', true);
    fixture.detectChanges();

    const span = compiled.nativeElement.querySelector('span');
    expect(span.classList.contains('muted')).toBe(true);
  });

  // it('should render ng-content', () => {
  //   fixture.componentRef.instance.level;
  //   compiled.nativeElement.innerHTML = '<quai-text>Test content</quai-text>';
  //   fixture.detectChanges();
  //
  //   const span = compiled.nativeElement.querySelector('span');
  //   expect(span.textContent).toContain('Test content');
  // });
});
