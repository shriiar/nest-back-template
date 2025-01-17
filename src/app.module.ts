import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envConfig from './common/config/envConfig';
import { DatabaseModule } from './common/database/database.module';
import { selectEnv } from './common/env/config';
import { UsersModule } from './modules/users/users.module';
import { GlobalLoggerMiddleware } from './middlewares/globalLogger';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: selectEnv(),
			isGlobal: true,
			load: [envConfig],
		}),
		DatabaseModule,
		UsersModule,
	],
	controllers: [],
	providers: [Logger],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(GlobalLoggerMiddleware).forRoutes('*');
	}
}
