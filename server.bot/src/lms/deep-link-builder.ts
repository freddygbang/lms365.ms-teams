export class DeepLinkBuilder {
    private static tabId: string = 'lms365-dashboard';

    private static get botId(): string {
        return process.env.MICROSOFT_APP_ID;
    }

    public static buildCourseLink(courseUrl: string): string {
        let tabData = { view: 'course', webUrl: courseUrl };
        let link = DeepLinkBuilder.buildDeepLink(tabData);
        return link;
    }

    public static buildCourseCatalogLink(courseCatalogUrl: string): string {
        let tabData = { view: 'course-catalog', webUrl: courseCatalogUrl };
        let link = DeepLinkBuilder.buildDeepLink(tabData);
        return link;
    }

    private static buildDeepLink(tabData:any):string{
        let context = { subEntityId: JSON.stringify(tabData) };
        let link = `https://teams.microsoft.com/l/entity/28:${DeepLinkBuilder.botId}/${DeepLinkBuilder.tabId}?conversationType=chat&context=${encodeURIComponent(JSON.stringify(context))}`;
        return link;
    }
}