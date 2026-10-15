export const formatDateToTimezone = (date, timeZone = 'America/Argentina/Buenos_Aires') => {
    if (!date) return null;

    const d = new Date(date);
    
    return d.toLocaleString('es-AR', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
};
