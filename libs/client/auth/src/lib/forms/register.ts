import {
  FormGroup,
  Validators,
  FormControl,
  AbstractControlOptions,
} from '@angular/forms';

export class RegisterForm extends FormGroup<{
  username: FormControl<string | null>;
  password: FormControl<string | null>;
  email: FormControl<string | null>;
}> {
  constructor(validatorOrOpts?: AbstractControlOptions) {
    super(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.pattern(/[A-Za-z0-9]/),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
      },
      validatorOrOpts
    );
  }
}
