import React from 'reactn';
import type { ConversationFilter } from '../models/ConversationFilter';

export const conversationService = {
  useCount(filter: ConversationFilter): [] {
    React.useEffect(() => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filter),
      };

      fetch(
        'https://gandalf.truesight.asia/rpc/utils/conversation/count',
        requestOptions
      )
        .then((response) => {
          // await setUser(response.data);
          response
            .json()
            .then(async () => {
              //
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => console.log(e));
    }, []);

    return [];
  },
};
