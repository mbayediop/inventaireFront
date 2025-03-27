import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModopComponent } from './modop.component';

describe('ModopComponent', () => {
  let component: ModopComponent;
  let fixture: ComponentFixture<ModopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
