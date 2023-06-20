import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import isAuth from 'state/isAuth';

import { Box } from '@mui/material';
import Header from 'components/Header';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

import '../Calendar/styles.css';

import CalendarModal from 'components/CalendarModal';

export const Calendar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
    handleModalOpen();
  };

  const handleEventClick = () => {
    // Handle event click logic if needed
  };

  if (!isAuth()) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            longPressDelay={0}
            eventTextColor="#696CFF"
            eventBackgroundColor="rgba(102, 108, 255, 0.13)"
            eventBorderColor="rgba(102, 108, 255, 0.01)"
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
          />
          <CalendarModal
            open={isModalOpen}
            onClose={handleModalClose}
            selectedDate={selectedDate}
          />
        </Box>
      </Box>
    </Box>
  );
};
