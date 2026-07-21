import React, {useMemo} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { Task } from "@/types/tasks";

type Props = {
    tasks: Task[];
    startEdit: (task:Task) => void;
    setNewDate: (value:string) => void;
    setShowEditModal: (value: boolean) => void;
    setShowAddModal: (value: boolean) => void;
    setSelectedTask: (task:Task) => void;
    changeDateCalendar: (id:number, date:string) => void;
};

export default function TaskCalendar({
    tasks,
    startEdit,
    setNewDate,
    setShowEditModal,
    setShowAddModal,
    setSelectedTask,
    changeDateCalendar,
}:Props) {

    const events = useMemo(() => {
        return tasks.map((task) => ({
        id: String(task.id),
        title: task.title,
        start: task.dueDate,
      }));
     }, [tasks]);


    return (
        <div className = "demo-app" style={{width: "800px" }}>
            <div className="demo-app-main" >
                <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                editable={true}
                selectable={true}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,dayGridWeek",
                }}
                initialView="dayGridMonth"
                dateClick={(info)=>{
                    if (info.dateStr) {
                        setNewDate(info.dateStr);
                        setShowAddModal(true);
                    }
                }}
                events={events}
                eventClick={(info)=>{
                    const task = tasks.find(
                        (task) => task.id === Number(info.event.id)
                    );

                    if (task) {
                        startEdit(task);
                        setSelectedTask(task);
                        setShowEditModal(true);
                    }
                }}
                eventDrop={(info)=>{
                    changeDateCalendar(Number(info.event.id), info.event.startStr)
                }}
                height={600}
                />
            </div>
        </div>
    )

}