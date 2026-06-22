<script setup lang="ts">
const { t } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)
const modalPanelRef = ref<HTMLElement | null>(null)

type TeamMember = {
  key: string
  name: string
  role: string
  bio: string
  img: string
}

const members = computed<TeamMember[]>(() => [
  {
    key: 'adel',
    name: t('companyProfile.team.members.adel.name'),
    role: t('companyProfile.team.members.adel.role'),
    bio: t('companyProfile.team.members.adel.bio'),
    img: '/images/team/adel.jpeg',
  },
  {
    key: 'kathay',
    name: t('companyProfile.team.members.kathay.name'),
    role: t('companyProfile.team.members.kathay.role'),
    bio: t('companyProfile.team.members.kathay.bio'),
    img: '/images/team/kathay.jpeg',
  },
  {
    key: 'kob',
    name: t('companyProfile.team.members.kob.name'),
    role: t('companyProfile.team.members.kob.role'),
    bio: t('companyProfile.team.members.kob.bio'),
    img: '/images/team/kob.jpeg',
  },
  {
    key: 'tommy',
    name: t('companyProfile.team.members.tommy.name'),
    role: t('companyProfile.team.members.tommy.role'),
    bio: t('companyProfile.team.members.tommy.bio'),
    img: '/images/team/tommy.jpeg',
  },
  {
    key: 'noey',
    name: t('companyProfile.team.members.noey.name'),
    role: t('companyProfile.team.members.noey.role'),
    bio: t('companyProfile.team.members.noey.bio'),
    img: '/images/team/noey.jpeg',
  },
])

const activeMemberKey = ref<string | null>(null)
const activeMember = computed(() => members.value.find(m => m.key === activeMemberKey.value) ?? null)
const isModalOpen = computed(() => activeMemberKey.value !== null)

const openMember = (key: string) => {
  activeMemberKey.value = key
}

const closeMember = () => {
  activeMemberKey.value = null
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeMember()
}

watch(isModalOpen, (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? 'hidden' : ''
})

watch(isModalOpen, async (open) => {
  if (!import.meta.client) return
  if (!open) return
  await nextTick()
  modalPanelRef.value?.focus()
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  document.body.style.overflow = ''
})

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)

        gsap.fromTo(
          headerRef.value,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: sectionRef.value, start: 'top 55%' } },
        )

        if (gridRef.value) {
          const cards = gridRef.value.querySelectorAll('.team-card')
          gsap.fromTo(
            cards,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.1,
              scrollTrigger: { trigger: sectionRef.value, start: 'top 58%' },
            },
          )
        }
      })
    })
  }
})
</script>

