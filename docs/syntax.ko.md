# Simple Diagram 문법 설명서

[English](syntax.md) | **한국어**

` ```diagram ` 코드블록 안에 한 줄에 박스 하나씩 쓰면, 위에서 아래로 화살표가 이어진 흐름도로 그려집니다.

> [!tip] 이 문서를 Obsidian에서 열면
> 각 예제마다 **작성법**(`markdown` 블록)과 **결과**(`diagram` 블록)가 함께 있어, 플러그인이 켜져 있으면 결과가 바로 그려집니다.

---

## 1. 기본: 박스와 화살표

한 줄 = 박스 하나. 줄 순서대로 위→아래로 배치되고, 박스 사이 화살표는 자동으로 들어갑니다.

````markdown
```diagram
클라이언트
API 서버
데이터베이스
```
````

```diagram
클라이언트
API 서버
데이터베이스
```

---

## 2. 제목과 설명: `|`

`|` 왼쪽은 **굵은 제목**, 오른쪽은 회색 **설명**입니다.
`|`를 여러 번 쓰면 설명이 한 줄씩 늘어납니다.

````markdown
```diagram
NestJS API | 인증 · 업로드 · Job ID 발급
Python Worker | PDF 분류 | 텍스트 추출 / OCR
```
````

```diagram
NestJS API | 인증 · 업로드 · Job ID 발급
Python Worker | PDF 분류 | 텍스트 추출 / OCR
```

### 들여쓰기로 설명 추가

박스 줄보다 **더 깊게 들여쓴 줄**은 바로 위 박스의 설명 줄로 붙습니다. 설명이 길 때 편합니다.

````markdown
```diagram
검증 및 저장
  스키마 검증 · 원문 대조
  중복 방지 · 결과 조회
```
````

```diagram
검증 및 저장
  스키마 검증 · 원문 대조
  중복 방지 · 결과 조회
```

---

## 3. 색상 강조: `[색상]`

줄 맨 앞에 `[색상]`을 붙이면 해당 색 테두리 + 옅은 배경이 들어갑니다.

| 색상 이름 | 비고 |
| --- | --- |
| `red` `orange` `yellow` `green` `cyan` `blue` `purple` `pink` | Obsidian 테마 색상 |
| `gray` | 회색 테두리 + 보조 배경 |
| `accent` | 현재 테마의 강조색 |
| `plain` | 테두리·배경 없음 (글자만 표시) |

````markdown
```diagram
[blue] Redis + BullMQ | 대기열 · 재시도
[green] Ollama | LLM 추론
[red] 장애 처리 | 재시도 초과 시 알림
```
````

```diagram
[blue] Redis + BullMQ | 대기열 · 재시도
[green] Ollama | LLM 추론
[red] 장애 처리 | 재시도 초과 시 알림
```

### 테두리 없는 박스: `[plain]`

시작점·끝점처럼 박스로 감쌀 필요가 없는 단계에 씁니다.

````markdown
```diagram
[plain] 현장 클라이언트 | PDF 10~50개 일괄 업로드
NestJS API | 인증 · 업로드 · Job ID 발급
```
````

```diagram
[plain] 현장 클라이언트 | PDF 10~50개 일괄 업로드
NestJS API | 인증 · 업로드 · Job ID 발급
```

> [!note]
> 목록에 없는 이름(예: `[foo]`)은 색상으로 인식하지 않고 제목 글자로 그대로 표시됩니다.

---

## 4. 나란히 배치: `;;`

한 줄에 `;;`로 구분해 여러 박스를 쓰면 같은 단계에 가로로 나란히 놓입니다. 병렬 처리를 표현할 때 씁니다.

````markdown
```diagram
[blue] Queue
[orange] Worker A | 텍스트 PDF ;; [purple] Worker B | 스캔 PDF (OCR)
[green] 결과 저장
```
````

```diagram
[blue] Queue
[orange] Worker A | 텍스트 PDF ;; [purple] Worker B | 스캔 PDF (OCR)
[green] 결과 저장
```

---

## 5. 화살표 라벨과 점선

두 박스 줄 **사이**에 화살표 줄을 넣으면, 그 사이 화살표에 적용됩니다.

| 문법 | 결과 |
| --- | --- |
| `-> 라벨` 또는 `=> 라벨` | 실선 화살표 + 라벨 |
| `--> 라벨` 또는 `..> 라벨` | 점선 화살표 + 라벨 |
| `-->` (라벨 없이) | 라벨 없는 점선 화살표 |

````markdown
```diagram
업로드 요청
-> enqueue
[blue] Queue
--> 비동기 처리
Worker
-->
알림
```
````

```diagram
업로드 요청
-> enqueue
[blue] Queue
--> 비동기 처리
Worker
-->
알림
```

> [!note]
> 첫 박스보다 앞이나 마지막 박스 뒤에 쓴 화살표 줄은 무시됩니다.

---

## 6. 다이어그램 제목: `title:`

상자 위에 굵은 제목을 표시합니다. 블록 안 어디에 써도 됩니다.

````markdown
```diagram
title: 처리 파이프라인
입력
출력
```
````

```diagram
title: 처리 파이프라인
입력
출력
```

---

## 7. 가로 방향: `direction: right`

흐름을 왼쪽→오른쪽으로 바꿉니다. `right`, `lr`, `horizontal` 중 아무거나 쓸 수 있습니다(기본값은 세로 `down`).
가로 방향에서는 `;;`로 묶은 박스가 세로로 쌓이고, 화살표 라벨은 화살표 위에 표시됩니다.

````markdown
```diagram
direction: right
Client
-> HTTP
[blue] API
-> job
Queue
[green] Worker | 처리
```
````

```diagram
direction: right
Client
-> HTTP
[blue] API
-> job
Queue
[green] Worker | 처리
```

> [!tip]
> 박스가 많아 폭을 넘으면 가로 스크롤이 생깁니다. 가로 방향은 4~5개 이하일 때 보기 좋습니다.

---

## 8. 주석

`%%` 또는 `//`로 시작하는 줄과 빈 줄은 무시됩니다.

