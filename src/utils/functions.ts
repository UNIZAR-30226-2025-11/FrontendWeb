export function formatRelativeTime(date: Date): string {
    if (!date) return "";
    
    const now = new Date();
    const diffInSeconds = Math.round((date.getTime() - now.getTime()) / 1000);
  
    // Use English locale, 'auto' tries to use terms like "yesterday" or "last hour"
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  
    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    // Intl.RelativeTimeFormat doesn't directly support 'month' or 'year' thresholds like this,
    // but it handles the formatting based on the unit you provide.
    // We choose the largest appropriate unit.
  
    if (Math.abs(diffInSeconds) < minute) {
      return rtf.format(diffInSeconds, 'second');
    } else if (Math.abs(diffInSeconds) < hour) {
      return rtf.format(Math.round(diffInSeconds / minute), 'minute');
    } else if (Math.abs(diffInSeconds) < day) {
      return rtf.format(Math.round(diffInSeconds / hour), 'hour');
    } else if (Math.abs(diffInSeconds) < week) {
      return rtf.format(Math.round(diffInSeconds / day), 'day');
    } else if (Math.abs(diffInSeconds) < day * 30) { // Approx month
       return rtf.format(Math.round(diffInSeconds / week), 'week');
    } else if (Math.abs(diffInSeconds) < day * 365) { // Approx year
       return rtf.format(Math.round(diffInSeconds / (day * 30)), 'month'); // Use month unit
    } else {
      return rtf.format(Math.round(diffInSeconds / (day * 365)), 'year');
    }
}
