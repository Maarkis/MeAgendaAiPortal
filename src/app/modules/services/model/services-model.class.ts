import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

export class ServicesModel {
    public name: string;
    public durationMinutes: number;


    public static createFormBuildeServicesModel(fb: FormBuilder, services: ServicesModel): FormGroup {
        return fb.group({
            name: new FormControl(services.name, [Validators.required]),
            durationMinutes: new FormControl(services.durationMinutes, [
                Validators.required,
                Validators.min(1)
            ])
        });
    }
}
