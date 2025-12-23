# 프로젝트 디자인 시스템 보고서

## 1. 디자인 철학 (Design Philosophy)
"Syntro" 테마는 **깔끔하고, 현대적이며, 전문적인** 미학을 추구합니다. 세밀한 타이포그래피와 정교한 회색조(`base-*`) 및 파란색(`accent-*`) 계열을 사용하여 가독성과 명확한 시각적 위계를 최우선으로 합니다.

- **핵심 바이브 (Core Vibe)**: 미니멀하지만 디테일이 살아있음 (예: 링과 테두리를 동시에 사용하여 깊이감 표현).
- **깊이감 전략 (Depth Strategy)**: 과도한 그림자(Drop shadow) 대신, **두꺼운 링/아웃라인**(`ring-4`)과 얇은 테두리(`border`)를 조합하여 가장자리가 흐릿하지 않고 뚜렷하고 촉각적인 카드 느낌을 줍니다.
- **글래스모피즘 (Glassmorphism)**: 내비게이션 바에 제한적으로 사용하여(`bg-white/40 backdrop-blur-2xl`) 현대적인 느낌을 더했습니다.
- **라운딩 (Roundedness)**: 컨테이너에 `rounded-2xl` 및 `rounded-3xl`을 과감하게 사용하여 친근하고 부드러운 UI를 제공합니다.

## 2. 기술 스택 (The Tech Stack)
- **스타일링**: Tailwind CSS v4 (`@tailwindcss/vite`로 설정)
- **인터랙션**: Alpine.js (모바일 메뉴, 토글 등)
- **폰트**: Google Fonts ("Inter")

## 3. 색상 팔레트 (Color Palette)
`src/styles/global.css`에 정의된 변수 기반 팔레트를 사용합니다.

### 베이스 (Grays / Neutrals)
배경, 텍스트, 구조적 테두리에 사용됩니다.
- **배경**: `bg-white` (메인), `bg-base-50` (보조/카드).
- **텍스트**:
  - `text-base-900`: 제목 (메인 타이틀, 섹션 헤더).
  - `text-base-500`: 본문, 설명, 보조 정보.
- **테두리/링**: `ring-base-50`, `border-base-200`.

### 포인트 (Accent / Brand Blue)
주요 액션, 활성 상태, 강조에 사용됩니다.
- **주요 액션**: `bg-accent-600` (버튼 기본), `hover:bg-accent-700` (호버).
- **텍스트 강조**: `text-accent-600` (태그라인, 활성 링크).
- **은은한 배경**: `bg-accent-50`, `bg-accent-100` (포인트 요소 배경).

## 4. 타이포그래피 (Typography)
- **폰트 패밀리**: `Inter` (sans-serif).
- **제목 (Headings)**:
  - 스타일: `capitalize` (첫 글자 대문자), `font-medium` (중간 굵기), `text-base-900`.
  - 줄 간격: `leading-tight` 또는 `leading-snug`로 헤드라인을 밀도 있게 표현.
- **본문 (Body)**:
  - 스타일: `text-base` 또는 `text-sm`, `font-medium` (일반적인 `normal`보다 약간 두껍게 하여 가독성 확보), `text-base-500`.
- **태그라인 (Taglines)**:
  - 스타일: `uppercase` (대문자), `font-bold`, `text-sm`, `text-accent-600`.

## 5. UI 컴포넌트 스타일 (UI Component Styles)

### 버튼 (Buttons)
**기본 버튼 (Primary)**
```html

<button class="flex items-center justify-center transition-all duration-200 focus:ring-2 focus:outline-none text-white bg-accent-600 hover:bg-accent-700 focus:ring-accent-700/50 h-9 px-4 py-2 text-sm font-medium rounded-md">
  Label
</button>
```
- **특징**: 컴팩트한 높이(`h-9`), 세미 볼드(`font-medium`), 부드러운 전환 효과.

**보조 버튼 (Secondary / Outline)**
```html
<button class="flex items-center justify-center transition-all duration-200 focus:ring-2 focus:outline-none text-base-500 bg-white hover:text-accent-500 ring-1 ring-base-200 focus:ring-accent-500 h-9 px-4 py-2 text-sm font-medium rounded-md">
  Label
</button>
```
- **특징**: `border` 대신 `ring-1`을 사용하여 아웃라인을 표현.

### 카드 (Cards - Pricing / Features)
이 프로젝트의 디자인 아이덴티티를 가장 잘 보여주는 요소입니다.
```html
<div class="rounded-3xl bg-base-50 ring-4 ring-base-50 border border-base-200 p-1">
   <!-- 내용은 보통 내부에 또 다른 흰색 컨테이너를 둠 -->
</div>
```
- **특징**:
  - **이중 레이어 테두리**: 두꺼운 `ring-4`(배경색과 같거나 약간 어두움) + 얇은 `border`. 이를 통해 "매트한 액자" 같은 효과를 냅니다.
  - **라운딩**: `rounded-3xl` (매우 둥금).

### 내비게이션 바 (Navigation Bar)
```html
<header class="border-b border-black/5 sticky top-0 z-50 bg-white/40 backdrop-blur-2xl">
```
- **특징**: 스티키(Sticky), 강한 블러(`backdrop-blur-2xl`), 매우 투명한 흰색 배경(`bg-white/40`).

### 이미지 (Images)
```html
<img class="rounded-2xl ring-4 ring-base-50 border border-base-200 object-cover" />
```
- **특징**: 카드와 동일하게 링+테두리 기법을 사용하여 일관된 프레임 제공.

## 6. 바이브 코딩 적용 가이드 (Implementation Notes)
다른 프로젝트에 이 디자인을 적용할 때 다음 단계를 따르세요:

1.  **색상 복사**: CSS 변수나 Tailwind 설정에 `base-*` 및 `accent-*` 스케일을 정의하세요.
2.  **"링 프레임" 기법 적용**: 주요 콘텐츠 카드와 이미지 감싸는 요소에 `ring-4 ring-base-50 border border-base-200` 클래스 조합을 핵심으로 사용하세요.
3.  **타이포그래피 조정**: 본문 텍스트는 `text-base-500` 색상과 `font-medium` 두께를 사용하여, 얇고 흐릿한 글씨 대신 약간 단단하고 잘 읽히는 느낌을 주어야 합니다.
4.  **라운딩 강화**: 일반적인 `rounded-lg` 대신 `rounded-2xl` 또는 `3xl`을 적극적으로 사용하여 부드러운 느낌을 강조하세요.
