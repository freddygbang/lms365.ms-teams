import { AttachmentLayout, EntityRecognizer, Message, Session, IIsAttachment } from 'botbuilder';
import { ActionDefinition } from './action';
import { LmsContext } from '../lms-context';
import { Course, CourseCategory, CourseType } from '../models';
import { ResourceSet } from '../resource-set';
import { ArrayHelper } from '../helpers/array-helper';

const resourceSet = ResourceSet.instance;

export class SearchCourseListActionHandler {
    public static readonly instance: SearchCourseListActionHandler = new SearchCourseListActionHandler();

    private sendMessageAboutCategories(session: Session, lmsContext: LmsContext, queryableCourseType: CourseType, courses: Course[]) {
        const allCategories = ArrayHelper.selectMany(courses, x => x.categories);
        const uniqueCategories = ArrayHelper.groupBy<CourseCategory>(allCategories, x => x.id).map(x => x.values[0]);
        const message = new Message(session)
            .addAttachment(lmsContext.attachmentBuilders.courseCategories.buildList(queryableCourseType, uniqueCategories));

        session.send(message);
    }

    private sendMessageAboutCourses(session: Session, lmsContext: LmsContext, queryableCourseType: CourseType, queryableCategoryName: string, courses: Course[]) {
        if (courses.length) {
            const attachments: IIsAttachment[] = [];
            const pagedCourses = courses.slice(0, 10);

            for (let i = 0; i < pagedCourses.length; i++) {
                const course = pagedCourses[i];
                const attachment = lmsContext.attachmentBuilders.courses.buildListItem(course, i, pagedCourses.length);

                attachments.push(attachment);
            }

            const message = new Message(session)
                .attachmentLayout(AttachmentLayout.carousel)
                .attachments(attachments);

            session.send(message);

            if (courses.length > 10 && !queryableCategoryName) {
                this.sendMessageAboutCategories(session, lmsContext, queryableCourseType, courses);
            }
        } else {
            session.send('There are no courses to display.');
        }
    }

    public async handle(session: Session, lmsContext: LmsContext, args: any) {
        const categoryEntity = EntityRecognizer.findEntity(args.intent.entities, 'Category');
        const courseTypeEntity = EntityRecognizer.findEntity(args.intent.entities, 'CourseType');
        let categoryName: string = null;
        let courseType: CourseType = null;
        let promise: Promise<Course[]>;

        if (courseTypeEntity) {
            const courseTypeValue = (courseTypeEntity as any).resolution.values[0];

            switch (courseTypeValue) {
                case 'e-Learning':
                    courseType = CourseType.ELearning;
                    break;
                case 'Webinar':
                    courseType = CourseType.Webinar;
                    break;
                case 'Training Plan':
                    courseType = CourseType.TrainingPlan;
                    break;
                case 'Classroom & Blended':
                    courseType = CourseType.ClassRoom;
                    break;
            }

            categoryName = categoryEntity ? (categoryEntity as any).entity : null;

            session.send(`Displaying ${resourceSet.getCourseTypeName(courseType)} courses...`);
            console.dir('categoryName' + categoryName);

            promise = categoryName
                ? lmsContext.modelStorages.courses.getByTypeAndCategoryName(courseType, categoryName)
                : lmsContext.modelStorages.courses.getByType(courseType);
        } else {
            session.send(`Displaying all courses...`);

            promise = lmsContext.modelStorages.courses.getAll();
        }

        const courses = await promise;

        this.sendMessageAboutCourses(session, lmsContext, courseType, categoryName, courses);

        session.endDialog();
    }
}

export const SearchCourseList: ActionDefinition = {
    action: SearchCourseListActionHandler.instance.handle.bind(SearchCourseListActionHandler.instance),
    key: 'SearchCourseList',
    title: 'Search Courses'
};