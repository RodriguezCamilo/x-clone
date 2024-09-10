import { format, parseISO, isThisYear, formatDistanceToNow, differenceInHours } from 'date-fns'
import { es } from 'date-fns/locale'

export function formattedDate(date: string): string {
    try {
        const parsedDate = parseISO(date)
        
        const hoursDifference = differenceInHours(new Date(), parsedDate)
        if (hoursDifference < 24) {
            return formatDistanceToNow(parsedDate, { addSuffix: true, locale: es }) 
        }

        const dateFormat = isThisYear(parsedDate) ? 'dd MMM' : 'dd MMM yyyy'

        return format(parsedDate, dateFormat, { locale: es })
    } catch (error) {
        console.error("Error al formatear la fecha:", error)
        return "Fecha inválida"
    }
}

export function formattedTime(date: string): string {
    try {
        const parsedDate = parseISO(date)
        
        return format(parsedDate, 'h:mm aaaa', { locale: es })

    } catch (error) {
        console.error("Error al formatear la fecha:", error)
        return "Fecha inválida"
    }
}

export function formattedExpecificDate(date: string): string {
    try {
        const parsedDate = parseISO(date)

        const dateFormat = 'dd MMM yyyy'

        return format(parsedDate, dateFormat, { locale: es })
    } catch (error) {
        console.error("Error al formatear la fecha:", error)
        return "Fecha inválida"
    }
}

export function formattedMonthYear(date: string): string {
    try {
        const parsedDate = parseISO(date)

        const dateFormat = "MMMM 'de' yyyy"

        return format(parsedDate, dateFormat, { locale: es })
    } catch (error) {
        console.error("Error al formatear la fecha:", error)
        return "Fecha inválida"
    }
}