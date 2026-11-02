// Text-first guide cards: real text remains selectable and responsive.
export function renderMaterialsGuide(g,{esc,crumbs,guideExamples}) {
 const items=list=>'<ul>'+list.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul>';
 return '<div class="wrap">'+crumbs([['제작 가이드','/guides/'],[g.title]])+'</div>'+
 '<div class="mp-intro mg-intro"><div class="wrap"><p class="mp-kicker">GUIDE / 회사소개서 제작</p><h1>'+esc(g.title)+'</h1><p class="mp-lead"><strong>완성된 원고부터 만들지 마세요.</strong><span>기존 자료와 짧은 답변으로 시작할 수 있습니다.</span></p></div></div>'+
 '<section class="mp-section mg-guide"><div class="wrap">'+
 '<div class="mg-start"><div><span class="mg-tag">먼저 보내주실 것</span><p><strong>지금 있는 자료부터</strong><br>보여주세요.</p></div><ul class="mg-file-list"><li><span aria-hidden="true">01</span>기존 소개서·초안</li><li><span aria-hidden="true">02</span>홈페이지·제품 설명서</li><li><span aria-hidden="true">03</span>짧은 메모·질문 답변</li></ul></div>'+
 '<div class="mg-card-grid">'+
 '<article class="mg-card"><div class="mg-card-top"><span class="mg-number">01</span><span class="mg-tag">짧게 알려주세요</span></div><h2><span>회사소개서 제작 · 사용 목적</span>누가, 어디서<br>읽을 자료인가요?</h2><p><strong>대상과 목적을 한두 문장으로.</strong><span>거래처 소개·영업 미팅·제휴 검토 등<br>쓰임에 따라 보여줄 순서가 달라집니다.</span></p>'+items(g.sections[0].items)+'</article>'+
 '<article class="mg-card"><div class="mg-card-top"><span class="mg-number">02</span><span class="mg-tag">있는 것부터 보내주세요</span></div><h2><span>회사소개서 제작 · 기존 자료</span>새로 쓰지 말고,<br>기존 파일부터.</h2><p><strong>처음부터 완성된 원고는 필요 없습니다.</strong><span>홈페이지·이전 소개서·설명서·메모에서<br>필요한 내용을 함께 가려냅니다.</span></p>'+items(g.sections[1].items)+'</article>'+
 '<article class="mg-card mg-card-safety"><div class="mg-card-top"><span class="mg-number">03</span><span class="mg-tag">공개 여부만 확인해주세요</span></div><h2><span>회사소개서 제작 · 공개 범위</span>써도 되는 자료인지<br>함께 확인합니다.</h2><p><strong>사진 원본과 공개 가능 범위를 전달해주세요.</strong></p>'+items(['고객명·실적 수치·인증 정보의 최신 여부 확인','사진과 자료의 사용 권한·공개 범위 확인','확인되지 않은 숫자나 고객명은 임의로 추가하지 않음'])+'</article>'+
 '<article class="mg-card mg-card-help"><div class="mg-card-top"><span class="mg-number">04</span><span class="mg-tag">함께 정리할 것</span></div><h2><span>회사소개서 제작 · 기획 순서</span>자료가 부족해도<br>순서부터 잡아드립니다.</h2><p><strong>없는 자료를 억지로 채우지 마세요.</strong><span>자료 검토와 목차·스토리라인 기획을<br>함께 진행합니다.</span></p><ol class="mg-mini-flow"><li><b>1</b>기존 자료 검토</li><li><b>2</b>먼저 필요한 정보 정리</li><li><b>3</b>추가 확인 자료 나누어 준비</li></ol></article>'+
 '</div><div class="mg-bottom"><p><strong>무엇부터 보내야 할지 막막하신가요?</strong><span>지금 가진 자료와 사용 목적부터 알려주세요.</span></p><a class="btn btn-accent" href="/#contact">지금 있는 자료로 상담하기 ↗</a></div>'+
 '<nav class="mg-related" aria-label="관련 준비 안내"><a href="/#faq">자주 묻는 질문 →</a><a href="/guides/outline/">목차 구성 안내 →</a><a href="/guides/estimate/">견적 상담 안내 →</a><a href="/portfolio/">실제 제작 사례 →</a></nav><p class="mp-note">작성: 피피티브랜딩 · 업데이트: '+esc(g.updated)+'<br>구체적인 제작 범위와 조건은 자료 확인 후 협의합니다.</p></div></section>'+guideExamples(g);
}
