import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { InternalServerError } from '../../../../../app/pages/error/internal-server-error/internal-server-error';
import {provideZonelessChangeDetection} from '@angular/core';

describe('InternalServerError', () => {
  let component: InternalServerError;
  let fixture: ComponentFixture<InternalServerError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalServerError],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi())
      ]
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
