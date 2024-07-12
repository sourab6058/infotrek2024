export default function formatDateyyyyMMdd(newDate) {
  const d = new Date(newDate).toLocaleDateString();
  let dayMonthYearList = d.split("/");

  if (dayMonthYearList[0].length < 2)
    dayMonthYearList[0] = "0" + dayMonthYearList[0];
  if (dayMonthYearList[1].length < 2)
    dayMonthYearList[1] = "0" + dayMonthYearList[1];
  const val = dayMonthYearList.reverse().join("-");
  return val;
}