````markdown
```diagram
%% 1단계
입력
// 2단계
출력
```
````

---

## 종합 예제: 권장 아키텍처

````markdown
```diagram
title: 1. 권장 아키텍처
[plain] 현장 클라이언트 | PDF 10~50개 일괄 업로드
NestJS API | 인증 · 업로드 · Batch ID / Job ID 발급
[blue] Redis + BullMQ | 대기열 · 재시도 · 동시성 제한 · 우선순위
Python Worker | PDF 분류 → 텍스트 추출 / OCR → 추론 요청
[green] Ollama · RX 7900 XTX 24GB | LLM 추론 — 처음에는 동시성 1
검증 및 PostgreSQL 저장 | 스키마 검증 · 원문 대조 · 중복 방지 · 결과 조회
```
````

```diagram
title: 1. 권장 아키텍처
[plain] 현장 클라이언트 | PDF 10~50개 일괄 업로드
NestJS API | 인증 · 업로드 · Batch ID / Job ID 발급
[blue] Redis + BullMQ | 대기열 · 재시도 · 동시성 제한 · 우선순위
Python Worker | PDF 분류 → 텍스트 추출 / OCR → 추론 요청
[green] Ollama · RX 7900 XTX 24GB | LLM 추론 — 처음에는 동시성 1
검증 및 PostgreSQL 저장 | 스키마 검증 · 원문 대조 · 중복 방지 · 결과 조회
```

---

## 빠른 참조

| 문법 | 의미 |
| --- | --- |
| `제목` | 박스 하나 |
| `제목 \| 설명 \| 설명2` | 제목 + 설명 줄들 |
| (더 깊게 들여쓴 줄) | 위 박스에 설명 줄 추가 |
| `[blue] 제목` | 색상 강조 |
| `[plain] 제목` | 테두리 없는 박스 |
| `A ;; B` | 같은 단계에 나란히 |
| `-> 라벨` / `=> 라벨` | 실선 화살표 라벨 |
| `--> 라벨` / `..> 라벨` | 점선 화살표 (+라벨) |
| `title: ...` | 다이어그램 제목 |
| `direction: right` | 가로 방향 |
| `%% ...` / `// ...` | 주석 |

### 알아둘 점

- 박스 안 글자는 **일반 텍스트**로 표시됩니다. 마크다운(굵게, 링크 등)은 적용되지 않습니다.
- 박스가 하나도 없으면 `diagram: no nodes to display.` 오류 메시지가 나옵니다.
- 색상은 Obsidian 테마를 따르므로 라이트/다크 모드에서 자동으로 맞춰집니다.
