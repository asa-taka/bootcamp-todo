import { useState } from "react";

/** リスト表示の対象となる、個々のToDoを表す型。*/
export type TodoItem = {
  /** 表示や操作の対象を識別するために利用する、全ての`TodoItem`の中で一意な値。 */
  id: number;
  /** ToDoの内容となる文字列。 */
  text: string;
  /** 完了すると`true`となる。 */
  done: boolean;
};

type TodoListItemProps = {
  item: TodoItem;
  onCheck: (checked: boolean) => void;
};

/** ToDoリストの個々のToDoとなるReactコンポーネント。 */
function TodoListItem({ item, onCheck }: TodoListItemProps) {
  return (
    <div className="TodoItem">
      <input
        type="checkbox"
        checked={item.done}
        onChange={(ev) => onCheck(ev.currentTarget.checked)}
      />
      <p style={{ textDecoration: item.done ? "line-through" : "none" }}>
        {item.text}
      </p>
    </div>
  );
}

type ValueViewerProps = {
  value: any;
};

/** `value`の内容を`JSON.stringify`して表示する、動作確認用コンポーネント。 */
function ValueViewer({ value }: ValueViewerProps) {
  return (
    <pre className="ValueViewer">{JSON.stringify(value, undefined, 2)}</pre>
  );
}

/** ToDoリストの初期値。 */
const INITIAL_TODO: TodoItem[] = [
  { id: 1, text: "todo-item-1", done: false },
  { id: 2, text: "todo-item-2", done: true },
];

/** アプリケーション本体となるReactコンポーネント。 */
export default function App() {
  const [todoItems, setTodoItems] = useState(INITIAL_TODO);
  const [keyword, setKeyword] = useState("");
  const [showingDone, setShowingDone] = useState(true);

  const updateItem = (newItem: TodoItem) => {
    setTodoItems(
      todoItems.map((item) => (item.id === newItem.id ? newItem : item)),
    );
  };

  const filteredTodoItems = todoItems.filter((item) => {
    if (!showingDone && item.done) return false;
    return item.text.includes(keyword);
  });

  return (
    <div className="App">
      <h1>ToDo</h1>
      <div className="App_todo-list-control">
        <input
          placeholder="キーワードフィルタ"
          value={keyword}
          onChange={(ev) => setKeyword(ev.target.value)}
        />
        <input
          id="showing-done"
          type="checkbox"
          checked={showingDone}
          onChange={(ev) => setShowingDone(ev.target.checked)}
        />
        <label htmlFor="showing-done">完了したものも表示する</label>
      </div>
      {filteredTodoItems.length === 0 ? (
        <div className="dimmed">該当するToDoはありません</div>
      ) : (
        <div className="App_todo-list">
          {filteredTodoItems.map((item) => (
            <TodoListItem
              key={item.id}
              item={item}
              onCheck={(checked) => {
                updateItem({ ...item, done: checked });
              }}
            />
          ))}
        </div>
      )}
      <ValueViewer
        value={{ keyword, showingDone, todoItems, filteredTodoItems }}
      />
    </div>
  );
}
