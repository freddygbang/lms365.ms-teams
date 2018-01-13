import * as React from 'react';
import { Context, Input, Radiobutton, RadiobuttonGroup, ThemeStyle } from 'msteams-ui-components-react';
import { View } from './view';

enum ViewType {
    Course,
    CourseCatalog,
    Dashboard
}

export interface TabConfigurationState {
    theme?: ThemeStyle;
    url?: string;
    viewType?: ViewType;
}

const viewPropsByViewType = {
    [ViewType.Course]: { key: 'course', title: 'Course' },
    [ViewType.CourseCatalog]: { key: 'course-catalog', title: 'Course Catalog' },
    [ViewType.Dashboard]: { key: 'dashboard', title: 'Dashboard' },
};

export class TabConfigurationView extends View<any, TabConfigurationState> {
    public constructor(props: any) {
        super(props);

        this.state = {
            theme: ThemeStyle.Light,
            viewType: ViewType.Dashboard
        };
    }

    private renderInputSection(styles: any): JSX.Element[] {
        return this.state.viewType != ViewType.Dashboard
             ? [
                <div style={styles.section}>Site url:</div>,
                <Input onChange={x => this.setState({ url: x.target.value })} placeholder="Site url" style={styles.input} value={this.state.url} />
            ]
            : null;
    }

    private renderRadioButton(viewType: ViewType): JSX.Element {
        const viewProps = viewPropsByViewType[viewType];

        return <Radiobutton label={viewProps.title} onSelected={() => this.setState({ viewType: viewType })} selected={this.state.viewType == viewType} value={viewType} />;
    }

    protected initializeMsTeams() {
        super.initializeMsTeams();

        const microsoftTeams = (window as any).microsoftTeams;

        microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
            const viewType = this.state.viewType;
            const webUrl = this.state.url;

            if ((viewType != ViewType.Dashboard) && !webUrl) {
                saveEvent.notifyFailure();
            } else {
                const viewProps = viewPropsByViewType[viewType];

                microsoftTeams.settings.setSettings({
                    entityId: `lms365${viewProps.key}${encodeURIComponent(webUrl)}`,
                    contentUrl: `${document.location.origin}/Tab?view=${viewProps.key}&webUrl=${encodeURIComponent(webUrl)}`,
                    suggestedDisplayName: `LMS365 ${viewProps.title}`
                });
            }

            saveEvent.notifySuccess();
        });

        microsoftTeams.settings.setValidityState(true);
    }

    protected renderContent(context: Context): JSX.Element {
        const { rem, font } = context;
        const { sizes } = font;
        const styles = {
            section: {...sizes.title2, marginTop: rem(1.4), marginBottom: rem(1.4)}
        };

        return (
            <div>
                <div style={styles.section}>View:</div>
                <RadiobuttonGroup>
                    {this.renderRadioButton(ViewType.Dashboard)}
                    {this.renderRadioButton(ViewType.CourseCatalog)}
                    {this.renderRadioButton(ViewType.Course)}
                </RadiobuttonGroup>

                {this.renderInputSection(styles)}
            </div>
        );
    }
}