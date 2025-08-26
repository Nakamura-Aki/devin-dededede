import { useState, useEffect } from 'react'
import './App.css'

interface Todo {
  id: number
  text: string
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputText, setInputText] = useState('')
  const [message, setMessage] = useState('')

  const API_BASE_URL = 'http://localhost:8000'

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`)
      const todosData = await response.json()
      setTodos(todosData)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const addTodo = async () => {
    if (inputText.trim()) {
      try {
        const response = await fetch(`${API_BASE_URL}/todos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: inputText.trim() }),
        })
        
        if (response.ok) {
          setInputText('')
          setMessage('タスク完了!')
          setTimeout(() => setMessage(''), 2000)
          await fetchTodos()
        } else {
          console.error('Error adding todo')
        }
      } catch (error) {
        console.error('Error adding todo:', error)
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <div className="app">
      <div className="floating-bubbles">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      
      <div className="container">
        <h1 className="title">Todoリスト</h1>
        
        <div className="input-section">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="タスクを入力してください"
            className="task-input"
          />
          <button onClick={addTodo} className="add-button">
            追加
          </button>
        </div>

        {message && <div className="success-message">{message}</div>}

        <div className="todo-list">
          {todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              {todo.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
