type TodoItemProps = {
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

const TodoItem = ({ onToggle, onDelete, onEdit }: TodoItemProps) => {
  return <div>TodoItem</div>;
};

export default TodoItem;
