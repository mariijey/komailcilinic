import mockData, { range } from 'utils/mock-data';

const newPerson = (index: number) => {
  const tempData = mockData(index);

  return {
    id: index,
    name: tempData.name.first,
    user: tempData.number.rating,
    adsNum: tempData.email,
    receivedList: tempData.address.full
  };
};

export default function makeData(...lens: any) {
  const makeDataLevel: any = (depth: number = 0) => {
    const len = lens[depth];
    return range(len).map((d, index) => ({
      ...newPerson(index + 1),
      subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
    }));
  };

  return makeDataLevel();
}
