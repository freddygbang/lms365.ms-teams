import * as React from 'react';
import { View } from './view';
import { Context, Surface } from 'msteams-ui-components-react';

export class TrainingView extends View {
    protected renderContent(context: Context): JSX.Element {
        const { rem, font } = context;
        const { sizes } = font;
        const styles = {
            header: { ...sizes.title },
            section: {...sizes.title2, marginTop: rem(1.4), marginBottom: rem(1.4)},
        };
        return (
            <Surface>
                <div style={styles.header}>There is nothing to see here! :-)</div>
                <div style={styles.section}>This is the tab where we will show your Training when you have selected the Training that you want to see.</div>
            </Surface>
        );
    }

    protected get allowRenderPanel(): boolean {
        return false;
    }
}