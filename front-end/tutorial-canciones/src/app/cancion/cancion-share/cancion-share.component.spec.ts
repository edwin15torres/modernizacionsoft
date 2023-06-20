import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancionShareComponent } from './cancion-share.component';

describe('CancionShareComponent', () => {
  let component: CancionShareComponent;
  let fixture: ComponentFixture<CancionShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancionShareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancionShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
