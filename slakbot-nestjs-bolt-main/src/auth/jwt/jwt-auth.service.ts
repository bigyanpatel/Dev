import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload, User } from '../../shared';

@Injectable()
export class JwtAuthService {
	constructor(private jwtService: JwtService) {}

	login(user: User) {
		const { id, displayName, emailId, password } = user;
		const payload: JwtPayload = {
			sub: id,
			displayName,
			email: emailId,
			password : password
		};

		return {
			accessToken: this.jwtService.sign(payload),
		};
	}
}
