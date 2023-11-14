/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_DEV_MODE: boolean;
	readonly VITE_BASE_URL: string;
}

interface ImportMeta {
	readonly meta: ImportMetaEnv;
}

