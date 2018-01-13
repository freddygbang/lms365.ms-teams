import { AuthenticationConfig, GlobalConfig } from 'ef.lms365';

export class Helper {
    public static getAdalConfig(context: any): adal.Config {
        const apiHost = GlobalConfig.instance.apiHost;
        const authenticationConfig = AuthenticationConfig.instance;

        return {
            cacheLocation: 'localStorage',
            clientId: authenticationConfig.clientId,
            endpoints: {
                'https://graph.microsoft.com': 'https://graph.microsoft.com',
                [apiHost]: authenticationConfig.resourceId
            },
            extraQueryParameter: '&login_hint=' + encodeURIComponent(context.upn),
            instance: 'https://login.microsoftonline.com/',
            postLogoutRedirectUri: window.location.origin,
            redirectUri: window.location.origin + '/SignIn',
            tenant: 'common'
        };
    }
}