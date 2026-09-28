import { Doctor, ProductItem, VideoGuide, ForumThread } from '../types';

export const GATEWAY_TESTIMONIALS = [
  {
    quote: "Sakhi Cycle provides the single most sophisticated hormonal telemetry I have encountered in clinical practice.",
    author: "Dr. Elena Vance, MD, FACOG · Stanford Reproductive Endocrinology"
  },
  {
    quote: "The 432 Hz somatic frequency synchrony reduced our patient cohort luteal cortisol spikes by 41% across two cycles.",
    author: "Prof. Arthur Moreau, DSc · Oxford Neuro-Endocrine Research"
  },
  {
    quote: "Finally, a medical platform treating the female endocrine rhythm not as an illness, but as our greatest regenerative power.",
    author: "Camille Saint-Laurent · Founding Sanctuary Member, Paris"
  }
];

export const DOCTORS_DATA: Doctor[] = [
  {
    id: 'dr-ananya-sen',
    name: 'Dr. Ananya Sen',
    degrees: 'MD, FACOG • 14 Yrs Exp',
    experience: '14 Years',
    specialtyTitle: 'Reproductive Endocrinology, AMH Telemetry & IVF Guidance',
    category: 'endocrinology',
    hospital: 'Stanford Medicine • Manipal Hospital',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxol3Utf-Egx03XEbCs9RrMcBiY4GA8iIdBOxvL0WndSEOU08MusWEsSfhJ_wMJ-tsIqM8DRkcnLEFBie3RQgVsCIBbI-WZDmDHSrzEfcQZ8StM_FqEH5v8TaxEf8HUIrW8pC0RBAW7xtMPXAtCZuNcyfN0ZvPKH_M3K9iK9Sd8HVisF2hvylNtR4buGgj9aczgdD4fRDmMrtsfqSz6v0CT-UdJZQF09neI5pG24L6ArLKdss3xZNP',
    rating: 4.99,
    reviewCount: 420,
    onlineStatus: 'online',
    statusText: 'Online Now',
    tags: ['Egg Freezing', 'Luteal Defect', 'Thyroid'],
    rate: 65,
    durationMinutes: 25,
    availability: 'In 15 mins'
  },
  {
    id: 'dr-meenakshi-rao',
    name: 'Dr. Meenakshi Rao',
    degrees: 'MBBS, MS (OB-GYN) • 11 Yrs Exp',
    experience: '11 Years',
    specialtyTitle: 'Metabolic PCOS/PCOD Reversal & Adolescent Gynaecology',
    category: 'pcod',
    hospital: 'AIIMS New Delhi • Apollo Cradle',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn0Ix5TXt_tOTxfdm_G7IJCkpBnlkG0Ytx-mnYZ_rklQNTt0EOxesVMz5-MMtSpNdIfEESSD8NFv_rpdky3ScJ_YGvf_80GUeRFbDhSU9AZaPG8gZgx1r4hOVM2yA7P0OW1_BOB2ZgjNfVxu4xnx61drfocnM8Y7bBC-NmJJCE9ji26lmGrDnTWouF_CAiRkJiF2buKEkpZNfJcefQJj2Og1RZD0n6KhBt7hkRNS-jsssGYFh46O9Z',
    rating: 4.98,
    reviewCount: 380,
    onlineStatus: 'online',
    statusText: 'Online Now',
    tags: ['Insulin Resistance', 'Anovulation', 'First Cycle'],
    rate: 50,
    durationMinutes: 25,
    availability: 'Next: 3:30 PM'
  },
  {
    id: 'dr-tara-kapoor',
    name: 'Dr. Tara Kapoor',
    degrees: 'DNB, MRCOG (UK) • 16 Yrs Exp',
    experience: '16 Years',
    specialtyTitle: 'Deep Infiltrating Endometriosis & Chronic Pelvic Pain Surgery',
    category: 'endo',
    hospital: "King's College Hospital • Max Healthcare",
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdqUUrvbA3ETOX4437Wu6UJ2wmjTw_DnzdSUGoimsNUyFoAFOmQ1QMPg5kiFVlIIDl-4SOk-e2qVd6Y7h3lrZtMsPDoDOLFBlBo-Md59LgMuCvrTE7DlPV3A61fhzjarIIUDdBruFavrzGIIzzaSjMjpFHYJzUrSr1u4TtNYTDhEpyj51C5UAJkU-1-3-C2iF4Jf38X5ze2oyPfaREFB2DzVPVh4fZowxmh90ugmcRtQe7kkorxHqP',
    rating: 4.97,
    reviewCount: 310,
    onlineStatus: 'clinic',
    statusText: 'In Clinic Visit',
    tags: ['Adenomyosis', 'Nerve Mapping', 'Dyspareunia'],
    rate: 75,
    durationMinutes: 30,
    availability: 'Today: 5:00 PM'
  },
  {
    id: 'dr-priya-nair',
    name: 'Dr. Priya Nair',
    degrees: 'BAMS, MD (Ayur) • 13 Yrs Exp',
    experience: '13 Years',
    specialtyTitle: 'Dosha-Specific Hormone Rasayana & Cycle Synchronization',
    category: 'ayurveda',
    hospital: 'Kottakkal Arya Vaidya Sala • Sakhi Core',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5c55PM-ouByS8PsuWVUmJMIZ7TpwA8B7lAiLEBf6mup9vqA0pBkhWDa5neOHtj-Zdajwr_Pddt-sNhOgS3lkx24CQQMSoSk1XXhCux0weC4cmzzAt-otUNPyf-MfZ12_xuTurPDXX19mRWNXHLUV4hMln1Y6L1wHJqL4WgDmRof0wj9y4r16bDBVS81m1sfXM-VTUc5vuutAYpGbyiO1ckjIRaTl6BsOeYbO9bwVg3YxIAI7wHcAE',
    rating: 4.99,
    reviewCount: 512,
    onlineStatus: 'online',
    statusText: 'Online Now',
    tags: ['Pitta Pacifying', 'Shatavari Protocol', 'Agni Reset'],
    rate: 45,
    durationMinutes: 30,
    availability: 'In 10 mins'
  }
];

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'prod-cup',
    title: '100% Medical-Grade Platinum Silicone Menstrual Cup',
    badge: '10-Yr Lifespan',
    subBadge: 'Zero Waste • Hypoallergenic',
    price: 34,
    description: 'Ultra-flexible rim and ergonomic removal ring. 12-hour safe leak resistance without disrupting vaginal microbiome flora.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC06DIG4lNBvJOADw3zpFBSpSnWO-GQsh4VX54HArBjvcu2J2sAkz7MFj8_gU8GwJclirJUy-oFZf8d828PHccYuqqLGzRJVkdUGB5F1fzFe86YQwsRoGc7gXApD1YDtxoC-jwsZUhLrw7jxk3k_PMolX7muXQs00teXdDOMbRwnrdbk4mgM4wcqfuGkprI3FT7Nz0ZBu9bxeoJRz5Xtrpu2xKo0WHC7AslD73Bc0vaP7tBWBDBFy-',
    category: 'reusable'
  },
  {
    id: 'prod-pads',
    title: 'Organic Bamboo & Cornstarch Biodegradable Pads',
    badge: '100% Compostable',
    subBadge: 'Chlorine-Free • 14 Pack',
    price: 12,
    description: 'Naturally antibacterial, 4x more absorbent than standard cotton, breaks down in compost within 180 days.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGqGF60gZm0vpDekgrzjjwO63WTi8OIZvcvQVvd-HgpW_R51agW2jnGOE8jazEvIgSf8Z6YgXACCFlLpD9MKURV7wFlyAVo02rmp_-2UpTvrGfXXY1TZoA0JOAdBjx7duyGT-xO-SrvLLTZlTc1CTS12pS39rLFcEdychO3M9EDUIIIHP-L-pdTVWgpMV3d2bvQ0CiIXRDCiQeTi0vzkNg_tUyxDTNCGVzK-byDMMuoeemrmF6ex2r',
    category: 'organic'
  },
  {
    id: 'prod-underwear',
    title: 'Reusable Period Comfort Underwear (Heavy Flow)',
    badge: 'Heavy Flow • 4 Tampons Equiv.',
    subBadge: 'Seamless Micro-Modal',
    price: 28,
    description: 'Multi-layer breathable gusset traps liquid and neutralizes odors with silver-ion technology. Zero bulk.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtUGTKizl8UVAFoESJaRhkP06AGtApTx9xoFAefiqITvQVMHydvJvDY_JlRcPcdMNAhJRxtJrFJU3LovawIm_TlF8OGMsxNkH5ePdNVxDpGiTiuISwwUykR3XXtN33YIugUUL46HmSZBAvWq_cgudiuTXKF3F-fiMaQwgzk_Y90U1KJbhpRo5OaGvsGlYh9s9hCg0niPW-GgpXWQEcWC1CLqv-15AVvAHKcBe2UguFFyrusuXkWbHX',
    category: 'apparel'
  },
  {
    id: 'prod-heat-patch',
    title: 'Herbal Cramp Soothing Heat Patch (Mugwort & Menthol)',
    badge: '8-Hour Heat Therapy',
    subBadge: 'Aromatherapeutic • 5 Pack',
    price: 18,
    description: 'Air-activated sustained 40°C therapeutic warmth infused with traditional Korean mugwort and refreshing menthol vapor.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgrAk-O2NhqVl_JUnkvuZ99vQYNhnqhWN1RG2Tr2LvBLd7Cu1GkHFzxAhr61rmPf2wvIOvHkDlcw8teaTGDcCuAChhzp8agYogiXsCHvzpvLcAPpRc6PNSyZ7ATNpPojMI6ICVpFiuzJNa9wswZl1XYg6WDzDgexlyqVkSDXPVsqBz5Z8OQ3E150ycGhbbqcFJyC3g2VsRPIYshyD2NpvTkU7Rl6cvJA0ONzQWnGStk2gNvqsISD8p',
    category: 'wellness'
  }
];

