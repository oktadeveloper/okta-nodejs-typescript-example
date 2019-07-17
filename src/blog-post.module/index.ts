import { Module } from '@nestjs/common';
import { BlogPostController } from './blog-post-controller';

@Module({
  controllers: [BlogPostController],
})
export class BlogPostModule {
}
