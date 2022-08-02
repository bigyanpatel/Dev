import { Module } from '@nestjs/common';
import { GithubOauthModule } from 'src/auth/github/github-oauth.module';
import { ConfigService } from 'src/shared/config.service';
import { SlackController } from './slack.controller';
import { SlackService } from './slack.service';

@Module({
  imports:[GithubOauthModule],
  controllers: [SlackController],
  providers:[ConfigService, SlackService]
})
export class SlackModule {}
