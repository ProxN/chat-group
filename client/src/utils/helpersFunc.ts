import { IMesssage } from 'types';
/* eslint-disable */

export const groupMesssages = (messages: IMesssage[]) => {
  return messages.reduce((acc, curr) => {
    const date = curr.createdAt.split('T')[0];
    (acc[date] = acc[date] || []).push(curr);
    return acc;
  }, {});
};
