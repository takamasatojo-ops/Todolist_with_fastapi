import React, {useMemo} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { Task } from "@/types/tasks";

type Props = {
    tasks: Task[];
    startEdit: (task:Task) => void;
    setNewDueDate: (value:string) => void;
    setNewStartDate: (value:string) => void;
    setShowEditModal: (value: boolean) => void;
    setShowAddModal: (value: boolean) => void;
    setSelectedTask: (task:Task) => void;
    changeDateCalendar: (id:number, startDate:string, dueDate:string) => void;
};

export default function TaskCalendar({
    tasks,
    startEdit,
    setNewDueDate,
    setNewStartDate,
    setShowEditModal,
    setShowAddModal,
    setSelectedTask,
    changeDateCalendar,
}:Props) {

    const events = useMemo(() => {
        const AddDay = (setDay: string) => {
            const CalendarDate = new Date(setDay);
            CalendarDate.setDate(CalendarDate.getDate()+1);

        return CalendarDate.toISOString().split("T")[0];
        };

        return tasks.map((task) => {
            if (task.dueDate){

            return {
            id: String(task.id),
            title: task.title,
            start: task.startDate,
            end: AddDay(task.dueDate),
                }
            }
        return {
        id: String(task.id),
        title: task.title,
        start: task.startDate,
        }

      });
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
                        setNewStartDate(info.dateStr);
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
                    changeDateCalendar(Number(info.event.id), info.event.startStr, info.event.endStr)
                }}
                height={600}
                />
            </div>
        </div>
    )

}