import React, { useEffect } from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import './Schedule.scss';

import { useState } from 'react';


export default function Schedule() {

    const [calendarEvents, setCalenderEvents] = useState([]);
    const [missions, setMissions] = useState([{ title: "Mission Grassfield", id: "1", waypoints: 3, estimatedDistance: '0.1km', estimatedTime: '8min' },
    { title: "Mission Farmhouse", id: "2", waypoints: 5, estimatedDistance: '0.5km', estimatedTime: '20min' },
    { title: "Another mission", id: "3", waypoints: 2, estimatedDistance: '0.9km', estimatedTime: '23min' },
    { title: "Last mission with long title", id: "5", waypoints: 1, estimatedDistance: '0.2km', estimatedTime: '37min' }])

    useEffect(() => {
        let draggableEl = document.getElementById("external-events");
        new Draggable(draggableEl, {
            itemSelector: ".fc-event",
            eventData: function (eventEl) {
                let title = eventEl.getAttribute("title");
                let id = eventEl.getAttribute("data");
                return {
                    title: title,
                    id: id
                };
            }
        });
    }, [])

    const drop = (event) => {
        console.log(event);
    }

    const eventReceive = (event) => {
        console.log(event);
    }

    return (
        <PageWrapper>

            <span className="headingschedule">
                <h2>Schedule</h2>
            </span>

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridWeek"
                droppable={true}
                editable={true}

                events={calendarEvents}
                eventDrop={drop}
                eventReceive={eventReceive}
                height="50vh"
            />
            <div className='dragdropinformation'>
                <div className='dragdroplargeinformation'>
                Missions
                </div>
                <div className='dragdropsmallinformation'>
                Drag & drop the missions into your schedule
                    </div>
            </div>
            <div>
                <div
                    id="external-events"
                    className="mission-wrapper"
                >
                    {missions.map(event => (
                        <div
                            className="fc-event mission"
                            title={event.title}
                            data={event.id}
                            key={event.id}
                        >
                            <p className='eventtitle'>{event.title}</p>
                            <div className="missionsrow">
                                <div className='missionscol'>
                                    <p className='missionssmalltitle'>Waypoints</p>
                                    <div className='missionindividual'>
                                        {event.waypoints}
                                    </div>
                                </div>
                                <div className='missionscol'>
                                    <p className='missionssmalltitle'>Est. distance</p>
                                    <div className='missionindividual'>
                                        {event.estimatedDistance}
                                    </div></div>
                                <div className='missionscol'>
                                    <p className='missionssmalltitle'>Est. time</p>
                                    <div className='missionindividual'>
                                        {event.estimatedTime}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PageWrapper>
    );
}
