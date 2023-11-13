import { EntityState } from "@reduxjs/toolkit";

export type LoadingStatus = 'idle' | 'loading' | 'refreshing' | 'failed'

export interface UserData {
	id: string;
	name?: string;
	phone?: string;
	email?: string;
	address?:string;
	position_name?:string;
	department?:string;
	hire_date?:string;
}

export interface UserSchema extends EntityState<UserData> {
	error?: string | undefined;
	status: LoadingStatus;
}


