import React from "react";


const TaskItem = ({ name, id, completed, onCheck }) => {

  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={onCheck}
      />
      {name}
      {/* buttons for edit and delete */}
    </div>
  );
}

export default TaskItem;