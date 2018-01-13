import * as React from 'react';
import { Context, ThemeStyle, TeamsComponentContext, ConnectedComponent, Panel, PanelBody } from 'msteams-ui-components-react';
import { AuthenticationConfig } from 'ef.lms365';
import { Loading } from './loading';
import { LoginButton } from './login-button';
import { Helper } from '../infrastructure/helper';

enum UserAuthenticationStatus {
    Authenticated,
    NotAuthenticated,
    Undefined
}

export interface ViewState {
    userAuthenticationStatus?: UserAuthenticationStatus;
    theme?: ThemeStyle;
}

const themeByName = {
    'contrast': ThemeStyle.HighContrast,
    'dark': ThemeStyle.Dark,
    'default': ThemeStyle.Light
};

export class View<P = any, S extends ViewState = ViewState> extends React.Component<P, S> {
    public constructor(props: any) {
        super(props);

        this.state = { userAuthenticationStatus: UserAuthenticationStatus.Undefined } as any;
    }

    protected initializeMsTeams() {
        const authenticationConfig = AuthenticationConfig.instance;
        const microsoftTeams = (window as any).microsoftTeams;

        microsoftTeams.initialize();
        microsoftTeams.getContext(context => {
            const config = Helper.getAdalConfig(context);

            if (context) {
                window['_spPageContextInfo'] = {
                    currentCultureName: context.locale,
                    currentUICultureName: context.locale
                };
            }

            const authenticationContext = new AuthenticationContext(config);

            authenticationContext.acquireToken(authenticationConfig.resourceId, (error, token) => {
                if (error || !token) {
                    this.setState({ userAuthenticationStatus: UserAuthenticationStatus.NotAuthenticated });
                } else {
                    this.setState({ userAuthenticationStatus: UserAuthenticationStatus.Authenticated });
                }
            });
        });

        microsoftTeams.getContext(context => {
            this.setState({ theme: themeByName[context.theme] || ThemeStyle.Light });
        });
    }

    protected renderContent(context: Context): JSX.Element {
        return this.props.children as any;
    }

    public componentDidMount() {
        this.initializeMsTeams();
    }

    public render(): JSX.Element {
        let content: (contenxt: Context) => JSX.Element = null;

        switch (this.state.userAuthenticationStatus) {
            case UserAuthenticationStatus.Authenticated:
                content = x => this.renderContent(x);
                break;
            case UserAuthenticationStatus.NotAuthenticated:
                content = (x) => <LoginButton context={x} onAuthenticate={() => this.setState({ userAuthenticationStatus: UserAuthenticationStatus.Authenticated })} />;
                break;
        }

        return (
            <div>
                <style>
                    {
                        `
                            body {
                                overflow: auto !important;
                            }
                        `
                    }
                </style>
                {
                    ((this.state.theme != null) && content)
                        ? (
                            <TeamsComponentContext fontSize={16} theme={this.state.theme}>
                                <ConnectedComponent render={(props) => {
                                    return (
                                        <Panel>
                                            <PanelBody>
                                                {content(props.context)}
                                            </PanelBody>
                                        </Panel>
                                    );
                                }} />
                            </TeamsComponentContext>
                        )
                        : <Loading />
                }
            </div>
        );
    }
}