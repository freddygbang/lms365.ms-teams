import { LuisRecognizer as LuisRecognizerBase, IRecognizeContext, IIntentRecognizerResult } from 'botbuilder';
import { debug, error } from 'util';

export class LuisRecognizer extends LuisRecognizerBase {
    public onRecognize(context: IRecognizeContext, callback: (error: Error, result: IIntentRecognizerResult) => void): void {
        super.onRecognize(context, (error: Error, result: IIntentRecognizerResult) => {
            if ((result.intent != 'None') && (result.score < 0.5)) {
                result.intent = 'None';
                result.score = 1;
            }

            callback(error, result);
        });
    }
}