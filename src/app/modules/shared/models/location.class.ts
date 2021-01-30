import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

export class Location {
    public name: string;
    public country: string;
    public state: string;
    public city: string;
    public neighbourhood: string;
    public street: string;
    public numberComplement: string;
    public cep: string;


    public static createFormBuilderLocation(fb: FormBuilder, location: Location): FormGroup {
        return fb.group({
            cep: new FormControl(location.cep, [Validators.required]),
            name: new FormControl(location.name, [Validators.required]),
            country: new FormControl(location.country, [Validators.required]),
            state: new FormControl(location.state, [Validators.required]),
            city: new FormControl(location.city, [Validators.required]),
            neighbourhood: new FormControl(location.neighbourhood, [Validators.required]),
            street: new FormControl(location.street, [Validators.required]),
            numberComplement: new FormControl(location.numberComplement, [])
        });
    }
}
