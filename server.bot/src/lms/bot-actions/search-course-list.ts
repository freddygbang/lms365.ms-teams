import { AttachmentLayout, EntityRecognizer, Message, Session, IIsAttachment } from 'botbuilder';
import { ActionDefinition } from './action';
import { LmsContext } from '../lms-context';
import { Course } from '../models';

export const SearchCourseList: ActionDefinition = {
    action: async (session: Session, lmsContext: LmsContext, args: any) => {
        const courseTypeEntity = EntityRecognizer.findEntity(args.intent.entities, 'CourseType');
        let promise: Promise<Course[]>;

        if (courseTypeEntity) {
            const courseType = (courseTypeEntity as any).resolution.values[0];
            let domainCourseType: string;

            session.send(`Displaying ${courseType} courses...`);

            switch (courseType) {
                case 'e-Learning':
                    domainCourseType = 'ELearning';
                    break;
                case 'Webinar':
                    domainCourseType = 'Webinar';
                    break;
                case 'Training Plan':
                    domainCourseType = 'TrainingPlan';
                    break;
                case 'Classroom & Blended':
                    domainCourseType = 'ClassRoom';
                    break;
            }

            promise = lmsContext.modelStorages.courses.getByType(domainCourseType);
        } else {
            session.send(`Displaying all courses...`);

            promise = lmsContext.modelStorages.courses.getAll();
        }

        const courses = await promise;

        if (courses.length) {
            const attachments: IIsAttachment[] = [];
            const message = new Message(session);
            const pagedCourses = courses.slice(0, 10);

            for (let i = 0; i < pagedCourses.length; i++) {
                const course = pagedCourses[i];
                const attachment = lmsContext.attachmentBuilders.courses.buildForList(course, i);

                attachments.push(attachment);
            }

            message
                .attachmentLayout(AttachmentLayout.carousel)
                .attachments(attachments);

            session.send(message);
        } else {
            session.send('There are no courses to display.');
        }

        session.endDialog();
    },
    key: 'SearchCourseList',
    title: 'Search Courses'
};