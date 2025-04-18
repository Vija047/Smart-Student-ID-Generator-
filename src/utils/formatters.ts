
import { format } from 'date-fns';

export const formatDate = (timestamp: number): string => {
  return format(new Date(timestamp), 'dd MMM yyyy');
};