export const VIDEO_GUIDES: VideoGuide[] = [
  {
    id: 'vid-cup',
    title: 'How to Use a Menstrual Cup with Ease (No Leaks / Zero Fear)',
    category: 'Anatomy • Beginner Guide',
    duration: '8:24 mins',
    views: '48.2k viewers',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7wh2RPtIDdptk1LLC7-DJlxdMTk_siUqjM61l6N79hJCg5dvN3iZENv1hb6CEwo41He7j5RJO2o4pKtaMHQK6hWzFuUcwpAblyPtx4Zc73mZ9yS1P8C9AHQNlccQV-l1FZDubQI1c4hXiehUuBibZnfplONvj2zb2PB7K4bMD5dPIAXzSuyqA4EBvR1upIYvjrxCcgNdXrKlzwwUckxQJS-t-YvAN2jjfLUCH0oBAm9D_oy-xdDOz',
    description: 'Step-by-step folds (Punch-down vs C-fold), pelvic floor muscle relaxation cues, and zero-mess removal mechanics.',
    youtubeId: 'dQw4w9WgXcQ'
  },
  {
    id: 'vid-comparison',
    title: 'Organic Cotton Pads vs. Menstrual Discs: Complete Honest Breakdown',
    category: 'Product Comparison',
    duration: '11:15 mins',
    views: '32.6k viewers',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9iaTTM5PwJWJ_w8o_zcV3z04kU_VUhGXafM56jKE-lXE58uu2bzLLTPVxe1ZgXag6dR9Ev3u5tZSLxDM2RwuJ3yl40Q4RSJzm3X3N9SPAa6tqgtjGlDqaYUHTSYl_jp3GT_uqjPU7DCo5u34ApIHLpsS-6NE2tKIt00COSB6gIiLGuMFXnyMdSRj98kmvIhhucxM_mySSFCuqinxp5rMmPnkHcELWBdbSAqIWkpzCx1gqJNkGpkrH',
    description: 'Comparing absorbency, cervical fornix placement, intercourse comfort, and lifetime environmental lifecycle impact.',
    youtubeId: 'dQw4w9WgXcQ'
  },
  {
    id: 'vid-pain',
    title: 'Pelvic Cramp Relief in 5 Minutes (Somatic Acupressure Guide)',
    category: 'Somatic Pain Protocol',
    duration: '6:40 mins',
    views: '61.9k viewers',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCru7UHUmJPiprwCSawKVLlT2bpx2WQnoPpzUb9oZ72eE4MDgVu108s3T5r49QY8JRIQH3sTD0jRED2gaYwSL-K35aP5SYlDAOdodK3nDpnJd6y9MdFhW98hsNAFqfrnWkvmgtJ6JzUyEYBrANsq10Lt1E7qN-q54wJ9oWaXVm0MdOakjz9MIAeESd0zWvZ4Qq028ehMm4cjc47ycJ9xRTGYVe93QGxAesQx43Cwtg1bacKrO8VR_58',
    description: 'Targeting SP6 (Sanyinjiao) and sacral nerve decompression to calm prostaglandin spikes and uterine muscle spasms.',
    youtubeId: 'dQw4w9WgXcQ'
  }
];

