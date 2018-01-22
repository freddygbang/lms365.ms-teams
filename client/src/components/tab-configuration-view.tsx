import * as React from 'react';
import { Context, Input, Radiobutton, RadiobuttonGroup, ThemeStyle, Surface } from 'msteams-ui-components-react';
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
    name?: string;
}

const viewPropsByViewType = {
    [ViewType.Course]: { key: 'course', title: 'Course / Training Plan' },
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

    protected initialize() {
        super.initialize();

        const microsoftTeams = (window as any).microsoftTeams;

        microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
            const viewType = this.state.viewType;
            const webUrl = this.state.url;
            const tabName = this.state.name;

            if (((viewType != ViewType.Dashboard) && !webUrl) || !tabName) {
                saveEvent.notifyFailure();
            } else {
                const viewProps = viewPropsByViewType[viewType];

                let queryParams = viewType == ViewType.Dashboard
                    ? 'LeaderBoard=false&Transcript=false&CoursesEnded=false'
                    : 'webUrl=' + encodeURIComponent(webUrl);

                microsoftTeams.settings.setSettings({
                    entityId: `lms365${viewProps.key}${encodeURIComponent(webUrl)}`,
                    contentUrl: `${document.location.origin}/Tab?view=${viewProps.key}&${queryParams}`,
                    suggestedDisplayName: tabName                    
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
            section: {...sizes.title2, marginTop: rem(1.4), marginBottom: rem(1.4)},
            input: {
                paddingLeft: rem(0.5),
                paddingRight: rem(0.5)                
            },
            surface: { backgroundColor: 'transparent' }
        };

        return (
            <Surface style={styles.surface}>
                <div style={styles.section}>Tab name:</div>
                <Input onChange={x => this.setState({ name: x.target.value })} placeholder="Tab name" style={styles.input} value={this.state.name} />

                <div style={styles.section}>View:</div>
                <RadiobuttonGroup>
                    {this.renderRadioButton(ViewType.Dashboard)}
                    {/* {this.renderRadioButton(ViewType.CourseCatalog)} */}
                    {this.renderRadioButton(ViewType.Course)}
                </RadiobuttonGroup>

                {this.renderInputSection(styles)}
            </Surface>
        );
    }
}