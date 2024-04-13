from fastapi import FastAPI, HTTPException, Request
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import os
from datetime import datetime
from dotenv import load_dotenv
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

load_dotenv()

DATABASE_URL = os.path.join(os.path.dirname(__file__), "database.db")

def get_db_connection():
    conn = sqlite3.connect(DATABASE_URL)
    conn.row_factory = sqlite3.Row
    return conn

@app.get("/")
def read_root():
    return {"Hello": "World"}

class Answers(BaseModel):
    q1_answer: List[str]  # Q1 の複数の回答をリストで受け取る
    q2_answer: str  # Q2 の回答を文字列で受け取る
    q3_answer: float  # Q3 の回答を数値で受け取る
    q4_answer: float  # Q4 の回答を数値で受け取る
    q5_answer: float  # Q5 の回答を数値で受け取る
    q6_answer: float  # Q6 の回答を数値で受け取る
    q7_answer: List[str]  # Q7 の複数の回答をリストで受け取る
    q8_answer: str  # Q8 の回答を文字列で受け取る
    q9_answer: List[str]  # Q9 の複数の回答をリストで受け取る
    q10_answer: int   # Q10 の回答を数値で受け取る
    q11_answer: int  # Q11 の回答を数値で受け取る

@app.post("/submit/")
async def submit_answers(request: Request, answers: Answers):
    conn = get_db_connection()
    try:
        conn.execute('BEGIN')
        answer_datetime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        # Q1の回答をカンマ区切りの文字列に変換
        q1_answers_str = ",".join(answers.q1_answer)

        # Q7の回答をカンマ区切りの文字列に変換
        q7_answers_str = ",".join(answers.q7_answer)

        # Q9の回答をカンマ区切りの文字列に変換
        q9_answers_str = ",".join(answers.q9_answer)
        
        # 回答を answers テーブルに挿入
        conn.execute('INSERT INTO answers (answer_date, goal, team_structure, solo_work, remote_work, solo_web, web_mtg, atmosphere,color, well_being, office_capacity, office_size) VALUES (?,?,?,?,?,?,?,?, ?, ?, ?, ?)', 
             ( answer_datetime, q1_answers_str, answers.q2_answer, answers.q3_answer, answers.q4_answer, answers.q5_answer, answers.q6_answer, q7_answers_str,answers.q8_answer, q9_answers_str,answers.q10_answer,answers.q11_answer,))
        
        conn.commit()
        return {"status": "success", "message": "Answers submitted successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()
