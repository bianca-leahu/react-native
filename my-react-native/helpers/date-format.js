export function getFormattedDate(datetime) {

    // need to replace "-" with "/" so that Safari recognizes it
    const date = typeof datetime === 'string' ? new Date(datetime.replace(/-/g, '/')) : new Date(datetime),
        months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];

    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}