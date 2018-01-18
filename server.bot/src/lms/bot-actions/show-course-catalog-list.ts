import { Message, Session, EntityRecognizer } from 'botbuilder';
import { ActionDefinition } from './action';
import { LmsContext } from '../lms-context';
import { Course } from '../models';

export const ShowCourseCatalogList: ActionDefinition = {
    action: (session: Session, lmsContext: LmsContext, args: any) => {
        lmsContext.modelStorages.courseCatalogs.getAll()
            .then(courseCatalogs => {
                for (let i = 0; i < courseCatalogs.length; i++) {
                    const courseCatalog = courseCatalogs[i];
                    const attachment = lmsContext.attachmentBuilders.courseCatalogs.build(courseCatalog);
                    const message = new Message(session).addAttachment(attachment);

                    session.send(message);
                }

                session.endDialog();
            });
    },
    key: 'ShowCourseCatalogList',
    title: 'Show Course Catalog List'
};