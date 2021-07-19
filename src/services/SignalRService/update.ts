import type { SignalRService } from './index';
import { HubConnectionState } from '@microsoft/signalr';
import { showWarning } from '../../helper/Toast';

export async function update(
  this: SignalRService,
  conversationId: number,
  userId: number,
  message: string,
  updatedMessageId: number
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
        'UPDATE',
        updatedMessageId.toString(),
        message
      );
    } catch (e) {
      showWarning(e);
    }
  } else {
    //
  }
}
