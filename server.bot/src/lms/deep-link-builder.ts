export class DeepLinkBuilder {
    private static tabId: string = 'lms365-training';

    private static get botId(): string {
        return process.env.MICROSOFT_APP_ID;
    }

    private static buildDeepLink(tabData:any):string{
        const context = { subEntityId: JSON.stringify(tabData) };

        return `https://teams.microsoft.com/l/entity/28:${DeepLinkBuilder.botId}/${DeepLinkBuilder.tabId}?conversationType=chat&context=${encodeURIComponent(JSON.stringify(context))}`;
    }

    public static buildCourseLink(courseUrl: string): string {
        const tabData = { view: 'course', webUrl: courseUrl };

        return DeepLinkBuilder.buildDeepLink(tabData);
    }

    public static buildCourseCatalogLink(courseCatalogUrl: string): string {
        const tabData = { view: 'course-catalog', webUrl: courseCatalogUrl };

        return DeepLinkBuilder.buildDeepLink(tabData);
    }
}