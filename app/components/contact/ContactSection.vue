<script setup lang="ts">
const { t, locale } = useI18n()

const form = reactive({
  firstName: '',
  email: '',
  subject: '',
  message: '',
})

const touched = reactive({
  firstName: false,
  email: false,
  subject: false,
  message: false,
})

const submitted = ref(false)
const isSubmitting = ref(false)

const errors = computed(() => ({
  firstName: touched.firstName && !form.firstName.trim() ? t('contact.section.errors.firstNameRequired') : '',
  email: touched.email && !form.email.trim() ? t('contact.section.errors.emailRequired') : (touched.email && form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? t('contact.section.errors.emailInvalid') : ''),
  subject: touched.subject && !form.subject.trim() ? t('contact.section.errors.subjectRequired') : '',
  message: touched.message && !form.message.trim() ? t('contact.section.errors.messageRequired') : '',
}))

const isValid = computed(() =>
  form.firstName.trim() &&
  form.email.trim() &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
  form.subject.trim() &&
  form.message.trim()
)

function blur(field: keyof typeof touched) {
  touched[field] = true
}

async function onSubmit() {
  Object.keys(touched).forEach((k) => { touched[k as keyof typeof touched] = true })
  if (!isValid.value) return
  isSubmitting.value = true
  await new Promise((r) => setTimeout(r, 800))
  submitted.value = true
  isSubmitting.value = false
  form.firstName = ''
  form.email = ''
  form.subject = ''
  form.message = ''
  Object.keys(touched).forEach((k) => { touched[k as keyof typeof touched] = false })
}

const details = computed(() => [
  { 
    label: t('contact.section.details.headOffice'), 
    value: '888 MEC Tower 14th Floor, Debaratana Road\nBangna Tai, Bangna\nBangkok 10260, Thailand', 
    href: null, 
    icon: 'address' 
  },
  { 
    label: t('contact.section.details.officeBranch1'), 
    value: 'The Pretium Bangna 91/7 Bangna – Trad Road\nBangkaew, Bang phli\nSamutprakan 10540, Thailand', 
    href: null, 
    icon: 'address' 
  },
  { 
    label: t('contact.section.details.phone'), 
    value: '+66 925411454\n+66 847217966\n+66 2 1708334', 
    href: 'tel:+66925411454', 
    icon: 'phone' 
  },
  { 
    label: t('contact.section.details.email'), 
    value: 'adelbkk@cfi-capitalfood.com\nkathy@cfi-capitalfood.com', 
    href: 'mailto:adelbkk@cfi-capitalfood.com', 
    icon: 'email' 
  },
  { 
    label: t('contact.section.details.website'), 
    value: 'www.cfi-capitalfood.com', 
    href: 'https://www.cfi-capitalfood.com', 
    icon: 'website' 
  },
  { 
    label: t('contact.section.details.lineId'), 
    value: 'suwannee997', 
    href: null, 
    icon: 'line' 
  },
  { 
    label: t('contact.section.details.whatsapp'), 
    value: '+66 847217966', 
    href: 'https://wa.me/66847217966', 
    icon: 'whatsapp' 
  },
  { 
    label: t('contact.section.details.workingHours'), 
    value: locale.value === 'ar' ? 'الاثنين إلى الجمعة\n8:30 صباحاً – 5:30 مساءً' : 'Monday to Friday\n8:30 am – 5:30 pm', 
    href: null, 
    icon: 'clock' 
  },
])

const socialLinks = computed(() => [
  { label: t('contact.section.details.website'), href: 'https://www.cfi-capitalfood.com', icon: 'website' },
  { label: 'LINE', href: null, icon: 'line' },
  { label: t('contact.section.details.whatsapp'), href: 'https://wa.me/66847217966', icon: 'whatsapp' },
])

const sectionRef = ref<HTMLElement | null>(null)
const formRef = ref<HTMLElement | null>(null)
const detailsRef = ref<HTMLElement | null>(null)

let gsapCtx: { revert: () => void } | null = null

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsapCtx = gsap.context(() => {
          if (formRef.value) {
            gsap.fromTo(formRef.value, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.7, scrollTrigger: { trigger: sectionRef.value, start: 'top 82%' } })
          }
          if (detailsRef.value) {
            gsap.fromTo(detailsRef.value, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.7, scrollTrigger: { trigger: sectionRef.value, start: 'top 82%' } })
          }
        }, sectionRef)
      })
    })
  }
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>

