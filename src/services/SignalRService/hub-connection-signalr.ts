import * as signalR from '@microsoft/signalr';
import { HubConnectionState } from '@microsoft/signalr';
import type { SignalRService } from './index';
import type { ConversationMessage } from '../../models/ConversationMessage';
import moment from 'moment';
import { ToastAndroid } from 'react-native';

// 'http://192.168.28.33:10100/rpc/utils/chathub'

export async function hubConnectionSignalr(
  this: SignalRService,
  token: string,
  API_BASE_URL: string,
  API_SIGNALR_ROUTE: string,
  addNewConversationGlobalState: (message: ConversationMessage) => void
) {
  const hub = new signalR.HubConnectionBuilder()
    .withUrl(API_BASE_URL + '/' + API_SIGNALR_ROUTE, {
      accessTokenFactory: () => token,
    })
    // .withAutomaticReconnect()
    .build();

  if (hub) {
    this.hubConnection = hub;
    await this.hubConnection
      .start()
      .then(() => ToastAndroid.show('SignalR Connected', 250));

    if (this.hubConnection.state === HubConnectionState.Connected) {
      try {
        this.hubConnection.on(
          'Receive',
          async (conversationId, globalUserId, message) => {
            const latestMessage = JSON.parse(message);

            const comingMessage: ConversationMessage = {
              id: latestMessage.Id,
              conversationId: parseInt(conversationId),
              conversationTypeId: 1,
              conversationType: {
                id: 1,
                code: 'LOCAL',
                name: 'Nội bộ',
              },
              globalUserId: parseInt(globalUserId),
              content: latestMessage.Content,
              globalUser: latestMessage.GlobalUser,
              createdAt: moment(new Date()),
              updatedAt: moment(new Date()),
            };

            await addNewConversationGlobalState(comingMessage);
          }
        );
      } catch (e) {
        ToastAndroid.show(e.toString(), 250);
      }
    }
  }
}
