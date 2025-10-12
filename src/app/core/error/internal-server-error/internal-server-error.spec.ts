import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalServerError } from './internal-server-error';

describe('InternalServerError', () => {
  let component: InternalServerError;
  let fixture: ComponentFixture<InternalServerError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalServerError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalServerError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
