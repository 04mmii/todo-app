import React, { useState } from 'react'

const List = React.memo(({
    id, title, completed, todoData, setTodoData, provided, snapshort, handleClick
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);



    let handleCompletedChange = (id) => {
        let newTodoData = todoData.map(data => {
        if(data.id ===id){
            data.completed = !data.completed;
        }
        return data;
        });

        setTodoData(newTodoData);
    };

    const handleEdietChange = (event) => {
        setEditedTitle(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

            let newTodoData = todoData.map(data => {
                if(data.id ===id) {
                    data.title = editedTitle
                }
                return data;
            })
            setTodoData(newTodoData)
            setIsEditing(false);
    };

        if(isEditing) {
            return (
                <div  
                    className={`flex items-center justify-between w-full px-4 py-1 my-2  text-gray-800 border rounded`}>
                    <div className="items-center">
                        <from onSubmit={handleSubmit}>
                            <input 
                                value={editedTitle}
                                onChange={handleEdietChange}
                                className="w-full px-0 py-2 mr-4 text-gray-500 rounded"/>
                        </from>
                    </div>
                        <div className="items-center">
                            <button className="px-4 py-2 float-right text-blue-600" 
                                onClick={()=> setIsEditing(false)}>
                            x
                            </button>
                            <button 
                                onClick={handleSubmit}
                                className="px-4 py-2 float-right text-blue-400" 
                                type="submit"
                            >
                            save
                            </button>
                        </div>
                    </div>
            )
        } else {
            return (
              <div  
              key={id} {...provided.draggableProps} 
              ref={provided.innerRef} {...provided.dragHandleProps} 
              className={`${snapshort.isDragging ? "bg-gray-300":"bg-gray-100"} 
              flex items-center justify-between w-full px-4 py-1 my-2  text-gray-800 border rounded`}
              >
               <div className="items-center">
                    <input 
                        type="checkbox" 
                        defaultChecked={false} 
                        onChange={() => handleCompletedChange(id)}/>
                    <span className={completed ? "line-through" : undefined }>{title}</span>
                </div>
                <div className="items-center">
                      <button className="px-4 py-2 float-right text-blue-600" 
                          onClick={()=> handleClick(id)}>x</button>
                      <button className="px-4 py-2 float-right text-blue-400" 
                      onClick={()=> setIsEditing(true)}>edit</button>
                </div>
            </div>
            );
        };
    

}
);

export default List