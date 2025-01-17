export const formatSecondsToMinutes = (seconds: number): string => {
    if (seconds > 0) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${String(formattedMinutes).padStart(2, '0')}:${String(formattedSeconds).padStart(2, '0')}`;
    }
    else {
        return `${String(0).padStart(2, '0')}:${String(0).padStart(2, '0')}`;
    }
};

export const getFormattedDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
    return { date, time };
};