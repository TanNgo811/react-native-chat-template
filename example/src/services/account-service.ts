import React from 'react';
import type { AppUser } from '../models/AppUser';
import { globalStateRepository } from '../repository/global-state-repository';

export const accountService = {
  useLogin(): [AppUser, () => void] {
    const [user, setUser] = React.useState<AppUser>({});

    const handleLogin = React.useCallback(() => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'ln',
          password: '123',
        }),
      };

      fetch(
        'https://gandalf.truesight.asia/rpc/portal/account/login',
        requestOptions
      )
        .then((response) => {
          // await setUser(response.data);
          response
            .json()
            .then(async (user: AppUser) => {
              await setUser(user);
              await globalStateRepository.saveCredentials(user);
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => console.log(e));
    }, []);

    return [user, handleLogin];
  },
};
