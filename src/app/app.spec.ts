import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { App } from './app';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideNzIcons} from 'ng-zorro-antd/icon';
import {LoginOutline} from '@ant-design/icons-angular/icons';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes),
        provideNzIcons([LoginOutline])
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(App);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   let html = compiled.getHTML();
  //
  //   expect(compiled.title?.toString).toContain('PsyScaleAngular');
  // });
});
