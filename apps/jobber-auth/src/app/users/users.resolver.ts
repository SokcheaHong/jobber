import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { TokenPayload } from '../auth/token-payload.interface';

@Resolver(() => User)
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Mutation(() => User)
	async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
		return this.usersService.createUser(createUserInput);
	}

	@Query(() => [User], { name: 'users' })
	@UseGuards(GqlAuthGuard)
	async getUsers(@CurrentUser() { userId }: TokenPayload) {
		console.log('user id: ' + userId);
		return this.usersService.getUsers();
	}
}
