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

    public get CEU_Points_Field(): string {
        return 'CEUs';
    }

    public get ClassRoom_CourseType(): string {
        return 'Classroom and Blended';
    }

    public get CourseID(): string {
        return 'Course ID';
    }

    public get Duration_Section_Title(): string {
        return 'Duration';
    }

    public get ELearning_CourseType(): string {
        return 'e-Learning';
    }

    public get Location(): string {
        return 'Location';
    }

    public get MoreThanOneDate(): string {
        return 'Multiple Dates';
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