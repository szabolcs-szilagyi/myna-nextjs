import { throttle } from "lodash";
import { useCallback, useEffect, useState } from "react";
import {
  API_PATH,
  API_SERVER,
} from '../constants';
import { requestFactory } from '../lib/request';
const listenRequest = requestFactory(API_SERVER + API_PATH);

export enum ELoggedIn {
  NO = 'no',
  YES = 'yes',
}

function amILoggedIn(session: string): Promise<ELoggedIn> {
  return listenRequest({
    query: { part: 'amiloggedin', sessiontoken: session },
    options: { json: true },
  })
    .then(({ email }) => {
      if (email !== 'nodata') {
        return ELoggedIn.YES;
      } else {
        return ELoggedIn.NO;
      }
    });
}

export default function useAmILoggedIn(session: string): [ELoggedIn | null, Error | undefined] {
  const [data, setData] = useState(null);
  const [error, setError] = useState();
  const throttledRequest = useCallback(
    throttle(() => {
      amILoggedIn(session)
        .then(r => setData(r as any))
        .catch(setError);
    }, 5000),
    [session]
  );

  useEffect(() => {
    throttledRequest();
  })

  return [data, error];
}
