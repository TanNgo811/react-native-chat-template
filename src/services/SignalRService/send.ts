import type { SignalRService } from './index';
import { HubConnectionState } from '@microsoft/signalr';
import { ToastAndroid } from 'react-native';

export async function send(
  this: SignalRService,
  conversationId: number,
  userId: number,
  message: string
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
        'CREATE',
        '0',
        message
      );
    } catch (e) {
      ToastAndroid.show(e.toString(), 250);
    }
  } else {
    //
  }
}
