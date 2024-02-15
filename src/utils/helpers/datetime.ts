import momentJalaali from 'moment-jalaali';
import { isEmpty, normalizeContent, toEnglishNum } from './main';

export const getNormalizedDate = (date = '', isJalali = true, withTime = false) => {
  if (!isEmpty(date)) {
    if (withTime) {
      const normalDate = isJalali
        ? momentJalaali(date).format('HH:mm:ss | jYYYY-jMM-jDD')
        : momentJalaali(date).format('HH:mm:ss | YYYY-MM-DD');
      return normalizeContent(normalDate, 'out');
    } else {
      const normalDate = isJalali ? momentJalaali(date).format('jYYYY-jMM-jDD') : momentJalaali(date).format('YYYY-MM-DD');
      return normalizeContent(normalDate, 'out');
    }
  } else return '';
};

export const getJalaaliMonthCalendarElements = (date: any, isJalaali = true) => {
  let mDate;
  if (isJalaali) {
    mDate = momentJalaali(date, 'jYYYY-jMM-jDD');
  } else {
    mDate = momentJalaali(date, 'YYYY-MM-DD');
  }
  const [jYear, jMonth, jDay] = mDate.format('jYYYY-jMM-jDD').split('-');

  return {
    year: toEnglishNum(jYear),
    month: toEnglishNum(jMonth),
    day: toEnglishNum(jDay)
  };
};
