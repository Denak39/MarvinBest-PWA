import DateHelpers from '@helpers/DateHelpers';

const now = new DateHelpers('2023-06-24 09:15:57');

describe('helpers/DateHelpers', () => {
  beforeAll(() => {
    vi.setSystemTime(now);
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  describe('getFulldate', () => {
    it('should return full format date', () => {
      expect(now.getFulldate()).toBe('samedi 24 juin 2023 à 09:15');
    });
  });

  describe('getLocaleString', () => {
    it('should return locale string', () => {
      expect(now.getLocaleString()).toBe('2023-06-24 09:15:57');
    });
  });

  describe('getShortdate', () => {
    it('should return short format date', () => {
      const newDate = new DateHelpers(now);
      newDate.setDate(newDate.getDate() - 3);

      expect(newDate.getShortdate()).toBe('21/06/2023 09:15');
    });

    it('should return the today date', () => {
      expect(now.getShortdate()).toBe("Aujourd'hui");
    });

    it('should return the yesterday date', () => {
      const newDate = new DateHelpers(now);
      newDate.setDate(newDate.getDate() - 1);

      expect(newDate.getShortdate()).toBe('Hier');
    });
  });
});
