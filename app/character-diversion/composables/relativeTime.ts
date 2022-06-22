import RelativeTime from '@yaireo/relative-time'
import { useI18n } from 'vue-i18n'

export const useRelativeTime = (d1: string, d2: string | null, threshold: number = 2.419e+9) => {
	if (!d1) return
	const i18n = useI18n({ useScope: 'global' })
	const locale = i18n.locale.value as string
	const date1 = new Date(d1)
	const date2 = d2 ? new Date(d2) : new Date()
	const elapsed = Math.abs(date2.getTime() - date1.getTime())


	if (elapsed > threshold) {
		const options = {
			month: 'long'
		} as Intl.DateTimeFormatOptions
		if (Math.abs(date1.getFullYear() - date2.getFullYear()) > 0) {
			options.year = 'numeric'
		} else {
			options.day = 'numeric'
		}
		return date1.toLocaleString(locale, options)
	} else {
		return new RelativeTime({ locale }).from(date1, date2)
	}
}