export class ResponseBase <T> {
    constructor(
        public success: string,
        public result: T
    ) {}
}
