import { CardAction, CardImage, IAttachment, IIsAttachment, Message, Session, ThumbnailCard } from 'botbuilder';
import { AppInfo, AppType } from 'lms365';
import { SelectCourseCatalog } from './bot-actions/select-course-catalog';
import { ShowCourseCatalogList } from './bot-actions/show-course-catalog-list';
import { Helper } from './helper';
import { LmsContext } from './lms-context';
import { Course, CourseCatalog } from './models';
import { DeepLinkBuilder } from './deep-link-builder';

export class CourseAttachmentBuilder {
    private readonly _lmsContext: LmsContext;

    public constructor(lmsContext: LmsContext) {
        this._lmsContext = lmsContext;
    }

    public build(course: Course): IIsAttachment {
        const lmsContext = this._lmsContext;
        const session = lmsContext.session;
        const courseImageUrl = Helper.Urls.Course.getImage(lmsContext.tenantId, lmsContext.environmentConfig, course);

        return new ThumbnailCard(session)
            .title(course.title)            
            .text(course.description)
            .images([CardImage.create(session, courseImageUrl)])
            .buttons([CardAction.openUrl(session, DeepLinkBuilder.buildCourseLink(course.url), 'View Course')]);
    }
}

export class CourseCatalogAttachmentBuilder {
    private readonly _lmsContext: LmsContext;

    public constructor(lmsContext: LmsContext) {
        this._lmsContext = lmsContext;
    }

    public build(courseCatalog: CourseCatalog): IIsAttachment {
        const lmsContext = this._lmsContext;
        const session = lmsContext.session;

        return new ThumbnailCard(session)
            .title(courseCatalog.title)
            .buttons([
                CardAction.imBack(session, SelectCourseCatalog.titleFormat(courseCatalog), SelectCourseCatalog.title),
                CardAction.openUrl(session, DeepLinkBuilder.buildCourseCatalogLink(courseCatalog.url), 'View')
            ]);
    }
}

export class GreetingAttachmentBuilder {
    private readonly _lmsContext: LmsContext;

    public constructor(lmsContext: LmsContext) {
        this._lmsContext = lmsContext;
    }

    public build(): IAttachment | IIsAttachment {
        const lmsContext = this._lmsContext;
        const session = lmsContext.session;
        const user = session.message.user;

        return new ThumbnailCard(session)
            .title('Hello!')
            .text(`Hi ${user.name}. Could I help you?`)
            .buttons([
                CardAction.imBack(session, ShowCourseCatalogList.title, ShowCourseCatalogList.title),
                CardAction.imBack(session, 'Show me e-Learning Courses', 'Show me e-Learning Courses'),
                CardAction.imBack(session, 'Show me Webinar Courses', 'Show me Webinar Courses'),
                CardAction.imBack(session, 'Show me Training Plan Courses', 'Show me Training Plan Courses'),
                CardAction.imBack(session, 'Show me Classroom & Blended Courses', 'Show me Classroom & Blended Courses')
            ]);
    }
}

export class AttachmentBuilderFactory {
    private readonly _courses: CourseAttachmentBuilder;
    private readonly _courseCatalogs: CourseCatalogAttachmentBuilder;
    private readonly _greeting: GreetingAttachmentBuilder;

    public constructor(lmsContext: LmsContext) {
        this._courses = new CourseAttachmentBuilder(lmsContext);
        this._courseCatalogs =new CourseCatalogAttachmentBuilder(lmsContext);
        this._greeting = new GreetingAttachmentBuilder(lmsContext);
    }

    public get courses(): CourseAttachmentBuilder {
        return this._courses;
    }

    public get courseCatalogs(): CourseCatalogAttachmentBuilder {
        return this._courseCatalogs;
    }

    public get greeting(): GreetingAttachmentBuilder {
        return this._greeting;
    }
}