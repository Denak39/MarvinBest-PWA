class DateHelpers extends Date {
  /**
   * Get full date.
   *
   * @example new DateHelpers("2023-09-20 10:16:48").getFulldate()
   * // "mercredi 20 septembre 2023 à 10:16"
   * @return {string}
   */
  getFulldate(): string {
    return this.toLocaleString('fr-FR', {
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      month: 'long',
      weekday: 'long',
      year: 'numeric',
    });
  }

  /**
   * Get short date.
   *
   * @example new DateHelpers("2023-07-12 18:10:08").getShortdate()
   * // "12/07/2023 18:10"
   * @return {string}
   */
  getShortdate(): string {
    if (this.isToday()) return "Aujourd'hui";
    if (this.isYesterday()) return 'Hier';

    const day = DateHelpers.padZero(this.getDate());
    const month = DateHelpers.padZero(this.getMonth() + 1);
    const hours = DateHelpers.padZero(this.getHours());
    const minutes = DateHelpers.padZero(this.getMinutes());

    return `${day}/${month}/${this.getFullYear()} ${hours}:${minutes}`;
  }

  /**
   * Get locale string.
   *
   * @example new DateHelpers("2023-03-31 22:35:47").getLocaleString()
   * // "2023-03-31 22:35:47"
   * @return {string}
   */
  getLocaleString(): string {
    const day = DateHelpers.padZero(this.getDate());
    const month = DateHelpers.padZero(this.getMonth() + 1);
    const hours = DateHelpers.padZero(this.getHours());
    const minutes = DateHelpers.padZero(this.getMinutes());
    const seconds = DateHelpers.padZero(this.getSeconds());

    return `${this.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  /**
   * Check if the day is yesterday.
   *
   * @return {boolean}
   */
  isYesterday(): boolean {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return DateHelpers.isSameDate(yesterday, this);
  }

  /**
   * Check if the day is the current day.
   *
   * @return {boolean}
   */
  isToday(): boolean {
    const now = new Date();

    return DateHelpers.isSameDate(now, this);
  }

  /**
   * Check if both dates are the same day.
   *
   * @example DateHelpers.isEqual(new Date("2023-03-16 21:48:56", "2023-03-16 01:06:58"))
   * // true
   * @param {Date} firstDate First date to check
   * @param {Date} secondDate Second date to check
   * @return {boolean}
   */
  private static isSameDate(firstDate: Date, secondDate: Date): boolean {
    return (
      firstDate.getDate() === secondDate.getDate() &&
      firstDate.getMonth() === secondDate.getMonth() &&
      firstDate.getFullYear() === secondDate.getFullYear()
    );
  }

  /**
   * Allows you to add a zero to the start of the string.
   *
   * @example DateHelpers.padZero(8)
   * // "08"
   * @param {number} n Number to update
   * @return {string}
   */
  private static padZero(n: number): string {
    return n.toString().padStart(2, '0');
  }
}

export default DateHelpers;
