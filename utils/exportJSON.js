
function groupTodos(todos) {
  const grouped = {};

  todos.forEach(todo => {
      const title = todo.belongsTo.title;
      if (!grouped[title]) {
          grouped[title] = {
              title: title,
              todos: []
          };
      }
      grouped[title].todos.push({
          content: todo.content,
          done: todo.done,
      });
  });

  return Object.values(grouped);
}

export default function exportJSON(todos, isAllTodos) {
  let jsonString = null

  if (isAllTodos) {
    jsonString = JSON.stringify(groupTodos(todos), null, 2);
  } else {
    jsonString = JSON.stringify(todos, null, 2); 
  }

  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = isAllTodos ? 'todoLists.json' : 'todos.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
