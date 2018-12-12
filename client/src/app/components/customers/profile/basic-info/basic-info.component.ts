import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  @Input() user: User;
  @Output() emitSubmit = new EventEmitter<User>();
  basicInfoForm: FormGroup;
  title = 'Basic Information';
  ngOnInit() {
    this.createForm();
  }
  get form() {
    return this.basicInfoForm.controls;
  }
  createForm(): void {
    this.basicInfoForm = this.fb.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      email: [
        { value: this.user.email, disabled: true },
        [Validators.required, Validators.email]
      ]
    });
  }
  onSubmit({ value, valid }: { value: User; valid: boolean }) {
    if (valid) {
      // Email is disabled ... we might have to revisit this
      this.emitSubmit.next(this.basicInfoForm.getRawValue());
    }
  }
}
