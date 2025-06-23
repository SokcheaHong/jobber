import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { JobsModule } from './jobs/jobs.module';

@Module({
	imports: [
		ConfigModule,
		JobsModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
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
