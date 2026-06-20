<script setup lang="ts">
const { t } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)

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
const isModalVisible = ref(false)
const modalMotionReady = ref(true)

const modalOverlayRef = ref<HTMLElement | null>(null)
const modalBackdropRef = ref<HTMLElement | null>(null)
const modalPanelRef = ref<HTMLElement | null>(null)
const modalCloseRef = ref<HTMLElement | null>(null)
const modalImageRef = ref<HTMLImageElement | null>(null)
const modalImageMetaRef = ref<HTMLElement | null>(null)
const modalContentRef = ref<HTMLElement | null>(null)

let modalTimeline: { kill: () => void } | null = null
let isModalAnimating = false

const prefersReducedMotion = () =>
  import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const resetModalMotion = () => {
  modalTimeline?.kill()
  modalTimeline = null
  isModalAnimating = false
}

const playModalEnter = async () => {
  if (!import.meta.client) return

  if (prefersReducedMotion()) {
    modalMotionReady.value = true
    modalPanelRef.value?.focus()
    return
  }

  modalMotionReady.value = false
  const { default: gsap } = await import('gsap')
  modalTimeline?.kill()

  const backdrop = modalBackdropRef.value
  const panel = modalPanelRef.value
  const closeBtn = modalCloseRef.value
  const image = modalImageRef.value
  const imageMeta = modalImageMetaRef.value
  const content = modalContentRef.value

  if (!backdrop || !panel || !closeBtn || !image || !imageMeta || !content) {
    modalMotionReady.value = true
    return
  }

  const metaItems = imageMeta.children
  const contentItems = content.children

  gsap.set(backdrop, { opacity: 0, backdropFilter: 'blur(0px)' })
  gsap.set(panel, {
    opacity: 0,
    scale: 0.9,
    y: 56,
    transformPerspective: 1200,
    rotateX: 6,
    transformOrigin: '50% 100%',
  })
  gsap.set(closeBtn, { opacity: 0, scale: 0.55, rotation: -120 })
  gsap.set(image, { scale: 1.14 })
  gsap.set(metaItems, { opacity: 0, y: 28 })
  gsap.set(contentItems, { opacity: 0, y: 32 })

  isModalAnimating = true

  modalTimeline = gsap.timeline({
    defaults: { ease: 'power4.out' },
    onComplete: () => {
      isModalAnimating = false
      modalMotionReady.value = true
      gsap.set([backdrop, panel, closeBtn, image, metaItems, contentItems], { clearProps: 'all' })
    },
  })

  modalTimeline
    .to(backdrop, { opacity: 1, backdropFilter: 'blur(8px)', duration: 0.5 })
    .to(
      panel,
      { opacity: 1, scale: 1, y: 0, rotateX: 0, duration: 0.72, ease: 'power4.out' },
      '-=0.32',
    )
    .to(image, { scale: 1, duration: 0.95, ease: 'power2.out' }, '-=0.62')
    .to(
      closeBtn,
      { opacity: 1, scale: 1, rotation: 0, duration: 0.45, ease: 'back.out(2.2)' },
      '-=0.55',
    )
    .to(metaItems, { opacity: 1, y: 0, stagger: 0.09, duration: 0.48, ease: 'power3.out' }, '-=0.42')
    .to(contentItems, { opacity: 1, y: 0, stagger: 0.11, duration: 0.52, ease: 'power3.out' }, '-=0.34')

  modalPanelRef.value?.focus()
}

