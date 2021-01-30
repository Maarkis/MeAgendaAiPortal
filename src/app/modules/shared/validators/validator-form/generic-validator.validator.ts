import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';


export class GenericValidator {
    constructor() {
    }

    static mustMatch(matchingControlName: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const parent = control.parent;
            if (parent) {
                const matchingControl = parent.controls[matchingControlName];
                if (control.errors && !control.errors.mustMatch) {
                    return;
                }

                if (control.value !== matchingControl.value) {
                    return ({ equalValue: true });
                }
            }
            return null;
        };
    }

    static equalControlValue(targetKey: string, toMatchKey: string): ValidatorFn {
        return (group: FormGroup): { [key: string]: any } => {

            const target = group.controls[ targetKey ];
            const toMatch = group.controls[ toMatchKey ];
            if ((target && (target.touched || target.dirty)) && (toMatch && (toMatch.touched || toMatch.dirty))) {

                const isMatch = target.value === toMatch.value;

                // set equal value error on dirty controls
                if (!isMatch && target.valid && toMatch.valid) {
                    toMatch.setErrors({ equalValue: targetKey });
                    const message = targetKey + ' diferente de ' + toMatchKey;
                    return { equalValue: message };
                }

                if (isMatch) {
                    toMatch.setErrors(null);
                }
            }

            return null;
        };
    }

    static isCellPhone(control: AbstractControl): ValidationErrors {
        const cellphone = control.value.replace(/\D+/g, '').replace(' ', '');
        if (cellphone[2] === '9') {
            return;
        } else {
            return ({ isCellPhone: true });
        }
    }

    static isLandlinePhone(control: AbstractControl): ValidationErrors {
        const cellphone = control.value.replace(/\D+/g, '').replace(' ', '');
        if (cellphone[2] !== '9') {
            return;
        } else {
            return ({ isLandlinePhone: true });
        }
    }

    // Verifica validação dos campos
    static verifierValidatorsForm(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(campoControls => {
            const control = formGroup.get(campoControls);
            control.markAsDirty();
            control.markAsTouched();

            if (control instanceof FormGroup) {
                this.verifierValidatorsForm(control);
            }
        });
    }
    //
    // static resetFormControls(formGroup: FormGroup) {
    //     Object.keys(formGroup.controls).forEach(campoControls => {
    //         const control = formGroup.get(campoControls);
    //         if (control instanceof FormArray) {
    //             Object.keys(control.controls).forEach(campoArrayControls => {
    //                 const controlArray = control.get(campoArrayControls);
    //                 if (controlArray) {
    //                     controlArray.setValue(null);
    //
    //                 }
    //             });
    //         }
    //         if (control instanceof FormGroup) {
    //             control.setValue(null);
    //             this.resetFormControls(control);
    //         }
    //
    //     });
    // }


}