export const FORUM_THREADS: ForumThread[] = [
  {
    id: 'thread-1',
    authorNumber: 'Sister #104',
    phaseLabel: 'Follicular • Day 8',
    badge: 'Creativity Spark',
    avatarEmoji: '✨',
    title: 'Day 8 energy surge: Anyone else feeling super creative out of nowhere?',
    content: 'Woke up at 6am today with a sudden urge to paint my balcony pots and re-organize my entire desk setup! Usually, in menstruation, I could barely stand up. Is this the estrogen wave kicking in?',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmWE3vHoqS26NQyV0BtEdI5pG7vSavz9yUIsOngxqVROrqMpKx0yzDKb_ASN1Tm8zEu-kKn9nTpiW1qHELdtpYgU9MhbSNNIOSB1uqIgv6_Vaz-Hgxmiuqu4rsN2Dv6kx2Ot2ZTiNuR4WuhULMKQf8L1HGdXYB_QMCe3Jdtbx4kTBR2epQgOy_QRwStP2KUGpsEdCqMSRW0H_1xOVYyaBq8ULZjBRYqD0hWN6nlJAn7GmHP3cxUNtk',
    likes: 89,
    replies: 142,
    timeAgo: '2h ago',
    category: 'follicular'
  },
  {
    id: 'thread-2',
    authorNumber: 'Sister #892',
    phaseLabel: 'Luteal Phase • Day 24',
    badge: 'Remedies',
    avatarEmoji: '🌿',
    title: 'Best natural remedies for luteal bloating that actually work',
    content: 'I love sodium way too much, but around day 24 the fluid retention makes my lower belly feel like an anvil. Started drinking warm fennel-ginger infusion before bedtime—what do you all swear by?',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKmt18kPKCZs2wWdT9KYcc6OQMDoQJjQbDpjmh_Eh7_2OJMM_sji7bpCLdRQOOGl7IB_yyqBJVvuG8XE-OMX8UvwpHa7B8Tc8CjPnGjO4cf-BV4eMzh-PDsrh3RZBiFZXpqGMlf3yyzOSgAj_27qXbIxwmOBNEQnCi7O9PQ11NmnDax1XSaukJoeboBUdRjYGL2pchcWE5emG3BjEQV-6dy4ObfbQi0vIQ5farSzK_Dlb7n9vXa8EO',
    likes: 112,
    replies: 84,
    timeAgo: '5h ago',
    category: 'luteal'
  },
  {
    id: 'thread-3',
    authorNumber: 'Sister #319',
    phaseLabel: 'Follicular • Day 11',
    badge: 'Nutrition • Seeds',
    avatarEmoji: '🌰',
    title: 'First time trying seed cycling—how long until you felt a difference?',
    content: 'Pumpkin and flax seeds ground daily with my morning oat bowl. It has been about 3 weeks now. My skin feels marginally calmer, but I am curious if cramp reductions take 2 or 3 complete cycles to show?',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo_nG8qmmwiGKJWAgUm-d0UI6qpzupE7KQmBl2nEPmZnBL6AefYf7WtdCWJ8RXJLWzSAVzSq1UXT_BVJucDQtdiqwgQdLpngQ3xdno_B09RQia6JbqyRH3U5jg7HdCH0IKBVQzyVZmTVd9jIMmTC6G02Elm0ojEhcclRhqReD_g284QzrD9yBn8ZRFp7wEd_kVHBcAk-3WYwzeW50RveCoUWKjwBURNtJeKKjQp1RqlW_zT4HTD46k',
    likes: 65,
    replies: 48,
    timeAgo: '1d ago',
    category: 'seeds'
  }
];

