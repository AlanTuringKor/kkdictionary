import React from 'react';

function Privacy() {
  return (
    <div className="privacy-page">
      <h1>ㅋㅋ백과 개인정보 처리방침</h1>
      <p>당신의 프라이버시는 우리에게 소중합니다.</p>

      <section>
        <h3>📅 적용일자</h3>
        <p><strong>2025년 3월 28일</strong></p>
      </section>

      <section>
        <h3>📌 수집하는 정보</h3>
        <p>
          우리는 서비스 개선을 위해 최소한의 익명 정보를 수집할 수 있으며,
          이름, 이메일 등의 개인정보는 수집하지 않습니다.
        </p>
      </section>

      <section>
        <h3>🔐 제3자 제공</h3>
        <p>
          수집된 정보는 절대 외부에 제공되지 않으며, 오직 서비스 품질 향상을 위한 내부 분석 용도로만 사용됩니다.
        </p>
      </section>

      <section>
        <h3>📮 문의하기</h3>
        <p>
          개인정보 관련 문의는 <strong>privacy@kkbakwa.app</strong> 으로 연락 주세요.
        </p>
      </section>
    </div>
  );
}

export default Privacy;
