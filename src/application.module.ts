import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import cookieParser from 'cookie-parser';

import { AuthModule } from './auth.module';
import { BlogPostModule } from './blog-post.module';
import { AuthMiddleware } from './auth.module/auth-middleware';
import { UserModule } from './user.module';

@Module({
  imports: [AuthModule, BlogPostModule, UserModule],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(cookieParser(), AuthMiddleware).forRoutes('/');
  }
}
