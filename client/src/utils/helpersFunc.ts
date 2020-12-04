import { IMesssage } from 'types';
/* eslint-disable */

export const groupMesssages = (messages: IMesssage[]) => {
  if (!messages) return {};
  return messages.reduce((acc, curr) => {
    const date = curr.createdAt.split('T')[0];
    (acc[date] = acc[date] || []).push(curr);
    return acc;
  }, {});
};
