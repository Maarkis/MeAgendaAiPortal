export class ResponseBase <T> {
    constructor(
        public success: boolean,
        public result: T
    ) {}
}
