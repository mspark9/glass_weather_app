# weatherUtils.js 코드 설명


`weatherUtils.js`는 OpenWeatherMap API 응답 데이터를 UI에 표시하기 위해 가공하는 순수 함수 모음입니다.


---


## 함수 목록


### 1. `getWeatherIcon(weather)`


날씨 상태(`weather.main`)를 받아 **Lucide 아이콘 컴포넌트 이름**을 반환합니다.


| 날씨 상태 | 반환 아이콘 |
|-----------|------------|
| clear     | `Sun` |
| Clouds    | `Cloud` |
| Rain      | `CloudRain` |
| Drizzle   | `CloudDrizzle` |
| Snow      | `CloudSnow` |
| Mist / Fog / Haze | `CloudFog` |
| Dust / Sand / Ash / Squall | `Wind` |
| Tornado   | `Tornado` |
| 그 외 (기본값) | `Cloud` |


> **주의**: `Sand`, `Ash`, `Squall`의 아이콘 키는 소문자 `'wind'`로 되어 있어 Lucide 아이콘 매핑 시 대소문자를 통일해야 합니다.


```js
// 시그니처
getWeatherIcon(weather: { main: string }): string
```


---


### 2. `formatTemperature(temp, unit)`


섭씨(Celsius) 온도를 받아 단위에 따라 변환하고 **반올림한 정수**를 반환합니다.


- `unit === 'F'` → 섭씨를 화씨로 변환: `(temp * 9 / 5) + 32`
- 그 외 → 섭씨 그대로 반올림


```js
// 시그니처
formatTemperature(temp: number, unit: 'C' | 'F'): number
```


---


### 3. `formatTime(timestamp)`


Unix 타임스탬프(초 단위)를 받아 **12시간제 시:분 문자열**로 반환합니다.


- 내부적으로 `timestamp * 1000`으로 밀리초 변환 후 `Date` 객체 사용
- 로케일: `en-US`


```js
// 시그니처
formatTime(timestamp: number): string  // 예: "06:30 AM"
```


---


### 4. `formatDate(timestamp)`


Unix 타임스탬프(초 단위)를 받아 **요일, 월, 일 문자열**로 반환합니다.


- 로케일: `en-US`
- 포맷: `weekday: short`, `month: short`, `day: numeric`


```js
// 시그니처
formatDate(timestamp: number): string  // 예: "Tue, Feb 18"
```


---


### 5. `getWindDirection(deg)`


풍향 각도(0~360°)를 받아 **16방위 나침반 방향 문자열**로 반환합니다.


- 360° ÷ 16 = 22.5° 간격으로 방위를 나눔
- `Math.round(deg / 22.5) % 16` 인덱스로 배열에서 방향 추출


```js
// 시그니처
getWindDirection(deg: number): string  // 예: "NE", "SSW", "W"
```


---


## 예시 사용 코드


### React 컴포넌트에서 사용


```jsx
import {
  getWeatherIcon,
  formatTemperature,
  formatTime,
  formatDate,
  getWindDirection,
} from './weatherUtils';
import * as LucideIcons from 'lucide-react';


// OpenWeatherMap API 응답 예시 데이터
const apiResponse = {
  weather: [{ main: 'Rain', description: 'light rain' }],
  main: {
    temp: 18.6,     // 섭씨
    humidity: 72,
  },
  wind: {
    speed: 5.3,
    deg: 135,       // 남동쪽
  },
  dt: 1739880000,  // Unix timestamp (초 단위)
};


function WeatherCard({ data, unit = 'C' }) {
  const iconName = getWeatherIcon(data.weather[0]);
  const WeatherIcon = LucideIcons[iconName] ?? LucideIcons.Cloud;


  return (
    <div className="weather-card">
      {/* 날씨 아이콘 */}
      <WeatherIcon size={48} />


      {/* 온도 */}
      <p>{formatTemperature(data.main.temp, unit)}°{unit}</p>


      {/* 날짜 및 시간 */}
      <p>{formatDate(data.dt)}</p>
      <p>{formatTime(data.dt)}</p>


      {/* 풍향 */}
      <p>Wind: {getWindDirection(data.wind.deg)} {data.wind.speed} m/s</p>
    </div>
  );
}


export default WeatherCard;
```


---


### 단위 테스트 예시 (Jest)


```js
import {
  getWeatherIcon,
  formatTemperature,
  formatTime,
  formatDate,
  getWindDirection,
} from './weatherUtils';


describe('getWeatherIcon', () => {
  it('Rain 상태에서 CloudRain 반환', () => {
    expect(getWeatherIcon({ main: 'Rain' })).toBe('CloudRain');
  });


  it('알 수 없는 날씨에서 기본값 Cloud 반환', () => {
    expect(getWeatherIcon({ main: 'Unknown' })).toBe('Cloud');
  });
});


describe('formatTemperature', () => {
  it('섭씨 0도 → 화씨 32도', () => {
    expect(formatTemperature(0, 'F')).toBe(32);
  });


  it('섭씨 100도 → 화씨 212도', () => {
    expect(formatTemperature(100, 'F')).toBe(212);
  });


  it('섭씨 단위는 반올림 반환', () => {
    expect(formatTemperature(18.6, 'C')).toBe(19);
  });
});


describe('formatTime', () => {
  it('Unix 타임스탬프를 시:분 AM/PM 형식으로 반환', () => {
    const result = formatTime(1739880000);
    expect(result).toMatch(/\d{2}:\d{2} (AM|PM)/);
  });
});


describe('formatDate', () => {
  it('Unix 타임스탬프를 요일, 월, 일 형식으로 반환', () => {
    const result = formatDate(1739880000);
    // 예: "Tue, Feb 18"
    expect(result).toMatch(/\w{3}, \w{3} \d{1,2}/);
  });
});


describe('getWindDirection', () => {
  it('0도 → N (북)', () => {
    expect(getWindDirection(0)).toBe('N');
  });


  it('90도 → E (동)', () => {
    expect(getWindDirection(90)).toBe('E');
  });


  it('135도 → SE (남동)', () => {
    expect(getWindDirection(135)).toBe('SE');
  });


  it('270도 → W (서)', () => {
    expect(getWindDirection(270)).toBe('W');
  });
});
```


---


## 주의 사항


1. **`getWeatherIcon`의 대소문자 불일치**: `Sand`, `Ash`, `Squall`의 값이 소문자 `'wind'`로 되어 있어, Lucide 아이콘 매핑 시 `'Wind'`(대문자)와 일치하지 않습니다. 아이콘 이름을 통일하는 것을 권장합니다.


2. **`formatTime` / `formatDate`의 타임존**: `toLocaleTimeString` / `toLocaleDateString`은 **사용자 브라우저의 로컬 타임존**을 기준으로 표시됩니다. OpenWeatherMap API의 `dt` 값은 UTC 기준이므로, 도시별 타임존 오프셋(`timezone` 필드)을 적용하려면 별도 처리가 필요합니다.


3. **단위 기본값**: `formatTemperature`는 `unit`이 `'F'`가 아닌 경우 모두 섭씨로 처리합니다. 명시적으로 `'C'`를 전달하는 것이 좋습니다.

