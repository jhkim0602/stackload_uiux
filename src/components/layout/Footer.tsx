export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-12 text-sm text-slate-500">
      <div className="container grid gap-8 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-slate-900">
             <div className="flex h-5 w-5 items-center justify-center rounded bg-slate-900 text-white text-[10px]">SL</div>
             StackLoad
          </div>
          <p className="leading-relaxed">
            개발자를 위한 올인원 커리어 플랫폼.<br />
            성장하고, 공유하고, 증명하세요.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-slate-900">플랫폼</h4>
          <ul className="space-y-2">
            <li><a href="/tech-hub" className="hover:text-slate-900">테크 허브</a></li>
            <li><a href="/jobs" className="hover:text-slate-900">채용 공고</a></li>
            <li><a href="/activities" className="hover:text-slate-900">대외 활동</a></li>
            <li><a href="/interview" className="hover:text-slate-900">AI 면접 코치</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-slate-900">커뮤니티</h4>
          <ul className="space-y-2">
            <li><a href="/community" className="hover:text-slate-900">피드</a></li>
            <li><a href="#" className="hover:text-slate-900">가이드라인</a></li>
            <li><a href="#" className="hover:text-slate-900">토론</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-slate-900">회사</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-slate-900">소개</a></li>
            <li><a href="#" className="hover:text-slate-900">블로그</a></li>
            <li><a href="#" className="hover:text-slate-900">채용</a></li>
            <li><a href="#" className="hover:text-slate-900">문의하기</a></li>
          </ul>
        </div>
      </div>
      <div className="container mt-12 border-t border-slate-200 pt-8 text-center text-xs text-slate-400">
        &copy; 2024 StackLoad. All rights reserved.
      </div>
    </footer>
  );
}
