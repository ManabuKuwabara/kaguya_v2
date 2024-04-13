import React from 'react';

// onSubmit プロップスを追加
// これにより、Submit コンポーネントは外部から送信処理を受け取れるようになる
const Submit = ({ onSubmit }) => {
  return (
    <div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => onSubmit()} // onClick イベントで外部から渡された送信処理を呼び出す
          style={{ backgroundColor: '#a0a0a0', padding: '10px 50px', border: 'none', borderRadius: '20px', color: 'white', cursor: 'pointer' }}
        >
          回答を送信する
        </button>
      </div>
    </div>
  );
};

export default Submit;
