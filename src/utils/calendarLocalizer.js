import { dateFnsLocalizer } from 'react-big-calendar'
import { parseISO } from 'date-fns'
import { format } from 'date-fns'
import enGB from 'date-fns/locale/en-GB'

const locales = {
  'en-GB': enGB,
}

const localizer = dateFnsLocalizer({
  format,
  parse: parseISO,
  startOfWeek: () => new Date(),
  getDay: (date) => date.getDay(),
  locales,
})

export default localizer
