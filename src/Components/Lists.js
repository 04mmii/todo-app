import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import List from './List';



const Lists = React.memo(({ todoData, setTodoData, handleClick }) => {

  
  let handleEnd = (result) => {
    // result 매개변수에는 source 항목 및 대상 위치와  같은 드래그 이벤트에 대한 정보가 포함
    console.log('result', result);
    //목적지가 없으면(이벤트 취소) 이 함수를 종료합니다
    if(!result.destination) return;
    
    //리액트 불변성을 지켜주기 위해 새로운 todoData생성
    let newTodoData = [...todoData];

    //1. 변경시키는 아이템을 배열에서 지워줍니다.
    //2. return 값으로 지워진 아이템을 잡아줍니다.
    let [reorderItem] = newTodoData.splice(result.source.index, 1);

    //원하는 자리에 reorderItem 을 insert해줍니다.
    newTodoData.splice(result.destination.index, 0, reorderItem);
    setTodoData(newTodoData);
  };

 



  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable 
                  key={data.id} 
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshort) => (
                    <List
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      complited={data.complited}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshort={snapshort}
                      handleClick={handleClick}
                    />

                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
        )}
        </Droppable>
      </DragDropContext>
    </div>
  );
});

export default Lists

