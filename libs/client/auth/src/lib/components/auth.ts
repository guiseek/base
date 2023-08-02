import { Directive, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive()
export abstract class AuthComponent {
  @Output() authSubmit = new EventEmitter();

  abstract form: FormGroup;

  onSubmit() {
    if (this.form.valid) {
      this.authSubmit.emit(this.form.value);
    }
  }
}
