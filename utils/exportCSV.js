
export default function exportCSV (todos, isAllTodos) {
    let csvString = []

    if (isAllTodos) {
      csvString = [
        ["Belongs to", "Content", "Done"],
        ...todos.map(item => [item.belongsTo.title, item.content, item.done ? 'true' : 'false']) 
        ].map(row => row.join(","))
        .join("\n");
    } else {
      csvString = [
        ["Id", "Belongs to", "Content", "Done"],
        ...todos.map(item => [item.id, item.belongsTo.title, item.content, item.done ? 'true' : 'false']) 
        ].map(row => row.join(","))
        .join("\n");
    }
    
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = isAllTodos ? 'todoLists.csv' : 'todos.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

