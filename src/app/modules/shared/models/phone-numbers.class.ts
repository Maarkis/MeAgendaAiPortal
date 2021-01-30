import {FormBuilder, FormControl, Validators} from '@angular/forms';

export class PhoneNumbers {
    public nameContact: string;
    public countryCode: number;
    public ddd: number;
    public number: string;

    public static createFormBuilderPhoneNumbers(fb: FormBuilder, phoneNumbers: PhoneNumbers) {
        return fb.group({
            countryCode: new FormControl(phoneNumbers.countryCode = 55, [Validators.required]),
            ddd: new FormControl(phoneNumbers.ddd, [Validators.required]),
            nameContact: new FormControl(phoneNumbers.nameContact = '', []),
            number: new FormControl(phoneNumbers.number, [Validators.required]),
        });
    }
}
