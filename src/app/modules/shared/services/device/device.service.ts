import {Injectable} from '@angular/core';
import {DeviceDetectorService, DeviceInfo} from 'ngx-device-detector';

@Injectable({
    providedIn: 'root'
})
export class DeviceService {
    private device: DeviceInfo = null;
    private typeDevice: string = null;

    constructor(private deviceDetectorService: DeviceDetectorService) {
    }

    public setDeviceInfo(): void {
        this.device = this.deviceDetectorService.getDeviceInfo();
        this.typeDevice = this.type;
    }

    public get deviceInfo(): DeviceInfo {
        return this.device = this.deviceDetectorService.getDeviceInfo();
    }

    public get mobile(): boolean { return this.deviceDetectorService.isMobile(); }
    public get desktop(): boolean { return this.deviceDetectorService.isDesktop(); }
    public get tablet(): boolean { return this.deviceDetectorService.isTablet(); }

    public get type(): string {
        if (this.mobile) {
            return 'Type Mobile';
        }
        if (this.tablet) {
            return 'Type Tablet';
        }
        if (this.desktop) {
            return 'Type Desktop';
        }
        return 'Type unknown';
    }


}
