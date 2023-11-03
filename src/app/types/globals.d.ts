// declaration.d.ts

 declare module '*.jpg';

declare module "*.svg?react" {
	import * as React from "react";

	const ReactComponent: React.FunctionComponent<
		React.ComponentProps<"svg"> & { title?: string }
	>;

	export default ReactComponent;
}

// declare module '*.png';

declare const _DEV_MODE_: boolean;
declare const _BASE_URL_: string;

type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;