<template>
  <section
    ref="sectionRef"
    class="py-20 sm:py-28 bg-[#f3ece8]"
    aria-labelledby="team-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div ref="headerRef" class="max-w-2xl mx-auto text-center mb-12 sm:mb-14">
        <p class="text-aqua-600 font-semibold text-sm tracking-wider uppercase mb-3">
          {{ $t('companyProfile.team.badge') }}
        </p>
        <h2 id="team-heading" class="text-3xl sm:text-4xl font-bold text-ocean-950 tracking-tight">
          {{ $t('companyProfile.team.title') }}
        </h2>
        <p class="mt-4 text-gray-600 leading-relaxed">
          {{ $t('companyProfile.team.subtitle') }}
        </p>
      </div>

      <!-- Grid like the reference (centered avatar, name/role, quote) -->
      <div
        ref="gridRef"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6"
      >
        <button
          v-for="member in members"
          :key="member.key"
          type="button"
          class="team-card group text-center rounded-2xl bg-white border border-white/60 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3ece8] px-5 sm:px-6 py-7 sm:py-8"
          @click="openMember(member.key)"
        >
          <div class="mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gray-100 ring-4 ring-white shadow-sm">
            <img
              :src="member.img"
              :alt="`${member.name} — ${member.role}`"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              width="480"
              height="480"
              loading="lazy"
            />
          </div>

          <p class="mt-5 text-base sm:text-lg font-semibold text-ocean-950 tracking-tight">
            {{ member.name }}
          </p>
          <p class="mt-1 text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-gray-500">
            {{ member.role }}
          </p>

          <p class="mt-4 text-sm text-gray-600 leading-relaxed italic clamp-4">
            “{{ member.bio }}”
          </p>

          <span class="mt-5 inline-flex items-center justify-center text-xs font-semibold tracking-wide text-aqua-700 uppercase opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            {{ $t('companyProfile.team.viewProfile') }}
          </span>
        </button>
      </div>
    </div>

    <!-- Modal -->
    <teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isModalOpen"
          class="fixed inset-0 z-[60] flex items-center justify-center px-4 sm:px-6"
          @keydown="onKeydown"
        >
          <button
            type="button"
            class="absolute inset-0 bg-ocean-950/70 backdrop-blur-sm"
            aria-label="Close"
            @click="closeMember"
          />

          <Transition
            enter-active-class="transition duration-250 ease-out"
            enter-from-class="opacity-0 translate-y-3 scale-[0.98]"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-2 scale-[0.98]"
          >
            <div
              v-if="activeMember"
              ref="modalPanelRef"
              tabindex="-1"
              role="dialog"
              aria-modal="true"
              :aria-label="`${activeMember.name} — ${activeMember.role}`"
              class="relative w-full max-w-5xl rounded-[28px] bg-white shadow-2xl overflow-hidden outline-none"
            >
              <div class="absolute top-4 right-4 z-10">
                <button
                  type="button"
                  class="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/90 hover:bg-white border border-gray-100 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua-500 focus-visible:ring-offset-2"
                  :aria-label="$t('companyProfile.team.close')"
                  @click="closeMember"
                >
                  <svg class="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div class="grid lg:grid-cols-2">
                <div class="relative aspect-[4/3] lg:aspect-auto lg:min-h-[520px] bg-gray-100">
                  <img
                    :src="activeMember.img"
                    :alt="`${activeMember.name} — ${activeMember.role}`"
                    class="absolute inset-0 w-full h-full object-cover"
                    width="1600"
                    height="1200"
                    loading="eager"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-ocean-950/70 via-ocean-950/10 to-transparent" />
                  <div class="absolute left-7 right-7 bottom-7">
                    <p class="text-white/90 text-sm font-semibold tracking-wider uppercase">
                      {{ $t('companyProfile.team.badge') }}
                    </p>
                    <p class="mt-2 text-white text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                      {{ activeMember.name }}
                    </p>
                    <p class="mt-2 text-white/90 text-base font-semibold">
                      {{ activeMember.role }}
                    </p>
                  </div>
                </div>

                <div class="p-8 sm:p-10">
                  <h3 class="text-2xl sm:text-3xl font-bold text-ocean-950 tracking-tight">
                    {{ $t('companyProfile.team.profileTitle') }}
                  </h3>
                  <p class="mt-4 text-gray-600 leading-relaxed text-base sm:text-lg">
                    {{ activeMember.bio }}
                  </p>

                  <div class="mt-8 flex flex-wrap gap-3">
                    <button
                      type="button"
                      class="inline-flex items-center justify-center rounded-xl bg-ocean-600 hover:bg-ocean-700 text-white px-6 py-3 text-sm font-semibold transition-colors"
                      @click="closeMember"
                    >
                      {{ $t('companyProfile.team.done') }}
                    </button>
                    <button
                      type="button"
                      class="inline-flex items-center justify-center rounded-xl border border-gray-200 hover:border-gray-300 bg-white text-gray-800 px-6 py-3 text-sm font-semibold transition-colors"
                      @click="closeMember"
                    >
                      {{ $t('companyProfile.team.close') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </teleport>
  </section>
</template>

<style scoped>
.clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
