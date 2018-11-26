import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { StoreModule, MetaReducer, ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { reducers } from '../../../store';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['auth'], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugEl: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducers, { metaReducers })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugEl = fixture.debugElement.query(By.css('form'));
    el = debugEl.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit method', () => {
    spyOn(component, 'onSubmit');
    component.authForm.controls['email'].setValue('test@email.com');
    component.authForm.controls['password'].setValue('asdfsfsdfaasdf');
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button')).nativeElement;
    btn.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should be invalid if email and password are null', () => {
    expect(component.authForm.invalid).toBeTruthy();
  });

  it('should be invalid if email and password are filled in', () => {
    component.authForm.controls['email'].setValue('test@email.com');
    component.authForm.controls['password'].setValue('asdfsfsdfaasdf');
    fixture.detectChanges();
    expect(component.authForm.valid).toBeTruthy();
  });

  it('submit button should be disabled if form is invalid', () => {
    const btn = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(component.authForm.invalid && btn.disabled).toBeTruthy();
  });

  it('submit button should be enabled if form is valid', () => {
    component.authForm.controls['email'].setValue('test@email.com');
    component.authForm.controls['password'].setValue('asdfsfsdfaasdf');
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(component.authForm.valid && !btn.disabled).toBeTruthy();
  });
});
