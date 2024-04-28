export const formatRelativeDate = (date: Date): string => {
  const diffInMilliseconds = Date.now() - date.getTime();
  const years = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 365));
  if (years > 0) {
    return `${years} yıl önce`;
  }
  const months = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30));
  if (months > 0) {
    return `${months} ay önce`;
  }
  const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  if (days > 0) {
    return `${days} gün önce`;
  }
  const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  if (hours > 0) {
    return `${hours} saat önce`;
  }
  const minutes = Math.floor(diffInMilliseconds / (1000 * 60));
  if (minutes > 0) {
    return `${minutes} dakika önce`;
  }
  return "Şimdi";
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
