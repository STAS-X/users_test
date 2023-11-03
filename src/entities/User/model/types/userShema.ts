import { EntityState } from "@reduxjs/toolkit";

type LoadingStatus = 'idle' | 'loading' | 'failed'

export interface UserData {
	id: string;
	name: string;
	phone: string;
	email: string;
	avatar?: string;
}

export interface UserSchema extends EntityState<UserData> {
	error?: string | undefined;
	status: LoadingStatus;
}


