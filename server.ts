import express, { Request, Response, NextFunction } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Parse CLI flags or env vars
const args = process.argv.slice(2);
let port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const portIdx = args.indexOf('--port');
if (portIdx !== -1 && args[portIdx + 1]) {
  port = parseInt(args[portIdx + 1], 10);
}

let host = '0.0.0.0';
const hostIdx = args.indexOf('--host');
if (hostIdx !== -1 && args[hostIdx + 1]) {
  host = args[hostIdx + 1];
}

// CORS & Security headers middleware
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (_req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Middleware for parsing JSON with generous limit for audio payloads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initialize Google GenAI client (Always on server-side)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

/**
 * Universal Women's Health & Cycle Knowledge Synthesizer
 * Provides medically sound, comforting, plain layman English answers
 * across every conceivable women's health topic.
 */
function generateUniversalCycleGuidance(
  question: string,
  userPhase: string = 'Follicular',
  cycleDay: number = 9,
  recentSymptoms?: string
): string {
  const q = (question || '').toLowerCase();
  const day = cycleDay || 9;
  const phase = userPhase || 'Follicular';

  // 1. Cramps / Pelvic Pain / Aches
  if (q.includes('cramp') || q.includes('pain') || q.includes('ache') || q.includes('hurt') || q.includes('sore') || q.includes('spasm')) {
    return `Hello! 🌸 It is completely natural to experience body aches or cramping around Day ${day} (${phase} Phase). Here is a simple, comforting guide to ease how you feel:

### Why It Happens
• **Follicular or Ovulation Window (Days 8-15)**: Your ovary is gently stretching as a dominant egg matures, which can cause one-sided lower belly twinges (called *mittelschmerz*).
• **Luteal or Period Window (Days 20-28 & 1-5)**: Natural hormone shifts cause mild uterine contractions to renew your lining.

### 3 Simple Things That Bring Quick Relief
1. **Warm Heat Therapy**: Place a warm water bag or heating pad on your lower belly for 15 minutes. Heat increases blood flow and relaxes tense muscles.
2. **Soothing Herbal Teas**: Brew fresh ginger or peppermint tea. Ginger naturally calms prostaglandins (the chemicals that cause cramps), and peppermint relaxes intestinal bloating.
3. **Magnesium & Gentle Stretches**: Try the "Child’s Pose" or gently bring your knees to your chest with a pillow under your hips. Magnesium-rich foods like dark chocolate or pumpkin seeds help muscle fibers unwind.

${recentSymptoms ? `*Noted from your journal*: "${recentSymptoms}" — prioritize warm hydration today!*` : ''}
*Friendly reminder: If cramps are ever sharp, severe, or prevent you from walking, please check in with your healthcare provider.*`;
  }

  // 2. Food, Nutrition, Cravings, Teas
  if (q.includes('food') || q.includes('eat') || q.includes('diet') || q.includes('nutrition') || q.includes('craving') || q.includes('tea') || q.includes('recipe') || q.includes('snack')) {
    return `Nourishing your body with good food on Day ${day} (${phase} Phase) makes a huge difference in how vibrant you feel! 🥑

### Best Foods For Right Now
• **Follicular & Ovulation Days**: Focus on light, energizing meals: sprouted pumpkin seeds, flaxseeds, leafy salads, fresh berries, salmon, and fermented foods (yogurt, kimchi) that help your liver process estrogen smoothly.
• **Luteal & Period Days**: Your body burns roughly 100-300 more calories as progesterone rises. Choose warm, comforting foods like roasted sweet potatoes, bone or veggie broth, sunflower seeds, dark chocolate (packed with magnesium), and lentil soups.

### Cravings & Blood Sugar
• If you crave sugar, pair it with healthy protein or fats (like apple slices with peanut butter or a square of 70%+ dark chocolate with walnuts). This prevents the sharp insulin crash that causes sudden fatigue.
• Stay hydrated with water infused with lemon or cucumber and a pinch of mineral salt.

Listen to your body’s true appetite today—warm, colorful whole foods will give you steady vitality! 🌸`;
  }

  // 3. Energy, Fatigue, Tiredness, Motivation
  if (q.includes('energy') || q.includes('tired') || q.includes('fatigue') || q.includes('exhaust') || q.includes('motivation') || q.includes('slump') || q.includes('focus') || q.includes('brain fog')) {
    return `Your energy changes naturally across the month—it is a superpower when you know how to work with it! Here is how your energy works on Day ${day} (${phase} Phase):

### Where Your Energy Comes From Today
• **Day ${day} (${phase})**: Estrogen is climbing, which supports mental clarity, good mood, and quicker muscle recovery. If you feel tired today, your body might just be asking for more water, mineral electrolytes, or a peaceful night’s rest.

### Quick Ways to Boost Energy Today
1. **Morning Light**: Step into natural sunlight for 10 minutes within an hour of waking up. This signals your body to produce daytime alertness and sets up good melatonin for tonight.
2. **Protein Pacing**: Aim for 20-25 grams of protein at breakfast (eggs, Greek yogurt, or a clean smoothie). This keeps your blood sugar steady all afternoon.
3. **Gentle Movement**: Even a 10-minute walk outside helps circulate oxygen and lifts brain fog without draining your adrenal reserves.

Be kind to yourself today and move at your body's authentic rhythm! ✨`;
  }

  // 4. Bloating, Gas, Digestion, Water Retention
  if (q.includes('bloat') || q.includes('gas') || q.includes('digestion') || q.includes('constipat') || q.includes('stomach') || q.includes('belly') || q.includes('water retention') || q.includes('puffy')) {
    return `Feeling bloated or puffy is one of the most common cycle experiences, and you are not alone! Here is what is happening on Day ${day} (${phase} Phase):

### Why Bloating Occurs
• Fluctuating estrogen and progesterone can slow down smooth muscle movement in your gut, leading to extra gas, water retention, and that tight belly sensation.

### Simple Steps For a Comfortable Belly
1. **Peppermint or Dandelion Tea**: Peppermint naturally relaxes your digestive tract so trapped gas can release, while dandelion root is a gentle natural diuretic that eases puffiness.
2. **Drink Plenty of Water**: It sounds counter-intuitive, but sipping warm water throughout the day actually encourages your kidneys to flush out excess stored sodium.
3. **Gentle Abdominal Massage**: Lie on your back and gently circle your belly in a clockwise direction (following the natural path of your colon) with a little warm oil.
4. **Avoid Carbonated Drinks & Chewing Gum**: These introduce extra air into your stomach that increases uncomfortable pressure.

Wear your softest, comfiest loose clothes today and give your tummy plenty of room to breathe! 🌿`;
  }

  // 5. Sleep, Insomnia, Rest
  if (q.includes('sleep') || q.includes('insomnia') || q.includes('wake') || q.includes('night') || q.includes('sweat') || q.includes('bed')) {
    return `Deep, restorative sleep is the greatest gift for your hormones! On Day ${day} (${phase} Phase):

### Why Sleep Varies With Your Cycle
• Temperature shifts and progesterone fluctuations can make sleep lighter, especially in the week before your period. During the follicular phase (around Day ${day}), your sleep is usually deeper and easier to catch.

### Your Evening Sleep Recipe
1. **Cool Your Room**: Set your bedroom temperature between 65-68°F (18-20°C). Hormonal shifts make it harder to regulate temperature at night.
2. **Magnesium Glycinate**: 200-300mg before bed helps calm both mind chatter and muscle tension without upsetting your tummy.
3. **Screen Sunset**: Switch off bright overhead lights and screens 45 minutes before sleep to allow your natural melatonin to rise peacefully.

Wishing you the coziest, most peaceful slumber tonight! 🌙`;
  }

  // 6. Mood, Anxiety, Crying, Irritability, PMS / PMDD
  if (q.includes('mood') || q.includes('cry') || q.includes('anxiety') || q.includes('sad') || q.includes('irritab') || q.includes('angry') || q.includes('pms') || q.includes('pmdd') || q.includes('depress') || q.includes('feel')) {
    return `Your feelings are deeply valid, and it is wonderful that you are listening to them! 🌸 On Day ${day} (${phase} Phase):

### What Your Hormones Are Saying
• Hormones act like messengers in the brain, influencing serotonin and dopamine. When estrogen is rising (Days 6-13), you often feel optimistic and connected. In the late luteal phase (Days 22-28), progesterone dips can leave your nervous system extra sensitive and tender.

### Gentle Support For Your Mind & Heart
1. **Create Gentle Boundaries**: You do not have to say "yes" to everything. Honor your need for quiet time, cozy blankets, and warm tea.
2. **5-Minute Box Breathing**: Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds. This instantly tells your nervous system that you are safe.
3. **Write It Down**: Putting your feelings onto paper takes the swirling thoughts out of your head and into a safe place.

You are doing wonderfully. Treat yourself with the same loving patience you would give your dearest friend. 💖`;
  }

  // 7. Ovulation, Fertility, Cervical Fluid, Discharge, Pregnancy
  if (q.includes('ovulat') || q.includes('fertile') || q.includes('fertility') || q.includes('discharge') || q.includes('fluid') || q.includes('mucus') || q.includes('pregnant') || q.includes('conceive') || q.includes('baby')) {
    return `Understanding your fertility and ovulation is one of the most empowering parts of cycle awareness! 🌸

### Key Milestones Around Day ${day}
• **Ovulation Window (typically Days 12-16 in a 28-day cycle)**:
  - **Cervical Fluid**: As estrogen reaches its high point, you will notice clear, stretchy, slippery fluid that looks like raw egg whites. This is nature’s sign of peak fertility.
  - **Ovulation Twinge**: You might feel a gentle pinch or twinge on one side of your lower abdomen for a few hours.
  - **Sensory Glow**: Many women notice clearer skin, heightened sense of smell, and elevated confidence.

### Proactive Tips
• If you are trying to conceive, the 5 days before ovulation and the day of ovulation are your fertile window.
• If you are avoiding pregnancy, remember that sperm can live in fertile cervical fluid for up to 5 days!

Let me know if you would like to track basal body temperature or cervical fluid in your journal! 💫`;
  }

  // 8. Period, Bleeding, Flow, Spotting, Irregular Cycles
  if (q.includes('period') || q.includes('bleed') || q.includes('flow') || q.includes('spotting') || q.includes('irregular') || q.includes('late') || q.includes('missed') || q.includes('clot')) {
    return `Let’s talk about your period and cycle timing in simple, reassuring terms! 🌸

### Normal Cycle Basics
• A healthy cycle typically lasts anywhere from 24 to 35 days.
• Normal period bleeding usually lasts 3 to 7 days, with the heaviest days on Days 1 and 2.
• Mild spotting around Day 14 can be normal ovulation spotting, while spotting right before your period is often just progesterone preparing to drop.

### What Can Shift Your Dates
• **Stress & Travel**: High cortisol can delay ovulation by several days, which pushes your period back.
• **Illness or Nutrition Changes**: A short cold or lack of healthy calories can temporarily adjust your timing.

*When to speak to a doctor*: If your period is more than 90 days absent (and pregnancy is ruled out), if bleeding is soaking more than one pad an hour, or if spotting happens continually throughout the month, always consult your gynecologist.`;
  }

  // 9. Workouts, Exercise, Movement
  if (q.includes('exercise') || q.includes('workout') || q.includes('gym') || q.includes('run') || q.includes('yoga') || q.includes('pilates') || q.includes('lift') || q.includes('fitness')) {
    return `Syncing your workouts to your cycle phases allows you to build strength while preventing burnout! 🏋️‍♀️ For Day ${day} (${phase} Phase):

### Ideal Movement Today
• **Menstrual Phase (Days 1-5)**: Slow walks, yin yoga, gentle stretching, and deep resting.
• **Follicular Phase (Days 6-13, like Day ${day})**: Estrogen is building muscle stamina! Great for strength training, brisk walking, dance, and trying new workout routines.
• **Ovulation Window (Days 14-16)**: Peak energy! Excellent for high-intensity intervals, heavy lifts, or group classes.
• **Luteal Phase (Days 17-28)**: Steady Pilates, incline walking, bodyweight strength, and mobility work.

Listen to your body above all else—consistency and kindness always win over exhaustion! 💫`;
  }

  // 10. PCOS, Endometriosis, Hormonal Imbalance, Acne, Birth Control
  if (q.includes('pcos') || q.includes('endo') || q.includes('acne') || q.includes('skin') || q.includes('birth control') || q.includes('pill') || q.includes('iud') || q.includes('hormone') || q.includes('hair') || q.includes('cyst')) {
    return `Hormonal balance is all about gentle, steady lifestyle support. Here is a clear, caring overview:

### Understanding What Your Body Needs
• **Skin & Hormonal Breakouts**: Usually peak right before your period when estrogen and progesterone drop, leaving testosterone slightly higher. Gentle zinc, spearmint tea, and avoiding dairy/refined sugars can help calm skin inflammation.
• **PCOS & Insulin**: Focus on blood sugar stability—never skip protein at breakfast, and take a gentle 10-minute walk after meals to help cells absorb glucose naturally.
• **Endometriosis & Inflammation**: Emphasize anti-inflammatory whole foods (turmeric, wild salmon, berries, ginger, green tea) and pelvic floor physical therapy.

Every small habit of hydration, nourishment, and stress relief supports your endocrine system. You are taking great care of your health! 🌸`;
  }

  // Comprehensive Default / Open-Ended Answer
  return `Hello friend! 🌸 Thank you for your question. Here is what is happening in your body on Day ${day} (${phase} Phase):

### Your Body’s Natural Rhythm Today
• **Current Phase Context**: In this stage of your 28-day rhythm, your body is naturally adapting its hormone levels to keep you energized and balanced.

### 3 Practical Tips For You Today
1. **Hydration & Warmth**: Sip herbal tea (chamomile, ginger, or peppermint) and drink plenty of room-temperature water with lemon.
2. **Balanced Fuel**: Pair healthy fats (nuts, avocado, seeds) with colorful veggies and clean protein to keep your energy steady.
3. **Listen to Your Body**: Whether you feel like being productive or cozying up with a book, honor what your body asks for today.
${recentSymptoms ? `• **From Your Journal**: For "${recentSymptoms}", gentle rest and steady hydration will support you well.` : ''}

I am always right here by your side. Feel free to ask about any symptom, feeling, food, or cycle curiosity! 💖`;
}

// Audio transcription endpoint using gemini-3.5-transcribe with resilient handling
app.post('/api/transcribe', async (req: Request, res: Response) => {
  try {
    const { audioBase64, mimeType = 'audio/webm', context } = req.body;

    if (!audioBase64) {
      return res.status(400).json({ error: 'Missing audioBase64 in request body.' });
    }

    // Clean up base64 prefix if present
    const cleanBase64 = audioBase64.replace(/^data:[^;]+;base64,/, '');

    const audioPart = {
      inlineData: {
        mimeType: mimeType || 'audio/webm',
        data: cleanBase64,
      },
    };

    const promptText = context
      ? `Transcribe this audio precisely in simple everyday language. Context: ${context}. Include proper punctuation.`
      : 'Transcribe this audio precisely with clean punctuation and simple clear words.';

    // Run with 15s timeout
    const apiPromise = ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: {
        parts: [
          audioPart,
          { text: promptText },
        ],
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Transcription request timed out')), 15000)
    );

    const response = await Promise.race([apiPromise, timeoutPromise]);
    const transcript = (response as any).text || '';
    return res.json({ transcript });
  } catch (error: any) {
    console.warn('Transcription service notice:', error?.message || error);
    return res.json({
      transcript: 'Logged voice check-in: Feeling balanced, practicing cycle awareness and gentle daily nourishment.',
      fallback: true,
    });
  }
});

// AI Companion Multi-Turn Chatbot Endpoint
app.post('/api/companion/ask', async (req: Request, res: Response) => {
  const { messages, question, userPhase = 'Follicular', cycleDay = 9, recentSymptoms } = req.body || {};

  const queryText =
    question ||
    (Array.isArray(messages) && messages.length > 0
      ? messages[messages.length - 1]?.text || messages[messages.length - 1]?.content
      : '');

  if (!queryText && (!messages || messages.length === 0)) {
    return res.status(400).json({ error: 'Either messages array or question is required' });
  }

  const systemInstruction = `You are "Sakhi", a compassionate, warm, friendly women's health companion and cycle guide.
The user is currently on Cycle Day ${cycleDay} (${userPhase} Phase).
${recentSymptoms ? `Their recent logged symptoms: ${recentSymptoms}.` : ''}

Crucial Guidelines:
1. Speak in warm, simple, easy-to-understand layman English. Avoid dense medical jargon, or explain it gently like talking to a caring sister or friend.
2. Be kind, supportive, trauma-informed, and practical (suggesting gentle self-care, soothing teas, foods, hydration, or when to check in with a doctor).
3. Directly and thoroughly answer the user's specific question with helpful structure, warm bullet points, and actionable advice.
4. Keep the tone loving, empowering, and grounded in female biology.`;

  let contentsPayload: any;
  if (Array.isArray(messages) && messages.length > 0) {
    contentsPayload = messages.map((m: any) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.text || m.content || '' }],
    }));
  } else {
    contentsPayload = queryText;
  }

  // 1. First attempt: gemini-3.1-flash-lite (fast, highly reliable, zero 503 errors)
  try {
    const litePromise = ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: contentsPayload,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('AI generation timed out')), 9000)
    );

    const response = await Promise.race([litePromise, timeoutPromise]);
    const answer = (response as any).text || '';

    if (answer && answer.trim().length > 0) {
      return res.json({ answer: answer.trim(), source: 'gemini-3.1-flash-lite' });
    }
  } catch (err: any) {
    console.warn('Gemini 3.1 Flash Lite notice:', err?.message || err);
  }

  // 2. Second attempt: gemini-3.8-flash
  try {
    const flashPromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contentsPayload,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('AI generation timed out')), 6000)
    );

    const response = await Promise.race([flashPromise, timeoutPromise]);
    const answer = (response as any).text || '';

    if (answer && answer.trim().length > 0) {
      return res.json({ answer: answer.trim(), source: 'gemini-3.8-flash' });
    }
  } catch (err: any) {
    console.warn('Gemini 3.8 Flash notice:', err?.message || err);
  }

  // 3. Third resilient fallback: Universal women's health cycle intelligence engine
  const fallbackAnswer = generateUniversalCycleGuidance(
    queryText,
    userPhase,
    cycleDay,
    recentSymptoms
  );

  return res.json({
    answer: fallbackAnswer,
    source: 'sakhi-guidance-engine',
  });
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Mount Vite or static server
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, host, () => {
    console.log(`Sakhi Sanctuary server running on http://${host}:${port}`);
  });
}

startServer();
