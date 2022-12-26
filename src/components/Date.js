const TimezoneDate = ({ country, timezone }) => {
  // ! 검색 지역의 시간 구하기
  const getWorldTime = (tzOffset) => {
    let now = new Date();
    let tz = now.getTime() + now.getTimezoneOffset() * 60000 + tzOffset * 3600000;
    now.setTime(tz);
    let s =
      leadingZeros(now.getFullYear(), 4) +
      '-' +
      leadingZeros(now.getMonth() + 1, 2) +
      '-' +
      leadingZeros(now.getDate(), 2) +
      ' ' +
      leadingZeros(now.getHours(), 2) +
      ':' +
      leadingZeros(now.getMinutes(), 2) +
      ':' +
      leadingZeros(now.getSeconds(), 2);
    return s;
  };

  const leadingZeros = (n, digits) => {
    var zero = '';
    n = n.toString();
    if (n.length < digits) {
      for (let i = 0; i < digits - n.length; i++) zero += '0';
    }
    return zero + n;
  };
  return (
    <div className="weather_date_wrapper">
      <h3>{country}</h3>
      <h3 className="weather_date">{getWorldTime(timezone / 3600)}</h3>
    </div>
  );
};

export default TimezoneDate;
