
declare interface RouteWithData<T> {
    Body: T
}

declare interface RouteWithQuery<T> {
    Querystring: T
}

declare interface RouteWithParams<T> {
    Params: T
}

declare interface ReqData<T> {
    data: T
}
