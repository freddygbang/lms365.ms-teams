import { IDialogWaterfallStep, IConnector, Message, Session, UniversalBot } from 'botbuilder';
import { wrapAction } from './lms/bot-actions/action';
import { Greeting } from './lms/bot-actions/greeting';

export class Bot extends UniversalBot {
    public constructor(connector?: IConnector, defaultDialog?: IDialogWaterfallStep | IDialogWaterfallStep[], libraryName?: string) {
        super(connector, defaultDialog, libraryName);

        this.handleConversationUpdate = this.handleConversationUpdate.bind(this);

        //this.on('conversationUpdate', this.handleConversationUpdate);
    }

    private async handleConversationUpdate(message: any) {
        if (message.membersAdded) {
            this.loadSession(message.address, async (error, session: Session) => {
                wrapAction(Greeting)(session, {}, null);
            });
        }
    }
}