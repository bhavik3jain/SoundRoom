/**
 * Converts Unix time (in ms since Jan 1 1970 UTC) to a string in the local time zone.
 */
export function unixTimeToString(time) {
  return new Date(time).toLocaleString();
}

/**
 * If shouldHide is true, returns a CSS class that hides the element.
 */
export function hideElement(shouldHide) {
  if (shouldHide) {
    return 'hidden';
  } else {
    return '';
  }
}
