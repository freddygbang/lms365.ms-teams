import * as React from 'react';
import { Context, PrimaryButton } from 'msteams-ui-components-react';

interface LoginButtonProps {
    context: Context;

    onAuthenticate: () => void;
}

export class LoginButton extends React.Component<LoginButtonProps, any> {
    public constructor(props: any) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    private handleClick() {
        const microsoftTeams = (window as any).microsoftTeams;

        microsoftTeams.authentication.authenticate({
            height: 400,
            failureCallback: (err) => {
                alert('Error: ' + err);
                console.log(err);
            },
            successCallback: this.props.onAuthenticate,
            url: '/SignIn',
            width: 400
        });
    }

    public render(): JSX.Element {
        const { rem, font } = this.props.context;
        const { sizes } = font;
        const styles = {
            section: {...sizes.title2, marginTop: rem(1.4), marginBottom: rem(1.4)}
        };

        return (
            <div>
                <div style={styles.section}>You are not signed in LMS 365</div>
                <PrimaryButton onClick={this.handleClick}>Sign in</PrimaryButton>
            </div>
        );
    }
}