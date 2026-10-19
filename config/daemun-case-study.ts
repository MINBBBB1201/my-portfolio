export const daemunCaseStudy = {
  en: {
    label: "Project story",
    intro: "DAEMUN III is Qingdao Daewon School's Model United Nations conference, where students represent countries and debate proposals called resolutions. As Deputy Head of Technology, I worked with the technology team on the software that helped delegates prepare and organizers run the conference.",
    sections: [
      {
        title: "Roger: answering questions with a source",
        paragraphs: [
          "New delegates need answers about registration, schedules, and how a conference works. I built the first version of Roger, the site's AI assistant, including the chat endpoint, website widget, FAQ editor, and question-and-answer log for organizers.",
          "My initial retrieval pipeline matched question keywords against published FAQs and passed the relevant entries to Gemini. I wrote instructions to acknowledge missing conference information and direct visitors to the organizers, with checks for requests for private information and internal instructions. I also added request limits and expanded the FAQ seed document to 103 beginner-focused entries.",
          "Keyword matching missed questions that used different wording for the same idea. I documented that limitation and an evaluation set covering ordinary questions, missing information, and adversarial requests. The team later replaced FAQ-only retrieval with public site data in the model's context. This project made source coverage and failure behavior part of my AI work, alongside the quality of the answer itself.",
        ],
      },
      {
        title: "From a delegate's draft to a published resolution",
        paragraphs: [
          "I built team assignment tools and the delegate-facing submission flow. A team lead could see their roster and upload a draft; the server checked both the signed-in account and the person's role in that team. Organizers could review submissions and publish approved resolutions for one committee or all committees.",
          "I added a version record for each delegate upload, an upload-history view, and notification emails to the other team members. When adapting uploads for Vercel, I found that the application's 25 MB file allowance exceeded the function request-body limit. I extended the existing direct-to-storage upload approach to delegates, so the file could go to object storage before the API finalized its record. A failed notification would not undo a successful submission.",
        ],
      },
      {
        title: "Giving organizers control",
        paragraphs: [
          "My work also included the admin application's foundation and editing screens for conference information, people, committees, schedules, documents, and announcements. Changes could flow through the shared API to the public site, so organizers could update content without editing source files.",
          "I worked within a shared Next.js, Hono, and PostgreSQL codebase. The original public-site design and initial backend structure were team work; my contributions included extending the data model, building admin and delegate workflows, and implementing the first chatbot. Linked pull requests show that scope and the subsequent review changes.",
        ],
      },
    ],
    evidenceTitle: "Selected contributions",
    evidenceNote: "These merged pull requests connect the project story to implementation and review.",
    sources: ["First chatbot, widget, and evaluation notes", "FAQ retrieval", "Team model and delegate submission API", "Upload versions and storage integration", "Publishing by committee"],
    galleryTitle: "Inside the project",
    screenCaption: "Local preview rendered from the public repository with its bundled default content. This shows the conference site's design, not a recording of live conference traffic.",
    chatCaption: "Roger's chat interface in the local source preview. The opening message is built into the interface; no generated reply or live API result is shown here.",
    flowCaption: "Submission flow illustrated from the implementation. Upload history covers delegate submissions; organizer edits through the generic admin editor are outside that history.",
  },
  ko: {
    label: "프로젝트 이야기",
    intro: "DAEMUN III는 청도대원학교의 모의유엔 행사입니다. 학생들은 각국의 대표를 맡아 의제를 토론하고 결의안을 작성합니다. 저는 Deputy Head of Technology로 기술팀과 함께 참가자 준비와 행사 운영에 필요한 웹 기능을 개발했습니다.",
    sections: [
      {
        title: "Roger: 근거를 보고 답하는 챗봇",
        paragraphs: [
          "처음 참가하는 학생들은 신청 방법부터 일정, 회의 절차까지 궁금한 점이 많습니다. 저는 사이트 안내 챗봇 Roger의 첫 버전을 구현했습니다. 채팅 API와 웹 위젯을 만들고, 운영진이 FAQ를 편집하고 질문과 답변 기록을 확인하는 화면도 개발했습니다.",
          "초기 검색 구조는 질문의 키워드와 공개 FAQ를 비교한 뒤 관련 항목을 Gemini에 전달하는 방식이었습니다. 확인할 수 없는 행사 정보는 모른다고 답하고 공식 문의처를 안내하도록 프롬프트를 작성했습니다. 개인정보와 내부 지침 요청에 대한 대응도 점검했습니다. 요청 횟수 제한을 추가하고 초보 참가자를 위한 FAQ 초안 문서를 103개 항목으로 확장했습니다.",
          "같은 뜻이라도 표현이 다르면 키워드 검색이 관련 FAQ를 놓쳤습니다. 이 한계를 문서에 남기고 일반 질문, 정보가 없는 질문, 악의적인 요청을 포함한 평가 질문을 정리했습니다. 이후 팀은 FAQ 검색 대신 공개 사이트 데이터를 모델에 전달하도록 바꿨습니다. 이 작업에서 답변 문장뿐 아니라 어떤 근거를 전달할지, 답할 수 없을 때 어떻게 대응할지도 함께 다뤘습니다.",
        ],
      },
      {
        title: "참가자의 초안이 공개 결의안이 되기까지",
        paragraphs: [
          "팀 배정 도구와 참가자용 제출 기능을 개발했습니다. 팀장은 팀원 목록을 확인하고 초안을 올릴 수 있으며, 서버는 로그인 상태와 해당 팀의 역할을 함께 검사합니다. 운영진은 제출물을 검토한 뒤 승인된 결의안을 위원회별로 공개하거나 한꺼번에 공개할 수 있습니다.",
          "참가자가 파일을 올릴 때마다 버전 기록을 남기고, 운영 화면에서 이전 제출본을 확인하도록 했습니다. 다른 팀원에게 알림 메일을 보내는 기능도 추가했습니다. Vercel 환경에 맞추는 과정에서는 앱의 25 MB 업로드 허용량이 함수 요청 본문 한도를 넘는 문제를 확인했습니다. 기존 관리자용 직접 업로드 방식을 참가자에게도 적용해 파일은 저장소로 보내고 API는 업로드 기록을 확정하도록 연결했습니다. 메일 전송이 실패해도 제출 자체는 유지하도록 처리했습니다.",
        ],
      },
      {
        title: "운영진이 직접 관리하는 사이트",
        paragraphs: [
          "관리자 앱의 기본 구조와 회의 정보, 인물, 위원회, 일정, 문서, 공지사항 편집 화면도 개발했습니다. 수정 내용은 공용 API를 거쳐 공개 사이트에 반영되므로 운영진이 소스 파일을 고치지 않고 내용을 관리할 수 있습니다.",
          "Next.js, Hono, PostgreSQL을 사용하는 공동 코드베이스에서 작업했습니다. 공개 사이트의 원래 디자인과 초기 백엔드 구조는 팀 작업이며, 저는 데이터 모델 확장, 관리자와 참가자 기능, 초기 챗봇 구현을 맡았습니다. 아래 PR에서 각 작업의 범위와 리뷰 후 수정 내용을 확인할 수 있습니다.",
        ],
      },
    ],
    evidenceTitle: "구현 기록",
    evidenceNote: "병합된 PR에서 본문에 설명한 구현과 리뷰 내용을 확인할 수 있습니다.",
    sources: ["초기 챗봇과 웹 위젯, 평가 기록", "FAQ 검색 함수", "팀 모델과 참가자 제출 API", "업로드 버전 기록과 저장소 연결", "위원회별 결의안 공개"],
    galleryTitle: "프로젝트 화면",
    screenCaption: "공개 저장소의 기본 콘텐츠로 실행한 로컬 화면입니다. 행사 사이트의 디자인을 보여주며 실제 운영 트래픽을 기록한 화면은 아닙니다.",
    chatCaption: "로컬에서 실행한 Roger 채팅 화면입니다. 첫 안내 문구는 UI에 포함된 고정 문구이며 생성 답변이나 실제 API 응답은 표시하지 않았습니다.",
    flowCaption: "구현 코드를 바탕으로 그린 제출 흐름입니다. 버전 기록은 참가자의 제출을 대상으로 하며 관리자의 일반 편집은 포함하지 않습니다.",
  },
};

export const daemunEvidenceLinks = [
  "https://github.com/junwonkim07/DAEMUN-III/pull/19",
  "https://github.com/junwonkim07/DAEMUN-III/pull/14",
  "https://github.com/junwonkim07/DAEMUN-III/pull/26",
  "https://github.com/junwonkim07/DAEMUN-III/pull/52",
  "https://github.com/junwonkim07/DAEMUN-III/pull/57",
];
