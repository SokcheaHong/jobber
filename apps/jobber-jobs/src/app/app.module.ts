import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { JobsModule } from './jobs.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		JobsModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			context: ({ req, res }) => ({ req, res }),
			autoSchemaFile: true,
			playground: {
				settings: {
					'request.credentials': 'include',
				},
			},
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
