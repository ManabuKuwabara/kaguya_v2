import React from 'react';

const Title = () => {
  return (
    <div className="mx-60 my-2 flex items-center justify-between">
      {/* 左のアイコンの部分にフォントスタイルを適用 */}
      <div className="my-0 flex items-start" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
        OFFICE VISION CHECKER
      </div>
    </div>
  );
};

export default Title;