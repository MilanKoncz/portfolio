import type { LoaderFunction as RRLoaderFunction, MetaFunction as RRMetaFunction } from "react-router";

export namespace Route {
    export interface MetaArgs {
        [key: string]: any;
    }

    export type LoaderFunction = RRLoaderFunction;
    export type MetaFunction = RRMetaFunction;
}
