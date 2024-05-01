import { format, formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

export const formatTimeAgo = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true, locale: tr });
};

export const formatDuration = (time: number) => {
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  return {
    days: days !== 0 ? (days < 10 ? "0" + days : days) : null,
    hours: hours !== 0 ? (hours < 10 ? "0" + hours : hours) : null,
    minutes: minutes < 10 ? "0" + minutes : minutes,
  };
};

export const formatDate = (date: Date, formatStr: string): string => {
  return format(date, formatStr, { locale: tr });
};
