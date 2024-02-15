import { formatDistanceToNow, parseISO } from 'date-fns';

export const convertDate = (dateInISOString: string) =>
  formatDistanceToNow(parseISO(dateInISOString));
