import type {
    LinksFunction as RouterLinksFunction,
    MetaFunction as RouterMetaFunction,
    LoaderFunction as RouterLoaderFunction,
    ErrorBoundaryProps as RouterErrorBoundaryProps
} from "react-router";

export namespace Route {
    export type LinksFunction = RouterLinksFunction;
    export type MetaFunction = RouterMetaFunction;
    export type LoaderFunction = RouterLoaderFunction;
    export type ErrorBoundaryProps = RouterErrorBoundaryProps;
}
