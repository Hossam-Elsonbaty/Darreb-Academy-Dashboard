import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cousres } from './cousres';

describe('Cousres', () => {
  let component: Cousres;
  let fixture: ComponentFixture<Cousres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cousres]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cousres);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