<template>
  <section
    ref="sectionRef"
    class="py-16 sm:py-20 lg:py-24 bg-gray-50"
    aria-labelledby="contact-section-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <header class="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-ocean-600 bg-ocean-100 mb-4">
          {{ $t('contact.section.badge') }}
        </span>
        <h2 id="contact-section-heading" class="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
          {{ $t('contact.section.title') }}
        </h2>
        <p class="mt-4 text-gray-600 leading-relaxed">
          {{ $t('contact.section.subtitle') }}
        </p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
        <!-- Form column -->
        <div ref="formRef" class="order-2 lg:order-1">
          <div class="rounded-2xl bg-white border border-gray-100 shadow-card p-6 sm:p-8 lg:p-10">
            <Transition mode="out-in" enter-active-class="transition duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
              <div v-if="!submitted" key="form">
                <h3 id="form-heading" class="text-xl font-bold text-navy mb-6">{{ $t('contact.section.formTitle') }}</h3>
                <p class="text-sm text-gray-600 mb-6">{{ $t('contact.section.formDescription') }}</p>
                <form class="space-y-5" @submit.prevent="onSubmit">
                  <div>
                    <label for="contact-firstName" class="block text-sm font-medium text-navy mb-1.5">{{ $t('contact.section.firstName') }} <span class="text-red-500">{{ $t('contact.section.required') }}</span></label>
                    <input
                      id="contact-firstName"
                      v-model="form.firstName"
                      type="text"
                      name="firstName"
                      autocomplete="given-name"
                      class="w-full px-4 py-3 rounded-xl border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-colors"
                      :class="errors.firstName ? 'border-red-400' : 'border-gray-200'"
                      :placeholder="$t('contact.section.firstNamePlaceholder')"
                      @blur="blur('firstName')"
                    />
                    <p v-if="errors.firstName" class="mt-1 text-sm text-red-500">{{ errors.firstName }}</p>
                  </div>
                  <div>
                    <label for="contact-email" class="block text-sm font-medium text-navy mb-1.5">{{ $t('contact.section.email') }} <span class="text-red-500">{{ $t('contact.section.required') }}</span></label>
                    <input
                      id="contact-email"
                      v-model="form.email"
                      type="email"
                      name="email"
                      autocomplete="email"
                      class="w-full px-4 py-3 rounded-xl border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-colors"
                      :class="errors.email ? 'border-red-400' : 'border-gray-200'"
                      :placeholder="$t('contact.section.emailPlaceholder')"
                      @blur="blur('email')"
                    />
                    <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
                  </div>
                  <div>
                    <label for="contact-subject" class="block text-sm font-medium text-navy mb-1.5">{{ $t('contact.section.subject') }} <span class="text-red-500">{{ $t('contact.section.required') }}</span></label>
                    <input
                      id="contact-subject"
                      v-model="form.subject"
                      type="text"
                      name="subject"
                      class="w-full px-4 py-3 rounded-xl border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-colors"
                      :class="errors.subject ? 'border-red-400' : 'border-gray-200'"
                      :placeholder="$t('contact.section.subjectPlaceholder')"
                      @blur="blur('subject')"
                    />
                    <p v-if="errors.subject" class="mt-1 text-sm text-red-500">{{ errors.subject }}</p>
                  </div>
                  <div>
                    <label for="contact-message" class="block text-sm font-medium text-navy mb-1.5">{{ $t('contact.section.message') }} <span class="text-red-500">{{ $t('contact.section.required') }}</span></label>
                    <textarea
                      id="contact-message"
                      v-model="form.message"
                      name="message"
                      rows="4"
                      class="w-full px-4 py-3 rounded-xl border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-colors resize-y min-h-[100px]"
                      :class="errors.message ? 'border-red-400' : 'border-gray-200'"
                      :placeholder="$t('contact.section.messagePlaceholder')"
                      @blur="blur('message')"
                    />
                    <p v-if="errors.message" class="mt-1 text-sm text-red-500">{{ errors.message }}</p>
                  </div>
                  <div class="pt-2">
                    <p class="text-sm text-gray-600 mb-4">
                      <span class="font-semibold">{{ $t('contact.section.haveQuestions') }}</span><br>
                      <a href="tel:+66925411454" class="text-ocean-600 hover:text-ocean-700">+66 925411454</a>, 
                      <a href="tel:+66847217966" class="text-ocean-600 hover:text-ocean-700">+66 847217966</a>
                    </p>
                  </div>
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="w-full inline-flex items-center justify-center px-8 py-4 rounded-xl bg-ocean-600 text-white font-semibold hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-ocean-900/20"
                  >
                    <span v-if="isSubmitting">{{ $t('contact.section.sending') }}</span>
                    <span v-else>{{ $t('contact.section.submit') }}</span>
                  </button>
                </form>
              </div>
              <div v-else key="success" class="rounded-xl bg-ocean-50 border border-ocean-200 p-6 text-center">
                <div class="w-12 h-12 rounded-full bg-aqua-500/20 flex items-center justify-center text-aqua-600 mx-auto mb-3">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 class="text-lg font-bold text-navy">{{ $t('contact.section.successTitle') }}</h3>
                <p class="mt-1 text-sm text-gray-600">{{ $t('contact.section.successMessage') }}</p>
                <button type="button" class="mt-4 text-sm font-medium text-ocean-600 hover:text-ocean-700" @click="submitted = false">{{ $t('contact.section.sendAnother') }}</button>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Company details column -->
        <div ref="detailsRef" class="order-1 lg:order-2">
          <div class="rounded-2xl bg-white border border-gray-100 shadow-card p-6 sm:p-8 lg:p-10">
            <h3 class="text-xl font-bold text-navy mb-6">{{ $t('contact.section.detailsTitle') }}</h3>
            <div class="mb-6 space-y-2">
              <a href="tel:+66925411454" class="block text-lg font-semibold text-ocean-600 hover:text-ocean-700">(+66) 925411454</a>
              <a href="tel:+66847217966" class="block text-lg font-semibold text-ocean-600 hover:text-ocean-700">(+66) 084 721 7966</a>
              <a href="tel:+6621708334" class="block text-lg font-semibold text-ocean-600 hover:text-ocean-700">(+66) 02 170 8334</a>
              <p class="text-sm text-gray-600 mt-3">{{ details.find(d => d.icon === 'clock')?.value || (locale.value === 'ar' ? 'الاثنين إلى الجمعة\n8:30 صباحاً – 5:30 مساءً' : 'Monday to Friday\n8:30 am – 5:30 pm') }}</p>
            </div>
            <div class="mb-6 space-y-2">
              <a href="mailto:adelbkk@cfi-capitalfood.com" class="block text-sm text-gray-600 hover:text-ocean-600 break-all">adelbkk@cfi-capitalfood.com</a>
              <a href="mailto:kathy@cfi-capitalfood.com" class="block text-sm text-gray-600 hover:text-ocean-600 break-all">kathy@cfi-capitalfood.com</a>
            </div>
            <ul class="space-y-6">
              <li v-for="item in details" :key="item.label" class="flex gap-4">
                <div class="flex-shrink-0 w-11 h-11 rounded-xl bg-ocean-100 flex items-center justify-center text-ocean-600">
                  <svg v-if="item.icon === 'address'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <svg v-else-if="item.icon === 'phone'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <svg v-else-if="item.icon === 'email'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <svg v-else-if="item.icon === 'website'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <svg v-else-if="item.icon === 'whatsapp'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <svg v-else-if="item.icon === 'line'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.028 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                  <svg v-else-if="item.icon === 'clock'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-navy">{{ item.label }}</p>
                  <template v-if="item.href">
                    <a :href="item.href" class="mt-1 text-sm text-gray-600 hover:text-ocean-600 break-all whitespace-pre-line" target="_blank" rel="noopener noreferrer">{{ item.value }}</a>
                  </template>
                  <p v-else class="mt-1 text-sm text-gray-600 whitespace-pre-line">{{ item.value }}</p>
                </div>
              </li>
            </ul>
            <div class="mt-8 pt-6 border-t border-gray-100">
              <p class="text-sm font-semibold text-navy mb-3">{{ $t('contact.section.contactWithUs') }}</p>
              <div class="flex gap-3">
                <a
                  v-for="link in socialLinks"
                  :key="link.label"
                  :href="link.href || '#'"
                  :aria-label="link.label"
                  :target="link.href ? '_blank' : undefined"
                  :rel="link.href ? 'noopener noreferrer' : undefined"
                  class="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-ocean-600 hover:bg-ocean-600 hover:text-white hover:border-ocean-600 transition-all duration-300"
                >
                  <svg v-if="link.icon === 'website'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <svg v-else-if="link.icon === 'whatsapp'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <svg v-else-if="link.icon === 'line'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.028 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
