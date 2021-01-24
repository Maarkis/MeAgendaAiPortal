import {Component, OnInit} from '@angular/core';
import {DeviceDetectorService, DeviceInfo} from 'ngx-device-detector';
import {DeviceService} from './modules/shared/services/device/device.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Me agenda aí';

    constructor(private deviceService: DeviceService) {
    }
    ngOnInit(): void {
        this.setDevice();
    }

    private setDevice(): void {
        this.deviceService.setDeviceInfo();
    }
}