export const SOUNDSCAPES = [
  {
    id: 'lotus-rain',
    title: 'Rain on Lotus Leaves',
    desc: 'Binaural pink noise recorded during Nilgiri monsoon for deep nervous calming.',
    duration: '45 mins',
    tag: 'Hydrotherapy',
    icon: 'water_drop',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFp3wIV6R6A8bMpn2P_ejOedDOlpmzXucYhcu2gMMnjIna0WHgG72bvvu6VzBdnncck3LVL6UHnGlxAIuYYi-DP3F4ZCQeBjdYs5Dcr0D8l12ptnnXPSJswCxXMw5og6VdQZNwjztsYG8BY_g3ts4tS-r1XFMjK4BdPHwUneUMm6TRBoNwUrbECJouMyYqopLk-g7J23xV9uoXgB264S1lOljiqXZXhteSgSpNvVgZMoo0ILr5y16B'
  },
  {
    id: 'tibetan-bowls',
    title: 'Tibetan Singing Bowls',
    desc: 'Pure metal alloy overtones designed to realign pelvic meridian channels.',
    duration: '60 mins',
    tag: 'Overtone Soak',
    icon: 'radio',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAc2DN9ZrT15-YTnlRCSc2jDnJSHT7AvXG6cR4ew5zjhW4qVudy_KymCKgLAti6c5f4U5Q9PM2Qa2CSJNZADllkIqAQNsHDjxUYJOjbGTFHCErK65qyN9M52T7hnSU68QyC46-I62EWNisSbcg-uam109g8ZF_thHnTkkr4XCyi7KPMVmUsdgfM5Tu3b-IYhSLlvQsg82eg3ALoKc9yiYPMCUTsJPZbxkOvsOYbWJAVAaTWUYDV94lI'
  },
  {
    id: 'delta-waves',
    title: 'Delta Sleep Waves',
    desc: 'Ultra-low frequency delta entrainment to ensure restorative stage 4 REM sleep.',
    duration: '90 mins',
    tag: 'Deep Slow Wave',
    icon: 'bedtime',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALyubU54a6vyyVvqt2YL421J6GcEJrTDxH1pqx8JwPcCaksIeXPS6WrFctqhHVVSV4UUiLDLYYcBvPjm3fJF1p4mR9B72iBvgd_Y4QMsYRAFP3giUDAwBvp8qp_Io3tEcr4YN8QKX3l1358_UZOmx4-spRu2mKA3X7uB2CMvSskvtmbsgCQzc0T693MB0qSbYz54uOLCjeiS4dRU1-Fc1DS1KCqjuune99Xl7GL2z2RNBu9JTeRthd'
  }
];
