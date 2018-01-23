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
        return 'Aw shucks, I could not find that Course Catalog, perhaps you misspelled it? To see all Course Catalogs just ask me to show the course catalog list .';
    }

    public CourseCatalogList_WasSelected(url: string): string {
        return `I have selected the following Course Catalog for you (url: ${url}).`;
    }

    public get CourseCategoryList_Loading(): string {
        return 'Hold on, I am just getting a list of all the course categories...';
    }

    public get CourseCategoryList_Title(): string {
        return 'Good news, I found the following categories for you, now just select the category you need!.';
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
        return 'Alright, I am getting a list of all our courses, just a moment...';
    }

    public CourseList_LoadingByCategoryName(categoryName: string): string {
        return `Hold on, I am looking for courses in the ${categoryName} category, back in just a tick!`;
    }

    public CourseList_LoadingByCourseType(courseType: CourseType): string {
        return `Give me a couple of seconds, I am looking for all our ${this.getCourseTypeName(courseType)} courses...`;
    }

    public CourseList_LoadingByCourseTypeAndCategoryName(courseType: CourseType, categoryName: string): string {
        return `Alright, just a mo! I am getting ${this.getCourseTypeName(courseType)} courses in the ${categoryName} category...`;
    }

    public get CourseList_NoItems(): string {
        return 'Oh no, I couldn\'t find any courses.';
    }

    public get Duration_Section_Title(): string {
        return 'Duration';
    }

    public get ELearning_CourseType(): string {
        return 'e-Learning';
    }

    public get Greeting(): string {
        return `
My name is Elle, I am your Learning Assistant BOT and will try and find the training you might like! 
</br>
I can help you:
</br>
<ul>
    <li>Select your default Course Catalog</li>
    <li>Find e-Learning, Classroom & Blended and Webinar Courses</li>
    <li>Find Training Plans</li>
</ul>
</br>
Just click any of the buttons below or simply type ‘show elearning’ to get a list of e-Learning Courses, ‘show webinar’ for Webinar Courses etc.`;
    }

    public Greeting_Title(userName: string): string {
        return `Hello ${userName}, nice to see you!`;
    }

    public get Location(): string {
        return 'Location';
    }

    public get MoreThanOneDate(): string {
        return 'Multiple Dates';
    }

    public get MoreThanPageCourseCount(): string {
        return 'Ahh, I found more than 10 courses, can I suggest you also select a category from below so my results will be better and more specific!';
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
