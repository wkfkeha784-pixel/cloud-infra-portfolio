# 웹 포트폴리오 시연영상 사진 기록 — 2026-10-23

홈과 프로젝트 상세를 위한 실제 영상 캡처 5장입니다. 본문에는 필요한 짧은 캡션만 사용하며, 영상명·시점을 반복 노출하지 않습니다. 모든 이미지는 실제 시연영상에서 추출했고 주변 화면 크롭, 대비·선명도 보정만 적용했습니다. 수치·텍스트·그래프의 내용은 변경하지 않았습니다.

| 공개 파일 | 영상 | 원본 시점 | 사용 위치·의미 |
|---|---|---|---|
| `durian-service.webp` | `durian_demo_with_audio.mp4` | 02:17 | Durian 서비스 아키텍처 옆 실제 수강신청 화면 |
| `durian-monitoring.webp` | 동일 | 03:30 | 운영 관측 예시 Grafana. **Consumer 1→4→1 직접 증명 사진은 아님** |
| `bluebell-service.webp` | `Bluebell(2팀) 프로젝트 시연영상 (1).mp4` | 07:40 | Bluebell Web–WAS–DB 서비스 예시 |
| `bluebell-target-healthy.webp` | 동일 | 07:27 | AWS Web Target Group 대상 합계 2, Healthy 2, Unhealthy 0. **인스턴스/VPC 식별정보 영역 제외한 공개용 크롭** |
| `bluebell-monitoring.webp` | 동일 | 02:10 | Web 노드 Grafana 리소스 화면. Replacement 관측 복원 자체는 별도 팀 검증 기록 기준 |

## 주의
- Web Target Group의 Healthy 2를 다른 AZ나 WAS Target Group까지 자동으로 입증하는 자료로 표현하지 않습니다.
- Grafana 화면은 운영/관측의 실물 예시이며 특정 Recovery 이벤트의 전후 비교 그래프로 과장하지 않습니다.
- 실제 영상 캡처를 설계용 아키텍처 다이어그램과 혼동하지 않습니다.
- 동영상 타임스탬프와 공개 이미지 제작 기록은 이 내부 소스 문서에 두고, 채용 담당자에게는 필요한 설명만 배치합니다.
- OneReport, Labbit 시연영상은 이번 소스에 없으므로 임의 이미지를 넣지 않았습니다.
