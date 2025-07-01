import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Job } from './models/job.model';
import { ExecuteJobInput } from './dto/execute-job.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@jobber/nestjs';
import { JobsService } from './jobs.service';

@Resolver()
export class JobsResolver {
	constructor(private readonly jobsService: JobsService) {}

	@Query(() => [Job], { name: 'jobs' })
	@UseGuards(GqlAuthGuard)
	async getJobs() {
		return this.jobsService.getJobs();
	}

	@Mutation(() => Job)
	@UseGuards(GqlAuthGuard)
	async executeJob(@Args('executeJobInput') executeJobInput: ExecuteJobInput) {
		return this.jobsService.executeJob(
			executeJobInput.name,
			executeJobInput.data
		);
	}
}
