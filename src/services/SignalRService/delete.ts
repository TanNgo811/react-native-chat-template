import type { SignalRService } from './index';
import { HubConnectionState } from '@microsoft/signalr';
import { showWarning } from '../../helper/Toast';

export async function deleteMessage(
  this: SignalRService,
  conversationId: number,
  userId: number,
  message: string,
  deletedMessageId: number
) {
  if (
    this.hubConnection &&
    this.hubConnection?.state === HubConnectionState.Connected
  ) {
    try {
      await this.hubConnection.send(
        'Send',
        conversationId.toString(),
        userId.toString(),
        'DELETE',
        deletedMessageId.toString(),
        message
      );
    } catch (e) {
      showWarning(e);
    }
  } else {
    //
  }
}
