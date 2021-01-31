export class ResponseBase <T> {
    constructor(
        public success: boolean,
        public message: string,
        public result: T
    ) {}
}
