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