const playModalLeave = async (onComplete: () => void) => {
  if (!import.meta.client || prefersReducedMotion()) {
    onComplete()
    return
  }

  const { default: gsap } = await import('gsap')
  modalTimeline?.kill()

  const backdrop = modalBackdropRef.value
  const panel = modalPanelRef.value
  const closeBtn = modalCloseRef.value
  const image = modalImageRef.value
  const content = modalContentRef.value

  if (!backdrop || !panel) {
    onComplete()
    return
  }

  isModalAnimating = true

  modalTimeline = gsap.timeline({
    defaults: { ease: 'power3.in' },
    onComplete: () => {
      isModalAnimating = false
      onComplete()
    },
  })

  const contentItems = content?.children

  modalTimeline
    .to(contentItems ?? [], { opacity: 0, y: 16, stagger: 0.04, duration: 0.18 }, 0)
    .to(closeBtn, { opacity: 0, scale: 0.7, rotation: 90, duration: 0.22 }, 0)
    .to(image, { scale: 1.08, duration: 0.32 }, 0)
    .to(panel, { opacity: 0, scale: 0.94, y: 36, rotateX: 4, duration: 0.38, ease: 'power3.inOut' }, 0.06)
    .to(backdrop, { opacity: 0, backdropFilter: 'blur(0px)', duration: 0.32 }, 0.14)
}

const openMember = async (key: string) => {
  resetModalMotion()
  activeMemberKey.value = key
  modalMotionReady.value = false
  isModalVisible.value = true
  await nextTick()
  await playModalEnter()
}

const closeMember = () => {
  if (!isModalVisible.value) return

  modalTimeline?.kill()
  isModalAnimating = false

  playModalLeave(() => {
    resetModalMotion()
    activeMemberKey.value = null
    isModalVisible.value = false
    modalMotionReady.value = true
  })
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeMember()
}

watch(isModalVisible, (visible) => {
  if (!import.meta.client) return
  document.body.style.overflow = visible ? 'hidden' : ''
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  document.body.style.overflow = ''
  resetModalMotion()
})

useSectionMotion(sectionRef, {
  preset: 'cards',
  headingRef: headerRef,
  cardsContainerRef: gridRef,
  cardsSelector: '.team-card',
})

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('keydown', onKeydown)
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
          class="team-card group text-center rounded-2xl bg-white border border-white/60 shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3ece8] px-5 sm:px-6 py-7 sm:py-8"
          @click="openMember(member.key)"
        >
          <div class="team-card-content">
            <div class="team-card-avatar mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gray-100 ring-4 ring-white shadow-sm">
              <img
                :src="member.img"
                :alt="`${member.name} — ${member.role}`"
                class="team-card-photo w-full h-full object-cover"
                width="480"
                height="480"
                loading="lazy"
              />
            </div>

            <p class="team-card-name mt-5 text-base sm:text-lg font-semibold text-ocean-950 tracking-tight">
              {{ member.name }}
            </p>
            <p class="team-card-role mt-1 text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-gray-500">
              {{ member.role }}
            </p>

            <p class="mt-4 text-sm text-gray-600 leading-relaxed italic clamp-4">
              “{{ member.bio }}”
            </p>

            <span class="team-card-cta mt-5 inline-flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wide text-aqua-700 uppercase">
              {{ $t('companyProfile.team.viewProfile') }}
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </button>
      </div>
    </div>

    <!-- Modal -->
    <teleport to="body">
      <div
        v-if="isModalVisible && activeMember"
        ref="modalOverlayRef"
        class="team-modal fixed inset-0 z-[60] flex items-center justify-center px-4 sm:px-6"
        :class="{ 'team-modal--entering': !modalMotionReady }"
        @keydown="onKeydown"
      >
        <button
          ref="modalBackdropRef"
          type="button"
          class="team-modal-backdrop absolute inset-0 bg-ocean-950/70"
          aria-label="Close"
          @click="closeMember"
        />

        <div
          ref="modalPanelRef"
          tabindex="-1"
          role="dialog"
          aria-modal="true"
          :aria-label="`${activeMember.name} — ${activeMember.role}`"
          class="team-modal-panel relative w-full max-w-5xl rounded-[28px] bg-white shadow-2xl overflow-hidden outline-none"
        >
          <div class="absolute top-4 right-4 z-10">
            <button
              ref="modalCloseRef"
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
            <div class="relative aspect-[4/3] lg:aspect-auto lg:min-h-[520px] bg-gray-100 overflow-hidden">
              <img
                ref="modalImageRef"
                :src="activeMember.img"
                :alt="`${activeMember.name} — ${activeMember.role}`"
                class="absolute inset-0 w-full h-full object-cover"
                width="1600"
                height="1200"
                loading="eager"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-ocean-950/70 via-ocean-950/10 to-transparent" />
              <div ref="modalImageMetaRef" class="absolute left-7 right-7 bottom-7">
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

            <div ref="modalContentRef" class="p-8 sm:p-10">
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
      </div>
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

