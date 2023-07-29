import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrywebComponent } from './tryweb.component';

describe('TrywebComponent', () => {
  let component: TrywebComponent;
  let fixture: ComponentFixture<TrywebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrywebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrywebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
