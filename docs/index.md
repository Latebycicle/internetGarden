---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
---

<br><br><br>
<Oneko />

I'm **Akhil Ramchand**, A Computer Science & Engineering Student based in Bangalore. 

I've specialised in **AI/ML**, and I'm minoring in **psychology**, which gives me a unique perspective that enables me to create and deploy solutions where technology meets people.

I believe in making **simple**, **efficient** and **elegant** software solutions to bring meaningful change to the world. 

<div class="intro-actions">
  <a href="/AkhilResume.pdf" target="_blank" class="intro-btn primary">
    📄 View My Resume
  </a>
  <a href="https://www.linkedin.com/in/akhil-ramchand/" target="_blank" class="intro-btn">
    💼 LinkedIn
  </a>
  <a href="https://github.com/Latebycicle/" target="_blank" class="intro-btn">
    💻 GitHub
  </a>
</div>

<br>

### My Recent work
<br>


<div class="cards-container">
<a href="../AIeducation">
  <card 
      image="/bss_25_logo.jpeg" 
      title="AI and the Future of Education in India" 
      description="Insights from the Bengaluru Skill Summit 2025 on how AI is accelerating the failure of India's education system, and what a new pedagogy built on competence over credentials could look like."
    /></a>

<a href="../Metacognition">
  <card 
      image="/metacog.png" 
      title="Metacognition: The basis of good AI Interaction" 
      description="This article explores metacognition as the foundation of effective AI interaction, emphasizing self-awareness, prompt engineering, critical evaluation, and workflow adaptation for optimal collaboration with generative AI systems."
    /></a>

<a href="../artofvisualstorytelling">
  <card 
    image="/artofvisualstorytellingposter.png" 
    title="The Art of Visual Storytelling" 
    description="What I learnt as an experienced graphic designer from a poster design workshop at BIC"
  /> </a>
</div>

<style>
  a {
  text-decoration: none !important;
}

/* Intro action buttons */
.intro-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 1.5rem 0;
}

.intro-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  font-size: 0.95rem;
  font-weight: 600;
  text-align: center;
  border-radius: 8px;
  text-decoration: none !important;
  transition: all 0.2s ease;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1.5px solid var(--vp-c-divider);
}

.intro-btn.primary {
  background-color: var(--vp-c-brand-1);
  color: var(--vp-button-brand-text);
  border-color: var(--vp-c-brand-1);
}

.intro-btn.primary:hover {
  background-color: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.intro-btn:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
</style>

