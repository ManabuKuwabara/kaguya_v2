'use client';
import React, { useState } from 'react';
import TitleBar from './components/TitleBar';
import Title from './components/0_title';
import Q1 from './components/Q1';
import Q1selection from './components/Q1_selection';
import Q2 from './components/Q2';
import Q2selection from './components/Q2_selection';
import Q3 from './components/Q3';
import Q3selection from './components/Q3_selection';
import Q4 from './components/Q4';
import Q4selection from './components/Q4_selection';
import Q5 from './components/Q5';
import Q5selection from './components/Q5_selection';
import Q6 from './components/Q6';
import Q6selection from './components/Q6_selection';
import Q7 from './components/Q7';
import Q7selection from './components/Q7_selection';
import Q8 from './components/Q8';
import Q8selection from './components/Q8_selection';
import Q9 from './components/Q9';
import Q9selection from './components/Q9_selection';
import Q10 from './components/Q10';
import Q10selection from './components/Q10_selection';
import Q11 from './components/Q11';
import Q11selection from './components/Q11_selection';
import Submit from './components/Submit';
import Footer from './components/Footer';
import Box from '@mui/material/Box';


export default function Home() {
  const [isActive, setIsActive] = useState(false);

  // 設問の回答を管理する状態
  const [responses, setResponses] = useState({
    q1Selection: [],
    q2Selection: "",
    q3Selection: 50, //Q3のデフォルト値を50に設定
    q4Selection: 50, //Q4のデフォルト値を50に設定
    q5Selection: 50, //Q5のデフォルト値を50に設定
    q6Selection: 50, //Q6のデフォルト値を50に設定
    q7Selection: [],
    q8Selection: "",
    q9Selection: [],
    q10Selection: "",
    q11Selection: "",
    // q3Selection: [],
  });
  
  // Q1selectionからの回答を収集する関数
  const handleSaveQ1Selection = (selection) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      q1Selection: selection,
    }));
  };

  // Q2selectionからの回答を収集する新しい関数
  const handleSaveQ2Selection = (selection) => {
    setResponses({ ...responses, q2Selection: selection });
  };

 // Q3selectionからの回答を収集する新しい関数
  const handleSaveQ3Selection = (selection) => {
    setResponses({ ...responses, q3Selection: selection });
  };

  // Q4selectionからの回答を収集する新しい関数
  const handleSaveQ4Selection = (selection) => {
    setResponses({ ...responses, q4Selection: selection });
  };

  // Q5selectionからの回答を収集する新しい関数
  const handleSaveQ5Selection = (selection) => {
    setResponses({ ...responses, q5Selection: selection });
  };

  // Q6selectionからの回答を収集する新しい関数
  const handleSaveQ6Selection = (selection) => {
    setResponses({ ...responses, q6Selection: selection });
  };

  // Q7selectionからの回答を収集する関数
  const handleSaveQ7Selection = (selection) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      q7Selection: selection,
    }));
  };

  // Q8selectionからの回答を収集する新しい関数
  const handleSaveQ8Selection = (selection) => {
    setResponses({ ...responses, q8Selection: selection });
  };

  // Q9selectionからの回答を収集する関数
  const handleSaveQ9Selection = (selection) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      q9Selection: selection,
    }));
  };

  // Q10selectionからの回答を収集する関数
  const handleSaveQ10Selection = (selection) => {
    setResponses({ ...responses, q10Selection: selection });
  };

  // Q11selectionからの回答を収集する関数
  const handleSaveQ11Selection = (selection) => {
    setResponses({ ...responses, q11Selection: selection });
  };


  // 送信ボタンの処理
  const handleSubmit = async () => { 
    // 未選択の設問名を格納する配列
    const unselectedQuestions = [];
    // 無効な入力をした設問名を格納する配列（0以下の数値が入力された場合）
    const invalidInputQuestions = [];
  
    // 各設問の選択状態を確認
    if (responses.q1Selection.length === 0) unselectedQuestions.push("Q1");
    if (responses.q2Selection === "") unselectedQuestions.push("Q2");
    if (responses.q7Selection.length === 0) unselectedQuestions.push("Q7");
    if (responses.q8Selection === "") unselectedQuestions.push("Q8");
    if (responses.q9Selection.length === 0) unselectedQuestions.push("Q9");
    // Q10とQ11について、1以上の数値が入力されているかチェック
    if (!responses.q10Selection || responses.q10Selection <= 0) invalidInputQuestions.push("Q10");
    if (!responses.q11Selection || responses.q11Selection <= 0) invalidInputQuestions.push("Q11");
  
    let alertMessage = "";
    // 未選択の設問があれば警告メッセージを準備
    if (unselectedQuestions.length > 0) {
      alertMessage += `${unselectedQuestions.join("、")}の設問が未選択です。`;
    }
    // 無効な入力があれば警告メッセージを追加
    if (invalidInputQuestions.length > 0) {
      if (alertMessage.length > 0) alertMessage += "\n"; // 既に他のメッセージがある場合は改行を挿入
      alertMessage += `${invalidInputQuestions.join("、")}には1以上の数値を入力してください。`;
    }
  
    // いずれかの警告があれば警告を表示して送信処理を中断
    if (alertMessage.length > 0) {
      alert(alertMessage);
      return;
    }
  
    // Q3～Q6の値を0～1の範囲に変換
    const q3Converted = responses.q3Selection === 100 ? 1 : responses.q3Selection === 0 ? 0 : responses.q3Selection / 100;
    const q4Converted = responses.q4Selection === 100 ? 1 : responses.q4Selection === 0 ? 0 : responses.q4Selection / 100;
    const q5Converted = responses.q5Selection === 100 ? 1 : responses.q5Selection === 0 ? 0 : responses.q5Selection / 100;
    const q6Converted = responses.q6Selection === 100 ? 1 : responses.q6Selection === 0 ? 0 : responses.q6Selection / 100;
  
    // 送信処理を続行
    try {
      const response = await fetch('http://127.0.0.1:8000/submit/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q1_answer: responses.q1Selection, 
          q2_answer: responses.q2Selection,
          q3_answer: q3Converted, 
          q4_answer: q4Converted, 
          q5_answer: q5Converted,
          q6_answer: q6Converted,
          q7_answer: responses.q7Selection,
          q8_answer: responses.q8Selection,
          q9_answer: responses.q9Selection,
          q10_answer: responses.q10Selection,
          q11_answer: responses.q11Selection,
        }),
      });
  
      if (!response.ok) {
        throw new Error('サーバーへの送信に失敗しました');
      }
  
      const result = await response.json();
      alert('回答を送信しました');
    } catch (error) {
      console.error('エラー:', error);
      alert('エラーが発生しました: ' + error.message);
    }
  };

  return (
    <>
      <TitleBar />
       {/* 共通のスタイリングを適用する親コンテナ */}
       <Box sx={{ maxWidth: '1350px', margin: 'auto' }}>
          <Title />
          <Q1 />
           {/* Q1selectionにonSaveプロパティとしてhandleSaveQ1Selectionを渡す */}
            <Q1selection onSave={handleSaveQ1Selection} />
          <Q2 />
           {/* Q2selection に onSave プロパティとして handleSaveQ2Selection を渡す */}
            <Q2selection onSave={handleSaveQ2Selection} />
          <Q3 />
           {/* Q3selection に onSave プロパティとして handleSaveQ3Selection を渡す */}
            <Q3selection onSave={handleSaveQ3Selection} />
          <Q4 />
            {/* Q4selection に onSave プロパティとして handleSaveQ4Selection を渡す */}
            <Q4selection onSave={handleSaveQ4Selection} />
          <Q5 />
           {/* Q5selection に onSave プロパティとして handleSaveQ5Selection を渡す */}
           <Q5selection onSave={handleSaveQ5Selection} />
          <Q6 />
            {/* Q6selection に onSave プロパティとして handleSaveQ6Selection を渡す */}
            <Q6selection onSave={handleSaveQ6Selection} />
          <Q7 />
            {/* Q7selectionにonSaveプロパティとしてhandleSaveQ7Selectionを渡す */}
            <Q7selection onSave={handleSaveQ7Selection} />
          <Q8 />
            {/* Q8selection に onSave プロパティとして handleSaveQ8Selection を渡す */}
            <Q8selection onSave={handleSaveQ8Selection} />
          <Q9 />
            {/* Q9selectionにonSaveプロパティとしてhandleSaveQ9Selectionを渡す */}
            <Q9selection onSave={handleSaveQ9Selection} />
          <Q10 />
          {/* Q10 コンポーネントに onSave プロパティを渡す */}
            <Q10selection onSave={handleSaveQ10Selection} />
          <Q11 />
          {/* Q10 コンポーネントに onSave プロパティを渡す */}
            <Q11selection onSave={handleSaveQ11Selection} />

          {/* 送信ボタンにhandleSubmitを渡す */}
          <Submit onSubmit={handleSubmit} />
        </Box>
      <Footer />
    </>
  );
}
