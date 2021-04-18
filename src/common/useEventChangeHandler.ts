import { EventEmitter } from './EventEmitter';
import { useEffect, useRef } from 'react';

export const useEventChangeHandler = <T extends object>(
  eventEmitter: EventEmitter<T>,
  handler: (payload: T) => void | Promise<void>,
  dependencies: any[]
) => {
  const eventHandler = useRef<undefined | number>();

  useEffect(() => {
    if (eventHandler.current !== undefined) {
      eventEmitter.delete(eventHandler.current);
    }

    eventHandler.current = eventEmitter.on(handler);

    return () => {
      if (eventHandler.current !== undefined) {
        eventEmitter.delete(eventHandler.current);
      }
    };
  }, [eventEmitter, ...dependencies]);
};
