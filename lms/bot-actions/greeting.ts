import { Message, Session, EntityRecognizer } from 'botbuilder';
import { ActionDefinition } from './action';
import { SelectCourseCatalog } from './select-course-catalog';
import { ShowCourseCatalogList } from './show-course-catalog-list';
import { LmsContext } from '../lms-context';
import { Course } from '../models';

const action = (session: Session, lmsContext: LmsContext, args: any, next: any) => {
    const attachment = lmsContext.attachmentBuilders.greeting.build();
    const message = new Message(session).addAttachment(attachment);

    session.send(message);

    session.endDialog();
}

export const Greeting: ActionDefinition = {
    action: action,
    key: 'Greeting',
    title: 'Greeting'
};

export const Help: ActionDefinition = {
    action: action,
    key: 'Help',
    title: 'Help'
};