.team-card {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  transform: translateZ(0);
  transition:
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.45s ease;
}

.team-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    145deg,
    rgba(20, 184, 166, 0.08) 0%,
    rgba(255, 255, 255, 0) 42%,
    rgba(31, 118, 153, 0.06) 100%
  );
  opacity: 0;
  transition: opacity 0.45s ease;
  pointer-events: none;
  z-index: 0;
}

.team-card::after {
  content: '';
  position: absolute;
  top: -20%;
  left: -120%;
  width: 55%;
  height: 140%;
  background: linear-gradient(
    105deg,
    transparent 0%,
    rgba(255, 255, 255, 0.55) 48%,
    transparent 100%
  );
  transform: skewX(-18deg);
  transition: left 0.75s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
  z-index: 1;
}

.team-card-content {
  position: relative;
  z-index: 2;
}

.team-card-avatar {
  transition:
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.team-card-photo {
  transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
}

.team-card-name,
.team-card-role {
  transition:
    color 0.4s ease,
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.team-card-cta {
  opacity: 0;
  transform: translateY(6px);
  transition:
    opacity 0.4s ease,
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.team-card:hover,
.team-card:focus-visible {
  transform: translateY(-10px) scale(1.025);
  border-color: rgba(20, 184, 166, 0.28);
  box-shadow:
    0 28px 56px -14px rgba(15, 42, 57, 0.18),
    0 16px 32px -12px rgba(20, 184, 166, 0.14),
    0 0 0 1px rgba(20, 184, 166, 0.1);
}

.team-card:hover::before,
.team-card:focus-visible::before {
  opacity: 1;
}

.team-card:hover::after,
.team-card:focus-visible::after {
  left: 140%;
}

.team-card:hover .team-card-avatar,
.team-card:focus-visible .team-card-avatar {
  transform: scale(1.08);
  box-shadow:
    0 12px 28px -6px rgba(20, 184, 166, 0.35),
    0 0 0 4px rgba(20, 184, 166, 0.12);
}

.team-card:hover .team-card-photo,
.team-card:focus-visible .team-card-photo {
  transform: scale(1.08);
}

.team-card:hover .team-card-name,
.team-card:focus-visible .team-card-name {
  color: #0f2a39;
  transform: translateY(-1px);
}

.team-card:hover .team-card-role,
.team-card:focus-visible .team-card-role {
  color: #0d9488;
  transform: translateY(-1px);
}

.team-card:hover .team-card-cta,
.team-card:focus-visible .team-card-cta {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .team-card,
  .team-card::before,
  .team-card::after,
  .team-card-avatar,
  .team-card-photo,
  .team-card-name,
  .team-card-role,
  .team-card-cta {
    transition: none;
  }

  .team-card:hover,
  .team-card:focus-visible {
    transform: none;
  }

  .team-card:hover .team-card-avatar,
  .team-card:focus-visible .team-card-avatar,
  .team-card:hover .team-card-photo,
  .team-card:focus-visible .team-card-photo {
    transform: none;
  }

  .team-card-cta {
    opacity: 1;
    transform: none;
  }
}

.team-modal {
  perspective: 1200px;
}

.team-modal--entering .team-modal-backdrop,
.team-modal--entering .team-modal-panel {
  opacity: 0;
}

.team-modal-backdrop {
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}

.team-modal-panel {
  transform-style: preserve-3d;
  will-change: transform, opacity;
}
</style>
