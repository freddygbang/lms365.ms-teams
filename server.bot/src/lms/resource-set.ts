import { CourseType } from './models';

export class ResourceSet {
    public static instance: ResourceSet = new ResourceSet();

    public getCourseTypeName(type: CourseType): string {
        switch (type) {
            case CourseType.ELearning:
                return this.ELearning_CourseType;
            case CourseType.ClassRoom:
                return this.ClassRoom_CourseType;
            case CourseType.TrainingPlan:
                return this.TrainingPlan;
            case CourseType.Webinar:
                return this.Webinar;
        }
    }

    public get Category(): string {
        return 'Category';
    }

    public get CourseCatalogList_EmptyUrl(): string {
        return 'You need to use url of Course Catalog.';
    }

    public get CourseCatalogList_NotFound(): string {
        return 'Course Catalog is not found.';
    }

    public CourseCatalogList_WasSelected(url: string): string {
        return `Course Catalog was selected (url: ${url}).`;
    }

    public get CourseCategoryList_Loading(): string {
        return 'Displaying all course categories...';
    }

    public get CourseCategoryList_Title(): string {
        return 'Hey, I found the following categories.';
    }

    public get CEU_Points_Field(): string {
        return 'CEUs';
    }

    public get ClassRoom_CourseType(): string {
        return 'Classroom & Blended';
    }

    public get CourseID(): string {
        return 'Course ID';
    }

    public get CourseList_LoadingAll(): string {
        return 'Displaying all courses...';
    }

    public CourseList_LoadingByCategoryName(categoryName: string): string {
        return `Displaying courses with ${categoryName} category...`;
    }

    public CourseList_LoadingByCourseType(courseType: CourseType): string {
        return `Displaying ${this.getCourseTypeName(courseType)} courses...`;
    }

    public CourseList_LoadingByCourseTypeAndCategoryName(courseType: CourseType, categoryName: string): string {
        return `Displaying ${this.getCourseTypeName(courseType)} courses with ${categoryName} category...`;
    }

    public get CourseList_NoItems(): string {
        return 'There are no courses to display.';
    }

    public get Duration_Section_Title(): string {
        return 'Duration';
    }

    public get ELearning_CourseType(): string {
        return 'e-Learning';
    }

    public get Greeting(): string {
        return `
I can help you:

<ul>
    <li>Select your default Course Catalog</li>
    <li>Find e-Learning, Classroom & Blended and Webinar Courses</li>
    <li>Find Training Plans</li>
</ul>

Just click any of the buttons below or simply type ‘show elearning’ to get a list of e-Learning Courses, ‘show webinar’ for Webinar Courses etc.`;
    }

    public Greeting_Title(userName: string): string {
        return `Hello ${userName}!`;
    }

    public get Location(): string {
        return 'Location';
    }

    public get MoreThanOneDate(): string {
        return 'Multiple Dates';
    }

    public get MoreThanPageCourseCount(): string {
        return 'Search result contains more than 10 courses, please make search by categories to reduce number of courses.';
    }

    public get MoreThanOneLocation(): string {
        return 'Multiple Locations';
    }

    public get Reports_EndDate(): string {
        return 'End Date';
    }

    public get Reports_StartDate(): string {
        return 'Start Date';
    }

    public get Type_Section_Title(): string {
        return 'Type';
    }

    public get Trainers(): string {
        return 'Trainer(s)';
    }

    public get TrainingPlan(): string {
        return 'Training Plan';
    }

    public get TrainingPlans(): string {
        return 'Training Plans';
    }

    public get TrainingPlanID(): string {
        return 'Training Plan ID';
    }

    public get Url(): string {
        return 'Url';
    }

    public get ViewCourse(): string {
        return 'View Course';
    }

    public get ViewTrainingPlan(): string {
        return 'View Training Plan';
    }

    public get Webinar(): string {
        return 'Webinar';
    }
}