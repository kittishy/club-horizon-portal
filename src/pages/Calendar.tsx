
import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = [
    { date: 8, title: "Torneio de Xadrez", time: "14:00" },
    { date: 15, title: "Jantar de Gala", time: "19:00" },
    { date: 22, title: "Workshop Culinária", time: "10:00" },
    { date: 30, title: "Palestra Investimentos", time: "19:30" }
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const hasEvent = (day: number) => {
    return events.some(event => event.date === day);
  };

  const getEventForDay = (day: number) => {
    return events.find(event => event.date === day);
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const event = getEventForDay(day);
      days.push(
        <div
          key={day}
          className={`p-2 min-h-[60px] border border-gray-200 ${
            hasEvent(day) ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
          }`}
        >
          <div className={`text-sm font-medium mb-1 ${
            hasEvent(day) ? 'text-blue-900' : 'text-gray-900'
          }`}>
            {day}
          </div>
          {event && (
            <div className="space-y-1">
              <Badge className="text-xs bg-blue-600 text-white">
                {event.time}
              </Badge>
              <div className="text-xs text-blue-800 font-medium leading-tight">
                {event.title}
              </div>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Calendário</h1>
          <p className="text-xl">Acompanhe todos os eventos e atividades do clube</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-blue-900 flex items-center">
                    <CalendarIcon className="h-6 w-6 mr-2" />
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={previousMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={nextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-0 mb-4">
                  {dayNames.map((day) => (
                    <div key={day} className="p-2 text-center font-semibold text-gray-700 bg-gray-100">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-0 border border-gray-200">
                  {renderCalendarDays()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Events List */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900">Eventos deste Mês</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event, index) => (
                    <div key={index} className="border-l-4 border-blue-600 pl-4 py-2">
                      <div className="text-sm font-medium text-blue-900">
                        {event.date} de {monthNames[currentDate.getMonth()]}
                      </div>
                      <div className="font-semibold text-gray-900">{event.title}</div>
                      <div className="text-sm text-gray-600">{event.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card className="border-0 shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">Legenda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-50 border border-blue-300 mr-3"></div>
                    <span className="text-sm">Dias com eventos</span>
                  </div>
                  <div className="flex items-center">
                    <Badge className="bg-blue-600 text-white mr-3 text-xs">19:00</Badge>
                    <span className="text-sm">Horário do evento</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
