import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/shared/config.service';
import { WebClient, WebAPICallResult, ErrorCode} from '@slack/web-api';
import { RollbarHandler } from 'nestjs-rollbar';
import axios from "axios";

@Injectable()
export class SlackService {
    private _clientId: string;
    private _clientSecret: string;
    private _webClient: WebClient;

    constructor(private _configService: ConfigService) {
        this._webClient = new WebClient();
        this._clientId = this._configService.get('SLACK_CLIENT_ID');
        this._clientSecret = this._configService.get('SLACK_CLIENT_SECRET');
    }

    @RollbarHandler()
    async oauthAccess(
        code: string,
        redirectUri: string,
    ): Promise<WebAPICallResult> {
        const data = {
            code: code,
            client_id: this._clientId,
            client_secret: this._clientSecret,
            redirect_uri: redirectUri,
        };
        let response;
        try {
            response = await this._webClient.oauth.v2.access(data);
        } catch (error) {
            if (error.code === ErrorCode.PlatformError) {
                response = error.data;
            } else {
                throw new Error(error);
            }
        }

        return response;
    }

    initSlackCommand(boltApp: any): void {
        
        boltApp.command('/hello', async({command,ack,respond}) => {
            await ack();
            await respond("Hii👋");
        });
        boltApp.command('/repo', async({command,ack,respond}) => {
            await ack();
            if(command.text == 'connect'){
                await respond('User is tring to connect Github');
            } else if(command.text.includes("create ")){
                await respond(`User is trying to create a repo`);
            }
            
        });
    } 

    
}
