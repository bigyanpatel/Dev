import { Injectable } from '@nestjs/common';

import { AuthProvider, User } from '../shared';

@Injectable()
export class UsersService {
	// let users : User;
	async findUser(userId: string, provider: AuthProvider): Promise<User> {
		// TODO Perform database lookup to extract more information about the user
		// orUser to create the user if the UserId is unknown to us.
		// For now, we'll skip this and always return the same dummy user, regardless of the `userId`.
		
		return {
			id: '123',
			provider,
			providerId: '222',
			displayName: 'bigyan',
			emailId: 'bigyanapatel@gmail.com',
			password: 'bigyan20'
		};
	}
}
