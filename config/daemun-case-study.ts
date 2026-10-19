export const daemunCaseStudy = {
  "en": {
    "label": "Project story",
    "intro": "Junwon Kim and I co-developed the full DAEMUN III conference platform for Qingdao Daewon School. As Deputy Head of Technology, I worked across the public website, AI assistant, backend, organizer dashboard, and delegate submission system. In Model United Nations, students represent countries and debate proposals called resolutions; our software connected the information and document workflows around that process.",
    "sections": [
      {
        "title": "Roger: building an AI assistant around conference information",
        "paragraphs": [
          "Roger helped visitors ask about registration, committees, schedules, and conference preparation in ordinary language. We built the chat API and website widget, an FAQ editor, and a question-and-answer log that organizers could use to find information gaps. The FAQ seed document grew to 103 beginner-focused entries.",
          "The first version matched question keywords against published FAQs and passed the results to Gemini. Testing exposed a coverage problem: two questions could mean the same thing without sharing the words needed for a match. We documented that limitation and changed the pipeline to include public conference data and published FAQs directly in the model's context. The information set was small enough to fit, so retrieval was introducing missed facts without a necessary reduction in size.",
          "We bounded field and total context lengths, removed markup that could break the prompt structure, and excluded participant submissions from the assistant's context. The prompt distinguished conference facts from general MUN guidance, directed missing-information questions to official contacts, and included handling for private-information requests and attempts to override its instructions. Evaluation questions covered common requests, missing facts, greetings, and adversarial inputs."
        ]
      },
      {
        "title": "Handling slow responses and unavailable models",
        "paragraphs": [
          "We added Vercel AI Gateway as the first provider route, with a direct Gemini fallback for upstream failures when configured. The code distinguishes unavailable providers, blocked requests, and failed completions, and limits conversation history and response size. Per-IP request limits and request-body bounds constrain endpoint use; the in-memory request limits apply per running API instance.",
          "Answers stream through server-sent events instead of waiting for a complete response. The interface includes loading feedback, a fresh-conversation control, Markdown rendering, and input handling that avoids sending Korean messages while the user is still composing them. We also supported reduced-motion preferences and fixed the closed chat widget intercepting clicks on content underneath it."
        ]
      },
      {
        "title": "A shared backend for the public site and organizer dashboard",
        "paragraphs": [
          "We developed a TypeScript monorepo with separate Next.js public and admin applications, a Hono API, and shared validation schemas. PostgreSQL and Drizzle model conference information, committees, topics, people, teams, resolutions, schedules, documents, announcements, FAQs, and diagnostic records. Database relationships define what happens when linked content is deleted.",
          "A reusable CRUD factory supplies list, create, update, delete, and reorder operations for content resources. Shared Zod schemas validate requests, while authenticated admin and delegate routes enforce different permissions. Email verification, password reset, and account management support participant access. Content changes trigger public-site cache revalidation so organizers can publish updates without a source-code deployment."
        ]
      },
      {
        "title": "From a delegate's draft to a published resolution",
        "paragraphs": [
          "We connected registration and team assignment to a delegate account page. A team lead could see their roster and submit a draft; the server checked the account and its role in the assigned team. Organizers could track awaiting, under-review, approved, and published states and release approved resolutions by committee or across all committees. Unpublished document links stay out of the public payload, while the approval panel can show submission status.",
          "Delegate uploads append a version record, expose earlier submissions in the admin history view, and notify other team members by email. A notification failure does not undo a successful submission. We preserved historical file references during upload cleanup so superseded drafts would not disappear from the history.",
          "The application's 25 MB file allowance exceeded Vercel's function request-body limit. We implemented token-authorized browser-to-Blob uploads for admin and delegate flows, then finalized document records through the API. File type and size validation, storage-key checks, and original download filenames were part of the same document workflow."
        ]
      },
      {
        "title": "A public site that organizers could maintain",
        "paragraphs": [
          "The public website brings together the conference introduction and theme, secretariat, committees and topics, schedule, announcements, MUN guide, and document downloads. We combined responsive layouts with scroll-based presentation, conference media, and portrait cards. The guide explains the conference's procedure, while committee reports and resolution documents are available through the relevant pages.",
          "The dashboard lets organizers edit conference details, people and greetings, committees, topics, schedules, FAQs, documents, and announcements, manage accounts and teams, and preview public content. We connected homepage dates to the conference record, emphasized submission deadlines, and corrected migrated photo paths and document-link behavior."
        ]
      },
      {
        "title": "Deployment, maintenance, and document diagnostics",
        "paragraphs": [
          "We moved the platform from a Docker-based VPS setup to separate Vercel web, API, and admin deployments, with Neon PostgreSQL and Vercel Blob. Same-origin proxies connect browser applications to the API, shared packages keep types consistent, and database migrations run in the API build process. CI checks types, lint, and builds. The public frontend also has bundled fallback content for an unavailable API.",
          "For document-opening problems, we added a diagnostic page and admin telemetry view with anonymous references to correlate link clicks, reachability probes, and user-submitted outcomes. The code integrates sanitized browser/server error reporting with Sentry and Neon, with payload limits, redaction, and retention handling. A successful probe establishes reachability, not proof that a browser saved a file or an external viewer displayed it; the diagnostic design keeps those outcomes separate.",
          "Junwon and I developed the project together across AI behavior, content management, permissions, file delivery, and deployment. The implementation records below cover the original platform and its subsequent improvements."
        ]
      }
    ],
    "evidenceTitle": "Implementation and review",
    "evidenceNote": "Selected records from the platform Junwon Kim and I co-developed.",
    "sources": [
      "Monorepo, database, and content API",
      "First chatbot and evaluation notes",
      "Public site data as AI context",
      "Provider routing and fallback",
      "Streaming responses",
      "Conversational interface",
      "Teams and submission permissions",
      "Upload versions and storage integration",
      "Publishing by committee",
      "Admin content management",
      "Document diagnostics",
      "Download filenames and file types"
    ],
    "galleryTitle": "Inside the project",
    "chatCaption": "Roger's chat interface in the local source preview. The opening message is built into the interface; no generated reply or live API result is shown here.",
    "flowCaption": "Submission flow illustrated from the implementation. Upload history covers delegate submissions; organizer edits through the generic admin editor are outside that history."
  },
  "ko": {
    "label": "프로젝트 이야기",
    "intro": "준원이와 함께 청도대원학교 모의유엔 행사 DAEMUN III의 전체 웹 플랫폼을 공동 개발했습니다. 저는 Deputy Head of Technology로 공개 사이트, AI 안내 챗봇, 백엔드, 관리자 화면, 참가자 제출 시스템 전반에 관여했습니다. 모의유엔에서는 학생들이 각국 대표를 맡아 의제를 토론하고 결의안을 작성합니다. 저희는 그 과정에 필요한 정보와 문서 처리 기능을 하나의 플랫폼으로 연결했습니다.",
    "sections": [
      {
        "title": "Roger: 행사 정보를 근거로 답하는 AI 챗봇",
        "paragraphs": [
          "Roger는 방문자가 신청 방법, 위원회, 일정, 행사 준비에 관한 질문을 일상적인 말로 입력할 수 있는 안내 챗봇입니다. 채팅 API와 웹 위젯을 만들고 운영진이 FAQ를 편집하고 질문과 답변 기록에서 정보가 부족한 부분을 찾는 화면도 개발했습니다. 초보 참가자를 위한 FAQ 초안 문서는 103개 항목으로 확장했습니다.",
          "첫 버전은 질문의 키워드와 공개 FAQ를 비교해 관련 항목을 Gemini에 전달했습니다. 테스트하면서 같은 뜻의 질문도 표현이 다르면 검색이 놓치는 문제를 확인했습니다. 이 한계를 문서에 남긴 뒤 공개 행사 데이터와 FAQ를 모델에 직접 전달하는 구조로 바꿨습니다. 전체 정보량이 컨텍스트에 들어갈 만큼 작아서 검색으로 내용을 줄일 필요보다 검색 누락을 없애는 쪽이 더 중요했습니다.",
          "필드별 길이와 전체 컨텍스트 크기를 제한하고 프롬프트 구조를 깨뜨릴 수 있는 마크업을 제거했습니다. 참가자 제출물은 챗봇 컨텍스트에서 제외했습니다. 프롬프트에는 행사 고유 정보와 모의유엔 일반 안내를 구분하고, 모르는 정보는 공식 문의처로 연결하며, 개인정보 요청과 내부 지침을 바꾸려는 입력에 대응하는 규칙을 담았습니다. 평가 질문에는 자주 묻는 내용, 근거가 없는 질문, 인사와 악의적인 입력을 포함했습니다."
        ]
      },
      {
        "title": "모델이 느리거나 응답하지 않을 때의 대화 처리",
        "paragraphs": [
          "Vercel AI Gateway를 우선 호출하고 외부 서비스 오류가 발생하면 설정된 Gemini 직접 호출로 전환하도록 구성했습니다. 서비스를 사용할 수 없는 경우, 요청이 차단된 경우, 답변 생성이 실패한 경우를 구분하고 대화 이력과 응답 크기도 제한했습니다. IP별 요청 횟수와 요청 본문 크기를 제한하되 메모리 기반 횟수 제한은 실행 중인 API 인스턴스별로 적용됩니다.",
          "답변이 전부 완성될 때까지 기다리는 대신 서버 전송 이벤트로 생성 내용을 차례로 표시하도록 했습니다. 대화창에는 로딩 표시, 새 대화 버튼, 마크다운 표시를 추가했습니다. 한글 조합 중 Enter를 눌렀을 때 메시지가 잘못 전송되지 않도록 처리했고 움직임 줄이기 설정도 반영했습니다. 닫힌 챗봇 위젯이 뒤쪽 콘텐츠의 클릭을 가로막던 문제도 수정했습니다."
        ]
      },
      {
        "title": "공개 사이트와 관리자 화면을 연결하는 백엔드",
        "paragraphs": [
          "Next.js 공개 사이트와 관리자 앱, Hono API, 공용 검증 스키마를 TypeScript 모노레포로 구성했습니다. PostgreSQL과 Drizzle로 회의 정보, 위원회, 의제, 인물, 팀, 결의안, 일정, 문서, 공지사항, FAQ, 진단 기록을 관리합니다. 연결된 콘텐츠가 삭제될 때의 처리도 데이터베이스 관계로 정의했습니다.",
          "반복되는 콘텐츠 API는 공용 CRUD 함수로 목록 조회, 생성, 수정, 삭제, 순서 변경을 처리하도록 만들었습니다. 공용 Zod 스키마로 요청을 검증하고 관리자 경로와 참가자 경로의 권한을 구분했습니다. 이메일 인증, 비밀번호 재설정, 계정 관리도 연결했습니다. 콘텐츠가 바뀌면 공개 사이트의 캐시를 갱신해 운영진이 소스 코드를 배포하지 않고 내용을 반영할 수 있도록 했습니다."
        ]
      },
      {
        "title": "참가자의 초안이 공개 결의안이 되기까지",
        "paragraphs": [
          "가입과 팀 배정을 참가자 계정 화면에 연결했습니다. 팀장은 팀원 목록을 확인하고 초안을 제출할 수 있으며 서버는 계정과 배정된 팀의 역할을 함께 검사합니다. 운영진은 제출 대기, 검토 중, 승인, 공개 상태를 관리하고 승인된 결의안을 위원회별로 또는 한꺼번에 공개할 수 있습니다. 공개 전 문서 링크는 공개 API에서 숨기면서도 결의안 현황판에는 제출 상태를 표시할 수 있도록 구성했습니다.",
          "참가자가 파일을 올릴 때마다 버전 기록을 남기고 관리자 화면에서 이전 제출본을 확인하도록 했습니다. 다른 팀원에게 알림 메일을 보내되 전송 실패가 제출 자체를 취소하지 않도록 처리했습니다. 업로드 파일을 정리할 때도 과거 버전이 참조하는 파일을 보존해 제출 이력이 끊기지 않도록 했습니다.",
          "앱의 25 MB 파일 허용량이 Vercel 함수의 요청 본문 한도를 넘는 문제도 다뤘습니다. 관리자와 참가자 모두 업로드 토큰을 받아 브라우저에서 Blob 저장소로 파일을 보낸 뒤 API에서 문서 기록을 확정하도록 구현했습니다. 파일 종류와 용량 검사, 저장소 키 검증, 다운로드 시 원래 파일명 표시도 함께 처리했습니다."
        ]
      },
      {
        "title": "운영진이 직접 관리하는 행사 사이트",
        "paragraphs": [
          "공개 사이트에는 행사 소개와 대주제, 사무국, 위원회와 의제, 일정, 공지, 모의유엔 가이드, 문서 다운로드를 구성했습니다. 반응형 화면에 스크롤 연출, 행사 미디어, 인물 카드를 결합했습니다. 가이드는 행사의 회의 절차를 설명하고 위원회 보고서와 결의안 문서는 관련 페이지에서 열 수 있도록 연결했습니다.",
          "관리자 화면에서는 행사 정보, 인물과 인사말, 위원회, 의제, 일정, FAQ, 문서, 공지사항을 편집하고 계정과 팀을 관리하며 공개 화면을 미리 볼 수 있습니다. 홈의 날짜를 회의 데이터에 연결하고 제출 마감일을 강조했습니다. 데이터 이전 후 깨진 사진 경로와 문서 링크 동작도 수정했습니다."
        ]
      },
      {
        "title": "배포와 유지보수, 문서 문제 진단",
        "paragraphs": [
          "처음의 Docker 기반 VPS 구성에서 공개 사이트, API, 관리자 앱을 각각 Vercel에 배포하는 구조로 옮기고 Neon PostgreSQL과 Vercel Blob을 연결했습니다. 브라우저 앱은 같은 출처의 프록시로 API에 접근하고 공용 패키지로 타입을 공유합니다. 데이터베이스 마이그레이션은 API 빌드 과정에서 적용하며 CI에서 타입, lint, 빌드를 검사합니다. API에 연결할 수 없을 때 공개 사이트가 사용할 기본 콘텐츠도 마련했습니다.",
          "문서가 열리지 않는 문제를 추적할 수 있도록 진단 페이지와 관리자 기록 화면을 추가했습니다. 익명 참조값으로 링크 클릭, 접근 확인 요청, 사용자가 신고한 결과를 연결합니다. 코드에는 Sentry와 Neon을 이용한 브라우저 및 서버 오류 기록, 민감 정보 제거, 요청 크기 제한, 보관 처리가 포함돼 있습니다. 접근 확인 요청이 성공해도 브라우저가 파일을 저장했거나 외부 뷰어가 문서를 표시했다고 단정할 수 없으므로 각각을 구분하도록 설계했습니다.",
          "준원이와 AI 응답 처리부터 콘텐츠 관리, 권한, 파일 전달, 배포까지 함께 개발한 프로젝트입니다. 아래에는 초기 플랫폼과 후속 개선을 함께 확인할 수 있는 구현 기록을 연결했습니다."
        ]
      }
    ],
    "evidenceTitle": "구현과 리뷰 기록",
    "evidenceNote": "준원이와 공동 개발한 플랫폼의 주요 구현 기록입니다.",
    "sources": [
      "모노레포, 데이터베이스, 콘텐츠 API",
      "초기 챗봇과 평가 기록",
      "공개 사이트 데이터 기반 AI 컨텍스트",
      "모델 호출과 장애 시 대체 경로",
      "응답 스트리밍",
      "대화 인터페이스",
      "팀과 제출 권한",
      "업로드 버전 기록과 저장소 연결",
      "위원회별 결의안 공개",
      "관리자 콘텐츠 편집",
      "문서 문제 진단",
      "다운로드 파일명과 종류 표시"
    ],
    "galleryTitle": "프로젝트 화면",
    "chatCaption": "로컬에서 실행한 Roger 채팅 화면입니다. 첫 안내 문구는 UI에 포함된 고정 문구이며 생성 답변이나 실제 API 응답은 표시하지 않았습니다.",
    "flowCaption": "구현 코드를 바탕으로 그린 제출 흐름입니다. 버전 기록은 참가자의 제출을 대상으로 하며 관리자의 일반 편집은 포함하지 않습니다."
  }
};

export const daemunEvidenceLinks = [
  "https://github.com/junwonkim07/DAEMUN-III/commit/b34011c63e",
  "https://github.com/junwonkim07/DAEMUN-III/pull/19",
  "https://github.com/junwonkim07/DAEMUN-III/pull/60",
  "https://github.com/junwonkim07/DAEMUN-III/pull/59",
  "https://github.com/junwonkim07/DAEMUN-III/pull/62",
  "https://github.com/junwonkim07/DAEMUN-III/pull/61",
  "https://github.com/junwonkim07/DAEMUN-III/pull/26",
  "https://github.com/junwonkim07/DAEMUN-III/pull/52",
  "https://github.com/junwonkim07/DAEMUN-III/pull/57",
  "https://github.com/junwonkim07/DAEMUN-III/pull/8",
  "https://github.com/junwonkim07/DAEMUN-III/pull/68",
  "https://github.com/junwonkim07/DAEMUN-III/pull/69"
];
