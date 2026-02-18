<script setup lang="ts">
const form = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
})

const touched = reactive({
  name: false,
  email: false,
  phone: false,
  company: false,
  message: false,
})

const submitted = ref(false)
const isSubmitting = ref(false)

const errors = computed(() => ({
  name: touched.name && !form.name.trim() ? 'Name is required' : '',
  email: touched.email && !form.email.trim() ? 'Email is required' : (touched.email && form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? 'Enter a valid email' : ''),
  phone: touched.phone && !form.phone.trim() ? 'Phone is required' : '',
  company: touched.company && !form.company.trim() ? 'Company / Organization is required' : '',
  message: touched.message && !form.message.trim() ? 'Message is required' : '',
}))

const isValid = computed(() =>
  form.name.trim() &&
  form.email.trim() &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
  form.phone.trim() &&
  form.company.trim() &&
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
  form.name = ''
  form.email = ''
  form.phone = ''
  form.company = ''
  form.message = ''
  Object.keys(touched).forEach((k) => { touched[k as keyof typeof touched] = false })
}

const details = [
  { label: 'Head Office', value: 'Capital Food Headquarters\n123 Ocean Drive, Marina District\nCity, Country 12345', href: null, icon: 'address' },
  { label: 'Phone', value: '+1 234 567 890', href: 'tel:+1234567890', icon: 'phone' },
  { label: 'Email', value: 'contact@capitalfood.com', href: 'mailto:contact@capitalfood.com', icon: 'email' },
]

const socialLinks = [
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
  { label: 'Twitter', href: '#', icon: 'twitter' },
  { label: 'Facebook', href: '#', icon: 'facebook' },
]

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
          Get in Touch
        </span>
        <h2 id="contact-section-heading" class="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
          Contact Capital Food
        </h2>
        <p class="mt-4 text-gray-600 leading-relaxed">
          Use the form or our contact details below. We respond to all inquiries promptly.
        </p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
        <!-- Form column -->
        <div ref="formRef" class="order-2 lg:order-1">
          <div class="rounded-2xl bg-white border border-gray-100 shadow-card p-6 sm:p-8 lg:p-10">
            <Transition mode="out-in" enter-active-class="transition duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
              <div v-if="!submitted" key="form">
                <h3 id="form-heading" class="text-xl font-bold text-navy mb-6">Send a message</h3>
                <form class="space-y-5" @submit.prevent="onSubmit">
                  <div>
                    <label for="contact-name" class="block text-sm font-medium text-navy mb-1.5">Name <span class="text-red-500">*</span></label>
                    <input
                      id="contact-name"
                      v-model="form.name"
                      type="text"
                      name="name"
                      autocomplete="name"
                      class="w-full px-4 py-3 rounded-xl border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-colors"
                      :class="errors.name ? 'border-red-400' : 'border-gray-200'"
                      placeholder="Your name"
                      @blur="blur('name')"
                    />
                    <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
                  </div>
                  <div>
                    <label for="contact-email" class="block text-sm font-medium text-navy mb-1.5">Email <span class="text-red-500">*</span></label>
                    <input
                      id="contact-email"
                      v-model="form.email"
                      type="email"
                      name="email"
                      autocomplete="email"
                      class="w-full px-4 py-3 rounded-xl border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-colors"
                      :class="errors.email ? 'border-red-400' : 'border-gray-200'"
                      placeholder="you@company.com"
                      @blur="blur('email')"
                    />
                    <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
                  </div>
                  <div>
                    <label for="contact-phone" class="block text-sm font-medium text-navy mb-1.5">Phone Number <span class="text-red-500">*</span></label>
                    <input
                      id="contact-phone"
                      v-model="form.phone"
                      type="tel"
                      name="phone"
                      autocomplete="tel"
                      class="w-full px-4 py-3 rounded-xl border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-colors"
                      :class="errors.phone ? 'border-red-400' : 'border-gray-200'"
                      placeholder="+1 234 567 890"
                      @blur="blur('phone')"
                    />
                    <p v-if="errors.phone" class="mt-1 text-sm text-red-500">{{ errors.phone }}</p>
                  </div>
                  <div>
                    <label for="contact-company" class="block text-sm font-medium text-navy mb-1.5">Company / Organization <span class="text-red-500">*</span></label>
                    <input
                      id="contact-company"
                      v-model="form.company"
                      type="text"
                      name="company"
                      autocomplete="organization"
                      class="w-full px-4 py-3 rounded-xl border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-colors"
                      :class="errors.company ? 'border-red-400' : 'border-gray-200'"
                      placeholder="Your company"
                      @blur="blur('company')"
                    />
                    <p v-if="errors.company" class="mt-1 text-sm text-red-500">{{ errors.company }}</p>
                  </div>
                  <div>
                    <label for="contact-message" class="block text-sm font-medium text-navy mb-1.5">Message <span class="text-red-500">*</span></label>
                    <textarea
                      id="contact-message"
                      v-model="form.message"
                      name="message"
                      rows="4"
                      class="w-full px-4 py-3 rounded-xl border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-colors resize-y min-h-[100px]"
                      :class="errors.message ? 'border-red-400' : 'border-gray-200'"
                      placeholder="How can we help?"
                      @blur="blur('message')"
                    />
                    <p v-if="errors.message" class="mt-1 text-sm text-red-500">{{ errors.message }}</p>
                  </div>
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="w-full inline-flex items-center justify-center px-8 py-4 rounded-xl bg-ocean-600 text-white font-semibold hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-ocean-900/20"
                  >
                    <span v-if="isSubmitting">Sending…</span>
                    <span v-else>Submit</span>
                  </button>
                </form>
              </div>
              <div v-else key="success" class="rounded-xl bg-ocean-50 border border-ocean-200 p-6 text-center">
                <div class="w-12 h-12 rounded-full bg-aqua-500/20 flex items-center justify-center text-aqua-600 mx-auto mb-3">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 class="text-lg font-bold text-navy">Message sent successfully</h3>
                <p class="mt-1 text-sm text-gray-600">We’ll get back to you as soon as possible.</p>
                <button type="button" class="mt-4 text-sm font-medium text-ocean-600 hover:text-ocean-700" @click="submitted = false">Send another message</button>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Company details column -->
        <div ref="detailsRef" class="order-1 lg:order-2">
          <div class="rounded-2xl bg-white border border-gray-100 shadow-card p-6 sm:p-8 lg:p-10">
            <h3 class="text-xl font-bold text-navy mb-6">Company Contact Details</h3>
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
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-navy">{{ item.label }}</p>
                  <template v-if="item.href">
                    <a :href="item.href" class="mt-1 text-sm text-gray-600 hover:text-ocean-600 break-all">{{ item.value }}</a>
                  </template>
                  <p v-else class="mt-1 text-sm text-gray-600 whitespace-pre-line">{{ item.value }}</p>
                </div>
              </li>
            </ul>
            <div class="mt-8 pt-6 border-t border-gray-100">
              <p class="text-sm font-semibold text-navy mb-3">Follow us</p>
              <div class="flex gap-3">
                <a
                  v-for="link in socialLinks"
                  :key="link.label"
                  :href="link.href"
                  :aria-label="link.label"
                  class="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-ocean-600 hover:bg-ocean-600 hover:text-white hover:border-ocean-600 transition-all duration-300"
                >
                  <svg v-if="link.icon === 'linkedin'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <svg v-else-if="link.icon === 'twitter'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
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
