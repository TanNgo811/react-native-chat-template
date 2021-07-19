import type { HubConnection } from '@microsoft/signalr';
import { NetInfoState, useNetInfo } from '@react-native-community/netinfo';
import { hubConnectionSignalr } from './hub-connection-signalr';
import { send } from './send';
import { update } from './update';
import { deleteMessage } from './delete';
import type { ConversationMessage } from '../../models/ConversationMessage';

export class SignalRService {
  // @ts-ignore
  protected hubConnection: HubConnection = null;

  public readonly hubConnectionSignalr = hubConnectionSignalr;

  public readonly send = send;

  public readonly update = update;

  public readonly deleteMessage = deleteMessage;

  public readonly useCheckInternet = async (
    token: string,
    API_BASE_URL: string,
    API_SIGNALR_ROUTE: string,
    addNewConversationGlobalState: (message: ConversationMessage) => void
  ) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const netInfoState: NetInfoState = useNetInfo();

    if (this.hubConnection && netInfoState.isConnected === false) {
      await this.hubConnection.stop().then(() => {
        // @ts-ignore
        this.hubConnection = null;
        // eslint-disable-next-line no-console
        console.log('signalr stopped');
      });
      return;
    }
    if (netInfoState.isConnected === true && !this.hubConnection) {
      if (token) {
        await this.hubConnectionSignalr(
          token,
          API_BASE_URL,
          API_SIGNALR_ROUTE,
          addNewConversationGlobalState
        );
      }
    }
  };
}

export const signalRService: SignalRService = new SignalRService();
