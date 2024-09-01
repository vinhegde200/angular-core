import { AbstractControl, ValidationErrors } from "@angular/forms";

export function noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    const isSpace = (control.value || '').match(/\s/g);
    return isSpace ? {'whitespace': true} : null;
}