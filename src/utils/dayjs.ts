import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import duration from 'dayjs/plugin/duration';

dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(duration);

const agePlugin = (_: any, dayjsClass: any, __: any) => {
  dayjsClass.prototype.age = function () {
    const birthDate = this;
    const now = dayjs();
    const age = dayjs.duration(now.diff(birthDate));

    return age.years();
  };
};

dayjs.extend(agePlugin);

declare module 'dayjs' {
  interface Dayjs {
    age(): number;
  }
}

export default dayjs;
