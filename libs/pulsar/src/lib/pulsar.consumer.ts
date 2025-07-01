import { Consumer, Message } from 'pulsar-client';
import { PulsarClient } from './pulsar.client';
import { deserialize } from './serialize';
import { Logger } from '@nestjs/common';

export abstract class PulsarConsumer<T> {
	private consumer!: Consumer;
	protected readonly logger = new Logger(PulsarConsumer.name);

	constructor(
		private readonly pulsarClient: PulsarClient,
		private readonly topic: string
	) {}

	async onModuleInit() {
		this.consumer = await this.pulsarClient.createConsumer(
			this.topic,
			this.listener.bind(this)
		);
	}

	private async listener(message: Message) {
		try {
			const data = deserialize<T>(message.getData());
			this.logger.debug(`Received message: ${JSON.stringify(data)}`);
			await this.onMessage(data);
		} catch (err) {
			this.logger.error(err);
		} finally {
			await this.consumer.acknowledge(message);
		}
	}

	protected abstract onMessage(message: T): Promise<void>;
}
